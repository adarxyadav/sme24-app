# Feature 03 — Platform Site

## Overview

All authenticated surfaces under `app/(portal)/`, `app/auth/`, `app/expert/`,
and `app/admin/`. Builds the full frontend shell: layouts, nav, and every
screen from login through to the client workspace, expert dashboard, and
admin console. Data fetching logic, RLS, and business rules land in
Features 04–10; this feature owns the UI structure and visual design of
every route.

Ships after Feature 02. Marketing and platform share the same design system
(`app/globals.css`) — no separate token overrides.

## Routes

### Auth

| Route | Purpose |
| --- | --- |
| `/auth/login` | Client login — magic link + Google OAuth |
| `/auth/expert-login` | Expert login — Google OAuth only |
| `/auth/callback` | OAuth + OTP exchange handler |
| `/auth/error` | Expired link, OAuth denied, unknown error |

### Client portal (`app/(portal)/`)

| Route | Purpose |
| --- | --- |
| `/portal` | Dashboard — active runs, recent orders, quota bar |
| `/portal/research` | Start a new benchmark run |
| `/portal/research/[runId]` | Run detail — KPIs, peer comparison, shortlist, proposal |
| `/portal/projects` | Engagement list |
| `/portal/projects/[engagementId]` | Engagement workspace — vault, report, status |
| `/portal/expert-network` | Expert directory (authenticated view) |

### Expert

| Route | Purpose |
| --- | --- |
| `/expert/apply` | Multi-step application form (public, no auth required) |
| `/expert/apply/submitted` | Confirmation after submission |
| `/expert/dashboard` | Expert's assigned projects list |
| `/expert/dashboard/[engagementId]` | Expert project detail — brief, deliverable upload |

### Admin (`app/admin/`)

| Route | Purpose |
| --- | --- |
| `/admin` | Overview — counts for pending proposals, applications, monthly orders |
| `/admin/proposals` | Proposal review queue |
| `/admin/proposals/[id]` | Review single proposal — PDF viewer, approve/reject |
| `/admin/vault` | Knowledge vault — list + upload EHS reference documents |
| `/admin/experts` | Expert application list |
| `/admin/experts/[id]` | Review single application — approve/reject |

## Key Files

```
app/
  auth/
    login/page.tsx
    expert-login/page.tsx
    callback/route.ts
    error/page.tsx
  (portal)/
    layout.tsx                       — portal shell + auth guard
    page.tsx                         — client dashboard
    research/
      page.tsx                       — new run form
      [runId]/page.tsx               — run detail
    projects/
      page.tsx                       — engagement list
      [engagementId]/page.tsx        — engagement workspace
    expert-network/
      page.tsx                       — portal expert directory
  expert/
    apply/
      page.tsx                       — multi-step application form
      submitted/page.tsx
    dashboard/
      page.tsx                       — expert project list
      [engagementId]/page.tsx        — expert project detail
  admin/
    layout.tsx                       — admin shell + admin auth gate
    page.tsx                         — admin overview
    proposals/
      page.tsx
      [id]/page.tsx
    vault/
      page.tsx
    experts/
      page.tsx
      [id]/page.tsx

components/
  portal/
    portal-nav.tsx                   — top nav for client + expert portal
    run-status-badge.tsx             — colored dot + label for run status
    run-status-card.tsx              — live polling card (client component)
    kpi-table.tsx
    peer-comparison-table.tsx
    risk-display.tsx
    shortlist-card.tsx
    proposal-section.tsx
    document-vault.tsx
    feedback-form.tsx
    quota-bar.tsx
  admin/
    admin-nav.tsx
    proposal-review-panel.tsx
    vault-upload-form.tsx
  expert/
    application-form.tsx             — multi-step form (client component)
    step-bio.tsx
    step-tags.tsx
    step-uploads.tsx
    step-review.tsx
```

## Dependencies

- Feature 01 (design system): tokens, shadcn/ui primitives
- Feature 02 (marketing): `lib/resend.ts`, `lib/supabase/server.ts` singletons
- Feature 03 DB schema (Supabase tables + RLS) provisioned before running
  the portal — see `context/feature-specs/review/03-database-schema.md`
