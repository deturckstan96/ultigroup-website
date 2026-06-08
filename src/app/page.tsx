"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    setTimeout(() => {
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("visible");
      });
    }, 50);
    return () => obs.disconnect();
  }, []);
}

const steps = [
  { nr: "01", titel: "Technische tekening", tekst: "Wij tekenen de pallet volledig op basis van uw productienoden." },
  { nr: "02", titel: "Productie", tekst: "Elk pallet wordt geproduceerd op maat, volgens de goedgekeurde technische tekening." },
  { nr: "03", titel: "Stock", tekst: "Wij stockeren uw palletten. U volgt uw voorraad realtime op via ons klantenportaal, de UltiApp." },
  { nr: "04", titel: "Afroep", tekst: "U roept af wanneer u ze nodig heeft, via UltiApp in drie klikken of telefonisch. Wij bevestigen dezelfde dag." },
  { nr: "05", titel: "Levering binnen 48u", tekst: "Vanuit uw eigen voorraad, op het door u gekozen adres, geleverd binnen max 48 uur na afroep." },
];

const bullets = [
  { label: "Exacte maatvoering", tekst: "Elke mm telt. Wij produceren op basis van uw technische tekening." },
  { label: "Softwood & hardwood", tekst: "Keuze uit verschillende houtsoorten, afgestemd op uw toepassing." },
  { label: "Kwaliteitscontrole", tekst: "Nagels verzonken, inslagpunten gecontroleerd, valproef conform de norm." },
];

const bullets2 = [
  { label: "Stockbreuk vermijden", tekst: "Wij bewaken uw minimumstock en grijpen in vóór u tekortkomt." },
  { label: "Afroep via UltiApp", tekst: "In drie stappen geplaatst. Live overzicht van uw beschikbaar saldo." },
  { label: "Levering binnen 48u", tekst: "Vanuit uw eigen beheerde voorraad geleverd op afroep." },
];

