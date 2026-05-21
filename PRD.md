# SME24 — Product Requirements Document

**Product:** SME24 EHS Consulting Marketplace
**Domain:** sme24.ch
**Status:** Ready for build (specs complete, services pending provisioning)
**Last updated:** 2026-05-21

---

## Problem Statement

Mid-market and enterprise companies in regulated industries (manufacturing,
chemicals, logistics, energy, construction) need qualified EHS (Environmental,
Health & Safety) expertise but face three compounding problems:

1. **Expert discovery is manual and slow.** Finding a senior EHS professional
   with the right industry background requires weeks of outreach, calls, and
   proposals before a company even knows if the expert is a fit.

2. **Scoping is opaque.** Companies don't know what their EHS risk exposure
   actually is before committing budget. They're asked to sign off on a
   four-week scoping engagement before seeing any numbers.

3. **The market is dominated by large consultancies** who assign junior staff
   to mid-market clients, billing at senior rates. Companies with 500–5,000
   employees are too large to ignore EHS risk and too small to command senior
   attention from the big firms.

The result: companies either delay EHS work until a regulatory or safety event
forces action, or they overspend on generic consulting that doesn't address
their specific risk profile.

---

## Solution

SME24 is an AI-powered EHS consulting marketplace. Before any money changes
hands, the platform:

1. Crawls public sustainability reports and regulatory filings for the
   company the client names.
2. Extracts 13 EHS KPIs, benchmarks them against industry peers, and
   computes a CHF-denominated risk exposure figure.
3. Scores a curated network of senior EHS professionals against the
   company's specific risk profile and surfaces a ranked top-3 shortlist.
4. Generates a structured proposal PDF authored by Claude and reviewed
   by a human expert before release.

The client sees concrete numbers — peer comparison, CHF risk figure, expert
shortlist with reasons — then buys a fixed-price engagement in one click
via Stripe. No proposals, no scoping calls, no surprises.

The platform is built on Next.js 15, Supabase (EU/Frankfurt), Trigger.dev
for durable AI pipeline tasks, and Claude Sonnet 4.6 for research and
proposal authoring.

---

## User Stories

### Client (EHS manager, COO, compliance officer)

1. As a client, I want to register with a magic link so that I don't have
   to manage a password.
2. As a client, I want to register with Google OAuth so that I can sign in
   with a single click.
3. As a client, I want to enter a company name and trigger an AI research
   run so that I can see the company's EHS risk profile without any manual
   work.
4. As a client, I want to add an industry hint when starting a run so that
   the AI can focus on the most relevant data.
5. As a client, I want to see a live status indicator while the AI pipeline
   is running so that I know the run is in progress and I can close my tab.
6. As a client, I want to see the extracted KPIs with source citations so
   that I can verify the AI's findings before trusting them.
7. As a client, I want to see how my company compares to industry peers on
   each KPI so that I understand where the gaps are.
8. As a client, I want to see a CHF-denominated risk exposure figure so that
   I can quantify the cost of inaction in terms my board understands.
9. As a client, I want to see a ranked shortlist of three senior EHS experts
   matched to my risk profile so that I don't have to evaluate the entire
   network myself.
10. As a client, I want to see a "why this match" explanation for each expert
    so that I understand why they were ranked for my specific situation.
11. As a client, I want to know that every AI-generated proposal is reviewed
    by a human expert before I see it so that I can trust the output.
12. As a client, I want to receive an email notification when my proposal is
    ready so that I don't have to keep checking the portal.
13. As a client, I want to view and download the proposal PDF from my portal
    so that I can share it with colleagues.
14. As a client, I want to select a fixed-price package (Snapshot, Reality
    Check, Transformation Plan) so that I know exactly what I'm paying before
    I commit.
15. As a client, I want Swiss VAT shown explicitly on the invoice so that
    my finance team can process it without questions.
16. As a client, I want to complete checkout in one click via Stripe so that
    I don't have to negotiate or sign a contract.
17. As a client, I want my project workspace to open automatically after
    payment so that I can immediately see my engagement status.
18. As a client, I want to receive a purchase confirmation email with my
    order ID and engagement link so that I have a record.
19. As a client, I want to see the assigned expert's contact details when
    my engagement is confirmed so that I can schedule kickoff.
20. As a client, I want to access all engagement documents in a secure vault
    so that I don't have to hunt through emails for files.
21. As a client, I want to download the final assessment report when the
    expert delivers it so that I have a single definitive document.
22. As a client, I want to leave a star rating and comment when my engagement
    closes so that I can give feedback on the expert's work.
23. As a client, I want to see my daily run quota so that I know how many
    more runs I can trigger today.
