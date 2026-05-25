import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getKlantNaam } from "@/lib/supabase/get-klant";

type SalesStatus = "Draft" | "Confirmed" | "Partially Delivered" | "Fully Delivered" | "Cancelled";

const statusMap: Record<SalesStatus, { label: string; bg: string; color: string }> = {
  Draft:                { label: "Ingediend",      bg: "bg-[#1D4E89]/8",  color: "text-[#1D4E89]"   },
  Confirmed:            { label: "Bevestigd",      bg: "bg-amber-50",     color: "text-amber-700"    },
  "Partially Delivered":{ label: "In behandeling", bg: "bg-blue-50",      color: "text-blue-700"     },
  "Fully Delivered":    { label: "Geleverd",       bg: "bg-[#2E7D32]/8",  color: "text-[#2E7D32]"   },
  Cancelled:            { label: "Geannuleerd",    bg: "bg-[#1F2328]/6",  color: "text-[#1F2328]/50" },
};

const openStatuses: SalesStatus[] = ["Draft", "Confirmed", "Partially Delivered"];

async function getDashboardData(klantNaam: string) {
  const supabase = await createClient();

  // Stock
  const { data: artikelen } = await supabase
    .from("artikelen")
    .select("nr, naam, minstock")
    .eq("klant", klantNaam)
    .eq("type", "Pallet");

  const artikelNrs = (artikelen ?? []).map((a) => a.nr);
  let stockTotaal: Record<string, { naam: string; qty: number; min: number }> = {};

  if (artikelNrs.length > 0) {
    const { data: stockData } = await supabase
      .from("pallet_stock")
      .select("pallet_nr, qty_in_stock")
      .in("pallet_nr", artikelNrs);

    for (const art of artikelen ?? []) {
      const qty = (stockData ?? [])
        .filter((s) => s.pallet_nr === art.nr)
        .reduce((s, r) => s + Number(r.qty_in_stock), 0);
      stockTotaal[art.nr] = { naam: art.naam, qty, min: Number(art.minstock ?? 0) };
    }
  }

  // Laatste levering
  const { data: leveringen } = await supabase
    .from("sales_delivery")
    .select("delivery_id, delivery_date, planned_date, ref")
    .eq("customer_name", klantNaam)
    .eq("status", "Posted")
    .order("posted_at", { ascending: false })
    .limit(1);

  const { data: leveringRegels } = leveringen?.[0]
    ? await supabase
        .from("sales_delivery_line")
        .select("item_id, item_name, qty_received, qty_planned")
        .eq("delivery_id", leveringen[0].delivery_id)
    : { data: [] };

  // Recente afroepen
  const { data: recenteOrders } = await supabase
    .from("sales_table")
    .select("sales_id, status, requested_date, created_at")
    .eq("customer_name", klantNaam)
    .order("created_at", { ascending: false })
    .limit(10);

  const recenteAfroepen = (recenteOrders ?? []).map((o) => ({
    id: o.sales_id,
    status: o.status as SalesStatus,
    aangevraagd: o.created_at,
    gewenste_datum: o.requested_date,
  }));

  const aantalOpen = recenteAfroepen.filter((a) => openStatuses.includes(a.status)).length;

  return { stockTotaal, leveringen: leveringen ?? [], leveringRegels: leveringRegels ?? [], recenteAfroepen, aantalOpen };
}

