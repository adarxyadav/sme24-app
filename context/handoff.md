# Homepage Design Handoff — Round 2

## The problem in one line
The homepage reads like a design system demo or pitch deck, not a minimal brand website. Every section follows the same template and the brand color is everywhere.

---

## Specific issues

### 1. `/` eyebrow overuse
Every single section starts with `/ Eyebrow`, `/ The problem`, `/ How it works`, `/ Industries`, `/ Expert network`, `/ Packages`. This pattern was meant to be a subtle brand accent — used on every section it becomes visual noise.

**Fix:** Reserve `/ eyebrow` for the hero and max 1–2 other landmark sections. Remaining sections: drop the eyebrow entirely or replace with a plain small label. The heading should carry the section.

---

### 2. Weak visual hierarchy
Every section has the same structure: eyebrow → h2 → body text → content → CTA link. Nothing stands out as primary. The eye has no anchor point.

**Fix:**
- Hero should feel noticeably larger/bolder than everything below
- Some sections can open with just an h2 and content — no eyebrow, no preamble
- Stats tiles or a single bold statement can replace a full section header
- Not every section needs a "See all →" CTA link at the bottom

---

### 3. Brand violet overused
Current violet usage: step number eyebrows, bullet dots in How It Works cards, avatar circles, avatar initials, expert badges, package comparison checkmarks, all CTA buttons, all hover states, the SME24 eyebrow label in the problem section. It's everywhere.

**Fix:** Violet = primary action + one key accent per section max.
- Step numbers: use muted `text-[#959494]` not violet
- Bullet dots in cards: use `bg-[#000000]` or `bg-[#959494]`
- Avatar circles: keep `bg-[#E8DDFF]` but initials in `text-[#000000]` not violet
- Expert badge: keep violet (it's a single accent per card — fine)
- How It Works outcome card `bg-[#E8DDFF]`: fine as a single highlight
- CTA buttons: keep violet — that's its job

---

### 4. No visual rhythm between sections
Every section is `bg-white py-20 border-t border-[#E8E8E8]`. Back-to-back sections with the same background and a hairline border create no real break — the page feels like one long undifferentiated column.

**Fix:** Introduce deliberate rhythm:
- Use `bg-[#F8F8F8]` (off-white) on alternating sections so the eye registers a break without going dark
- Or give one mid-page section noticeably more vertical padding (`py-32`) to signal importance
- The CTA band gradient at the bottom already does this correctly — apply the same thinking mid-page

---

### 5. Presentation / template feel
The `/ eyebrow` + `type-display-xl heading` + `type-body-lg text-[#959494] max-w-2xl` intro block is copy-pasted into every section. This is the exact structure of a slide deck.

**Fix:**
- Remove the intro block from sections where the content is self-explanatory (Industries, Expert Preview)
- Let some sections start directly with content (grid, cards) — the section type is obvious
- The How It Works teaser: the 4 cards explain themselves, no need for a `/ How it works` + h2 header if you're linking to the full page anyway. The header can be much shorter.

---

## Priority order for fixes
1. Strip `/ eyebrow` from all mid-page sections (keep: hero only)
2. Reduce violet to CTAs + 1 accent per section
3. Add bg variation (`#F8F8F8`) on 2–3 sections to create rhythm
4. Remove redundant intro blocks where content is self-evident
5. Make hero noticeably more dominant (larger h1, more padding)