24. As a client, I want to view all my past runs and their results so that
    I can compare companies over time.
25. As a client, I want to browse the expert network so that I can explore
    profiles beyond my assigned shortlist.
26. As a client, I want to view an expert's full profile and bio so that I
    can make an informed decision before purchasing.
27. As a client, I want to contact an expert directly from their profile so
    that I can ask a question before buying.
28. As a client, I want to see a "low signal" status if the AI couldn't find
    enough public data so that I know why there's no proposal and I'm not
    charged.

### Expert (senior EHS professional)

29. As an expert, I want to apply to join the SME24 network via a
    multi-step form so that I can submit my qualifications at my own pace.
30. As an expert, I want to describe my bio and specialty in my own words
    so that clients understand my background.
31. As an expert, I want to select competency tags from a predefined list
    so that the AI can match me to relevant risk profiles.
32. As an expert, I want to upload a profile photo so that clients can put
    a face to my name.
33. As an expert, I want to optionally upload my CV so that the admin can
    verify my background during review.
34. As an expert, I want to see a confirmation after submitting my
    application so that I know it was received.
35. As an expert, I want to receive an email when my application is approved
    so that I know my profile is live.
36. As an expert, I want to receive an email when my application is rejected
    with optional feedback so that I understand why.
37. As an expert, I want my profile to appear on the public expert directory
    immediately upon admin approval so that I'm visible to clients.
38. As an expert, I want to sign in with Google OAuth so that I use a
    professional account I already have.
39. As an expert, I want to receive an email when I'm assigned to a new
    engagement so that I can reach out to the client promptly.
40. As an expert, I want to receive the client's contact details when an
    engagement is confirmed so that I can schedule kickoff directly.

### Admin (Philipp Hotz)

41. As an admin, I want to see a dashboard with counts of pending proposals,
    pending expert applications, and recent orders so that I can prioritise
    my review queue.
42. As an admin, I want to see a list of proposals pending review so that
    I can work through them in order.
43. As an admin, I want to view a proposal PDF inline in the browser without
    downloading it so that I can review it quickly.
44. As an admin, I want to approve a proposal with a single click so that
    it's released to the client immediately.
45. As an admin, I want to reject a proposal with an optional reason so that
    the pipeline can be corrected and re-run.
46. As an admin, I want clients to receive an email notification immediately
    when I approve their proposal so that they know it's ready.
47. As an admin, I want to review expert applications with full bio, photo,
    tags, and CV access so that I can make an informed approval decision.
48. As an admin, I want to approve an expert application and have their
    profile publish instantly so that there's no delay between decision and
    visibility.
49. As an admin, I want to reject an expert application with a reason so
    that the candidate understands the decision.
50. As an admin, I want to upload EHS reference documents (ISO 45001, sector
    guides, compliance frameworks) to the knowledge vault so that the AI
    pipeline can use them for proposal grounding.
51. As an admin, I want to tag vault documents by topic so that the pipeline
    can retrieve the most relevant documents for each run.
52. As an admin, I want to delete vault documents so that outdated reference
    material doesn't ground future proposals.
53. As an admin, I want my admin access to require no code change to grant
    to a new person so that access management is operationally simple.

### Public visitor (unauthenticated)

54. As a visitor, I want to read a clear explanation of how SME24 works so
    that I can decide whether it's relevant before signing up.
55. As a visitor, I want to see the fixed package prices upfront so that
    I can budget before starting a run.
56. As a visitor, I want to browse the expert network without signing in
    so that I can evaluate the network quality before committing.
57. As a visitor, I want to view individual expert profiles so that I can
    assess their background and relevance.
58. As a visitor, I want to send a contact message to an expert from their
    profile so that I can ask a question informally.
59. As a visitor, I want to submit a contact form so that I can reach
    Philipp directly with a question or custom requirement.
60. As a visitor, I want to understand what "Execution Partner" means so
    that I know when to use the contact form instead of self-serve checkout.
61. As an expert candidate, I want to apply to join from the public website
    without needing an account first so that the barrier is low.

---

## Implementation Decisions

### Build approach

**Walking skeleton first, then polish.** Pass 1 wires every feature into a
running app with minimal UI. Pass 2 completes full implementation per feature.
Pass 3 handles edge cases, error states, and monitoring. This ensures the
full stack is integrated and deployable before any feature is "finished."

**All specs written before any code.** 13 feature specs live in
`context/feature-specs/review/`. Each spec has a `## Skeleton` section and
a `## Full Implementation` section corresponding to Pass 1 and Pass 2.

### Feature build sequence

