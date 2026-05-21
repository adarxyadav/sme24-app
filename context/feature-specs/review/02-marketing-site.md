# Feature 02 — Marketing Site

## Overview

Public-facing 5-page Next.js site under `app/(marketing)/`. Ships to
production at `sme24.ch` before any portal work begins. English only.
Provides a live URL for lead capture via the contact form while the portal
is being built. Resend integration lives here.

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/how-it-works` | How It Works |
| `/expert-network` | Expert Network (DB-driven) |
| `/packages` | Packages |
| `/contact` | Contact |

## Key Files

```
app/(marketing)/
  layout.tsx              — shared nav + footer
  page.tsx                — Home
  how-it-works/page.tsx
  expert-network/page.tsx
  packages/page.tsx
  contact/page.tsx
  contact/actions.ts      — server action for contact form submission

components/marketing/
  nav.tsx
  footer.tsx
  expert-card.tsx         — used on Home preview and Expert Network grid
  package-card.tsx

lib/
  resend.ts               — Resend client singleton (used by Feature 11 too)
```

## Dependencies

- Feature 03 (DB schema): Expert Network page reads approved experts from
  `experts` table. Page must handle zero results gracefully.
- Resend account provisioned + `RESEND_API_KEY` set
- Vercel project created, `sme24.ch` domain attached

## Env Vars

```
RESEND_API_KEY
CONTACT_EMAIL                    # destination for contact form submissions
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## Skeleton

> Goal: all 5 routes exist and render a shell, contact form sends email,
> Vercel deployment is live at sme24.ch.

### What to build

- `app/(marketing)/layout.tsx`: nav with logo + 5 nav links + "Start a
  benchmark" CTA + footer with copyright and EU data residency note.
- All 5 page routes render an `<h1>` and correct layout wrapper. Content
  is placeholder text — full copy comes in Full Implementation.
- Expert Network page: reads from `experts` table using the Supabase anon
  client (server component), renders a simple list of approved experts.
  Empty state: "Applications open. First experts joining soon."
- Contact form: Name, Email, Company (optional), Message. Server action
  in `contact/actions.ts` sends via Resend to `CONTACT_EMAIL`. Returns
  success or error state.
- `lib/resend.ts`: Resend client singleton. Single exported `sendEmail`
  helper used by the contact action and later by Feature 11.
- Vercel project deployed. `sme24.ch` custom domain attached. All env
  vars set in Vercel dashboard.

### Acceptance

- `npm run build` passes
- All 5 routes accessible at sme24.ch with no 404s
- Contact form submission delivers an email to CONTACT_EMAIL
- Expert Network renders the seeded experts from Feature 03 seed migration
- No console errors

---

## Full Implementation

### Design tokens

Apply these overrides in `app/(marketing)/layout.tsx` or a marketing-specific
CSS file. The marketing site uses a warm off-white background distinct from
the portal:

- Body background: `oklch(0.97 0.005 90)` (warm off-white / cream)
- Body text: `hsl(var(--foreground))` (near-black)
- Section eyebrow labels: `text-xs uppercase tracking-widest text-muted-foreground`
- Headlines: `font-bold tracking-tight`
- Primary CTA: `bg-foreground text-background hover:bg-foreground/90`
- Ghost CTA: `border border-border bg-transparent hover:bg-accent`
- Expert avatar: initials in a `rounded-md` square, `bg-muted text-muted-foreground`
- Competency tags: `rounded-sm bg-muted px-1.5 py-0.5 text-xs`

### Nav

- Left: SME24 logo (text or SVG)
- Center: Home · How It Works · Expert Network · Packages · Contact
- Right: "Sign in" (ghost, links to `/auth/login`) + "Start a benchmark"
  (primary CTA, links to `/auth/login` pre-launch, `/portal` post-auth)
- Mobile: hamburger menu collapses center links

### Home page sections (in order)

1. **Hero**
   - Eyebrow: `EHS CONSULTING · SWITZERLAND`
   - Headline: "Senior experts. No slides. Results."
   - Body: "Enter a company name. We benchmark its EHS risk, match it to a
     senior expert who has done the work before, and quote a fixed price.
     One screen. One click."
   - CTAs: "Start a benchmark" (primary) + "How It Works →" (ghost)

2. **Stats bar**
   Four stats separated by dots:
   "7 Senior Experts · 200+ years combined experience · EU data residency ·
   Built in Switzerland"

