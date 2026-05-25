// ─── MOCK DATA — wordt later vervangen door echte Supabase calls ───────────

export const mockKlant = {
  naam: "Vergalle NV",
  partner_code: "BP-2026-0012",
  stad: "Waregem",
  email: "aankoop@vergalle.be",
  betaaltermijn_dagen: 30,
};

// Artikelen (UGA's) die toebehoren aan Vergalle NV
export const mockArtikelen = [
  {
    nr: "P0001",
    naam: "Pallet 1200x800 EPAL",
    type: "Pallet",
    eenheid: "st",
    p_lengte: 1200,
    p_breedte: 800,
    p_hoogte: 145,
    ispm15: true,
  },
  {
    nr: "P0002",
    naam: "Pallet 1200x1000 Industrieel",
    type: "Pallet",
    eenheid: "st",
    p_lengte: 1200,
    p_breedte: 1000,
    p_hoogte: 150,
    ispm15: false,
  },
  {
    nr: "P0003",
    naam: "Pallet 800x600 Mini",
    type: "Pallet",
    eenheid: "st",
    p_lengte: 800,
    p_breedte: 600,
    p_hoogte: 120,
    ispm15: false,
  },
];

// Live stock per artikel + locatie
export const mockStock = [
  { artikel_nr: "P0001", artikel_naam: "Pallet 1200x800 EPAL",         locatie: "Waak",       qty: 1240, min_stock: 500 },
  { artikel_nr: "P0001", artikel_naam: "Pallet 1200x800 EPAL",         locatie: "Pottelberg",  qty: 380,  min_stock: 500 },
  { artikel_nr: "P0002", artikel_naam: "Pallet 1200x1000 Industrieel", locatie: "Waak",       qty: 92,   min_stock: 200 },
  { artikel_nr: "P0003", artikel_naam: "Pallet 800x600 Mini",          locatie: "Waak",       qty: 635,  min_stock: 300 },
];

// Leveringshistoriek
export const mockLeveringen = [
  {
    id: "SD-2026-0138",
    datum: "2026-05-16",
    status: "Posted",
    klant_ref: "IO/27690",
    transporter: "Verstraete Transport",
    regels: [
      { artikel_nr: "P0001", naam: "Pallet 1200x800 EPAL",         stuks: 500,  prijs_per_stuk: 8.45 },
      { artikel_nr: "P0003", naam: "Pallet 800x600 Mini",          stuks: 200,  prijs_per_stuk: 5.20 },
    ],
  },
  {
    id: "SD-2026-0121",
    datum: "2026-05-07",
    status: "Posted",
    klant_ref: "IO/27691",
    transporter: "Verstraete Transport",
    regels: [
      { artikel_nr: "P0001", naam: "Pallet 1200x800 EPAL",         stuks: 750,  prijs_per_stuk: 8.45 },
    ],
  },
  {
    id: "SD-2026-0108",
    datum: "2026-04-28",
    status: "Posted",
    klant_ref: "IO/27692",
    transporter: "De Coninck Logistics",
    regels: [
      { artikel_nr: "P0002", naam: "Pallet 1200x1000 Industrieel", stuks: 300,  prijs_per_stuk: 11.80 },
    ],
  },
  {
    id: "SD-2026-0094",
    datum: "2026-04-14",
    status: "Posted",
    klant_ref: "IO/27689",
    transporter: "Verstraete Transport",
    regels: [
      { artikel_nr: "P0001", naam: "Pallet 1200x800 EPAL",         stuks: 500,  prijs_per_stuk: 8.45 },
      { artikel_nr: "P0003", naam: "Pallet 800x600 Mini",          stuks: 400,  prijs_per_stuk: 5.20 },
    ],
  },
  {
    id: "SD-2026-0079",
    datum: "2026-03-31",
    status: "Posted",
    klant_ref: "IO/27688",
    transporter: "De Coninck Logistics",
    regels: [
      { artikel_nr: "P0001", naam: "Pallet 1200x800 EPAL",         stuks: 1000, prijs_per_stuk: 8.20 },
    ],
  },
];

// Afroepen (ingediend door klant)
export const mockAfroepen: Array<{
  id: string;
  datum_aanvraag: string;
  artikel_nr: string;
  artikel_naam: string;
  stuks: number;
  gewenste_datum: string;
  klant_ref: string;
  opmerking: string;
  status: AfroepStatus;
  so_id: string;
}> = [
  {
    id: "AFR-2026-0009",
    datum_aanvraag: "2026-05-23",
    artikel_nr: "P0003",
    artikel_naam: "Pallet 800x600 Mini",
    stuks: 300,
    gewenste_datum: "2026-06-03",
    klant_ref: "IO/27694",
    opmerking: "",
    status: "nieuw",
    so_id: "",
  },
  {
    id: "AFR-2026-0008",
    datum_aanvraag: "2026-05-22",
    artikel_nr: "P0001",
    artikel_naam: "Pallet 1200x800 EPAL",
    stuks: 500,
    gewenste_datum: "2026-05-29",
    klant_ref: "IO/27693",
    opmerking: "",
    status: "bevestigd",
    so_id: "SO-26-0139",
  },
  {
    id: "AFR-2026-0007",
    datum_aanvraag: "2026-05-09",
    artikel_nr: "P0002",
    artikel_naam: "Pallet 1200x1000 Industrieel",
    stuks: 150,
    gewenste_datum: "2026-05-15",
    klant_ref: "IO/27691",
    opmerking: "Graag 's ochtends leveren",
    status: "omgezet",
    so_id: "SO-26-0121",
  },
  {
    id: "AFR-2026-0005",
    datum_aanvraag: "2026-04-22",
    artikel_nr: "P0001",
    artikel_naam: "Pallet 1200x800 EPAL",
    stuks: 750,
    gewenste_datum: "2026-04-29",
    klant_ref: "IO/27690",
    opmerking: "",
    status: "omgezet",
    so_id: "SO-26-0108",
  },
];

// Leveradressen van de klant
export const mockAdressen = [
  {
    id: "adr-1",
    type: "levering",
    is_standaard: true,
    straat: "Industrieweg 45",
    postcode: "8790",
    stad: "Waregem",
    land: "België",
    label: "Waregem — Industrieweg 45",
  },
  {
    id: "adr-2",
    type: "levering",
    is_standaard: false,
    straat: "Gentstraat 12",
    postcode: "8790",
    stad: "Waregem",
    land: "België",
    label: "Waregem — Gentstraat 12",
  },
];

// Status labels & kleuren
export type AfroepStatus = "nieuw" | "bevestigd" | "omgezet" | "geannuleerd";

export const statusConfig: Record<AfroepStatus, { label: string; color: string; bg: string }> = {
  nieuw:        { label: "Ingediend",   color: "text-blue-700",  bg: "bg-blue-50 border-blue-200" },
  bevestigd:    { label: "Bevestigd",   color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
  omgezet:      { label: "In behandeling", color: "text-green-700", bg: "bg-green-50 border-green-200" },
  geannuleerd:  { label: "Geannuleerd", color: "text-gray-500",  bg: "bg-gray-50 border-gray-200" },
};
