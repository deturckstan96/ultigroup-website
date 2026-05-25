# ULTI GROUP — Design Brief voor herontwerp

## Context

ULTI GROUP is een Belgisch B2B-bedrijf dat houten palletten op maat produceert, de voorraad beheert voor industriële klanten en levert op afroep. De klant roept af via een klantenportaal (UltiApp) — ULTI doet de rest.

Opgericht in 2022 door broer en zus **Stan en Lore Deturck**. Klein, direct, betrouwbaar. Geen massaproductie — maatwerk en snelheid.

---

## Huidige technische stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Fonts**: Plus Jakarta Sans (titels), Inter (body text)
- **Deployment**: Vercel
- **Taal**: Nederlands (België)

---

## Huidige merkidentiteit

| Element | Waarde |
|---------|--------|
| Primaire kleur | `#1D4E89` — donkerblauw |
| Tekstkleur | `#1F2328` — bijna zwart |
| Achtergrond licht | `#F5F7FA` — lichtgrijs |
| Logo | "ug" monogram in donkere cirkel + "ulti group." (kleine letters, vet) |
| Tone of voice | Professioneel, direct, Belgisch, geen overdrijving |

---

## Beschikbare afbeeldingen in `/public`

| Bestand | Inhoud |
|---------|--------|
| `p1.jpg` | Palletten worden geladen in een vrachtwagen (buiten, blauwe lucht) |
| `p2.jpg` | Grote stapels palletten buiten, vrachtwagen op achtergrond |
| `p3.jpg` | Palletten gestapeld in een open vrachtwagen (zomer, warme kleuren) |
| `p4.jpg` | Brede palletstock buiten met heftruck, industriële setting |
| `tekening1.jpg` | Technische maattekening van een pallet |
| `Stan.jpg` | Portretfoto Stan Deturck |
| `Lore.JPG` | Portretfoto Lore Deturck |

---

## Paginastructuur & huidige content

### Navigatie (alle pagina's)
- Logo links
- Links: Home · Klantenportaal · Over ons · Contact
- Rechts: "Offerte aanvragen" (blauw) + "Klanten login" (omlijnd)

---

### Pagina 1: Home (`/`)

**Doel**: Nieuwe bezoekers overtuigen — wat doet ULTI GROUP en waarom kiezen voor hen.

**Huidige secties (top → bottom):**

1. **Hero** — 2 kolommen
   - Links: Titel "Palletten op maat, geleverd op afroep." + subtekst over productie/stock/levering
   - Rechts: foto `p1.jpg` met badge "Belgische productie — 100% op maat"

