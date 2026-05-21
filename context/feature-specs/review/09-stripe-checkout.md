# Feature 09 — Stripe Checkout + Webhook

## Overview

Packages 1–3 (Snapshot CHF 2,000, Reality Check CHF 5,000, Transformation
Plan CHF 10,000) via Stripe Checkout. Package 4 (Execution Partner) routes
to the contact form. Stripe Tax applies Swiss MWST automatically. Webhook
creates the `orders` and `engagements` rows and triggers confirmation email.
Test mode only — live mode deferred until Swiss legal entity is activated.

## Routes / Files

```
app/api/
  checkout/
    route.ts                  — POST: create Stripe Checkout session
  webhooks/
    stripe/route.ts           — POST: handle Stripe events
lib/
  stripe.ts                   — Stripe client singleton
  packages.ts                 — package definitions (prices, IDs, metadata)
app/
  (portal)/
    checkout/
      success/page.tsx        — post-payment confirmation
      cancel/page.tsx         — cancelled checkout
```

## Dependencies

- Feature 03 (DB schema): `orders`, `engagements` tables, service role
- Feature 04 (auth): `requireAuth` for checkout route
- Feature 11 (email): confirmation email on webhook (hook defined here,
  implemented in Feature 11)
- Stripe account provisioned in test mode
- Stripe Tax configured for Switzerland (MWST)

## Env Vars

```
STRIPE_SECRET_KEY             # sk_test_...
STRIPE_WEBHOOK_SECRET         # whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
NEXT_PUBLIC_SITE_URL          # https://sme24.ch (for success/cancel URLs)
```

---

## Skeleton

> Goal: Stripe Checkout session created, payment completes in test mode,
> webhook creates orders + engagements row.

### What to build

- `lib/stripe.ts`: Stripe client singleton using `STRIPE_SECRET_KEY`.
- `lib/packages.ts`: package definitions with Stripe price IDs (created
  in Stripe dashboard for test mode):
  ```ts
  export const PACKAGES = {
    snapshot: { name: 'EHS Snapshot', priceId: 'price_...', amountCHF: 200000 },
    reality_check: { name: 'EHS Reality Check', priceId: 'price_...', amountCHF: 500000 },
    transformation_plan: { name: 'EHS Transformation Plan', priceId: 'price_...', amountCHF: 1000000 },
  }
  ```
  Amounts in rappen (CHF × 100).
- `app/api/checkout/route.ts`: POST. Authenticated. Accepts
  `{ package: 'snapshot' | 'reality_check' | 'transformation_plan', runId?: string }`.
  Creates Stripe Checkout session with:
  - `line_items`: one item from `PACKAGES`
  - `mode: 'payment'`
  - `automatic_tax: { enabled: true }` (Stripe Tax for MWST)
  - `success_url` and `cancel_url`
  - `metadata: { clientId, runId, package }` (for webhook)
  Returns `{ url: session.url }`.
- `app/api/webhooks/stripe/route.ts`: POST. Verifies Stripe signature.
  Handles `checkout.session.completed`:
  - Extract `metadata.clientId`, `metadata.runId`, `metadata.package`
  - Insert `orders` row (idempotent: check `stripe_session_id` exists first)
  - Insert `engagements` row linked to the order
  - Trigger confirmation email (Feature 11 hook — call `sendPurchaseConfirmation`)
- `app/(portal)/checkout/success/page.tsx`: shows "Payment confirmed."
  with link to project workspace.
- `app/(portal)/checkout/cancel/page.tsx`: shows "Payment cancelled."
  with link back to the run.

### Acceptance

- Stripe Checkout opens in test mode with correct package price
- Test card `4242 4242 4242 4242` completes payment
- `checkout.session.completed` webhook fires
- `orders` row created with `status = 'paid'`
- `engagements` row created with `status = 'open'`
- Idempotent: double webhook delivery does not create two rows

---

## Full Implementation

### Stripe product + price setup (test mode)

In the Stripe dashboard, create 3 products:
- EHS Snapshot — CHF 2,000 — one-time price
- EHS Reality Check — CHF 5,000 — one-time price
- EHS Transformation Plan — CHF 10,000 — one-time price

Copy the price IDs into `lib/packages.ts` and into Vercel env vars for
portability.

### Stripe Tax (Swiss MWST)

Enable Stripe Tax in the Stripe dashboard. Set tax registration for
Switzerland with the IC HOTZ AG tax ID (to be provided by Philipp).
The `automatic_tax: { enabled: true }` flag on the Checkout session
handles MWST calculation automatically. The invoice line shows tax
separately ("Swiss VAT · 8.1%").

At skeleton stage: tax calculation works but invoice details are not
yet verified. Mark as "verify with Philipp before live mode" in
`context/current-issues.md`.

### Checkout session creation

Additional session parameters for full implementation:

```ts
{
  customer_email: user.email,    // pre-fills email in Checkout
  client_reference_id: clientId, // backup for metadata
  payment_intent_data: {
    metadata: { clientId, runId, package }
  },
  locale: 'en',
  billing_address_collection: 'required', // needed for tax
}
```

### Webhook handler

Idempotency guard:
```ts
const existing = await supabase
  .from('orders')
  .select('id')
  .eq('stripe_session_id', session.id)
  .single()

if (existing.data) return NextResponse.json({ received: true }) // already processed
```

Always return `200` to Stripe even if internal processing fails — log
the error to Sentry and handle reconciliation manually. A non-200 causes
Stripe to retry, which risks duplicate processing.

The webhook handler uses the Supabase service role (bypasses RLS) — this
is one of the two permitted service-role call sites.

### Package 4 — Execution Partner

On the marketing Packages page and portal package selection, "Get in
touch" links to `/contact` with a pre-filled `?subject=execution-partner`
query param. The contact form auto-selects "Execution Partner enquiry"
in the message field. No Stripe session for this package.

### Post-payment flow

After `checkout.session.completed`:
1. `orders` row: `{ client_id, run_id, package, amount_chf_rappen, stripe_session_id, status: 'paid' }`
2. `engagements` row: `{ order_id, client_id, status: 'open' }`
3. Call `sendPurchaseConfirmation(clientEmail, orderId, packageName, amountCHF)` from `lib/email.ts`. Best-effort — failure does not roll back.
4. Client lands on `/portal/checkout/success` which shows the engagement ID and a link to `/portal/projects/[engagementId]`.

### Acceptance

- All 3 packages create correct Stripe Checkout sessions
- Stripe Tax displays Swiss MWST on checkout
- Webhook creates `orders` + `engagements` idempotently
- Test card flow completes end-to-end
- Success page shows correct order details
- Idempotent double delivery handled correctly
- `npm run lint` and `npm run build` pass

### Known pending items

- Live mode Stripe keys: deferred until IC HOTZ AG Swiss legal entity
  is activated. Document in `context/current-issues.md` when approaching
  launch.
- Swiss tax ID for Stripe Tax registration: Philipp to provide.
