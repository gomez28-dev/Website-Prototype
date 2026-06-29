# DOYEN Website — Agent Execution Plan (v2)

Supersedes `Plan.txt`. Verified directly against `gomez28-dev/Website-Prototype@main` (not just the
live Netlify build) on 2026-06-29. Every file path, line reference, and class name below was read from
the actual source, not inferred.

**Two decisions need your sign-off before any agent starts** — flagged inline as 🔴. Everything else is
ready to hand off as-is.

Four workstreams, reorganized from the original five because two of them edit the same file and state
logic and will conflict if run as separate parallel agent sessions:

| Workstream | Files | Can run in parallel with others? |
|---|---|---|
| A — Contact form hardening | `ContactForm.tsx`, `ApplyForm.astro`, `base.css` | Run alone, one session, sequential tasks |
| B — Homepage division grid | `index.astro` | Yes — pending 🔴 decision below |
| C — Nav consolidation | `Header.astro`, `MobileNav.astro`, new `data/nav.ts` | Yes |
| D — Catalog subcomponent extraction | `ProductCatalog.tsx` + new files in `components/catalog/` | Yes |

---

## Workstream A — Contact Form Hardening
*(merges the original "Task 1: phone/country" plan and the "Task 5: alerts→inline" plan — both rewrite
the same state in `ContactForm.tsx` and must be done together, in one session, not as two parallel
agent branches.)*

**File:** `src/components/contact/ContactForm.tsx` (313 lines)

### A1. Simplify the PhoneInput prop combination
Current code (lines 217–231):
```tsx
<PhoneInput
  international
  country={selectedCountry?.code as CountryCode | undefined}
  defaultCountry="PH"
  ...
  disabled={!selectedCountry}
```
**Correction to the original framing:** this is *not* causing a visible defect today. `country` and
`defaultCountry` are independently-documented props in `react-phone-number-input`, and `country` always
takes precedence once it's set. `defaultCountry`'s only window of relevance is before the user picks a
country — and the field is `disabled` at that exact moment, so nothing renders incorrectly.

Fix it anyway, for the right reason: relying on undocumented-for-this-combo precedence is fragile across
library version bumps, and it's confusing for the next person reading the file. **Remove `defaultCountry`
entirely.** `country` is already the single source of truth; there's nothing else to do here.

### A2. Consolidate `handleCountryChange`
Lines 61–69 call `setFormData` twice with functional updaters. This is *not* a stale-state bug — React 18
batches both calls correctly — it's just redundant. Merge into one call:
```tsx
const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const code = e.target.value;
  const country = countries.find((c) => c.code === code) || null;
  setSelectedCountry(country);
  setFormData((prev) => ({ ...prev, country: country?.name || '', phone: '' }));
  setPhoneError('');
};
```

### A3. Fix the Regarding field's grid placement (this one is a real bug)
Lines 150–165: the `.regarding-group` block is a **sibling before** `<div className="form-grid">`, not
inside it. Confirmed in `contact.astro`: `.form-full { grid-column: 1 / -1; }` only has meaning inside a
grid container — outside `.form-grid` it's a no-op, and `.regarding-group`'s own `margin-bottom: 2rem`
(hardcoded, not tied to the grid's `gap`) is doing the spacing job by coincidence. Move the conditional
block to be the **first child inside** `.form-grid`, keep the `form-full` class so it spans both columns
for real, and you can drop its standalone `margin-bottom` override since the grid `gap` will handle it.

### A4. EmailJS payload + key centralization
Confirmed: `templateParams` (lines 115–121) sends `name`, `phone`, `email`, `country`, `message` — already
correct, and `regarding` is already folded into `message` rather than sent as a separate unbound variable
(line 120). **No change needed here** — the original plan's Task 3 concern doesn't apply to the current
code; it's already doing the right thing.

What *is* real: `EMAILJS_PUBLIC_KEY` (`'eKyGjQqzlwi8gVTW7'`) and `EMAILJS_SERVICE_ID` (`'service_5wed65w'`)
are hardcoded identically in `ContactForm.tsx` (lines 10–11) **and** `ApplyForm.astro` (lines 243–244).
Template IDs differ per form (`template_pgb7kdg` vs `template_apply`) and should stay separate. Centralize
just the key + service ID:
- Add `PUBLIC_EMAILJS_PUBLIC_KEY` and `PUBLIC_EMAILJS_SERVICE_ID` to a new `.env` (and `.env.example` with
  placeholder values, committed) — Astro requires the `PUBLIC_` prefix for client-exposed vars.
- Reference via `import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY` in both files.
- Note: these are EmailJS *public* keys by design (client-side, rate-limited service-side) — this is a
  DRY/maintainability fix, not a security fix. Don't frame it as one when verifying.

### A5. Replace `alert()` with inline state
Confirmed 5 call sites: lines 98, 103, 108 (validation), 127 (success), 142 (error).
- Add `status: 'idle' | 'loading' | 'success' | 'error'` state.
- Success banner replaces line 127's alert; keep the existing form-reset behavior that follows it.
- Error banner replaces line 142's alert; surface `sales.marketing@doyenph.com` in the banner text (already
  in the original alert copy — carry it over).