- Feature 04 (auth middleware): route protection is wired in Feature 04;
  this spec builds the pages that middleware will protect
- Supabase project live with env vars set

## Env Vars

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ADMIN_EMAILS
NEXT_PUBLIC_SITE_URL
```

---

## Skeleton

> Goal: every route renders a shell page, portal layout exists with nav,
> auth pages render the login UI, build passes with no type errors.

### What to build

- `app/(portal)/layout.tsx`: server component. No auth check yet (Feature
  04 wires middleware). Renders `<PortalNav />` above `{children}`.
- `app/(portal)/page.tsx`: placeholder heading "Dashboard" inside the
  portal layout.
- All other `(portal)/*` and `admin/*` page files: single `<h1>` with the
  page name, wrapped in layout. No data fetching yet.
- `app/auth/login/page.tsx` and `app/auth/expert-login/page.tsx`: static
  UI shells (form inputs, buttons) — no server action yet.
- `app/auth/callback/route.ts`: empty route handler returning a redirect
  to `/portal`.
- `app/auth/error/page.tsx`: static error message with "Go home" link.
- `components/portal/portal-nav.tsx`: top nav with SME24 logo + client
  links. No auth state yet — just the static structure.
- `components/admin/admin-nav.tsx`: admin top nav with admin links.
- `app/expert/apply/page.tsx`: multi-step form shell — step indicators
  visible, first step renders, no submission yet.

### Acceptance

- `npm run build` passes with no type errors
- All routes return 200 (or expected redirect) with no runtime errors
- Portal nav renders correctly at `/portal`
- Auth pages render the login UI layout
- Admin routes render the admin nav

---

## Full Implementation

### Design language

The platform uses the same token set as the marketing site. Key
differences in application:

- No full-bleed `bg-muted` banded layout — portal uses a persistent nav
  + content area pattern.
- Content areas use `bg-background` (white). Side panels and secondary
  areas use `bg-muted`.
- Status badges use semantic colors: green for success/completed, amber
  for in-progress/pending, red for failed/rejected, grey for closed.
- Data tables use `border-b border-border` row separators with `py-3`
  cells — same pattern as marketing FAQ items.
- Cards inside portal use `bg-background border border-border rounded-md
  p-6` — same as marketing step cards.

### Auth pages

**Shared layout**: centered card on full-screen `bg-muted`.
Card: `bg-background border border-border rounded-md p-8 w-full max-w-sm
flex flex-col gap-6`.

**`/auth/login`**

```
SME24                                    ← text logo, text-lg font-semibold

Sign in

[Continue with Google]                   ← outline button, full width

────── or ──────

Email
[________________________]

[Send magic link]                        ← primary button, full width

No password required.
Signing in as an expert?  →ert-login    ← small link
```

**`/auth/expert-login`**

```
SME24

Expert sign in

[Continue with Google]                   ← primary button, full width

Use the same Google account you applied with.
Signing in as a client?  →/auth/login   ← small link
```

**`/auth/error`**

```
SME24

Something went wrong.

[error message resolved from ?reason= query param]
  expired   → "This link has expired. Magic links are valid for one hour."
  oauth_denied → "Google sign-in was cancelled."
  default   → "An unexpected error occurred."

[Try again →]    [Go home →]
```

### Portal nav (`components/portal/portal-nav.tsx`)

```
SME24   Dashboard   Research   Expert Network   Projects
                                                        [Name]  Sign out
```

- Sticky top, `h-16`, `border-b border-border bg-background`.
- Inner: `mx-auto max-w-7xl px-6 flex items-center justify-between`.
- Left: logo `font-semibold` + nav links `text-sm text-muted-foreground
  hover:text-foreground`.
- Active link: `text-foreground font-medium` (matched via `usePathname`).
- Right: user's first name (from session) + "Sign out" text button.
- Mobile: hamburger collapses nav links. Same pattern as marketing nav.

Expert-role users see a different link set:
`SME24   My Projects   Expert Network`

### Client dashboard (`/portal`)

```
[First name] · [Today's date, e.g. "21 May 2026"]

──── ACTIVE RUNS ─────────────────────────────────────
[Amber inline alert if any run in progress]
  "Your run for Novartis AG is in progress."
  Status: Researching · Started 2 minutes ago · [Open run →]

Table (if active runs exist):
  Company       Status          Started      
  ─────────────────────────────────────────
  Novartis AG   ● Researching   2 min ago    [Open →]
  Roche Ltd     ● Matching      8 min ago    [Open →]

──── RECENT ORDERS ───────────────────────────────────
Table:
  ID       Package         Company      Date         Status
  ────────────────────────────────────────────────────────
  3a9f…    Snapshot        ABB AG       12 May       ● Paid    [Open →]
  b2c1…    Reality Check   Nestlé       1 May        ● Paid    [Open →]

──── QUOTA ───────────────────────────────────────────
Runs used today: ● ● ○   2 of 3
Resets at midnight CET.

[Start a new benchmark →]                 ← primary button
```

Section headings: `text-xs uppercase tracking-widest text-muted-foreground`.
Status dots: `inline-block w-2 h-2 rounded-full` with color token.
Empty states: muted text centered in the table area.

### New benchmark run (`/portal/research`)

Simple form, centered, `max-w-lg`:

```
START A BENCHMARK

Company name *
[_________________________________]
 e.g. "Novartis AG" or "ABB"

Industry hint (optional)
[_________________________________]
 Helps narrow the peer set.

[Run benchmark]                 ← primary button

3 runs per day · Resets at midnight CET
N of 3 runs used today.
```

Submission triggers the AI pipeline via `app/api/runs/route.ts` (Feature
07a). After submission, redirect to `/portal/research/[runId]`.

### Run detail (`/portal/research/[runId]`)

All sections below are revealed progressively as pipeline stages complete.
Each section has an eyebrow label, consistent with the marketing pattern.

**Header row:**
Company name (text-2xl font-semibold) · Run ID (text-xs text-muted-foreground)
· Status badge

**In-progress state** (while non-terminal):
`<RunStatusCard />` — amber card, polls every 5 s:
"Pipeline running · [stage label] · Started N minutes ago"
Stage labels: Queued → Researching → Benchmarking → Matching → Drafting

---

**KPI SECTION** (visible after `researching` completes)

```
KPI RESULTS
N KPIs extracted from public sources for [Company].

KPI              Value       Confidence   Source
─────────────────────────────────────────────────
Fatality rate    0.12        High         [GRI 403] ↗
TRIFR            4.8         Medium       [Annual report 2024] ↗
...

All values cited. Confidence reflects source quality.
```

Table: `bg-muted rounded-md` wrapper, `text-sm` cells, linked source text.

---

**PEER COMPARISON** (visible after `benchmarking` completes)

```
PEER COMPARISON
How [Company] stacks up against N industry peers.

KPI          [Company]   Peer 1   Peer 2   Peer 3
─────────────────────────────────────────────────
Fatality     0.12 ▲      0.08     0.07     0.09
TRIFR        4.8  ▲      3.1      3.8      2.9
GHG scope 1  12k  ✓      14k      11k      13k
```

▲ red (above peer median = worse), ✓ green (at or below median).

---

**RISK IN CHF** (visible after `benchmarking` completes)

```
RISK EXPOSURE

CHF 4.2M
Annual EHS risk estimate · CHF 3.1M – CHF 5.6M range · Medium confidence

Estimated annual EHS risk for [Company], based on KPI gap against peers.
This is a directional figure, not a legal liability assessment.
```

The CHF figure uses `text-4xl font-semibold`. Range and confidence in
`text-sm text-muted-foreground` below.

---

**YOUR SHORTLIST** (visible after `matching` completes)

```
YOUR SHORTLIST
Three senior experts ranked against this risk profile.

[Rank badge]  [Initials]  [Name]                    [View profile →]
              AH          Anna Hofer                 [Contact →]
                          EHS lead, chemicals · 32 yrs
                          "Matched on: Process Safety, SEVESO, CHF risk range"

[Rank badge]  [Initials]  [Name]
  ...

Not the right match? Browse the full network →
```

`shortlist-card.tsx`: `bg-background border border-border rounded-md p-5`.
Rank badge: `bg-primary text-primary-foreground rounded-sm px-2 py-0.5
text-xs font-mono` showing `#1`, `#2`, `#3`.

---

**PROPOSAL** (visible after pipeline completes)

Three states:

`pending_review`:
```
┌─ amber band ─────────────────────────────────────────────┐
│  Proposal in review.                                      │
│  We don't share AI output until a senior expert has read  │
│  it. You'll get an email when it's ready — usually within │
│  one working day. This is a hard rule.                    │
└──────────────────────────────────────────────────────────┘
```

`approved`:
```
┌─ green band ──────────────────────────────────────────────┐
│  Your proposal is ready.                  [Download PDF ↓] │
└───────────────────────────────────────────────────────────┘

SELECT A PACKAGE

[Snapshot card]   [Reality Check card]   [Plan card]
CHF 2,000         CHF 5,000              CHF 10,000
[Buy Snapshot →]  [Buy Reality Check →]  [Buy Plan →]
```

`rejected`:
```
┌─ grey band ──────────────────────────────────────────────┐
│  Proposal is being revised. We'll notify you when ready. │
└──────────────────────────────────────────────────────────┘
```

Package cards here: `bg-muted border border-border rounded-md p-5`,
buy button = primary.

---

**Run footer** (always visible at bottom):
```
[Run another benchmark →]   [Past runs →]   N of 3 runs left today
```

### Engagement workspace (`/portal/projects/[engagementId]`)

**Header**: engagement ID (8-char hash) · Package · Company name · Status
badge

**STATUS TIMELINE**
Horizontal step track (mobile: vertical):
`Open → Confirmed → In Progress → Delivered → Closed`
Completed steps: `bg-primary` dot. Current step: `bg-primary` with pulse.
Future: `bg-border`.

**DOCUMENT VAULT**

```
DOCUMENTS

  Name                  Type    Uploaded        
  ──────────────────────────────────────────────
  Brief_Novartis.pdf    PDF     12 May 2026     [Download ↓]
  Checklist.xlsx        XLSX    14 May 2026     [Download ↓]

  Empty state: "No documents yet."
```

**FINAL REPORT** (visible when `report_path` is set)

```
YOUR ASSESSMENT REPORT

[Download Assessment Report ↓]            ← large primary button
EHS_Assessment_Novartis_May2026.pdf
```

**CONTACT INFO** (visible when `status = 'confirmed'` or later)

```
EXPERT CONTACT
Anna Hofer · anna.hofer@example.com

YOUR CONTACT
[client email from profile]

Use your preferred tool to schedule the kickoff.
```

**FEEDBACK** (visible when `status = 'closed'`)

```
FEEDBACK

How did the engagement go?

★ ★ ★ ★ ☆   (click to rate 1–5)

Comment (optional)
[_________________________________]

[Submit feedback]

After submit: "Thank you. Your feedback has been recorded."
```

### Expert dashboard (`/expert/dashboard`)

```
EXPERT SIGN IN  →  /auth/expert-login

──── MY PROJECTS ─────────────────────────────────────────
Table:
  Company        Package         Client email     Status         
  ────────────────────────────────────────────────────────
  Novartis AG    Snapshot        a.b@corp.com     ● In Progress  [Open →]
  ABB AG         Reality Check   c.d@co.ch        ● Confirmed    [Open →]

Empty state: "No projects assigned yet."
```

### Expert project detail (`/expert/dashboard/[engagementId]`)

```
NOVARTIS AG · Snapshot · In Progress

CLIENT BRIEF
[brief content from the proposal — read-only]

DELIVER REPORT

Upload your final assessment report (PDF only, max 25 MB):
[Choose file]

[Upload report]

After upload: report visible to client in their workspace.
```

### Expert application (`/expert/apply`)

Multi-step form. Progress indicator at top: four steps with labels.
Client component — step state held in React.

```
● — — —          Step 1 of 4 · Bio & Specialty
○ — — —          active step filled circle; future steps empty
```

**Step 1 — Bio + Specialty**
- Full name *
- Specialty line * (one-liner, e.g. "EHS lead, chemicals · 32 yrs")
- Years of experience * (number input)
- Bio * (textarea, 100–600 chars, live character count)
- [Next →]

**Step 2 — Competency Tags**
- Eyebrow: "SELECT YOUR AREAS (2–8)"
- Tag grid: each tag is a toggle pill `rounded-full border`. Selected:
  `bg-primary text-primary-foreground border-primary`. Unselected:
  `border-border bg-transparent hover:bg-accent`.
- Predefined tags: ISO 45001, ISO 14001, REACH, ADR, SEVESO, HAZOP,
  ATEX, PSM, SUVA, GHG, CSRD, VOC, USchG, Process Safety, Environmental
  Compliance, Industrial Hygiene, Site Audit, Management Systems,
  Construction Safety, Chemical Safety, Logistics Safety, Energy, Manufacturing.
- Custom tag input: text field + Add button. Custom tags styled same as
  predefined.
- Live count: "N selected" — red if < 2, green if 2–8.
- [← Back]  [Next →]

**Step 3 — Photo + CV**
- Profile photo * (JPG / PNG, max 5 MB): drag-and-drop or click area.
  Preview shown after selection (`<img>` or `<canvas>` crop, no crop
  library at launch — show as-is).
- CV (optional): PDF only, max 10 MB. File name shown after selection.
- [← Back]  [Next →]

**Step 4 — Review + Submit**
- Summary of all data from steps 1–3, read-only.
- Checkbox: "I confirm the information above is accurate."
- CTA: [Submit application]
- Below button: "We'll reply within five working days."
- [← Back]

**`/expert/apply/submitted`**

```
SME24

Application received.

We review every application personally. You'll hear back within
five working days.

[Back to sme24.ch →]
```

### Admin layout + nav

`app/admin/layout.tsx`: server component. Checks `isAdmin(email)` on
the authenticated user — redirect to `/` if not admin.

```
SME24 Admin   Overview   Proposals   Vault   Experts
                                                    [admin email]  Sign out
```

Nav: same structure as portal nav. `bg-muted` background (distinguishes
admin from client portal).

### Admin dashboard (`/admin`)

Three summary cards in a row:

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ Proposals         │  │ Applications      │  │ Orders            │
│ 3 pending review  │  │ 2 pending review  │  │ 12 this month     │
│ [Review →]        │  │ [Review →]        │  │ [View →]          │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

Cards: `bg-background border border-border rounded-md p-6`.

### Admin proposal review (`/admin/proposals/[id]`)

Two-column layout (`lg:grid-cols-[2fr_3fr]`):

Left panel:
- Company name, run date
- Client name + email
- CHF risk value
- Shortlist expert names
- Created / pipeline completed timestamps

Right panel:
- `<iframe>` PDF viewer with signed URL (1-hour expiry)
- [Approve] primary button + [Reject] outline button
- Reject opens a Dialog with optional reason textarea

### Admin vault (`/admin/vault`)

```
KNOWLEDGE VAULT                          [Upload document ↑]

  Name              Tags              Uploaded       Size
  ──────────────────────────────────────────────────────
  ISO 45001.pdf     iso-45001         12 May         2.1 MB   [Delete]
  SEVESO Guide.pdf  seveso, hazop     3 Apr          800 KB   [Delete]

  Empty state: "No vault documents. Upload EHS reference material to
  ground the AI pipeline."
```

Upload dialog (shadcn Dialog):
- File input: PDF only, max 25 MB
- Name *
- Description (optional)
- Tags (comma-separated)
- [Upload]

Delete: confirm Dialog before removal.

### Admin expert review (`/admin/experts/[id]`)

```
APPLICATION — [Expert Name]

  Photo       Name, specialty, years
  [photo]     Bio (full)
              Tags (chips)
              CV:  [Download CV ↓]  (if uploaded)
              Applied: [date]

[Approve]  [Reject]
```

Reject opens Dialog with optional reason. After action, redirect to
`/admin/experts`.

---

## Acceptance

- All routes render without runtime errors
- Portal nav highlights the active link
- Auth page UI matches spec (magic link + Google button, expert-login
  Google-only)
- Multi-step application form advances and validates each step
- Run detail page reveals sections progressively (mock with static props
  for now; live data wired in Feature 07a/b/c)
- Engagement workspace renders all sections with correct empty states
- Admin dashboard summary cards link to correct sections
- Admin proposal review renders two-column layout with PDF iframe slot
- Admin vault renders table + upload dialog structure
- `npm run lint` and `npm run build` pass
