# SME24 Design System

AI-powered EHS consulting marketplace. Technical, intelligence-platform aesthetic.

---

## Governing Principles

**Two-face typography.** Inter (display) for all narrative; JetBrains Mono (uppercase) for all labels, buttons, eyebrows. The contrast is the brand voice — an EHS intelligence platform that is technically precise and narratively confident.

**Surface rhythm, not shadow.** Dark hero band → white content → optional dark feature band → white footer. Surface alternation carries depth; hairline borders carry card elevation. No floating card shadows.

**One signature element.** A three-stop brand gradient (`#4f46e5` → `#7c3aed` → `#06b6d4`) is the entire decorative system — used at hero scale as a flowing mesh graphic representing the pipeline from raw risk data to clear intelligence. Never miniaturised; never reordered.

**One primary CTA.** A near-black pill (`#0e0e0e`) carries every conversion target on light surfaces. One primary per viewport.

---

## Colors

### Tokens

| Role | CSS Variable | Value |
|---|---|---|
| Default page bg | `--color-canvas` | `#ffffff` |
| Hero / dark band bg | `--color-canvas-dark` | `#010120` |
| Card bg on dark band | `--color-surface-dark-soft` | `#1c1c38` |
| Dividers / badges on dark | `--color-hairline-dark` | `#2a2a4a` |
| Borders / table header bg / wordmark tint | `--color-hairline` | `#e8e8e8` |
| Primary text (light) | `--color-ink` | `#000000` |
| Secondary text (light) | `--color-body` | `#999999` |
| All text on dark | `--color-on-dark` | `#ffffff` |
| Primary CTA fill | `--color-primary` | `#0e0e0e` |
| Primary CTA text | `--color-on-primary` | `#ffffff` |
| Gradient stop 1 — indigo | `--color-brand-indigo` | `#4f46e5` |
| Gradient stop 2 — violet | `--color-brand-violet` | `#7c3aed` |
| Gradient stop 3 — cyan | `--color-brand-cyan` | `#06b6d4` |
| Secondary hero CTA / stat tiles | `--color-accent-sage` | `#bbf7d0` |
| Success | `--color-success` | `#16a34a` |
| Warning | `--color-warning` | `#f59e0b` |
| Danger | `--color-danger` | `#dc2626` |

### Brand Gradient

```css
background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #06b6d4 100%);
```

Three stops, fixed order. Represents the EHS intelligence pipeline: structured data (indigo) → AI analysis (violet) → clear insight (cyan). Used only at hero scale (≥ 400 px wide) as the flowing mesh SVG in the hero right column. Never as a text fill, button fill, badge, or icon.

### CTA Convention

| Context | Button style |
|---|---|
| Light surfaces (most pages) | `bg-[#0e0e0e] text-white` — near-black pill |
| Secondary on dark hero band | `bg-[#bbf7d0] text-[#000000]` — sage accent pill |
| Ghost on dark band | `bg-[#1c1c38] text-white border border-[#2a2a4a]` |
| Outline (forms, secondary actions) | `bg-transparent border border-[#e8e8e8] text-[#000000]` |

One primary CTA per viewport.

---

## Typography

### Faces

| Role | Face | Variable |
|---|---|---|
| Display / body / narrative | Inter | `--font-sans` |
| Labels / eyebrows / buttons | JetBrains Mono (uppercase) | `--font-mono` |

Inter is the open-source substitute for proprietary geometric display sans. Enable `font-feature-settings: "ss01"` at display sizes. Weight 400 and 500 only — never bold (700+) at display sizes.

JetBrains Mono at weight 500, always uppercase, positive letter-spacing. 10–16 px only. Never used for body paragraphs.

### Display Scale (Inter, weight 500, sentence-case)

