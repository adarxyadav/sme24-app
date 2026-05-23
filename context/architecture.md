# Architecture Context

## Stack

| Layer            | Technology                  | Role                                                 |
| ---------------- | --------------------------- | ---------------------------------------------------- |
| Framework        | Next.js 15 + TypeScript     | Full-stack app with server/client component boundaries |
| UI               | Tailwind CSS + shadcn/ui    | Component composition and styling                    |
| Auth             | Supabase Auth               | User identity, sessions, and route protection        |
| Database         | Supabase Postgres + RLS     | Relational metadata, ownership, and relationships    |
| Artifact storage | Supabase Storage            | Binary artifacts: photos, CVs, PDFs, vault documents |
| Payments         | Stripe + Stripe Tax         | Hosted checkout, Swiss MWST, and webhooks            |
| Background tasks | Trigger.dev                 | Durable AI pipeline runs and proposal generation     |
| AI               | Anthropic Claude Sonnet 4.6 | Company research, KPI extraction, proposal authoring |
| Email            | Resend                      | Transactional emails and contact form intake         |
| Deployment       | Vercel                      | Hosting and edge runtime                             |
| Error monitoring | Sentry                      | Runtime error capture across app and pipeline        |

## System Boundaries

- `app/(marketing)` — Public marketing pages and contact form server action.
- `app/portal/` — Authenticated client surfaces: expert directory, project workspace, and research runs.
- `app/expert/` — Expert-facing surfaces: onboarding form and engagement dashboard.
- `app/admin/` — Admin surfaces: expert approval, proposal review, and vault management.
- `app/api` — Request handlers: input validation, ownership checks, task triggering, and persistence.
- `trigger/` — Durable background jobs: company research, expert matching, and proposal generation. All Claude calls live here.
- `lib/` — Shared infrastructure: Supabase client singletons, access control helpers, and prompt templates.
- `components/` — UI composition: shadcn/ui primitives, composite components, dialogs, and forms.
- `supabase/migrations/` — Database schema DDL and RLS policies. Source of truth for data shape.

## Storage Model

- **Postgres**: metadata, ownership, relationships, task run records, and searchable indexes.
- **Supabase Storage**: generated artifacts, CVs, photos, and vault documents.
- The storage path is written to its owning Postgres row as the artifact reference.
- Protected files are served via signed URLs — never direct public paths.

## Auth and Access Model

- Two roles: `client` (default) and `expert` (admin-approved). Admin access via `ADMIN_EMAILS` env-var.
- RLS policies on all tables are the canonical access layer — not application-level checks.
- Service role is restricted to `trigger/` and `app/api/webhooks/`. All other routes use the scoped user client.
- Background tasks use the service role exclusively — sessions are never forwarded to `trigger/`.

## AI Generation Model

### Company Research
- Input: company name and client-provided context.
- Execution: durable background task via Trigger.dev.
- Output: structured research record and extracted KPIs written to Postgres.

### Proposal Generation
- Input: research results, matched experts, and engagement parameters.
- Execution: durable background task via Trigger.dev.
- Output: generated proposal artifact saved to Supabase Storage, path linked to the proposal record.

## Invariants

1. AI work never runs in request handlers — it belongs in `trigger/` background tasks.
2. Metadata and binary artifacts are always in separate layers — Postgres and Supabase Storage.
3. RLS is the single source of truth for access; application code never replicates or shadows a policy.
4. Customer data and generated artifacts remain in EU regions at all times.
5. Client components are used only where browser interactivity or live state is required.
6. Service-role writes are allowed only in `trigger/` and `app/api/webhooks/`.
