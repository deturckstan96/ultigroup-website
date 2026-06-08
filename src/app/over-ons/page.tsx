"use client";
import { useEffect, useRef } from "react";
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
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>(".ug-piece, .ug-logo-text, .ug-tagline, .ug-sub")
            .forEach(node => node.classList.add("play"));
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ── ONS VERHAAL ── */}
      <section style={{ padding: "clamp(56px,8vw,96px) clamp(24px,5vw,80px) clamp(60px,8vw,100px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ maxWidth: 1440, margin: "0 auto", gap: "clamp(40px,6vw,80px)", alignItems: "start" }}>
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
                Waar veel spelers focussen op standaardafmetingen en grote volumes, kiest ULTI GROUP voor flexibiliteit, maatwerk en een directe samenwerking. Uw palletten worden geproduceerd op uw exacte maat en staan klaar in ons magazijn, leverbaar binnen 48 uur na afroep.
              </p>
              <p style={{ fontSize: 16, color: "var(--color-ink-2)", lineHeight: 1.75, maxWidth: "56ch" }}>
                Via <strong style={{ color: "var(--color-ink)", fontWeight: 600 }}>UltiApp</strong>, ons eigen klantenportaal, volgt u uw stock in realtime op, plaatst u afroepen in drie klikken en heeft u altijd zicht op geplande en historische leveringen.
              </p>
            </div>
          </div>

          <div className="reveal reveal-d1" style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
            <Image src="/p2.jpg" alt="ULTI GROUP — palletten productie" fill style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(31,35,40,0.7) 100%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 32, display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24, color: "var(--color-paper)" }}>
              {[["2022","Opgericht"],["UltiApp","Klantenportaal"],["BE","Belgisch"],["ISPM-15","Gecertificeerd"]].map(([num,lbl]) => (
                <div key={lbl}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>{num}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", marginTop: 6, fontWeight: 600 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ZO WERKEN WIJ ── */}
      <section ref={logoRef} style={{ padding: "clamp(80px,10vw,140px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>

          {/* Bovenste rij: titel links, logo rechts */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "clamp(32px,5vw,80px)", alignItems: "end", paddingBottom: "clamp(48px,6vw,80px)", borderBottom: "1px solid var(--color-line)", marginBottom: 0 }}>
            <div>
              <div className="eyebrow reveal">Onze aanpak</div>
              <h2 className="ug-tagline" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,6vw,80px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.04em", color: "var(--color-ink)", margin: "18px 0 24px", maxWidth: "14ch" }}>
                Zo werken wij.
              </h2>
            </div>

            {/* Logo — klein accent rechts */}
            <div style={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}>
              <div style={{ position: "absolute", inset: 0, background: "#1F4A38", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="ug-logo-text" style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 900, color: "#fff", letterSpacing: "-0.04em" }}>UG</span>
              </div>
              <div className="ug-piece" style={{ position: "absolute", bottom: 0, right: 0, width: 36, height: 36, background: "#8FA663" }} />
            </div>
          </div>

          {/* 3 horizontale rijen */}
          {[
            { num: "01", label: "PRODUCTIE", title: "Op maat gemaakt", body: "Geen standaardoplossingen. Elke pallet wordt geproduceerd op de exacte specificaties van uw project, afmeting, houtsoort en behandeling." },
            { num: "02", label: "LEVERING",  title: "Snelle levering",     body: "Korte communicatielijnen en efficiënte productie zorgen ervoor dat uw palletten klaarstaan wanneer u ze nodig heeft." },
            { num: "03", label: "SERVICE",   title: "Voorraad als service", body: "Klanten krijgen via ons portaal realtime inzicht in hun stock, leveringen en afroepen, volledig transparant." },
          ].map((item, i) => (
            <div key={i} className="reveal" style={{ display: "grid", gridTemplateColumns: "100px 1fr 1.4fr", gap: "clamp(24px,4vw,64px)", alignItems: "start", padding: "clamp(28px,4vw,48px) 0", borderBottom: "1px solid var(--color-line)" }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,5vw,72px)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1, color: "#8FA663", opacity: 0.35 }}>{item.num}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-ink-3)", fontWeight: 600, marginTop: 8 }}>{item.label}</div>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px,2vw,28px)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--color-ink)", lineHeight: 1.1, paddingTop: 8 }}>{item.title}</div>
              <p style={{ fontSize: 15, color: "var(--color-ink-2)", lineHeight: 1.7, paddingTop: 8 }}>{item.body}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ── TIJDLIJN ── */}
      <section style={{ padding: "clamp(60px,8vw,120px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="eyebrow reveal">Onze groei</div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "18px 0 20px", maxWidth: "18ch" }}>
            Waar ULTI GROUP vandaan komt en waar we naartoe groeien.
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ marginTop: 56, gap: 24, position: "relative" }}>
            <div style={{ position: "absolute", top: 18, left: "5%", right: "5%", height: 1, background: "var(--color-line)" }} />
            {[
              { year: "2022", title: "ULTI GROUP opgericht", body: "Start van een Belgische onderneming met focus op houten oplossingen op maat.", done: true, delay: "" },
              { year: "2024", title: "Focus op maatwerk", body: "Verdere specialisatie in niet-standaard palletten.", done: true, delay: " reveal-d2" },
              { year: "2025", title: "ISPM-15 certificering", body: "Erkenning als officieel gecertificeerde producent van warmtebehandeld hout onder een eigen ISPM-15 nummer.", done: true, delay: " reveal-d3" },
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
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ maxWidth: 1440, margin: "0 auto", gap: "clamp(40px,6vw,80px)", alignItems: "start" }}>
          {/* Portraits */}
          <div className="reveal grid grid-cols-1 sm:grid-cols-2" style={{ position: "relative", gap: 24, paddingBottom: 60 }}>
            <div style={{ aspectRatio: "4/5", overflow: "hidden", background: "var(--color-paper)", position: "relative" }}>
              <Image src="/Stan.jpg" alt="Stan Deturck — Co-founder ULTI GROUP" fill style={{ objectFit: "cover", objectPosition: "top" }} />
            </div>
            <div style={{ aspectRatio: "4/5", overflow: "hidden", marginTop: 60, position: "relative" }}>
              <Image src="/Lore.JPG" alt="Lore Deturck — Co-founder ULTI GROUP" fill style={{ objectFit: "cover", objectPosition: "top" }} />
            </div>
          </div>

          {/* Content */}
          <div style={{ paddingTop: 8 }}>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "18px 0 28px", maxWidth: "18ch" }}>
              Wat Stan en Lore belangrijk vinden.
            </h2>
            <div className="reveal reveal-d2">
              {[
                "Beiden geloven in de kracht van directe samenwerking. Geen tussenpersonen, geen onduidelijkheid. Als een klant een vraag heeft, krijgt hij dezelfde dag een antwoord. Als een levering anders loopt dan gepland, is er meteen contact.",
                "Wat hen het meest drijft: dat een klant nooit hoeft te twijfelen. Niet over de kwaliteit van het product, niet over de levertijd, niet over wat er in stock staat. Transparantie is voor hen geen extra service, het is de standaard.",
                "ULTI GROUP bouwen ze bewust klein en sterk. Niet zo groot dat de persoonlijke aanpak verloren gaat, maar groot genoeg om elke klant echt te ontzorgen.",
              ].map((p, i) => (
                <p key={i} style={{ fontSize: 16, color: "var(--color-ink-2)", lineHeight: 1.75, marginBottom: 18, maxWidth: "56ch" }}>{p}</p>
              ))}
            </div>
            <div className="reveal reveal-d3" style={{ marginTop: 36, padding: "28px 32px", borderLeft: "4px solid var(--color-blue)", background: "var(--color-paper)", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 26, fontWeight: 500, color: "var(--color-ink)", lineHeight: 1.3, maxWidth: "38ch", letterSpacing: "-0.005em" }}>
              "Elke klant verdient een pallet dat exact past, niet een compromis dat het net doet."
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
