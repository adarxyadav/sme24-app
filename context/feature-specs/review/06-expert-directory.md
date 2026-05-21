# Feature 06 — Expert Directory + Public Profiles

## Overview

Extends the marketing site Expert Network page (Feature 02) with full
search/filter, and adds individual expert public profile pages. Experts
can be contacted directly from their profile via a contact dialog. This
feature also adds a portal-side Expert Network view for authenticated
clients browsing before selecting an expert from their run shortlist.

## Routes

| Route | Purpose |
|---|---|
| `/expert-network` | Public directory (extended from Feature 02) |
| `/expert-network/[slug]` | Public expert profile page |
| `/portal/expert-network` | Portal directory view (authenticated) |

## Key Files

```
app/
  (marketing)/
    expert-network/
      page.tsx               — updated: full search + filter
      [slug]/page.tsx        — public profile page
  (portal)/
    expert-network/
      page.tsx               — portal directory (same data, portal nav)
components/
  marketing/
    expert-card.tsx          — updated: "View profile →" link
    expert-contact-dialog.tsx
  expert/
    expert-profile.tsx       — shared profile content component
app/api/
  experts/
    contact/route.ts         — POST: send contact message via Resend
```

## Dependencies

- Feature 02 (marketing site): existing Expert Network page + Resend
- Feature 03 (DB schema): `experts` table, signed URLs for photos
- Feature 04 (auth): portal route protection

## Env Vars

```
RESEND_API_KEY
CONTACT_EMAIL                # CC'd on expert contact messages
```

---

## Skeleton

> Goal: expert profile pages exist at /expert-network/[slug], contact
> dialog submits a message via Resend.

### What to build

- `app/(marketing)/expert-network/[slug]/page.tsx`: server component.
  Fetch expert by `slug` from `experts` table where `status = 'approved'`.
  404 if not found. Render name, specialty, years, bio, competency tags.
- `components/expert/expert-profile.tsx`: shared profile layout used by
  both the public profile page and the portal view.
- `components/marketing/expert-contact-dialog.tsx`: Dialog (shadcn/ui)
  with Name, Email, Company, Message fields. Submits to
  `app/api/experts/contact/route.ts`.
- `app/api/experts/contact/route.ts`: validates body, sends email via
  Resend to the expert's registered email (CC `CONTACT_EMAIL`).

### Acceptance

- `/expert-network/[slug]` renders for approved experts
- 404 for unapproved or unknown slugs
- Contact dialog opens from expert profile
- Contact form submission sends email

---

## Full Implementation

### Public Expert Network page (updated)

Search and filter on `/expert-network`:

- **Search input**: filters by name or any competency tag (client-side
  filter on loaded experts, or server-side query param `?q=` for SEO).
- **Area filter**: dropdown populated from unique first tags in the expert
  roster. "All areas" default. Filters the grid client-side.
- **Count label**: "Showing N of N experts" updates as filters change.
- Grid rerenders without a full page navigation when filters change.
  Use React state with `useTransition` for a smooth filter experience.

### Expert profile page (`/expert-network/[slug]`)

Layout (single column, centered, max-width ~700px):

1. **Header**: initials avatar (large, ~64px), name, specialty line,
   years experience, competency tags.
2. **Bio**: full bio text.
3. **Competency tags**: rendered as chips.
4. **Photo**: if `photo_path` exists, show photo via signed URL
   (generated server-side, 1-hour expiry).
5. **CTA**: "Contact [Name]" button → opens `expert-contact-dialog.tsx`.
6. **Back link**: "← Expert Network"
7. **Bottom CTA**: "Start a benchmark to see your ranked shortlist →"

### Expert profile page metadata

```ts
export async function generateMetadata({ params }) {
  const expert = await getExpertBySlug(params.slug)
  return {
    title: `${expert.full_name} — EHS Expert | SME24`,
    description: expert.specialty,
    openGraph: { url: `https://sme24.ch/expert-network/${expert.slug}` }
  }
}
```

### Contact dialog

Fields: Name (required), Email (required), Company (optional), Message
(required, min 20 chars).

On submit:
1. Client-side validation.
2. POST to `app/api/experts/contact/route.ts` with `{ expertId, name, email, company, message }`.
3. API sends two emails via Resend:
   - To expert's registered email: "New message from [Name] at [Company]" with message body and sender's email.
   - CC `CONTACT_EMAIL` for visibility.
4. Dialog shows success state: "Message sent. [Expert name] typically replies within one working day."

No leads database table at launch — email-only routing is sufficient.

### Portal Expert Network (`/portal/expert-network`)

Same expert grid as marketing site, wrapped in portal layout with portal
nav. No search/filter changes — identical query and display logic.

Purpose: allows authenticated clients to browse the full network while
reviewing their run shortlist.

### Slug generation

Expert slugs are generated at application time:
`slug = full_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')` with a
suffix counter if the slug already exists.

Slug is stored in the `experts.slug` column (unique constraint in Feature
03 schema).

### Acceptance

- Search filters the grid by name and tag correctly
- Area filter works independently and in combination with search
- Profile pages render correctly with photo (signed URL) and bio
- Contact dialog submits and both emails are delivered
- 404 rendered for unapproved / nonexistent slugs
- Portal Expert Network accessible to authenticated clients
- `generateMetadata` produces correct OG tags per profile
- `npm run lint` and `npm run build` pass
