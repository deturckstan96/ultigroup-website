import { createClient } from "@/lib/supabase/server";
import { getKlantNaam } from "@/lib/supabase/get-klant";
import RapportCharts from "./RapportCharts";

export type MaandData = {
  maand: string;  // "2025-01"
  label: string;  // "Jan '25"
  stuks: number;
  leveringen: number;
};

export type TopArtikel = {
  nr: string;
  naam: string;
  stuks: number;
  leveringen: number;
};

async function getRapportData(klantNaam: string) {
  const supabase = await createClient();

  const vanafDatum = new Date();
  vanafDatum.setMonth(vanafDatum.getMonth() - 11);
  vanafDatum.setDate(1);
  const vanaf = vanafDatum.toISOString().split("T")[0];

  const { data: leveringen } = await supabase
    .from("sales_delivery")
    .select("delivery_id, delivery_date, planned_date")
    .eq("customer_name", klantNaam)
    .eq("status", "Posted")
    .gte("delivery_date", vanaf)
    .order("delivery_date", { ascending: true });

  if (!leveringen?.length) {
    return { maandData: [], topArtikelen: [], totaalStuks: 0, totaalLeveringen: 0, gemiddeldPerMaand: 0 };
  }

  const { data: regels } = await supabase
    .from("sales_delivery_line")
    .select("delivery_id, item_id, item_name, qty_received, qty_planned")
    .in("delivery_id", leveringen.map((l) => l.delivery_id));

  // Bouw maand → stuks map
  const maandMap: Record<string, { stuks: number; leveringen: Set<string> }> = {};
  const artikelMap: Record<string, { naam: string; stuks: number; leveringen: Set<string> }> = {};

  for (const lev of leveringen) {
    const datumStr = lev.delivery_date ?? lev.planned_date;
    if (!datumStr) continue;
    const d = new Date(datumStr);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

    if (!maandMap[key]) maandMap[key] = { stuks: 0, leveringen: new Set() };
    maandMap[key].leveringen.add(lev.delivery_id);

    const levRegels = (regels ?? []).filter((r) => r.delivery_id === lev.delivery_id);
    for (const r of levRegels) {
      const qty = Number(r.qty_received ?? r.qty_planned ?? 0);
      maandMap[key].stuks += qty;

      if (!artikelMap[r.item_id]) artikelMap[r.item_id] = { naam: r.item_name ?? r.item_id, stuks: 0, leveringen: new Set() };
      artikelMap[r.item_id].stuks += qty;
      artikelMap[r.item_id].leveringen.add(lev.delivery_id);
    }
  }

  // Vul alle 12 maanden in (ook lege)
  const maandData: MaandData[] = [];
  const maandNamen = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
  for (let i = 0; i < 12; i++) {
    const d = new Date(vanafDatum);
    d.setMonth(vanafDatum.getMonth() + i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const entry = maandMap[key];
    maandData.push({
      maand: key,
      label: `${maandNamen[d.getMonth()]} '${String(d.getFullYear()).slice(2)}`,
      stuks: entry?.stuks ?? 0,
      leveringen: entry?.leveringen.size ?? 0,
    });
  }

  const topArtikelen: TopArtikel[] = Object.entries(artikelMap)
    .map(([nr, v]) => ({ nr, naam: v.naam, stuks: v.stuks, leveringen: v.leveringen.size }))
    .sort((a, b) => b.stuks - a.stuks)
    .slice(0, 6);

  const totaalStuks = maandData.reduce((s, m) => s + m.stuks, 0);
  const totaalLeveringen = leveringen.length;
  const maandenMetData = maandData.filter((m) => m.stuks > 0).length;
  const gemiddeldPerMaand = maandenMetData > 0 ? Math.round(totaalStuks / maandenMetData) : 0;

  return { maandData, topArtikelen, totaalStuks, totaalLeveringen, gemiddeldPerMaand };
}

export default async function RapportPage() {
  const klantNaam = await getKlantNaam();
  const data = klantNaam ? await getRapportData(klantNaam) : {
    maandData: [], topArtikelen: [], totaalStuks: 0, totaalLeveringen: 0, gemiddeldPerMaand: 0,
  };

  return (
    <div>
      <div className="px-8 py-6 border-b border-[#E1DDD0]" style={{ background: "#F4F1E8" }}>
        <p className="text-xs font-semibold text-[#14352A]/40 uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-display)" }}>Analyse</p>
        <h1 className="text-2xl font-bold text-[#14352A]" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
          Rapport
        </h1>
        <p className="text-sm text-[#1F2328]/45 mt-0.5">Overzicht van de laatste 12 maanden</p>
      </div>
    <div className="p-8 max-w-5xl">

      {/* KPI rij */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-[#1F2328]/10 rounded-xl px-5 py-4">
          <p className="text-xs text-[#1F2328]/40 uppercase tracking-widest mb-1">Totaal afgenomen</p>
          <p className="text-2xl font-bold text-[#1F2328]" style={{ fontFamily: "var(--font-display)" }}>
            {data.totaalStuks.toLocaleString("nl-BE")}
            <span className="text-sm font-normal text-[#1F2328]/35 ml-1">st</span>
          </p>
          <p className="text-xs text-[#1F2328]/35 mt-0.5">laatste 12 maanden</p>
        </div>
        <div className="bg-white border border-[#1F2328]/10 rounded-xl px-5 py-4">
          <p className="text-xs text-[#1F2328]/40 uppercase tracking-widest mb-1">Gem. per maand</p>
          <p className="text-2xl font-bold text-[#1F2328]" style={{ fontFamily: "var(--font-display)" }}>
            {data.gemiddeldPerMaand.toLocaleString("nl-BE")}
            <span className="text-sm font-normal text-[#1F2328]/35 ml-1">st</span>
          </p>
          <p className="text-xs text-[#1F2328]/35 mt-0.5">over actieve maanden</p>
        </div>
        <div className="bg-white border border-[#1F2328]/10 rounded-xl px-5 py-4">
          <p className="text-xs text-[#1F2328]/40 uppercase tracking-widest mb-1">Leveringen</p>
          <p className="text-2xl font-bold text-[#1F2328]" style={{ fontFamily: "var(--font-display)" }}>
            {data.totaalLeveringen}
          </p>
          <p className="text-xs text-[#1F2328]/35 mt-0.5">afgehandeld dit jaar</p>
        </div>
      </div>

      <RapportCharts maandData={data.maandData} topArtikelen={data.topArtikelen} />
    </div>
    </div>
  );
}