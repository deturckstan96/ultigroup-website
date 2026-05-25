# Handoff: ULTI GROUP Website Redesign

## TL;DR for Claude Code

Recreate the 3 HTML pages in `reference/` as Next.js 14 App Router pages using Tailwind CSS. The HTML files are **design references** — not code to ship. Use the existing project's `app/page.tsx`, `app/ultiapp/page.tsx`, and `app/over-ons/page.tsx` paths. Fonts (`Plus_Jakarta_Sans` as `--font-jakarta`, `Inter` as `--font-inter`) are already configured in `layout.tsx`.

**No external libraries.** No Framer Motion, no Radix, no shadcn — only Tailwind + React + plain JS where animation is needed.

---

## Overview

Redesign of ultigroup.be — a Belgian B2B pallet manufacturer that also offers a customer portal (UltiApp). The redesign moves the site away from a generic "SaaS" feel toward **industrial Belgian craftsmanship**: bigger editorial typography, photos as visual anchors, technical detail callouts, and a confident, calm B2B tone.

Three pages in scope:
1. **Home** (`/`) — Hero, stats band, full-bleed photo, "how it works", custom production, stock & delivery, dark CTA, customer strip
2. **UltiApp** (`/ultiapp`) — Customer portal sales page with a **live animated dashboard demo** (4-scene auto-loop)
3. **Over ons** (`/over-ons`) — About page with story, approach, growth timeline, founders, and the "why ULTI" section

## About the Design Files

The HTML files in `reference/` are **design references** built as HTML prototypes. They are not production code. Your task is to recreate the look, behavior, and content in the existing Next.js 14 + Tailwind CSS codebase, using the project's established patterns.

The live animation in `Pitch - UltiApp.html` (the looping dashboard demo) was implemented in vanilla JS. Recreate it as a React component using `useState` + `useEffect` + `setTimeout` — no external animation library.

## Fidelity

**High-fidelity (hifi).** All colors, typography, spacing, copy, and interactions are final. Implement pixel-perfect.

---

## Tech stack (target)

- **Next.js 14** App Router
- **Tailwind CSS**
- **Plus Jakarta Sans** (titles) loaded as `--font-jakarta`
- **Inter** (body) loaded as `--font-inter`
- **JetBrains Mono** (technical labels in UltiApp mockups) — add to layout.tsx if not present
- **Crimson Pro** italic (Over ons quotes) — add to layout.tsx if not present
- **Language:** Dutch (Belgian)
- **Deployment:** Vercel
- **No external libraries:** no Framer Motion, no Radix UI, no shadcn — only Tailwind + plain React

---

## Design Tokens

### Colors

```js
// Add to tailwind.config.ts under theme.extend.colors
{
  blue:    '#1D4E89',  // primary, accents, buttons
  'blue-2':  '#163d6c', // hover
  'blue-50': '#EEF3F9', // subtle blue background, badges
  ink:     '#1F2328',  // text, dark sections
  'ink-2':   '#3A3F46', // secondary text
  'ink-3':   '#6B7280', // tertiary, muted, captions
  paper:   '#FFFFFF',
  'paper-2': '#F5F7FA', // alternating section background
  'paper-3': '#EBEFF4', // hairline-darker grey
  line:    '#E5E7EB',
  'line-2':  '#D1D5DB',
  ok:   '#1F8A5B',
  warn: '#C77A18',
  crit: '#C0392B',
}
```

### Typography

| Token | Family | Weight | Letter-spacing | Use |
|---|---|---|---|---|
| `font-display` | Plus Jakarta Sans | 700–800 | -0.025em to -0.045em | All headings |
| `font-body` | Inter | 300–600 | normal | Body, UI |
| `font-mono` | JetBrains Mono | 400–500 | 0.06em–0.12em | Codes (UGA348), refs, technical labels |
| `font-serif` | Crimson Pro Italic | 400–500 | -0.005em | Pull quotes (Over ons only) |

### Type scale

| Class | Size | Use |
|---|---|---|
| `h-hero` | `clamp(48px, 7.5vw, 112px)` | Home hero "Palletten op maat" |
| `h-section` | `clamp(34px, 4.5vw, 60px)` | Section headings |
| `h-3` | `clamp(22px, 2.4vw, 28px)` | Sub-headings |
| `lead` | `clamp(16px, 1.3vw, 19px)` | Lead paragraphs |
| `body` | `16px` / `line-height: 1.6` | Body |
| `body-sm` | `14px` / `line-height: 1.6` | Card body, captions |
| `eyebrow` | `11px / weight 600 / letter-spacing 0.18em / uppercase` | Section labels (with 28px leading underline) |

### Spacing

- Section padding (Y): `clamp(60px, 8vw, 120px)`
- Section padding (X): `clamp(24px, 5vw, 80px)` — token `--pad-x`
- Max container width: `1440px`
- Nav height: `76px`
- Standard gap between grid columns: `64px`–`80px`
- Section dark CTA padding: `clamp(80px, 10vw, 140px)`

### Other

| Token | Value |
|---|---|
| Border radius (cards, buttons) | `4px`–`12px` |
| Box shadow (mockups) | `0 30px 80px -20px rgba(31,35,40,0.18), 0 8px 20px -8px rgba(31,35,40,0.1)` |
| Backdrop blur (sticky nav) | `14px` |

---

## Page 1: Home (`/`)

### Section 1 — Hero

**Layout:** 2-column grid `1.05fr / 1fr`, gap 64px, full viewport height minus nav.