| Utility class | Size | Line-height | Letter-spacing | Use |
|---|---|---|---|---|
| `type-display-xxl` | 64px (4rem) | 1.1 | −0.03em | Single hero headline per page |
| `type-display-xl` | 40px (2.5rem) | 1.2 | −0.02em | Section headlines |
| `type-display-lg` | 28px (1.75rem) | 1.15 | −0.015em | Sub-section headlines, stat numbers |
| `type-display-md` | 22px (1.375rem) | 1.15 | −0.01em | Card titles, feature headings |
| `type-body-lg` | 18px (1.125rem) | 1.3 | −0.01em | Lead paragraphs under section headlines |
| `type-body-md` | 16px (1rem) | 1.5 | −0.01em | Default body |
| `type-caption` | 14px (0.875rem) | 1.4 | 0 | Fine print, secondary captions |

### Mono-Caps Scale (JetBrains Mono, weight 500, uppercase)

| Utility class | Size | Line-height | Letter-spacing | Use |
|---|---|---|---|---|
| `type-mono-button` | 16px (1rem) | 1 | 0.005em | All button labels |
| `type-mono-eyebrow` | 11px (0.6875rem) | 1 | 0.05em | Section eyebrows, table header cells |
| `type-mono-label` | 11px (0.6875rem) | 1.4 | 0.055em | Badge text, tag pills, pricing labels |
| `type-mono-caption` | 10px (0.625rem) | 1.4 | 0.05em | Mono fine print |

### Rules

- **Headlines stay sentence-case.** "From company name to benchmarked proposal" — not "FROM COMPANY NAME…".
- **Mono is labels only.** No paragraph ever runs in JetBrains Mono.
- **Negative letter-spacing on Inter only.** Mono uses small positive tracking.
- **Weight 500 is the ceiling for Inter.** Never `font-bold` at display sizes.
- **Keep alignment consistent within a copy stack.** Left-aligned headline → left-aligned body.

---

## Surface Rhythm

Every page cycles through exactly two surfaces. Surface contrast does the separation; never add mid-band horizontal rules.

```
┌─────────────────────────────────────────┐
│  DARK BAND   bg-[#010120]               │  ← hero
├─────────────────────────────────────────┤
│  LIGHT BAND  bg-white                   │  ← product, pricing, experts
├─────────────────────────────────────────┤
│  DARK BAND   bg-[#010120]  (optional)   │  ← AI credibility, stats band
├─────────────────────────────────────────┤
│  LIGHT BAND  bg-white                   │  ← footer
│  + sme24.ch wordmark banner (hairline)  │
└─────────────────────────────────────────┘
```

Section padding: `py-20 sm:py-24` for all bands. Container: `max-w-7xl mx-auto px-6`.
Inside a band: headline-to-lead gap `gap-4` (16 px); headline-to-card-grid gap `gap-12` (48 px).

---

## Spacing

4 px base. Working tokens:

| Tailwind | px | Use |
|---|---|---|
| `2` | 8 | Icon gap, chip group gap |
| `3` | 12 | Nav link gap, badge padding-x |
| `4` | 16 | Headline-to-body gap, button padding-y |
| `6` | 24 | Card inner padding |
| `8` | 32 | Stat card padding, grid column gap |
| `12` | 48 | Headline-to-grid gap within a band |
| `20` | 80 | Section vertical padding |

---

## Elevation

No floating shadows on cards. Surface contrast + hairline borders are the only elevation system.

| Level | Treatment |
|---|---|
| Cards on light | `border border-[#e8e8e8] bg-white rounded-sm` |
| Cards on dark | `border border-[#2a2a4a] bg-[#1c1c38] rounded-sm` |
| Table header row | `bg-[#e8e8e8]` (hairline fill) |
| Modal | `bg-white rounded-md shadow-lg` — the only shadow |
| Tooltip / floating | `bg-[#0e0e0e] text-white rounded-sm shadow-md` |
| Floating orb (chat, back-to-top) | `bg-[#0e0e0e] text-white rounded-full shadow-md` |

### Border Radius

