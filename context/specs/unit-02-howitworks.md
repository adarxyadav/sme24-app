# Unit 02 — How It Works Page Spec

Route: `/how-it-works`
File: `app/(marketing)/how-it-works/page.tsx`
Layout: `app/(marketing)/layout.tsx` — Nav + Footer shared.

---

## Section Order

| # | Section | Surface |
|---|---------|---------|
| 1 | Hero | Dark band `bg-[#010125]` |
| 2 | Why Traditional Fails | Dark band `bg-[#010125]` |
| 3 | AI Pipeline | Light band `bg-white` |
| 4 | Proposal & Purchase | Light band `bg-white` |
| 5 | Speed & Delivery | Light band `bg-white` |
| 6 | CTA band | Full-bleed gradient strip |

---

## 1 — Hero

Surface: `bg-[#010125] py-20`
Layout: `grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`

**Left column:**
- Eyebrow: `/ HOW IT WORKS` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xxl text-white`): "Signals before workshops."
- Sub-headline (`type-body-lg text-white/60`): "AI researches your company's public EHS footprint before any consultant sets foot on site. You see the exposure before you commit."
- CTA group `flex gap-3`:
  - Primary: "GET YOUR BENCHMARK" → `/auth/signup` — `bg-[#9259FD] text-white`
  - Secondary: "EXPLORE EXPERTS" → `/experts` — `bg-[#CBF6F9] text-[#000000]`

**Right column:** Brand gradient mesh (same implementation as homepage hero).

---

## 2 — Why Traditional Consulting Fails

Surface: `bg-[#010125] py-20`
Layout: Two-column contrast cards (`bg-[#313641] border border-[#26263A]`)

- Eyebrow: `/ THE PROBLEM` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xl text-white`): "Traditional consulting is slow by design."
- Body (`type-body-lg text-white/60`): "The old model starts with workshops. SME24 starts with data."

**Left card — Traditional:**
- Label: `/ TRADITIONAL` — `type-mono-label text-[#959494]`
- Points (body-md text-white/60, bullet list):
  - Slow visibility — weeks before you understand your exposure
  - Generic frameworks — not calibrated to your industry
  - Junior consultant delivery — seniors pitch, juniors execute
  - Workshop-heavy — discovery costs money before insight

**Right card — SME24:**
- Label: `/ SME24` — `type-mono-label text-[#959494]`
- Points (body-md text-white/60, bullet list):
  - Signal-first — AI extracts KPIs from public data before day one
  - Benchmarked against real peers — not sector averages
  - Senior operators only — matched to your exact risk profile
  - Visibility in 48h — before you spend a franc

---

## 3 — AI Pipeline

Surface: `bg-white py-20`
Layout: 4-column desktop → 2-up tablet → 1-up mobile (same pattern as homepage "How It Works teaser")

- Eyebrow: `/ THE AI PIPELINE` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xl text-[#000000]`): "Four steps from name to proposal."

| Step | Label | Title | Body |
|------|-------|-------|------|
| / 01 | mono-eyebrow | Detect | AI crawls sustainability reports, news, and public filings. Extracts EHS KPIs and scores confidence per signal. |
| / 02 | mono-eyebrow | Benchmark | Your KPI profile ranked against verified industry peers. Safety maturity scored. Financial exposure estimated. |
| / 03 | mono-eyebrow | Match | Senior experts filtered by competency tags, industry alignment, and transformation track record. Ranked shortlist generated. |
| / 04 | mono-eyebrow | Execute | You select a package, pay once, and the expert delivers the assessment to your project workspace. |

Each step: eyebrow label `type-mono-eyebrow text-[#959494]`, title `type-display-md text-[#000000]`, body `type-body-md text-[#959494]`.
No connecting arrows — sequential ordering carries flow.

---

## 4 — Proposal & Purchase

Surface: `bg-white py-20` with `border-t border-[#E8E8E8]`
Layout: Two-column `lg:grid-cols-2 gap-12 items-start`

- Eyebrow: `/ PROPOSAL & PURCHASE` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xl text-[#000000]`): "A benchmarked proposal before you commit."
- Body (`type-body-lg text-[#959494]`): "The AI generates a risk summary, expert shortlist, and package recommendation. Your admin reviews it. You see it before any money changes hands."

**Right column — 3 feature rows** (hairline-divided):

| Row | Label | Copy |
|-----|-------|------|
| AI-generated proposal | `/ PROPOSAL` | Risk summary, KPI highlights, and package recommendation in one document. |
| Expert shortlist | `/ MATCHMAKING` | Ranked experts matched to your specific risk profile and industry. |
| One-click checkout | `/ PURCHASE` | Select a package, pay via Stripe, and your project workspace opens immediately. |

Each row: label `type-mono-label text-[#959494]`, body `type-body-md text-[#000000]`. Divided by `border-t border-[#E8E8E8] py-4`.

---

## 5 — Speed & Delivery

Surface: `bg-white py-20` with `border-t border-[#E8E8E8]`
Layout: 3-up stat tile grid desktop → 1-up mobile

- Eyebrow: `/ DELIVERY` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xl text-[#000000]`): "Fast, structured, measurable."

| Tile | Color | Stat | Label |
|------|-------|------|-------|
| 1 | Mint `bg-[#CBF6F9]` | 48h | Visibility from first run |
| 2 | Violet `bg-[#E8DDFF]` | Top 3 | Expert matches per profile |
| 3 | Peach `bg-[#FFE5D3]` | 100% | Senior operator delivery |

Stat: `type-display-lg text-[#000000]`
Label: `type-mono-label text-[#000000]/60`

---

## 6 — CTA Band

Surface: Full-bleed `linear-gradient(90deg, #9259FD 0%, #EF5CC1 50%, #FC4C02 100%)` ~200px. No container cap.

- Headline (`type-display-xl text-white`, centered): "Your EHS risk profile, benchmarked in minutes."
- CTA group `flex gap-3 justify-center`:
  - Primary: "GET YOUR BENCHMARK" → `/auth/signup` — `bg-white text-[#000000]`
  - Secondary: "EXPLORE EXPERTS" → `/experts` — `bg-transparent border border-white text-white`

---

## Exit Criteria

- `npm run lint` passes
- `npm run build` passes
- All 6 sections render at mobile, tablet, desktop
- Design tokens match `context/design.md`
