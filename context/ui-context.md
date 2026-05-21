# UI Context

## Theme

Light mode only. The design language is a minimal technical
workspace with near-white backgrounds, layered surfaces,
cool purple accents for primary actions, and restrained
state colors.

## Colors

Brand tokens are defined in `@theme` in `app/globals.css`.
shadcn utility names alias back to those tokens — no hex
anywhere in component code.

| Role           | Brand token         | Value      |
| -------------- | ------------------- | ---------- |
| Page bg        | `--color-bg`        | `#ffffff`  |
| Surface        | `--color-surface`   | `#f6f6f6`  |
| Primary text   | `--color-fg`        | `#0e0e0e`  |
| Muted text     | `--color-fg-muted`  | `#5a5a5a`  |
| Brand / CTA    | `--color-brand`     | `#9259fd`  |
| Brand hover    | `--color-brand-hover` | `#1733d6` |
| Highlight      | `--color-highlight` | `#ffb020`  |
| Success        | `--color-success`   | `#16a34a`  |
| Warning        | `--color-warning`   | `#f59e0b`  |
| Danger         | `--color-danger`    | `#dc2626`  |
| Border         | `--color-border`    | `#e4e4e7`  |

shadcn utility classes (`bg-background`, `text-foreground`,
`bg-primary`, `bg-muted`, `border-border`, etc.) all resolve
through aliases in `@theme` — use the utility classes in
components, not the brand token names directly.

## Typography

| Role      | Font           | CSS variable   |
| --------- | -------------- | -------------- |
| Body/UI   | Inter          | `--font-sans`  |
| Code/mono | JetBrains Mono | `--font-mono`  |

next/font injects `--font-inter` and `--font-jetbrains-mono` on `<html>`.
`@theme` maps `--font-sans → var(--font-inter)`, `--font-mono → var(--font-jetbrains-mono)`.

## Type Scale

Modular scale (1.25 ratio). Use `text-{size}` utilities.

| Utility    | Size       |
| ---------- | ---------- |
| `text-xs`  | 0.75rem    |
| `text-sm`  | 0.875rem   |
| `text-base`| 1rem       |
| `text-lg`  | 1.25rem    |
| `text-xl`  | 1.5rem     |
| `text-2xl` | 1.875rem   |
| `text-3xl` | 2.25rem    |
| `text-4xl` | 3rem       |

## Spacing

4px base (`--spacing: 4px`). Standard Tailwind spacing scale applies.

## Border Radius

| Context           | Token / Class  | Value   |
| ----------------- | -------------- | ------- |
| Inline / small UI | `rounded-sm`   | 4px     |
| Cards / panels    | `rounded-md`   | 8px     |
| Modals / overlays | `rounded-lg`   | 16px    |
| Pills             | `rounded-full` | 9999px  |

## Shadows

Use `shadow-sm`, `shadow-md`, `shadow-lg` from the theme tokens.

## Component Library

shadcn/ui on top of Tailwind CSS v4. Generated primitives
live in `components/ui/`. Add new primitives with the
shadcn CLI. These generated components are intended to be
customized — edit them as needed. Warning: re-running the
shadcn CLI can overwrite local changes.

## Layout Patterns

- Page shell: `bg-background text-foreground`.
- Panels / cards: `bg-card border border-border text-card-foreground rounded-md`.
- Modals: Dialog primitive with surface tokens, `rounded-lg`.
- Max-width containers:
  - Nav / Footer: `max-w-7xl mx-auto px-6`
  - Page content: `max-w-5xl mx-auto px-6`
  - Prose / narrow: `max-w-2xl mx-auto px-6`
- Section vertical rhythm: `py-16 sm:py-24`
- Eyebrow label: `text-xs uppercase tracking-widest text-muted-foreground`

## Button Patterns

Two canonical variants — inline-flex, `rounded-sm`, `transition-colors`:

| Variant  | Classes                                                                 |
| -------- | ----------------------------------------------------------------------- |
| Primary  | `bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm font-medium` |
| Outline  | `border border-border bg-transparent hover:bg-accent px-6 py-2.5 text-sm font-medium` |

CTA group: `flex flex-col sm:flex-row gap-3` with `w-full sm:w-auto` on each button.

## Nav Pattern

Sticky header: `sticky top-0 z-50 border-b border-border bg-background backdrop-blur-sm`.
Inner: `h-16 flex items-center justify-between max-w-7xl mx-auto px-6`.
Active link: `text-foreground font-medium`; inactive: `text-muted-foreground hover:text-foreground`.
Mobile: hamburger toggle (`<Menu>` / `<X>` lucide), slide-down panel with `max-h` + `opacity` transition.

## Footer Pattern

`border-t border-border` + inner `py-16`.
Layout: brand blurb left, link columns right (`flex flex-col sm:flex-row gap-8 sm:gap-16`).
Section headers: `text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4`.
Copyright bar: second `border-t`, `py-4`, `flex justify-between text-sm text-muted-foreground`.

## Icons

Lucide React. Stroke-based only. Default size `size-4` for inline controls.
