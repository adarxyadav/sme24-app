# Feature 13 — Production Deployment

## Overview

Final feature. Vercel production configuration, all environment variables
verified, `sme24.ch` domain attached and SSL active, EU data residency
confirmed across all services, Stripe test mode documented as pending live
activation, and end-to-end stress test of the full pipeline.

## Files

```
.env.example                  — template listing all required env vars
vercel.json                   — Vercel project config (if needed)
```

---

## Skeleton

> Goal: Vercel project is live at sme24.ch, all environment variables
> set, marketing site accessible from the public internet.

### What to build

- Vercel project linked to this GitHub repo (already done for Feature 02
  marketing site deploy, but confirmed here for production).
- All env vars from every feature spec present in Vercel production
  environment (see checklist below).
- `sme24.ch` domain attached with Vercel nameservers or CNAME. SSL
  certificate issued automatically by Vercel.
- `.env.example` file committed to repo listing every required env var
  with a description but no values.

### Acceptance

- `https://sme24.ch` loads the marketing site
- SSL certificate active (no browser warnings)
- No 404s on any marketing page

---

## Full Implementation

### Environment variable checklist

Verify every variable is set in Vercel production environment:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

# Auth
ADMIN_EMAILS
NEXT_PUBLIC_SITE_URL=https://sme24.ch

# Stripe (test mode until legal entity active)
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

# AI + Pipeline
ANTHROPIC_API_KEY
TRIGGER_SECRET_KEY

# Email
RESEND_API_KEY
RESEND_FROM_EMAIL=SME24 <hello@sme24.ch>
CONTACT_EMAIL

# Monitoring
NEXT_PUBLIC_SENTRY_DSN
SENTRY_ORG
SENTRY_PROJECT
SENTRY_AUTH_TOKEN
```

### EU data residency verification

Before go-live, verify and document:

| Service | Region | Verified |
|---|---|---|
| Supabase Postgres | eu-central-1 (Frankfurt) | ☐ |
| Supabase Storage | eu-central-1 (Frankfurt) | ☐ |
| Vercel deployment | Edge — no persistent customer data stored | ☐ |
| Trigger.dev | Cloud US (task orchestration only, no PII in payloads per pipeline-rules.md) | ☐ |
| Resend | EU region (configure in Resend dashboard) | ☐ |
| Sentry | EU region (configure during Sentry project creation) | ☐ |

For each ☐ item: confirm in the respective service dashboard and check
the box before marking this feature complete.

### Stripe live mode (pending)

Live mode is deferred until the IC HOTZ AG Swiss legal entity is
activated. Document in `context/current-issues.md`:

```
## Stripe Live Mode

Status: deferred.
Blocked by: IC HOTZ AG Swiss legal entity activation (Philipp to confirm).
Required before live mode:
- Swap STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to live keys
- Swap STRIPE_WEBHOOK_SECRET to live webhook secret
- Verify Stripe Tax Swiss VAT registration is active
- Run one live test transaction before public launch
```

Until then, the platform runs in Stripe test mode. Add a visible banner
in the portal: "Payments are in test mode — no real charges."

### End-to-end stress test

Before marking production complete, run the full pipeline end-to-end
once in production:

1. Register a new client account via magic link.
2. Enter a real company name (e.g. "Sika AG") and trigger a run.
3. Monitor Trigger.dev dashboard — confirm all 3 tasks complete.
4. Log in as admin, review the proposal, approve it.
5. As client, view the approved proposal, select a package, complete
   Stripe test checkout.
6. Verify `orders` and `engagements` rows created.
7. Verify confirmation email delivered.
8. Submit an expert application, approve it as admin, confirm profile
   appears on Expert Network.
9. Check Sentry for any captured errors from the test run.
10. Run `npm run lint` and `npm run build` — both must pass.

### Performance checklist

- Marketing site Lighthouse score ≥ 90 on mobile (run in Vercel preview)
- No unoptimized images (use `next/image` for all images)
- No unused client components loaded on marketing pages

### Go-live checklist

- [ ] All env vars set and verified in Vercel production
- [ ] `sme24.ch` domain live with SSL
- [ ] EU data residency verified for all services
- [ ] End-to-end stress test passed
- [ ] Sentry alerts configured
- [ ] Stripe test mode banner displayed in portal
- [ ] `context/current-issues.md` updated with Stripe live mode pending item
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Philipp notified: admin credentials, portal URL, how to review proposals