export default function HomePage() {
  useReveal();

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: "var(--cream)", position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)", position: "relative" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 64, minHeight: "calc(100vh - 76px)", alignItems: "center" }}>
            {/* Left */}
            <div style={{ paddingBottom: 80, paddingTop: "clamp(48px,8vw,96px)" }}>
              <div className="flex items-center gap-3 mb-8 reveal">
                <span className="eyebrow">ULTI GROUP · KORTRIJK · BE</span>
              </div>

              <h1 className="h-hero reveal reveal-d1" style={{ color: "var(--pine)", marginBottom: 28 }}>
                Palletten op maat,<br />
                <span style={{ color: "var(--accent)" }}>geleverd op afroep.</span>
              </h1>

              <p className="lead reveal reveal-d2" style={{ marginBottom: 40 }}>
                ULTI GROUP produceert houten palletten op uw exacte specificaties,
                beheert uw voorraad en levert exact wanneer u het nodig hebt.
              </p>

              <div className="flex flex-wrap gap-3 reveal reveal-d3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-white text-sm font-medium transition-colors"
                  style={{ background: "var(--pine)", padding: "14px 24px", borderRadius: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--pine-2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--pine)")}
                >
                  Offerte aanvragen
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/ultiapp"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                  style={{ border: "1.5px solid var(--pine)", color: "var(--pine)", padding: "14px 24px", borderRadius: 0 }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--pine)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--pine)"; }}
                >
                  Bekijk klantenportaal
                </Link>
              </div>
            </div>

            {/* Right photo */}
            <div className="hidden lg:block relative h-full" style={{ minHeight: "100vh" }}>
              <Image src="/p1.jpg" alt="Palletten op maat — ULTI GROUP" fill className="object-cover object-center" priority />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section style={{ background: "var(--pine)", padding: "clamp(28px,4vw,48px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              { big: "<48u", label: "Levertijd", body: "Vanaf afroep tot levering op uw bedrijf — vanuit uw eigen voorraadbeheer." },
              { big: "Live", label: "Stockupdates", body: "Realtime inzicht in uw beschikbare voorraad — 24/7 via het klantenportaal." },
              { big: "BE", label: "Belgische productie", body: "Productie, opslag en opvolging volledig in eigen beheer. Geen tussenpartijen." },
            ].map((s, i) => (
              <div
                key={s.label}
                className="reveal"
                style={{ paddingLeft: i > 0 ? 48 : 0, borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.12)" : "none", transitionDelay: `${i * 0.1}s` }}
              >
                <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,6vw,88px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1 }}>
                  {s.big}
                </p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginTop: 20 }}>{s.label}</p>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", marginTop: 10, maxWidth: "28ch", lineHeight: 1.55 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-BLEED FOTO ── */}
      <section className="relative overflow-hidden" style={{ height: "64vh", minHeight: 480 }}>
        <Image src="/p2.jpg" alt="Palletstock ULTI GROUP" fill className="object-cover object-center" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(20,53,42,0.7) 100%)" }} />
      </section>

      {/* ── HOE HET WERKT ── */}
      <section style={{ background: "var(--cream-2)", padding: "clamp(60px,8vw,120px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 80, alignItems: "start" }}>
            <div>
              <p className="eyebrow reveal mb-4">Hoe het werkt</p>
              <h2 className="h-section reveal reveal-d1" style={{ color: "var(--pine)", maxWidth: "16ch", marginBottom: 16, textTransform: "uppercase" }}>
                Van productie tot levering
              </h2>
              <p className="lead reveal reveal-d2" style={{ marginBottom: 48 }}>
                Vijf stappen, één partner. ULTI GROUP beheert het volledige proces —{" "}
                <br />van de eerste technische tekening tot de levering op uw bedrijf.
              </p>

              <div>
                {steps.map((stap, i) => (
                  <div
                    key={stap.nr}
                    className="reveal grid"
                    style={{ gridTemplateColumns: "60px 1fr", gap: 24, padding: "28px 0", borderTop: "1px solid var(--line)", borderBottom: i === steps.length - 1 ? "1px solid var(--line)" : "none", transitionDelay: `${i * 0.08}s` }}
                  >
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.04em" }}>{stap.nr}</p>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.015em", color: "var(--pine)", marginBottom: 8 }}>{stap.titel}</h3>
                      <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6, maxWidth: "44ch" }}>{stap.tekst}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block reveal reveal-d1" style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
              <Image src="/p3.jpg" alt="Palletopslag — ULTI GROUP" fill className="object-cover object-center" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTIE OP MAAT ── */}
      <section style={{ background: "var(--paper)", padding: "clamp(60px,8vw,120px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 80, alignItems: "center" }}>
            <div>
              <p className="eyebrow reveal mb-4">Op maat geproduceerd</p>
              <h2 className="h-section reveal reveal-d1" style={{ color: "var(--pine)", marginBottom: 20, textTransform: "uppercase" }}>
                Palletten voor elke afmeting.
              </h2>
              <p className="lead reveal reveal-d2" style={{ marginBottom: 36 }}>
                Elke pallet wordt geproduceerd op basis van uw exacte specificaties, lengte, breedte, hoogte en materiaal. Geen compromissen, geen standaardmaten.
              </p>

              <div>
                {bullets.map((b, i) => (
                  <div
                    key={b.label}
                    className="reveal grid"
                    style={{ gridTemplateColumns: "28px 1fr", gap: 18, padding: "24px 0", borderTop: "1px solid var(--line)", borderBottom: i === bullets.length - 1 ? "1px solid var(--line)" : "none", transitionDelay: `${i * 0.08}s` }}
                  >
                    <svg width="24" height="24" fill="none" stroke="var(--accent)" viewBox="0 0 24 24" strokeWidth={1.8} style={{ flexShrink: 0, marginTop: 2 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--pine)", marginBottom: 4 }}>{b.label}</p>
                      <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>{b.tekst}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal reveal-d1" style={{ position: "relative" }}>
              <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", background: "#fff" }}>
                <Image src="/tekening3.png" alt="Technische tekening pallet op maat — ULTI GROUP" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STOCK & LEVERING ── */}
      <section style={{ background: "var(--cream-2)", padding: "clamp(60px,8vw,120px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 80, alignItems: "center" }}>
            <div className="reveal" style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
              <Image src="/p4.jpg" alt="Palletten klaar voor levering — ULTI GROUP" fill className="object-cover object-center" />
            </div>

            <div>
              <p className="eyebrow reveal mb-4">Uw stock, onze verantwoordelijkheid</p>
              <h2 className="h-section reveal reveal-d1" style={{ color: "var(--pine)", marginBottom: 20, textTransform: "uppercase" }}>
                Altijd voorraad.<br />Direct leverbaar.
              </h2>
              <p className="lead reveal reveal-d2" style={{ marginBottom: 36 }}>
                Wij beheren uw palletvoorraad van A tot Z. U roept af wanneer u het nodig heeft — wij leveren binnen 48 uur vanuit uw beschikbare stock.
              </p>

              <div style={{ marginBottom: 40 }}>
                {bullets2.map((b, i) => (
                  <div
                    key={b.label}
                    className="reveal grid"
                    style={{ gridTemplateColumns: "28px 1fr", gap: 18, padding: "24px 0", borderTop: "1px solid var(--line)", borderBottom: i === bullets2.length - 1 ? "1px solid var(--line)" : "none", transitionDelay: `${i * 0.08}s` }}
                  >
                    <svg width="24" height="24" fill="none" stroke="var(--accent)" viewBox="0 0 24 24" strokeWidth={1.8} style={{ flexShrink: 0, marginTop: 2 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--pine)", marginBottom: 4 }}>{b.label}</p>
                      <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>{b.tekst}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-white text-sm font-medium reveal reveal-d3"
                style={{ background: "var(--pine)", padding: "14px 24px", borderRadius: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--pine-2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--pine)")}
              >
                Offerte aanvragen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}