**Left column** (vertically centered, padding-bottom 80px):
- Eyebrow label "ULTI GROUP · KORTRIJK · BE" (top, 24px from edge, with trailing horizontal rule)
- `<h1>` "Palletten op maat," (in `--ink`) + line break + "geleverd op afroep." (in `--blue`) — uses `h-hero` size, weight 800, line-height 0.98
- Lead paragraph: "ULTI GROUP produceert houten palletten op uw exacte specificaties, beheert uw voorraad en levert exact wanneer u het nodig heeft."
- Action row: blue primary button "Offerte aanvragen →" (links to `/offerte`) + outline button "Bekijk klantenportaal" (links to `/ultiapp`)
- Meta strip at bottom (border-top, max-width 600px, 3 columns):
  - PRODUCTIE — "100% op maat"
  - LEVERTIJD — "< 24 uur"
  - LOCATIE — "België"

**Right column** (full height):
- Image `/p1.jpg` (`object-cover`, full height)
- White photo-tag bottom-left, 24px from edges, 3px left border `--blue`:
  - "IN PRODUCTIE" (eyebrow style)
  - "Belgische maakindustrie sinds 2022" (display, 16px, weight 700)

### Section 2 — Stats Band

**Layout:** Dark section (`bg: --ink`, `color: --paper`), padding clamp(56px, 8vw, 96px) Y. 3 columns, separated by `rgba(255,255,255,0.12)` left borders.

For each stat:
- Big number: `clamp(48px, 6vw, 88px)`, weight 800, letter-spacing -0.04em
- "Unit" portion (the "24" in "<24u") in `rgba(255,255,255,0.4)`
- Label below: 11px, letter-spacing 0.18em, uppercase, `rgba(255,255,255,0.55)`, weight 600, margin-top 24px
- Body: 15px, `rgba(255,255,255,0.8)`, max-width 28ch, margin-top 10px

The 3 stats:
1. `<24u` · **Levertijd** · "Vanaf afroep tot levering op uw kade — vanuit uw eigen beheerde voorraad."
2. `Live` · **Stockupdates** · "Realtime inzicht in uw beschikbare voorraad — 24/7 via het klantenportaal."
3. `BE` · **Belgische voorraad** · "Productie, opslag en opvolging volledig in eigen beheer. Geen tussenpartijen."

### Section 3 — Full-bleed Photo

**Layout:** 64vh tall (min 480px), `/p2.jpg` cover.

- Bottom gradient overlay: `linear-gradient(180deg, transparent 50%, rgba(31,35,40,0.6) 100%)`
- Caption pinned to bottom-left (48px from edges, max-width container):
  - Eyebrow "KLAAR VOOR VERZENDING" (white)
  - H2 "Elk pallet — gemaakt voor uw productieproces, niet voor een catalogus." (`clamp(28px, 3.5vw, 44px)`, weight 700, white, max-width 24ch)

### Section 4 — Hoe het werkt

**Layout:** 2-column grid `1fr / 1fr`, gap 80px, `bg: --paper-2`.

**Left:**
- Eyebrow "Hoe het werkt"
- H2 "Van productie tot levering — zonder dat u eraan hoeft te denken." (`h-section`, max-width 16ch)
- Lead "Vier stappen, één partner. ULTI beheert het volledige proces — van de eerste maatopname tot de definitieve levering."
- Steps list (margin-top 48px), each row is `grid-template-columns: 60px 1fr; gap: 24px; padding: 28px 0; border-top: 1px solid --line`. Last row also has `border-bottom`.

Step number style: `font-display`, 14px, weight 700, `color: --blue`, letter-spacing 0.04em.

Step title: 22px, weight 600, letter-spacing -0.015em, margin-bottom 8px.

Step body: 15px, `--ink-2`, line-height 1.6, max-width 44ch.

The 4 steps:
- `01` **Productie** — "Uw palletten worden op maat geproduceerd op basis van uw exacte specificaties."
- `02` **Stock** — "Uw voorraad wordt beheerd en beschikbaar gehouden in onze magazijnen."
- `03` **Afroep** — "U roept af wanneer nodig — via UltiApp of telefonisch. Geen complexe procedures."
- `04` **Levering** — "Wij leveren snel vanuit uw beschikbare voorraad — exact op het gewenste moment."

**Right:** `/p3.jpg` in 4/5 aspect ratio, cover.

### Section 5 — Productie op maat

**Layout:** 2-column grid `1fr / 1fr`, gap 80px, white bg.

**Left:**
- Eyebrow "Op maat geproduceerd"
- H2 "Palletten voor elke afmeting." (h-section)
- Lead: "Elk pallet wordt geproduceerd op basis van uw exacte specificaties — lengte, breedte, hoogte, belasting en materiaal. Geen compromissen, geen standaardmaten."
- Bullet list, margin-top 36px, each bullet is `grid-template-columns: 28px 1fr; gap: 18px; padding: 24px 0; border-top: 1px solid --line`. Last bullet also `border-bottom`.

Bullets:
- **Exacte maatvoering** — "Elke mm telt. Wij produceren op basis van uw technische tekening." (icon: grid/measure)
- **Softwood & hardwood** — "Keuze uit verschillende houtsoorten, afgestemd op uw toepassing." (icon: house/wood)
- **Kwaliteitscontrole** — "Nagels verzonken, inslagpunten gecontroleerd, valproef conform norm." (icon: checkmark)

Icons: 24px, stroke 1.8, `color: --blue`. Use Lucide or hand-drawn SVGs from the HTML reference.

**Right:** `/tekening1.jpg` in 4/5 aspect ratio, cover.
- Blue tag at bottom-left (24px from edges): "VOORBEELD" (eyebrow style, white on `--blue`) + display 15px "1500 × 3000 mm — Softwood"

