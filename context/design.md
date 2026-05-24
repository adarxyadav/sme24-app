# SME24 Design System

AI-powered EHS consulting marketplace. Technical, blueprint-style design inspired by Together AI's open-source infrastructure aesthetic.

---

## Governing Principles

**Two-face typography.** Urbanist (display, sentence-case) for all narrative. Geist Mono (uppercase, positive tracking) for every section label, button, table header, and eyebrow. The contrast is the brand voice — technically precise, narratively confident.

**Surface rhythm, not shadow.** Near-black hero band → white content bands → optional dark feature band → white footer. Surface alternation carries depth; hairline borders carry card elevation. No floating card shadows on light surfaces.

**One signature element.** A three-stop brand gradient (`#9259FD` → `#EF5CC1` → `#FC4C02`) is the entire decorative system — violet to magenta to orange. Used only at hero scale (≥ 400px wide) as the full-bleed gradient strip or flowing mesh. Never miniaturised; never reordered; never extended with a fourth stop.

**One primary CTA.** Brand violet (`#9259FD`) carries every conversion target on light surfaces. One primary per viewport.

---

## Colors

### Tokens

| Role | CSS Variable | Value |
|---|---|---|
| Headings / text on light | `--color-ink` | `#000000` |
| Primary CTA fill | `--color-primary` | `#9259FD` |
| Default page bg | `--color-canvas` | `#FFFFFF` |
| Hairline / canvas soft | `--color-hairline` | `#E8E8E8` |
| Hero / dark band bg | `--color-canvas-dark` | `#010125` |
| Dividers on canvas-dark | `--color-hairline-dark` | `#26263A` |
| Inner dark cards / ghost buttons | `--color-surface-dark-soft` | `#313641` |
| Secondary text on light | `--color-body` | `#666666` |
| All text on dark | `--color-on-dark` | `#FFFFFF` |
| Gradient stop 1 — primary violet | `--color-brand-violet` | `#9259FD` |
| Gradient stop 2 — magenta | `--color-brand-magenta` | `#EF5CC1` |
| Gradient stop 3 — tertiary orange | `--color-brand-orange` | `#FC4C02` |
| Hero secondary CTA / stat tiles | `--color-accent-mint` | `#CBF6F9` |
| Stat tile — violet tint | `--color-tint-violet` | `#E8DDFF` |
| Stat tile — peach tint | `--color-tint-peach` | `#FFE5D3` |
| Success | `--color-success` | `#16A34A` |
| Warning | `--color-warning` | `#F59E0B` |
| Danger | `--color-danger` | `#DC2626` |

### Brand Gradient

```css
background: linear-gradient(90deg, #9259FD 0%, #EF5CC1 50%, #FC4C02 100%);
```

Three stops, fixed order. Violet → Magenta → Orange. Used only at hero scale as a full-width gradient band or as the right-column mesh in hero sections. Never as text fill, button fill, badge, or icon. Never reordered, never cropped to a single color, never extended.

### CTA Convention

| Context | Button style |
|---|---|
| Light surfaces (most pages) | `bg-[#9259FD] text-white` — brand violet |
| Secondary on dark hero (adjacent to primary) | `bg-[#CBF6F9] text-[#000000]` — mint pill |
| Secondary on light hero | `bg-[#FFFFFF] text-[#000000]` — white pill |
| Ghost on dark band | `bg-[#313641] text-white` — surface-dark-soft fill |
| Outline (forms, filters, secondary actions) | `border border-[#E8E8E8] bg-transparent text-[#000000]` |

One primary CTA per viewport.

---

## Typography

### Faces

| Role | Face | Variable |
|---|---|---|
| Display / body / narrative | Urbanist | `--font-sans` |
| Labels / eyebrows / buttons | Geist Mono (uppercase) | `--font-mono` |

Urbanist at weight 400 and 500 only — never bold (700+) at display sizes. Sentence-case for all display text.

Geist Mono at weight 500, always uppercase, small positive letter-spacing. 10–14px only. Never used for body paragraphs.

