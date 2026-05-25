import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getKlantNaam } from "@/lib/supabase/get-klant";

async function getLeveringen(klantNaam: string) {
  const supabase = await createClient();

  const { data: leveringen } = await supabase
    .from("sales_delivery")
    .select("delivery_id, customer_name, planned_date, delivery_date, status, ref, transporter_name, posted_at")
    .eq("customer_name", klantNaam)
    .eq("status", "Posted")
    .order("delivery_date", { ascending: false, nullsFirst: false })
    .limit(50);

  if (!leveringen?.length) return [];

  const { data: regels } = await supabase
    .from("sales_delivery_line")
    .select("delivery_id, item_id, item_name, qty_planned, qty_received, uom")
    .in("delivery_id", leveringen.map((l) => l.delivery_id));

  const itemIds = [...new Set((regels ?? []).map((r) => r.item_id))];
  let prijzen: Record<string, number> = {};
  if (itemIds.length > 0) {
    const { data: prijsData } = await supabase
      .from("productiekost_verkoopprijzen")
      .select("artikel_nr, verkoopprijs")
      .in("artikel_nr", itemIds);
    if (prijsData) {
      prijzen = Object.fromEntries(prijsData.map((p) => [p.artikel_nr, Number(p.verkoopprijs)]));
    }
  }

  return leveringen.map((lev) => ({
    id: lev.delivery_id,
    datum: lev.delivery_date ?? lev.planned_date,
    klant_ref: lev.ref ?? "",
    transporter: lev.transporter_name ?? "",
    regels: (regels ?? [])
      .filter((r) => r.delivery_id === lev.delivery_id)
      .map((r) => ({
        artikel_nr: r.item_id,
        naam: r.item_name,
        stuks: Number(r.qty_received ?? r.qty_planned),
        prijs_per_stuk: prijzen[r.item_id] ?? 0,
      })),
  }));
}

export default async function LeveringenPage() {
  const klantNaam = await getKlantNaam();
  const leveringen = klantNaam ? await getLeveringen(klantNaam) : [];

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <p className="text-xs font-semibold text-[#1F2328]/40 uppercase tracking-widest mb-1">Historiek</p>
        <h1 className="text-2xl font-bold text-[#1F2328]" style={{ fontFamily: 'var(--font-jakarta)' }}>
          Leveringen
        </h1>
        <p className="text-sm text-[#1F2328]/45 mt-0.5">{leveringen.length} uitgevoerde leveringen</p>
      </div>

      {leveringen.length === 0 ? (
        <div className="bg-white border border-[#1F2328]/10 rounded-xl p-12 text-center">
          <p className="text-[#1F2328]/35 text-sm">Geen leveringen gevonden.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {leveringen.map((lev) => {
            const totaal = lev.regels.reduce((s, r) => s + r.stuks * r.prijs_per_stuk, 0);
            const totaleStuks = lev.regels.reduce((s, r) => s + r.stuks, 0);
            return (
              <div key={lev.id} className="bg-white border border-[#1F2328]/10 rounded-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F2328]/6 flex-wrap gap-4">
                  <div className="flex items-center gap-6 flex-wrap">
                    <div>
                      <p className="text-xs text-[#1F2328]/35 mb-0.5">Levering</p>
                      <p className="text-sm font-bold text-[#1F2328]">{lev.id}</p>
                    </div>
                    {lev.datum && (
                      <div>
                        <p className="text-xs text-[#1F2328]/35 mb-0.5">Datum</p>
                        <p className="text-sm font-semibold text-[#1F2328]">
                          {new Date(lev.datum).toLocaleDateString("nl-BE", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                    )}
                    {lev.klant_ref && (
                      <div>
                        <p className="text-xs text-[#1F2328]/35 mb-0.5">Uw referentie</p>
                        <p className="text-sm font-semibold text-[#1F2328]">{lev.klant_ref}</p>
                      </div>
                    )}
                    {lev.transporter && (
                      <div>
                        <p className="text-xs text-[#1F2328]/35 mb-0.5">Transporteur</p>
                        <p className="text-sm text-[#1F2328]/65">{lev.transporter}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {totaal > 0 && (
                      <div className="text-right">
                        <p className="text-xs text-[#1F2328]/35 mb-0.5">Totaal excl. BTW</p>
                        <p className="text-sm font-bold text-[#1F2328]">
                          € {totaal.toLocaleString("nl-BE", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    )}
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#2E7D32]/10 border border-[#2E7D32]/20 text-[#2E7D32]">
                      ✓ Geleverd
                    </span>
                  </div>
                </div>

                {/* Artikellijst */}
                <div className="px-6 py-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs font-semibold uppercase tracking-wider text-[#1F2328]/35 border-b border-[#1F2328]/6">
                        <th className="text-left pb-2">Artikel</th>
                        <th className="text-right pb-2">Stuks</th>
                        {totaal > 0 && (
                          <>
                            <th className="text-right pb-2">Prijs/st</th>
                            <th className="text-right pb-2">Totaal</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {lev.regels.map((r, i) => (
                        <tr key={i} className="border-b border-[#1F2328]/4 last:border-0">
                          <td className="py-2.5 text-[#1F2328] font-medium">{r.naam}</td>
                          <td className="py-2.5 text-right text-[#1F2328]/70">
                            {r.stuks.toLocaleString("nl-BE")}
                          </td>
                          {totaal > 0 && (
                            <>
                              <td className="py-2.5 text-right text-[#1F2328]/55">
                                {r.prijs_per_stuk > 0 ? `€ ${r.prijs_per_stuk.toFixed(4)}` : "—"}
                              </td>
                              <td className="py-2.5 text-right font-semibold text-[#1F2328]">
                                {r.prijs_per_stuk > 0
                                  ? `€ ${(r.stuks * r.prijs_per_stuk).toLocaleString("nl-BE", { minimumFractionDigits: 2 })}`
                                  : "—"}
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                    {totaal > 0 && (
                      <tfoot>
                        <tr className="border-t border-[#1F2328]/10">
                          <td className="pt-3 text-xs text-[#1F2328]/35">
                            {totaleStuks.toLocaleString("nl-BE")} stuks
                          </td>
                          <td colSpan={2} className="pt-3 text-right text-xs font-semibold uppercase tracking-wider text-[#1F2328]/35">
                            Totaal excl. BTW
                          </td>
                          <td className="pt-3 text-right font-bold text-[#1F2328]">
                            € {totaal.toLocaleString("nl-BE", { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>

                <div className="px-6 pb-4 border-t border-[#1F2328]/4 pt-3">
                  <Link
                    href={`/portaal/afroep?herhaal=${lev.id}`}
                    className="inline-flex items-center gap-1.5 text-xs text-[#1D4E89] hover:underline font-medium"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Herhaal deze levering
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
