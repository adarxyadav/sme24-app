# Architecture Context

## Stack

| Layer            | Technology                  | Role                                                                  |
| ---------------- | --------------------------- | --------------------------------------------------------------------- |
| Framework        | Next.js 15 + TypeScript     | Full-stack app with server/client component boundaries                |
| UI               | Tailwind CSS + shadcn/ui    | Component composition and styling                                     |
| Auth             | Supabase Auth               | User identity, sessions, and route protection                         |
| Database         | Supabase Postgres + RLS     | Relational data with row-level security as the canonical access layer |
| Artifact storage | Supabase Storage            | Binary artifacts: photos, CVs, PDFs, vault documents                  |
| Payments         | Stripe + Stripe Tax         | Hosted checkout, Swiss MWST, and webhooks                             |
| Background tasks | Trigger.dev                 | Durable AI pipeline runs and proposal generation                      |
| AI               | Anthropic Claude Sonnet 4.6 | Company research, KPI extraction, proposal authoring                  |
| Email            | Resend                      | Post-purchase confirmations and contact form intake                   |
| Deployment       | Vercel                      | Hosting and edge runtime                                              |
| Error monitoring | Sentry                      | Runtime error capture across app and pipeline                         |

## System Boundaries

- `app/(marketing)` — Public marketing pages, locale routing, and contact form server action.
- `app/(portal)` — Authenticated surfaces: expert directory, account settings, expert onboarding form, and client project workspace.
- `app/api` — Request handlers: input validation, ownership checks, Trigger.dev task triggering, and persistence. Stripe webhook handler at `app/api/webhooks/stripe`.
- `trigger/` — Durable background jobs: company research, benchmark and match computation, and proposal generation. **All Claude invocations happen here and nowhere else.**
- `lib/` — Shared infrastructure: Supabase client singletons, access control helpers, expert ranking utilities, and Claude prompt templates.
- `components/` — UI composition: shadcn/ui primitives, composite components, dialogs, and multi-step forms.
- `supabase/migrations/` — Database schema DDL and RLS policies. Source of truth for data shape.
- `copy/en/` — English marketing copy. Bilingual support deferred to v2.

## Storage Model

- **Current state**: Two-layer separation is live. **Postgres** holds all structured metadata and
  relationships; **Supabase Storage** holds all binary artifacts (photos, CVs, PDFs, vault
  documents). The storage path is written to its owning Postgres row as the artifact reference.
  Protected files are served via time-bounded signed URLs — never direct public paths. Bucket
  access rules and full artifact path conventions: [[database-schema]].
- **Database boundary**: Store only structured metadata, ownership, relationships, and
  searchable indexes. Do not store large generated artifacts, binary media, or raw prompt
  outputs directly in relational rows. Access patterns must be owner-scoped and validated at
  the route boundary.
- **Storage boundary**: Store generated artifacts, CVs, photos, exports, and other binary
  content in Supabase Storage buckets. Bucket paths must be referenced by database metadata
  rows — never trusted directly from client input. Define retention and cleanup behavior
  alongside the feature that creates artifacts. If a storage write succeeds but the metadata
  row write fails, the feature must clean up or mark the artifact for retry.

## Auth and Access Model

- **Current state**: Supabase Auth is the identity provider. Two mutually exclusive user
  roles — `client` (default at signup) and `expert` (admin-approved after onboarding review)
  — are stored in the `profiles` table and enforced by RLS policies. Admin access is gated
  by an `ADMIN_EMAILS` env-var whitelist checked on first sign-in.
- **Session model**: Clients authenticate via magic link (email OTP) or Google OAuth. Experts
  authenticate via LinkedIn OAuth or Google OAuth. No passwords anywhere. Supabase Auth owns
  session creation, refresh, and logout. Server-side auth checks use the Supabase server
  client; client-side session state is read from the Supabase browser client. Sessions are
  never passed to `trigger/` directly — background tasks use the service role exclusively.
- **Service role**: The Supabase service role bypasses RLS and is restricted to `trigger/`
  background tasks and `app/api/webhooks/` handlers. Page server actions and regular API
  routes use the scoped anon/user client only. Leaking the service role into a server action
  would silently break the access model — every future feature must be reviewed against this
  boundary.
- **Authorization boundary**: Every mutation must verify authenticated identity, resource
  ownership, and role permission before touching database or storage state. RLS is the
  canonical access layer — not application-level checks. The application must never replicate
  or shadow RLS logic in code; if a policy is the source of truth, code that re-checks the
  same condition is a maintenance liability.

## Invariants

1. **No AI work in request handlers.** Long-running AI work never happens inside a Next.js
   route handler or server action — it always runs as a background task in `trigger/`. Putting
   Claude calls in a request path risks timeout, partial failure with no retry, and broken
   streaming with no recovery path.
2. **Separate storage layers.** Metadata and files are always in separate layers — Postgres
   and Supabase Storage respectively. The storage path is the only cross-layer reference.
   If a storage write succeeds but the Postgres row write fails, the feature must clean up
   the orphaned artifact or mark it for retry; leaving ghost objects in storage is a data
   integrity violation.
3. **RLS at every write boundary.** Every mutation checks authenticated identity and resource
   ownership through RLS policies. The application never grants access by bypassing a policy,
   and application-level checks never substitute for a missing policy. RLS is the single
   source of truth for who can touch what.
4. **EU data residency.** Customer data and generated artifacts remain in EU regions at all
   times. Supabase project region, Vercel edge config, and any third-party integration must
   be verified against this constraint before use. A non-EU data path is a compliance
   violation regardless of whether data is encrypted in transit.
5. **Server components by default.** Client-side components are used only where the UI
   genuinely requires interactivity or live state. Marking a component `"use client"` widens
   the JS bundle and exposes it to hydration mismatch bugs — the default should always be a
   server component until interactivity is provably required.
6. **Service role is restricted.** Service-role database writes are allowed only in `trigger/`
   and `app/api/webhooks/`. Server actions and regular API routes must use the scoped
   anon/user client. A server action that uses the service role silently bypasses all RLS
   policies and grants full table access to any authenticated user — this must never happen.
