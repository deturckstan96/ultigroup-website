"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { ArtikelKeuze, LeverAdres, IoNummer } from "./page";

interface Props {
  artikelen: ArtikelKeuze[];
  klantNaam: string;
  leveradressen: LeverAdres[];
  ioNummers: IoNummer[];
}

export default function AfroepForm({ artikelen, klantNaam, leveradressen, ioNummers }: Props) {
  const router = useRouter();
  const [artikelNr, setArtikelNr] = useState(artikelen[0]?.nr ?? "");
  const [stuks, setStuks] = useState("");
  const [datum, setDatum] = useState("");
  const [adresId, setAdresId] = useState(leveradressen[0]?.id ?? "");
  const [ioId, setIoId] = useState<string | null>(null);
  const [klantRef, setKlantRef] = useState("");
  const [opmerking, setOpmerking] = useState("");
  const [ingediend, setIngediend] = useState(false);
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState<string | null>(null);

  const geselecteerd = artikelen.find((a) => a.nr === artikelNr);

  // IOs beschikbaar voor het geselecteerde artikel
  const artikelIos = ioNummers.filter(
    (io) => io.item_id?.toUpperCase() === artikelNr?.toUpperCase()
  );
  const heeftIos = artikelIos.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!geselecteerd || !stuks) return;
    if (!geselecteerd.klant_nr) {
      setFout("Geen klant nummer gevonden. Contacteer ULTI GROUP.");
      return;
    }
    setBezig(true);
    setFout(null);

    const supabase = createClient();
    const adres = leveradressen.find((a) => a.id === adresId);
    const leveradresTekst = adres ? `${adres.straat}, ${adres.postcode} ${adres.stad}` : "";

    const { error } = await supabase.from("portaal_afroepen").insert({
      klant_nr:       geselecteerd.klant_nr,
      klant_naam:     klantNaam,
      pallet_nr:      geselecteerd.nr,
      pallet_naam:    geselecteerd.naam,
      qty:            Number(stuks),
      gewenste_datum: datum || null,
      leveradres:     leveradresTekst,
      klant_ref:      klantRef || null,
      opmerking:      opmerking || null,
      status:         "nieuw",
      io_nummer_id:   ioId || null,
    });

    setBezig(false);
    if (error) {
      setFout(error.message);
      return;
    }
    setIngediend(true);
  }

  if (artikelen.length === 0) {
    return (
      <div className="p-8 max-w-2xl">
        <div className="bg-white border border-[#1F2328]/10 rounded-xl p-12 text-center">
          <p className="text-[#1F2328]/40 text-sm">Geen palletartikelen gevonden voor uw account.</p>
        </div>
      </div>
    );
  }

  if (ingediend && geselecteerd) {
    const adres = leveradressen.find((a) => a.id === adresId);
    const gekozenIo = ioNummers.find((io) => io.id === ioId);
    return (
      <div className="p-8 max-w-2xl">
        <div className="bg-white border border-[#1F2328]/10 rounded-2xl p-10 text-center">
          <div className="w-14 h-14 bg-[#2E7D32]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-[#2E7D32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#1F2328] mb-2" style={{ fontFamily: 'var(--font-jakarta)' }}>
            Afroep ingediend!
          </h2>
          <p className="text-[#1F2328]/50 text-sm mb-6">
            Uw afroep is ontvangen. ULTI GROUP bekijkt uw aanvraag en neemt contact op bij vragen.
            Volg de status via &ldquo;Mijn afroepen&rdquo;.
          </p>
          <div className="bg-[#F5F7FA] rounded-xl p-4 text-sm text-left mb-6 space-y-2.5">
            <div className="flex justify-between">
              <span className="text-[#1F2328]/40">Artikel</span>
              <span className="font-semibold text-[#1F2328]">
                <span className="text-[#1D4E89] mr-2">{geselecteerd.nr}</span>{geselecteerd.naam}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#1F2328]/40">Aantal</span>
              <span className="font-semibold text-[#1F2328]">{Number(stuks).toLocaleString("nl-BE")} stuks</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#1F2328]/40">Gewenste datum</span>
              <span className="font-semibold text-[#1F2328]">
                {datum ? new Date(datum).toLocaleDateString("nl-BE") : "—"}
              </span>
            </div>
            {adres && (
              <div className="flex justify-between">
                <span className="text-[#1F2328]/40">Leveradres</span>
                <span className="font-semibold text-[#1F2328]">{adres.straat}, {adres.postcode} {adres.stad}</span>
              </div>
            )}
            {gekozenIo && (
              <div className="flex justify-between">
                <span className="text-[#1F2328]/40">IO-nummer</span>
                <span className="font-semibold text-[#1D4E89] font-mono">{gekozenIo.io_nummer}</span>
              </div>
            )}
            {klantRef && (
              <div className="flex justify-between">
                <span className="text-[#1F2328]/40">Uw referentie</span>
                <span className="font-semibold text-[#1F2328]">{klantRef}</span>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/portaal/afroepen")}
              className="flex-1 py-2.5 bg-[#1D4E89] text-white text-sm font-semibold rounded-lg hover:bg-[#163d6e] transition-colors"
            >
              Mijn afroepen
            </button>
            <button
              onClick={() => { setIngediend(false); setStuks(""); setDatum(""); setKlantRef(""); setOpmerking(""); setIoId(null); }}
              className="flex-1 py-2.5 border border-[#1F2328]/20 text-[#1F2328] text-sm font-semibold rounded-lg hover:border-[#1F2328]/40 transition-colors"
            >
              Nieuwe afroep
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <p className="text-xs font-semibold text-[#1F2328]/40 uppercase tracking-widest mb-1">Nieuw verzoek</p>
        <h1 className="text-2xl font-bold text-[#1F2328]" style={{ fontFamily: 'var(--font-jakarta)' }}>
          Afroep plaatsen
        </h1>
        <p className="text-sm text-[#1F2328]/45 mt-0.5">
          Vul uw gewenste levering in. ULTI GROUP bevestigt binnen 1 werkdag.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Artikel selectie */}
        <div className="bg-white border border-[#1F2328]/10 rounded-xl p-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#1F2328]/40 mb-4">
            Welk artikel?
          </h2>
          <div className="space-y-2">
            {artikelen.map((art) => {
              const selected = artikelNr === art.nr;
              return (
                <label
                  key={art.nr}
                  className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition-colors ${
                    selected
                      ? "border-[#1D4E89] bg-[#1D4E89]/6"
                      : "border-[#1F2328]/10 hover:border-[#1F2328]/25 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="artikel"
                      value={art.nr}
                      checked={selected}
                      onChange={() => { setArtikelNr(art.nr); setStuks(""); setIoId(null); }}
                      className="accent-[#1D4E89]"
                    />
                    <div>
                      {/* UGA nummer prominent */}
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-[#1D4E89]">{art.nr}</span>
                        <span className="text-sm font-medium text-[#1F2328]">{art.naam}</span>
                      </div>
                      <p className="text-xs text-[#1F2328]/35">
                        {art.p_lengte && art.p_breedte
                          ? `${art.p_lengte} × ${art.p_breedte}${art.p_hoogte ? ` × ${art.p_hoogte}` : ""} mm`
                          : "Afmetingen op aanvraag"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-sm font-bold ${art.totaal_stock === 0 ? "text-[#1F2328]/30" : "text-[#1F2328]"}`}>
                      {art.totaal_stock.toLocaleString("nl-BE")}
                    </p>
                    <p className="text-xs text-[#1F2328]/35">in stock</p>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Vorige levering hint */}
          {geselecteerd?.vorige_stuks && (
            <div className="mt-4 bg-[#F5F7FA] rounded-lg p-3 flex items-center justify-between">
              <p className="text-xs text-[#1F2328]/50">
                Vorige keer:{" "}
                <span className="font-semibold text-[#1F2328]">
                  {geselecteerd.vorige_stuks.toLocaleString("nl-BE")} stuks
                </span>
                {geselecteerd.vorige_datum && (
                  <> op {new Date(geselecteerd.vorige_datum).toLocaleDateString("nl-BE")}</>
                )}
              </p>
              <button
                type="button"
                onClick={() => setStuks(String(geselecteerd.vorige_stuks))}
                className="text-xs text-[#1D4E89] font-semibold hover:underline shrink-0 ml-3"
              >
                Herhaal →
              </button>
            </div>
          )}
        </div>

        {/* Hoeveelheid & datum */}
        <div className="bg-white border border-[#1F2328]/10 rounded-xl p-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#1F2328]/40 mb-4">
            Hoeveel &amp; wanneer?
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-1.5">
                Aantal stuks *
              </label>
              <input
                type="number"
                min="1"
                max={geselecteerd?.totaal_stock || undefined}
                required
                value={stuks}
                onChange={(e) => setStuks(e.target.value)}
                placeholder={geselecteerd?.totaal_stock
                  ? `max. ${geselecteerd.totaal_stock.toLocaleString("nl-BE")}`
                  : "Aantal"}
                className="w-full border border-[#1F2328]/15 rounded-lg px-3.5 py-2.5 text-sm text-[#1F2328] placeholder-[#1F2328]/25 focus:outline-none focus:border-[#1D4E89] transition-colors"
              />
              {geselecteerd && (
                <p className="text-xs text-[#1F2328]/35 mt-1">
                  {geselecteerd.totaal_stock.toLocaleString("nl-BE")} stuks beschikbaar
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-1.5">
                Gewenste leverdatum *
              </label>
              <input
                type="date"
                required
                value={datum}
                onChange={(e) => setDatum(e.target.value)}
                min={new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0]}
                className="w-full border border-[#1F2328]/15 rounded-lg px-3.5 py-2.5 text-sm text-[#1F2328] focus:outline-none focus:border-[#1D4E89] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Leveradres */}
        <div className="bg-white border border-[#1F2328]/10 rounded-xl p-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#1F2328]/40 mb-4">
            Leveradres
          </h2>
          {leveradressen.length === 0 ? (
            <p className="text-sm text-[#1F2328]/40">Geen leveradressen gevonden. Contacteer ULTI GROUP.</p>
          ) : (
            <div className="space-y-2">
              {leveradressen.map((adr) => (
                <label
                  key={adr.id}
                  className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                    adresId === adr.id
                      ? "border-[#1D4E89] bg-[#1D4E89]/6"
                      : "border-[#1F2328]/10 hover:border-[#1F2328]/25 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="adres"
                    value={adr.id}
                    checked={adresId === adr.id}
                    onChange={() => setAdresId(adr.id)}
                    className="accent-[#1D4E89]"
                  />
                  <div>
                    {adr.bedrijfsnaam && (
                      <p className="text-xs font-semibold text-[#1F2328]/60 mb-0.5">{adr.bedrijfsnaam}</p>
                    )}
                    <p className="text-sm font-medium text-[#1F2328]">{adr.straat}</p>
                    <p className="text-xs text-[#1F2328]/40">{adr.postcode} {adr.stad}{adr.land ? `, ${adr.land}` : ""}</p>
                  </div>
                  {adr.is_standaard && (
                    <span className="ml-auto text-xs text-[#1D4E89] font-medium bg-[#1D4E89]/8 border border-[#1D4E89]/20 rounded px-2 py-0.5 shrink-0">
                      Standaard
                    </span>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* IO-nummer keuze (enkel als er IOs zijn voor dit artikel) */}
        {heeftIos && (
          <div className="bg-white border border-[#1F2328]/10 rounded-xl p-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#1F2328]/40 mb-1">
              IO-nummer
            </h2>
            <p className="text-xs text-[#1F2328]/40 mb-4">
              Koppel deze afroep aan een openstaand contractnummer.
            </p>
            <div className="space-y-2">
              {artikelIos.map((io) => {
                const beschikbaar = io.qty_totaal - io.qty_verbruikt - io.qty_in_behandeling;
                const pct = io.qty_totaal > 0 ? (beschikbaar / io.qty_totaal) * 100 : 0;
                const laag = beschikbaar < io.qty_totaal * 0.2;
                const geselecteerdIo = ioId === io.id;
                return (
                  <label
                    key={io.id}
                    className={`flex items-start justify-between p-3.5 rounded-lg border cursor-pointer transition-colors ${
                      geselecteerdIo
                        ? "border-[#1D4E89] bg-[#1D4E89]/6"
                        : "border-[#1F2328]/10 hover:border-[#1F2328]/25 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="io_nummer"
                        value={io.id}
                        checked={geselecteerdIo}
                        onChange={() => setIoId(io.id)}
                        className="accent-[#1D4E89] mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-bold text-[#1D4E89] font-mono">{io.io_nummer}</p>
                        <p className="text-xs text-[#1F2328]/50 mt-0.5">
                          {io.item_name ?? io.item_id}
                        </p>
                        {io.notitie && (
                          <p className="text-xs text-[#1F2328]/40 mt-0.5 italic">{io.notitie}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <p className={`text-sm font-bold ${laag ? "text-amber-600" : "text-[#1F2328]"}`}>
                        {Math.max(0, Math.round(beschikbaar)).toLocaleString("nl-BE")}
                      </p>
                      <p className="text-xs text-[#1F2328]/35">beschikbaar</p>
                      <div className="w-20 h-1.5 bg-[#1F2328]/10 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${laag ? "bg-amber-500" : "bg-[#1D4E89]"}`}
                          style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
                        />
                      </div>
                      {io.qty_in_behandeling > 0 && (
                        <p className="text-[10px] text-amber-600 mt-0.5">
                          +{io.qty_in_behandeling.toLocaleString("nl-BE")} in behandeling
                        </p>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
            {ioId && (
              <button
                type="button"
                onClick={() => setIoId(null)}
                className="mt-3 text-xs text-[#1F2328]/40 hover:text-[#1F2328] underline"
              >
                IO-nummer verwijderen
              </button>
            )}
          </div>
        )}

        {/* Referentie & opmerking */}
        <div className="bg-white border border-[#1F2328]/10 rounded-xl p-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#1F2328]/40 mb-4">
            Extra info (optioneel)
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-1.5">
                Uw referentie / IO-nummer
              </label>
              <input
                type="text"
                value={klantRef}
                onChange={(e) => setKlantRef(e.target.value)}
                placeholder="bv. IO/27694"
                className="w-full border border-[#1F2328]/15 rounded-lg px-3.5 py-2.5 text-sm text-[#1F2328] placeholder-[#1F2328]/25 focus:outline-none focus:border-[#1D4E89] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-1.5">
                Opmerking
              </label>
              <textarea
                rows={3}
                value={opmerking}
                onChange={(e) => setOpmerking(e.target.value)}
                placeholder="Bijzondere instructies, voorkeur voor levering, ..."
                className="w-full border border-[#1F2328]/15 rounded-lg px-3.5 py-2.5 text-sm text-[#1F2328] placeholder-[#1F2328]/25 focus:outline-none focus:border-[#1D4E89] transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {fout && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {fout}
          </div>
        )}
        <button
          type="submit"
          disabled={bezig}
          className="w-full py-3.5 bg-[#1D4E89] text-white font-bold text-sm rounded-xl hover:bg-[#163d6e] transition-colors disabled:opacity-60 disabled:cursor-wait"
        >
          {bezig ? "Bezig met indienen…" : "Afroep indienen"}
        </button>
        <p className="text-center text-xs text-[#1F2328]/30">
          Na indiening ontvangt u een bevestiging van ULTI GROUP binnen 1 werkdag.
        </p>
      </form>
    </div>
  );
}
