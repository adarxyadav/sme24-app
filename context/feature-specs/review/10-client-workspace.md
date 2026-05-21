# Feature 10 — Client Project Workspace

## Overview

Authenticated portal for clients. Two main areas: (1) Research — where
clients trigger runs, monitor pipeline progress, and view results
(KPIs, peer comparison, risk figure, shortlist, proposal); and (2)
Projects — where clients manage active engagements, access the document
vault, download the final report, and leave feedback at close.

## Routes

| Route | Purpose |
|---|---|
| `/portal` | Dashboard: active runs, recent orders, quota display |
| `/portal/research` | Start a new run or view past runs |
| `/portal/research/[runId]` | Run detail: full results + proposal state |
| `/portal/projects` | Engagement list |
| `/portal/projects/[engagementId]` | Engagement workspace: docs, report, status |

## Key Files

```
app/
  (portal)/
    layout.tsx                  — portal layout with portal nav + auth guard
    page.tsx                    — dashboard
    research/
      page.tsx                  — run history + new run form
      [runId]/page.tsx          — run detail
    projects/
      page.tsx                  — engagement list
      [engagementId]/page.tsx   — engagement workspace
components/
  portal/
    run-status-card.tsx         — live status indicator with polling
    kpi-table.tsx
    peer-comparison-table.tsx
    risk-display.tsx
    shortlist-card.tsx
    proposal-section.tsx
    document-vault.tsx
    feedback-form.tsx
```

## Dependencies

- Feature 03 (DB): all tables
- Feature 04 (auth): client route protection
- Feature 07a/b/c: run data shape and status values
- Feature 08: proposal approved before visible here
- Feature 09: engagements created by webhook

## Env Vars

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

---

## Skeleton

> Goal: portal nav exists, dashboard renders active runs and recent orders,
> run detail page shows status and basic KPI data, project list renders.

### What to build

- `app/(portal)/layout.tsx`: portal layout. Server component. Calls
  `requireAuth` — unauthenticated users redirected to `/auth/login`.
  Renders portal nav: SME24 · Dashboard · Research · Expert Network ·
  Projects · [User name + sign out].
- `app/(portal)/page.tsx`: dashboard. Fetches client's runs ordered by
  `created_at desc`. Shows "active runs" (non-terminal status) and
  "recent orders" (last 5). Shows quota: "N of 3 runs used today."
- `app/(portal)/research/[runId]/page.tsx`: fetches run by ID (ownership
  via RLS). Renders status badge and `kpi_data` as a simple table.
- `app/(portal)/projects/page.tsx`: fetches client's engagements. Lists
  engagement ID (short hash), package, company name from linked run,
  status badge, "Open →" link.
- `components/portal/run-status-card.tsx`: client component. Polls
  `/api/runs/[runId]/status` every 5 seconds while run is in a
  non-terminal status. Renders status label + spinner.

### Acceptance

- `/portal` accessible to authenticated clients, redirects unauthenticated
- Dashboard shows active runs and recent orders
- Run detail page renders KPI table
- Project list renders engagements
- Status card polls and updates while run is in progress

---

## Full Implementation

### Dashboard (`/portal`)

Header: "[First name] · [Today's date]"

**Active run alert** (shows when any run is in progress):
Amber card: "Your run for [Company Name] is in progress."
Status: "[current status label]". Started [X minutes ago].
"Open run →" button.

**Active runs table** (if >0 non-terminal runs):
Columns: Company Name · Status (with colored dot) · Started · Open →

**Recent orders table** (last 5 paid orders):
Columns: ID (8-char hash) · Package · Company · Date · Status badge ·
Open →

Status badges:
- Paid: green
- Delivered: green
- Pending: amber

**Quota bar**: "N of 3 runs used today. Resets at midnight CET."
Visual bar: 3 dots (filled = used, empty = remaining).

### Run detail page (`/portal/research/[runId]`)