### Section 6 — Stock & Levering

**Layout:** Same as Section 5 but mirrored (photo left, text right), `bg: --paper-2`.

**Left:** `/p4.jpg`, 4/5 aspect, cover.

**Right:**
- Eyebrow "Uw stock, onze verantwoordelijkheid"
- H2 "Altijd voorraad. Direct leverbaar."
- Lead: "Wij beheren uw palletvoorraad van A tot Z. U roept af wanneer u het nodig heeft — wij leveren binnen 24 uur vanuit uw beschikbare stock."
- 3 bullets (same style as section 5):
  - **Stockbreuk vermijden** — "Wij bewaken uw minimumstock en grijpen in vóór u tekortkomt."
  - **Afroep via UltiApp** — "In drie stappen geplaatst. Live overzicht van uw beschikbaar saldo."
  - **Levering binnen 24u** — "Vanuit uw eigen beheerde voorraad — exact op het gewenste moment."
- Primary button at bottom (margin-top 36px): "Offerte aanvragen →" → `/offerte`

### Section 7 — CTA Dark

**Layout:** `bg: --ink`, padding `clamp(80px, 10vw, 140px) var(--pad-x)`.
2-column grid `1.4fr / 1fr`, gap 64px, align-end.

**Left:**
- Eyebrow "Klaar om samen te werken?" (white)
- H2 "Klaar om uw stockbeheer uit handen te geven?" (`clamp(36px, 5vw, 72px)`, weight 700, max-width 18ch)
- Paragraph: "Vraag vrijblijvend een offerte aan. Wij bekijken samen welke palletten u nodig heeft en hoe wij uw stock het best kunnen beheren." (`rgba(255,255,255,0.7)`)

**Right:** Stacked buttons:
- "Offerte aanvragen →" (white button) → `/offerte`
- "Neem contact op" (outline-light) → `/contact`

### Section 8 — Klanten strip

**Layout:** `bg: --paper-2`, padding 32px vertical, border-top.

Single row, space-between:
- Left: `<strong>` "Bent u een bestaande klant?" + span "Log in op UltiApp om uw stock, leveringen en afroepen op te volgen."
- Right: Blue button "Naar UltiApp →" → `/portaal/login`

---

## Page 2: UltiApp (`/ultiapp`)

### Section 1 — Hero (with live demo)

**Layout:** 2-column grid `1fr / 1.15fr`, gap 56px, align-center. White bg with a subtle grid pattern radial-masked behind the title.

Grid pattern background:
```css
background-image:
  linear-gradient(var(--paper-3) 1px, transparent 1px),
  linear-gradient(90deg, var(--paper-3) 1px, transparent 1px);
background-size: 48px 48px;
mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 80%);
opacity: 0.5;
```

**Left column:**
- Badge "KLANTENPORTAAL" with pulsing blue dot, in pill (`bg: --blue-50`, `color: --blue`)
- H1 "Ulti<span class='blue'>App</span>" — `clamp(56px, 9vw, 140px)`, weight 800, letter-spacing -0.045em, line-height 0.95
- Subtitle (margin-top 24px, max-width 22ch): "Uw voorraad, leveringen en afroepen — op één centrale plaats." (`font-display`, weight 600, `clamp(22px, 2.2vw, 28px)`)
- Lead: "UltiApp geeft u realtime inzicht in uw beschikbare stock, laat u afroepen plaatsen en bewaakt automatisch uw minimumvoorraad per artikel."
- Buttons: "Klanten login →" (primary) + "Vraag een demo" (outline)

**Right column — LIVE DEMO DASHBOARD:**

This is the centerpiece of the page. A simulated browser window with an auto-looping 4-scene animation showing the UltiApp customer portal. Total cycle: ~18 seconds.

#### Dashboard structure (static elements)

```
.dash (relative, overflow-hidden, rounded-xl, shadow-lg)
├── ::before — scene label pill at top center (changes per scene)
├── .dash-bar (browser chrome)
│   ├── 3 traffic-light dots (red/yellow/green)
│   └── URL bar: "● portaal.ultigroup.be/dashboard" (font-mono, 11px)
├── .dash-body (grid: 56px sidebar + main)
│   ├── .dash-sidebar (bg --ink, vertical icon strip)
│   │   ├── ug monogram (blue square, 32×32)
│   │   ├── Dashboard icon (active, white)
│   │   ├── Stock icon (muted)
│   │   ├── Calendar icon (muted)
│   │   └── Chart icon (muted)
│   └── .dash-main (padding 22px 24px, bg #FBFCFD)
│       ├── Header: "Goedendag, ULTI GROUP BV" + "UG BV [U]"
│       ├── 3 KPI cards (Stuks in stock / Open afroepen / Laatste levering)
│       ├── "Mijn stock" list (3 rows: UGA348, UGA812, UGA521 with progress bars)
│       └── .dash-recents (2-column pills: AFR-2026-041 Bevestigd, AFR-2026-038 Geleverd)
└── Overlays:
    ├── click-ripple (absolute, animates expanding ring on click)
    ├── demo-cursor (SVG cursor, absolute, animates with transform)
    ├── demo-toast (top-right, slides in from right)
    ├── demo-modal-backdrop (covers main area minus sidebar)
    └── demo-scenes (4 dots at bottom-center, indicate active scene)
```

#### Animation Scenes

State: `currentScene: 1 | 2 | 3 | 4`, `paused: boolean`.

Pause conditions (use these in your `useEffect`):
1. Mouse over the dashboard (`onMouseEnter` / `onMouseLeave`)
2. Tab not visible (Page Visibility API: `document.hidden`)
3. Dashboard not in viewport (IntersectionObserver, threshold 0.2)

