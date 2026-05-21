# Feature 07b — AI Pipeline: Benchmarking + Matchmaking

## Overview

Second Trigger.dev task. Receives KPI data from Task 01, computes an
industry peer comparison, calculates the CHF risk exposure (Total
Opportunity Value), scores all approved experts against the company's
risk profile, and writes a ranked top-3 shortlist. Chains to Task 03
on completion.

Read `context/pipeline-rules.md` before implementing this feature.

## Files

```
trigger/
  benchmark-match.ts           — Trigger.dev task definition
lib/
  benchmark.ts                 — peer comparison + CHF risk calculation
  matching.ts                  — expert scoring + ranking algorithm
  industry-peers.ts            — static peer benchmark data by sector
```

## Dependencies

- Feature 03 (DB schema): `benchmark_runs`, `experts` tables
- Feature 07a: Task 01 must complete and set status to `'benchmarking'`

---

## Skeleton

> Goal: task runs after Task 01, loads KPI data, produces a shortlist
> of expert IDs, writes results to benchmark_runs.

### What to build

- `trigger/benchmark-match.ts`: Trigger.dev task triggered by chain from
  Task 01. Loads `kpi_data` from `benchmark_runs`. Queries all approved
  experts. Computes a basic score (tag overlap count). Writes `shortlist`
  JSONB to the run. Sets status to `'drafting'` and chains Task 03.
- `lib/matching.ts`: `scoreExperts(kpiData, experts)` — returns top 3
  experts with a `why_match` string. Basic implementation: count tag
  overlaps with risk categories derived from KPIs.

### Acceptance

- Task 02 triggers immediately after Task 01 completes
- `shortlist` JSONB contains 3 expert entries with IDs and `why_match`
- Status transitions from `'benchmarking'` → `'matching'` → `'drafting'`
- Task 03 is triggered on completion

---

## Full Implementation

### Peer benchmark data (`lib/industry-peers.ts`)

Static dataset of KPI medians by industry sector. Sectors covered at
launch:

| Sector | Key |
|---|---|
| Chemicals | `chemicals` |
| Manufacturing | `manufacturing` |
| Logistics / Transport | `logistics` |
| Energy | `energy` |
| Construction | `construction` |
| Mining | `mining` |
| General / Multi-sector | `general` |

Each sector entry contains median values for each of the 13 KPIs where
industry data is available. Source: public GRI reports and industry
association data.

If `industryHint` is not provided or doesn't match a sector key, default
to `general`.

### Peer comparison computation (`lib/benchmark.ts`)

```ts
interface PeerComparison {
  sector: string
  peers: PeerEntry[]    // 4–5 named peer companies with their KPI values
  gaps: GapEntry[]      // company value vs peer median, delta, direction
}

interface GapEntry {
  kpi: string
  company_value: number | null
  peer_median: number
  delta: number         // positive = worse than peers
  direction: 'above' | 'below' | 'on_par'
}
```

Gaps are used for both CHF risk calculation and expert scoring.

### CHF risk calculation (`lib/benchmark.ts`)

Apply cost factors from `pipeline-rules.md`:

```ts
function calculateRiskCHF(gaps: GapEntry[]): {
  value: number
  range_low: number
  range_high: number
  confidence: 'low' | 'medium' | 'high'
}
```

Cost factors:
- Fatality gap: CHF 3,500,000 per event/year above peer median
- LTI gap: CHF 45,000 per event/year above peer median
- HPRI gap: CHF 12,000 per event/year above peer median

Range: `value * 0.65` (low end) to `value * 1.35` (high end).

Confidence:
- `high`: fatalities, LTI, and HPRI all present with medium+ confidence
- `medium`: at least one of the three present
- `low`: all three missing, estimate based on secondary KPIs only

### Expert scoring algorithm (`lib/matching.ts`)

For each approved expert, compute a match score:

```ts
interface ExpertScore {
  expertId: string
  score: number
  why_match: string   // 1–2 sentence explanation for the client
}
```

**Scoring formula:**

1. Identify the top 3 risk gaps from `GapEntry[]` (highest absolute delta).
2. For each risk gap, check which expert competency tags are relevant
   to that gap's KPI category (mapping defined in `lib/matching.ts`).
3. Base score = number of relevant tags matched across top 3 gaps.
4. Bonus: +2 if expert's industry specialty matches the company's sector.
5. Bonus: +1 if expert has 30+ years experience.

**Tag → KPI gap category mapping** (defined statically in `lib/matching.ts`):

| KPI gap | Relevant tags |
|---|---|
| LTIFR / TRIFR | ISO 45001, SUVA, Process Safety, Site Audit, Industrial Hygiene |
| HPRI | HAZOP, ATEX, PSM, SEVESO, Process Safety |
| Scope 1 emissions | GHG, CSRD, Environmental Compliance, ISO 14001 |
| Hazardous waste | VOC, USchG, Environmental Compliance, REACH |
| Fatalities | Process Safety, SEVESO, Construction Safety, HAZOP |

**Why-match generation:**

Generate a one-to-two sentence `why_match` string for each top-3 expert.
This is a simple string template, not a Claude call:

```
"{ExpertName} has {N} years in {sector} — including {relevant experience
derived from tags}. Your {top KPI gap} gap of {delta} puts you {above/below}
the {sector} peer median."
```

Avoid calling Claude for this — it's deterministic and must be fast.

### Shortlist schema

```ts
interface ShortlistEntry {
  rank: 1 | 2 | 3
  expert_id: string
  score: number
  why_match: string
}
```

Written as `shortlist: ShortlistEntry[]` JSONB to `benchmark_runs`.

### Handling fewer than 3 approved experts

If fewer than 3 experts are approved in the DB at the time of the run,
include all available (1 or 2). Do not pad or fake entries. The shortlist
may have 1–3 entries.

### Acceptance

- Peer comparison computed for all 7 sectors
- CHF risk value, range, and confidence written to `benchmark_runs`
- Top 3 experts ranked correctly by score
- `why_match` strings are coherent and reference the correct KPI gaps
- Handles < 3 approved experts without error
- Handles missing KPI values gracefully (null gaps treated as on_par)
- `npm run lint` and `npm run build` pass
