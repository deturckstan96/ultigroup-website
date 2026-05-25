# ULTI GROUP — Brand Identity

> **Version 1.1** · mei 2026 · Belgian Industrial B2B · Pallets & Logistics

This document is a complete brand specification for ULTI GROUP. Paste this into your Next.js 14 + Tailwind project so Claude Code can use the exact tokens, fonts, and components below.

---

## ⚠️ Critical — This is a FULL rebrand

**Every single blue accent in the current site must go.** Pine green replaces every previous blue. There is no blue anywhere in the new brand — not in titles, not in buttons, not in the dashboard sidebar logo, not in calendar markers, not in status pills.

The most commonly missed spots:

- The small **"ug" sidebar logo inside the UltiApp dashboard mockup** — must become a miniature Monolith (square, pine, no rounding, with "UG" in Archivo Black)
- The "**App**" in "Ulti**App**" page title — must be pine, not blue
- The **active nav-link underline** — must be pine
- All **eyebrow labels** with leading line — line + text must be **accent green** (`#5A8C4A`), not blue
- **Status pills** ("Bevestigd", "Afroep ontvangen") — pine + paper, not blue
- The "**geleverd op afroep**" line in the Home hero — pine, not blue
- Calendar marked-day soft backgrounds — soft pine tint (`#E8F0E5`), not soft blue
- Modal CTA buttons — pine, not blue
- Click ripple animation — pine, not blue

See **section 9b** below for the complete find-and-replace audit.

---

## 1 · Logo — Monolith

A dark pine-green square with `UG` in heavy Archivo letters, plus an accent-green corner notch at bottom-right. Subtly references a pallet block. Paired with an uppercase wordmark `ULTI` (bold) `GROUP` (regular).

### Construction

- Aspect: **1:1 square**
- Corner accent: **18% of the side** (12px on a 64px mark, 20px on a 96px mark)
- Built on an **8px grid**
- The "UG" inside the box is **Archivo 900**, letter-spacing `-0.03em`

### Sizes

| Token | Mark size | UG font-size | Accent dot | Wordmark size |
|---|---|---|---|---|
| `xs` | 36 × 36 px | 14px | 8px | 16px |
| `sm` | 56 × 56 px | 22px | 12px | 24px |
| `md` | 64 × 64 px | 26px | 12px | 28px |
| `lg` | 96 × 96 px | 38px | 20px | 44px |

### Variants

- **Default** — Pine box on cream/paper bg
- **Reversed** — White box (with pine UG) on pine bg
- **Mark-only** — Just the square, no wordmark (use under 80px wide)

### Rules