When paused, show "⏸ Gepauzeerd" pill at bottom-right.

Scene label pill (top center, changes per scene):
- Scene 1: bg `--ink`, text "01 · Voorraad"
- Scene 2: bg `--warn`, text "02 · Waarschuwing"
- Scene 3: bg `--blue`, text "03 · Afroep plaatsen"
- Scene 4: bg `--ok`, text "04 · Bevestigd"

**Scene 1 — Dashboard (≈4s)**
- KPI "Stuks in stock" count-ups 0 → 1.240 (with thousands dot, 1400ms, cubic-out easing)
- KPI "Open afroepen" count-ups 0 → 2 (800ms)
- 3 stock bars fill in sequence (220ms stagger), each animating width via CSS transition `cubic-bezier(0.2, 0.8, 0.2, 1)` over 900ms
- Stock numbers count up (1100ms): UGA348 → 850 st, UGA812 → 420 st, UGA521 → 85 st
- 2 recent pills fade-in from below (180ms stagger, transform translateY 8px → 0)

**Scene 2 — Warning (≈4s)**
- UGA521 row gets `.row-flash` class (background flash to #FFF1EF over 600ms)
- UGA521 stock value gets `.warn` (orange `--warn` color)
- UGA521 progress bar background becomes `--warn`
- Warning toast slides in from right (max-width 240px, top-right of dash-main):
  - Icon: warning triangle (SVG)
  - Title: "⚠ Stockwaarschuwing"
  - Body: "UGA521 · kritiek over 6 dagen"
- After 800ms, stock counts down 85 → 74, bar width 22% → 18%
- After 2500ms hold, toast slides out

**Scene 3 — Place afroep (≈5s)**
- Cursor SVG appears, fades in
- Cursor moves to UGA348 stock row (transform translate with 750ms cubic-bezier)
- Click ripple animation (32px circle expanding to 2.4×, fading out, 600ms)
- Modal slides up from below (translateY 20px → 0, opacity 0 → 1, 400ms cubic-bezier), backdrop fades in (35% black, 350ms)
- Modal content:
  - Title: "Nieuwe afroep"
  - Subtitle: "UGA348 · 1500×3000 — beschikbaar in Waregem"
  - Field: "AANTAL" / "[count] stuks" — count-ups 0 → 220 over 1400ms
  - Rows: "Levering / binnen 24u", "Referentie / AFR-2026-042", "Adres / HQ · Kortrijk"
  - Blue CTA button: "→ Bevestig afroep"
- Cursor moves to CTA button, clicks
- Modal slides out, backdrop fades

**Scene 4 — Confirmed (≈5s)**
- Green success toast slides in:
  - Icon: checkmark
  - Title: "✓ Afroep bevestigd"
  - Body: "AFR-2026-042 · levering binnen 24u"
- A new pill is prepended in `.dash-recents` (replacing pill #2 visually so layout stays 2-col):
  - Ref: "AFR-2026-042"
  - Status: "Net geplaatst" with green dot
  - Border highlight: `box-shadow: 0 0 0 2px --ok`
- KPI "Open afroepen" gets `.pop` class (scale 1.12 with color flash to blue, 500ms) then counts 2 → 3 (600ms)
- After 2400ms hold, toast slides out
- Loop resets

#### Implementation tips for React

```tsx
const [scene, setScene] = useState(1);
const [paused, setPaused] = useState(false);
const [inView, setInView] = useState(false);
const [tabVisible, setTabVisible] = useState(true);

// Refs for elements being animated
const dashRef = useRef<HTMLDivElement>(null);
const cursorRef = useRef<HTMLElement>(null);
// ... etc

// Pause-aware wait helper
const wait = (ms: number) => new Promise<void>((resolve) => {
  let elapsed = 0;
  const step = 50;
  const tick = () => {
    if (!pausedRef.current && tabVisibleRef.current && inViewRef.current) {
      elapsed += step;
    }
    if (elapsed >= ms) resolve();
    else setTimeout(tick, step);
  };
  tick();
});

// Refs to read current values without re-running effect
const pausedRef = useRef(paused);
useEffect(() => { pausedRef.current = paused; }, [paused]);
```

Use `requestAnimationFrame` for the count-up easing (cubic-out: `1 - Math.pow(1 - t, 3)`).

The full vanilla JS implementation is in `reference/Pitch - UltiApp.html` at the bottom — port that logic to a React `useEffect` with the pause-aware `wait()`.

### Section 2 — Van voorraad naar levering

4-column grid (single row), gap 2px (border lines between cards), `bg: --paper-2`. Each card has its own white background.

For each card:
- Eyebrow-style number+label in `--blue` mono (e.g., `01 · VOORRAAD`)
- Title: 20px, weight 700, letter-spacing -0.02em
- Body: 14px, `--ink-2`, line-height 1.55

The 4 cards:
1. `01 · VOORRAAD` — **Klaar in onze magazijnen** — "Uw palletten staan klaar in onze magazijnen, beheerd in eigen voorraad."
2. `02 · AFROEP` — **U plaatst de afroep** — "Via UltiApp — in drie klikken. Of telefonisch — zoals u verkiest."
3. `03 · LEVERING` — **Geleverd op de afgesproken datum** — "Binnen 24 uur op de door u opgegeven locatie."
4. `04 · RAPPORT` — **Historiek automatisch beschikbaar** — "Alle data verzameld, doorzoekbaar, downloadbaar als rapport."

Section header above the grid:
- Eyebrow "Proces"
- H2 "Van voorraad naar levering" (h-section, max-width 16ch)
- Lead "UltiApp verbindt elke stap van het proces — transparant en in realtime."

### Section 3 — Voorkom stockbreuken

2-column grid `1.1fr / 1fr`, gap 80px, align-center, white bg.

**Left — Voorraadanalyse mockup card:**
- Card: white, rounded-xl, shadow, padding 24px, border `--line`
- Header: title "Voorraadanalyse" + tag "● LIVE SIMULATIE" (blue pill with pulsing dot)
- Article row (border-bottom): `UGA348-1500×3000` (mono, 12px, weight 600) + "ISPM15 · Waregem stock" subtitle, on the right a warning pill "Nog 9 dagen" (bg #FBEFE2, color `--warn`)
- Stock number: `font-display`, 36px, weight 800, letter-spacing -0.03em — "1.248" + 16px muted "stuks"
- Progress bar with min-marker:
  - Bar: 10px tall, `bg: --paper-3`, rounded-full
  - Fill: 32% width, bg `--warn`
  - Min marker at 12.8%: 2px wide vertical line `bg: --ink`, with "Min." label above (font-mono 9px)
  - Scale labels below: "0 / 500 min. / 3.900 max" (font-mono 10px, `--ink-3`)
- 3 data cells (grid 3-col, gap 8px, bg `--paper-2`, rounded 6px, padding 12px):
  - "GEM. VERBRUIK" / "212 / week"
  - "LAATSTE AFROEP" / "180 stuks"
  - "PRED. STOCKBREUK" / **"18 juni"** (in `--crit`)
- Table (4 rows, bg `--paper-2`):
  - Header: "MAAND / VERWACHTE STOCK / STATUS"
  - Jun 2026 / 1.248 st / ● Gezond (`--ok`)
  - Jul 2026 / 824 st / ● Goed (`--ok`)
  - Aug 2026 / 412 st / ● Let op (`--warn`)
  - Sep 2026 / 0 st / ● Kritiek (`--crit`)
- Full-width CTA button: "→ Afroep plannen" (blue)

**Right:**
- Eyebrow "Voorspelling & waarschuwing"
- H2 "Voorkom stockbreuken" (max-width 14ch)
- Lead: "UltiApp volgt het historisch verbruik per pallet en geeft tijdig aan wanneer een nieuwe afroep nodig is — zodat u nooit voor verrassingen staat."
- 3 status cards (stacked, padding 18px 22px, left border 3px):
  - 🟢 Voorraad gezond — "Geen actie vereist."
  - 🟡 Actie binnenkort nodig — "Plan tijdig uw volgende afroep." (`--warn` + bg #FFF8EE)
  - 🔴 Afroep aanbevolen — "Stockbreuk dreigt — onderneem actie." (`--crit` + bg #FFF1EF)

### Section 4 — Afroepkalender

Same 2-col grid layout as section 3, but text-left / mockup-right, `bg: --paper-2`.

**Left text** (similar pattern):
- Eyebrow "Planning & opvolging"
- H2 "Plan en volg elke afroep op." (max-width 16ch)
- Lead: "In de afroepkalender ziet u per maand wanneer elke levering gepland staat en welke status die heeft — van ontvangen tot geleverd."
- 4 status cards:
  - 🔵 Afroep ontvangen — "ULTI heeft uw afroep bevestigd." (bg `--blue-50`, border `--blue`)
  - 🟢 Klaar voor afhaling — "Stock staat klaar in het magazijn." (`--ok`)
  - ⚫ Transport ingepland — "Chauffeur en tijdslot zijn vastgelegd." (`--ink-3`, bg `--paper-3`)
  - ⬛ Geleverd — "Afroep volledig afgerond." (`--ink`)

**Right — Afroepkalender mockup card:**
- Header: "Juni 2026" + nav arrows `‹ ›` (28×28 outlined squares)
- 7-column calendar grid:
  - Day headers (MA, DI, WO, DO, VR, ZA, ZO) — font-mono 10px `--ink-3`
  - Days 1–30 (June)
  - Days outside month: dimmed (`--line-2`)
  - Marked days (5, 12, 17, 27): `bg: --blue-50`, `color: --blue`, font-weight 700, small blue dot at bottom
  - Today (18): 1.5px solid `--ink` border, weight 700
- Afroep list (margin-top 20px, 4 rows, bg `--paper-2`, rounded):
  - 5 jun · 180 st · UGA348-1500×3000 · "Afroep ontvangen" (blue pill)
  - 12 jun · 220 st · UGA348-1500×3000 · "Klaar" (green pill)
  - 17 jun · 140 st · UGA348-1500×3000 · "Transport" (grey pill)
  - 27 jun · 260 st · UGA348-1500×3000 · "Geleverd" (dark pill, bg `--ink`, white)

### Section 5 — Verbruik voorspellen

2-col grid, gap 80px, white bg. Mockup left, text right.

**Left — Verbruiksvoorspelling mockup card:**
- Header: "Verbruiksvoorspelling" + "● LIVE DATA" tag
- 4-column table (grid 1fr 1fr 1fr 1.2fr, gap 12px, padding 14px 12px, border-bottom `--line`):
  - Header row: "ARTIKEL / STOCK / VERBRUIK / STOCKBREUK"
  - **UGA348** (mono) / 1500×3000 / 1.248 st / 212/wk / `4 jul 2026 · 41 dagen` (blue pill)
  - **UGA812** / 1000×2000 / 420 st / 98/wk / `23 jun 2026 · 30 dagen` (warn pill, bg #FBEFE2)
  - **UGA521** / 1250×2500 / 74 st / 85/wk / `30 mei 2026 · 6 dagen` (crit pill, bg #FFE5E0)

Date pills: font-mono 11px, weight 600, padding 4px 10px, rounded-full. Days suffix in 10px regular, opacity 0.7.

**Right:**
- Eyebrow "Voorspelling"
- H2 "Verbruik voorspellen." (max-width 14ch)
- Lead: "UltiApp berekent op basis van uw historisch verbruik wanneer uw stock dreigt op te raken — per artikel, per week. Zo weet u op voorhand wanneer een nieuwe afroep nodig is, zonder zelf bij te houden."
- 3 explanation bullets (same style as Home bullets):
  - **Historisch verbruik** — "UltiApp volgt hoeveel palletten u gemiddeld per week verbruikt per artikeltype." (icon: chart-up)
  - **Verwachte stockbreuk** — "Op basis van de huidige voorraad en het verbruiksritme berekenen we de datum waarop u tekortkomt." (icon: clock)
  - **Tijdig afroep plaatsen** — "U krijgt een signaal vóór het kritiek wordt — zodat levering altijd op tijd is." (icon: lightning)

### Section 6 — Eén omgeving (modules grid)

`bg: --paper-2`.

Header:
- Eyebrow "Eén omgeving"
- H2 "Eén omgeving voor alles." (max-width 16ch)
- Lead: "Elk onderdeel van uw samenwerking met ULTI is beschikbaar in UltiApp — van voorraad tot rapportering."

4-column module grid (margin-top 48px, gap 12px). 8 tiles total. Each tile:
- Tile: rounded-lg, padding 28px 24px, border 1px `--line`, white bg, min-height 160px, flex-column gap 12px
- Hover: border `--blue`, translateY(-2px)
- Active tile: `bg: --blue`, `color: --paper`, border `--blue`
- "Coming soon" tile: dashed border, transparent bg, muted colors
- Icon (28×28, `color: --blue`) at top
- Title (17px, weight 600, `font-display`, letter-spacing -0.015em) at bottom (via `margin-top: auto`)
- Body (12px, `--ink-3`, line-height 1.5)

The 8 modules:
1. **Dashboard** (active) — "Volledig overzicht — stock, afroepen, leveringen."
2. **Mijn stock** — "Realtime voorraad per artikel."
3. **Afroepen** — "Plaatsen, opvolgen, valideren."
4. **Leveringen** — "Status van elke transport."
5. **Voorspelling** — "Stockbreuken voorspellen."
6. **Rapport** — "Export, downloads, historiek."
7. **Documenten** — "Facturen, leverbonnen, attesten."
8. **Meer binnenkort** (coming) — "In ontwikkeling op uw vraag."

### Section 7 — CTA Dark

Same pattern as Home CTA:
- Eyebrow "Probeer het zelf"
- H2 "Klaar om uw stock realtime te volgen?"
- Body: "Vraag een persoonlijke demo aan. Wij geven u een rondleiding door UltiApp aan de hand van uw eigen artikelen."
- Buttons: "Vraag een demo →" (white) + "Klanten login" (outline-light)

---

## Page 3: Over ons (`/over-ons`)

### Section 1 — Verhaal

2-col grid `1.1fr / 1fr`, gap 80px, padding-top `nav + 56px`.

**Left:**
- Eyebrow "Ons verhaal"
- H1 "Gestart vanuit een overtuiging." (`h-section`, max-width 14ch)
- 3 paragraphs (16px, `--ink-2`, line-height 1.75, max-width 56ch):
  1. "ULTI GROUP werd opgericht door broer en zus **Stan en Lore Deturck** vanuit de overtuiging dat houten verpakkingen niet standaard hoeven te zijn."
  2. "Waar veel spelers focussen op standaardafmetingen en grote volumes, kiest ULTI voor flexibiliteit, maatwerk en een snelle samenwerking."
  3. "Vandaag bouwen we verder aan een Belgische onderneming die industriële klanten helpt met op maat gemaakte pallets, voorraadbeheer en betrouwbare leveringen."
- Pull-quote (margin-top 36px, padding 24px 28px, 3px left border `--blue`, bg `--blue-50`):
  - "**Op maat gemaakt. Snel geleverd. Klaar voor productie.**" — font-family Crimson Pro italic, 22px, weight 400, line-height 1.35, max-width 36ch

**Right:** `/p2.jpg` in 4/5 aspect, cover.
- Dark gradient overlay from middle to bottom: `linear-gradient(180deg, transparent 30%, rgba(31,35,40,0.7) 100%)`
- 4 stats overlaid at bottom (grid 2x2, padding 32px, white text):
  - **2022** / OPGERICHT
  - **Flex** / MAATWERK
  - **B2B** / INDUSTRIEEL
  - **BE** / BELGISCH

  Stat number: 36px, weight 800, letter-spacing -0.03em. Label: 11px, weight 600, letter-spacing 0.16em, uppercase, `rgba(255,255,255,0.8)`.

### Section 2 — Hoe wij werken

`bg: --paper-2`.

Header:
- Eyebrow "Onze aanpak"
- H2 "Hoe wij werken." (max-width 16ch)
- Lead: "Drie principes die elke samenwerking met ULTI bepalen."

3-column card grid (gap 24px, margin-top 56px). Each card:
- White bg, border `--line`, padding 36px 32px
- Hover: border `--blue`, translateY(-3px)
- Number: font-mono, 11px, letter-spacing 0.16em, color `--blue`, weight 600 — e.g. "01 · PRODUCTIE"
- Title: 24px, weight 700, letter-spacing -0.02em, `font-display`
- Body: 14px, `--ink-2`, line-height 1.6

The 3 cards:
1. `01 · PRODUCTIE` — **Op maat gemaakt** — "Geen standaardoplossingen. Elk pallet wordt geproduceerd op de exacte specificaties van uw project — afmeting, houtsoort en behandeling."
2. `02 · LEVERING` — **Snelle levering** — "Korte communicatielijnen en efficiënte productie zorgen ervoor dat uw pallets klaarstaan wanneer u ze nodig heeft."
3. `03 · SERVICE` — **Voorraad als service** — "Klanten krijgen via ons portaal realtime inzicht in hun stock, leveringen en afroepen — volledig transparant."

### Section 3 — Onze groei (timeline)

White bg.

Header:
- Eyebrow "Onze groei"
- H2 "Waar ULTI vandaan komt — en waar we naartoe groeien." (max-width 18ch)

Timeline (margin-top 56px, 4-column grid, gap 24px, with horizontal line connecting all steps):
- Line: 1px tall, `bg: --line`, positioned at top 18px, spanning left 5% to right 5%
- Each step:
  - Dot at top-left (11px circle, on the line, padding-top 40px below)
    - Done step: solid `--blue`
    - Current step: solid `--blue` with 6px `--blue-50` outer glow
    - Future step (not used here): white bg, 2px `--line-2` border
  - Year: 32px, weight 800, letter-spacing -0.03em, `font-display`. Current year in `--blue`.
  - Title: 17px, weight 600, margin-top 10px
  - Body: 13px, `--ink-2`, line-height 1.55, margin-top 8px
  - Tag (margin-top 12px): "✓ Voltooid" (green) or "● Huidig" (blue), 10px, letter-spacing 0.14em, uppercase, padding 3px 10px, rounded-full

The 4 milestones:
- **2022** — done — **ULTI GROUP opgericht** — "Start van een Belgische onderneming met focus op houten oplossingen op maat." ✓ Voltooid
- **2023** — done — **Eerste industriële klanten** — "Uitbouw van de eerste samenwerkingen met productiebedrijven." ✓ Voltooid
- **2024** — done — **Focus op maatwerk** — "Verdere specialisatie in niet-standaard pallets en industriële toepassingen." ✓ Voltooid
- **2026** — current — **Lancering klantenportaal** — "Realtime inzicht in stock, leveringen, afroepen en rapportering." ● Huidig

### Section 4 — Stan & Lore

`bg: --paper-2`. 2-col grid `1fr / 1.15fr`, gap 80px.

**Left — Staggered portraits:**
- Container: 2-col grid, gap 24px, padding-bottom 60px
- **Stan portrait:** 4/5 aspect, `/Stan.jpg` cover, white bg. Name strip at bottom (padding 16px 18px): **Stan Deturck** (display 13px, weight 700) + "Co-founder" (11px, letter-spacing 0.16em, uppercase, weight 600)
- **Lore portrait:** `margin-top: 60px` (staggered down), 4/5 aspect, `/Lore.JPG` cover. Same name strip pattern. (If photo is missing, use industrial placeholder: diagonal-stripes pattern on `--ink` with white "LD" initials, 72px weight 800, and "PORTRET VOLGT" label.)

**Right:**
- Eyebrow "Het team"
- H2 "Wat Stan en Lore belangrijk vinden." (h-section)
- 4 paragraphs (16px, `--ink-2`, line-height 1.75, max-width 56ch):
  1. "Voor veel industriële klanten was het bestellen van pallets jarenlang een traag en ondoorzichtig proces. Minimumafnames, standaardmaten die net niet pasten, weinig communicatie. Stan en Lore wilden dat anders."
  2. "Ze geloven allebei in de kracht van directe samenwerking. Geen tussenpersonen, geen onduidelijkheid. Als een klant een vraag heeft, krijgt hij dezelfde dag een antwoord. Als een levering anders loopt dan gepland, is er meteen contact."
  3. "Wat hen het meest drijft: dat een klant nooit hoeft te twijfelen. Niet over de kwaliteit van het product, niet over de levertijd, niet over wat er in stock staat. Transparantie is voor hen geen extra service — het is de standaard."
  4. "ULTI GROUP bouwen ze bewust klein en sterk. Niet zo groot dat de persoonlijke aanpak verloren gaat, maar groot genoeg om elke klant echt te ontzorgen."
- Pull-quote (margin-top 36px, padding 28px 32px, 4px left border `--blue`, white bg, Crimson Pro italic 26px):
  - "**Elke klant verdient een pallet dat exact past — niet een compromis dat het net doet.**"

### Section 5 — Waarom samenwerken

White bg. 2-col grid `1.3fr / 1fr`, gap 80px.

**Left:**
- Eyebrow "Voordelen"
- H2 "Waarom samenwerken met ULTI." (max-width 16ch)
- Lead: "Zes principes die elke klant terugvindt in de dagelijkse samenwerking."
- 6-item list in 2-column grid (margin-top 36px, with hairline borders):
  - Each item: grid `36px 1fr`, gap 12px, padding 24px 0, border-bottom `--line`
  - Even items: left border, padding-left 24px
  - Odd items: padding-right 24px
  - Number (font-mono 11px, weight 600, `--blue`): "01"–"06"
  - Title (16px, weight 600, line-height 1.3):
    1. Flexibele productie — geen minimumafname
    2. Op maat gemaakte oplossingen per klant
    3. Snelle opvolging en korte communicatielijnen
    4. Industriële focus en vakkennis
    5. Voorraadbeheer als geïntegreerde service
    6. 100% Belgische productie

**Right — Quote box:**
- Small eyebrow above: "In één zin"
- White card, border `--line`, padding 36px
- Quote text (Crimson Pro italic 22px, line-height 1.35, max-width 38ch):
  - "We werken enkel met industriële klanten die nood hebben aan betrouwbaarheid, snelheid en maatwerk. Geen massaproductie — wél kwaliteit op maat."
- Author block (padding-top 24px, border-top `--line`, flex gap 14px):
  - Avatar: 44×44 circle, `/Stan.jpg` cover
  - Name: **Stan Deturck** (display 14px, weight 700)
  - Role: "Business Development · ULTI GROUP" (12px, `--ink-3`)

### Section 6 — CTA Dark

Same pattern as other CTAs:
- Eyebrow "Samenwerken"
- H2 "Klaar om samen te werken?"
- Body: "Ontdek hoe ULTI uw verpakkingsproces eenvoudiger kan maken."
- Buttons: "Vraag offerte aan →" (white) + "Contacteer ons" (outline-light)

---

## Shared Components

### Navigation (`<Nav />`)

Fixed top, height 76px, backdrop-blur, semi-transparent white bg, border-bottom `--line`.

- Left: Logo (ug monogram + "ulti group.") + nav links (Home / Klantenportaal / Over ons / Contact)
- Right: Blue button "Offerte aanvragen" + outline button with arrow-right icon "Klanten login"

Active link has 2px blue underline 28px below the link (extends to nav border-bottom).

Logo: "ug" in 36×36 circle, `bg: --ink`, `color: --paper`, font-display 13px weight 800. Followed by "ulti group." in font-display 17px weight 700, color `--ink`.

### Footer (`<Footer />`)

`bg: --ink`, padding 80px X 32px Y. Max-width container.

4-column grid (`2fr 1fr 1fr 1fr`):
1. **Brand column:** logo + tagline "Belgische maakindustrie. Palletten op maat, voorraadbeheer op afroep. Sinds 2022."
2. **Diensten:** Palletten op maat / Voorraadbeheer / UltiApp
3. **Bedrijf:** Over ons / Contact / Offerte aanvragen
4. **Contact:** info@ultigroup.be / +32 492 45 66 85 / Kortrijk, België

Footer bottom (border-top, padding-top 28px): "© 2026 ULTI GROUP BV · BE 0795.537.976" — "Ontworpen voor Belgische maakindustrie"

### Scroll reveal

Each major element has a `reveal` class with `opacity: 0; transform: translateY(24px); transition: opacity 0.7s, transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)`.

Use IntersectionObserver (threshold 0) to add `.visible` class when entering viewport. Also force-reveal anything already in viewport after 50ms (otherwise above-the-fold elements stay hidden).

Optional delay variants: `.reveal-d1` (0.08s), `.reveal-d2` (0.16s), `.reveal-d3` (0.24s), `.reveal-d4` (0.32s).

In React, implement as a small hook:

```tsx
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0 }
    );
    els.forEach(el => obs.observe(el));
    setTimeout(() => {
      els.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('visible');
        }
      });
    }, 50);
  }, []);
}
```

---

## Assets

All images live in `/public/` and are referenced as `/p1.jpg`, etc. Aspect ratios in the design:
- p1.jpg (Hero Home, right column) — needs to fill ~50vw × ~100vh, object-cover
- p2.jpg (Home full-bleed + Over ons Verhaal) — 64vh tall full-bleed; 4/5 portrait on Over ons
- p3.jpg (Home Hoe het werkt, right column) — 4/5 portrait
- p4.jpg (Home Stock & Levering, left column) — 4/5 portrait
- tekening1.jpg (Home Productie op maat, right column) — 4/5 portrait
- Stan.jpg (Over ons portraits + quote avatar) — 4/5 portrait + 44px circle
- Lore.JPG (Over ons portraits, staggered) — 4/5 portrait

Icons: Use Lucide React (if already in the project) or hand-drawn inline SVGs. Each icon in the design uses stroke 1.8, currentColor, 24px default.

---

## Routing

| Page | Path | File |
|---|---|---|
| Home | `/` | `app/page.tsx` |
| UltiApp | `/ultiapp` | `app/ultiapp/page.tsx` |
| Over ons | `/over-ons` | `app/over-ons/page.tsx` |
| Offerte (existing) | `/offerte` | `app/offerte/page.tsx` |
| Contact (existing) | `/contact` | `app/contact/page.tsx` |
| Login (existing) | `/portaal/login` | (existing) |

Most CTAs link to `/offerte`, `/contact`, or `/portaal/login`. Cross-page links between Home / UltiApp / Over ons.

---

## Quality bar

- **Mobile-first.** All sections collapse to single column below 980px. Nav links hide below 720px (replace with hamburger or skip).
- **Pixel-perfect typography.** No falling back to system fonts. Verify Plus Jakarta Sans is actually rendering at the specified weights.
- **No layout shift.** Photos have `aspect-ratio` set in CSS; no jumpy load.
- **Accessible.** Buttons have `aria-label` where icon-only. Form inputs (offerte, contact) have proper labels.
- **No external libs.** If a piece of UI feels like it needs one (modal, dropdown, etc.), build it in plain React.

---

## Files in this handoff

- `reference/Pitch - Home.html` — Home page reference
- `reference/Pitch - UltiApp.html` — UltiApp page reference (includes live demo JS at bottom)
- `reference/Pitch - Over ons.html` — Over ons reference
- `reference/pitch.css` — Shared CSS tokens & components
- `reference/pitch-reveal.js` — Scroll reveal IntersectionObserver setup

Open these in a browser to see the intended visual + behavior before writing code.