```
02  Marketing site (ships to production first — no portal dependency)
03  Database schema + Supabase setup (foundation for all portal work)
04  Authentication (magic link + Google OAuth; LinkedIn deferred to v2)
05  Expert application + admin approval
06  Expert directory + public profiles + contact dialog
    [pipeline-rules.md written here]
07a AI pipeline: company research + KPI extraction (Trigger.dev + Claude)
07b AI pipeline: benchmarking + matchmaking
07c AI pipeline: proposal PDF generation (React-PDF)
08  Admin knowledge vault + proposal review console
09  Stripe checkout + webhook (test mode only at launch)
10  Client project workspace (dashboard, run detail, engagement workspace)
11  Transactional email — Resend (extends Feature 02 foundation)
12  Error monitoring — Sentry
13  Production deployment + E2E stress test
```

### Data model

Eight Postgres tables (Supabase, EU Frankfurt):
`profiles`, `experts`, `benchmark_runs`, `proposals`, `orders`,
`engagements`, `vault_documents`, `feedback`.

Key relationships:
- `profiles` → extends `auth.users` (1:1)
- `experts` → belongs to `profiles` (1:1, not every profile is an expert)
- `benchmark_runs` → belongs to `profiles` (client)
- `proposals` → belongs to `benchmark_runs` (1:1)
- `orders` → belongs to `benchmark_runs` + `profiles`
- `engagements` → belongs to `orders` (1:1)
- `feedback` → belongs to `engagements` (1:1)

### RLS as the access layer

Supabase RLS is the canonical access layer. Application code never
replicates RLS logic. Service role is restricted to `trigger/` pipeline
tasks and `app/api/webhooks/` handlers only. Server actions use the
scoped user client.

### AI pipeline (three Trigger.dev tasks)

Tasks are chained: Task 01 triggers Task 02 on success; Task 02 triggers
Task 03 on success.

**Task 01 (company-research-kpi):** Claude Sonnet 4.6 with `web_search`.
Extracts 13 named KPIs (FFR, TRI, TRIFR, LTI, LTIFR, HPRIs, fatalities,
Scope 1 emissions, water withdrawal, hazardous waste, EHS board oversight,
ISO 45001 certified, SEVESO tier). Each KPI carries value, unit,
confidence (low/medium/high), and source URL. Low-signal exit if fewer
than 4 KPIs reach medium+ confidence.

**Task 02 (benchmark-match):** Static industry peer data (7 sectors) +
CHF risk cost factors (fatality: CHF 3.5M/event, LTI: CHF 45k, HPRI:
CHF 12k). Expert scoring = tag overlap weighted by KPI gap severity.
Top 3 shortlist with `why_match` string per expert (template-generated,
not a Claude call).

**Task 03 (proposal-generate):** Claude Sonnet 4.6 authors executive
summary, KPI findings narrative, and recommended next step. React-PDF
renders the full proposal document. PDF uploaded to Supabase Storage;
`proposals` row inserted with `status = 'pending_review'`. Proposal is
not visible to the client until admin approves.

**Pipeline invariants (from `context/pipeline-rules.md`):**
- All Claude calls happen in `trigger/` only — never in route handlers
- Status machine is forward-only: `queued → researching → benchmarking → matching → drafting → completed`
- Monthly cache by `(company_slug, yyyy-mm)` prevents duplicate AI calls
- Daily quota: 3 runs per user (low-signal runs do not count against quota)
- Service role only inside tasks — no user JWT passed in
- Storage + Postgres writes are atomic: orphaned artifacts are cleaned up

### Authentication

- Clients: magic link (email OTP) or Google OAuth
- Experts: Google OAuth only (LinkedIn OAuth deferred to v2)
- Admin: `ADMIN_EMAILS` env-var whitelist, no admins table
- Supabase database trigger creates `profiles` row on first sign-in
  with `role = 'client'`. Expert role set by admin approval.

### Packages and payments

Four packages:
- EHS Snapshot: CHF 2,000 (1 remote day)
- EHS Reality Check: CHF 5,000 (2 on-site days)
- EHS Transformation Plan: CHF 10,000 (5 on-site days)
- EHS Execution Partner: CHF 10,000 + CHF 1,850/day (contact form only)

Packages 1–3 via Stripe Checkout with `automatic_tax: { enabled: true }`
for Swiss MWST (8.1%). Stripe webhook creates `orders` + `engagements`
rows idempotently (guarded by `stripe_session_id` uniqueness check).
**Test mode only at launch** — live mode blocked on Swiss legal entity
activation (IC HOTZ AG).

### Marketing site

- 5 pages: Home, How It Works, Expert Network, Packages, Contact
- English only — no next-intl, no `copy/de` (bilingual deferred to v2)
- Domain: `sme24.ch`
- Warm off-white background (~`oklch(0.97 0.005 90)`), high-contrast
  black typography, minimal color
