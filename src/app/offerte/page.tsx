export default function OffertePage() {
  return (
    <>
      <section className="pt-28 pb-12 bg-white border-b border-[#1F2328]/8">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold text-[#1D4E89] uppercase tracking-[0.25em] mb-3"
            style={{ fontFamily: 'var(--font-jakarta)' }}>Vrijblijvend</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1F2328] mb-4"
            style={{ fontFamily: 'var(--font-jakarta)' }}>Offerte aanvragen</h1>
          <p className="text-[#1F2328]/50 max-w-xl text-lg">
            Vul het formulier in en we bezorgen u een gepersonaliseerde offerte binnen de 24 uur.
          </p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <form className="space-y-8">
            <fieldset>
              <legend className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1D4E89] mb-6"
                style={{ fontFamily: 'var(--font-jakarta)' }}>1 — Uw gegevens</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: "Voornaam *", type: "text", required: true },
                  { label: "Achternaam *", type: "text", required: true },
                  { label: "Bedrijfsnaam", type: "text", required: false },
                  { label: "E-mail *", type: "email", required: true },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-2">{f.label}</label>
                    <input type={f.type} required={f.required}
                      className="w-full bg-white border border-[#1F2328]/15 rounded-lg px-4 py-3 text-sm text-[#1F2328] focus:outline-none focus:border-[#1D4E89] transition-colors" />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-2">Telefoon</label>
                  <input type="tel"
                    className="w-full bg-white border border-[#1F2328]/15 rounded-lg px-4 py-3 text-sm text-[#1F2328] focus:outline-none focus:border-[#1D4E89] transition-colors" />
                </div>
              </div>
            </fieldset>

            <div className="border-t border-[#1F2328]/8" />

            <fieldset>
              <legend className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1D4E89] mb-6"
                style={{ fontFamily: 'var(--font-jakarta)' }}>2 — Uw aanvraag</legend>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-2">Productcategorie *</label>
                  <select required
                    className="w-full bg-white border border-[#1F2328]/15 rounded-lg px-4 py-3 text-sm text-[#1F2328] focus:outline-none focus:border-[#1D4E89] transition-colors">
                    <option value="" disabled>Selecteer een categorie</option>
                    <option value="palletten">Palletten op maat</option>
                    <option value="overige">Overige</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-2">Omschrijving aanvraag *</label>
                  <textarea rows={5} required
                    placeholder="Beschrijf uw project, gewenste afmetingen, hoeveelheden en houtsoort..."
                    className="w-full bg-white border border-[#1F2328]/15 rounded-lg px-4 py-3 text-sm text-[#1F2328] placeholder-[#1F2328]/25 focus:outline-none focus:border-[#1D4E89] transition-colors resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-2">Gewenste leverdatum</label>
                  <input type="date"
                    className="w-full bg-white border border-[#1F2328]/15 rounded-lg px-4 py-3 text-sm text-[#1F2328] focus:outline-none focus:border-[#1D4E89] transition-colors" />
                </div>
              </div>
            </fieldset>

            <button type="submit"
              className="w-full py-3 bg-[#1D4E89] text-white font-semibold rounded-lg hover:bg-[#163d6e] transition-colors text-sm">
              Offerte aanvragen
            </button>
            <p className="text-center text-xs text-[#1F2328]/30">
              Wij antwoorden binnen de 24 uur op werkdagen. Geen verplichtingen.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