3. **What We Don't Do** (eyebrow: `WHAT WE DON'T DO`)
   Three cards in a row:
   - "No slides. Results." — Written assessments, plans, and audits. Output
     you can ship.
   - "No juniors. Senior experts." — The people on your project have been
     doing this for thirty years.
   - "No proposals. Fixed prices." — Pick a package. Pay online. Skip the
     four-week scoping dance.

4. **How it works**
   Headline: "How it works." Subtext: "Four steps. No project setup. No
   kickoff slides."
   Four numbered steps: Enter a company / Get a benchmark / See your
   shortlist / Buy a package. Each with a one-line description.
   Link: "See the full flow →" → `/how-it-works`

5. **Expert preview**
   Headline: "Grey hair. No hair. Our SMEs."
   Subtext: "Seven people. Operators, not consultants. Thirty years on the
   floor."
   Show first 4 approved experts from DB (same `expert-card.tsx` component
   used on Expert Network page). Link: "Meet the network →" → `/expert-network`

6. **Package preview**
   Headline: "Pick your package."
   Subtext: "Fixed prices. Senior people. No hourly meter."
   Four package cards (use `package-card.tsx`). Link: "Compare packages →"
   → `/packages`

7. **Target audience**
   Headline: "Built for Swiss SMEs."
   Body: "SME24 is for mid-market companies in regulated industries —
   manufacturing, chemicals, logistics, energy, construction. Large enough
   to need real EHS work, small enough to feel ignored by the big
   consultancies."

8. **Final CTA**
   Headline: "Ready when you are."
   Subtext: "One company name. One screen. One click."
   CTA: "Start a benchmark" (primary)
   Footer note: "SME24. Just. Different."

### How It Works page

1. **Hero**
   Eyebrow: `HOW IT WORKS`
   Headline: "From a company name to a senior expert. In one screen."
   Subtext: "We do the research. You pick the package. A senior EHS expert
   does the work."
   CTAs: "Start a benchmark" (primary) + "See the packages →" (ghost)

2. **4-step breakdown** (numbered rows, each with expanded detail)
   - 01 Enter a company — "Type a name. Add an industry hint if you have
     one." What you get back: queued run with live status. Typical time:
     under 10 seconds.
   - 02 We pull the EHS data — Claude reads public sources. Extracts the
     KPIs that matter. Cites every source. What you get back: benchmark
     with KPIs, source citations, and a confidence score. Typical time:
     30–60 seconds.
   - 03 We compare and match — KPIs run against an industry peer set. Gap
     turns into a CHF risk figure. Senior experts ranked against that risk
     profile. What you get back: peer comparison, a CHF risk number, and a
     ranked shortlist. Typical time: under 15 seconds.
   - 04 You pick a package and go — Three fixed-price packages cover most
     situations. What you get back: a paid order, a project workspace, and
     an email confirmation. Typical time: under 90 seconds.

3. **Editorial gate**
   Headline: "One more thing — a human reads it."
   Body: "Before any AI-drafted proposal leaves SME24, a senior expert
   reviews it. We don't ship unreviewed AI to third parties. Ever."
   Note (small): "This is a hard rule. We won't make exceptions for speed."

4. **What This Isn't** (eyebrow: `WHAT THIS ISN'T`)
   Four bullet statements:
   - "This is not unlimited AI access. Each account gets 3 runs per day."
   - "This is not a research subscription. You pay for a deliverable, not
     a query."
   - "This is not a marketplace where you message anyone. The shortlist is
     curated."
   - "This is not where contracts and time sheets live. We deliver work;
     we don't run your back office."

5. **FAQ**
   Headline: "Three questions we get."
   - Do you store the company data I research? — Yes, in EU regions only.
     Keyed to company + month; re-used within that window for same company.
   - What if the AI can't find enough public data? — Run finishes with a
     "low signal" status. You are not billed for it.
   - Can I share the proposal PDF with my team? — Yes, once reviewed and
     published. Unreviewed drafts stay inside SME24.

6. **Final CTA**
   Headline: "One name. Ninety seconds. A senior expert."
   CTA: "Start a benchmark"
   Note: "SME24. Just. Different."

### Expert Network page

1. **Hero**
   Eyebrow: `EXPERT NETWORK`
   Headline: "Senior people. Industry scars. The juniors stayed home."
   Subtext: "Every expert on SME24 has done the work — in plants, in
   audits, in board rooms — for thirty years or more."
   CTAs: "Start a benchmark" (primary) + "Apply to join" (ghost, →
   `/expert/apply`)

2. **Trust signals** (three columns)
   - "Reviewed by hand." — Every application read by a senior partner.
     No automated approvals.
   - "Track record over titles." — We care what you did, not who you
     reported to.
   - "Published, not promised." — If a profile is on the site, the work
     has been verified.