Header: company name (large), run ID (small), status badge.

If status is in-progress: show `run-status-card.tsx` with live updates.
If status is `low_signal`: show message "We found limited public data for
this company. You have not been charged. Try a parent company name or a
different entity."
If status is `failed`: show "Something went wrong. Contact support."

If status is `completed` (or in-progress past `'researching'`), show
sections progressively as data becomes available:

**KPIS section**
Headline: "N KPIs extracted from public sources for [Company Name]."
Table: KPI · Value · Confidence · Source (linked)
Footer: "All values cited. Confidence is the AI's read on source quality."

**PEER COMPARISON section**
Headline: "How [Company Name] stacks up against N industry peers."
Table: KPI · Company · Peer 1 · Peer 2 · Peer 3 · Peer 4
Cells color-coded: red triangle (above peer median = worse), green
circle (below = better), no marker (on par).

**RISK IN CHF section**
Large CHF figure (e.g. "CHF 4.2M") with range and confidence.
Short explanation: "Estimated annual EHS risk for [Company Name], based
on the KPI gap against peers. This is a directional figure."

**YOUR SHORTLIST section** (shows after matching completes)
Headline: "Three senior experts ranked against the risk profile."
Three `shortlist-card.tsx` components: rank badge, initials avatar,
name, specialty, why_match text, "View profile" + "Contact" buttons.
Footer: "Not the right match? Browse the full network →"

**PROPOSAL section** (shows after pipeline completes)
States:
- `pending_review`: amber box. "Proposal in review. We don't share AI
  output until a senior expert has read it. You'll get an email when
  it's ready — usually within a working day." This is a hard rule.
- `approved`: green. "Your proposal is ready." PDF download button
  (signed URL, 1-hour expiry). Package selection CTA.
- `rejected`: grey. "Proposal is being revised. We'll notify you when
  it's ready."

**Package selection** (shows when proposal is approved):
Three package cards: Snapshot / Reality Check / Transformation Plan.
Each has a "Buy [Package]" button → calls `/api/checkout` and redirects
to Stripe Checkout.

**Run footer**: "Run another benchmark →" · "See past runs →" ·
"N of 3 runs left today"

### Engagement workspace (`/portal/projects/[engagementId]`)

Header: engagement ID, package name, company name, status badge.

**Status timeline** (vertical steps):
Open → Confirmed → In Progress → Delivered → Closed

**Document vault**
`components/portal/document-vault.tsx`: fetches documents for this
engagement from storage (signed URLs). Lists file name, type, uploaded
date. Download button per file. Empty state: "No documents yet."

**Final report** (shows when `report_path` is set):
"Download your assessment report" → signed URL for the PDF. Large
prominent download button.

**Contact info** (shows when `status = 'confirmed'` or later):
Expert name, email, phone (if available). Client contact details also
shown. Note: "Use your preferred tool to schedule kickoff."

**Feedback form** (shows when `status = 'closed'`):
`components/portal/feedback-form.tsx`: star rating (1–5), optional
comment textarea, "Submit feedback" button. POST to a server action.
After submission: "Thank you. Your feedback has been recorded."

### Polling behavior

`run-status-card.tsx` polls every 5 seconds via `useEffect` while run
status is non-terminal. On terminal status, polling stops. Use
`router.refresh()` to re-render server components when status changes.

Do not use WebSockets or Supabase Realtime at launch — polling is
sufficient for runs that complete in under 2 minutes.

### Acceptance

- Dashboard quota display is accurate
- Active run card polls and updates live
- KPI table, peer comparison, risk display, shortlist all render correctly
- Proposal section shows correct state (in review / approved / rejected)
- Package selection → Stripe Checkout works
- Engagement workspace renders document vault and report download
- Feedback form submits and shows confirmation
- All signed URLs expire after 1 hour (verify by waiting, not by hard-coding)
- `npm run lint` and `npm run build` pass