2. **Stats band** — donkere achtergrond (#1F2328), 3 cijfers
   - `< 24u` Levertijd na afroep
   - `Live` Stockupdates via portaal
   - `Belgische` Voorraad & opvolging

3. **Full-width foto** — `p2.jpg`, 52vh hoog, gradient overlay

4. **Hoe het werkt** — 2 kolommen
   - Links: 4 stappen met iconen op tijdlijn: Productie → Stock → Afroep → Levering
   - Rechts: foto `p3.jpg`

5. **Palletten voor elke afmeting** — 2 kolommen
   - Links: tekst + 3 bulletpunten (Exacte maatvoering / Softwood & hardwood / Kwaliteitscontrole)
   - Rechts: `tekening1.jpg` met badge "1500 × 3000 mm — Softwood"

6. **Altijd voorraad. Direct leverbaar.** — 2 kolommen
   - Links: foto `p4.jpg`
   - Rechts: tekst + 3 bulletpunten + CTA knop "Offerte aanvragen"

7. **CTA sectie** — donkere achtergrond
   - "Klaar om uw stockbeheer uit handen te geven?"
   - 2 knoppen: Offerte aanvragen + Neem contact op

8. **Klanten strip** — onderaan
   - "Bent u een bestaande klant? Log in op UltiApp"
   - Knop "Naar UltiApp"

---

### Pagina 2: UltiApp/Klantenportaal (`/ultiapp`)

**Doel**: Het digitale klantenportaal voorstellen aan potentiële én bestaande klanten.

**Wat UltiApp kan:**
- Realtime voorraad bekijken per artikel
- Afroepen plaatsen (in 3 stappen)
- Leveringen opvolgen met status
- Verbruiksvoorspelling per artikel (wanneer dreigt stockbreuk?)
- Afroepkalender

**Modules in UltiApp:**
Dashboard · Mijn stock · Afroepen · Leveringen · Voorspelling · Rapport · Documenten

**Huidige secties:**

1. **Hero** — 2 kolommen
   - Links: badge "Klantenportaal" + titel "Ulti**App**" + subtekst + 2 knoppen (Klanten login + Vraag een demo)
   - Rechts: interactieve dashboard-mockup (HTML/CSS, geen afbeelding)

2. **Van voorraad naar levering** — 4 stappen horizontaal
   - Voorraad → Afroep → Levering → Rapportering

3. **Voorkom stockbreuken** — 2 kolommen
   - Links: simulatie-mockup "Voorraadanalyse" met artikel UGA348, verbruiksbalk, voorspellingstabel
   - Rechts: tekst + 3 kleurstatus (groen/oranje/rood)

4. **Plan en volg elke afroep op** — 2 kolommen
   - Links: tekst + statuslegenda
   - Rechts: kalender-mockup juni 2026 + lijst van geplande afroepen

5. **Verbruik voorspellen** — 2 kolommen
   - Links: tekst + 3 uitlegpunten
   - Rechts: mockup "Verbruiksvoorspelling" met 3 artikelen + balk per artikel

6. **Eén omgeving voor alles** — grid van modules (tegels)

---

### Pagina 3: Over ons (`/over-ons`)

**Doel**: Vertrouwen opbouwen — wie zijn Stan & Lore, hoe werken ze.

**Huidige secties:**

1. **Ons verhaal** — 2 kolommen
   - Links: tekst over oprichting (2022, broer & zus, maatwerk-overtuiging) + quote
   - Rechts: `pallet2.jpg` foto met overlay stats (2022 / Flex / B2B / BE)

2. **Hoe wij werken** — 3 kaarten
   - Op maat gemaakt / Snelle levering / Voorraad als service

3. **Onze groei** — tijdlijn
   - 2022: Opgericht · 2023: Eerste industriële klanten · 2024: Focus op maatwerk · 2026: Lancering klantenportaal

4. **Wat Stan en Lore belangrijk vinden** — 2 kolommen
   - Links: 2 foto's (Stan + Lore, gestaggerd)
   - Rechts: verhaal over directheid, transparantie, kleine & sterke onderneming + quote

5. **Waarom samenwerken met ULTI** — 2 kolommen
   - Links: 6 bulletpunten (Flexibele productie / Maatwerk / Snelle opvolging / Industriële focus / Voorraadbeheer als service / Belgische productie)
   - Rechts: quote-blok met Stan-foto

6. **CTA** — donkere achtergrond

---

### Pagina 4: Contact (`/contact`)
Eenvoudig contactformulier. Naam, email, bericht. Geen complexe layout nodig.

### Pagina 5: Offerte aanvragen (`/offerte`)
Formulier: naam, bedrijf, email, telefoon, type pallet, afmeting, volume, bericht.

---

## Wat goed werkt (behouden)

- Strakke, professionele uitstraling — geen overdadige animaties
- Afwisseling wit / lichtgrijs tussen secties
- Donkere CTA-secties (#1F2328) als ademruimte
- 2-koloms layout met foto's (afwisselend links/rechts)
- Dashboard-mockup als HTML — geen statische afbeelding
- Plus Jakarta Sans voor titels geeft premium gevoel

## Wat beter kan (design uitdagingen)

- **Homepage voelt generiek** — te veel "standaard SaaS"-patroon voor een productiebedrijf
- **Foto's** worden weinig gebruikt — meer impact mogelijk met grotere, gedurfde foto-secties
- **De stats-band** (< 24u / Live / Belgische) is te smal en te abstract
- **Mobile** is functioneel maar mist character
- **Over ons** — foto's van Stan & Lore kunnen prominenter
- **UltiApp-pagina** — mockups zijn goed maar missen echte "wow"-factor
- **Footer** — niet gelezen, voeg toe wat echt nodig is

---

## Opdracht voor herontwerp

Ontwerp een volledige nieuwe website voor ULTI GROUP met dezelfde pagina's en content, maar met:

1. **Sterkere visuele identiteit** — meer industrieel, Belgisch vakmanschap, minder "tech startup"
2. **Foto's centraler** — gebruik p1-p4.jpg als echte visuele ankers, niet als decoratie
3. **Titels met meer impact** — grotere, gedurfder typografie voor de hero en tussentitels
4. **Consistente sectie-ritme** — duidelijke ademruimte, niet alles op elkaar gepropt
5. **UltiApp-pagina** — maak de waarde van het portaal tastbaarder voor industriële klanten die niet tech-savvy zijn
6. **Mobile-first** — alle secties moeten mooi werken op smartphone
7. **Dezelfde Tailwind + Next.js stack** — lever werkende `.tsx` bestanden

### Randvoorwaarden
- Taal: **Nederlands** (Belgisch)
- Kleuren: gebruik #1D4E89 en #1F2328 als basis, mag aangevuld worden
- Fonts: Plus Jakarta Sans (titels) + Inter (body) — beide al geconfigureerd
- Geen externe libraries toevoegen (geen Framer Motion, geen Radix UI)
- Foto-paden: `/p1.jpg`, `/p2.jpg`, `/p3.jpg`, `/p4.jpg`, `/tekening1.jpg`, `/Stan.jpg`, `/Lore.JPG`
- Portaal-links blijven werken: `/portaal/login`, `/offerte`, `/contact`