3. **Expert grid**
   - Search input: placeholder "Search by name or competency"
   - Category/area dropdown: "All areas" default
   - Count label: "Showing N of N experts"
   - Grid of `expert-card.tsx` components (3 columns desktop, 2 tablet,
     1 mobile). Each card: initials avatar, name, specialty + years,
     competency tags, "View profile →" link.
   - Empty state when 0 approved experts: "Applications open. First
     experts joining soon."

4. **Apply CTA**
   Headline: "Are you a senior EHS expert?"
   Body: "SME24 takes a small number of new experts each quarter. We
   publish profiles only after review."
   CTA: "Apply to join" — "Five-minute application. Five-working-day reply."

5. **Final CTA**
   Headline: "One name. A ranked shortlist. Senior people."
   CTA: "Start a benchmark"

### Packages page

1. **Hero**
   Eyebrow: `PACKAGES`
   Headline: "Fixed prices. Senior people. No hourly meter."
   Subtext: "Three packages you can buy in a click. One ongoing engagement
   we scope together. Swiss VAT included on every invoice."
   CTAs: "Start a benchmark" (primary) + "Talk to Philipp →" (ghost, →
   `/contact`)

2. **Package cards** (2×2 grid desktop, stack mobile)
   Each card: name, tagline, "For:", "You get:", Timeline, Format, Price
   (CHF incl. Swiss VAT), buy/contact CTA.
   - Snapshot — CHF 2,000 — "Buy Snapshot" → Stripe Checkout
   - Reality Check — CHF 5,000 — "Buy Reality Check" → Stripe Checkout
   - Transformation Plan — CHF 10,000 — "Buy Plan" → Stripe Checkout
   - Execution Partner — day rate, scoped — "Get in touch" → `/contact`

3. **Comparison table**
   Rows: Senior expert assigned, Written deliverable, Peer benchmark,
   Readout call, Site visit, Timeline, Price, Buyable online.
   Columns: Snapshot, Reality Check, Plan, Execution.

4. **FAQ** — "Five questions we get."
   - Is Swiss VAT included or extra? — Included. Every invoice shows the
     line. No surprise charges.
   - Can I get a refund if the report isn't useful? — Yes, within 7 days
     if the expert agrees the brief was met. We've never had to.
   - What if my company isn't in your peer benchmark? — We tell you in the
     run. Check and Plan default to a smaller comparison — price drops.
   - Can a package be expanded mid-flight? — Snapshot rolls into Reality
     Check with credit applied. Reality Check rolls into Plan.
   - Who actually does the work? — A named senior expert. You see who
     before you buy.

5. **Execution Partner — long form**
   Headline: "Execution Partner — the long form."
   Body: working engagement, typically 2–4 days/month, scope agreed each
   quarter.
   CTA: "Tell us about the work" → `/contact`

6. **Final CTA**
   Headline: "A senior expert. A fixed price. Today."
   CTA: "Start a benchmark"

### Contact page

Two-column layout (form left, info right on desktop; stacked on mobile).

1. **Hero**
   Eyebrow: `CONTACT`
   Headline: "One inbox. A real person. Usually within a day."
   Subtext: "Send a note. Philipp reads everything that comes in and
   replies inside a working day."

2. **Contact form** (left column)
   Fields: Name* · Email* · Company (optional) · Message*
   CTA: "Send"
   Below form (small): "Reply within one working day. Earlier, usually."
   Privacy note: "We use what you tell us only to reply. We don't add you
   to a list. We don't have a list."

3. **Contact info** (right column)
   "Or skip the form."
   - hello@sme24.ch
   - Mon–Fri · 09:00–17:00 CET
   "Where we work from."
   - IC HOTZ AG
   - Bahnhofstrasse 1
   - 8001 Zürich, Switzerland
   - Visits by appointment.

### Footer

Two rows:
- Left: © IC HOTZ AG + current year
- Right links: Privacy · Impressum · Contact
- Far right: "EU data residency · Frankfurt"

### SEO

Every page must have:
- `<title>` — unique per page
- `<meta name="description">` — unique per page
- `og:title`, `og:description`, `og:url` with base `https://sme24.ch`
- `og:image` — single shared OG image (static, can be a placeholder at
  skeleton stage)

Home page additionally: Organisation JSON-LD schema markup.

All canonical URLs use `https://sme24.ch`.

### Acceptance

- All 5 pages render correctly at sme24.ch
- Expert grid live-queries DB; shows seeded experts; handles empty state
- Contact form validates, sends email, shows success confirmation
- "Start a benchmark" CTA links correctly
- All SEO meta tags present on every page
- `npm run lint` and `npm run build` pass
