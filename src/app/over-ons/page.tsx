"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function OverOnsPage() {
  useReveal();

  return (
    <>
      {/* ── ONS VERHAAL ── */}
      <section style={{ padding: "clamp(56px,8vw,96px) clamp(24px,5vw,80px) clamp(60px,8vw,100px)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "clamp(40px,6vw,80px)", alignItems: "start" }}>
          <div>
            <div className="eyebrow reveal">Ons verhaal</div>
            <h1 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "18px 0 32px", maxWidth: "14ch" }}>
              Gestart vanuit een overtuiging.
            </h1>
            <div className="reveal reveal-d2" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <p style={{ fontSize: 16, color: "var(--color-ink-2)", lineHeight: 1.75, marginBottom: 18, maxWidth: "56ch" }}>
                ULTI GROUP werd opgericht door broer en zus <strong style={{ color: "var(--color-ink)", fontWeight: 600 }}>Stan en Lore Deturck</strong> vanuit de overtuiging dat houten verpakkingen niet standaard hoeven te zijn.
              </p>
              <p style={{ fontSize: 16, color: "var(--color-ink-2)", lineHeight: 1.75, marginBottom: 18, maxWidth: "56ch" }}>
                Waar veel spelers focussen op standaardafmetingen en grote volumes, kiest ULTI voor flexibiliteit, maatwerk en een snelle samenwerking.
              </p>
              <p style={{ fontSize: 16, color: "var(--color-ink-2)", lineHeight: 1.75, maxWidth: "56ch" }}>
                Vandaag bouwen we verder aan een Belgische onderneming die industriële klanten helpt met op maat gemaakte pallets, voorraadbeheer en betrouwbare leveringen.
              </p>
            </div>
            <div className="reveal reveal-d3" style={{ marginTop: 36, padding: "24px 28px", borderLeft: "3px solid var(--color-blue)", background: "var(--color-blue-50)", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, fontWeight: 400, color: "var(--color-ink)", lineHeight: 1.35, maxWidth: "36ch", letterSpacing: "-0.005em" }}>
              "Op maat gemaakt. Snel geleverd. Klaar voor productie."
            </div>
          </div>

          <div className="reveal reveal-d1" style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
            <Image src="/p2.jpg" alt="ULTI GROUP — palletten productie" fill style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(31,35,40,0.7) 100%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 32, display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24, color: "var(--color-paper)" }}>
              {[["2022","Opgericht"],["Flex","Maatwerk"],["B2B","Industrieel"],["BE","Belgisch"]].map(([num,lbl]) => (
                <div key={lbl}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>{num}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", marginTop: 6, fontWeight: 600 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOE WIJ WERKEN ── */}
      <section style={{ padding: "clamp(60px,8vw,120px) clamp(24px,5vw,80px)", background: "var(--color-paper-2)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="eyebrow reveal">Onze aanpak</div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "18px 0 20px", maxWidth: "16ch" }}>Hoe wij werken.</h2>
          <p className="reveal reveal-d2 lead" style={{ marginBottom: 0 }}>Drie principes die elke samenwerking met ULTI bepalen.</p>
          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              { num: "01 · PRODUCTIE", title: "Op maat gemaakt", body: "Geen standaardoplossingen. Elk pallet wordt geproduceerd op de exacte specificaties van uw project — afmeting, houtsoort en behandeling.", delay: "" },
              { num: "02 · LEVERING", title: "Snelle levering", body: "Korte communicatielijnen en efficiënte productie zorgen ervoor dat uw pallets klaarstaan wanneer u ze nodig heeft.", delay: " reveal-d1" },
              { num: "03 · SERVICE", title: "Voorraad als service", body: "Klanten krijgen via ons portaal realtime inzicht in hun stock, leveringen en afroepen — volledig transparant.", delay: " reveal-d2" },
            ].map((card, i) => (
              <div key={i} className={`reveal${card.delay}`} style={{ background: "var(--color-paper)", border: "1px solid var(--color-line)", padding: "36px 32px", display: "flex", flexDirection: "column", gap: 16, transition: "border-color 0.2s, transform 0.2s" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", color: "var(--color-blue)", fontWeight: 600 }}>{card.num}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>{card.title}</div>
                <p style={{ fontSize: 14, color: "var(--color-ink-2)", lineHeight: 1.6 }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIJDLIJN ── */}
      <section style={{ padding: "clamp(60px,8vw,120px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="eyebrow reveal">Onze groei</div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "18px 0 20px", maxWidth: "18ch" }}>
            Waar ULTI vandaan komt — en waar we naartoe groeien.
          </h2>
          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, position: "relative" }}>
            <div style={{ position: "absolute", top: 18, left: "5%", right: "5%", height: 1, background: "var(--color-line)" }} />
            {[
              { year: "2022", title: "ULTI GROUP opgericht", body: "Start van een Belgische onderneming met focus op houten oplossingen op maat.", done: true, delay: "" },
              { year: "2023", title: "Eerste industriële klanten", body: "Uitbouw van de eerste samenwerkingen met productiebedrijven.", done: true, delay: " reveal-d1" },
              { year: "2024", title: "Focus op maatwerk", body: "Verdere specialisatie in niet-standaard pallets en industriële toepassingen.", done: true, delay: " reveal-d2" },
              { year: "2026", title: "Lancering klantenportaal", body: "Realtime inzicht in stock, leveringen, afroepen en rapportering.", current: true, delay: " reveal-d3" },
            ].map((step, i) => (
              <div key={i} className={`reveal${step.delay}`} style={{ position: "relative", paddingTop: 40 }}>
                <div style={{
                  position: "absolute", top: 13, left: 0, width: 11, height: 11, borderRadius: "50%",
                  background: (step.done || step.current) ? "var(--color-blue)" : "var(--color-paper)",
                  border: `2px solid ${(step.done || step.current) ? "var(--color-blue)" : "var(--color-line-2)"}`,
                  boxShadow: step.current ? "0 0 0 6px var(--color-blue-50)" : "none",
                }} />
                <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, color: step.current ? "var(--color-blue)" : "var(--color-ink)", letterSpacing: "-0.03em", lineHeight: 1 }}>{step.year}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, marginTop: 10, letterSpacing: "-0.015em" }}>{step.title}</div>
                <p style={{ fontSize: 13, color: "var(--color-ink-2)", lineHeight: 1.55, marginTop: 8 }}>{step.body}</p>
                <span style={{ display: "inline-block", marginTop: 12, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, padding: "3px 10px", borderRadius: 999, color: step.current ? "var(--color-blue)" : "var(--color-ok)", background: step.current ? "var(--color-blue-50)" : "#E0F4E9" }}>
                  {step.current ? "● Huidig" : "✓ Voltooid"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAN & LORE ── */}
      <section style={{ padding: "clamp(60px,8vw,120px) clamp(24px,5vw,80px)", background: "var(--color-paper-2)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "clamp(40px,6vw,80px)", alignItems: "start" }}>
          {/* Portraits */}
          <div className="reveal" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, paddingBottom: 60 }}>
            <div style={{ aspectRatio: "4/5", overflow: "hidden", background: "var(--color-paper)", position: "relative" }}>
              <Image src="/Stan.jpg" alt="Stan Deturck — Co-founder ULTI GROUP" fill style={{ objectFit: "cover", objectPosition: "top" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "var(--color-paper)", padding: "16px 18px", display: "flex", justifyContent: "space-between", fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-ink)", fontWeight: 600 }}>
                <strong style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "-0.01em", textTransform: "none" }}>Stan Deturck</strong>
                <span>Co-founder</span>
              </div>
            </div>
            <div style={{ aspectRatio: "4/5", overflow: "hidden", marginTop: 60, position: "relative" }}>
              <Image src="/Lore.JPG" alt="Lore Deturck — Co-founder ULTI GROUP" fill style={{ objectFit: "cover", objectPosition: "top" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "var(--color-paper)", padding: "16px 18px", display: "flex", justifyContent: "space-between", fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-ink)", fontWeight: 600 }}>
                <strong style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "-0.01em", textTransform: "none" }}>Lore Deturck</strong>
                <span>Co-founder</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div style={{ paddingTop: 8 }}>
            <div className="eyebrow reveal">Het team</div>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "18px 0 28px", maxWidth: "18ch" }}>
              Wat Stan en Lore belangrijk vinden.
            </h2>
            <div className="reveal reveal-d2">
              {[
                "Voor veel industriële klanten was het bestellen van pallets jarenlang een traag en ondoorzichtig proces. Minimumafnames, standaardmaten die net niet pasten, weinig communicatie. Stan en Lore wilden dat anders.",
                "Ze geloven allebei in de kracht van directe samenwerking. Geen tussenpersonen, geen onduidelijkheid. Als een klant een vraag heeft, krijgt hij dezelfde dag een antwoord. Als een levering anders loopt dan gepland, is er meteen contact.",
                "Wat hen het meest drijft: dat een klant nooit hoeft te twijfelen. Niet over de kwaliteit van het product, niet over de levertijd, niet over wat er in stock staat. Transparantie is voor hen geen extra service — het is de standaard.",
                "ULTI GROUP bouwen ze bewust klein en sterk. Niet zo groot dat de persoonlijke aanpak verloren gaat, maar groot genoeg om elke klant echt te ontzorgen.",
              ].map((p, i) => (
                <p key={i} style={{ fontSize: 16, color: "var(--color-ink-2)", lineHeight: 1.75, marginBottom: 18, maxWidth: "56ch" }}>{p}</p>
              ))}
            </div>
            <div className="reveal reveal-d3" style={{ marginTop: 36, padding: "28px 32px", borderLeft: "4px solid var(--color-blue)", background: "var(--color-paper)", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 26, fontWeight: 500, color: "var(--color-ink)", lineHeight: 1.3, maxWidth: "38ch", letterSpacing: "-0.005em" }}>
              "Elke klant verdient een pallet dat exact past — niet een compromis dat het net doet."
            </div>
          </div>
        </div>
      </section>

      {/* ── WAAROM SAMENWERKEN MET ULTI ── */}
      <section style={{ padding: "clamp(60px,8vw,120px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "clamp(40px,6vw,80px)", alignItems: "start" }}>
          <div>
            <div className="eyebrow reveal">Voordelen</div>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "18px 0 20px", maxWidth: "16ch" }}>
              Waarom samenwerken met ULTI.
            </h2>
            <p className="reveal reveal-d2 lead">Zes principes die elke klant terugvindt in de dagelijkse samenwerking.</p>
            <ul className="reveal reveal-d3" style={{ listStyle: "none", marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderTop: "1px solid var(--color-line)" }}>
              {[
                "Flexibele productie — geen minimumafname",
                "Op maat gemaakte oplossingen per klant",
                "Snelle opvolging en korte communicatielijnen",
                "Industriële focus en vakkennis",
                "Voorraadbeheer als geïntegreerde service",
                "100% Belgische productie",
              ].map((item, i) => (
                <li key={i} style={{ padding: "24px 0", borderBottom: "1px solid var(--color-line)", display: "grid", gridTemplateColumns: "36px 1fr", gap: 12, alignItems: "start", ...(i%2===0 ? { paddingRight: 24 } : { paddingLeft: 24, borderLeft: "1px solid var(--color-line)" }) }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-blue)", fontWeight: 600, letterSpacing: "0.06em", marginTop: 4 }}>
                    {String(i+1).padStart(2,"0")}
                  </span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, letterSpacing: "-0.015em", color: "var(--color-ink)", lineHeight: 1.3 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal reveal-d1">
            <div className="eyebrow" style={{ marginBottom: 20 }}>In één zin</div>
            <div style={{ background: "var(--color-paper)", border: "1px solid var(--color-line)", padding: 36, marginTop: 20 }}>
              <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, fontWeight: 400, color: "var(--color-ink)", lineHeight: 1.35, marginBottom: 28, letterSpacing: "-0.005em" }}>
                "We werken enkel met industriële klanten die nood hebben aan betrouwbaarheid, snelheid en maatwerk. Geen massaproductie — wél kwaliteit op maat."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 24, borderTop: "1px solid var(--color-line)" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--color-ink)", overflow: "hidden", flexShrink: 0 }}>
                  <Image src="/Stan.jpg" alt="Stan Deturck" width={44} height={44} style={{ objectFit: "cover", objectPosition: "top" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--color-ink)" }}>Stan Deturck</div>
                  <div style={{ fontSize: 12, color: "var(--color-ink-3)", marginTop: 2 }}>Business Development · ULTI GROUP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DARK CTA ── */}
      <section style={{ background: "var(--color-ink)", color: "var(--color-paper)", padding: "clamp(80px,10vw,140px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64, alignItems: "end" }}>
          <div>
            <div className="eyebrow-light reveal">Samenwerken</div>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,72px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.02, marginTop: 20, maxWidth: "18ch" }}>
              Klaar om samen te werken?
            </h2>
            <p className="reveal reveal-d2" style={{ marginTop: 24, color: "rgba(255,255,255,0.7)", maxWidth: "56ch", fontSize: "clamp(16px,1.3vw,19px)", lineHeight: 1.55 }}>
              Ontdek hoe ULTI uw verpakkingsproces eenvoudiger kan maken.
            </p>
          </div>
          <div className="reveal reveal-d2" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Link href="/offerte" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 24px", borderRadius: 4, background: "var(--color-paper)", color: "var(--color-ink)", fontSize: 15, fontWeight: 500, letterSpacing: "0.01em", textDecoration: "none" }}>
              Vraag offerte aan →
            </Link>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 24px", borderRadius: 4, background: "transparent", color: "var(--color-paper)", fontSize: 15, fontWeight: 500, border: "1px solid rgba(255,255,255,0.3)", letterSpacing: "0.01em", textDecoration: "none" }}>
              Contacteer ons
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