- **Minimum size**: 24px digital · 8mm in print. Below that, use mark-only.
- **Clear space**: Always reserve at least the height of the "U" as free space around the logo.
- **Never**: rotate, skew, add shadow, gradient, or place inside another shape.
- **Background**: Logo works on cream (#F4F1E8), white, or pine. Never on photos directly — use a clear panel.

---

## 2 · Color Palette

The palette is **deliberately limited**. Pine green is the brand. Cream is the home. Accent green is the signal.

### Primary — Pine

| Token | Hex | Use |
|---|---|---|
| `--pine` | `#14352A` | **Primary**. Titles, logo, dark sections, primary buttons. |
| `--pine-2` | `#1F4A38` | Hover state for pine buttons & links |
| `--pine-3` | `#2D5C44` | Soft pine — used sparingly for tertiary surfaces |

### Accent — Vivacity

| Token | Hex | Use |
|---|---|---|
| `--accent` | `#5A8C4A` | **Accent**. Logo corner, eyebrow labels, hover, badges, signals. Use sparingly. |
| `--moss` | `#8FA663` | Tertiary green for muted accents (e.g., dark-mode eyebrows) |

### Text

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#1F2328` | Primary text |
| `--ink-2` | `#3A3F46` | Secondary text, body copy |
| `--ink-3` | `#6B7280` | Tertiary, captions, muted |

### Neutrals — Backgrounds

| Token | Hex | Use |
|---|---|---|
| `--cream` | `#F4F1E8` | **Page background**. Default body bg. Warm, slightly off-white. |
| `--cream-2` | `#EDE8D8` | Alternating section background (warmer cream) |
| `--paper` | `#FFFFFF` | Cards, modals, dashboard surfaces |
| `--paper-2` | `#F7F8F4` | Subtle alt-bg inside cards |

### Lines

| Token | Hex | Use |
|---|---|---|
| `--line` | `#E1DDD0` | Default divider (warm, matches cream) |
| `--line-2` | `#D1D5DB` | Stronger divider, form borders |

### Semantic — Status

| Token | Hex | Use |
|---|---|---|
| `--ok` | `#2D6A4F` | Stock OK, Geleverd, success |
| `--warn` | `#C77A18` | Low stock, action needed |
| `--crit` | `#C0392B` | Critical, overdue, error |

---

## 3 · Typography

Three families, each with a clear job:

| Family | Variable | Role | Weights |
|---|---|---|---|
| **Archivo** | `--font-display` | Headings, logo wordmark | 700, 800, 900 |
| **Inter** | `--font-body` | Body, UI, paragraphs | 300, 400, 500, 600 |
| **JetBrains Mono** | `--font-mono` | Codes, eyebrow labels, technical refs | 400, 500, 700 |

### Type scale

| Class / Token | Size | Family | Weight | Letter-spacing | Use |
|---|---|---|---|---|---|
| `.hero` | `clamp(56px, 7.5vw, 112px)` | Archivo | 800 | `-0.045em` | Page hero titles (uppercase) |
| `.display` | `clamp(40px, 5vw, 60px)` | Archivo | 800 | `-0.03em` | Section titles |
| `.h1` | `clamp(32px, 3.5vw, 44px)` | Archivo | 700 | `-0.025em` | Subsection titles |
| `.h2` | `clamp(22px, 2.4vw, 28px)` | Archivo | 700 | `-0.02em` | Card titles |
| `.h3` | `17–20px` | Archivo | 600 | `-0.015em` | Smaller headings |
| `.lead` | `clamp(17px, 1.3vw, 19px)` | Inter | 400 | normal | Lead paragraphs |
| `.body` | `15px` / line-height 1.55 | Inter | 400 | normal | Default body |
| `.body-sm` | `13–14px` | Inter | 400 | normal | Card body, captions |
| `.eyebrow` | `11px` | Mono | 600 | `0.18em` uppercase | Section labels (with 28px leading underline) |

Headings using Archivo should generally be **uppercase** for section titles, **mixed case** for paragraphs/leads.

---

## 4 · Spacing & Layout

- **Container max width**: `1280px` (use `1440px` on huge pages)
- **Section padding (Y)**: `clamp(60px, 8vw, 120px)`
- **Section padding (X)**: `clamp(24px, 5vw, 80px)`
- **Standard column gap**: `64px–80px`
- **Card padding**: `28px–40px`
- **Border radius (cards)**: `10px–12px`
- **Border radius (buttons)**: `0` (square — keeps industrial character)
- **No shadows on default elements.** Light box-shadow allowed on modals/dropdowns only: `0 16px 40px -8px rgba(20,53,42,0.18)`

---

## 5 · Components

### Eyebrow label

```jsx
<span className="inline-flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-accent
  before:content-[''] before:w-7 before:h-px before:bg-accent">
  Klantenportaal
</span>
```

### Button — Primary (on cream)

- Background: `--pine`
- Text: `--paper`
- Padding: `12px 22px`
- Font: Inter 500, 14px
- Border-radius: **0**
- Hover: background `--pine-2`

```jsx
<button className="bg-pine text-paper font-medium text-sm px-5 py-3 hover:bg-pine-2 transition-colors">
  Offerte aanvragen →
</button>
```

### Button — Outline

- Background: transparent
- Border: 1.5px solid `--pine`
- Text: `--pine`
- Hover: background `--pine`, text `--paper`

### Button — Light (on dark sections)

- Background: `--paper`
- Text: `--pine`
- Same shape rules

### Badge

```jsx
<span className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-eyebrow rounded-full bg-pine text-paper">
  Voorraad OK
</span>
```

Variants:
- `bg-pine text-paper` — primary
- `bg-accent text-paper` — accent / live
- `bg-cream-2 text-pine` — soft / metadata

### Card

```jsx
<article className="bg-paper border border-line rounded-xl p-7">
  <span className="eyebrow">Klantenportaal</span>
  <h3 className="font-display font-extrabold text-2xl text-pine uppercase tracking-tighter mt-3">Realtime voorraad</h3>
  <p className="text-ink-2 mt-2 leading-relaxed">…</p>
</article>
```

---

## 6 · CSS Tokens — `app/globals.css`

Paste into the `:root` block of your global stylesheet:

```css
:root {
  /* Primair · Pine */
  --pine:        #14352A;
  --pine-2:      #1F4A38;
  --pine-3:      #2D5C44;

  /* Accent · Levendigheid */
  --accent:      #5A8C4A;
  --moss:        #8FA663;

  /* Neutralen · Achtergronden */
  --cream:       #F4F1E8;
  --cream-2:     #EDE8D8;
  --paper:       #FFFFFF;
  --paper-2:     #F7F8F4;

  /* Tekst */
  --ink:         #1F2328;
  --ink-2:       #3A3F46;
  --ink-3:       #6B7280;

  /* Lijnen */
  --line:        #E1DDD0;
  --line-2:      #D1D5DB;

  /* Semantisch */
  --ok:          #2D6A4F;
  --warn:        #C77A18;
  --crit:        #C0392B;
}

body {
  background: var(--cream);
  color: var(--ink);
  font-family: var(--font-body), 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
```

---

## 7 · Tailwind Config — `tailwind.config.ts`

Replace or merge into `theme.extend`:

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pine:    { DEFAULT: '#14352A', '2': '#1F4A38', '3': '#2D5C44' },
        accent:  '#5A8C4A',
        moss:    '#8FA663',
        cream:   { DEFAULT: '#F4F1E8', '2': '#EDE8D8' },
        paper:   { DEFAULT: '#FFFFFF', '2': '#F7F8F4' },
        ink:     { DEFAULT: '#1F2328', '2': '#3A3F46', '3': '#6B7280' },
        line:    { DEFAULT: '#E1DDD0', '2': '#D1D5DB' },
        ok:      '#2D6A4F',
        warn:    '#C77A18',
        crit:    '#C0392B',
      },
      fontFamily: {
        display: ['var(--font-display)'],   // Archivo
        sans:    ['var(--font-body)'],      // Inter
        mono:    ['var(--font-mono)'],      // JetBrains Mono
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter:  '-0.03em',
        eyebrow:  '0.18em',
      },
      borderRadius: {
        none: '0',
        sm:   '4px',
        DEFAULT: '8px',
        md:   '10px',
        lg:   '12px',
      },
      boxShadow: {
        card: '0 16px 40px -8px rgba(20,53,42,0.18)',
      },
    },
  },
};

