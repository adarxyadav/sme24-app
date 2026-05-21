# Feature 05 — Expert Application + Admin Approval

## Overview

Multi-step form for expert candidates to apply. Admin reviews applications
and approves or rejects. On approval, the expert's `profiles.role` is set
to `'expert'`, their `experts.status` is set to `'approved'`, and their
profile becomes publicly visible on the Expert Network page immediately.

## Routes

| Route | Purpose |
|---|---|
| `/expert/apply` | Multi-step application form (public) |
| `/expert/apply/submitted` | Confirmation after submission |
| `/admin/experts` | Admin: list of pending and reviewed applications |
| `/admin/experts/[id]` | Admin: review single application, approve/reject |

## Key Files

```
app/
  expert/
    apply/
      page.tsx               — multi-step form shell (client component)
      submitted/page.tsx     — success confirmation
  admin/
    experts/
      page.tsx               — application list
      [id]/page.tsx          — application detail + approve/reject actions
app/api/
  experts/
    apply/route.ts           — POST: validate + insert experts row + upload files
    [id]/review/route.ts     — POST: admin approve or reject
components/
  expert/
    application-form.tsx     — multi-step form (steps 1–4)
    step-bio.tsx
    step-tags.tsx
    step-uploads.tsx
    step-review.tsx
```

## Dependencies

- Feature 03 (DB schema): `experts` table, storage buckets
  `expert-photos` and `expert-cvs`
- Feature 04 (auth): admin route protection, `requireAuth`

## Env Vars

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ADMIN_EMAILS
RESEND_API_KEY               # for approval/rejection notification (Feature 11 hook)
```

---

## Skeleton

> Goal: form exists and submits to DB, admin list page shows pending
> applications, approve action sets status to approved.

### What to build

- `app/expert/apply/page.tsx`: multi-step form with 4 steps. Client
  component with step state. No file uploads yet — text fields only.
- `app/api/experts/apply/route.ts`: POST handler. Validates body,
  checks authenticated user, inserts row into `experts` with
  `status = 'pending'`. Returns the new expert ID.
- `app/expert/apply/submitted/page.tsx`: confirmation message.
- `app/admin/experts/page.tsx`: protected by `isAdmin`. Fetches all
  experts with `status = 'pending'` via service role. Lists name, email,
  specialty, applied date.
- `app/admin/experts/[id]/page.tsx`: shows full application. Two buttons:
  Approve and Reject.
- `app/api/experts/[id]/review/route.ts`: POST handler. Admin only
  (service role). Sets `experts.status` to `'approved'` or `'rejected'`.
  On approval, also sets `profiles.role = 'expert'` for the expert's
  profile.

### Acceptance

- Non-authenticated user can access `/expert/apply`
- Submitted form creates an `experts` row with `status = 'pending'`
- Admin list shows the pending application
- Approve action sets status to `'approved'` and profile role to `'expert'`
- Approved expert appears on the marketing Expert Network page

---

## Full Implementation

### Form steps

**Step 1 — Bio + Specialty**
- Full name (required)
- Specialty line (required): one-line description e.g. "EHS lead, chemicals · 32 yrs"
- Years of experience (required, number)
- Bio (required, textarea, 100–600 characters): full background description

**Step 2 — Competency Tags**
- Multi-select tag picker. Predefined list includes:
  ISO 45001, ISO 14001, REACH, ADR, SEVESO, HAZOP, ATEX, PSM,
  SUVA, GHG, CSRD, VOC, USchG, Process Safety, Environmental Compliance,
  Industrial Hygiene, Site Audit, Management Systems, Construction Safety,
  Chemical Safety, Logistics Safety, Energy Sector, Manufacturing.
- Minimum 2 tags required. Maximum 8.
- Custom tag input (plain text, no special chars, max 20 chars)

**Step 3 — Photo + CV**
- Profile photo (required): JPG or PNG, max 5MB. Uploaded to
  `expert-photos/{expertId}/photo.{ext}`. Preview shown.
- CV (optional): PDF only, max 10MB. Uploaded to
  `expert-cvs/{expertId}/cv.pdf`.
- File uploads go via signed upload URL from Supabase Storage — not
  through the API route.

**Step 4 — Review + Submit**
- Summary of all entered data
- Checkbox: "I confirm the information above is accurate."
- "Submit application" button
- Expected timeline note: "We'll reply within five working days."

### File upload flow

1. Client requests a signed upload URL from
   `app/api/experts/apply/upload-url/route.ts` (authenticated, one-time).
2. Client uploads file directly to Supabase Storage using the signed URL.
3. On success, client stores the returned `path` in form state.
4. Final submit sends text fields + storage paths to
   `app/api/experts/apply/route.ts`.

### Admin review page (`/admin/experts/[id]`)

- Shows: photo, name, specialty, years, bio, competency tags, CV download
  link (signed URL), applied date.
- Approve button: calls review API, sets `status = 'approved'`,
  `profiles.role = 'expert'`. Shows success toast.
- Reject button: opens a dialog with an optional rejection reason text
  field. Calls review API with `status = 'rejected'` + reason. Shows
  success toast.
- After action, redirects back to `/admin/experts`.

### Notifications (Feature 11 hook)

When review API runs:
- Approval: send email to expert's registered email via `lib/email.ts`.
  Subject: "Your SME24 application has been approved." Body: "Your profile
  is now live on sme24.ch/expert-network."
- Rejection: send email with rejection reason (or generic "not a fit at
  this time" if no reason given).

These email sends are best-effort: a failure must not roll back the
approval/rejection. Log the error to Sentry (Feature 12).

### Validation

API route validates:
- Authenticated user
- No existing `experts` row for this `profile_id` (one application per
  user)
- Required fields present and within character limits
- `competency_tags` is an array of 2–8 known or custom tags
- `photo_path` is a valid Supabase Storage path in `expert-photos/`
- `cv_path` (if present) is a valid path in `expert-cvs/`

### Acceptance

- Full 4-step form works with validation at each step
- Photo preview renders correctly before submit
- CV upload is optional and handles PDF-only constraint
- Submitted application appears immediately in admin list
- Admin approve flow: sets status + role, sends email notification
- Admin reject flow: sets status + rejection reason, sends email notification
- Approved expert appears on Expert Network page within one page reload
- `npm run lint` and `npm run build` pass
