# Pipeline Rules

Source of truth for all Trigger.dev background task behavior.
Read this file before implementing or modifying Features 07a, 07b, or 07c.

## Invariants

1. **All Claude invocations happen in `trigger/` only.** Never call Claude
   from a Next.js route handler, server action, or component. Violations
   risk timeout, no retry, and broken recovery.

2. **Tasks are idempotent.** A task that runs twice for the same input must
   produce the same result or detect and skip duplicate work. Use the
   `benchmark_runs.status` field to guard against re-runs.

3. **Monthly cache before AI calls.** Before triggering a new run, check
   `benchmark_runs` for an existing row with matching `(company_slug, yyyy-mm)`
   and `status = 'completed'`. Return the cached result if found.

4. **Quota enforced before enqueue.** Before creating a `benchmark_runs` row,
   verify the client has fewer than 3 runs today (UTC midnight boundary).
   Quota check and row creation must be atomic to prevent races.

5. **Status machine — forward only.**
   `queued → researching → benchmarking → matching → drafting → completed`
   Failure at any step sets `status = 'failed'`. Insufficient public data sets
   `status = 'low_signal'`. Terminal states: `completed`, `failed`, `low_signal`.
   No backward transitions allowed.

6. **No personal data in task payloads.** Payloads contain only public
   company data, run IDs, and structured KPI results. Client PII never passes
   through Trigger.dev task state.

7. **Service role only.** Pipeline tasks use the Supabase service role
   exclusively. No user JWT is passed into or used inside a task.

8. **Storage + metadata atomicity.** If a storage write succeeds but the
   Postgres row write fails, the task must delete the orphaned artifact
   and set `status = 'failed'`. Never leave ghost objects in storage.

## Status Definitions

| Status | Meaning |
|---|---|
| `queued` | Run created, task not yet started |
| `researching` | Task 01 active — Claude searching + extracting KPIs |
| `benchmarking` | Task 02 active — peer comparison running |
| `matching` | Task 02 active — expert scoring running |
| `drafting` | Task 03 active — proposal PDF being generated |
| `completed` | All tasks done, proposal in `pending_review` |
| `failed` | Unrecoverable error at any step |
| `low_signal` | Fewer than 4 KPIs with medium+ confidence found |

## Task Definitions

### Task 01 — company-research-kpi (`trigger/company-research-kpi.ts`)

**Trigger:** HTTP from `app/api/runs/start` after quota and cache checks pass.

**Input:**
```ts
{ runId: string; companyName: string; industryHint?: string }
```

**Steps:**
1. Set `benchmark_runs.status = 'researching'`
2. Call Claude Sonnet 4.6 with `web_search` tool. Target GRI 403-9
   sustainability reports, regulatory filings, ESG data packs, annual
   reports. System prompt from `lib/prompts/research.ts`.
3. Extract 13 named KPIs: FFR, TRI, TRIFR, LTI, LTIFR, HPRIs, fatalities,
   Scope 1 emissions, water withdrawal, hazardous waste, EHS board oversight,
   ISO 45001 certified, SEVESO tier. Each KPI carries: value, unit,
   confidence (`low` | `medium` | `high`), source URL.
4. Write `kpi_data` JSONB to `benchmark_runs`.
5. Set `status = 'benchmarking'` and chain Task 02.

**Low signal:** Fewer than 4 KPIs at medium+ confidence → set
`status = 'low_signal'` and stop. Client is not billed for low-signal runs.

**Output:** `kpi_data` written to `benchmark_runs`.

---

### Task 02 — benchmark-match (`trigger/benchmark-match.ts`)

**Trigger:** Chained from Task 01 on success.

**Input:**
```ts
{ runId: string }
```

**Steps:**
1. Load `kpi_data` from `benchmark_runs`.
2. Set `status = 'matching'`
3. Compute industry peer set. Compare company KPIs against peer medians.
4. Compute CHF risk exposure using these cost factors:
   - Fatality gap: CHF 3,500,000 per event/year
   - LTI gap: CHF 45,000 per event/year
   - HPRI gap: CHF 12,000 per event/year
   - Sum = Total Opportunity Value
5. Load all approved experts from `experts` table (service role).
6. Score each expert against the company's risk profile: competency tag
   overlap weighted by KPI gap severity. Rank top 3 with `why_match` text.
7. Write `benchmark_data`, `risk_value_chf`, `risk_range_low`,
   `risk_range_high`, `confidence`, `shortlist` JSONB to `benchmark_runs`.
8. Set `status = 'drafting'` and chain Task 03.

**Output:** Benchmark and shortlist written to `benchmark_runs`.

---

### Task 03 — proposal-generate (`trigger/proposal-generate.ts`)

**Trigger:** Chained from Task 02 on success.

**Input:**
```ts
{ runId: string }
```

**Steps:**
1. Load full run data from `benchmark_runs`.
2. Load top 3 relevant vault documents from `vault_documents` (by tag match).
3. Call Claude Sonnet 4.6 to author proposal narrative. System prompt from
   `lib/prompts/proposal.ts`. Input: KPIs, benchmark, shortlist, vault excerpts.
4. Render proposal PDF via React-PDF (`components/pdf/proposal-pdf.tsx`).
   Sections: executive summary, KPI findings, peer comparison, CHF risk
   figure, expert shortlist with why-match, package options, next steps.
5. Upload PDF to `proposals` Supabase Storage bucket.
   Path: `proposals/{runId}/proposal.pdf`
6. Insert row into `proposals`:
   `{ run_id, client_id, pdf_path, status: 'pending_review' }`
7. Set `benchmark_runs.status = 'completed'`.

**On storage failure:** Delete uploaded PDF if Postgres insert fails.
Set `status = 'failed'`.

**Output:** PDF in Storage, `proposals` row with `status = 'pending_review'`.
Proposal is not visible to the client until an admin approves it.

## Claude Model

All pipeline tasks use `claude-sonnet-4-6`. Do not change the model without
updating this file and `lib/claude.ts`.

## Prompt Templates

Live in `lib/prompts/`:
- `research.ts` — system prompt for company research + KPI extraction
- `proposal.ts` — system prompt for proposal narrative authoring

Prompts are TypeScript string templates. Task files import from `lib/prompts/`,
never define prompts inline.

## Retry Policy

Default Trigger.dev retry: 3 attempts with exponential backoff.
Tasks are idempotent by status-machine guard, so retries are safe.
Tasks in a terminal state (`completed`, `failed`, `low_signal`) do not retry.

## Cost Controls

- Monthly cache by `(company_slug, yyyy-mm)` prevents duplicate AI calls
  for the same company within a calendar month.
- Daily quota of 3 runs per user caps per-user Claude spend.
- Vault document loading is capped at 3 documents to bound context size.
- Low-signal early exit prevents wasted Task 02 and Task 03 runs.
