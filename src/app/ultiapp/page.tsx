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

function volgendeAfroepDatum() {
  const d = new Date();
  d.setDate(d.getDate() + 20);
  return d.toLocaleDateString("nl-BE", { day: "numeric", month: "long" });
}

function dagenTotAfroep() {
  return 20;
}

export default function UltiAppPage() {
  useReveal();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const volgendeAfroep = volgendeAfroepDatum();

  // Kalender — altijd huidige maand, datums altijd in de toekomst
  const _today = new Date();
  const todayDay    = _today.getDate();
  const todayMonth  = _today.getMonth();
  const todayYear   = _today.getFullYear();
  const maandLabel  = (() => {
    const s = _today.toLocaleDateString("nl-BE", { month: "long", year: "numeric" });
    return s.charAt(0).toUpperCase() + s.slice(1);
  })();
  const firstDow     = (new Date(todayYear, todayMonth, 1).getDay() + 6) % 7; // Ma=0
  const daysInMonth  = new Date(todayYear, todayMonth + 1, 0).getDate();
  const addDays = (n: number) => { const d = new Date(_today); d.setDate(todayDay + n); return d; };

  function addWorkDays(base: Date, n: number): Date {
    const d = new Date(base);
    let count = 0;
    const dir = n >= 0 ? 1 : -1;
    const abs = Math.abs(n);
    while (count < abs) {
      d.setDate(d.getDate() + dir);
      const dow = d.getDay();
      if (dow !== 0 && dow !== 6) count++;
    }
    return d;
  }

  type CalType = "delivered" | "planned" | "suggested";
  const CAL_STYLES: Record<CalType, { bg: string; color: string; badge: string }> = {
    delivered: { bg: "#DBEAFE", color: "#1D4ED8", badge: "Geleverd" },
    planned:   { bg: "#FEF9C3", color: "#92400E", badge: "Levering ingepland" },
    suggested: { bg: "#FED7AA", color: "#C2410C", badge: "Voorgestelde afroep" },
  };

  const calAfroepen = [
    // Verleden — geleverd (lichtblauw) — 2 per week, werkdagen
    { d: addWorkDays(_today, -4), qty: "180 st", type: "delivered" as CalType },
    { d: addWorkDays(_today, -2), qty: "220 st", type: "delivered" as CalType },
    // Komend — ingepland (geel) — 3 en 6 werkdagen uit
    { d: addWorkDays(_today,  3), qty: "140 st", type: "planned"   as CalType },
    { d: addWorkDays(_today,  6), qty: "260 st", type: "planned"   as CalType },
    // Suggestie van de app — oranje — ~10 werkdagen
    { d: addWorkDays(_today, 10), qty: "",        type: "suggested" as CalType },
  ].map(a => ({
    ...a,
    day:     a.d.getDate(),
    inMonth: a.d.getMonth() === todayMonth,
    label:   a.d.toLocaleDateString("nl-BE", { day: "numeric", month: "short" }),
    style:   CAL_STYLES[a.type],
  }));

  const calDayMap = new Map(calAfroepen.filter(a => a.inMonth).map(a => [a.day, a.type]));

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
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ maxWidth: 1440, margin: "0 auto", gap: "clamp(32px,5vw,56px)", alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "#E8F0E5", color: "var(--pine)", borderRadius: 0, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 28, fontFamily: "var(--font-mono)" }}>
              <span style={{ width: 6, height: 6, background: "var(--accent)", borderRadius: "50%", animation: "ua-pulse 2.4s ease infinite", display: "block" }} />
              Klantenportaal
            </div>
            <h1 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(56px,9vw,140px)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 0.95, color: "var(--pine)" }}>
              Ulti<span style={{ color: "var(--accent)" }}>App</span>
            </h1>
            <div className="reveal reveal-d2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,2.2vw,28px)", fontWeight: 600, letterSpacing: "-0.02em", marginTop: 24, color: "var(--ink)", lineHeight: 1.2, maxWidth: "22ch" }}>
              Uw voorraad, leveringen en afroepen, op één centrale plaats.
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
          <div className="hidden lg:block"><DashboardDemo /></div>
        </div>
      </section>

      {/* ── VAN VOORRAAD NAAR LEVERING ── */}
      <section style={{ padding: "clamp(60px,8vw,120px) clamp(24px,5vw,80px)", background: "var(--color-paper-2)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="eyebrow reveal">Proces</div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", marginTop: 16, maxWidth: "16ch" }}>
            Van voorraad naar levering
          </h2>
          <p className="reveal reveal-d2 lead" style={{ marginTop: 16 }}>UltiApp verbindt elke stap van het proces, transparant en in realtime.</p>
          <div className="reveal reveal-d2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: 56, gap: 2, background: "var(--color-line)", border: "1px solid var(--color-line)", borderRadius: 8, overflow: "hidden" }}>
            {[
              { num: "01 · VOORRAAD", title: "Stockage", body: "Uw palletten staan klaar in onze magazijnen en zijn realtime zichtbaar via de UltiApp." },
              { num: "02 · AFROEP", title: "U plaatst de afroep", body: "Via de UltiApp in drie klikken, of per e-mail — zoals u verkiest." },
              { num: "03 · LEVERING", title: "Geleverd op de afgesproken datum", body: "Binnen de 48 uur op de door u opgegeven locatie." },
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
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ maxWidth: 1440, margin: "0 auto", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
          <div className="reveal hidden lg:block" style={{ background: "var(--color-paper)", borderRadius: 12, boxShadow: "0 24px 60px -20px rgba(31,35,40,0.15)", border: "1px solid var(--color-line)", overflow: "hidden" }}>
            {/* App topbar */}
            <div style={{ background: "var(--color-paper-2)", borderBottom: "1px solid var(--color-line)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", gap: 5 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ED6A5E", display: "block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F4BF4F", display: "block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#62C554", display: "block" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ position: "relative", width: 22, height: 22, flexShrink: 0 }}>
                  <div style={{ position: "absolute", inset: 0, background: "#1F4A38", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 7, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>UG</span>
                  </div>
                  <div style={{ position: "absolute", bottom: 0, right: 0, width: 7, height: 7, background: "#8FA663" }} />
                </div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 800, color: "var(--color-ink)", letterSpacing: "-0.02em" }}>Ulti<span style={{ color: "#8FA663" }}>App</span></span>
              </div>
            </div>
            <div style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700 }}>Voorraadanalyse</div>
              <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, color: "var(--color-blue)", background: "var(--color-blue-50)", padding: "4px 10px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 5, height: 5, background: "var(--color-blue)", borderRadius: "50%", animation: "ua-pulse 2s infinite", display: "block" }} /> Live simulatie
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, borderBottom: "1px solid var(--color-line)", marginBottom: 18 }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600 }}>UGA348-1500×3000</div>

              </div>
              <span style={{ background: "#FBEFE2", color: "var(--color-warn)", padding: "5px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600 }}>Nog {dagenTotAfroep()} dagen</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, margin: "4px 0 20px" }}>
              {[["Gem. verbruik","212 / week",false],["Laatste afroep","600 stuks",false],["Verwachte afroep", volgendeAfroep, true]].map(([lbl,val,crit],i) => (
                <div key={i} style={{ background: "var(--color-paper-2)", borderRadius: 6, padding: 12 }}>
                  <div style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ink-3)", fontWeight: 600 }}>{lbl as string}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, marginTop: 4, color: crit ? "var(--color-warn)" : "var(--color-ink)" }}>{val as string}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ink-3)", fontWeight: 600, marginBottom: 10 }}>Afroepen afgelopen 6 maanden</div>
              {(() => {
                const CHART_H = 90;
                const MAX_VAL = 1020;
                const bars = [
                  { month: "Jan", value: 780,  partial: false },
                  { month: "Feb", value: 960,  partial: false },
                  { month: "Mrt", value: 1020, partial: false },
                  { month: "Apr", value: 840,  partial: false },
                  { month: "Mei", value: 900,  partial: false },
                  { month: "Jun", value: 480,  partial: true  },
                ];
                return (
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", bottom: 20 + Math.round((900 / MAX_VAL) * CHART_H), left: 0, right: 0, borderTop: "1.5px dashed #8FA663", zIndex: 2, pointerEvents: "none" }}>
                      <span style={{ position: "absolute", right: 0, top: -14, fontSize: 9, color: "#5A8C4A", fontWeight: 600, background: "var(--color-paper)", paddingLeft: 4 }}>∅ 900 st</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: CHART_H + 20, position: "relative" }}>
                      {bars.map((bar, i) => {
                        const barH = Math.round((bar.value / MAX_VAL) * CHART_H);
                        return (
                          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                            <div style={{ fontSize: 8, fontWeight: 600, color: "var(--color-ink-2)", marginBottom: 3, whiteSpace: "nowrap" }}>
                              {bar.partial ? "" : `${bar.value} st`}
                            </div>
                            <div style={{ width: "60%", height: barH, background: bar.partial ? "var(--color-line-2)" : "#1F4A38", borderRadius: "3px 3px 0 0", opacity: bar.partial ? 0.5 : 0.85, flexShrink: 0 }} />
                            <div style={{ fontSize: 9, color: "var(--color-ink-3)", marginTop: 4 }}>{bar.month}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
              <div style={{ fontSize: 9, color: "var(--color-ink-3)", marginTop: 6 }}>Jun is lopende maand</div>
            </div>
            <button style={{ width: "100%", background: "#1F4A38", color: "#fff", border: "none", padding: "11px 0", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              Plan een afroep →
            </button>
            </div>
          </div>
          <div>
            <div className="eyebrow reveal">Voorspelling &amp; waarschuwing</div>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "18px 0 20px", maxWidth: "14ch" }}>Voorkom stockbreuken</h2>
            <p className="reveal reveal-d2 lead">UltiApp volgt het historisch verbruik per pallet en geeft tijdig aan wanneer een nieuwe afroep nodig is, zodat u nooit voor verrassingen staat.</p>
            <div className="reveal reveal-d3" style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ padding: "22px 24px", borderLeft: "3px solid var(--color-warn)", background: "#FFF8EE", borderRadius: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--color-warn)", display: "block", flexShrink: 0 }} />
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Actie binnenkort nodig</div>
                </div>
                <div style={{ fontSize: 13, color: "var(--color-ink-2)", lineHeight: 1.5 }}>
                  Op basis van uw huidig verbruik van <strong>212 stuks/week</strong> raadt UltiApp aan uw volgende afroep te plaatsen voor <strong style={{ color: "var(--color-warn)" }}>{volgendeAfroep}</strong>, zo vermijdt u stockbreuk.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AFROEPKALENDER ── */}
      <section style={{ padding: "clamp(60px,8vw,120px) clamp(24px,5vw,80px)", background: "var(--color-paper-2)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ maxWidth: 1440, margin: "0 auto", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
          <div>
            <div className="eyebrow reveal">Planning &amp; opvolging</div>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "18px 0 20px", maxWidth: "16ch" }}>Plan en volg elke afroep op.</h2>
            <p className="reveal reveal-d2 lead">In de afroepkalender ziet u per maand wanneer elke levering gepland staat en welke status die heeft, van ontvangen tot geleverd.</p>
            <div className="reveal reveal-d3" style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { bg: "#DBEAFE", color: "#1D4ED8", title: "Geleverd", body: "Leveringen die al bij u zijn aangekomen. Afroep volledig afgerond." },
                { bg: "#FEF9C3", color: "#92400E", title: "Levering ingepland", body: "Levering bevestigd." },
                { bg: "#FED7AA", color: "#C2410C", title: "Voorgestelde afroep", body: "UltiApp stelt voor om binnenkort af te roepen op basis van uw historisch verbruik. Nog niet bevestigd." },
              ].map((card, i) => (
                <div key={i} style={{ padding: "16px 20px", borderLeft: `3px solid ${card.color}`, background: card.bg, borderRadius: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: card.color, flexShrink: 0 }} />
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: card.color }}>{card.title}</div>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--color-ink-2)", lineHeight: 1.55, paddingLeft: 22 }}>{card.body}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal reveal-d2 hidden lg:block" style={{ background: "var(--color-paper)", borderRadius: 12, boxShadow: "0 24px 60px -20px rgba(31,35,40,0.15)", border: "1px solid var(--color-line)", overflow: "hidden" }}>
            {/* App topbar */}
            <div style={{ background: "var(--color-paper-2)", borderBottom: "1px solid var(--color-line)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", gap: 5 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ED6A5E", display: "block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F4BF4F", display: "block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#62C554", display: "block" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ position: "relative", width: 22, height: 22, flexShrink: 0 }}>
                  <div style={{ position: "absolute", inset: 0, background: "#1F4A38", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 7, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>UG</span>
                  </div>
                  <div style={{ position: "absolute", bottom: 0, right: 0, width: 7, height: 7, background: "#8FA663" }} />
                </div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 800, color: "var(--color-ink)", letterSpacing: "-0.02em" }}>Ulti<span style={{ color: "#8FA663" }}>App</span></span>
              </div>
            </div>
            <div style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700 }}>{maandLabel}</h4>
              <div style={{ display: "flex", gap: 4 }}>
                {["‹","›"].map((c,i) => <span key={i} style={{ width: 28, height: 28, border: "1px solid var(--color-line)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-ink-2)", fontSize: 12, cursor: "pointer" }}>{c}</span>)}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 20 }}>
              {["MA","DI","WO","DO","VR","ZA","ZO"].map(d => (
                <div key={d} style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-ink-3)", textAlign: "center", padding: "6px 0", letterSpacing: "0.08em" }}>{d}</div>
              ))}
              {Array.from({ length: firstDow }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const isToday = day === todayDay;
                const type    = calDayMap.get(day);
                const s       = type ? CAL_STYLES[type] : null;
                return (
                  <div key={day} style={{ aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, borderRadius: 6, position: "relative", background: s ? s.bg : "transparent", color: s ? s.color : isToday ? "var(--color-ink)" : "var(--color-ink-2)", fontWeight: (s || isToday) ? 700 : 400, border: isToday ? "1.5px solid var(--color-ink)" : "none" }}>
                    {day}
                    {s && <span style={{ position: "absolute", bottom: 3, width: 4, height: 4, borderRadius: "50%", background: s.color, display: "block" }} />}
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {calAfroepen.map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "52px 56px 1fr auto", gap: 10, alignItems: "center", padding: "9px 12px", borderRadius: 6, background: row.style.bg + "66", borderLeft: `3px solid ${row.style.color}`, fontSize: 12 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: row.style.color }}>{row.label}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: "var(--color-ink)" }}>{row.qty}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-ink-3)" }}>{row.type !== "suggested" ? "UGA348-1500×3000" : "UGA348"}</span>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, fontWeight: 700, whiteSpace: "nowrap", background: row.style.bg, color: row.style.color }}>{row.style.badge}</span>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MODULES ── */}
      <section style={{ padding: "clamp(60px,8vw,120px) clamp(24px,5vw,80px)", background: "var(--color-paper-2)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="eyebrow reveal">Eén omgeving</div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "18px 0 20px" }}>Eén omgeving voor alles.</h2>
          <p className="reveal reveal-d2 lead">Elk onderdeel van uw samenwerking met ULTI GROUP is beschikbaar in de UltiApp, van voorraad tot rapportering.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: 48, gap: 12, position: "relative" }}>
            {[
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>, title: "Dashboard", body: "Volledig overzicht, stock, afroepen, leveringen.", desc: "Real-time overzicht van uw volledige samenwerking. Stock, openstaande afroepen en geplande leveringen op één scherm, altijd up to date.", active: true },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>, title: "Mijn stock", body: "Realtime voorraad per artikel.", desc: "Zie per artikel hoeveel palletten klaarstaan in het magazijn. Historiek, bewegingen en reservaties zijn altijd inbegrepen." },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12h18M3 6h18M3 18h12"/><circle cx="20" cy="18" r="2"/></svg>, title: "Afroepen", body: "Plaatsen, opvolgen, valideren.", desc: "Geef zelf aan wanneer u palletten nodig heeft. Bevestiging volgt automatisch na validatie door ULTI GROUP, geen telefoon nodig." },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 7h13l5 5v5h-3"/><circle cx="8" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M3 7v11h3M11 18h3"/></svg>, title: "Leveringen", body: "Status van elk transport.", desc: "Volg elke zending van vertrek tot aankomst. Transportbewijs en vrachtbrief zijn altijd direct beschikbaar." },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3v18h18M7 14l4-4 4 4 5-7"/></svg>, title: "Voorspelling", body: "Stockbreuken voorspellen.", desc: "Op basis van uw verbruiksritme waarschuwt de UltiApp wanneer uw stock kritisch laag dreigt te worden, voor u het zelf merkt." },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h6M9 17h3"/></svg>, title: "Rapport", body: "Export, downloads, historiek.", desc: "Download maandoverzichten, exporteer naar Excel en bekijk de volledige historiek per artikel of per periode." },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>, title: "Documenten", body: "Facturen, leverbonnen, attesten.", desc: "Al uw facturen en leverbonnen — gegroepeerd per levering, altijd bereikbaar en nooit verloren." },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 5v14M5 12h14"/></svg>, title: "Meer binnenkort", body: "In ontwikkeling op uw vraag.", desc: "Nieuwe modules worden ontwikkeld op maat van uw noden. Heeft u een specifieke vraag? Laat het ons weten.", coming: true },
            ].map((tile, i) => {
              const isRight = i % 4 >= 2;
              const isBottom = i >= 4;
              const isHovered = hoveredCard === i;
              const isBlue = tile.active || isHovered;
              const isComing = (tile as any).coming;

              const popoverH: React.CSSProperties = isRight ? { right: 0 } : { left: 0 };
              const popoverV: React.CSSProperties = { top: "calc(100% + 10px)" };
              const caretStyle: React.CSSProperties = {
                top: -7, bottom: "auto",
                borderWidth: "0 7px 7px 7px",
                borderColor: "transparent transparent #14352A transparent",
              };
              const caretShadowStyle: React.CSSProperties = {
                top: -9, bottom: "auto",
                borderWidth: "0 8px 8px 8px",
                borderColor: "transparent transparent rgba(20,53,42,0.25) transparent",
              };

              return (
                <div
                  key={i}
                  className={`reveal${i%4===1?" reveal-d1":i%4===2?" reveal-d2":i%4===3?" reveal-d3":""}`}
                  style={{
                    position: "relative",
                    zIndex: isHovered ? 20 : 1,
                    background: isBlue ? "#14352A" : "var(--color-paper)",
                    border: `1px ${isComing ? "dashed" : "solid"} ${isBlue ? "#14352A" : "var(--color-line)"}`,
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
                  <div style={{ width: 28, height: 28, color: isBlue ? "#5A8C4A" : isComing ? "var(--color-ink-3)" : "#14352A", transition: "color 0.18s" }}>{tile.icon}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, letterSpacing: "-0.015em", color: isBlue ? "var(--color-paper)" : isComing ? "var(--color-ink-3)" : "var(--color-ink)", marginTop: "auto", transition: "color 0.18s" }}>{tile.title}</div>
                  <div style={{ fontSize: 12, color: isBlue ? "rgba(255,255,255,0.7)" : "var(--color-ink-3)", lineHeight: 1.5, transition: "color 0.18s" }}>{tile.body}</div>

                  {/* Floating popover — only on desktop */}
                  <div className="hidden lg:block" style={{ position: "absolute", ...popoverH, ...popoverV, width: 280, background: "#14352A", borderRadius: 10, boxShadow: "0 20px 48px -12px rgba(20,53,42,0.35)", padding: "18px 20px", zIndex: 50, pointerEvents: "none", opacity: isHovered ? 1 : 0, transform: isHovered ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.18s ease, transform 0.18s ease" }}>
                    <div style={{ position: "absolute", ...(isRight ? { right: 24 } : { left: 24 }), width: 0, height: 0, borderStyle: "solid", ...caretShadowStyle }} />
                    <div style={{ position: "absolute", ...(isRight ? { right: 25 } : { left: 25 }), width: 0, height: 0, borderStyle: "solid", ...caretStyle }} />
                    <div style={{ width: 32, height: 32, color: "#5A8C4A", marginBottom: 12 }}>{tile.icon}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "#ffffff", marginBottom: 8, letterSpacing: "-0.01em" }}>{tile.title}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{(tile as any).desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ── DARK CTA ── */}
      <section style={{ background: "var(--color-ink)", color: "var(--color-paper)", padding: "clamp(80px,10vw,140px) clamp(24px,5vw,80px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ maxWidth: 1440, margin: "0 auto", gap: 64, alignItems: "center" }}>
          <div>
            <div className="eyebrow-light reveal">Contact</div>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,72px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.02, marginTop: 18, maxWidth: "18ch" }}>
              Klaar om uw maatpalletten op afroep te hebben?
            </h2>
            <p className="reveal reveal-d2" style={{ marginTop: 24, color: "rgba(255,255,255,0.7)", maxWidth: "56ch", fontSize: "clamp(16px,1.3vw,19px)", lineHeight: 1.55 }}>
              Ontdek hoe ULTI GROUP uw verpakkingsproces eenvoudiger kan maken.
            </p>
          </div>
          <div className="reveal reveal-d2" style={{ display: "flex", alignItems: "center" }}>
            <Link href="/contact" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "14px 24px", borderRadius: 4, background: "var(--color-paper)", color: "var(--color-ink)", fontSize: 15, fontWeight: 500, letterSpacing: "0.01em", textDecoration: "none" }}>Contacteer ons →</Link>
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
