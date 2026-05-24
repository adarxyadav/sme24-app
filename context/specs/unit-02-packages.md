# Unit 02 — Packages Page Spec

Route: `/packages`
File: `app/(marketing)/packages/page.tsx`
Layout: `app/(marketing)/layout.tsx` — Nav + Footer shared.

Note: Package data inline static array — no `lib/packages.ts` yet (Unit 09).

---

## Package Data (static inline)

```ts
const packages = [
  {
    id: "snapshot",
    name: "EHS Snapshot",
    price: "CHF 2,000",
    bestFor: "Quick operational visibility",
    format: "Remote (1 day)",
    deliverables: ["Top 5 risk areas identified", "KPI benchmark vs industry peers", "Prioritised risk register"],
    timeline: "48h turnaround",
    cta: { label: "GET STARTED", href: "/auth/signup", variant: "primary" },
  },
  {
    id: "reality-check",
    name: "EHS Reality Check",
    price: "CHF 5,000",
    bestFor: "Validate real operational risks",
    format: "On-site (2 days)",
    deliverables: ["Top 20 risks assessed", "Safety maturity score", "Leadership gap analysis", "Action priority list"],
    timeline: "Report within 5 days",
    cta: { label: "GET STARTED", href: "/auth/signup", variant: "primary" },
    featured: true, // polarity-flipped dark card
  },
  {
    id: "transformation",
    name: "EHS Transformation Plan",
    price: "CHF 10,000",
    bestFor: "Fix systematically",
    format: "On-site (5 days)",
    deliverables: ["Full gap analysis", "Transformation roadmap", "PMO-ready action plan", "Compliance alignment review"],
    timeline: "Report within 10 days",
    cta: { label: "GET STARTED", href: "/auth/signup", variant: "primary" },
  },
  {
    id: "execution",
    name: "EHS Execution Partner",
    price: "CHF 10,000 + 1,850/day",
    bestFor: "Deliver measured risk reduction",
    format: "On-site + Ongoing",
    deliverables: ["Measured risk reduction", "Multi-site delivery", "Leadership programme", "Governance framework"],
    timeline: "Ongoing engagement",
    cta: { label: "LET'S TALK", href: "/contact", variant: "ghost-dark" },
  },
]
```

---

## Section Order

| # | Section | Surface |
|---|---------|---------|
| 1 | Hero | Dark band `bg-[#010125]` |
| 2 | Package Cards | Light band `bg-white` |
| 3 | Comparison Table | Light band `bg-white` |
| 4 | FAQ | Light band `bg-white` |
| 5 | CTA band | Full-bleed gradient strip |

---

## 1 — Hero

Surface: `bg-[#010125] py-20`
Layout: Single column, `max-w-[1280px] mx-auto px-6`, copy centered or left-aligned (left per design rules)

- Eyebrow: `/ PACKAGES` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xxl text-white`): "Fixed prices. No retainer."
- Sub-headline (`type-body-lg text-white/60`): "Four structured engagements. Every price published. No proposals, no negotiation — unless you want an ongoing partner."
- No right-column gradient mesh on this page — single-column hero keeps it clean.

---

## 2 — Package Cards

Surface: `bg-white py-20`
Layout: 4-up desktop → 2-up tablet → 1-up mobile

- Eyebrow: `/ WHAT YOU GET` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xl text-[#000000]`): "Choose your engagement."

