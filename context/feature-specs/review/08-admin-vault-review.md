# Feature 08 — Admin Knowledge Vault + Proposal Review Console

## Overview

Admin-only surface at `/admin`. Two main areas: (1) proposal review
console where Philipp reviews AI-generated proposals before they are
released to clients, and (2) knowledge vault where EHS reference
documents (ISO 45001, sector guides, compliance frameworks) are uploaded
to ground the AI pipeline. Expert application review (from Feature 05)
is also accessible here.

## Routes

| Route | Purpose |
|---|---|
| `/admin` | Admin dashboard overview |
| `/admin/proposals` | List of proposals pending review |
| `/admin/proposals/[id]` | Review single proposal: view PDF, approve/reject |
| `/admin/vault` | Knowledge vault: list + upload documents |
| `/admin/experts` | Expert applications (from Feature 05) |

## Key Files

```
app/
  admin/
    layout.tsx              — admin layout with admin nav, auth gate
    page.tsx                — dashboard: counts for pending proposals,
                              pending applications, recent orders
    proposals/
      page.tsx              — proposal list
      [id]/page.tsx         — proposal review
    vault/
      page.tsx              — vault document list
      actions.ts            — server action: upload vault document
app/api/
  admin/
    proposals/[id]/review/route.ts  — POST: approve or reject proposal
    vault/upload-url/route.ts       — POST: return signed upload URL for vault
```

## Dependencies

- Feature 03 (DB schema): `proposals`, `vault_documents` tables,
  `proposals` and `vault-documents` storage buckets
- Feature 04 (auth): `isAdmin` helper, admin route protection in middleware
- Feature 07c: proposals created by pipeline with `status = 'pending_review'`

## Env Vars

```
ADMIN_EMAILS
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY               # for client notification on proposal approval
```

---

## Skeleton

> Goal: /admin requires admin auth, proposal list shows pending items,
> approve action releases proposal to client.

### What to build

- `app/admin/layout.tsx`: wraps all `/admin/*` routes. Server component.
  Calls `isAdmin` on the authenticated user's email — redirect to `/`
  if not admin. Renders minimal admin nav (Overview, Proposals, Vault,
  Experts).
- `app/admin/proposals/page.tsx`: fetches proposals with
  `status = 'pending_review'` via service role. Lists: run ID, company
  name, client email, created date.
- `app/admin/proposals/[id]/page.tsx`: fetches proposal + run data.
  Shows a PDF viewer (iframe with signed URL). Two buttons: Approve and
  Reject.
- `app/api/admin/proposals/[id]/review/route.ts`: POST. Admin only.
  Sets `proposals.status = 'approved'` or `'rejected'`. Approved
  proposals become visible to the client immediately (RLS policy on
  `proposals` allows `SELECT` where `status = 'approved'`).

### Acceptance

- `/admin` redirects non-admin users to `/`
- Proposal list shows pending proposals
- Approve action sets `status = 'approved'`
- Approved proposal visible to client in portal (Feature 10)

---

## Full Implementation

### Admin dashboard (`/admin`)

Three summary cards:
- Proposals pending review (count)
- Expert applications pending (count)
- Orders this month (count)

Each card links to the relevant section.

### Proposal review (`/admin/proposals/[id]`)

Layout:
- Left panel (40%): proposal metadata — company name, run date, client
  name + email, CHF risk value, shortlist expert names.
- Right panel (60%): PDF viewer via `<iframe src={signedUrl}>`. Signed
  URL generated server-side with 1-hour expiry.

Actions:
- **Approve** button: calls review API with `action: 'approved'`. Shows
  success toast. Redirects to `/admin/proposals`.
  Side effect: send notification email to client via Resend (see below).
- **Reject** button: opens dialog. Optional rejection reason textarea.
  Calls review API with `action: 'rejected'` + reason. Redirects back.

Client notification on approval:
- Email subject: "Your SME24 proposal for [Company Name] is ready."
- Body: brief message, link to their run page in the portal.
- Sent via `lib/email.ts` — failure is logged but does not block the
  approval.

### Knowledge vault (`/admin/vault`)

**List view (`/admin/vault`):**
- Table: name, description, tags (chips), uploaded date, file size.
- "Upload document" button → upload flow.

**Upload flow:**
1. Admin selects PDF file (max 25MB).
2. Client requests signed upload URL from
   `app/api/admin/vault/upload-url/route.ts`.
3. File uploaded directly to `vault-documents/{uuid}.pdf` in Supabase
   Storage.
4. Server action `vault/actions.ts` inserts `vault_documents` row:
   `{ name, description, tags, path, uploaded_by: adminEmail }`.

**Delete:** service role removes storage file + DB row. Add a confirm
dialog before deletion.

**Tags:** free-text tags used by Task 03 to find relevant vault documents
for pipeline grounding. Examples: "iso-45001", "chemicals", "construction",
"process-safety", "ghg".

### Expert applications (overview)

`/admin/experts` is implemented in Feature 05. Admin dashboard links
to it from the summary card.

### Acceptance

- Admin dashboard shows correct counts
- PDF viewer renders the proposal PDF inline
- Approve releases proposal to client (client can see it in portal)
- Client receives notification email on approval
- Vault upload creates storage file + DB row
- Vault delete cleans up both storage and DB row
- `npm run lint` and `npm run build` pass
