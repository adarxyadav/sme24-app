# Unit 02 — Homepage Spec

Route: `/`
File: `app/(marketing)/page.tsx`
Layout: `app/(marketing)/layout.tsx` — wraps Nav + Footer for all marketing pages.
Note: `app/page.tsx` is deleted. Marketing owns `/` via the route group.

---

## Section Order

| # | Section | Surface |
|---|---------|---------|
| 1 | Nav | Transparent → dark on dark hero / white on scroll |
| 2 | Hero | Dark band `bg-[#010125]` |
| 3 | Industry Pain | Dark band `bg-[#010125]` |
| 4 | Stats tiles | White band `bg-white` |
| 5 | How It Works teaser | White band `bg-white` |
| 6 | Industries Served | White band `bg-white` |
| 7 | Expert preview | White band `bg-white` |
| 8 | Packages teaser | White band `bg-white` |
| 9 | CTA band | Full-bleed gradient strip |
| 10 | Footer | White band `bg-white` |

---

## 1 — Nav

File: `components/marketing/nav.tsx`

- Logo: "SME24" wordmark, links to `/`
- Links (mono-label uppercase, gap 32px): How It Works → `/how-it-works` | Experts → `/experts` | Packages → `/packages` | Contact → `/contact`
- Active state: `text-[#9259FD]`
- CTA pill: "GET YOUR BENCHMARK" → `/auth/signup`
  - On dark hero: ghost-dark `bg-[#313641] text-white`
  - After scroll (light): primary `bg-[#9259FD] text-white`
- Sticky: `sticky top-0 z-50 backdrop-blur-sm`
  - On dark hero: `bg-[#010125]/90`
  - After scroll: `bg-white/90 border-b border-[#E8E8E8]`
- Mobile (`< 768px`): hamburger icon → full-screen dark overlay `bg-[#010125]`, 200ms CSS opacity fade, links centered, large touch targets, X to close.

---

## 2 — Hero

Surface: `bg-[#010125] py-20`
Layout: `grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`

