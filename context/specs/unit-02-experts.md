# Unit 02 — Expert Network Page Spec

Route: `/experts`
File: `app/(marketing)/experts/page.tsx`
Layout: `app/(marketing)/layout.tsx` — Nav + Footer shared.

Note: All expert cards are static for Unit 02. Live directory data wired in Unit 06.

---

## Section Order

| # | Section | Surface |
|---|---------|---------|
| 1 | Hero | Dark band `bg-[#111111]` |
| 2 | Expert Categories | Light band `bg-white` |
| 3 | Expert Cards | Light band `bg-white` |
| 4 | Engagement Process | Light band `bg-white` |
| 5 | CTA band | Full-bleed gradient strip |

---

## 1 — Hero

Surface: `bg-[#111111] py-20`
Layout: `grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`

**Left column:**
- Eyebrow: `/ EXPERT NETWORK` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xxl text-white`): "Operators. Not presenters."
- Sub-headline (`type-body-lg text-white/60`): "Every SME24 expert has delivered transformation programs at industrial scale. No associate model. No junior delivery. Senior operators only."
- CTA group `flex gap-3`:
  - Primary: "APPLY AS EXPERT" → `/contact` — `bg-[#CB3CFF] text-white`
  - Secondary: "GET YOUR BENCHMARK" → `/auth/signup` — `bg-[#CBF6F9] text-[#000000]`

**Right column:** Brand gradient mesh (same implementation as homepage hero).

---

## 2 — Expert Categories

Surface: `bg-white py-20`
Layout: 7-tag flex-wrap row, centered, `gap-3`

- Eyebrow: `/ COMPETENCIES` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xl text-[#000000]`): "Built for regulated industry risk."

Tags (hairline badge style `border border-[#E8E8E8] rounded-sm px-4 py-2 type-mono-label text-[#000000]`):
- PROCESS SAFETY
- SAFETY LEADERSHIP
- SAFETY CULTURE
- OPERATIONAL EXCELLENCE
- ASSET INTEGRITY
- EXPLOSION PROTECTION
- ESG & SUSTAINABILITY
- INDUSTRIAL TRANSFORMATION

---

## 3 — Expert Cards

Surface: `bg-white py-20` with `border-t border-[#E8E8E8]`
Layout: 3-up desktop → 2-up tablet → 1-up mobile

- Eyebrow: `/ SENIOR OPERATORS` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xl text-[#000000]`): "Senior operators. Not presenters."
- Section CTA below grid: "EXPLORE ALL EXPERTS" → `/contact` — outline button `border border-[#E8E8E8]`
  (Note: links to `/contact` for now; Unit 06 updates to live directory `/experts` filtered view)

**3 static expert cards** (same pattern as homepage expert preview, Unit 06 replaces with live data):

| Name | Initials | Category | Badge |
|------|----------|----------|-------|
| Marcus Bauer | MB | Process Safety | ISO 45001 |
| Sophie Keller | SK | Safety Leadership | Fatality Prevention |
| Thomas Huber | TH | Operational Excellence | Chemical Safety |

Card structure per `design.md` light card pattern:
- Initials avatar: `bg-[#E8DDFF] rounded-full w-12 h-12 flex items-center justify-center type-mono-label text-[#000000]`
- Name: `type-display-md text-[#000000]`
- Category: `type-mono-label text-[#959494]`
- Badge: `bg-[#E8E8E8] text-[#000000] type-mono-label rounded-sm px-2 py-0.5`
- Card: `bg-white border border-[#E8E8E8] rounded-sm p-6`

Section CTA: "REQUEST EXPERT MATCH" → `/contact` — `bg-[#CB3CFF] text-white` button, centered below grid.

---

## 4 — Engagement Process

Surface: `bg-white py-20` with `border-t border-[#E8E8E8]`
Layout: 4-column desktop → 2-up tablet → 1-up mobile

- Eyebrow: `/ ENGAGEMENT PROCESS` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xl text-[#000000]`): "From match to measurable outcome."

| Step | Label | Title | Body |
|------|-------|-------|------|
| / 01 | mono-eyebrow | Match | AI scores and ranks experts against your company's risk profile and industry. |
| / 02 | mono-eyebrow | Discovery | Expert reviews the AI-generated proposal and scopes the assessment with you. |
| / 03 | mono-eyebrow | Assessment | On-site or remote delivery. Structured methodology. Senior operator only. |
| / 04 | mono-eyebrow | Report | Final report delivered to your project workspace. Risk-ranked, action-ready. |

Each step: eyebrow `type-mono-eyebrow text-[#959494]`, title `type-display-md text-[#000000]`, body `type-body-md text-[#959494]`.

---

## 5 — CTA Band

Surface: Full-bleed `linear-gradient(90deg, #CB3CFF 0%, #EF5CC1 50%, #FC4C02 100%)` ~200px.

- Headline (`type-display-xl text-white`, centered): "The right expert for your exact risk profile."
- CTA group `flex gap-3 justify-center`:
  - Primary: "GET YOUR BENCHMARK" → `/auth/signup` — `bg-white text-[#000000]`
  - Secondary: "APPLY AS EXPERT" → `/contact` — `bg-transparent border border-white text-white`

---

## Exit Criteria

- `npm run lint` passes
- `npm run build` passes
- All 5 sections render at mobile, tablet, desktop
- Design tokens match `context/design.md`
- Static expert cards match homepage preview cards exactly
