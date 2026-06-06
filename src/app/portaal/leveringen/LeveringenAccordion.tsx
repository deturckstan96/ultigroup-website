"use client";

import { useState } from "react";

type Regel = { naam: string; stuks: number };
type Levering = { id: string; datum: string; regels: Regel[] };
type ArtikelSummary = { naam: string; totaalStuks: number; aantalLeveringen: number; leveringen: { datum: string; stuks: number }[] };
type MaandGroep = { key: string; label: string; leveringen: Levering[]; totaalStuks: number };

function aggregeerArtikelen(leveringen: Levering[]): ArtikelSummary[] {
  const map = new Map<string, ArtikelSummary>();
  for (const lev of leveringen) {
    for (const r of lev.regels) {
      if (r.stuks === 0) continue;
      if (!map.has(r.naam)) {
        map.set(r.naam, { naam: r.naam, totaalStuks: 0, aantalLeveringen: 0, leveringen: [] });
      }
      const art = map.get(r.naam)!;
      art.totaalStuks += r.stuks;
      art.aantalLeveringen += 1;
      if (lev.datum) art.leveringen.push({ datum: lev.datum, stuks: r.stuks });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.totaalStuks - a.totaalStuks);
}

function ArtikelRij({ art }: { art: ArtikelSummary }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#F0EDE6] last:border-0">
      {/* Artikel summary rij */}
      <div
        className="grid items-center px-6 py-3 hover:bg-[#FAFAF8] cursor-pointer"
        style={{ gridTemplateColumns: "1fr 100px 100px 28px" }}
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-semibold text-[#14352A]" style={{ fontFamily: "var(--font-display)" }}>
          {art.naam}
        </span>
        <span className="text-sm font-mono text-right text-[#14352A] font-bold">
          {art.totaalStuks.toLocaleString("nl-BE")}
          <span className="text-xs font-normal text-[#1F2328]/40 ml-1">st</span>
        </span>
        <span className="text-xs text-right text-[#1F2328]/40">
          {art.aantalLeveringen} levering{art.aantalLeveringen !== 1 ? "en" : ""}
        </span>
        <svg
          className="w-3.5 h-3.5 text-[#14352A]/30 ml-auto transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Detail: individuele datums */}
      {open && (
        <div className="bg-[#F9F8F5] border-t border-[#F0EDE6]">
          <div
            className="grid px-8 py-1.5"
            style={{ gridTemplateColumns: "1fr 100px" }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1F2328]/30" style={{ fontFamily: "var(--font-display)" }}>Datum</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-right text-[#1F2328]/30" style={{ fontFamily: "var(--font-display)" }}>Stuks</span>
          </div>
          {art.leveringen
            .sort((a, b) => b.datum.localeCompare(a.datum))
            .map((lev, i) => (
              <div
                key={i}
                className="grid px-8 py-2 border-t border-[#F0EDE6]"
                style={{ gridTemplateColumns: "1fr 100px" }}
              >
                <span className="text-sm font-mono text-[#1F2328]/55">
                  {new Date(lev.datum).toLocaleDateString("nl-BE", { day: "numeric", month: "long", year: "numeric" })}
                </span>
                <span className="text-sm font-mono text-right text-[#1F2328]/70">
                  {lev.stuks.toLocaleString("nl-BE")}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default function LeveringenAccordion({ maanden }: { maanden: MaandGroep[] }) {
  const [open, setOpen] = useState<string | null>(maanden[0]?.key ?? null);

  return (
    <div className="divide-y divide-[#E1DDD0] border border-[#E1DDD0] bg-white">
      {maanden.map((m) => {
        const isOpen = open === m.key;
        const artikelen = aggregeerArtikelen(m.leveringen);

        return (
          <div key={m.key}>
            {/* Maand header */}
            <button
              onClick={() => setOpen(isOpen ? null : m.key)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#F4F1E8] transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <span
                  className="text-base font-bold text-[#14352A] capitalize"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                >
                  {m.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#1F2328]/35">
                    {m.totaalStuks.toLocaleString("nl-BE")} stuks
                  </span>
                  <span className="text-[#1F2328]/20">·</span>
                  <span className="text-xs text-[#1F2328]/35">
                    {m.leveringen.length} levering{m.leveringen.length !== 1 ? "en" : ""}
                  </span>
                  {artikelen.length > 0 && (
                    <>
                      <span className="text-[#1F2328]/20">·</span>
                      <span className="text-xs text-[#1F2328]/35">
                        {artikelen.length} artikel{artikelen.length !== 1 ? "en" : ""}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <svg
                className="w-4 h-4 text-[#14352A]/30 shrink-0 transition-transform"
                style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Artikelen per maand */}
            {isOpen && (
              <div className="border-t border-[#E1DDD0]">
                {/* Tabel header */}
                <div
                  className="grid px-6 py-2 bg-[#F4F1E8] border-b border-[#E1DDD0]"
                  style={{ gridTemplateColumns: "1fr 100px 100px 28px" }}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1F2328]/40" style={{ fontFamily: "var(--font-display)" }}>Artikel</span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-right text-[#1F2328]/40" style={{ fontFamily: "var(--font-display)" }}>Totaal</span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-right text-[#1F2328]/40" style={{ fontFamily: "var(--font-display)" }}>Leveringen</span>
                  <span />
                </div>

                {artikelen.length === 0 ? (
                  <p className="px-6 py-4 text-sm text-[#1F2328]/30 italic">Geen artikeldetails beschikbaar</p>
                ) : (
                  artikelen.map((art) => <ArtikelRij key={art.naam} art={art} />)
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