**Left column (copy stack, left-aligned):**
- Eyebrow: `/ AI-POWERED EHS INTELLIGENCE` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xxl text-white`): "No slides. Just visibility."
- Sub-headline (`type-body-lg text-white/60`): "Operational blind spots identified before the first workshop. AI-benchmarked. Senior expert delivered."
- CTA group `flex gap-3`:
  - Primary: "GET YOUR BENCHMARK" → `/auth/signup` — `bg-[#9259FD] text-white`
  - Secondary: "SEE HOW IT WORKS" → `/how-it-works` — `bg-[#CBF6F9] text-[#000000]`

**Right column (gradient mesh):**
- Three overlapping blurred radial gradients on `bg-[#010125]` canvas
- `mix-blend-mode: screen`
- Stops: `#9259FD`, `#EF5CC1`, `#FC4C02`
- Min rendered width 400px; hidden below `lg`, stacks below copy on mobile

---

## 3 — Industry Pain

Surface: `bg-[#010125] py-20`
Layout: Two-column contrast — Traditional Consulting vs SME24

- Eyebrow: `/ THE PROBLEM` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xl text-white`): "The old model is broken."
- Two columns (dark cards `bg-[#313641] border border-[#26263A]`):

**Traditional consulting:**
- Label: `/ TRADITIONAL` — `type-mono-label text-[#959494]`
- Points: Workshop-heavy | Junior consultant delivery | Generic frameworks | Delayed visibility

**SME24:**
- Label: `/ SME24` — `type-mono-label text-[#959494]`
- Points: Signal-first | Senior operators only | Benchmarked before day one | Visibility in 48h

---

## 4 — Stats Tiles

Surface: `bg-white py-20`
Layout: 3-up grid desktop → 1-up mobile

| Tile | Color | Stat | Label |
|------|-------|------|-------|
| 1 | Mint `bg-[#CBF6F9]` | 9 | Senior experts, verified |
| 2 | Violet `bg-[#E8DDFF]` | 48h | Visibility from first call |
| 3 | Peach `bg-[#FFE5D3]` | CHF 2,000 | Starting price, fixed |

Stat: `type-display-lg text-[#000000]`
Label: `type-mono-label text-[#000000]/60`

---

## 5 — How It Works Teaser

Surface: `bg-white py-20`

- Eyebrow: `/ HOW IT WORKS` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xl text-[#000000]`): "From company name to expert report"
- Layout: 4-column desktop → 2-up tablet → 1-up mobile

| Step | Label | Title | Body |
|------|-------|-------|------|
| / 01 | mono-eyebrow | Identify your exposure | AI researches public EHS data and extracts KPIs for your company automatically. |
| / 02 | mono-eyebrow | See where you stand | Your risk profile ranked against industry peers. No workshops, no waiting. |
| / 03 | mono-eyebrow | Meet your expert | A ranked shortlist of senior operators matched to your specific risk profile. |
| / 04 | mono-eyebrow | Get results in 48h | Your expert conducts the assessment and delivers the report to your workspace. |

- Section CTA: "SEE THE FULL PROCESS" → `/how-it-works` — outline button `border border-[#E8E8E8]`

---

## 6 — Industries Served

Surface: `bg-white py-20` (hairline-divided from above: `border-t border-[#E8E8E8]`)

- Eyebrow: `/ INDUSTRIES` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xl text-[#000000]`): "Built for regulated industries"
- Layout: 6-up grid desktop → 3-up tablet → 2-up mobile
- Industries: Chemicals | Manufacturing | Mining | Pharma | Energy | Industrial Operations
- Each item: mono-label uppercase, hairline card `border border-[#E8E8E8] rounded-sm p-6`

---

## 7 — Expert Preview

Surface: `bg-white py-20`

- Eyebrow: `/ EXPERT NETWORK` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xl text-[#000000]`): "Senior operators. Not presenters."
- Layout: 3-up desktop → 2-up tablet → 1-up mobile
- Section CTA: "EXPLORE ALL EXPERTS" → `/experts` — outline button

**3 static expert cards** (swap for live data in Unit 06):

| Name | Initials | Category | Badge |
|------|----------|----------|-------|
| Marcus Bauer | MB | Process Safety | ISO 45001 |
| Sophie Keller | SK | Safety Leadership | Fatality Prevention |
| Thomas Huber | TH | Operational Excellence | Chemical Safety |

Card structure per `design.md` light card pattern:
- Initials avatar: colored circle, 48px, `bg-[#E8DDFF]` (violet tint)
- Name: `type-display-md text-[#000000]`
- Category: `type-mono-label text-[#959494]`
- Badge: `bg-[#E8E8E8] text-[#000000] type-mono-label rounded-sm px-2 py-0.5`

---

## 8 — Packages Teaser

Surface: `bg-white py-20`

- Eyebrow: `/ PACKAGES` — `type-mono-eyebrow text-[#959494]`
- Headline (`type-display-xl text-[#000000]`): "Fixed prices. No retainer."
- Layout: 4-up desktop → 2-up tablet → 1-up mobile
- Section CTA: "SEE ALL PACKAGES" → `/packages` — outline button

**4 package cards** (data from `lib/packages.ts`, defined in Unit 09):

| Package | Price | Best for | Format | Output | CTA |
|---------|-------|----------|--------|--------|-----|
| EHS Snapshot | CHF 2,000 | Quick visibility | Remote (1 day) | Top 5 Risks | "GET STARTED" → `/auth/signup` (primary violet) |
| EHS Reality Check | CHF 5,000 | Validate real risks | On-Site (2 days) | Top 20 Risks | "GET STARTED" → `/auth/signup` (primary violet) |
| EHS Transformation Plan | CHF 10,000 | Fix systematically | On-Site (5 days) | Gap Plan & Timeline | "GET STARTED" → `/auth/signup` (primary violet) |
| EHS Execution Partner | CHF 10,000 + 1,850/day | Deliver results | On-Site + Ongoing | Measured Risk Reduction | "LET'S TALK" → `/contact` (ghost-dark `bg-[#313641]`) |

Middle card (EHS Reality Check) polarity-flipped: `bg-[#010125]` per design spec pricing tier pattern.

---

## 9 — CTA Band

Surface: Full-bleed gradient strip `linear-gradient(90deg, #9259FD 0%, #EF5CC1 50%, #FC4C02 100%)`
Height: ~200px. No container cap — edge-to-edge.

- Headline (`type-display-xl text-white`, centered): "Your company's EHS risk profile, in minutes"
- CTA group `flex gap-3 justify-center`:
  - Primary: "GET YOUR BENCHMARK" → `/auth/signup` — `bg-white text-[#000000]`
  - Secondary: "EXPLORE EXPERTS" → `/experts` — `bg-transparent border border-white text-white`

---

## 10 — Footer

File: `components/marketing/footer.tsx`

**Wordmark banner** (full-bleed, above footer body):
```
border-t border-[#E8E8E8]
"sme24.ch" — clamp(4rem, 12vw, 10rem), Urbanist 500, color #E8E8E8, white-space nowrap
```

**Footer body** `bg-white border-t border-[#E8E8E8] py-12`:
- Brand column: "SME24" + "AI-powered EHS consulting marketplace" (`type-body-md text-[#959494]`)
- Nav column (mono-label): How It Works | Experts | Packages | Contact
- Contact column: "Contact" → `/contact`
- Social column: LinkedIn → `href="#"` — `// TODO: replace with confirmed LinkedIn URL (Philipp)`
- Copyright: `© 2026 SME24. All rights reserved.` — `type-caption text-[#959494]`

---

## Deferred (Unit 10)

- Benchmark Preview section — requires portal dashboard visuals and live KPI data
- Trust / Credibility section — requires real testimonials or verified outcome metrics

---

## Exit Criteria

- `npm run lint` passes
- `npm run build` passes
- All 10 sections render at mobile, tablet, and desktop breakpoints
- Design tokens match `context/design.md` throughout
- No placeholder `href="#"` except the LinkedIn social link (which is explicitly marked TODO)
