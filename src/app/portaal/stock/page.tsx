import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getKlantNaam } from "@/lib/supabase/get-klant";

async function getStock(klantNaam: string) {
  const supabase = await createClient();

  const { data: artikelen } = await supabase
    .from("artikelen")
    .select("nr, naam, p_lengte, p_breedte, p_hoogte, minstock, klantref")
    .eq("klant", klantNaam)
    .eq("type", "Pallet")
    .order("nr");

  if (!artikelen?.length) return [];

  const { data: stockData } = await supabase
    .from("pallet_stock")
    .select("pallet_nr, qty_in_stock")
    .in("pallet_nr", artikelen.map((a) => a.nr));

  return artikelen.map((art) => {
    const totaal = (stockData ?? [])
      .filter((s) => s.pallet_nr === art.nr)
      .reduce((s, r) => s + Number(r.qty_in_stock), 0);
    const min = Number(art.minstock ?? 0);
    return {
      nr: art.nr,
      naam: art.naam,
      p_lengte: art.p_lengte,
      p_breedte: art.p_breedte,
      p_hoogte: art.p_hoogte,
      klantref: art.klantref,
      min,
      totaal,
      laag: min > 0 && totaal < min,
      pct: min > 0 ? Math.min(100, Math.round((totaal / min) * 100)) : null,
    };
  });
}

export default async function StockPage() {
  const klantNaam = await getKlantNaam();
  const items = klantNaam ? await getStock(klantNaam) : [];

  const totaalStuks = items.reduce((s, a) => s + a.totaal, 0);
  const aantalLaag = items.filter((a) => a.laag).length;

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs font-semibold text-[#1F2328]/40 uppercase tracking-widest mb-1">Live overzicht</p>
          <h1 className="text-2xl font-bold text-[#1F2328]" style={{ fontFamily: 'var(--font-jakarta)' }}>
            Mijn palletten
          </h1>
        </div>
        <Link
          href="/portaal/afroep"
          className="flex items-center gap-2 px-4 py-2 bg-[#1D4E89] text-white text-sm font-semibold rounded-lg hover:bg-[#163d6e] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nieuwe afroep
        </Link>
      </div>

      {/* Samenvatting */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-[#1F2328]/10 rounded-xl px-5 py-4">
          <p className="text-xs text-[#1F2328]/40 uppercase tracking-widest mb-1">Artikelen</p>
          <p className="text-2xl font-bold text-[#1F2328]" style={{ fontFamily: 'var(--font-jakarta)' }}>{items.length}</p>
        </div>
        <div className="bg-white border border-[#1F2328]/10 rounded-xl px-5 py-4">
          <p className="text-xs text-[#1F2328]/40 uppercase tracking-widest mb-1">Totaal in stock</p>
          <p className="text-2xl font-bold text-[#1F2328]" style={{ fontFamily: 'var(--font-jakarta)' }}>
            {totaalStuks.toLocaleString("nl-BE")}
            <span className="text-sm font-normal text-[#1F2328]/35 ml-1">st</span>
          </p>
        </div>
        <div className={`rounded-xl px-5 py-4 border ${aantalLaag > 0 ? "bg-amber-50 border-amber-200" : "bg-[#2E7D32]/6 border-[#2E7D32]/20"}`}>
          <p className={`text-xs uppercase tracking-widest mb-1 ${aantalLaag > 0 ? "text-amber-600" : "text-[#2E7D32]"}`}>
            Status
          </p>
          <p className={`text-2xl font-bold ${aantalLaag > 0 ? "text-amber-700" : "text-[#2E7D32]"}`}
            style={{ fontFamily: 'var(--font-jakarta)' }}>
            {aantalLaag > 0 ? `${aantalLaag} laag` : "Alles OK"}
          </p>
        </div>
      </div>

      {/* Tabel */}
      {items.length === 0 ? (
        <div className="bg-white border border-[#1F2328]/10 rounded-xl p-12 text-center">
          <p className="text-[#1F2328]/35 text-sm">Geen palletartikelen gevonden.</p>
        </div>
      ) : (
        <div className="bg-white border border-[#1F2328]/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1F2328]/8">
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35">
                  Artikel
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 hidden md:table-cell">
                  Afmetingen
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 hidden lg:table-cell">
                  Klant ref
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 w-48 hidden md:table-cell">
                  Voorraad
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35">
                  In stock
                </th>
                <th className="px-4 py-3 w-10" />
              </tr>
            </thead>
            <tbody>
              {items.map((art, i) => (
                <tr
                  key={art.nr}
                  className={`border-b border-[#1F2328]/6 last:border-0 ${art.laag ? "bg-amber-50/40" : ""}`}
                >
                  {/* UGA + naam */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#1D4E89] bg-[#1D4E89]/8 border border-[#1D4E89]/15 rounded px-2 py-0.5 shrink-0">
                        {art.nr}
                      </span>
                      <span className="text-sm font-medium text-[#1F2328]">{art.naam}</span>
                    </div>
                  </td>

                  {/* Afmetingen */}
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-xs text-[#1F2328]/40">
                      {art.p_lengte && art.p_breedte
                        ? `${art.p_lengte} × ${art.p_breedte}${art.p_hoogte ? ` × ${art.p_hoogte}` : ""} mm`
                        : "—"}
                    </span>
                  </td>

                  {/* Klant ref */}
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="text-xs text-[#1F2328]/40">{art.klantref ?? "—"}</span>
                  </td>

                  {/* Voortgangsbalk */}
                  <td className="px-4 py-4 hidden md:table-cell">
                    {art.pct !== null ? (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-[#1F2328]/8 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${art.laag ? "bg-amber-400" : "bg-[#1D4E89]"}`}
                            style={{ width: `${art.pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-[#1F2328]/30 shrink-0 w-8 text-right">
                          {art.pct}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#1F2328]/20">—</span>
                    )}
                  </td>

                  {/* Stuks */}
                  <td className="px-6 py-4 text-right">
                    <span className={`text-base font-bold ${art.laag ? "text-amber-600" : "text-[#1F2328]"}`}
                      style={{ fontFamily: 'var(--font-jakarta)' }}>
                      {art.totaal.toLocaleString("nl-BE")}
                    </span>
                    <span className="text-xs text-[#1F2328]/30 ml-1">st</span>
                    {art.laag && (
                      <p className="text-[10px] text-amber-500 mt-0.5">min {art.min} st</p>
                    )}
                  </td>

                  {/* Afroep link */}
                  <td className="px-4 py-4">
                    <Link
                      href={`/portaal/afroep?artikel=${art.nr}`}
                      className="text-[#1D4E89] hover:text-[#163d6e] transition-colors"
                      title="Afroep plaatsen"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 4v16m8-8H4" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