- Lines 103/108 (missing phone / invalid phone) → reuse the existing `phoneError` state and `.phone-hint
  .phone-error` styling pattern that's already built for `handlePhoneBlur`. No new CSS needed.
- Line 98 (missing country): worth knowing before you "fix" it — the country `<select>` already has
  `required` (line 197), and native HTML5 constraint validation runs *before* the submit event fires, so
  this branch is very likely unreachable in any browser with JS enabled normally. Keep it as a defensive
  fallback (convert to the same inline-banner pattern, don't delete the check), but don't spend effort
  treating it as a primary UX path — it isn't one.
- Keep the existing loading overlay (lines 305–310) as the in-progress indicator, per the original plan.

### A6. Consolidate overlay CSS
Confirmed identical `.sending-overlay` / `.sending-spinner` / `@keyframes spin` rules in `contact.astro`
(lines 393–417, inside `:global()`) and `ApplyForm.astro` (lines 200–224, scoped `<style>`).
**Destination, confirmed by reading the file headers:** `src/styles/base.css` — this is already the
project's home for shared cross-page component CSS (`.btn`, `.cta-mock`, `.section-title`, `.n-banner`
all live there), while `global.css` is tokens/resets only. `base.css` is already imported once in
`BaseLayout.astro`, which both `contact.astro` and the careers pages use — **no new import statements
needed in either file.** Just delete the duplicate block from both and add it once to `base.css`.

### Definition of done — Workstream A
- `npm run build` and `npx astro check` pass with no new errors.
- Manually verify all three phone-hint states (no country selected / valid country selected / invalid
  number entered) still render correctly.
- Manually verify `/contact?product=X&brand=Y&category=Z` renders the Regarding field spanning the full
  width of the form, not just the left column.
- Do not trigger a real EmailJS send in testing (it actually emails the inbox) — verify the `templateParams`
  shape by inspection/logging instead.

---

## Workstream B — Homepage Division Grid

**File:** `src/pages/index.astro`

Confirmed structure (lines 40–71): `<table class="products-table">` with exactly 2 `<td>` cells
(Automotive Products / Equipment & Vehicles), each wrapping `.product-cell-inner` > `<img>` +
`.product-cell-label` (`.product-cell-sub` + `<strong>`). Both currently link to plain `/products` — no
query params at all today. Mobile override at lines 234–240 forces `display: block` on the table at
768px — this is the exact override the original plan meant.

### 🔴 Decision needed: the new taxonomy has nowhere to plug into yet
I checked: the existing "Automotive Products" / "Equipment & Vehicles" split isn't in any shared config —
it's hardcoded as raw `<optgroup>` JSX inside `ProductCatalog.tsx` (lines 594–604, the same file
Workstream D rewrites), and the underlying category data (`src/data/products.ts`) only has 7 flat keys:
`tires`, `battery`, `fuel`, `fuel_storage_tank`, `fuel_dispenser`, `lpg`, `sinotruk`. There is no
`category=energy` or `category=logistics` value anywhere — linking a card to one would silently do
nothing on the products page.

**Default I'd recommend (low scope, no broken links):** link all three new cards to plain `/products`
(unfiltered) — exactly what the current two cards already do. This is honest about the fact that "Energy"
and "Logistics" each span multiple existing categories, and doesn't invent a query param the filter
doesn't understand.