### Display Scale (Urbanist, sentence-case)

| Utility class | Size | Weight | Line-height | Letter-spacing | Use |
|---|---|---|---|---|---|
| `type-display-xxl` | 64px | 500 | 70.4px | −1.92px | Single hero headline per page |
| `type-display-xl` | 40px | 500 | 48px | −0.8px | Section headlines |
| `type-display-lg` | 28px | 500 | 32.2px | −0.42px | Sub-section headlines |
| `type-display-md` | 22px | 500 | 25.3px | −0.22px | Card titles, feature headings |
| `type-body-lg` | 18px | 400 | 23.4px | −0.18px | Lead paragraphs under section headlines |
| `type-body-lg-strong` | 18px | 500 | 23.4px | −0.18px | Emphasis in lead paragraphs |
| `type-body-md` | 16px | 400 | 20.8px | −0.16px | Default body |
| `type-body-md-strong` | 16px | 500 | 20.8px | −0.16px | Bolded inline body text |
| `type-caption` | 14px | 400 | 19.6px | — | Fine print, secondary captions |
| `type-caption-strong` | 14px | 500 | 19.6px | — | Bolded caption emphasis |

### Mono-Caps Scale (PP Neue Montreal Mono, weight 500, uppercase)

| Utility class | Size | Line-height | Letter-spacing | Use |
|---|---|---|---|---|
| `type-mono-button` | 14px | 1 | 0.08px | All button labels — height 44px fixed, padding 0 24px |
| `type-mono-eyebrow` | 11px | 11px | 0.55px | Section eyebrows, breadcrumb labels |
| `type-mono-label` | 11px | 15.4px | 0.055px | Badge text, tag pills, table-header cells, pricing row labels |
| `type-mono-caption` | 10px | 14px | 0.05px | Mono fine print, code-mockup captions |

### Rules

- **Headlines sentence-case.** "From company name to benchmarked proposal" — never "FROM COMPANY…".
- **Mono is labels only.** No paragraph ever runs in PP Neue Montreal Mono.
- **Negative letter-spacing on Urbanist only.** Mono uses small positive tracking.
- **Weight 500 is the ceiling for Urbanist.** Never bold (700+) at display sizes.
- **Left-align within a copy stack.** Headline → body → CTA, all left.

---

## Surface Rhythm

Every page cycles through exactly two surfaces.

```
┌─────────────────────────────────────────┐
│  DARK BAND   bg-[#010125]               │  ← hero
├─────────────────────────────────────────┤
│  LIGHT BAND  bg-white                   │  ← product, pricing, experts
├─────────────────────────────────────────┤
│  GRADIENT STRIP (full-bleed, ~120px)    │  ← brand signature, section sign-off
├─────────────────────────────────────────┤
│  DARK BAND   bg-[#010125]  (optional)   │  ← AI credibility, stats band
├─────────────────────────────────────────┤
│  LIGHT BAND  bg-white                   │  ← footer
│  + sme24.ch wordmark banner (hairline)  │
└─────────────────────────────────────────┘
```

Section padding: `py-20` (80px). Container: `max-w-[1280px] mx-auto px-6`.

---

## Spacing

4px base with two named outliers (7.2px, 55.2px). Marketing bands use the 80px section token.

| Token | px | Use |
|---|---|---|
| `space-xxs` | 2 | Micro gaps |
| `space-xs` | 4 | Icon gap |
| `space-sm` | 8 | Chip group gap, badge padding-x |
| `space-md` | 12 | Nav link gap |
| `space-lg` | 16 | Headline-to-body gap, button padding-y |
| `space-xl` | 20 | Toggle rail padding |
| `space-2xl` | 24 | Card inner padding |
| `space-3xl` | 32 | Stat tile padding |
| `space-4xl` | 44 | Touch target height |
| `space-5xl` | 48 | Headline-to-grid gap |
| `space-6xl` | 55.2 | Outlier — pricing sub-tab block |
| `space-section` | 80 | Section vertical padding |

---

## Border Radius