| Token | Value | Use |
|---|---|---|
| `rounded-none` | 0 | Full-bleed bands, wordmark banner |
| `rounded-sm` | 4px | Canonical — buttons, cards, badges, inputs, data rows |
| `rounded-md` | 8px | Feature-tab pills, larger containers |
| `rounded-full` | 9999px | Floating action orb only |

`rounded-sm` (4px) is the default for every interactive element. `rounded-full` is reserved for the single floating orb.

---

## Components

### Button

All buttons use `type-mono-button` (JetBrains Mono, 16px, 500, uppercase, 0.005em tracking).
Shape: `rounded-sm` (4px). No shadow.

```
Primary (light surface):     bg-[#0e0e0e] text-white px-6 py-2 rounded-sm
Secondary sage (hero):       bg-[#bbf7d0] text-[#000000] px-6 py-2 rounded-sm
Ghost dark (on dark band):   bg-[#1c1c38] text-white border border-[#2a2a4a] px-6 py-2 rounded-sm
Outline:                     border border-[#e8e8e8] bg-transparent text-[#000000] px-6 py-2 rounded-sm
```

CTA group: `flex flex-col sm:flex-row gap-3`. One primary per viewport.

### Eyebrow

Every section gets a mono-caps eyebrow above the headline:

```html
<!-- On light band -->
<p class="type-mono-eyebrow text-[#999999] mb-3">AI Research Pipeline</p>
<h2 class="type-display-xl text-[#000000]">From company name to benchmarked proposal</h2>

<!-- On dark band -->
<p class="type-mono-eyebrow text-[#7c3aed] mb-3">EHS Intelligence</p>
<h2 class="type-display-xl text-white">Grounded in verified industry data</h2>
```

On dark bands, eyebrow color is `text-[#7c3aed]` (brand violet as the label accent on dark).

### Card (light surface)

```html
<div class="bg-white border border-[#e8e8e8] rounded-sm p-6">
  <p class="type-mono-label text-[#999999] mb-3">EHS Snapshot</p>
  <h3 class="type-display-md text-[#000000] mb-2">Card title</h3>
  <p class="type-body-md text-[#999999]">Body copy.</p>
</div>
```

### Card (dark surface)

```html
<div class="bg-[#1c1c38] border border-[#2a2a4a] rounded-sm p-6">
  <p class="type-mono-label text-[#7c3aed] mb-3">ISO 45001</p>
  <h3 class="type-display-md text-white mb-2">Card title</h3>
  <p class="type-body-md text-white/60">Body copy.</p>
</div>
```

### Stat tile (accent sage)

```html
<div class="bg-[#bbf7d0] rounded-sm p-8">
  <p class="type-display-lg text-[#000000] mb-1">94%</p>
  <p class="type-mono-eyebrow text-[#000000]/60">Proposal acceptance rate</p>
</div>
```

### Badge

```
Light surface: bg-[#e8e8e8] text-[#000000] border border-[#e8e8e8] rounded-sm px-2 py-0.5 type-mono-label
Dark surface:  bg-[#2a2a4a] text-white rounded-sm px-2 py-0.5 type-mono-label
Brand accent:  bg-[#7c3aed]/10 text-[#7c3aed] border border-[#7c3aed]/20 rounded-sm px-2 py-0.5 type-mono-label
```

### Table header

```html
<th class="type-mono-eyebrow text-[#999999] bg-[#e8e8e8] px-4 py-3 text-left">
  KPI INDICATOR
</th>
```

### Nav

```
Sticky: sticky top-0 z-50 border-b border-[#e8e8e8] backdrop-blur-sm
On dark hero:  bg-[#010120]/90  text-white
After scroll:  bg-white/90      text-[#000000]
```

Link labels: `type-mono-button` (but lowercase is acceptable for nav — match product convention). CTA pill: near-black on light, ghost-dark on dark. Gap between siblings: `gap-8`.

### Hero band

