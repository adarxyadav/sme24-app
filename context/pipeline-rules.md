# Pipeline Rules

The AI pipeline executes as a single durable Trigger.dev task. All Claude
calls are in `trigger/` — never in request handlers.

## Trigger and Quota

- A Run is created and the task triggered when a Client submits a company name.
- Quota check at trigger time: `COUNT(*) WHERE client_id = x AND created_at::date = current_date`.
  Default limit: 3 Runs/day per Client. If exhausted, the Run row is NOT created and the request
  is rejected with a quota error.
- The Run row is written before the task starts. Status: `Pending → Running → Complete | Failed`.

## Benchmark Caching

- Key: `(company_slug, yyyy-mm)` where `company_slug` is a URL-safe normalisation of the
  company name and `yyyy-mm` is the current UTC month.
- On task start: query `benchmarks` for a matching key. If found, skip Steps 1–2 and link
  the existing Benchmark to this Run.
- If not found: execute Steps 1–2, write a new Benchmark row, link it to the Run.

## Pipeline Steps

### Step 1 — Company Research (Claude call)
- Input: company name, client context notes, Knowledge Base excerpts (retrieved by admin tags).
- Task: research publicly available EHS data — sustainability reports, regulatory filings,
  incident records, certifications.
- Output: structured JSON: `{ company_name, industry, region, ehs_summary, raw_kpis[] }`.
- Written to: `benchmarks.research_data` (JSONB).

### Step 2 — KPI Extraction and Peer Benchmarking (Claude call)
- Input: `research_data` from Step 1, Knowledge Base reference documents for the industry.
- Task: extract lagging and leading EHS KPIs, score each against industry peer benchmarks.
- Output: `{ extracted_kpis[], peer_comparison[], risk_profile_tags[] }`.
  `risk_profile_tags` are matched against the `competency_tags` vocabulary — no freetext.
- Written to: `benchmarks.kpi_data` (JSONB). Benchmark row is marked `complete` here.

### Step 3 — Expert Matchmaking (no Claude call)
- Input: `risk_profile_tags[]` from the Benchmark, active `experts` rows with their
  `competency_tag_ids[]`.
- Algorithm: overlap score = `|risk_profile_tags ∩ expert_tags| / |risk_profile_tags|`.
  Tie-break: expert `rating` desc, then `created_at` asc.
- Output: top-3 experts (ids, scores, tag snapshot at match time).
- Written to: `shortlist_items` rows linked to the Run. Never re-derived from live expert data.

### Step 4 — Proposal Generation (Claude call)
- Input: Benchmark data (Steps 1–2), Shortlist (Step 3), engagement parameters
  (package options, pricing), Knowledge Base context.
- Task: generate the narrative Proposal content — executive summary, risk highlights,
  peer benchmark comparison, expert shortlist rationale, recommended package.
- Output: structured content → rendered to PDF via a headless renderer.
- Written to: Supabase Storage under `proposals/{run_id}/proposal.pdf`.
  A `proposals` row is created with `status: Pending Review` and the storage path.

## After the Pipeline

- Run status is set to `Complete`.
- Admin sees the Proposal in the console (`Pending Review`).
- Admin approves → `status: Released`. Client can now view the Proposal and go to checkout.
- Admin cannot reject a Proposal — they leave it `Pending Review` and may trigger a new Run
  if the output needs improvement (e.g. after updating the Knowledge Base).

## Failure Handling

- If any Step fails, the Run status is set to `Failed` with an error code.
- The Client sees a failure state in the portal. No retry is automatic — the Client may
  trigger a new Run (quota permitting).
- Partial writes (e.g. Benchmark written but Proposal failed) are left as-is.
  Subsequent Runs reuse the cached Benchmark if within the same month.

## Claude Model

Anthropic Claude Sonnet 4.6 (`claude-sonnet-4-6`). All calls use prompt caching on the
Knowledge Base excerpts (stable system context, long TTL).
