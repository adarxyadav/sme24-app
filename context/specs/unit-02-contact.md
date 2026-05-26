# Unit 02 — Contact Page Spec

Route: `/contact`
File: `app/(marketing)/contact/page.tsx`
Layout: `app/(marketing)/layout.tsx` — Nav + Footer shared.

Note: Server action stubs console.log + returns success. Resend integration deferred to Unit 11.

---

## Section Order

| # | Section | Surface |
|---|---------|---------|
| 1 | Hero | Dark band `bg-[#111111]` |
| 2 | Contact Form | Light band `bg-white` |
| 3 | Expert Applications | Light band `bg-white` |
| 4 | CTA band | Full-bleed gradient strip |

---

## 1 — Hero

Surface: `bg-[#111111] py-20`
Layout: Single column, `max-w-[1280px] mx-auto px-6`

- Eyebrow: `/ CONTACT` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xxl text-white`): "Let's talk about your exposure."
- Sub-headline (`type-body-lg text-white/60`): "Benchmark inquiry, expert request, enterprise transformation, or partnership — use the form below."

---

## 2 — Contact Form

Surface: `bg-white py-20`
Layout: Two-column on desktop — form left (7 cols), inquiry types right (5 cols) → stacked on mobile (form on top)

### Form (left)

File hint: extract as `components/marketing/contact-form.tsx` — `'use client'` for form state.
Server action: `app/(marketing)/contact/actions.ts` — stub only.

Fields:
- Name — `<input type="text" required>` — `type-body-md`
- Company — `<input type="text" required>`
- Email — `<input type="email" required>`
- Industry — `<select required>` — options: Chemicals | Manufacturing | Mining | Pharma | Energy | Industrial Operations | Other
- Message — `<textarea rows={5} required>`

Input style: `border border-[#E8E8E8] rounded-sm px-4 py-3 type-body-md w-full focus:border-[#CB3CFF] focus:outline-none`
Label: `type-mono-label text-[#000000] mb-1 block`
Submit: `bg-[#CB3CFF] text-white type-mono-button rounded-sm px-6 py-3 w-full`

Success state: replace form with `type-display-md text-[#000000]` — "Message received. We'll be in touch within one business day."

Error state: `type-body-md text-[#DC2626]` below submit — "Something went wrong. Please try again."

**Server action stub (`app/(marketing)/contact/actions.ts`):**
```ts
'use server'
export async function submitContactForm(formData: FormData) {
  // TODO: wire Resend in Unit 11
  // Do not log PII (name, email, message). Dev-only log omits values:
  if (process.env.NODE_ENV !== 'production') {
    console.log('contact form submitted', { fields: Array.from(formData.keys()) })
  }
  return { success: true }
}
```

### Inquiry types (right)

- Eyebrow: `/ INQUIRY TYPES` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-lg text-[#000000]`): "What we can help with."

4 rows, each `border-b border-[#E8E8E8] py-4`:
- `/ BENCHMARK REQUEST` — `type-mono-label text-[#959494]` + body: "Run the AI pipeline on your company and receive a benchmarked risk profile."
- `/ EXPERT REQUEST` — `type-mono-label text-[#959494]` + body: "Request a specific expert or ask us to recommend based on your profile."
- `/ ENTERPRISE TRANSFORMATION` — `type-mono-label text-[#959494]` + body: "Multi-site or long-horizon programmes. We scope it with you."
- `/ PARTNERSHIP INQUIRY` — `type-mono-label text-[#959494]` + body: "Consulting firms, industry bodies, and technology partners."

Body: `type-body-md text-[#959494] mt-1`

---

## 3 — Expert Applications

Surface: `bg-white py-20` with `border-t border-[#E8E8E8]`
Layout: Two-column desktop `lg:grid-cols-2 gap-12` → stacked mobile

**Left:**
- Eyebrow: `/ APPLY AS EXPERT` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xl text-[#000000]`): "Join the expert network."
- Body (`type-body-lg text-[#959494]`): "SME24 works exclusively with senior operators who have delivered real transformation programs. If you have deep EHS expertise in a regulated industry, we want to hear from you."
- CTA: "APPLY NOW" → `/auth/signup` — `bg-[#CB3CFF] text-white` button

Note: Expert application flow is built in Unit 05. This CTA links to `/auth/signup` for now; update to `/expert/apply` in Unit 05.

**Right — 4 requirement tags** (hairline badge, `flex flex-wrap gap-2`):
- SENIOR OPERATOR
- INDUSTRIAL EXPERIENCE
- TRANSFORMATION DELIVERY
- REGULATED INDUSTRY

Tag style: `border border-[#E8E8E8] rounded-sm px-4 py-2 type-mono-label text-[#000000]`

---

## 4 — CTA Band

Surface: Full-bleed `linear-gradient(90deg, #CB3CFF 0%, #EF5CC1 50%, #FC4C02 100%)` ~200px.

- Headline (`type-display-xl text-white`, centered): "Operational clarity starts with one question."
- CTA group `flex gap-3 justify-center`:
  - Primary: "GET YOUR BENCHMARK" → `/auth/signup` — `bg-white text-[#000000]`
  - Secondary: "EXPLORE PACKAGES" → `/packages` — `bg-transparent border border-white text-white`

---

## Exit Criteria

- `npm run lint` passes
- `npm run build` passes
- All 4 sections render at mobile, tablet, desktop
- Form submits without error (stub action — no real email sent)
- Success state renders after submission
- No Resend import anywhere in this unit
