# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- Planning complete. Ready to provision services and begin build.

## Current Goal

- Step 0: Provision all 7 external services
- Then: Pass 1 (walking skeleton) starting with Feature 02

## Completed

- Marketing Site layout overhaul (all pages)
  - All inner pages: `max-w-7xl` → `max-w-5xl` (matches ui-context page-content rule)
  - Replaced `border-t` section separators with alternating `bg-muted` / white bands
  - `bg-card` (white-on-white) replaced with `bg-muted` everywhere it was used as accent
  - Steps section (how-it-works): 2×2 card grid with mono step numbers + footer row
  - Trust signals (expert-network): 3 cards on `bg-muted`
  - "What This Isn't" (how-it-works): 2-col card grid
  - FAQ items: separated by `border-b`, `py-5` per item — replaces gap stacking
  - Execution Partner moved to its own `bg-muted` band with eyebrow label
  - PackageCard CTA button fixed to `bg-primary` (was black `bg-foreground`)
  - Contact: form + info moved into `bg-muted` band
  - Homepage expanded from 1 section to 5:
    - Hero (white, centered)
    - How it works teaser (bg-muted, 3 numbered cards, "Full details →" link)
    - Why SME24 (white, 3 differentiator cols)
    - Packages preview (bg-muted, 3 clickable price cards + VAT note)
    - Final CTA (white, centered)