export default async function DashboardPage() {
  const klantNaam = await getKlantNaam();
  const { stockTotaal, leveringen, leveringRegels, recenteAfroepen, aantalOpen } = klantNaam
    ? await getDashboardData(klantNaam)
    : { stockTotaal: {}, leveringen: [], leveringRegels: [], recenteAfroepen: [], aantalOpen: 0 };

  const totaleStuks = Object.values(stockTotaal).reduce((s, a) => s + a.qty, 0);
  const laagsteStock = Object.values(stockTotaal).find((a) => a.min > 0 && a.qty < a.min);
  const laatsteLevering = leveringen[0];

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <p className="text-xs font-semibold text-[#1F2328]/40 uppercase tracking-widest mb-1">Welkom terug</p>
        <h1 className="text-2xl font-bold text-[#1F2328]">{klantNaam ?? "Portaal"}</h1>
        <p className="text-sm text-[#1F2328]/50 mt-0.5">
          {new Date().toLocaleDateString("nl-BE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* KPI kaarten */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-[#1F2328]/10 rounded-xl p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#1F2328]/40 mb-2">Totaal in stock</p>
          <p className="text-3xl font-bold text-[#1F2328]">{totaleStuks.toLocaleString("nl-BE")}</p>
          <p className="text-xs text-[#1F2328]/40 mt-1">stuks over alle locaties</p>
        </div>
        <div className="bg-white border border-[#1F2328]/10 rounded-xl p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#1F2328]/40 mb-2">Open afroepen</p>
          <p className="text-3xl font-bold text-[#1F2328]">{aantalOpen}</p>
          <p className="text-xs text-[#1F2328]/40 mt-1">in behandeling</p>
        </div>
        <div className="bg-white border border-[#1F2328]/10 rounded-xl p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#1F2328]/40 mb-2">Laatste levering</p>
          {laatsteLevering ? (
            <>
              <p className="text-lg font-bold text-[#1F2328]">
                {new Date(laatsteLevering.delivery_date ?? laatsteLevering.planned_date).toLocaleDateString("nl-BE", { day: "numeric", month: "short" })}
              </p>
              <p className="text-xs text-[#1F2328]/40 mt-1">{laatsteLevering.delivery_id}</p>
            </>
          ) : (
            <p className="text-lg font-bold text-[#1F2328]/40">—</p>
          )}
        </div>
        <div className={`border rounded-xl p-5 ${laagsteStock ? "bg-amber-50 border-amber-200" : "bg-green-50 border-green-200"}`}>
          <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${laagsteStock ? "text-amber-600" : "text-green-600"}`}>
            Stock status
          </p>
          <p className={`text-lg font-bold ${laagsteStock ? "text-amber-700" : "text-green-700"}`}>
            {laagsteStock ? "Let op" : "OK"}
          </p>
          <p className={`text-xs mt-1 ${laagsteStock ? "text-amber-600" : "text-green-600"}`}>
            {laagsteStock ? `${laagsteStock.naam} laag` : "Alle artikelen voldoende"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock samenvatting */}
        <div className="bg-white border border-[#1F2328]/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#1F2328]">Mijn stock</h2>
            <Link href="/portaal/stock" className="text-xs text-[#1D4E89] hover:underline font-medium">Alles bekijken →</Link>
          </div>
          {Object.keys(stockTotaal).length === 0 ? (
            <p className="text-sm text-[#1F2328]/40">Geen stockartikelen.</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(stockTotaal).map(([nr, art]) => {
                const pct = art.min > 0 ? Math.min(100, Math.round((art.qty / (art.min * 2)) * 100)) : 60;
                const laag = art.min > 0 && art.qty < art.min;
                return (
                  <div key={nr}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#1F2328]/80 font-medium">{art.naam}</span>
                      <span className={`font-semibold ${laag ? "text-amber-600" : "text-[#1F2328]"}`}>
                        {art.qty.toLocaleString("nl-BE")} st
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#F5F7FA] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${laag ? "bg-amber-400" : "bg-[#1D4E89]"}`}
                        style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recente afroepen */}
        <div className="bg-white border border-[#1F2328]/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#1F2328]">Recente afroepen</h2>
            <Link href="/portaal/afroepen" className="text-xs text-[#1D4E89] hover:underline font-medium">Alles bekijken →</Link>
          </div>
          {recenteAfroepen.length === 0 ? (
            <p className="text-sm text-[#1F2328]/40 mb-4">Nog geen afroepen geplaatst.</p>
          ) : (
            <div className="space-y-3 mb-4">
              {recenteAfroepen.slice(0, 3).map((a) => {
                const s = statusMap[a.status] ?? statusMap.Draft;
                return (
                  <div key={a.id} className="flex items-center justify-between py-2 border-b border-[#1F2328]/4 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-[#1F2328]">{a.id}</p>
                      <p className="text-xs text-[#1F2328]/40">
                        {a.gewenste_datum
                          ? `Levering ${new Date(a.gewenste_datum).toLocaleDateString("nl-BE")}`
                          : a.aangevraagd
                          ? new Date(a.aangevraagd).toLocaleDateString("nl-BE")
                          : "—"}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border border-current/20 ${s.bg} ${s.color}`}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          <Link href="/portaal/afroep"
            className="flex items-center justify-center gap-1.5 w-full py-2 border border-dashed border-[#1F2328]/15 rounded-lg text-sm text-[#1F2328]/50 hover:border-[#1D4E89] hover:text-[#1D4E89] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nieuwe afroep plaatsen
          </Link>
        </div>
      </div>

      {/* Laatste levering */}
      {laatsteLevering && (
        <div className="bg-white border border-[#1F2328]/10 rounded-xl p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#1F2328]">Laatste levering</h2>
            <Link href="/portaal/leveringen" className="text-xs text-[#1D4E89] hover:underline font-medium">Volledige historiek →</Link>
          </div>
          <div className="flex items-start gap-4 flex-wrap">
            <div className="min-w-[120px]">
              <p className="text-xs text-[#1F2328]/40 mb-0.5">Datum</p>
              <p className="text-sm font-semibold text-[#1F2328]">
                {new Date(laatsteLevering.delivery_date ?? laatsteLevering.planned_date).toLocaleDateString("nl-BE", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            <div className="min-w-[120px]">
              <p className="text-xs text-[#1F2328]/40 mb-0.5">Referentie</p>
              <p className="text-sm font-semibold text-[#1F2328]">{laatsteLevering.delivery_id}</p>
            </div>
            {laatsteLevering.ref && (
              <div className="min-w-[120px]">
                <p className="text-xs text-[#1F2328]/40 mb-0.5">Klant ref</p>
                <p className="text-sm font-semibold text-[#1F2328]">{laatsteLevering.ref}</p>
              </div>
            )}
            <div className="flex-1">
              <p className="text-xs text-[#1F2328]/40 mb-0.5">Artikelen</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {leveringRegels.map((r, i) => (
                  <span key={i} className="text-xs bg-[#F5F7FA] text-[#1F2328]/80 rounded-full px-3 py-1">
                    {Number(r.qty_received ?? r.qty_planned).toLocaleString("nl-BE")}× {r.item_name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
