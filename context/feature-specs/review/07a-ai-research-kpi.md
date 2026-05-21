# Feature 07a — AI Pipeline: Company Research + KPI Extraction

## Overview

First Trigger.dev task in the AI pipeline. Given a company name, Claude
Sonnet 4.6 searches public sources for EHS data, extracts 13 named KPIs,
and writes structured results to `benchmark_runs`. Includes daily quota
enforcement and monthly cache lookup before any AI work is done.

Read `context/pipeline-rules.md` before implementing this feature.

## Routes / Files

```
app/api/
  runs/
    start/route.ts            — POST: quota check → cache check → enqueue
    [runId]/status/route.ts   — GET: return run status + partial data
trigger/
  company-research-kpi.ts    — Trigger.dev task definition
lib/
  claude.ts                  — Anthropic SDK client singleton
  prompts/
    research.ts              — system prompt for KPI extraction
  runs.ts                    — quota check, cache lookup, slug helpers
```

## Dependencies

- Feature 03 (DB schema): `benchmark_runs` table, service role client
- Feature 04 (auth): `requireAuth` helper for the start route
- Trigger.dev project provisioned
- Anthropic API key provisioned

## Env Vars

```
ANTHROPIC_API_KEY
TRIGGER_SECRET_KEY
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

---

## Skeleton

> Goal: start route exists, quota and cache checks run, Trigger.dev task
> is enqueued, status polling works, basic KPI extraction completes.

### What to build

- `lib/claude.ts`: Anthropic SDK client singleton using `ANTHROPIC_API_KEY`.
  Export a configured `Anthropic` instance. Model constant:
  `export const CLAUDE_MODEL = 'claude-sonnet-4-6'`.
- `lib/runs.ts`:
  - `slugify(name: string): string` — normalize company name to slug
  - `checkQuota(clientId: string, supabase): Promise<boolean>` — count
    runs today (UTC midnight), return false if >= 3
  - `checkCache(slug: string, month: string, supabase): Promise<Run | null>`
    — find completed run with matching `(company_slug, cached_month)`
- `app/api/runs/start/route.ts`: POST handler.
  1. `requireAuth` — 401 if not authenticated
  2. Parse `{ companyName, industryHint? }` from body
  3. `checkQuota` — 429 if at limit
  4. `checkCache` — return cached run ID if found (skip enqueue)
  5. Insert `benchmark_runs` row with `status = 'queued'`
  6. Trigger `company-research-kpi` task with `{ runId, companyName, industryHint }`
  7. Return `{ runId }`
- `app/api/runs/[runId]/status/route.ts`: GET handler. Authenticated.
  Returns `{ status, kpi_data?, benchmark_data?, shortlist?, risk_value_chf? }`
  for the requesting client's run (ownership check via RLS).
- `trigger/company-research-kpi.ts`: Trigger.dev task. Sets status to
  `'researching'`, calls Claude with a basic research prompt, writes
  `kpi_data` to the run row. Status to `'benchmarking'` on success,
  `'failed'` on error.
- `lib/prompts/research.ts`: basic system prompt. Full prompt in Full
  Implementation.

### Acceptance

- POST `/api/runs/start` creates a run and triggers the task
- Quota check blocks a 4th run on the same day
- Cache check returns the existing run ID on a repeat company
- Trigger.dev dashboard shows the task executing
- `benchmark_runs` row status transitions from `queued` → `researching`
  → `benchmarking`
- `kpi_data` is populated in the DB after task completes

---

## Full Implementation

### KPI schema

Each entry in `kpi_data` (JSONB array):

```ts
interface KpiEntry {
  name: string        // canonical KPI name (see list below)
  value: string       // extracted value with unit, e.g. "2.4 / 200k hrs"
  unit: string        // normalized unit
  confidence: 'low' | 'medium' | 'high'
  source_url: string  // direct link to the source document
  source_label: string // e.g. "Sustainability Report '25"
  year: number | null
}
```

**13 target KPIs:**

| Name | Full name |
|---|---|
| `ffr` | Fatal Frequency Rate |
| `tri` | Total Recordable Injuries |
| `trifr` | Total Recordable Injury Frequency Rate |
| `lti` | Lost-Time Injuries |
| `ltifr` | Lost-Time Injury Frequency Rate |
| `hpri` | High Potential Risk Incidents |
| `fatalities` | Fatalities (absolute count) |
| `scope1_emissions` | Scope 1 GHG Emissions (CO₂e) |
| `water_withdrawal` | Water Withdrawal |
| `hazardous_waste` | Hazardous Waste Generated |
| `ehs_board_oversight` | EHS Board-Level Oversight (yes/no) |
| `iso45001` | ISO 45001 Certified (yes/no) |
| `seveso_tier` | SEVESO Tier classification (none/lower/upper) |

### Research prompt (`lib/prompts/research.ts`)

The system prompt must instruct Claude to:

1. Use the `web_search` tool to find: GRI 403-9 sustainability reports,
   annual reports, CDP filings, EPER/E-PRTR filings, regulatory
   enforcement records, ESG data packs.
2. Extract each of the 13 KPIs if found. If a KPI is not found in public
   sources, omit it (do not hallucinate a value).
3. For each KPI, record the direct source URL and document name.
4. Assign confidence based on source quality:
   - `high`: official company report or regulatory filing
   - `medium`: third-party ESG aggregator or news with citation
   - `low`: inference or indirect mention
5. Return a JSON array of `KpiEntry` objects. No narrative text in the
   response — structured data only.
6. If the company has multiple legal entities, focus on the entity whose
   footprint matches the `industryHint` if provided.

The prompt uses `claude-sonnet-4-6` with `max_tokens: 4096` and
`temperature: 0`.

### Low signal detection

After Claude responds:
- Count KPIs with `confidence = 'medium'` or `'high'`
- If fewer than 4: set `status = 'low_signal'`, do not chain Task 02
- Low-signal runs are still written to DB (client sees the status message)

### Prompt caching

Use Anthropic prompt caching on the system prompt (mark with
`cache_control: { type: 'ephemeral' }`). The system prompt is long and
static — caching reduces latency and cost on repeated calls.

### Quota enforcement detail

Quota is checked transactionally:

```sql
select count(*) from benchmark_runs
where client_id = $1
  and created_at >= date_trunc('day', now() at time zone 'UTC')
  and status != 'low_signal'  -- low signal runs do not count against quota
```

Return 429 with `{ error: 'quota_exceeded', reset_at: '<midnight UTC>' }`
if count >= 3.

### Cache lookup detail

```sql
select id, status, kpi_data, benchmark_data, shortlist, risk_value_chf
from benchmark_runs
where company_slug = $1
  and cached_month = $2           -- format: 'yyyy-mm'
  and status = 'completed'
order by created_at desc
limit 1
```

If found, return the cached `runId` with `{ cached: true }` in the response.
The client UI shows the same result as a fresh run. The cached run is not
duplicated in the DB.

### Error handling

- Claude API error → set `status = 'failed'`, log to Sentry
- Web search returns no results for company → treat as low signal
- Task timeout (Trigger.dev default 300s) → set `status = 'failed'`

### Acceptance

- All 13 KPIs attempted and extracted when present in public sources
- Source URLs are valid and point to the cited document
- Confidence levels are assigned correctly
- Low-signal detection works: status set, Task 02 not triggered
- Quota blocks at 3 (not 4) and resets at UTC midnight
- Cache returns correct previous run within the same calendar month
- `kpi_data` JSONB is well-formed and matches the `KpiEntry` schema
- Prompt cache hit rate visible in Anthropic dashboard after repeated runs
- `npm run lint` and `npm run build` pass
