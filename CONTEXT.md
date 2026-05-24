# SME24

An AI-powered EHS consulting marketplace. A client triggers a Run against a company name; the pipeline extracts KPIs, benchmarks peers, matches experts, and generates a Proposal — before any payment.

## Language

### Pipeline

**Run**:
One full pipeline execution triggered by a client entering a company name. Covers research, KPI extraction, peer benchmarking, expert matchmaking, and Proposal generation as a single atomic unit. Quota-gated at trigger time (default: 3/day per client).
_Avoid_: research run, benchmark job, pipeline job, task

**Benchmark**:
A reusable snapshot of a company's extracted KPIs and peer comparison data. Keyed by `(company_slug, yyyy-mm)`. Created by the pipeline on first Run for a company in a given month; reused by subsequent Runs in that month without re-calling Claude. A Run references its Benchmark by id.
_Avoid_: analysis, report, research, snapshot

**Shortlist**:
The ranked top-3 expert matches produced by a Run. Computed once at Run time and stored (expert ids, scores, tag snapshot). Never re-derived from live expert data — the Proposal always shows what the pipeline decided. Stored on the `runs` row or a child `shortlist_items` table.
_Avoid_: recommendations, matches, results

**Competency Tag**:
An admin-defined label from the `competency_tags` table describing an area of EHS expertise. Experts select from this fixed list on their application. The pipeline scores experts by tag overlap with a company's risk profile. No freetext — the vocabulary is controlled by admin. Canonical categories (client-confirmed): Process Safety, Safety Leadership, Operational Excellence, Asset Integrity, Explosion Protection, ESG & Sustainability, Industrial Transformation, Safety Culture. Standards (e.g. ISO 45001) appear as badge details within expert cards, not as top-level category labels.
_Avoid_: skill, specialty, tag, keyword

**Knowledge Base**:
The admin-managed library of EHS reference documents (ISO 45001, sector guides, compliance frameworks). Used exclusively to ground the AI pipeline at extraction and proposal stages. No client access.
_Avoid_: vault, admin vault, EHS vault, knowledge vault

### Proposals and Deliverables

**Proposal**:
A child of a Run. One Run produces at most one Proposal. Holds the benchmark data, expert shortlist, and a generated PDF. Status: `Pending Review → Approved → Released`. A Run without an Approved Proposal cannot proceed to checkout. PDF stored in Supabase Storage; the `runs` table references it and its approval status.
_Avoid_: report (reserved for the Assessment Report delivered post-Engagement), brief, pitch

**Assessment Report**:
The expert's deliverable for an Engagement. Uploaded by the expert to the Engagement Vault when marking the Engagement `Delivered`. Always distinct from the Proposal — the Proposal is read-only after `Released` and is never amended or reused as the Assessment Report.
_Avoid_: final report, assessment, report

### Users and Roles

**Client**:
A user with the `client` role. Default role assigned at signup. Triggers Runs, purchases Packages, and accesses the Engagement Vault. Authenticates via magic link or Google OAuth.
_Avoid_: user, buyer, company, customer

**Expert**:
A user with the `expert` role. Admin-approved after application review. Appears in the expert directory and pipeline matchmaking. Delivers Assessment Reports. Authenticates via Google OAuth only. Mutually exclusive with Client — one auth user, one role.
_Avoid_: consultant, advisor, professional

**Admin**:
A user whose email appears in the `ADMIN_EMAILS` env-var whitelist. No database role or table. Reviews Proposals, manages the Knowledge Base, and approves Expert applications. Not a role in the `profiles` table.
_Avoid_: superuser, moderator, staff

**Application**:
A submitted expert onboarding form. Requires Google OAuth before Step 1 — the applicant must be authenticated so `profile_id` is set at submission time. States: `Submitted → Approved | Rejected`. No draft state — the form submits atomically or not at all. Rejection is permanent for that row; the expert may reapply (new row). On Approval, a new `experts` row is created from the application data; the `applications` row remains as the immutable audit record.
_Avoid_: onboarding, registration, profile request

**Quota**:
A per-Client daily limit on Run triggers (default: 3). Measured as `COUNT(*) WHERE client_id = x AND created_at::date = current_date`. Resets at midnight UTC. Checked at trigger time — if quota is exhausted the Run is rejected before any AI work starts.
_Avoid_: credits, tokens, allowance

### Payments and Engagements

**Package**:
A fixed-price product definition. Defined in `lib/packages.ts`. The input to Stripe Checkout. Not a database entity. Four packages:
- **EHS Snapshot** — CHF 2,000. Remote (1 day). Output: Top 5 Risks. Via Stripe Checkout.
- **EHS Reality Check** — CHF 5,000. On-Site (2 days). Output: Top 20 Risks. Via Stripe Checkout.
- **EHS Transformation Plan** — CHF 10,000. On-Site (5 days). Output: Gap Plan & Timeline. Via Stripe Checkout.
- **EHS Execution Partner** — CHF 10,000 + CHF 1,850/day (incl. travel & living). On-Site + Ongoing. Output: Measured Risk Reduction. Via contact form only — not a Stripe product.
_Avoid_: plan, tier, service, product

**Order**:
The financial record of a Stripe transaction. Written to the `orders` table by the Stripe webhook. Holds Stripe metadata, amount, and package id. Immutable after creation. Created atomically with its Engagement.
_Avoid_: purchase, transaction, payment, invoice

**Engagement**:
One purchased package, created by the Stripe webhook atomically alongside its Order. Has a linear lifecycle: `Open → Confirmed → In Progress → Delivered → Closed`. `Open`: created by the webhook, no expert assigned yet. `Confirmed`: admin assigns an expert; notification emails fire to both parties via Resend at this transition only. Linked to its Order via `order_id`. Scopes the Engagement Vault and all delivery artifacts.
_Avoid_: project, contract, booking, order

**Engagement Vault**:
Per-engagement document store scoped to one Engagement. Holds the Assessment Report and any delivery artifacts. Accessible only to the Client and the assigned Expert via signed URLs.
_Avoid_: vault, document vault, project vault, client vault

## Example Dialogue

> **Dev**: A client runs a benchmark on Glencore — does that create a Run immediately?
>
> **Domain expert**: Yes, triggering creates the Run row and starts the Trigger.dev task. But first we check Quota — if they've already triggered 3 Runs today it's rejected right there.
>
> **Dev**: And the Benchmark — does that also get created right away?
>
> **Domain expert**: Only if one doesn't exist for `(glencore, 2026-05)`. If it does, the Run just references the existing Benchmark and skips the Claude extraction calls.
>
> **Dev**: When does the Proposal appear in the admin console?
>
> **Domain expert**: Once the pipeline finishes the Shortlist, it generates the PDF and creates the Proposal row with status `Pending Review`. The admin sees it there. Until they approve it, the Client can't see it and can't go to checkout.
>
> **Dev**: What if the admin rejects the Proposal?
>
> **Domain expert**: That's not a workflow we have — admin either approves or leaves it pending. There's no rejection state on a Proposal. They can edit the Knowledge Base and re-trigger a new Run if the output was bad.
>
> **Dev**: After the client pays, what exactly gets created?
>
> **Domain expert**: The Stripe webhook fires, we write an Order row and an Engagement row atomically. The Engagement starts at `Open`. Admin assigns an expert → transitions to `Confirmed` → Resend fires notification emails to both parties. The Order is the financial record, never touched again. The Engagement is what we mutate as the work progresses.
