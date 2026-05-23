# SME24

## Overview

SME24 is an AI-powered EHS consulting marketplace. A client enters a
company name; the AI pipeline researches public sustainability reports,
extracts EHS KPIs, benchmarks against industry peers, and generates a
proposal with a ranked expert shortlist — before any money changes hands.
The client purchases a fixed-price engagement, the expert delivers the
assessment, and the final report surfaces in the client workspace.

Target users: EHS managers, COOs, and compliance officers at mid-market
and enterprise companies in regulated industries.

## Goals

1. Replace manual expert outreach with AI matchmaking that maps a
   company's risk profile to expert competency tags automatically.
2. Eliminate scoping uncertainty with a benchmarked proposal and visible
   price before the client commits.
3. Self-serve checkout for three standard packages via Stripe with Swiss
   MWST. A fourth retainer package routes through a contact form.
4. Verified expert network behind an admin approval gate.
5. EU data residency and Swiss tax compliance from day one.
6. A project workspace where the full engagement lifecycle lives in one
   place after purchase.

## Core User Flow

1. Client registers and lands in the portal.
2. Client enters a company name to trigger the AI pipeline.
3. Pipeline researches public EHS data, extracts KPIs, benchmarks peers,
   scores experts, and generates a proposal PDF.
4. Admin reviews and releases the proposal (editorial gate).
5. Client selects a package; Stripe Checkout processes payment and opens
   the engagement.
6. Expert delivers the assessment; report is uploaded to the project vault.
7. Client leaves feedback at close.

## Feature Areas

- **AI pipeline** — KPI extraction, peer benchmarking, expert matchmaking,
  proposal generation, per-user run quota, monthly caching. Spec:
  `context/pipeline-rules.md`.
- **Expert marketplace** — multi-step application, admin approval,
  public directory with category filter, competency tag matching.
- **Authentication** — magic link and Google OAuth for clients; Google
  OAuth only for experts; env-var whitelist for admins. RLS is the
  canonical access layer.
- **Packages and payments** — four fixed-price tiers; three via Stripe
  Checkout, one via contact form. Stripe Tax handles Swiss MWST.
- **Client workspace** — project board, document vault, report library,
  feedback collection.
- **Admin console** — proposal review gate, expert approval, knowledge
  vault management.
- **Marketing site** — 5-page public site (Home, How It Works, Expert
  Network, Packages, Contact). English only. Domain: `sme24.ch`.

## Scope

### In Scope

- Full-stack Next.js 15 + TypeScript app (Vercel, Supabase, Trigger.dev).
- AI pipeline end-to-end: research, extraction, benchmarking, matchmaking,
  proposal, editorial gate.
- Expert application and admin approval flow; public directory and profiles.
- Stripe Checkout and webhook; Resend transactional email; Sentry monitoring.
- Client project workspace and expert delivery dashboard.
- EU data residency and Swiss tax compliance.

### Out of Scope (v1)

- Faceted directory filters.
- Company contact / decider-extraction module (deferred, not excluded).
- In-platform scheduling, time-tracking, contracting, quality management.
- Live-mode Stripe before Swiss legal entity activation.
- Blog, careers, full privacy policy / Impressum copy.
- BI reporting dashboard, EHS Vault/Bot for experts.
- LinkedIn OAuth for experts, bilingual interface, dark mode.
- Native mobile app, enterprise compliance certifications.

## Success Criteria

1. `npm run lint` and `npm run build` pass with no errors.
2. Authenticated client can trigger the full pipeline and receive a
   reviewed proposal PDF end to end.
3. Stripe Checkout completes for packages 1–3 and the webhook opens the
   workspace without manual intervention.
4. Expert applicant can submit the form; admin approval publishes the
   profile immediately.
5. All DB writes enforce RLS; service-role access restricted to pipeline
   tasks and the Stripe webhook handler.
6. Customer data and artifacts reside in EU regions at all times.