- Expert Network page: database-driven with 4 seeded placeholder experts
  from day one. Handles empty state gracefully.
- Contact form: Resend integration (same `lib/resend.ts` used by Feature 11)

### Email

`lib/email.ts` exports typed send functions for all 5 email types:
purchase confirmation, expert approved, expert rejected, proposal ready,
engagement contact details. All sends are best-effort (failure logged,
never propagates to caller). React Email templates for HTML formatting.

### Error monitoring

Sentry with EU region. `captureRunError(runId, stage, error)` helper
for pipeline tasks. Alert rules for pipeline failures and payment webhook
failures.

---

## Testing Decisions

### What makes a good test

Tests should verify external behavior observable to the user or to calling
code — not internal implementation details. A test that breaks when you
rename a private variable is a bad test. A test that breaks when the
expert scoring algorithm produces the wrong shortlist order is a good test.

### Modules to test

**Unit tests (isolated, fast):**
- `lib/benchmark.ts` — CHF risk calculation with known gap inputs
- `lib/matching.ts` — expert scoring and ranking with fixture expert data
- `lib/runs.ts` — quota check logic, cache lookup, slug normalization
- `lib/auth.ts` — `isAdmin()` with various email list formats

**Integration tests (hit real Supabase, use test DB):**
- RLS policies: verify anon client cannot read private rows, verify
  client can only read their own `benchmark_runs`, verify service role
  bypass works
- Expert approval flow: submit application → admin approve → verify
  `status = 'approved'` and `profiles.role = 'expert'`
- Stripe webhook handler: replay a `checkout.session.completed` event
  twice, verify idempotent (one `orders` row, not two)

**End-to-end (Playwright, against staging):**
- Full pipeline run: enter company → pipeline completes → proposal created
- Stripe checkout: package selection → test card → workspace opens
- Expert application → admin approval → profile visible on directory

### Prior art

No existing tests in the codebase yet. The first test file should be
`lib/benchmark.test.ts` using Vitest (consistent with Next.js + TypeScript
ecosystem). RLS integration tests should use a local Supabase instance
via the Supabase CLI (`supabase start`).

---

## Out of Scope

- LinkedIn OAuth for experts (v2)
- Bilingual interface and `copy/de` translations (v2)
- Faceted filters on the expert directory
- Company contact and decider-extraction module (Module 03)
- Purchasing and contracting module, time-tracking, quality management
- Saved search history and bookmarked companies
- Live-mode Stripe (blocked on Swiss legal entity activation)
- Blog, content marketing, and careers pages
- Full privacy policy and Impressum body copy (placeholder links at launch)
- In-platform scheduling (v2) — platform emails contact details at Confirmed
- BI reporting dashboard
- EHS Vault / Bot for experts (spec TBD by Philipp Hotz post-v1)
- Dark mode
- Native mobile application
- Enterprise certifications (ISO, SOC-2)
- Ongoing maintenance post-launch

---

## Further Notes

**EU data residency is non-negotiable.** Supabase project must be in
`eu-central-1` (Frankfurt). Sentry and Resend must also be configured to
use EU regions. Trigger.dev Cloud is US-hosted but handles only task
orchestration — no PII passes through task payloads per `pipeline-rules.md`.
This must be verified before go-live (checklist in Feature 13 spec).

**Admin is Philipp Hotz (IC HOTZ AG).** The builder is Adarsh Yadav.
Philipp's email goes in `ADMIN_EMAILS` env var. Adding a second admin is
a one-line config change in Vercel — no code deploy needed.

**Stripe live mode is a hard dependency on the legal entity.** Philipp
needs to confirm when IC HOTZ AG is legally activated in Switzerland
before switching Stripe keys. Until then, the platform shows a "test mode"
banner in the portal. Swiss VAT registration (tax ID) is also required for
Stripe Tax — Philipp to provide.

**Prompt caching should be applied from day one.** Both the research
system prompt (Task 01) and the vault documents block (Task 03) should
use Anthropic prompt caching (`cache_control: { type: 'ephemeral' }`).
The system prompts are long and static — uncached invocations on a 3-run/day
quota will burn disproportionate Claude API budget.

**Service provisioning is Step 0** — before any code is written. All 7
services (Supabase, Vercel, Anthropic, Trigger.dev, Stripe, Resend, Sentry)
must be provisioned with credentials available before the walking skeleton
pass begins. Hitting a missing API key mid-Pass 1 breaks the connected
flow that skeleton validates.

**18-month solo project.** Timeline is not the primary constraint — quality
and correctness are. The spec-first + walking skeleton approach is designed
to prevent rework from late-discovered cross-feature dependencies.
