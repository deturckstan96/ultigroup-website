const contactInfo = [
  { label: "E-mail", value: "info@ultigroup.be" },
  { label: "Telefoon", value: "+32 (0)XX XX XX XX" },
  { label: "Adres", value: "Industriezone, België" },
  { label: "Openingstijden", value: "Ma–Vr: 07:00 – 17:00" },
];

export default function ContactPage() {
  return (
    <>
      <section className="pt-28 pb-12 bg-white border-b border-[#1F2328]/8">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold text-[#1D4E89] uppercase tracking-[0.25em] mb-3"
            style={{ fontFamily: 'var(--font-jakarta)' }}>Bereik ons</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1F2328] mb-4"
            style={{ fontFamily: 'var(--font-jakarta)' }}>Contact</h1>
          <p className="text-[#1F2328]/50 max-w-xl text-lg">
            Heeft u een vraag of wil u een bezoek plannen? Wij staan voor u klaar.
          </p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <h2 className="text-xl font-bold text-[#1F2328] mb-8" style={{ fontFamily: 'var(--font-jakarta)' }}>
              Contactgegevens
            </h2>
            <ul className="space-y-5">
              {contactInfo.map((c) => (
                <li key={c.label} className="flex gap-6 py-3 border-b border-[#1F2328]/6">
                  <span className="text-sm font-semibold text-[#1F2328]/35 w-32 shrink-0">{c.label}</span>
                  <span className="text-sm text-[#1F2328]">{c.value}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 p-6 bg-[#F5F7FA] rounded-xl border border-[#1F2328]/8">
              <p className="text-sm text-[#1F2328]/55 leading-relaxed">
                Voor grote bestellingen of urgente vragen kunt u ons ook rechtstreeks bereiken via e-mail.
                Wij antwoorden binnen de 24 uur op werkdagen.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F2328] mb-8" style={{ fontFamily: 'var(--font-jakarta)' }}>
              Stuur een bericht
            </h2>
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-2">Voornaam</label>
                  <input type="text" placeholder="Jan"
                    className="w-full bg-white border border-[#1F2328]/15 rounded-lg px-4 py-3 text-sm text-[#1F2328] placeholder-[#1F2328]/25 focus:outline-none focus:border-[#1D4E89] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-2">Achternaam</label>
                  <input type="text" placeholder="Peeters"
                    className="w-full bg-white border border-[#1F2328]/15 rounded-lg px-4 py-3 text-sm text-[#1F2328] placeholder-[#1F2328]/25 focus:outline-none focus:border-[#1D4E89] transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-2">E-mail</label>
                <input type="email" placeholder="jan@bedrijf.be"
                  className="w-full bg-white border border-[#1F2328]/15 rounded-lg px-4 py-3 text-sm text-[#1F2328] placeholder-[#1F2328]/25 focus:outline-none focus:border-[#1D4E89] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-2">Bericht</label>
                <textarea rows={5} placeholder="Uw vraag of opmerking..."
                  className="w-full bg-white border border-[#1F2328]/15 rounded-lg px-4 py-3 text-sm text-[#1F2328] placeholder-[#1F2328]/25 focus:outline-none focus:border-[#1D4E89] transition-colors resize-none" />
              </div>
              <button type="submit"
                className="w-full py-3 bg-[#1D4E89] text-white font-semibold rounded-lg hover:bg-[#163d6e] transition-colors text-sm">
                Verstuur bericht
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
