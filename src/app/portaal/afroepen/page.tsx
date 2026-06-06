import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getKlantNaam } from "@/lib/supabase/get-klant";

type PortaalStatus =
  | "nieuw"
  | "goedgekeurd"
  | "afgewezen"
  | "transport_wachtrij"
  | "transport_ingepland"
  | "geleverd"
  | "geannuleerd";

const statusMap: Record<PortaalStatus, { label: string; bg: string; color: string; stap: number }> = {
  nieuw:               { label: "In wachtrij",         bg: "bg-[#14352A]/8",   color: "text-[#14352A]",  stap: 0 },
  goedgekeurd:         { label: "Goedgekeurd",          bg: "bg-amber-50",      color: "text-amber-700",   stap: 1 },
  transport_wachtrij:  { label: "Transport wachtrij",   bg: "bg-amber-50",      color: "text-amber-700",   stap: 1 },
  transport_ingepland: { label: "Transport ingepland",  bg: "bg-[#5A8C4A/10]",       color: "text-[#2D5C44]",    stap: 2 },
  geleverd:            { label: "Geleverd",             bg: "bg-[#2E7D32]/8",   color: "text-[#2E7D32]",   stap: 3 },
  afgewezen:           { label: "Afgewezen",            bg: "bg-red-50",        color: "text-red-700",     stap: -1 },
  geannuleerd:         { label: "Geannuleerd",          bg: "bg-[#1F2328]/6",   color: "text-[#1F2328]/50",stap: -1 },
};

const stapLabels = ["In wachtrij", "Goedgekeurd", "Transport", "Geleverd"];

async function getAfroepen(klantNaam: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("portaal_afroepen")
    .select("id, pallet_nr, pallet_naam, qty, status, created_at, gewenste_datum, leveradres, klant_ref, opmerking, afgewezen_reden, sales_delivery_id, io_nummer_id, klant_io_nummers(io_nummer)")
    .eq("klant_naam", klantNaam)
    .order("created_at", { ascending: false })
    .limit(60);

  return (data ?? []).map((row) => ({
    ...row,
    io_nummer: (row.klant_io_nummers as unknown as { io_nummer: string } | null)?.io_nummer ?? null,
  }));
}

