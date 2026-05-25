"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardDemo from "@/components/DashboardDemo";

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

export default function UltiAppPage() {
  useReveal();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        padding: "clamp(56px,8vw,96px) clamp(24px,5vw,80px) 80px",
        background: "var(--color-paper)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div className="grid-bg" style={{ position: "absolute", inset: 0, zIndex: 0 }} />
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "clamp(32px,5vw,56px)", alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "#E8F0E5", color: "var(--pine)", borderRadius: 0, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 28, fontFamily: "var(--font-mono)" }}>
              <span style={{ width: 6, height: 6, background: "var(--accent)", borderRadius: "50%", animation: "ua-pulse 2.4s ease infinite", display: "block" }} />
              Klantenportaal
            </div>
            <h1 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(56px,9vw,140px)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 0.95, color: "var(--pine)" }}>
              Ulti<span style={{ color: "var(--accent)" }}>App</span>
            </h1>
            <div className="reveal reveal-d2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,2.2vw,28px)", fontWeight: 600, letterSpacing: "-0.02em", marginTop: 24, color: "var(--ink)", lineHeight: 1.2, maxWidth: "22ch" }}>
              Uw voorraad, leveringen en afroepen — op één centrale plaats.
            </div>
            <p className="reveal reveal-d3 lead" style={{ marginTop: 20, maxWidth: "48ch" }}>
              UltiApp geeft u realtime inzicht in uw beschikbare stock, laat u afroepen plaatsen en bewaakt automatisch uw minimumvoorraad per artikel.
            </p>
            <div className="reveal reveal-d3" style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
              <Link href="/portaal/login" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 0, background: "var(--pine)", color: "#fff", fontSize: 15, fontWeight: 500, letterSpacing: "0.01em", textDecoration: "none" }}>
                Klanten login →
              </Link>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 0, background: "transparent", color: "var(--pine)", fontSize: 15, fontWeight: 500, border: "1.5px solid var(--pine)", letterSpacing: "0.01em", textDecoration: "none" }}>
                Vraag een demo
              </Link>
            </div>
          </div>
          <DashboardDemo />
        </div>
      </section>

      {/* ── VAN VOORRAAD NAAR LEVERING ── */}
      <section style={{ padding: "clamp(60px,8vw,120px) clamp(24px,5vw,80px)", background: "var(--color-paper-2)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="eyebrow reveal">Proces</div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", marginTop: 16, maxWidth: "16ch" }}>
            Van voorraad naar levering
          </h2>
          <p className="reveal reveal-d2 lead" style={{ marginTop: 16 }}>UltiApp verbindt elke stap van het proces — transparant en in realtime.</p>
          <div className="reveal reveal-d2" style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, background: "var(--color-line)", border: "1px solid var(--color-line)", borderRadius: 8, overflow: "hidden" }}>
            {[
              { num: "01 · VOORRAAD", title: "Klaar in onze magazijnen", body: "Uw palletten staan klaar in onze magazijnen, beheerd in eigen voorraad." },
              { num: "02 · AFROEP", title: "U plaatst de afroep", body: "Via UltiApp — in drie klikken. Of telefonisch — zoals u verkiest." },
              { num: "03 · LEVERING", title: "Geleverd op de afgesproken datum", body: "Binnen 24 uur op de door u opgegeven locatie." },
              { num: "04 · RAPPORT", title: "Historiek automatisch beschikbaar", body: "Alle data verzameld, doorzoekbaar, downloadbaar als rapport." },
            ].map((s, i) => (
              <div key={i} style={{ background: "var(--color-paper)", padding: "32px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--color-blue)", fontWeight: 600 }}>{s.num}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--color-ink)" }}>{s.title}</div>
                <p style={{ fontSize: 14, color: "var(--color-ink-2)", lineHeight: 1.55 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STOCKBREUK SIMULATIE ── */}
      <section style={{ padding: "clamp(60px,8vw,120px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
          <div className="reveal" style={{ background: "var(--color-paper)", borderRadius: 12, boxShadow: "0 24px 60px -20px rgba(31,35,40,0.15)", border: "1px solid var(--color-line)", padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700 }}>Voorraadanalyse</div>
              <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, color: "var(--color-blue)", background: "var(--color-blue-50)", padding: "4px 10px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 5, height: 5, background: "var(--color-blue)", borderRadius: "50%", animation: "ua-pulse 2s infinite", display: "block" }} /> Live simulatie
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, borderBottom: "1px solid var(--color-line)", marginBottom: 18 }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600 }}>UGA348-1500×3000</div>
                <div style={{ fontSize: 11, color: "var(--color-ink-3)", marginTop: 2 }}>ISPM15 · Waregem stock</div>
              </div>
              <span style={{ background: "#FBEFE2", color: "var(--color-warn)", padding: "5px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600 }}>Nog 9 dagen</span>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em" }}>1.248</span>
              <span style={{ fontSize: 16, color: "var(--color-ink-3)", fontWeight: 500, marginLeft: 6 }}>stuks</span>
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ height: 10, background: "var(--color-paper-3)", borderRadius: 999, overflow: "hidden", position: "relative" }}>
                <div style={{ height: "100%", background: "var(--color-warn)", width: "32%" }} />
                <div style={{ position: "absolute", top: -4, bottom: -4, width: 2, background: "var(--color-ink)", left: "12.8%" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-ink-3)" }}>
                <span>0</span><span>500 min.</span><span>3.900 max</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, margin: "20px 0" }}>
              {[["Gem. verbruik","212 / week",false],["Laatste afroep","180 stuks",false],["Pred. stockbreuk","18 juni",true]].map(([lbl,val,crit],i) => (
                <div key={i} style={{ background: "var(--color-paper-2)", borderRadius: 6, padding: 12 }}>
                  <div style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ink-3)", fontWeight: 600 }}>{lbl as string}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, marginTop: 4, color: crit ? "var(--color-crit)" : "var(--color-ink)" }}>{val as string}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "var(--color-paper-2)", borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
              {[["Maand","Verwachte stock","Status"],["Jun 2026","1.248 st","ok:Gezond"],["Jul 2026","824 st","ok:Goed"],["Aug 2026","412 st","warn:Let op"],["Sep 2026","0 st","crit:Kritiek"]].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "10px 14px", fontSize: i === 0 ? 10 : 12, alignItems: "center", borderBottom: i < 4 ? "1px solid var(--color-line)" : "none", background: i === 0 ? "var(--color-paper-3)" : "transparent", letterSpacing: i === 0 ? "0.12em" : 0, textTransform: i === 0 ? "uppercase" : "none", color: i === 0 ? "var(--color-ink-3)" : "var(--color-ink)", fontWeight: i === 0 ? 600 : 400 }}>
                  <span>{row[0]}</span><span>{row[1]}</span>
                  {i === 0 ? <span>{row[2]}</span> : (() => {
                    const [type, label] = (row[2] as string).split(":");
                    const cm: Record<string,string> = { ok: "var(--color-ok)", warn: "var(--color-warn)", crit: "var(--color-crit)" };
                    const c = cm[type];
                    return <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: c, fontWeight: 600 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: c, display: "block" }} />{label}</span>;
                  })()}
                </div>
              ))}
            </div>
            <button style={{ width: "100%", background: "var(--color-blue)", color: "var(--color-paper)", padding: 12, borderRadius: 8, border: "none", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              → Afroep plannen
            </button>
          </div>
          <div>
            <div className="eyebrow reveal">Voorspelling &amp; waarschuwing</div>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "18px 0 20px", maxWidth: "14ch" }}>Voorkom stockbreuken</h2>
            <p className="reveal reveal-d2 lead">UltiApp volgt het historisch verbruik per pallet en geeft tijdig aan wanneer een nieuwe afroep nodig is — zodat u nooit voor verrassingen staat.</p>
            <div className="reveal reveal-d3" style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { title: "Voorraad gezond", body: "Geen actie vereist.", border: "var(--color-ok)", bg: "#EFF8F3", dot: "var(--color-ok)" },
                { title: "Actie binnenkort nodig", body: "Plan tijdig uw volgende afroep.", border: "var(--color-warn)", bg: "#FFF8EE", dot: "var(--color-warn)" },
                { title: "Afroep aanbevolen", body: "Stockbreuk dreigt — onderneem actie.", border: "var(--color-crit)", bg: "#FFF1EF", dot: "var(--color-crit)" },
              ].map((card, i) => (
                <div key={i} style={{ padding: "18px 22px", borderLeft: `3px solid ${card.border}`, background: card.bg, borderRadius: 4, display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: card.dot, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15 }}>{card.title}</div>
                    <div style={{ fontSize: 13, color: "var(--color-ink-2)", marginTop: 2 }}>{card.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AFROEPKALENDER ── */}
      <section style={{ padding: "clamp(60px,8vw,120px) clamp(24px,5vw,80px)", background: "var(--color-paper-2)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
          <div>
            <div className="eyebrow reveal">Planning &amp; opvolging</div>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "18px 0 20px", maxWidth: "16ch" }}>Plan en volg elke afroep op.</h2>
            <p className="reveal reveal-d2 lead">In de afroepkalender ziet u per maand wanneer elke levering gepland staat en welke status die heeft — van ontvangen tot geleverd.</p>
            <div className="reveal reveal-d3" style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { title: "Afroep ontvangen", body: "ULTI heeft uw afroep bevestigd.", border: "var(--color-blue)", bg: "var(--color-blue-50)", dot: "var(--color-blue)" },
                { title: "Klaar voor afhaling", body: "Stock staat klaar in het magazijn.", border: "var(--color-ok)", bg: "#EFF8F3", dot: "var(--color-ok)" },
                { title: "Transport ingepland", body: "Chauffeur en tijdslot zijn vastgelegd.", border: "var(--color-ink-3)", bg: "var(--color-paper-3)", dot: "var(--color-ink-3)" },
                { title: "Geleverd", body: "Afroep volledig afgerond.", border: "var(--color-ink)", bg: "#F8F9FA", dot: "var(--color-ink)" },
              ].map((card, i) => (
                <div key={i} style={{ padding: "18px 22px", borderLeft: `3px solid ${card.border}`, background: card.bg, borderRadius: 4, display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: card.dot, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15 }}>{card.title}</div>
                    <div style={{ fontSize: 13, color: "var(--color-ink-2)", marginTop: 2 }}>{card.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal reveal-d2" style={{ background: "var(--color-paper)", borderRadius: 12, boxShadow: "0 24px 60px -20px rgba(31,35,40,0.15)", border: "1px solid var(--color-line)", padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700 }}>Juni 2026</h4>
              <div style={{ display: "flex", gap: 4 }}>
                {["‹","›"].map((c,i) => <span key={i} style={{ width: 28, height: 28, border: "1px solid var(--color-line)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-ink-2)", fontSize: 12, cursor: "pointer" }}>{c}</span>)}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 20 }}>
              {["MA","DI","WO","DO","VR","ZA","ZO"].map(d => <div key={d} style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-ink-3)", textAlign: "center", padding: "6px 0", letterSpacing: "0.08em" }}>{d}</div>)}
              {[{d:"1"},{d:"2"},{d:"3"},{d:"4"},{d:"5",mark:true},{d:"6"},{d:"7"},{d:"8"},{d:"9"},{d:"10"},{d:"11"},{d:"12",mark:true},{d:"13"},{d:"14"},{d:"15"},{d:"16"},{d:"17",mark:true},{d:"18",today:true},{d:"19"},{d:"20"},{d:"21"},{d:"22"},{d:"23"},{d:"24"},{d:"25"},{d:"26",mark:true},{d:"27"},{d:"28"},{d:"29"},{d:"30"}].map((day, i) => (
                <div key={i} style={{ aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, borderRadius: 6, position: "relative", color: day.dim ? "var(--color-line-2)" : day.mark ? "var(--color-blue)" : "var(--color-ink-2)", fontWeight: (day.mark || day.today) ? 700 : 400, background: day.mark ? "var(--color-blue-50)" : "transparent", border: day.today ? "1.5px solid var(--color-ink)" : "none" }}>
                  {day.d}
                  {day.mark && <span style={{ position: "absolute", bottom: 4, width: 4, height: 4, borderRadius: "50%", background: "var(--color-blue)", display: "block" }} />}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { date: "5 jun", qty: "180 st", code: "UGA348-1500×3000", status: "Afroep ontvangen", ss: { background: "var(--color-blue-50)", color: "var(--color-blue)" } },
                { date: "12 jun", qty: "220 st", code: "UGA348-1500×3000", status: "Klaar", ss: { background: "#E0F4E9", color: "var(--color-ok)" } },
                { date: "17 jun", qty: "140 st", code: "UGA348-1500×3000", status: "Transport", ss: { background: "var(--color-paper-3)", color: "var(--color-ink-2)" } },
                { date: "26 jun", qty: "260 st", code: "UGA348-1500×3000", status: "Geleverd", ss: { background: "var(--color-ink)", color: "var(--color-paper)" } },
              ].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "50px 60px 1fr auto", gap: 12, alignItems: "center", padding: "10px 12px", borderRadius: 6, background: "var(--color-paper-2)", fontSize: 12 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700 }}>{row.date}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600 }}>{row.qty}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-ink-2)" }}>{row.code}</span>
                  <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, fontWeight: 600, ...row.ss }}>{row.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VERBRUIKSVOORSPELLING ── */}
      <section style={{ padding: "clamp(60px,8vw,120px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
          <div className="reveal" style={{ background: "var(--color-paper)", borderRadius: 12, boxShadow: "0 24px 60px -20px rgba(31,35,40,0.15)", border: "1px solid var(--color-line)", padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700 }}>Verbruiksvoorspelling</h4>
              <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, color: "var(--color-blue)", background: "var(--color-blue-50)", padding: "4px 10px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 5, height: 5, background: "var(--color-blue)", borderRadius: "50%", animation: "ua-pulse 2s infinite", display: "block" }} /> Live data
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.2fr", gap: 12, padding: "0 12px 10px", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-ink-3)", fontWeight: 600 }}>
              <span>Artikel</span><span>Stock</span><span>Verbruik</span><span>Stockbreuk</span>
            </div>
            {[
              { code: "UGA348", meta: "1500×3000", stock: "1.248 st", rate: "212 / wk", date: "4 jul 2026", days: "41 dagen", type: "blue" },
              { code: "UGA812", meta: "1000×2000", stock: "420 st", rate: "98 / wk", date: "23 jun 2026", days: "30 dagen", type: "warn" },
              { code: "UGA521", meta: "1250×2500", stock: "74 st", rate: "85 / wk", date: "30 mei 2026", days: "6 dagen", type: "crit" },
            ].map((row, i) => {
              const dc: Record<string,{bg:string;color:string}> = {
                blue: { bg: "var(--color-blue-50)", color: "var(--color-blue)" },
                warn: { bg: "#FBEFE2", color: "var(--color-warn)" },
                crit: { bg: "#FFE5E0", color: "var(--color-crit)" },
              };
              const c = dc[row.type];
              return (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.2fr", gap: 12, padding: "14px 12px", borderTop: "1px solid var(--color-line)", alignItems: "center", fontSize: 12 }}>
                  <div><div style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{row.code}</div><div style={{ fontSize: 10, color: "var(--color-ink-3)", marginTop: 2 }}>{row.meta}</div></div>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14 }}>{row.stock}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-ink-2)" }}>{row.rate}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 11, padding: "4px 10px", borderRadius: 999, fontWeight: 600, background: c.bg, color: c.color }}>
                    {row.date} <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, opacity: 0.7 }}>· {row.days}</span>
                  </span>
                </div>
              );
            })}
          </div>
          <div>
            <div className="eyebrow reveal">Voorspelling</div>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "18px 0 20px", maxWidth: "14ch" }}>Verbruik voorspellen.</h2>
            <p className="reveal reveal-d2 lead">UltiApp berekent op basis van uw historisch verbruik wanneer uw stock dreigt op te raken — per artikel, per week. Zo weet u op voorhand wanneer een nieuwe afroep nodig is, zonder zelf bij te houden.</p>
            <ul className="reveal reveal-d3" style={{ listStyle: "none", marginTop: 36, display: "flex", flexDirection: "column" }}>
              {[
                { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-blue)" strokeWidth="1.8"><path d="M3 3v18h18"/><path d="M7 16l4-6 4 3 5-8"/></svg>, title: "Historisch verbruik", body: "UltiApp volgt hoeveel palletten u gemiddeld per week verbruikt per artikeltype." },
                { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-blue)" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>, title: "Verwachte stockbreuk", body: "Op basis van de huidige voorraad en het verbruiksritme berekenen we de datum waarop u tekortkomt." },
                { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-blue)" strokeWidth="1.8"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>, title: "Tijdig afroep plaatsen", body: "U krijgt een signaal vóór het kritiek wordt — zodat levering altijd op tijd is." },
              ].map((item, i) => (
                <li key={i} style={{ padding: "24px 0", borderTop: "1px solid var(--color-line)", ...(i===2?{borderBottom:"1px solid var(--color-line)"}:{}), display: "grid", gridTemplateColumns: "28px 1fr", gap: 18, alignItems: "start" }}>
                  <div style={{ marginTop: 2 }}>{item.icon}</div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, marginBottom: 4 }}>{item.title}</h3>
                    <p style={{ fontSize: 14, color: "var(--color-ink-2)", lineHeight: 1.55 }}>{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── MODULES ── */}
      <section style={{ padding: "clamp(60px,8vw,120px) clamp(24px,5vw,80px)", background: "var(--color-paper-2)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="eyebrow reveal">Eén omgeving</div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "18px 0 20px", maxWidth: "16ch" }}>Eén omgeving voor alles.</h2>
          <p className="reveal reveal-d2 lead">Elk onderdeel van uw samenwerking met ULTI is beschikbaar in UltiApp — van voorraad tot rapportering.</p>
          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, position: "relative" }}>
            {[
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>, title: "Dashboard", body: "Volledig overzicht — stock, afroepen, leveringen.", desc: "Real-time overzicht van uw volledige samenwerking. Stock, openstaande afroepen en geplande leveringen op één scherm — altijd up to date.", active: true },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>, title: "Mijn stock", body: "Realtime voorraad per artikel.", desc: "Zie per artikel hoeveel palletten klaarstaan in het magazijn. Historiek, bewegingen en reservaties zijn altijd inbegrepen." },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12h18M3 6h18M3 18h12"/><circle cx="20" cy="18" r="2"/></svg>, title: "Afroepen", body: "Plaatsen, opvolgen, valideren.", desc: "Geef zelf aan wanneer u palletten nodig heeft. Bevestiging volgt automatisch na validatie door ULTI — geen telefoon nodig." },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 7h13l5 5v5h-3"/><circle cx="8" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M3 7v11h3M11 18h3"/></svg>, title: "Leveringen", body: "Status van elke transport.", desc: "Volg elke zending van vertrek tot aankomst. Transportbewijs en vrachtbrief zijn altijd direct beschikbaar." },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3v18h18M7 14l4-4 4 4 5-7"/></svg>, title: "Voorspelling", body: "Stockbreuken voorspellen.", desc: "Op basis van uw verbruiksritme waarschuwt UltiApp wanneer uw stock kritisch laag dreigt te worden — voor u het zelf merkt." },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h6M9 17h3"/></svg>, title: "Rapport", body: "Export, downloads, historiek.", desc: "Download maandoverzichten, exporteer naar Excel en bekijk de volledige historiek per artikel of per periode." },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>, title: "Documenten", body: "Facturen, leverbonnen, attesten.", desc: "Al uw facturen, leverbonnen en conformiteitsattesten — gegroepeerd per levering, altijd bereikbaar en nooit verloren." },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 5v14M5 12h14"/></svg>, title: "Meer binnenkort", body: "In ontwikkeling op uw vraag.", desc: "Nieuwe modules worden ontwikkeld op maat van uw noden. Heeft u een specifieke vraag? Laat het ons weten.", coming: true },
            ].map((tile, i) => {
              const isRight = i % 4 >= 2;
              const isBottom = i >= 4;
              const isHovered = hoveredCard === i;
              const isBlue = tile.active || isHovered;
              const isComing = (tile as any).coming;

              // Popover always appears above the card to avoid overlapping with adjacent rows
              const popoverH: React.CSSProperties = isRight ? { right: 0 } : { left: 0 };
              const popoverV: React.CSSProperties = { bottom: "calc(100% + 10px)" };
              const caretStyle: React.CSSProperties = {
                bottom: -7, top: "auto",
                borderWidth: "7px 7px 0 7px",
                borderColor: "#fff transparent transparent transparent",
              };
              const caretShadowStyle: React.CSSProperties = {
                bottom: -8, top: "auto",
                borderWidth: "8px 8px 0 8px",
                borderColor: "rgba(31,35,40,0.08) transparent transparent transparent",
              };

              return (
                <div
                  key={i}
                  className={`reveal${i%4===1?" reveal-d1":i%4===2?" reveal-d2":i%4===3?" reveal-d3":""}`}
                  style={{
                    position: "relative",
                    zIndex: isHovered ? 20 : 1,
                    background: isBlue ? "var(--color-blue)" : "var(--color-paper)",
                    border: `1px ${isComing ? "dashed" : "solid"} ${isBlue ? "var(--color-blue)" : "var(--color-line)"}`,
                    borderRadius: 10,
                    padding: "28px 24px",
                    display: "flex", flexDirection: "column", gap: 12,
                    minHeight: 160, cursor: "pointer",
                    transition: "background 0.18s, border-color 0.18s, box-shadow 0.18s, transform 0.18s",
                    boxShadow: isHovered ? "0 12px 32px -8px rgba(31,35,40,0.18)" : "none",
                    transform: isHovered ? "translateY(-3px)" : "none",
                  }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={{ width: 28, height: 28, color: isBlue ? "var(--color-paper)" : isComing ? "var(--color-ink-3)" : "var(--color-blue)", transition: "color 0.18s" }}>{tile.icon}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, letterSpacing: "-0.015em", color: isBlue ? "var(--color-paper)" : isComing ? "var(--color-ink-3)" : "var(--color-ink)", marginTop: "auto", transition: "color 0.18s" }}>{tile.title}</div>
                  <div style={{ fontSize: 12, color: isBlue ? "rgba(255,255,255,0.7)" : "var(--color-ink-3)", lineHeight: 1.5, transition: "color 0.18s" }}>{tile.body}</div>

                  {/* Floating popover — always above the card */}
                  <div style={{ position: "absolute", ...popoverH, ...popoverV, width: 280, background: "#fff", borderRadius: 10, boxShadow: "0 20px 48px -12px rgba(31,35,40,0.22), 0 0 0 1px rgba(31,35,40,0.06)", padding: "18px 20px", zIndex: 50, pointerEvents: "none", opacity: isHovered ? 1 : 0, transform: isHovered ? "translateY(0)" : "translateY(-6px)", transition: "opacity 0.18s ease, transform 0.18s ease" }}>
                    <div style={{ position: "absolute", ...(isRight ? { right: 24 } : { left: 24 }), width: 0, height: 0, borderStyle: "solid", ...caretShadowStyle }} />
                    <div style={{ position: "absolute", ...(isRight ? { right: 25 } : { left: 25 }), width: 0, height: 0, borderStyle: "solid", ...caretStyle }} />
                    <div style={{ width: 32, height: 32, color: "var(--color-blue)", marginBottom: 12 }}>{tile.icon}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "var(--color-ink)", marginBottom: 8, letterSpacing: "-0.01em" }}>{tile.title}</div>
                    <div style={{ fontSize: 13, color: "var(--color-ink-2)", lineHeight: 1.6 }}>{(tile as any).desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DARK CTA ── */}
      <section style={{ background: "var(--color-ink)", color: "var(--color-paper)", padding: "clamp(80px,10vw,140px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64, alignItems: "end" }}>
          <div>
            <div className="eyebrow-light reveal">Probeer het zelf</div>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,72px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.02, marginTop: 18, maxWidth: "18ch" }}>
              Klaar om uw stock realtime te volgen?
            </h2>
            <p className="reveal reveal-d2" style={{ marginTop: 24, color: "rgba(255,255,255,0.7)", maxWidth: "56ch", fontSize: "clamp(16px,1.3vw,19px)", lineHeight: 1.55 }}>
              Vraag een persoonlijke demo aan. Wij geven u een rondleiding door UltiApp aan de hand van uw eigen artikelen.
            </p>
          </div>
          <div className="reveal reveal-d2" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 24px", borderRadius: 4, background: "var(--color-paper)", color: "var(--color-ink)", fontSize: 15, fontWeight: 500, letterSpacing: "0.01em", textDecoration: "none" }}>Vraag een demo →</Link>
            <Link href="/portaal/login" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 24px", borderRadius: 4, background: "transparent", color: "var(--color-paper)", fontSize: 15, fontWeight: 500, border: "1px solid rgba(255,255,255,0.3)", letterSpacing: "0.01em", textDecoration: "none" }}>Klanten login</Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes ua-pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.4); opacity: 0.6; } }
        @media (max-width: 900px) {
          section > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