- Marketing Site UI alignment (current-issues.md #1–7)
  - Primary CTAs → brand purple (`bg-primary`), `rounded-sm`, `py-2.5` across all inner pages
  - Outline buttons → `rounded-sm py-2.5`
  - Hero CTA buttons get `w-full sm:w-auto`
  - Duplicate `max-w-7xl` removed from 3 inner sections
  - All inner page H1s → `font-semibold text-4xl sm:text-5xl lg:text-6xl`
  - Contact hero wrapped in `<section>`

- Feature 02: Marketing Site
  - All 5 routes created under `app/(marketing)/`
  - Marketing layout with sticky Nav (hamburger mobile) + Footer
  - `components/marketing/`: nav, footer, expert-card, expert-network-grid (client search/filter), package-card, contact-form
  - `lib/resend.ts` Resend singleton + `sendEmail` helper
  - `lib/supabase/server.ts` anon client factory
  - `lib/packages.ts` package data (4 packages)
  - Contact form server action with Resend integration (`contact/actions.ts`)
  - Expert Network reads from `experts` table; empty state graceful
  - Full SEO meta + OG tags + Organisation JSON-LD on Home
  - Design tokens applied: warm off-white marketing background, purple primary CTA, eyebrow labels
  - Nav simplified: removed duplicate "Start a benchmark" button, kept text-link "Sign in"
  - Footer redesigned to 4-column layout (brand, product, company, legal) + copyright bar
  - Nav links moved left (flex layout, logo → links → sign in)
  - Global border radius reduced to 4px (`--radius: 0.25rem`)
  - `suppressHydrationWarning` on `<body>` to silence browser-extension hydration diff
  - `npm run build` passes ✓

- Feature 01: Design System
  - Installed and configured shadcn/ui (Tailwind v4 compatible)
  - Added Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea to `components/ui/`
  - Installed `lucide-react`
  - Created `lib/utils.ts` with `cn()` helper (clsx + tailwind-merge)
  - **Design system migrated to brand-token architecture:**
    - `app/globals.css`: replaced oklch/shadcn-default vars with brand token `@theme` block; shadcn aliases now point back to brand tokens; added explicit type scale (xs–4xl with line-heights), `--spacing: 4px`, fixed radii (4/8/16/9999px), shadow tokens (sm/md/lg); dark mode block removed (out of scope)
    - `app/layout.tsx`: fonts swapped Geist → Inter + JetBrains Mono (`--font-inter`, `--font-jetbrains-mono`)
    - `context/ui-context.md`: updated to reflect new token names, type scale, spacing, and radius tables
  - `npm run lint` and `npm run build` pass with no errors

- Planning session: all 13 feature specs written + pipeline-rules.md
  - Specs in `context/feature-specs/review/` — review before promoting to `context/feature-specs/`
  - Key decisions: English only, LinkedIn OAuth deferred to v2, run quota 3/day,
    domain sme24.ch, marketing site ships first, walking skeleton build approach,
    AI pipeline split into 07a/07b/07c sub-specs, Resend wired in Feature 02

## In Progress

- Feature 02: Marketing Site (full implementation complete; pending live Supabase + Resend env vars)
- Feature 03: Platform Site — Skeleton pass
  - All authenticated routes scaffolded under `app/portal/`, `app/auth/`, `app/expert/`, `app/admin/`
  - Portal layout + `PortalNav` (sticky top nav, client/expert link sets, user name + logout icon) + `QuotaFooter` (runs-remaining bar)
  - Admin layout + `AdminNav` (bg-muted, distinct from client portal)
  - Auth shells: `/auth/login` (magic link + Google), `/auth/expert-login` (Google-only), `/auth/callback` redirect, `/auth/error`
  - Expert application form: 4-step shell, client component, step indicator
  - **High-fidelity screens (mock data, no live wiring):**
    - `/portal` — dashboard view: amber in-progress spotlight, active runs table, recent orders table with Paid/Delivered pills, quota bar in footer
    - `/portal?empty=1` — first-time empty state: "First benchmark." card with Company / Industry inputs, "What happens next" 4-step table, "Or look around first" links
    - `/portal/research/[runId]` — completed state: header w/ Completed badge, green "Done." card, KPIs table (6 rows), bg-muted band with Peer Comparison (4 peers, ▲/● markers), Risk in CHF (CHF 4.2M + range + confidence), Shortlist (3 expert cards with rank badges + initials + View/Contact), amber Proposal-in-review banner, footer with quota
  - Mock data hard-coded for now (Adarsh, 18 May 2026, Glencore, Lonza Group, etc.). Real wiring lands with Feature 04+ auth and 07a/b/c pipeline.
  - Spec deviation: spec listed route group `app/(portal)/` but route table pointed to `/portal/*`. Route groups don't add to the URL, so `(portal)/page.tsx` would have collided with marketing `/`. Used `app/portal/` (real directory) to match the route table.
  - Visual deviation: portal primary CTAs use `bg-foreground text-background` (dark) instead of `bg-primary` (purple) to match supplied screenshots.
  - `npm run lint` + `npm run build` pass with 23 routes.

## Next Up

### Step 0 — Provision all services (before any code)
- [ ] Supabase project — EU region (Frankfurt / eu-central-1)
- [ ] Vercel project — link to GitHub repo
- [ ] Anthropic API key
- [ ] Trigger.dev project
- [ ] Stripe account — test mode
- [ ] Resend account + verify sme24.ch sending domain
- [ ] Sentry project — EU region

### Pass 1 — Walking skeleton (connect everything, no polish)
Feature 02 skeleton → Feature 03 skeleton → Feature 04 skeleton → ... → Feature 13 skeleton

### Pass 2 — Full implementation per feature
Return to each feature and build out Full Implementation section.

### Pass 3 — Polish, edge cases, monitoring

## Open Questions

- Stripe live mode: blocked on IC HOTZ AG Swiss legal entity activation.
  Philipp to confirm timeline. See Feature 13 spec for pending items.
- Stripe Tax Swiss VAT registration: Philipp to provide tax ID.
- ADMIN_EMAILS value: confirm Philipp's email address before Feature 04 deploy.

## Architecture Decisions

- shadcn/ui primitives are app-owned and live in `components/ui/` — customize as needed, but be careful when re-running the CLI as it can overwrite local changes.
- Dark mode CSS variables are present in globals.css (shadcn default) but dark mode is out of scope. The `.dark` class is never applied, so light mode is always active.

## Session Notes

- Tailwind CSS v4 in use. shadcn/ui init used the new CSS-variable approach compatible with v4 (`@import "shadcn/tailwind.css"`).
