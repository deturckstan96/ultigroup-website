import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getKlantNaam } from "@/lib/supabase/get-klant";
import VoorspellingCards from "./VoorspellingCards";

export type DagPunt = {
  datum: string;
  historisch: number | null;
  forecast: number | null;
};

export type ArtikelVoorspelling = {
  nr: string;
  naam: string;
  huidigStock: number;
  minstock: number;
  gemDagVerbruik: number;
  gemMaandVerbruik: number;
  trend: "stijgend" | "dalend" | "stabiel";
  dagenVoorraad: number | null;
  stockbreukDatum: string | null;
  aanbevolenAfroep: number;
  status: "ok" | "waarschuwing" | "kritiek";
  openAfroepStuks: number;
  openAfroepDatum: string | null;
  chartData: DagPunt[];
  heeftData: boolean;
  todayStr: string;
};

async function getVoorspellingData(klantNaam: string): Promise<ArtikelVoorspelling[]> {
  const supabase = await createClient();

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const todayStr = now.toISOString().split("T")[0];

  const d90ago = new Date(now);
  d90ago.setDate(d90ago.getDate() - 90);
  const vanaf90 = d90ago.toISOString().split("T")[0];

  const { data: artikelen } = await supabase
    .from("artikelen")
    .select("nr, naam, minstock")
    .eq("klant", klantNaam)
    .eq("type", "Pallet")
    .order("nr");

  if (!artikelen?.length) return [];

  const { data: stockData } = await supabase
    .from("pallet_stock")
    .select("pallet_nr, qty_in_stock")
    .in("pallet_nr", artikelen.map((a) => a.nr));

  const { data: leveringen } = await supabase
    .from("sales_delivery")
    .select("delivery_id, delivery_date, planned_date")
    .eq("customer_name", klantNaam)
    .eq("status", "Posted")
    .gte("delivery_date", vanaf90);

  let leveringRegels: Array<{
    delivery_id: string;
    item_id: string;
    qty_received: number | null;
    qty_planned: number;
  }> = [];
  if (leveringen?.length) {
    const { data: regels } = await supabase
      .from("sales_delivery_line")
      .select("delivery_id, item_id, qty_received, qty_planned")
      .in("delivery_id", leveringen.map((l) => l.delivery_id));
    leveringRegels = regels ?? [];
  }

  const { data: openOrders } = await supabase
    .from("sales_table")
    .select("sales_id, requested_date")
    .eq("customer_name", klantNaam)
    .in("status", ["Draft", "Confirmed", "Partially Delivered"]);

  let openRegels: Array<{ sales_id: string; item_id: string; qty: number }> = [];
  if (openOrders?.length) {
    const { data: regels } = await supabase
      .from("sales_line")
      .select("sales_id, item_id, qty")
      .in("sales_id", openOrders.map((o) => o.sales_id));
    openRegels = regels ?? [];
  }

  return artikelen.map((art) => {
    const huidigStock = (stockData ?? [])
      .filter((s) => s.pallet_nr === art.nr)
      .reduce((sum, s) => sum + Number(s.qty_in_stock), 0);

    // Leveringen per dag voor dit artikel
    const levPerDag: Record<string, number> = {};
    for (const lev of leveringen ?? []) {
      const datum = lev.delivery_date ?? lev.planned_date;
      if (!datum) continue;
      const qty = leveringRegels
        .filter((r) => r.delivery_id === lev.delivery_id && r.item_id === art.nr)
        .reduce((s, r) => s + Number(r.qty_received ?? r.qty_planned ?? 0), 0);
      if (qty > 0) levPerDag[datum] = (levPerDag[datum] ?? 0) + qty;
    }

    const totaal90 = Object.values(levPerDag).reduce((s, q) => s + q, 0);
    const heeftData = totaal90 > 0;
    const gemDagVerbruik = totaal90 / 90;
    const gemMaandVerbruik = Math.round(gemDagVerbruik * 30);

    // Trend: laatste 30 dagen vs 31–60 dagen
    const d30ago = new Date(now);
    d30ago.setDate(d30ago.getDate() - 30);
    const d30Str = d30ago.toISOString().split("T")[0];
    const d60ago = new Date(now);
    d60ago.setDate(d60ago.getDate() - 60);
    const d60Str = d60ago.toISOString().split("T")[0];

    const last30 = Object.entries(levPerDag).filter(([d]) => d > d30Str).reduce((s, [, q]) => s + q, 0);
    const prev30 = Object.entries(levPerDag).filter(([d]) => d > d60Str && d <= d30Str).reduce((s, [, q]) => s + q, 0);
    let trend: "stijgend" | "dalend" | "stabiel" = "stabiel";
    if (heeftData && prev30 > 0) {
      if (last30 > prev30 * 1.15) trend = "stijgend";
      else if (last30 < prev30 * 0.85) trend = "dalend";
    }

    const dagenVoorraad = gemDagVerbruik > 0 ? huidigStock / gemDagVerbruik : null;

    let stockbreukDatum: string | null = null;
    if (dagenVoorraad !== null) {
      const breuk = new Date(now);
      breuk.setDate(breuk.getDate() + Math.floor(dagenVoorraad));
      stockbreukDatum = breuk.toISOString().split("T")[0];
    }

    let status: "ok" | "waarschuwing" | "kritiek" = "ok";
    if (dagenVoorraad !== null) {
      if (dagenVoorraad < 7) status = "kritiek";
      else if (dagenVoorraad < 14) status = "waarschuwing";
    }

    // Open afroep voor dit artikel
    const openVoorArtikel = openRegels.filter((r) => r.item_id === art.nr);
    const openAfroepStuks = openVoorArtikel.reduce((s, r) => s + Number(r.qty), 0);
    const openAfroepOrder = openVoorArtikel[0]
      ? openOrders?.find((o) => o.sales_id === openVoorArtikel[0].sales_id)
      : null;
    const openAfroepDatum = openAfroepOrder?.requested_date ?? null;

    // Aanbevolen afroep: 2 maanden verbruik als target, minus stock en openstaande afroepen
    const minstock = Number(art.minstock ?? 0);
    const target = Math.max(minstock * 2, gemMaandVerbruik * 2);
    const nodig = Math.max(0, target - huidigStock - openAfroepStuks);
    const aanbevolenAfroep = Math.ceil(nodig / 100) * 100;

    // Chart data: -30 tot +30 dagen
    const chartData: DagPunt[] = [];
    for (let offset = -30; offset <= 30; offset++) {
      const d = new Date(now);
      d.setDate(d.getDate() + offset);
      const dateStr = d.toISOString().split("T")[0];

      if (offset <= 0) {
        const leveringenNa = Object.entries(levPerDag)
          .filter(([dl]) => dl > dateStr && dl <= todayStr)
          .reduce((s, [, q]) => s + q, 0);
        const verbruikt = gemDagVerbruik * Math.abs(offset);
        const geschat = Math.max(0, Math.round(huidigStock + leveringenNa - verbruikt));
        chartData.push({
          datum: dateStr,
          historisch: geschat,
          forecast: offset === 0 ? Math.round(huidigStock) : null,
        });
      } else {
        let forecastQty = huidigStock - gemDagVerbruik * offset;
        if (openAfroepDatum && openAfroepDatum > todayStr && openAfroepDatum <= dateStr) {
          forecastQty += openAfroepStuks;
        }
        chartData.push({
          datum: dateStr,
          historisch: null,
          forecast: Math.max(0, Math.round(forecastQty)),
        });
      }
    }

    return {
      nr: art.nr,
      naam: art.naam,
      huidigStock,
      minstock,
      gemDagVerbruik,
      gemMaandVerbruik,
      trend,
      dagenVoorraad,
      stockbreukDatum,
      aanbevolenAfroep,
      status,
      openAfroepStuks,
      openAfroepDatum,
      chartData,
      heeftData,
      todayStr,
    };
  });
}