**The alternative (correct long-term, bigger scope):** add real division-level filtering to
`ProductCatalog.tsx` so `?division=energy` pre-filters to `fuel` + `fuel_storage_tank` + `fuel_dispenser`
+ `lpg`. This pulls Workstream D's file into Workstream B's scope — fine if you want it, but it should be
a deliberate call, not something an agent invents mid-task. **Tell me (or the agent) which one you want
before this workstream starts.** I've written the task below assuming the simple default.

**Smaller naming flag:** "Logistics" implies you provide logistics/freight services; you sell Sinotruk
trucks. "Fleet & Equipment" or "Vehicles" tracks the actual product more accurately. Your call — not
blocking, just worth a gut-check with whoever owns positioning.

### B1. Replace the table with a 3-column grid
- Replace `<table class="products-table">` with a `<div>` grid container:
  `display: grid; grid-template-columns: repeat(3, 1fr); gap: <match existing visual rhythm>;`
  collapsing to 1 column at the same `768px` breakpoint the table override currently uses.
- Each division reuses `.product-cell-inner` / `.product-cell-label` / `.product-cell-sub` unchanged —
  confirmed these classes are not table-specific (no `td`-scoped selectors reference them), so the visual
  pattern and hover behavior carry over with zero changes to those rules.
- Remove `.products-table`, `.products-table td`, and the `display: block` table override at lines
  234–240. Add the new grid rules in their place.

### B2. Division imagery and copy — concrete filenames, not placeholders
All three already exist in `public/assets/images/` — no new assets needed:
- **Automotive** → `Automotive Products.webp` (already in use, unchanged) — sub-label "Tires & Battery"
- **Energy** → `BIG TANKER.webp` (fuel-tanker imagery reads as "energy distribution" more broadly than a
  single LPG cylinder shot) — alternate: `lpg.webp` if you want the LPG-specific look — sub-label "Fuel, Tanks & LPG"
- **Logistics** → `Equipment & Vehicles.webp` (literally the asset already used for this division today,
  zero new asset needed) — alternate: `SINOTRUK BANNER.webp` for a fresher truck-focused crop — sub-label "Sinotruk Trucks"
- `loading="lazy"` and descriptive alt text on all three, matching the existing pattern at lines 47/60.

### Definition of done — Workstream B
- Grid renders 3 columns ≥768px, 1 column below it, with no leftover table CSS.
- `.about-section` and `.cta-mock` (separate sibling `<section>` blocks, confirmed no shared classes with
  the featured-products section) — quick visual check only, low risk of regression.
- All three links resolve to a real, non-empty `/products` view (no broken `?category=` params).

---

## Workstream C — Nav Consolidation

**Files:** `src/components/layout/Header.astro`, `src/components/layout/MobileNav.astro`, new
`src/data/nav.ts`

Confirmed: both files render an identical 6-item About Us dropdown (`#who-we-are`, `#our-journey`,
`#our-story`, `#mission-vision`, `#why-partner`, `#our-facilities`) and a near-identical full nav `<li>`
list, differing only in id prefix (`nav-` vs `mnav-`) and dropdown markup (CSS `:hover` panel vs JS
accordion + chevron).

**New finding while reading the code:** `Header.astro`'s `isActive()` (line 12–15) checks
`pathname === '/' || pathname === ''` for the home link; `MobileNav.astro`'s version (line 12–15) only
checks `pathname === '/'`. Small, but when you consolidate into one shared function you'll have to pick
one — recommend keeping the more defensive Header.astro version (handles an edge case where
`Astro.url.pathname` could resolve to an empty string) in both.

### 🔴 Decision needed: which About Us items to keep
"A concise, high-value subset" isn't something an agent can decide — it's a content call. From what I can
see on the live `/about` page, **"Our Journey" renders as just a heading with prev/next arrows and no
static content** (likely a JS-driven carousel with no fallback), making it the thinnest section.

**My suggested default — confirm or override before handing off:** keep *Who We Are*, *Our Story*,
*Mission & Vision*, *Why Partner With Us*; drop *Our Journey* and *Our Facilities* from the nav (the page
sections themselves can stay on `/about`, just not in the dropdown). That's 4 items instead of 6. If you'd
rather keep Our Facilities and cut something else, just tell me — I don't have visibility into which
sections leadership actually wants surfaced.