The canonical card/button radius is 4px. 3.25px appears in pricing sub-tabs and outline buttons. 8px in feature-tab pills. 9999px is reserved for the floating chat-launcher orb.

| Token | Value | Use |
|---|---|---|
| `radius-none` | 0px | Full-bleed bands, wordmark banner |
| `radius-xs` | 3.25px | Pricing sub-tabs, outline buttons |
| `radius-sm` | 4px | Canonical — buttons, cards, badges, inputs, data rows |
| `radius-md` | 8px | Feature-tab pills, toggle groups |
| `radius-full` | 9999px | Floating chat-launcher orb only |

---

## Elevation

Light-surface cards lean on hairlines, not shadow. The single soft-drop shadow tints with navy ink and applies only to floating affordances.

| Level | Treatment |
|---|---|
| Level 0 — Flat | No border, no shadow |
| Level 1 — Hairline | `border border-[#E8E8E8]` |
| Level 2 — Hairline on dark | `border border-[#26263A]` on canvas-dark |
| Level 3 — Soft drop | `box-shadow: 0 4px 24px rgba(1,1,37,0.18)` — floating affordances only |

---

## Components

### Button

All buttons: `type-mono-button` label (PP Neue Montreal Mono 500 14px uppercase). Shape: `radius-sm` (4px). No shadow.

```
Primary:          bg-[#9259FD] text-white          px-6 py-2 radius-sm
Secondary Mint:   bg-[#CBF6F9] text-[#000000]      px-6 py-2 radius-sm   ← hero-only
Secondary White:  bg-[#FFFFFF] text-[#000000]      px-6 py-2 radius-sm   ← hero-only
Ghost on dark:    bg-[#313641] text-white           px-6 py-2 radius-sm
Outline:          border border-[#E8E8E8] bg-transparent text-[#000000] px-6 py-2 radius-xs (3.25px)
Icon circular:    bg-[#000000] text-white rounded-full w-10 h-10         ← chat-launcher only
```

CTA group: `flex gap-3`. One primary per viewport.

### Eyebrow + Headline

```html
<!-- Light band -->
<p class="type-mono-eyebrow text-[#666666] mb-3">/ AI Research Pipeline</p>
<h2 class="type-display-xl text-[#000000]">From company name to benchmarked proposal</h2>

<!-- Dark band -->
<p class="type-mono-eyebrow text-[#666666] mb-3">/ EHS Intelligence</p>
<h2 class="type-display-xl text-white">Grounded in verified industry data</h2>
```

Eyebrow always in `text-[#666666]` (body color) — both light and dark bands. Breadcrumb eyebrows use `/` prefix.

### Card (light — testimonial)

```html
<div class="bg-white border border-[#E8E8E8] rounded-sm p-6">
  <p class="type-mono-label text-[#666666] mb-3">EHS Snapshot</p>
  <h3 class="type-display-md text-[#000000] mb-2">Card title</h3>
  <p class="type-body-md text-[#666666]">Body copy.</p>
</div>
```

### Card (dark — research)

```html
<div class="bg-surface-dark-soft border border-[#26263A] rounded-sm p-6">
  <p class="type-mono-eyebrow text-[#666666] mb-3">/ ISO 45001</p>
  <h3 class="type-display-md text-white mb-2">Card title</h3>
  <p class="type-body-md text-white/60">Body copy.</p>
</div>
```

### Article card (gradient fill)

```html
<div class="rounded-sm overflow-hidden" style="background: linear-gradient(135deg, #9259FD, #EF5CC1, #FC4C02);">
  <div class="p-6 pt-24">
    <p class="type-mono-label text-white/70 mb-2">Product Update</p>
    <h3 class="type-display-md text-white">Headline here.</h3>
  </div>
</div>
```

### Stat tile — tinted

Three tint variants. Mono-caps label below the number.