export default config;
```

---

## 8 · Font Imports — `app/layout.tsx`

```tsx
import { Archivo, Inter, JetBrains_Mono } from 'next/font/google';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800', '900'],
  variable: '--font-display',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${archivo.variable} ${inter.variable} ${mono.variable}`}>
      <body className="bg-cream text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
```

---

## 9 · Logo Component — `components/Logo.tsx`

```tsx
type Props = {
  variant?: 'default' | 'reversed' | 'mark-only';
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

export default function Logo({ variant = 'default', size = 'md' }: Props) {
  const sizes = {
    xs: { box: 'w-8 h-8 text-[11px]', dot: 'w-1.5 h-1.5', text: 'text-sm' },
    sm: { box: 'w-9 h-9 text-sm',     dot: 'w-2 h-2',      text: 'text-base' },
    md: { box: 'w-14 h-14 text-xl',   dot: 'w-3 h-3',      text: 'text-2xl' },
    lg: { box: 'w-24 h-24 text-4xl',  dot: 'w-5 h-5',      text: 'text-5xl' },
  }[size];

  const isReversed = variant === 'reversed';
  const boxBg     = isReversed ? 'bg-paper text-pine' : 'bg-pine text-paper';
  const textColor = isReversed ? 'text-paper' : 'text-pine';
  const groupCol  = isReversed ? 'text-paper/55' : 'text-ink-3';

  return (
    <div className="flex items-center gap-4">
      <div
        className={`relative flex items-center justify-center font-display font-black tracking-tighter ${sizes.box} ${boxBg}`}
      >
        UG
        <span className={`absolute bottom-0 right-0 bg-accent ${sizes.dot}`} />
      </div>
      {variant !== 'mark-only' && (
        <span className={`font-display font-extrabold tracking-tight uppercase whitespace-nowrap ${sizes.text} ${textColor}`}>
          ULTI<span className={`font-normal ${groupCol}`}> GROUP</span>
        </span>
      )}
    </div>
  );
}
```

