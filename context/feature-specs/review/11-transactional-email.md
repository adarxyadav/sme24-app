# Feature 11 — Transactional Email (Resend)

## Overview

Extends the Resend foundation from Feature 02 (contact form) to cover
all transactional emails across the platform. This feature wires up the
email hooks defined in Features 05, 08, 09, and 10 into a complete email
system with typed templates.

## Files

```
lib/
  email.ts                    — all outbound email functions (extends Feature 02)
  email-templates/
    purchase-confirmation.tsx  — React Email template
    expert-approved.tsx
    expert-rejected.tsx
    proposal-ready.tsx
    engagement-contact.tsx
```

## Dependencies

- Feature 02: `lib/resend.ts` Resend client singleton
- Feature 05: expert approved/rejected hooks
- Feature 08: proposal approved hook
- Feature 09: purchase confirmation hook
- Feature 10: engagement contact details hook

## Env Vars

```
RESEND_API_KEY
RESEND_FROM_EMAIL             # e.g. "SME24 <hello@sme24.ch>"
```

---

## Skeleton

> Goal: lib/email.ts exports all send functions with correct signatures;
> each hook site (Features 05, 08, 09) calls them correctly.

### What to build

- Extend `lib/email.ts` with typed send functions (stub implementations
  that call Resend with plain text bodies if React Email templates aren't
  ready yet):
  - `sendPurchaseConfirmation(to, orderId, packageName, amountCHF)`
  - `sendExpertApproved(to, expertName)`
  - `sendExpertRejected(to, expertName, reason?)`
  - `sendProposalReady(to, companyName, portalUrl)`
  - `sendEngagementContact(to, counterpartName, counterpartEmail, engagementId)`
- All functions: best-effort (log error to console, never throw).
- Verify each hook site (Feature 05 review, Feature 08 proposal approve,
  Feature 09 webhook) is calling the correct function.

### Acceptance

- All 5 send functions defined and callable
- Each hook site calls the correct function
- Resend dashboard shows sent emails after test flows

---

## Full Implementation

### React Email templates

Use `@react-email/components` for HTML email templates. All templates:
- SME24 logo at top
- Minimal design matching marketing site (white background, black text,
  no decorative elements)
- Plain-text fallback
- Footer: "SME24 · sme24.ch · EU data residency · Frankfurt"

**purchase-confirmation.tsx**
Subject: "Order confirmed — [Package Name] for [Company Name]"
Body:
- "Hi [First name],"
- Order summary: package, company researched, amount incl. MWST
- Order ID (8-char hash)
- "Your project workspace is open at [link]"
- "A senior expert will be in touch within one working day."

**expert-approved.tsx**
Subject: "Your SME24 application has been approved"
Body:
- "Hi [Name],"
- "Your profile is now live on sme24.ch/expert-network/[slug]"
- "You'll be notified when a client engagement matches your profile."

**expert-rejected.tsx**
Subject: "Your SME24 application"
Body:
- "Hi [Name],"
- "After review, we're not moving forward at this time."
- If reason: "Feedback: [reason]"
- "We review our roster each quarter. You're welcome to reapply."

**proposal-ready.tsx**
Subject: "Your proposal for [Company Name] is ready"
Body:
- "Hi [First name],"
- "A senior expert has reviewed your AI-generated proposal and it's
  ready to view."
- "[View proposal →]" button (links to portal run page)
- "Pick a package to open your engagement."

**engagement-contact.tsx**
Subject: "Your engagement is confirmed — contact details inside"
Body (sent to both client and expert):
- "Hi [Name],"
- "Your engagement for [Company Name] is confirmed."
- "Your [expert/client]: [name], [email]"
- "Use your preferred tool to schedule kickoff."
- Engagement ID for reference.

### `lib/email.ts` full implementation

```ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL ?? 'SME24 <hello@sme24.ch>'

async function send(params: SendEmailRequest): Promise<void> {
  try {
    await resend.emails.send(params)
  } catch (err) {
    console.error('[email] send failed', err)
    // Sentry capture in Feature 12
  }
}
```

All send functions are thin wrappers over `send()` that render the
correct React Email template and pass the right subject + recipient.

### Acceptance

- All 5 email types deliver in Resend test mode
- React Email templates render correctly in Resend preview
- Plain text fallbacks present
- All hook sites (05, 08, 09, 10) trigger the correct email
- Email failures are logged but never propagate to the caller
- `npm run lint` and `npm run build` pass
