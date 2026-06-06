"use client";

import { useState } from "react";

type Levering = {
  delivery_id: string;
  planned_date: string | null;
  delivery_date: string | null;
  status: string;
  qty_planned: number;
  qty_received: number;
  afroep_status: string;
};

type IoNummer = {
  id: string;
  io_nummer: string;
  item_id: string;
  item_name: string | null;
  qty_totaal: number;
  qty_verbruikt: number;
  qty_in_behandeling: number;
  qty_beschikbaar: number;
  notitie: string | null;
  leveringen: Levering[];
};

interface Props {
  ioNummers: IoNummer[];
}

function fmtD(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("nl-BE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function IoNummersClient({ ioNummers }: Props) {
  const [open, setOpen] = useState<string | null>(null);

  if (ioNummers.length === 0) {
    return (
      <div className="bg-white border border-[#1F2328]/10 rounded-xl p-12 text-center">
        <p className="text-[#1F2328]/35 text-sm">Geen actieve IO-nummers gevonden voor uw account.</p>
        <p className="text-[#1F2328]/25 text-xs mt-1">Contacteer ULTI GROUP voor meer informatie.</p>
      </div>
    );
  }

  const totaalBesteld    = ioNummers.reduce((s, io) => s + io.qty_totaal, 0);
  const totaalVerbruikt  = ioNummers.reduce((s, io) => s + io.qty_verbruikt, 0);
  const totaalBeschikb   = ioNummers.reduce((s, io) => s + io.qty_beschikbaar, 0);

  return (
    <div className="space-y-6">
      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Totaal besteld",    waarde: totaalBesteld,   kleur: "text-[#1F2328]",   bg: "bg-white" },
          { label: "Al geleverd",       waarde: totaalVerbruikt, kleur: "text-[#14352A]",   bg: "bg-[#14352A]/6" },
          { label: "Nog beschikbaar",   waarde: totaalBeschikb,  kleur: "text-[#2E7D32]",   bg: "bg-[#2E7D32]/6" },
        ].map(k => (
          <div key={k.label} className={`${k.bg} border border-[#1F2328]/10 rounded-xl p-5`}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#1F2328]/40 mb-1">{k.label}</p>
            <p className={`text-2xl font-bold ${k.kleur}`}>{k.waarde.toLocaleString("nl-BE")}</p>
            <p className="text-xs text-[#1F2328]/30 mt-0.5">stuks over {ioNummers.length} contracten</p>
          </div>
        ))}
      </div>

      {/* IO lijst */}
      <div className="space-y-3">
        {ioNummers.map((io) => {
          const isOpen   = open === io.id;
          const pct      = io.qty_totaal > 0 ? (io.qty_verbruikt / io.qty_totaal) * 100 : 0;
          const bijna    = io.qty_beschikbaar < io.qty_totaal * 0.2 && io.qty_beschikbaar > 0;
          const leeg     = io.qty_beschikbaar <= 0;
          const barKleur = leeg ? "bg-[#1F2328]/20" : bijna ? "bg-amber-500" : "bg-[#14352A]";
          const badgeKleur = leeg
            ? "bg-[#1F2328]/6 text-[#1F2328]/40"
            : bijna
            ? "bg-amber-50 text-amber-700"
            : "bg-[#2E7D32]/8 text-[#2E7D32]";

          return (
            <div
              key={io.id}
              className={`bg-white border rounded-xl overflow-hidden transition-all ${
                isOpen ? "border-[#14352A]/30" : "border-[#1F2328]/10"
              }`}
            >
              {/* Header rij */}
              <button
                onClick={() => setOpen(isOpen ? null : io.id)}
                className="w-full text-left px-6 py-4 flex items-center gap-4 hover:bg-[#F5F7FA] transition-colors"
              >
                {/* IO badge */}
                <div className="shrink-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-0.5">Contractnr</p>
                  <p className="text-sm font-bold text-[#14352A] font-mono">{io.io_nummer}</p>
                </div>

                <div className="w-px h-10 bg-[#1F2328]/10 shrink-0" />

                {/* Artikel */}
                <div className="shrink-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-0.5">Artikel</p>
                  <p className="text-sm font-medium text-[#1F2328]">
                    <span className="font-bold text-[#14352A] font-mono mr-1.5">{io.item_id}</span>
                    {io.item_name ?? ""}
                  </p>
                </div>

                {/* Voortgangsbalk */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-[#1F2328]/40">
                      {io.qty_verbruikt.toLocaleString("nl-BE")} / {io.qty_totaal.toLocaleString("nl-BE")} stuks geleverd
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeKleur}`}>
                      {leeg
                        ? "Volledig afgenomen"
                        : bijna
                        ? `Nog ${io.qty_beschikbaar.toLocaleString("nl-BE")} stuks`
                        : `${io.qty_beschikbaar.toLocaleString("nl-BE")} beschikbaar`}
                    </span>
                  </div>
                  <div className="h-2 bg-[#1F2328]/8 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${barKleur} transition-all`}
                      style={{ width: `${Math.min(100, pct)}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-[#1F2328]/25">0</span>
                    <span className="text-[10px] text-[#1F2328]/25">{Math.round(pct)}% verbruikt</span>
                    <span className="text-[10px] text-[#1F2328]/25">{io.qty_totaal.toLocaleString("nl-BE")}</span>
                  </div>
                </div>

                {io.qty_in_behandeling > 0 && (
                  <div className="shrink-0 text-right">
                    <p className="text-[10px] text-amber-600 font-semibold">In behandeling</p>
                    <p className="text-sm font-bold text-amber-600">+{io.qty_in_behandeling.toLocaleString("nl-BE")}</p>
                  </div>
                )}

                {io.notitie && (
                  <div className="shrink-0 max-w-[140px]">
                    <p className="text-xs text-[#1F2328]/35 italic truncate">{io.notitie}</p>
                  </div>
                )}

                <svg
                  className={`w-4 h-4 text-[#1F2328]/30 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Leveringshistoriek */}
              {isOpen && (
                <div className="border-t border-[#1F2328]/6 px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-3">
                    Afroepen onder dit contract ({io.leveringen.length})
                  </p>

                  {io.leveringen.length === 0 ? (
                    <p className="text-sm text-[#1F2328]/35 italic">
                      Nog geen afroepen geplaatst voor dit contract.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-[#1F2328]/8">
                            {["Datum", "Referentie", "Stuks", "Geleverd", "Status"].map((h) => (
                              <th key={h} className="pb-2 pr-6 text-left text-[10px] font-semibold uppercase tracking-widest text-[#1F2328]/35 whitespace-nowrap">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {io.leveringen.map((lev) => {
                            const datum = lev.planned_date || lev.delivery_date;
                            const isGeleverd = lev.status === "Posted" || lev.status === "Vertrokken";
                            const isInPlanning = ["nieuw","goedgekeurd","transport_wachtrij","transport_ingepland"].includes(lev.afroep_status);
                            const statusLabel = isGeleverd
                              ? "Geleverd"
                              : isInPlanning
                              ? "In behandeling"
                              : lev.status;
                            const statusKleur = isGeleverd
                              ? "bg-[#2E7D32]/8 text-[#2E7D32]"
                              : isInPlanning
                              ? "bg-amber-50 text-amber-700"
                              : "bg-[#1F2328]/6 text-[#1F2328]/50";
                            return (
                              <tr key={lev.delivery_id} className="border-b border-[#1F2328]/5 hover:bg-[#F5F7FA]">
                                <td className="py-2.5 pr-6 text-[#1F2328]/60 whitespace-nowrap text-xs">
                                  {fmtD(datum)}
                                </td>
                                <td className="py-2.5 pr-6 text-[#14352A] font-mono text-xs font-semibold">
                                  {lev.delivery_id.startsWith("afroep-") ? "—" : lev.delivery_id}
                                </td>
                                <td className="py-2.5 pr-6 font-semibold text-[#1F2328] text-right">
                                  {lev.qty_planned > 0 ? lev.qty_planned.toLocaleString("nl-BE") : "—"}
                                </td>
                                <td className="py-2.5 pr-6 text-[#1F2328]/60 text-right">
                                  {lev.qty_received > 0 ? lev.qty_received.toLocaleString("nl-BE") : "—"}
                                </td>
                                <td className="py-2.5">
                                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusKleur}`}>
                                    {statusLabel}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