export default async function VoorspellingPage() {
  const klantNaam = await getKlantNaam();
  const voorspellingen = klantNaam ? await getVoorspellingData(klantNaam) : [];

  const kritiek = voorspellingen.filter((v) => v.status === "kritiek");
  const waarschuwing = voorspellingen.filter((v) => v.status === "waarschuwing");

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <p className="text-xs font-semibold text-[#1F2328]/40 uppercase tracking-widest mb-1">Analyse</p>
        <h1 className="text-2xl font-bold text-[#1F2328]" style={{ fontFamily: "var(--font-jakarta)" }}>
          Verbruik voorspellen
        </h1>
        <p className="text-sm text-[#1F2328]/45 mt-0.5">
          Stockbreuk vroeg detecteren op basis van historisch verbruik
        </p>
      </div>

      {/* Meldingen */}
      {(kritiek.length > 0 || waarschuwing.length > 0) && (
        <div className="space-y-2 mb-6">
          {kritiek.map((v) => (
            <div key={v.nr} className="flex items-center justify-between bg-red-50 border border-red-200 rounded-xl px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-red-800">
                    {v.nr} — verwachte stockbreuk op{" "}
                    {v.stockbreukDatum
                      ? new Date(v.stockbreukDatum + "T00:00:00").toLocaleDateString("nl-BE", { day: "numeric", month: "long" })
                      : "—"}
                  </p>
                  <p className="text-xs text-red-600">
                    Nog {v.dagenVoorraad !== null ? Math.floor(v.dagenVoorraad) : "?"} dagen voorraad
                    {v.aanbevolenAfroep > 0 && ` · Aanbevolen: ${v.aanbevolenAfroep.toLocaleString("nl-BE")} st afroepen`}
                  </p>
                </div>
              </div>
              <Link
                href={`/portaal/afroep?artikel=${v.nr}`}
                className="shrink-0 ml-4 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Afroep plaatsen
              </Link>
            </div>
          ))}
          {waarschuwing.map((v) => (
            <div key={v.nr} className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-amber-800">
                    {v.nr} — {v.dagenVoorraad !== null ? Math.floor(v.dagenVoorraad) : "?"} dagen voorraad resterend
                  </p>
                  <p className="text-xs text-amber-600">
                    Verwachte stockbreuk op{" "}
                    {v.stockbreukDatum
                      ? new Date(v.stockbreukDatum + "T00:00:00").toLocaleDateString("nl-BE", { day: "numeric", month: "long" })
                      : "—"}
                    {v.aanbevolenAfroep > 0 && ` · Aanbevolen: ${v.aanbevolenAfroep.toLocaleString("nl-BE")} st`}
                  </p>
                </div>
              </div>
              <Link
                href={`/portaal/afroep?artikel=${v.nr}`}
                className="shrink-0 ml-4 px-3 py-1.5 bg-amber-600 text-white text-xs font-semibold rounded-lg hover:bg-amber-700 transition-colors"
              >
                Afroep plaatsen
              </Link>
            </div>
          ))}
        </div>
      )}

      {voorspellingen.length === 0 ? (
        <div className="bg-white border border-dashed border-[#1F2328]/15 rounded-xl p-12 text-center">
          <p className="text-[#1F2328]/35 text-sm">Geen palletartikelen gevonden voor uw account.</p>
        </div>
      ) : (
        <VoorspellingCards voorspellingen={voorspellingen} />
      )}
    </div>
  );
}