```html
<section class="bg-[#010120] py-20 sm:py-24">
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div>
      <p class="type-mono-eyebrow text-[#7c3aed] mb-4">AI-Powered EHS Intelligence</p>
      <h1 class="type-display-xxl text-white mb-6">
        From company name to expert proposal in minutes
      </h1>
      <p class="type-body-lg text-white/60 mb-8">Lead paragraph copy here.</p>
      <div class="flex flex-col sm:flex-row gap-3">
        <button class="type-mono-button bg-[#bbf7d0] text-[#000000] rounded-sm px-6 py-3">
          Start your assessment
        </button>
        <button class="type-mono-button bg-[#1c1c38] text-white border border-[#2a2a4a] rounded-sm px-6 py-3">
          Explore packages
        </button>
      </div>
    </div>
    <div class="relative">
      <!-- Brand gradient mesh SVG: #4f46e5 → #7c3aed → #06b6d4 flowing organic shapes -->
    </div>
  </div>
</section>
```

### Brand gradient mesh (signature element)

SVG in the hero right column. Three organic overlapping ellipses:
- Ellipse A: `fill: #4f46e5`, `opacity: 0.7`, blurred
- Ellipse B: `fill: #7c3aed`, `opacity: 0.6`, offset and blurred
- Ellipse C: `fill: #06b6d4`, `opacity: 0.5`, offset and blurred

Rendered with `filter: blur(40px)` and `mix-blend-mode: screen` on dark canvas.
Size: fills the right grid column, ~500 × 500 px on desktop. `width: 100%` for fluid scaling.
Never used at < 200 px. Never used as a button fill, text gradient, or badge.

### Footer wordmark banner

At the bottom of every marketing page, before the copyright bar:

```html
<div class="border-t border-[#e8e8e8] overflow-hidden">
  <p class="type-display-xxl text-[#e8e8e8] whitespace-nowrap text-[clamp(4rem,12vw,10rem)] leading-none py-4 px-6">
    sme24.ch
  </p>
</div>
```

Tinted to `text-[#e8e8e8]` (hairline color) so it reads as a faint stencil. Never a heavy footer title.

---

## Layout

| Context | Container |
|---|---|
| Marketing bands | `max-w-7xl mx-auto px-6` |
| Page content / portal | `max-w-5xl mx-auto px-6` |
| Prose / narrow | `max-w-2xl mx-auto px-6` |

Grid patterns:
- Expert cards: 3-up desktop → 2-up tablet → 1-up mobile
- Package cards: 3-up desktop → 1-up mobile
- Stats tiles: 3-up desktop → 1-up mobile
- Hero: 50/50 split desktop → stacked mobile (text above, graphic below)
- Pricing table: full-width, horizontal scroll on mobile

---

## Rules

### Do
- Use `type-mono-*` for **every** label: eyebrows, buttons, table headers, badge text, pricing tab labels.
- Apply negative letter-spacing on every Inter headline.
- Alternate surfaces using only `bg-[#010120]` and `bg-white`. No in-between greys for band backgrounds.
- Use `rounded-sm` (4px) for every card, button, badge, and input.
- Keep the brand gradient as a single hero-scale graphic only.
- Put `sme24.ch` wordmark at the bottom of every marketing page, tinted hairline.
- One primary CTA per viewport.

### Don't
- Don't set a paragraph or body copy in JetBrains Mono.
- Don't write a headline in uppercase — that role belongs to the mono face.
- Don't add drop shadows to light-surface cards. Hairline borders + surface contrast are enough.
- Don't add a new accent color. The palette is: near-black CTA, brand indigo/violet/cyan gradient, accent sage, hairline grey, semantic status. That's it.
- Don't use `font-bold` (700+) in Inter at display sizes. Weight 500 is the ceiling.
- Don't center-align body paragraphs under a left-aligned display headline.
- Don't apply the gradient to text or use it as a button fill.
- Don't reorder gradient stops or crop to a single color.
- Don't use `rounded-full` except on the single floating action orb.