```html
<!-- Mint -->
<div class="bg-[#CBF6F9] rounded-sm p-8">
  <p class="type-display-lg text-[#000000] mb-1">94%</p>
  <p class="type-mono-label text-[#000000]/60">Proposal acceptance rate</p>
</div>

<!-- Periwinkle -->
<div class="bg-[#E8DDFF] rounded-sm p-8">
  <p class="type-display-lg text-[#000000] mb-1">60%</p>
  <p class="type-mono-label text-[#000000]/60">Latency reduction</p>
</div>

<!-- Peach -->
<div class="bg-[#FFE5D3] rounded-sm p-8">
  <p class="type-display-lg text-[#000000] mb-1">90%</p>
  <p class="type-mono-label text-[#000000]/60">Cost saved</p>
</div>
```

### Badge

```
Light surface neutral: bg-[#E8E8E8] text-[#000000] rounded-sm px-2 py-0.5 type-mono-label
Light surface subtle:  bg-white border border-[#E8E8E8] text-[#000000] rounded-sm px-2 py-0.5 type-mono-label
On dark:               bg-[#313641] text-white rounded-sm px-2 py-0.5 type-mono-label
```

### Feature-tab pill

```html
<div class="flex gap-2">
  <button class="type-mono-label bg-[#000000] text-white px-4 py-1.5 rounded-md">Inference</button>
  <button class="type-mono-label text-[#000000] px-4 py-1.5 rounded-md">Fine-tuning</button>
  <button class="type-mono-label text-[#000000] px-4 py-1.5 rounded-md">GPU clusters</button>
</div>
```

### Pricing sub-tab

```html
<div class="inline-flex border border-[#E8E8E8] rounded-xs">
  <button class="type-mono-label text-[#000000] px-4 py-2 border-r border-[#E8E8E8]">Text</button>
  <button class="type-mono-label text-[#000000] px-4 py-2">Vision</button>
</div>
```

### Toggle-pill segmented control

```html
<div class="bg-[#E8E8E8] rounded-md p-0.5 inline-flex">
  <button class="type-mono-label bg-[#000000] text-white px-4 py-1.5 rounded-md">Standard Pricing</button>
  <button class="type-mono-label text-[#000000] px-4 py-1.5 rounded-md">Wholesale Pricing</button>
</div>
```

### Table (data chrome)

```html
<table>
  <thead>
    <tr class="bg-[#E8E8E8]">
      <th class="type-mono-label text-[#666666] px-4 py-3 text-left">KPI Indicator</th>
      <th class="type-mono-label text-[#666666] px-4 py-3 text-left">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-[#E8E8E8]">
      <td class="type-body-md text-[#000000] px-4 py-3.5">Lost Time Injury Rate</td>
      <td class="type-mono-label text-[#666666] px-4 py-3.5">Lagging</td>
    </tr>
  </tbody>
</table>
```

### Pricing tier grid

Three-up grid. Middle tier polarity-flipped (dark card). Mono uppercase tier name, display numeral price, hairline-divided feature list.

```html
<!-- Standard tier -->
<div class="bg-white border border-[#E8E8E8] rounded-sm p-6">
  <p class="type-mono-label text-[#666666] mb-2">/0.1 · Starter</p>
  <p class="type-display-lg text-[#000000] mb-1">$9<span class="type-body-md">/month</span></p>
</div>

<!-- Featured tier (polarity-flipped) -->
<div class="bg-canvas-dark rounded-sm p-6">
  <p class="type-mono-label text-[#666666] mb-2">/0.2 · Pro <span>● Most Popular</span></p>
  <p class="type-display-lg text-white mb-1">$29<span class="type-body-md">/month</span></p>
</div>
```

### Nav

```
Sticky:           sticky top-0 z-50 border-b border-[#E8E8E8] backdrop-blur-sm
On dark hero:     bg-[#010125]/90 text-white
After scroll:     bg-white/90 text-[#000000]
```

Link labels: `type-mono-label` uppercase. CTA pill: ink on light, ghost-dark on dark. Gap between links: 32px.

### Hero band

