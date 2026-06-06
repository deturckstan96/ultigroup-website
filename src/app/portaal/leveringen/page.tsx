import { createClient } from "@/lib/supabase/server";
import { getKlantNaam } from "@/lib/supabase/get-klant";
import LeveringenAccordion from "./LeveringenAccordion";

async function getLeveringen(klantNaam: string) {
  const supabase = await createClient();

  const { data: leveringen } = await supabase
    .from("sales_delivery")
    .select("delivery_id, planned_date, delivery_date, status")
    .eq("customer_name", klantNaam)
    .eq("status", "Posted")
    .order("delivery_date", { ascending: false, nullsFirst: false })
    .limit(200);

  if (!leveringen?.length) return [];

  const { data: regels } = await supabase
    .from("sales_delivery_line")
    .select("delivery_id, item_name, qty_planned, qty_received")
    .in("delivery_id", leveringen.map((l) => l.delivery_id));

  return leveringen.map((lev) => ({
    id: lev.delivery_id,
    datum: lev.delivery_date ?? lev.planned_date ?? "",
    regels: (regels ?? [])
      .filter((r) => r.delivery_id === lev.delivery_id)
      .map((r) => ({
        naam: r.item_name,
        stuks: Number(r.qty_received ?? r.qty_planned ?? 0),
      })),
  }));
}

function groepeerPerMaand(leveringen: Awaited<ReturnType<typeof getLeveringen>>) {
  const map = new Map<string, typeof leveringen>();

  for (const lev of leveringen) {
    if (!lev.datum) continue;
    const d = new Date(lev.datum);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(lev);
  }

  return Array.from(map.entries()).map(([key, levs]) => {
    const [year, month] = key.split("-");
    const label = new Date(Number(year), Number(month) - 1, 1)
      .toLocaleDateString("nl-BE", { month: "long", year: "numeric" });
    const totaalStuks = levs.flatMap((l) => l.regels).reduce((s, r) => s + r.stuks, 0);
    return { key, label, leveringen: levs, totaalStuks };
  });
}

export default async function LeveringenPage() {
  const klantNaam = await getKlantNaam();
  const leveringen = klantNaam ? await getLeveringen(klantNaam) : [];
  const maanden = groepeerPerMaand(leveringen);
  const totaalLeveringen = leveringen.length;

  return (
    <div>
      <div className="px-8 py-6 border-b border-[#E1DDD0]" style={{ background: "#F4F1E8" }}>
        <p className="text-xs font-semibold text-[#14352A]/40 uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-display)" }}>Historiek</p>
        <h1 className="text-2xl font-bold text-[#14352A]" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
          Leveringen
        </h1>
        <p className="text-sm text-[#1F2328]/45 mt-0.5">
          {totaalLeveringen} leveringen · {maanden.length} maanden
        </p>
      </div>

      <div className="p-8 max-w-3xl">
        {maanden.length === 0 ? (
          <div className="bg-white border border-[#E1DDD0] p-12 text-center">
            <p className="text-[#1F2328]/35 text-sm">Geen leveringen gevonden.</p>
          </div>
        ) : (
          <LeveringenAccordion maanden={maanden} />
        )}
      </div>
    </div>
  );
}