### Using inside the UltiApp dashboard mockup sidebar

The miniature logo inside the dashboard's dark sidebar must be **the same Monolith mark, just very small** — NOT a circle, NOT a rounded square, NOT blue:

```tsx
// Inside the dashboard sidebar (dark bg #1F2328):
<div className="w-8 h-8 bg-pine flex items-center justify-center font-display font-black text-paper text-[11px] tracking-tighter relative">
  UG
  <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-accent" />
</div>
```

Or use `<Logo variant="mark-only" size="xs" />`.

---

## 9b · Critical — Replace ALL blue with pine (full audit)

The previous design used `#1D4E89` blue throughout. Every single instance must be replaced with the new pine palette. **This is not optional — there is no blue anywhere in the new brand.**

### Find & replace map

| Old value | New value | Where it appears |
|---|---|---|
| `#1D4E89` (blue) | `#14352A` (pine) | All primary buttons, accents, headings, hover states |
| `#163d6c` (blue-2 hover) | `#1F4A38` (pine-2) | Hover backgrounds |
| `#EEF3F9` (blue-50) | `cream-2` or `#E8F0E5` (pine tinted) | Soft badges, blue-tinted backgrounds |
| `text-blue-*` Tailwind | `text-pine` / `text-accent` | Any blue text |
| `border-blue-*` | `border-pine` | Borders |

### Specific spots in the UltiApp page that MUST change

These are commonly missed — verify each one explicitly:

