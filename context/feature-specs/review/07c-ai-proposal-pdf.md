# Feature 07c — AI Pipeline: Proposal PDF Generation

## Overview

Third and final Trigger.dev task in the AI pipeline. Calls Claude Sonnet
4.6 to author the proposal narrative, renders it as a PDF using React-PDF,
uploads it to Supabase Storage, and creates a `proposals` row with
`status = 'pending_review'`. The proposal is not visible to the client
until an admin approves it (Feature 08).

Read `context/pipeline-rules.md` before implementing this feature.

## Files

```
trigger/
  proposal-generate.ts           — Trigger.dev task definition
lib/
  prompts/
    proposal.ts                  — system prompt for proposal authoring
components/
  pdf/
    proposal-pdf.tsx             — React-PDF document component
    proposal-sections.tsx        — section sub-components
```

## Dependencies

- Feature 03 (DB schema): `proposals` table, `vault_documents` table,
  `proposals` storage bucket, service role client
- Feature 07a and 07b: run must be in `'drafting'` status with
  `kpi_data`, `benchmark_data`, `shortlist`, `risk_value_chf` populated
- React-PDF package (`@react-pdf/renderer`)

## Env Vars

```
ANTHROPIC_API_KEY
SUPABASE_SERVICE_ROLE_KEY
```

---

## Skeleton

> Goal: task runs after Task 02, generates a minimal PDF, uploads it,
> inserts a proposals row with pending_review status.

### What to build

- Install `@react-pdf/renderer` package.
- `components/pdf/proposal-pdf.tsx`: minimal React-PDF document with
  company name, KPI table, and shortlist names. No narrative text yet.
- `trigger/proposal-generate.ts`: Trigger.dev task. Loads run data.
  Renders PDF to buffer using `@react-pdf/renderer`. Uploads to
  `proposals/{runId}/proposal.pdf` in Supabase Storage. Inserts
  `proposals` row. Sets `benchmark_runs.status = 'completed'`.
- Storage + DB atomicity: if Postgres insert fails after storage upload,
  delete the uploaded file and set status to `'failed'`.

### Acceptance

- Task 03 triggers after Task 02 completes
- PDF is present in `proposals` Supabase Storage bucket
- `proposals` row exists with `status = 'pending_review'`
- `benchmark_runs.status = 'completed'`
- Storage orphan cleanup runs if Postgres insert fails

---

## Full Implementation

### Proposal narrative (`lib/prompts/proposal.ts`)

Claude Sonnet 4.6 authors the narrative sections of the proposal. The
system prompt instructs Claude to write:

1. **Executive summary** (150–200 words): company name, key EHS risk
   finding, Total Opportunity Value in CHF, recommended action.
2. **KPI findings** (one paragraph per significant KPI gap): describe
   what the data shows, compared to the peer median, in plain language.
   Reference the source document.
3. **Recommended next step** (2–3 sentences): which package is most
   appropriate given the risk profile, and why.

Input to Claude: the full `kpi_data`, `benchmark_data`, and `risk_value_chf`
from the run. The shortlist is injected by the PDF renderer, not authored
by Claude (expert profiles are factual, not narrative).

Vault document grounding: load up to 3 vault documents from
`vault_documents` where `tags` overlap with the top 3 KPI gap categories.
Pass excerpts (first 500 chars per document) as context in the Claude
prompt. Use Anthropic prompt caching on the vault excerpts block.

**Prompt caching:** Apply `cache_control: { type: 'ephemeral' }` to:
- The system prompt (static)
- The vault documents block (semi-static)

**Temperature:** `0` for deterministic output. `max_tokens: 2048`.

### PDF structure (`components/pdf/proposal-pdf.tsx`)

React-PDF document. Sections in order:

1. **Cover page**: SME24 logo, company name, "EHS Risk Assessment Proposal",
   date, "CONFIDENTIAL — Prepared by SME24".

2. **Executive summary**: narrative from Claude (executive_summary).

3. **KPI findings table**: columns — KPI Name, Company Value, Peer Median,
   Gap, Source. Each row color-coded: red (worse than peers), green
   (better), grey (on par or missing).

4. **Peer comparison chart**: simple bar table comparing company vs 4
   peer companies for the top 3 KPIs.

5. **CHF risk exposure**: large CHF figure, range (low–high), confidence
   level. Short explanation: "This is the estimated annual cost of standing
   still."

6. **Expert shortlist**: for each of the top 3 experts — rank badge,
   initials avatar, name, specialty, years, why_match text, competency
   tags. No photos in PDF (signed URLs expire).

7. **Package options**: three package cards (Snapshot, Reality Check,
   Transformation Plan) with prices and brief descriptions.

8. **Recommended next step**: narrative from Claude.

9. **Footer on each page**: SME24 · sme24.ch · EU data residency ·
   Confidential. Page number.

### PDF typography

- Font: embed Geist Sans (or fall back to Helvetica — React-PDF has
  limited font embedding support).
- Body: 10pt, 1.5 line height.
- Section headers: 14pt bold.
- Cover page headline: 24pt bold.

### Upload and atomicity

```ts
const pdfBuffer = await renderToBuffer(<ProposalPdf run={run} narrative={narrative} />)

// 1. Upload to storage
const { data, error } = await supabase.storage
  .from('proposals')
  .upload(`${run.id}/proposal.pdf`, pdfBuffer, { contentType: 'application/pdf' })

if (error) throw error  // triggers Trigger.dev retry

// 2. Insert proposals row
const { error: dbError } = await supabase
  .from('proposals')
  .insert({ run_id: run.id, client_id: run.client_id, pdf_path: data.path, status: 'pending_review' })

if (dbError) {
  // clean up orphaned file
  await supabase.storage.from('proposals').remove([`${run.id}/proposal.pdf`])
  throw dbError
}

// 3. Mark run completed
await supabase.from('benchmark_runs').update({ status: 'completed' }).eq('id', run.id)
```

### Acceptance

- PDF renders all 9 sections correctly
- Claude narrative is coherent and references correct KPIs and figures
- Vault document excerpts are visible in the proposal where relevant
- PDF uploaded to correct storage path
- `proposals` row inserted with `status = 'pending_review'`
- `benchmark_runs.status = 'completed'` after task
- Storage cleanup runs correctly on Postgres failure
- Prompt cache hits visible in Anthropic dashboard on repeat runs
- `npm run lint` and `npm run build` pass