```html
<section class="bg-canvas-dark py-20">
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div>
      <p class="type-mono-eyebrow text-[#666666] mb-4">/ AI-Powered EHS Intelligence</p>
      <h1 class="type-display-xxl text-white mb-6">From company name to expert proposal in minutes</h1>
      <p class="type-body-lg text-white/60 mb-8">Lead paragraph copy.</p>
      <div class="flex gap-3">
        <button class="type-mono-button bg-[#9259FD] text-white rounded-sm px-6 py-3">Start assessment</button>
        <button class="type-mono-button bg-[#CBF6F9] text-[#000000] rounded-sm px-6 py-3">Watch the announcement</button>
      </div>
    </div>
    <div>
      <!-- Brand gradient: #9259FD → #EF5CC1 → #FC4C02, blur 40px, mix-blend-mode screen -->
    </div>
  </div>
</section>
```

### Brand gradient (signature element)

Full-width strip or right-column mesh. Three-stop horizontal linear gradient:

```css
background: linear-gradient(90deg, #9259FD 0%, #EF5CC1 50%, #FC4C02 100%);
```

As mesh: three overlapping blurred radial gradients on `bg-[#010125]` canvas with `mix-blend-mode: screen`. Minimum rendered width 400px. Never used at icon scale, never as text-fill, never reordered.

### Footer wordmark banner

```html
<div class="border-t border-[#E8E8E8] overflow-hidden">
  <p style="font-family: var(--font-sans); font-size: clamp(4rem,12vw,10rem); font-weight:500; color:#E8E8E8; white-space:nowrap; line-height:1; padding:1rem 1.5rem;">
    sme24.ch
  </p>
</div>
```

Tinted to `#E8E8E8` — faint stencil sign-off. Never a heavy footer title.

---

## Layout

| Context | Container |
|---|---|
| Marketing bands | `max-w-[1280px] mx-auto px-6` |
| Page content / portal | `max-w-5xl mx-auto px-6` |
| Prose / narrow | `max-w-2xl mx-auto px-6` |

### Breakpoints

| Name | Width | Key changes |
|---|---|---|
| Mobile | < 479px | Hero stacks; nav collapses to hamburger; grids drop to 1-up |
| Mobile-Large | 479–767px | Same as Mobile; some tables enable horizontal scroll |
| Tablet | 768–991px | Article grid moves to 2-up; testimonial grid 3-up only if > 900px |
| Desktop | 992–1279px | Full 3-column research grid, 2-up article grid, hero 50/50 split |
| Desktop-Large | ≥ 1280px | Container caps at 1280px; bands stay edge-to-edge |

Grid patterns:
- Expert / feature cards: 3-up desktop → 2-up tablet → 1-up mobile
- Package / pricing cards: 3-up desktop → 1-up mobile
- Stats tiles: 3-up desktop → 1-up mobile
- Hero: 50/50 split desktop → stacked mobile (text above, gradient below)
- Pricing table: full-width, horizontal scroll on mobile

---

## Rules

### Do
- Use `type-mono-*` for **every** label: eyebrows, buttons, table headers, badge text, pricing tabs.
- Apply negative letter-spacing on every Urbanist headline.
- Alternate surfaces using only `bg-[#010125]` and `bg-white`.
- Use `radius-sm` (4px) for every card, button, badge, and input. `radius-xs` (3.25px) for outline buttons and pricing sub-tabs.
- Keep the brand gradient as a single hero-scale graphic only.
- Place `sme24.ch` wordmark at the bottom of every marketing page, tinted hairline.
- One primary CTA per viewport.

### Don't
- Don't set body copy in PP Neue Montreal Mono.
- Don't write a headline in uppercase — that's the mono face's role.
- Don't add drop shadows to light-surface cards. Hairlines + surface contrast are enough.
- Don't add a new accent color. Palette is: ink black, brand violet (primary), magenta, orange (tertiary) gradient, accent mint, violet tint, peach tint, hairline grey, semantic status.
- Don't use `font-bold` (700+) in Urbanist at display sizes.
- Don't center-align body under a left-aligned headline.
- Don't apply the gradient to text or use it as a button fill.
- Don't reorder gradient stops or crop to a single color.
- Don't use `radius-full` except on the single floating action orb.