export default async function AfroepenPage() {
  const klantNaam = await getKlantNaam();
  const afroepen = klantNaam ? await getAfroepen(klantNaam) : [];

  return (
    <div>
      {/* Crème header band */}
      <div className="px-8 py-6 border-b border-[#E1DDD0] flex items-center justify-between" style={{ background: "#F4F1E8" }}>
        <div>
          <p className="text-xs font-semibold text-[#14352A]/40 uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-display)" }}>Opvolging</p>
          <h1 className="text-2xl font-bold text-[#14352A]" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
            Mijn afroepen
          </h1>
          <p className="text-sm text-[#1F2328]/45 mt-0.5">
            {afroepen.length} afroep{afroepen.length !== 1 ? "en" : ""} · Status van al uw ingediende afroepen
          </p>
        </div>
        <Link
          href="/portaal/afroep"
          className="flex items-center gap-2 px-4 py-2 text-white text-sm font-semibold transition-colors"
          style={{ background: "#14352A", fontFamily: "var(--font-display)" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nieuwe afroep
        </Link>
      </div>
    <div className="p-8 max-w-5xl">

      {/* Status legenda */}
      <div className="bg-white border border-[#E1DDD0] px-6 py-4 mb-6 flex items-center gap-0">
        {stapLabels.map((label, i) => (
          <div key={label} className="flex items-center">
            {i > 0 && <div className="w-10 h-px bg-[#1F2328]/15 mx-3" />}
            <div className="flex items-center gap-2">
              {i < 3 ? (
                <div className="w-6 h-6 rounded-full bg-[#1F2328] flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">{i + 1}</span>
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#2E7D32] flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <span className="text-xs font-medium text-[#1F2328]/60">{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Afroepen */}
      {afroepen.length === 0 ? (
        <div className="bg-white border border-dashed border-[#1F2328]/15 rounded-xl p-12 text-center">
          <p className="text-[#1F2328]/35 mb-4">U heeft nog geen afroepen geplaatst.</p>
          <Link
            href="/portaal/afroep"
            className="inline-block px-6 py-2.5 bg-[#14352A] text-white text-sm font-semibold rounded-lg hover:bg-[#1F4A38] transition-colors"
          >
            Eerste afroep plaatsen
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {afroepen.map((afr) => {
            const status = (afr.status ?? "nieuw") as PortaalStatus;
            const s = statusMap[status] ?? statusMap.nieuw;
            const geannuleerd = status === "geannuleerd" || status === "afgewezen";

            return (
              <div key={afr.id} className="bg-white border border-[#E1DDD0] overflow-hidden">
                {/* Header */}
                <div className="flex items-start justify-between px-6 py-4 border-b border-[#E1DDD0]">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-[#EDE8D8] rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-[#1F2328]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                        <p className="text-sm font-bold text-[#14352A] font-mono">{afr.pallet_nr}</p>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${s.bg} ${s.color} border-current/20`}>
                          {s.label}
                        </span>
                        {afr.io_nummer && (
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#14352A]/8 text-[#14352A] border border-[#14352A]/20 font-mono">
                            {afr.io_nummer}
                          </span>
                        )}
                        {afr.klant_ref && (
                          <span className="text-xs text-[#1F2328]/40 font-mono">{afr.klant_ref}</span>
                        )}
                      </div>
                      <p className="text-sm text-[#1F2328]/75">
                        <span className="font-medium">{afr.pallet_naam ?? afr.pallet_nr}</span>
                        <span className="text-[#1F2328]/40 ml-2">{Number(afr.qty).toLocaleString("nl-BE")} stuks</span>
                      </p>
                      {afr.leveradres && (
                        <p className="text-xs text-[#1F2328]/40 mt-0.5">{afr.leveradres}</p>
                      )}
                      {status === "afgewezen" && afr.afgewezen_reden && (
                        <p className="text-xs text-red-600 mt-1 font-medium">Reden: {afr.afgewezen_reden}</p>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0 ml-4">
                    {afr.created_at && (
                      <p className="text-xs text-[#1F2328]/35">
                        Aangevraagd {new Date(afr.created_at).toLocaleDateString("nl-BE")}
                      </p>
                    )}
                    {afr.gewenste_datum && (
                      <p className="text-xs font-semibold text-[#1F2328]/60 mt-0.5">
                        Gewenst: {new Date(afr.gewenste_datum).toLocaleDateString("nl-BE")}
                      </p>
                    )}
                    {afr.sales_delivery_id && (
                      <p className="text-xs text-[#1F2328]/30 mt-1 font-mono">{afr.sales_delivery_id}</p>
                    )}
                  </div>
                </div>

                {/* Voortgangsbalk */}
                {!geannuleerd && (
                  <div className="px-6 py-3">
                    <div className="flex items-center">
                      {stapLabels.map((label, i) => {
                        const bereikt = i <= s.stap;
                        return (
                          <div key={label} className="flex items-center flex-1 last:flex-none">
                            <div className={`w-2.5 h-2.5 rounded-full border-2 shrink-0 transition-colors ${
                              i === 3
                                ? status === "geleverd" ? "bg-[#2E7D32] border-[#2E7D32]" : "bg-white border-[#1F2328]/20"
                                : bereikt ? "bg-[#14352A] border-[#14352A]" : "bg-white border-[#1F2328]/20"
                            }`} />
                            {i < stapLabels.length - 1 && (
                              <div className={`flex-1 h-0.5 ${i < s.stap ? "bg-[#14352A]" : "bg-[#1F2328]/10"}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between mt-1">
                      {stapLabels.map((label) => (
                        <span key={label} className="text-[10px] text-[#1F2328]/30">{label}</span>
                      ))}
                    </div>
                  </div>
                )}

                {geannuleerd && (
                  <div className="px-6 py-2.5">
                    <span className="text-xs text-[#1F2328]/35 italic">
                      {status === "afgewezen" ? "Deze afroep werd afgewezen door ULTI GROUP" : "Deze afroep werd geannuleerd"}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
    </div>
  );
}
