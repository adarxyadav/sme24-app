# Progress Tracker

## Status

Phase 02 — Marketing site | Started: 2026-05-25

> Unit 01 complete. Design tokens, typography utilities, button variants, domain glossary, and pipeline spec are all in place. Building components inline as part of the 5-page marketing site.

## Build Sequence

| # | Feature | Status |
|---|---------|--------|
| 02 | Marketing site (5 pages, contact form) | **in progress** |
| 03 | Database schema + Supabase setup | — |
| 04 | Authentication (magic link + Google OAuth) | — |
| 05 | Expert application + admin approval | — |
| 06 | Expert directory + public profiles | — |
| 07a | AI pipeline: company research + KPI extraction | — |
| 07b | AI pipeline: benchmarking + matchmaking | — |
| 07c | AI pipeline: proposal PDF generation | — |
| 08 | Admin knowledge base + proposal review | — |
| 09 | Stripe checkout + webhook | — |
| 10 | Client workspace | — |
| 11 | Transactional email (Resend) | — |
| 12 | Sentry monitoring | — |
| 13 | Production deployment | — |

## Done

| # | Feature | Completed |
|---|---------|-----------|
| 01 | Design system: tokens, typography, button (6 variants), CONTEXT.md glossary, pipeline-rules.md | 2026-05-25 |

## Unit 02 Scope — Marketing Site

Five pages at `app/(marketing)/`. Components built inline — no separate component library phase.
Note: `app/page.tsx` deleted — marketing owns `/` via route group. `app/(marketing)/layout.tsx` wraps Nav + Footer.

| Page | Route | Spec | Key sections |
|------|-------|------|-------------|
| Home | `/` | `context/specs/unit-02-homepage.md` | Nav, Hero, Industry Pain, Stats tiles, How It Works teaser (4 steps), Industries Served, Expert preview, Packages teaser, CTA band, Footer |
| How It Works | `/how-it-works` | `context/specs/unit-02-howitworks.md` | Step-by-step pipeline walkthrough |
| Expert Network | `/experts` | `context/specs/unit-02-experts.md` | Directory teaser, application CTA |
| Packages | `/packages` | `context/specs/unit-02-packages.md` | All 4 packages (3 Stripe + 1 contact form card), pricing comparison table |
| Contact | `/contact` | `context/specs/unit-02-contact.md` | Contact form (server action → Resend) |

Shared components: `components/marketing/nav.tsx`, `components/marketing/footer.tsx`.

Exit criteria: `npm run lint` and `npm run build` pass; all 5 pages render with correct design tokens; contact form server action fires (email delivery tested in Unit 11).

### Deferred to Unit 10

- **Benchmark Preview section** (homepage) — requires portal dashboard visuals and live KPI data
- **Trust / Credibility section** (homepage) — requires real testimonials or verified outcome metrics

## Open Questions

| Blocker | Owner | Notes |
|---------|-------|-------|
| Stripe live mode | Philipp | Blocked on IC HOTZ AG Swiss legal entity activation |
| Admin email | Philipp | Confirm before Unit 04 deploy |
| Stripe Tax VAT | Philipp | Swiss tax ID needed for VAT registration |