**Card rendering rules:**
- Standard cards: `bg-white border border-[#E8E8E8] rounded-sm p-6`
- Featured card (`featured: true` — EHS Reality Check): `bg-[#010125] rounded-sm p-6` (polarity-flipped, per design pricing tier pattern)
- Package name: `type-mono-label text-[#959494] mb-2` (standard) or `type-mono-label text-[#959494] mb-2` (featured)
- Price: `type-display-lg text-[#000000]` (standard) or `type-display-lg text-white` (featured)
- Best for: `type-body-md text-[#959494]` (standard) or `type-body-md text-white/60` (featured)
- Format badge: `bg-[#E8E8E8] text-[#000000] type-mono-label rounded-sm px-2 py-0.5` (standard) or `bg-[#313641] text-white type-mono-label rounded-sm px-2 py-0.5` (featured)
- Deliverables: `type-body-md text-[#959494]` (standard) or `type-body-md text-white/60` (featured), `border-t border-[#E8E8E8]` (standard) or `border-t border-[#26263A]` (featured) dividers
- CTA: primary `bg-[#9259FD] text-white` for GET STARTED, ghost-dark `bg-[#313641] text-white` for LET'S TALK

---

## 3 — Comparison Table

Surface: `bg-white py-20` with `border-t border-[#E8E8E8]`

- Eyebrow: `/ COMPARE` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xl text-[#000000]`): "What's included."

Table structure per `design.md` data chrome pattern. Horizontal scroll on mobile.

| | EHS Snapshot | EHS Reality Check | EHS Transformation Plan | EHS Execution Partner |
|---|---|---|---|---|
| Price | CHF 2,000 | CHF 5,000 | CHF 10,000 | CHF 10,000 + 1,850/day |
| Format | Remote · 1 day | On-site · 2 days | On-site · 5 days | On-site + Ongoing |
| Risk assessment | ● | ● | ● | ● |
| Industry benchmark | ● | ● | ● | ● |
| Safety maturity score | — | ● | ● | ● |
| Leadership gap analysis | — | ● | ● | ● |
| Transformation roadmap | — | — | ● | ● |
| PMO action plan | — | — | ● | ● |
| Ongoing delivery | — | — | — | ● |

● rendered as `text-[#16A34A]` success dot. — rendered as `text-[#959494]`.
Header row: `bg-[#E8E8E8] type-mono-label text-[#959494]`.
Body rows: `border-b border-[#E8E8E8] type-body-md`.

---

## 4 — FAQ

Surface: `bg-white py-20` with `border-t border-[#E8E8E8]`
Layout: Two-column on desktop (eyebrow+headline left, Q&A list right) → single column mobile

- Eyebrow: `/ FAQ` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xl text-[#000000]`): "Common questions."

Static Q&A list — no JS accordion. Each item: `border-b border-[#E8E8E8] py-5`.
Question: `type-display-md text-[#000000]`
Answer: `type-body-md text-[#959494] mt-2`

| Question | Answer |
|----------|--------|
| Does the expert travel to our site? | For on-site packages, yes — travel costs are included in the fixed price. Remote packages are conducted via video call and async review. |
| What data does the AI use? | Publicly available sustainability reports, news sources, regulatory filings, and industry databases. No proprietary data is required to run the benchmark. |
| How is the report delivered? | All reports are delivered to your secure project workspace on the SME24 platform in PDF format. |
| Is our data kept confidential? | Yes. All client data is stored in EU-region infrastructure. NDAs are available on request for all engagement types. |
| Can we request a specific expert? | Yes. You can request an expert from the directory or ask SME24 to make a recommendation based on your risk profile. |
| What if we need more than a fixed package? | The EHS Execution Partner package is flexible. Contact us to scope a bespoke programme. |

---

## 5 — CTA Band

Surface: Full-bleed `linear-gradient(90deg, #9259FD 0%, #EF5CC1 50%, #FC4C02 100%)` ~200px.

- Headline (`type-display-xl text-white`, centered): "Pick a package. Start seeing clearly."
- CTA group `flex gap-3 justify-center`:
  - Primary: "GET YOUR BENCHMARK" → `/auth/signup` — `bg-white text-[#000000]`
  - Secondary: "CONTACT US" → `/contact` — `bg-transparent border border-white text-white`

---

## Exit Criteria

- `npm run lint` passes
- `npm run build` passes
- All 5 sections render at mobile, tablet, desktop
- Package data is a static inline array — no external import
- Comparison table scrolls horizontally on mobile
- Featured card (EHS Reality Check) renders with dark polarity
