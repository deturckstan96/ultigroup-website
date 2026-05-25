import { createClient } from "@/lib/supabase/server";
import { getKlantNaam } from "@/lib/supabase/get-klant";
import AfroepForm from "./AfroepForm";

export type ArtikelKeuze = {
  nr: string;
  naam: string;
  klant_nr: string | null;
  p_lengte: number | null;
  p_breedte: number | null;
  p_hoogte: number | null;
  totaal_stock: number;
  vorige_stuks: number | null;
  vorige_datum: string | null;
};

export type IoNummer = {
  id: string;
  io_nummer: string;
  item_id: string;
  item_name: string | null;
  qty_totaal: number;
  qty_verbruikt: number;
  qty_in_behandeling: number;
  notitie: string | null;
};

export type LeverAdres = {
  id: string;
  bedrijfsnaam: string | null;
  straat: string;
  postcode: string;
  stad: string;
  land: string | null;
  is_standaard: boolean;
};

async function getIoNummers(klantNaam: string): Promise<IoNummer[]> {
  const supabase = await createClient();

  const { data: relatie } = await supabase
    .from("zakenrelaties")
    .select("id")
    .eq("naam", klantNaam)
    .single();

  if (!relatie) return [];

  const { data: ios } = await supabase
    .from("klant_io_nummers")
    .select("id, io_nummer, item_id, item_name, qty_totaal, qty_verbruikt, notitie")
    .eq("partner_id", relatie.id)
    .eq("actief", true)
    .order("io_nummer");

  if (!ios?.length) return [];

  // Bereken qty_in_behandeling: alle actieve afroepen die dit IO gebruiken
  const ioIds = ios.map((io) => io.id);
  const { data: inBehandeling } = await supabase
    .from("portaal_afroepen")
    .select("io_nummer_id, qty")
    .in("io_nummer_id", ioIds)
    .not("status", "in", '("afgewezen","geannuleerd","geleverd")');

  const behandelingMap: Record<string, number> = {};
  for (const afr of inBehandeling ?? []) {
    if (afr.io_nummer_id) {
      behandelingMap[afr.io_nummer_id] = (behandelingMap[afr.io_nummer_id] ?? 0) + Number(afr.qty ?? 0);
    }
  }

  return ios.map((io) => ({
    id: io.id,
    io_nummer: io.io_nummer,
    item_id: io.item_id,
    item_name: io.item_name ?? null,
    qty_totaal: Number(io.qty_totaal),
    qty_verbruikt: Number(io.qty_verbruikt),
    qty_in_behandeling: behandelingMap[io.id] ?? 0,
    notitie: io.notitie ?? null,
  }));
}

async function getLeveradressen(klantNaam: string): Promise<LeverAdres[]> {
  const supabase = await createClient();

  // Zoek de zakenrelatie op naam
  const { data: relatie } = await supabase
    .from("zakenrelaties")
    .select("id")
    .eq("naam", klantNaam)
    .single();

  if (!relatie) return [];

  const { data: adressen } = await supabase
    .from("partner_adressen")
    .select("id, bedrijfsnaam, straat, postcode, stad, land, is_standaard")
    .eq("partner_id", relatie.id)
    .eq("type", "levering")
    .order("is_standaard", { ascending: false });

  return (adressen ?? []).map((a) => ({
    id: a.id,
    bedrijfsnaam: a.bedrijfsnaam ?? null,
    straat: a.straat ?? "",
    postcode: a.postcode ?? "",
    stad: a.stad ?? "",
    land: a.land ?? null,
    is_standaard: a.is_standaard ?? false,
  }));
}

async function getAfroepData(klantNaam: string) {
  const supabase = await createClient();

  const { data: artikelen } = await supabase
    .from("artikelen")
    .select("nr, naam, klant_nr, p_lengte, p_breedte, p_hoogte")
    .eq("klant", klantNaam)
    .eq("type", "Pallet")
    .order("nr");

  if (!artikelen?.length) return [];

  const { data: stockData } = await supabase
    .from("pallet_stock")
    .select("pallet_nr, qty_in_stock")
    .in("pallet_nr", artikelen.map((a) => a.nr));

  const { data: lastDelivery } = await supabase
    .from("sales_delivery")
    .select("delivery_id, delivery_date, planned_date")
    .eq("customer_name", klantNaam)
    .eq("status", "Posted")
    .order("posted_at", { ascending: false })
    .limit(5);

  let vorigeLeveringRegels: Array<{ delivery_id: string; item_id: string; qty_received: number | null; qty_planned: number }> = [];
  if (lastDelivery?.length) {
    const { data: regels } = await supabase
      .from("sales_delivery_line")
      .select("delivery_id, item_id, qty_received, qty_planned")
      .in("delivery_id", lastDelivery.map((l) => l.delivery_id));
    vorigeLeveringRegels = regels ?? [];
  }

  return artikelen.map((art): ArtikelKeuze => {
    const totaal_stock = (stockData ?? [])
      .filter((s) => s.pallet_nr === art.nr)
      .reduce((sum, s) => sum + Number(s.qty_in_stock), 0);

    const vorigeRegel = vorigeLeveringRegels.find((r) => r.item_id === art.nr);
    const vorigeLev = vorigeRegel
      ? lastDelivery?.find((l) => l.delivery_id === vorigeRegel.delivery_id)
      : null;

    return {
      nr: art.nr,
      naam: art.naam,
      klant_nr: art.klant_nr ?? null,
      p_lengte: art.p_lengte,
      p_breedte: art.p_breedte,
      p_hoogte: art.p_hoogte,
      totaal_stock,
      vorige_stuks: vorigeRegel
        ? Number(vorigeRegel.qty_received ?? vorigeRegel.qty_planned)
        : null,
      vorige_datum: vorigeLev
        ? (vorigeLev.delivery_date ?? vorigeLev.planned_date)
        : null,
    };
  });
}

export default async function AfroepPage() {
  const klantNaam = await getKlantNaam();
  const [artikelen, leveradressen, ioNummers] = await Promise.all([
    klantNaam ? getAfroepData(klantNaam) : Promise.resolve([]),
    klantNaam ? getLeveradressen(klantNaam) : Promise.resolve([]),
    klantNaam ? getIoNummers(klantNaam) : Promise.resolve([]),
  ]);

  return <AfroepForm artikelen={artikelen} klantNaam={klantNaam ?? ""} leveradressen={leveradressen} ioNummers={ioNummers} />;
}