### C1. Trim the dropdown
Apply the confirmed 4-item (or your override) list identically in both files.

### C2. Extract to a shared source
New file `src/data/nav.ts`, matching the existing convention in `src/data/` (`countries.ts`, `products.ts`,
`jobs.ts` already live there):
```ts
export interface NavChild { label: string; href: string; }
export interface NavItem { label: string; href: string; children?: NavChild[]; }
export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about', children: [
    { label: 'Who We Are', href: '/about#who-we-are' },
    { label: 'Our Story', href: '/about#our-story' },
    { label: 'Mission & Vision', href: '/about#mission-vision' },
    { label: 'Why Partner With Us', href: '/about#why-partner' },
  ]},
  { label: 'Products', href: '/products' },
  { label: 'Events', href: '/news' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
];
```
Update both `.astro` files to `.map()` over `navItems` instead of hardcoding the `<li>` list. Keep the
`id="nav-..."` / `id="mnav-..."` prefixing logic (derive from a slugified label, or keep an explicit `id`
field on each item if that's simpler).

### C3. Don't touch the interaction models
Confirmed: desktop dropdown is pure CSS `:hover` (Header.astro, no JS); mobile accordion is JS-driven
(`.dropdown-toggle` click handlers in MobileNav.astro, lines 219–227). Consolidating the *data* must not
change either mechanism.

### Definition of done — Workstream C
- Desktop hover dropdown and mobile accordion both still work after the refactor.
- `isActive()` highlighting verified on at least `/`, `/about`, `/products` in both desktop and mobile.
- Scroll hide/show (Header.astro lines 249–264) unaffected — it doesn't touch nav content, low risk, but confirm visually.

---

## Workstream D — ProductCatalog Subcomponent Extraction

**File:** `src/components/catalog/ProductCatalog.tsx` (756 lines) — the original plan's most accurate
section. Confirmed counts below; no changes to scope, just precise references for whoever implements it.

### D1. Extract the card pattern
Confirmed 3 occurrences of `ix-card` / `ix-card-image` / `ix-card-info` / `ix-card-title` /
`ix-card-actions`: brand card (~line 623), category product card (~line 677–689), search-result card
(~line 728–737). The three call sites differ only in inline overrides — concrete prop names to use for
the extracted component, taken directly from what varies today:
- `titleSize` (1.6rem on the category card vs default elsewhere)
- `titleAlign` (`'left'` on the search-result card vs default centered)
- `actionsAlign` (`flex-start` on the search-result card)
- `actionsMarginTop` (both non-brand cards override this)

### D2. Extract scaffolding and empty state
Confirmed: `section-wrapper` + `section-nav` appears 3× (lines 612, 653, 708); `empty-state` appears 2×
(lines 669, 721). Extract each into its own subcomponent as planned.

### D3. Normalize detail rows and related cards
Confirmed: `meta-item` appears 5× (lines 431, 438, 445, 452, 458) in the product detail view;
`related-card` template at line 516. Confirmed 17 separate `style={{...}}` inline usages across the file —
move all of them into the existing catalog/global stylesheet as part of this extraction, per the original
plan's "no inline styles remain" constraint.

### Definition of done — Workstream D
- Visual diff of all three card contexts (brand grid, category grid, search results) shows no layout change.
- `grep -c "style={{" ProductCatalog.tsx` returns 0 after the refactor.
- All existing interactivity (search, category select, brand drill-down, back navigation) still works.

---

## Notes for running this across Antigravity / OpenCode

- **A is sequential, its own session/branch.** B, C, D touch disjoint files and are safe to run as
  separate parallel sessions/branches, merged independently.
- This repo already has an `AGENTS.md` — it's currently just generic Astro dev-server instructions with
  no project-specific guardrails. Worth adding 2–3 lines before you kick off multiple agent sessions:
  - "Run `npm run build` and `npx astro check` before considering any task complete."
  - "Do not run EmailJS `.send()` during automated testing — it sends a real email."
  - "`ContactForm.tsx` changes should happen in one session, not split across parallel agent runs."
- Resolve the two 🔴 decisions (homepage deep-link approach, About Us trim list) before starting B and C —
  they're the only two places left where an agent would otherwise have to guess.