1. **Active nav link underline** (e.g. "Klantenportaal") — currently blue `#1D4E89`, must become **pine `#14352A`**.
2. **"Klanten login" outline button** — text must be pine, not blue.
3. **"Offerte aanvragen" primary button** — background must be pine, not blue.
4. **UltiApp hero title** — "Ulti**App**" — the "App" portion that was blue must become **pine `#14352A`** (NOT accent green — pine, because it's part of the wordmark, not a signal).
5. **"Klantenportaal" badge** with pulsing dot — background `#E8F0E5` (soft pine tint) or `cream-2`, text & dot in **pine**.
6. **Dashboard mockup sidebar logo** — the small "ug" square in the dark sidebar at top-left of the dashboard frame:
   - Currently a blue rounded square `#1D4E89` with white "ug"
   - **Must become**: pine square (radius 0 or 2px) with white "UG" in Archivo 900 — a miniature Monolith. NOT a circle, NOT rounded-lg, NOT blue.
7. **Scene label pill** ("01 · VOORRAAD", "02 · WAARSCHUWING", etc.) on top of dashboard:
   - Scene 1 label background: `--ink` (#1F2328) — keep
   - Scene 3 label background: was blue, **must become pine `#14352A`**
8. **"AFR-2026-041 · Bevestigd" status pill** — blue dot and blue text → **pine dot and pine text**.
9. **Stock progress bars** (the green bars in the dashboard list) — keep green but use **`--accent` (#5A8C4A)** for consistency, not the previous OK green.
10. **Warning toast border-left** — keep `--warn` orange (semantic).
11. **Modal backdrop "Bevestig afroep" button** — was blue, **must become pine**.
12. **Click ripple effect color** — was blue, **must become pine or accent**.
13. **Calendar marked-day backgrounds** — soft blue tint → **soft pine tint `#E8F0E5`**, marked-day text → pine.
14. **"Afroep ontvangen" pill** (blue family) → use pine background + paper text.
15. **Forecast date pill "4 jul 2026"** (blue) → pine background `--pine-3` with paper text.
16. **"Klanten login" outline button border** in nav → pine, not blue.
17. **Dashboard URL bar lock dot (●)** — was green for HTTPS — keep `--ok` (semantic) OR change to accent. Your call but be consistent.

### Same audit for the Home & Over ons pages

- **Hero title** "Palletten op maat, **geleverd op afroep.**" — the second line was blue, **must become pine**. (Accent green is OK if you want a slight pop but pine is safer for the wordmark-feel.)
- **All eyebrow labels** — line + uppercase mono text — was blue, **must become accent `#5A8C4A`**.
- **All `--blue` CSS vars** in your stylesheets — search and replace with `--pine`.
- **All Tailwind `blue-*` classes** — search across the codebase, none should remain.

### Search command for your developer

Run these in the project root to find every remaining blue reference:

```bash
grep -ri "1D4E89\|163d6c\|EEF3F9\|6ea2dd\|blue-50\|blue-100\|blue-500\|blue-600\|blue-700\|blue-800\|blue-900" --include="*.tsx" --include="*.ts" --include="*.css"
```

Every hit must be replaced before the migration is complete.

---

## 10 · Guidelines

### Do

- **Cream** is the default page background. Not white.
- **Pine** for titles and primary actions only. Body text stays Ink.
- **Accent green** sparingly — eyebrow labels, hover states, status badges, logo corner.
- **Uppercase Archivo** for section titles and headings. Mixed case for leads and body.
- **Mono labels** above section titles to give a technical/industrial feel.
- **Hairline dividers** (1px `--line`) between sections — they replace heavy section padding.

### Don't

- **No extra colors** beyond the palette. No blue, no yellow, no extra greens.
- **No rounded buttons.** Square (radius 0) keeps the industrial language.
- **No gradients, no drop-shadows on default UI.** Flat surfaces only.
- **No emoji** outside of toasts/notifications. Industrial brand — keep it clean.
- **Don't soften the logo.** Always sharp corners except the accent dot which is a square.
- **Don't put the logo on photos directly.** Always reserve a flat panel.

---

## 11 · Voice & Tone

- **Direct, Belgian, B2B.** Skip marketing fluff. "We doen wat we beloven" beats "We empower your supply chain".
- **Concrete numbers** preferred. `<24u`, `100% op maat`, `7 artikelen`, `220 stuks`.
- **Dutch (Belgian).** Use `u` (formal) for customers, except in internal-feel contexts.
- **Technical language is OK.** Customers are industrial — they know what ISPM-15 is, what afroep means, what kade means. Don't over-explain.

---

## 12 · Files in this brand system

- `BRAND.md` — this document (machine-readable spec)
- `Huisstijl.html` — visual brand guide (open in browser)
- `app/globals.css` — paste section 6 into this
- `tailwind.config.ts` — paste section 7
- `app/layout.tsx` — paste section 8
- `components/Logo.tsx` — paste section 9

---

## Questions?

**Email** info@ultigroup.be · **Location** Kortrijk, België · **VAT** BE 0795.537.976
