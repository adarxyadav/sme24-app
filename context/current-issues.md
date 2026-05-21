# Current Issues

## Marketing Page Alignment

Reference: homepage (`app/(marketing)/page.tsx`) + `context/ui-context.md`.

---

### 1. Primary CTA buttons use black instead of brand purple — all inner pages

`how-it-works`, `expert-network`, `packages` hero + final CTA buttons:

```
// wrong — black button
className="... rounded-md bg-foreground text-background hover:bg-foreground/90 px-6 py-3 ..."

// correct — purple button (matches homepage + ui-context)
className="... rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 ..."
```

Affects every "Start a benchmark" and "Apply to join" primary button across all 3 pages.

---

### 2. Outline buttons use wrong radius + padding — all inner pages

Same 3 pages, outline variant:

```
// wrong
rounded-md px-6 py-3

// correct (matches homepage + ui-context)
rounded-sm px-6 py-2.5
```

---

### 3. Hero CTA groups missing `w-full sm:w-auto` — all inner pages

Homepage buttons have `w-full sm:w-auto` so they stack full-width on mobile.
Inner page hero CTA groups omit this, breaking mobile layout.

Files: `how-it-works/page.tsx:86-97`, `expert-network/page.tsx:68-80`, `packages/page.tsx:115-128`.

---

### 4. Duplicate conflicting `max-w` classes — 3 sections

Tailwind applies the last class that wins, making `max-w-7xl` on the outer div redundant/misleading:

- `how-it-works` editorial section: `mx-auto max-w-7xl px-6 ... max-w-2xl` (line 127)
- `expert-network` apply CTA: `mx-auto max-w-7xl px-6 ... max-w-xl` (line 106)
- `packages` execution partner: `mx-auto max-w-7xl px-6 ... max-w-2xl` (line 187)

Fix: remove the outer `max-w-7xl` — the inner `max-w-{x}` is doing the work.

---

### 5. H1 font-weight inconsistency — inner pages vs homepage

- Homepage H1: `font-semibold`
- All inner page H1s: `font-bold`

Pick one and apply everywhere. `font-semibold` matches the homepage and the design system intent (less aggressive weight for large display type).

---

### 6. H1 missing `lg:` breakpoint — inner pages

Homepage: `text-4xl sm:text-5xl lg:text-6xl`
Inner pages: `text-5xl sm:text-6xl` — no `lg:` step.

Add `lg:text-6xl` (or equivalent) to match the responsive scale.

---

### 7. Contact page hero missing `<section>` wrapper

All other pages wrap their hero in `<section className="mx-auto max-w-7xl px-6 py-24 ...">`.
Contact uses a bare `<div className="flex flex-col gap-3 mb-16">` with the `py-24` on `<main>`.
Align to the section pattern used everywhere else.
