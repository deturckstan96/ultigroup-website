"use client";
import { useEffect, useRef, useState } from "react";

function calcDeliveryDay() {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  if (d.getDay() === 6) d.setDate(d.getDate() + 2); // za → ma
  if (d.getDay() === 0) d.setDate(d.getDate() + 1); // zo → ma
  return d;
}

export default function DashboardDemo() {
  const dashRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const dash = dashRef.current as HTMLDivElement;
    if (!dash) return;

    const cursor        = dash.querySelector<HTMLElement>(".demo-cursor")!;
    const ripple        = dash.querySelector<HTMLElement>(".click-ripple")!;
    const toast         = dash.querySelector<HTMLElement>(".demo-toast")!;
    const toastTitle    = dash.querySelector<HTMLElement>(".demo-toast-title")!;
    const toastBody     = dash.querySelector<HTMLElement>(".demo-toast-body")!;
    const toastIconPath = dash.querySelector<SVGPathElement>("#demo-toast-icon-path")!;
    const modalBd       = dash.querySelector<HTMLElement>(".demo-modal-backdrop")!;
    const modal         = dash.querySelector<HTMLElement>(".demo-modal")!;
    const modalStep1    = dash.querySelector<HTMLElement>(".modal-step-1")!;
    const modalStep2    = dash.querySelector<HTMLElement>(".modal-step-2")!;
    const modalQty      = dash.querySelector<HTMLElement>(".modal-qty")!;
    const modalCta1     = dash.querySelector<HTMLElement>(".demo-modal-cta-1")!;
    const modalCta2     = dash.querySelector<HTMLElement>(".demo-modal-cta-2")!;
    const sceneDots     = dash.querySelectorAll<HTMLElement>(".demo-scene-dot");
    const kpiStock      = dash.querySelector<HTMLElement>("#kpi-stock")!;
    const kpiAfroep     = dash.querySelector<HTMLElement>("#kpi-afroep")!;
    const recents       = dash.querySelector<HTMLElement>(".dash-recents")!;
    const stockRows     = dash.querySelectorAll<HTMLElement>(".stock-row");
    const dashView      = dash.querySelector<HTMLElement>(".dash-main-view")!;
    const calView       = dash.querySelector<HTMLElement>(".dash-calendar-view")!;
    const getCalTarget  = () => dash.querySelector<HTMLElement>(".cal-day-target")!;
    const getMiniTarget = () => dash.querySelector<HTMLElement>(".mini-cal-day.mini-target")!;

    const ICON_OK = "M20 6 9 17l-5-5";

    let paused = false;
    let inViewport = false;
    let tabVisible = !document.hidden;
    let isRunning = false;
    let destroyed = false;

    dash.addEventListener("mouseenter", () => { paused = true; });
    dash.addEventListener("mouseleave", () => { paused = false; });
    document.addEventListener("visibilitychange", onVisibility);
    function onVisibility() { tabVisible = !document.hidden; }

    const obs = new IntersectionObserver(entries => {
      inViewport = entries[0].isIntersecting;
      if (inViewport && !isRunning) startLoop();
    }, { threshold: 0.2 });
    obs.observe(dash);

    function wait(ms: number): Promise<void> {
      return new Promise(resolve => {
        let elapsed = 0;
        const tick = () => {
          if (destroyed) { resolve(); return; }
          if (!paused && tabVisible && inViewport) elapsed += 50;
          if (elapsed >= ms) resolve();
          else setTimeout(tick, 50);
        };
        tick();
      });
    }

    function countUp(el: HTMLElement, from: number, to: number, dur: number): Promise<void> {
      const startTime = performance.now();
      const dotted = el.dataset.format === "dotted";
      const suffix = el.dataset.suffix || "";
      return new Promise(resolve => {
        const tick = (now: number) => {
          if (destroyed) { resolve(); return; }
          if (paused || !tabVisible || !inViewport) { requestAnimationFrame(tick); return; }
          const t = Math.min(1, (now - startTime) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          const val = from + (to - from) * eased;
          el.textContent = (dotted ? String(Math.round(val)).replace(/\B(?=(\d{3})+(?!\d))/g, ".") : Math.round(val)) + suffix;
          if (t < 1) requestAnimationFrame(tick);
          else resolve();
        };
        requestAnimationFrame(tick);
      });
    }

    function getRel(el: HTMLElement) {
      const dr = dash.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      return { x: er.left - dr.left + er.width / 2 - 11, y: er.top - dr.top + er.height / 2 - 11 };
    }
    function showCursor() { cursor.classList.add("shown"); }
    function hideCursor() { cursor.classList.remove("shown"); }
    async function moveTo(el: HTMLElement) {
      const { x, y } = getRel(el);
      cursor.style.transform = `translate(${x}px,${y}px)`;
      await wait(450);
    }
    async function clickEl(el: HTMLElement) {
      const { x, y } = getRel(el);
      ripple.style.left = (x + 11) + "px";
      ripple.style.top  = (y + 11) + "px";
      ripple.classList.remove("go");
      void ripple.offsetWidth;
      ripple.classList.add("go");
      cursor.classList.add("clicking");
      await wait(240);
      cursor.classList.remove("clicking");
    }

    function setScene(n: number) {
      dash.setAttribute("data-scene", String(n));
      sceneDots.forEach((d, i) => {
        d.classList.remove("active", "past");
        if (i + 1 === n) d.classList.add("active");
        else if (i + 1 < n) d.classList.add("past");
      });
      // Actief nav-icoon: scene 6 = kalender (index 2), rest = dashboard (index 0)
      const activeIdx = n === 6 ? 2 : 0;
      dash.querySelectorAll<HTMLElement>(".nav-icon").forEach(el => {
        const idx = parseInt(el.dataset.idx || "0");
        el.style.background = idx === activeIdx ? "rgba(255,255,255,0.1)" : "none";
        el.style.color = idx === activeIdx ? "var(--color-paper)" : "rgba(255,255,255,0.45)";
      });
    }

    function reset() {
      kpiStock.textContent  = "0";
      kpiAfroep.textContent = "0";
      dash.querySelectorAll<HTMLElement>("[data-bar-fill]").forEach(b => { b.style.width = "0%"; });
      dash.querySelectorAll<HTMLElement>("[data-stock-val]").forEach(el => { el.textContent = "0 st"; });
      dash.querySelectorAll<HTMLElement>(".dash-pill").forEach(p => p.classList.remove("shown", "new"));
      const extra = recents.querySelector<HTMLElement>("[data-pill='3']");
      if (extra) extra.remove();
      const pill1 = recents.querySelector<HTMLElement>("[data-pill='1']");
      if (pill1) pill1.style.display = "";
      toast.classList.remove("shown", "ok");
      modalBd.classList.remove("shown");
      modal.classList.remove("shown");
      modalStep1.style.display = "";
      modalStep2.style.display = "none";
      modalQty.textContent = "0";
      dashView.style.display = "";
      calView.style.display = "none";
      getCalTarget()?.classList.remove("event");
      const dr = dash.querySelector<HTMLElement>(".cal-delivery-row");
      if (dr) dr.style.display = "none";
      dash.querySelectorAll<HTMLElement>(".mini-cal-day").forEach(d => d.classList.remove("selected"));
      hideCursor();
    }

    // Scene 1 — Voorraad
    async function scene1_dashboard() {
      setScene(1);
      await wait(240);
      countUp(kpiStock, 0, 1240, 1400);
      countUp(kpiAfroep, 0, 0, 800);
      await wait(150);
      dash.querySelectorAll<HTMLElement>("[data-bar-fill]").forEach((b, i) => {
        setTimeout(() => { b.style.width = (b.dataset.target || "0") + "%"; }, i * 220);
      });
      const stockVals = dash.querySelectorAll<HTMLElement>("[data-stock-val]");
      countUp(stockVals[0], 0, 850, 1100);
      setTimeout(() => countUp(stockVals[1], 0, 420, 1100), 220);
      setTimeout(() => countUp(stockVals[2], 0, 85, 1100), 440);
      await wait(660);
      dash.querySelectorAll<HTMLElement>(".dash-pill").forEach((p, i) => {
        setTimeout(() => p.classList.add("shown"), i * 180);
      });
      await wait(1080);
    }

    // Scene 2 — Klik op pallet
    async function scene2_click() {
      setScene(2);
      await wait(180);
      showCursor();
      await moveTo(stockRows[0] as HTMLElement);
      await wait(180);
      await clickEl(stockRows[0] as HTMLElement);
      await wait(210);
      modalBd.classList.add("shown");
      modal.classList.add("shown");
      await wait(360);
    }

    // Scene 3 — Afroep plaatsen (aantal invullen)
    async function scene3_afroep() {
      setScene(3);
      await countUp(modalQty, 0, 160, 1400);
      await wait(360);
      await moveTo(modalCta1);
      await wait(240);
      await clickEl(modalCta1);
      await wait(210);
      modalStep1.style.display = "none";
      modalStep2.style.display = "";
      await wait(180);
    }

    // Scene 4 — Kies datum (leverdatum = vandaag +48u, geen weekend)
    async function scene4_datum() {
      setScene(4);
      await wait(360);
      await moveTo(getMiniTarget());
      await wait(240);
      await clickEl(getMiniTarget());
      getMiniTarget()?.classList.add("selected");
      await wait(360);
      await moveTo(modalCta2);
      await wait(240);
      await clickEl(modalCta2);
      await wait(210);
      modal.classList.remove("shown");
      await wait(150);
      modalBd.classList.remove("shown");
      hideCursor();
      await wait(180);
    }

    // Scene 5 — Bevestigd
    async function scene5_bevestigd() {
      setScene(5);
      await wait(180);
      toastIconPath.setAttribute("d", ICON_OK);
      toast.classList.add("ok");
      toastTitle.textContent = "✓ Afroep bevestigd";
      const dateLabel = getMiniTarget()?.dataset.dateLabel ?? getMiniTarget()?.dataset.day ?? "";
      toastBody.textContent  = `AFR-2026-042 · levering ${dateLabel}`;
      toast.classList.add("shown");
      await wait(420);
      const newPill = document.createElement("div");
      newPill.className = "dash-pill new";
      newPill.setAttribute("data-pill", "3");
      newPill.innerHTML = `<div class="dash-pill-ref">AFR-2026-042</div><div class="dash-pill-status" style="color:var(--color-ok)"><span class="d" style="background:var(--color-ok)"></span> Net geplaatst</div>`;
      const pill2 = recents.querySelector<HTMLElement>("[data-pill='2']");
      const pill1 = recents.querySelector<HTMLElement>("[data-pill='1']");
      if (pill1) pill1.style.display = "none";
      if (pill2) recents.insertBefore(newPill, pill2);
      requestAnimationFrame(() => newPill.classList.add("shown"));
      await wait(300);
      kpiAfroep.classList.add("pop");
      await countUp(kpiAfroep, 0, 1, 600);
      setTimeout(() => kpiAfroep.classList.remove("pop"), 600);
      await wait(1200);
      toast.classList.remove("shown");
      await wait(300);
    }

    // Scene 6 — Kalender
    async function scene6_kalender() {
      setScene(6);
      await wait(180);
      dashView.style.display = "none";
      calView.style.display  = "";
      await wait(300);
      showCursor();
      await moveTo(getCalTarget());
      await wait(240);
      getCalTarget()?.classList.add("event");
      await wait(450);
      const deliveryRow = dash.querySelector<HTMLElement>(".cal-delivery-row");
      if (deliveryRow) deliveryRow.style.display = "flex";
      await wait(1200);
      hideCursor();
      await wait(360);
    }

    async function startLoop() {
      if (isRunning) return;
      isRunning = true;
      await wait(480);
      while (!destroyed) {
        reset();
        await wait(180);
        await scene1_dashboard();
        if (destroyed) break;
        await scene2_click();
        if (destroyed) break;
        await scene3_afroep();
        if (destroyed) break;
        await scene4_datum();
        if (destroyed) break;
        await scene5_bevestigd();
        if (destroyed) break;
        await scene6_kalender();
        if (destroyed) break;
        await wait(480);
      }
    }

    return () => {
      destroyed = true;
      document.removeEventListener("visibilitychange", onVisibility);
      obs.disconnect();
    };
  }, []);

  // Leverdatum — altijd client-side berekend na mount (geen SSR-datum)
  const _deliveryDate = mounted ? calcDeliveryDay() : (() => { const d = new Date(0); return d; })();
  const deliveryDay   = _deliveryDate.getDate();
  const deliveryMonth = (() => {
    const s = _deliveryDate.toLocaleDateString("nl-BE", { month: "long", year: "numeric" });
    return s.charAt(0).toUpperCase() + s.slice(1);
  })();
  const deliveryMonthShort = mounted
    ? _deliveryDate.toLocaleDateString("nl-BE", { month: "short" }).replace(".", "")
    : "";
  const calFirstDow   = (new Date(_deliveryDate.getFullYear(), _deliveryDate.getMonth(), 1).getDay() + 6) % 7;
  const calTotalDays  = new Date(_deliveryDate.getFullYear(), _deliveryDate.getMonth() + 1, 0).getDate();
  const calDays       = [
    ...Array.from({ length: calFirstDow }, (_, i) => -(calFirstDow - 1 - i)), // lege cellen vóór dag 1
    ...Array.from({ length: calTotalDays }, (_, i) => i + 1),
  ];

  return (
    <div
      ref={dashRef}
      className="dash reveal reveal-d1"
      id="demo-dash"
      data-scene="1"
      style={{ background: "var(--color-paper)", borderRadius: 12, boxShadow: "0 30px 80px -20px rgba(31,35,40,0.18), 0 8px 20px -8px rgba(31,35,40,0.1)", border: "1px solid var(--color-line)", overflow: "hidden", fontFamily: "var(--font-sans)", position: "relative" }}
    >
      {/* Browser bar */}
      <div style={{ background: "var(--color-paper-2)", padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid var(--color-line)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ED6A5E", display: "block" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#F4BF4F", display: "block" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#62C554", display: "block" }} />
        </div>
        <div style={{ flex: 1, background: "var(--color-paper)", padding: "6px 14px", borderRadius: 6, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-ink-3)", border: "1px solid var(--color-line)" }}>
          <span style={{ color: "var(--color-ok)", marginRight: 6 }}>●</span>portaal.ultigroup.be/dashboard
        </div>
      </div>

      {/* Body grid */}
      <div style={{ display: "grid", gridTemplateColumns: "56px 1fr", minHeight: 460 }}>

        {/* Sidebar */}
        <div style={{ background: "var(--color-ink)", padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ position: "relative", width: 32, height: 32, marginBottom: 18, flexShrink: 0 }}>
              <div style={{ position: "absolute", inset: 0, background: "#1F4A38", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 10, color: "#fff", letterSpacing: "-0.03em" }}>UG</span>
              </div>
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, background: "#8FA663" }} />
            </div>
          {[
            <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>,
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>,
            <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
            <path d="M3 3v18h18M7 17V11M12 17V7M17 17V13"/>,
          ].map((icon, i) => (
            <div key={i} className="nav-icon" data-idx={String(i)} style={{ width: 32, height: 32, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: i === 0 ? "rgba(255,255,255,0.1)" : "none", color: i === 0 ? "var(--color-paper)" : "rgba(255,255,255,0.45)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{icon}</svg>
            </div>
          ))}
        </div>

        {/* Main — two views stacked, only one shown at a time */}
        <div style={{ background: "#FBFCFD", position: "relative", overflow: "hidden" }}>

          {/* === DASHBOARD VIEW === */}
          <div className="dash-main-view" style={{ padding: "22px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 800, color: "var(--color-ink)", letterSpacing: "-0.02em" }}>Ulti<span style={{ color: "#8FA663" }}>App</span></span>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--color-ink-3)" }}>
                <span>UG BV</span>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--color-ink)", color: "var(--color-paper)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700 }}>U</div>
              </div>
            </div>

            {/* KPIs */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
              <div style={{ background: "var(--color-paper)", border: "1px solid var(--color-line)", borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-ink-3)", fontWeight: 600 }}>Stuks in stock</div>
                <div id="kpi-stock" data-format="dotted" style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", marginTop: 4, color: "var(--color-ink)" }}>0</div>
                <div style={{ fontSize: 10, color: "var(--color-ink-3)", marginTop: 2 }}>verspreid over 7 artikelen</div>
              </div>
              <div style={{ background: "var(--color-paper)", border: "1px solid var(--color-line)", borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-ink-3)", fontWeight: 600 }}>Open afroepen</div>
                <div id="kpi-afroep" style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", marginTop: 4, color: "var(--color-ink)" }}>0</div>
                <div style={{ fontSize: 10, color: "var(--color-ink-3)", marginTop: 2 }}>eerst. op 12 jun</div>
              </div>
              <div style={{ background: "var(--color-paper)", border: "1px solid var(--color-line)", borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-ink-3)", fontWeight: 600 }}>Laatste levering</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", marginTop: 4, color: "var(--color-ink)" }}>26 apr</div>
                <div style={{ fontSize: 10, color: "var(--color-ink-3)", marginTop: 2 }}>120 × PAL-2000</div>
              </div>
            </div>

            {/* Stock list */}
            <div style={{ background: "var(--color-paper)", border: "1px solid var(--color-line)", borderRadius: 8, overflow: "hidden", marginBottom: 12 }}>
              <div style={{ padding: "10px 14px", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ink-3)", fontWeight: 600, background: "var(--color-paper-2)", borderBottom: "1px solid var(--color-line)" }}>Mijn stock</div>
              {[
                { code: "UGA348 · 1500×3000", target: "850", bar: "78" },
                { code: "UGA812 · 1000×2000", target: "420", bar: "56" },
                { code: "UGA521 · 1250×2500", target: "85",  bar: "22" },
              ].map((row, i) => (
                <div key={i} className="stock-row" data-row={i + 1} style={{ padding: "10px 14px", borderBottom: i < 2 ? "1px solid var(--color-line)" : undefined, cursor: i === 0 ? "pointer" : undefined }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-ink)", fontWeight: 500 }}>{row.code}</span>
                    <span className="dash-row-stock" data-stock-val data-target={row.target} data-suffix=" st">0 st</span>
                  </div>
                  <div style={{ marginTop: 6, height: 4, background: "var(--color-paper-3)", borderRadius: 999, overflow: "hidden" }}>
                    <div data-bar-fill data-target={row.bar} style={{ height: "100%", background: "var(--color-ok)", width: "0%", transition: "width 0.9s cubic-bezier(0.2,0.8,0.2,1)" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent pills */}
            <div className="dash-recents" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div className="dash-pill" data-pill="1" style={{ background: "var(--color-paper)", border: "1px solid var(--color-line)", borderRadius: 8, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 2, transform: "translateY(8px)", opacity: 0, transition: "opacity 0.4s, transform 0.4s" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-ink-3)" }}>AFR-2026-041</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-blue)", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-blue)", display: "block" }} />Bevestigd
                </div>
              </div>
              <div className="dash-pill" data-pill="2" style={{ background: "var(--color-paper)", border: "1px solid var(--color-line)", borderRadius: 8, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 2, transform: "translateY(8px)", opacity: 0, transition: "opacity 0.4s, transform 0.4s" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-ink-3)" }}>AFR-2026-038</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-ok)", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-ok)", display: "block" }} />Geleverd
                </div>
              </div>
            </div>
          </div>

          {/* === CALENDAR VIEW (scene 6) === */}
          <div className="dash-calendar-view" style={{ display: "none", padding: "22px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "var(--color-ink)" }}>{deliveryMonth}</div>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ fontSize: 11, color: "var(--color-ink-3)", border: "1px solid var(--color-line)", borderRadius: 4, padding: "2px 8px", cursor: "pointer" }}>‹</span>
                <span style={{ fontSize: 11, color: "var(--color-ink-3)", border: "1px solid var(--color-line)", borderRadius: 4, padding: "2px 8px", cursor: "pointer" }}>›</span>
              </div>
            </div>
            {/* Day headers */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 4 }}>
              {["Ma","Di","Wo","Do","Vr","Za","Zo"].map(d => (
                <div key={d} style={{ fontSize: 9, fontWeight: 600, textAlign: "center", color: "var(--color-ink-3)", letterSpacing: "0.08em", padding: "3px 0" }}>{d}</div>
              ))}
            </div>
            {/* Day grid — dynamisch */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
              {calDays.map((d, i) => d < 1 ? <div key={`e${i}`} /> : (
                <div
                  key={d}
                  className={`cal-day cal-day-${d}${d === deliveryDay ? " cal-day-target" : ""}`}
                  style={{
                    fontSize: 11,
                    textAlign: "center",
                    padding: "5px 2px",
                    borderRadius: 4,
                    color: "var(--color-ink)",
                    fontWeight: 400,
                    border: "1px solid transparent",
                    position: "relative",
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
            {/* Leveringslijst */}
            <div style={{ marginTop: 12, borderTop: "1px solid var(--color-line)", paddingTop: 10 }}>
              <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-ink-3)", marginBottom: 8 }}>Geplande levering</div>
              <div className="cal-delivery-row" style={{ display: "none", alignItems: "center", gap: 10, padding: "10px 12px", background: "#E0F4E9", borderRadius: 6, border: "1px solid var(--color-ok)" }}>
                <span style={{ width: 8, height: 28, background: "var(--color-ok)", borderRadius: 2, flexShrink: 0, display: "block" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700, color: "var(--color-ok)" }}>160 × UGA348 · 1500×3000</div>
                  <div style={{ fontSize: 10, color: "var(--color-ink-3)", marginTop: 2 }}>Industrielaan · Kortrijk · Ingepland</div>
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, color: "var(--color-ok)", background: "#fff", padding: "2px 7px", borderRadius: 999, border: "1px solid var(--color-ok)", whiteSpace: "nowrap" }}>✓ Bevestigd</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cursor */}
      <svg className="demo-cursor" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, left: 0, width: 22, height: 22, zIndex: 20, pointerEvents: "none", opacity: 0, transition: "opacity 0.3s, transform 0.7s cubic-bezier(0.2,0.7,0.2,1)", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))" }}>
        <path d="M3 2L3 17L7.5 13L10.2 19L13 17.8L10.3 12L16 12L3 2Z" fill="white" stroke="#1F2328" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>

      {/* Ripple */}
      <div className="click-ripple" style={{ position: "absolute", width: 32, height: 32, border: "2px solid var(--color-blue)", borderRadius: "50%", zIndex: 19, pointerEvents: "none", transform: "translate(-50%,-50%) scale(0.3)", opacity: 0 }} />

      {/* Toast */}
      <div className="demo-toast" style={{ position: "absolute", top: 50, right: 14, background: "var(--color-paper)", border: "1px solid var(--color-line)", borderLeft: "3px solid var(--color-warn)", padding: "12px 14px", fontSize: 11, color: "var(--color-ink)", borderRadius: 6, boxShadow: "0 12px 32px -8px rgba(31,35,40,0.2)", transform: "translateX(120%)", opacity: 0, transition: "transform 0.5s cubic-bezier(0.2,0.8,0.2,1), opacity 0.3s", zIndex: 25, maxWidth: 240, display: "flex", gap: 8, alignItems: "flex-start" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ flexShrink: 0, width: 16, height: 16, marginTop: 1, color: "var(--color-warn)" }}>
          <path id="demo-toast-icon-path" d="M20 6 9 17l-5-5" />
        </svg>
        <div>
          <div className="demo-toast-title" style={{ fontWeight: 600, fontSize: 11 }} />
          <div className="demo-toast-body" style={{ color: "var(--color-ink-3)", fontSize: 10, marginTop: 2, lineHeight: 1.4 }} />
        </div>
      </div>

      {/* Modal */}
      <div className="demo-modal-backdrop" style={{ position: "absolute", top: 36, left: 56, right: 0, bottom: 0, background: "rgba(31,35,40,0.4)", zIndex: 26, opacity: 0, pointerEvents: "none", transition: "opacity 0.35s", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="demo-modal" style={{ background: "var(--color-paper)", borderRadius: 10, padding: 16, width: "88%", maxWidth: 300, boxShadow: "0 16px 40px -8px rgba(0,0,0,0.3)", transform: "translateY(20px)", opacity: 0, transition: "transform 0.4s cubic-bezier(0.2,0.8,0.2,1), opacity 0.3s" }}>

          {/* Step 1 — Aantal */}
          <div className="modal-step-1">
            <h5 style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 3 }}>Nieuwe bestelling</h5>
            <p style={{ fontSize: 10, color: "var(--color-ink-3)", marginBottom: 10 }}>UGA348 · 1500×3000</p>
            <div style={{ background: "var(--color-paper-2)", borderRadius: 6, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ink-3)", fontWeight: 600 }}>Aantal palletten</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--color-ink)", letterSpacing: "-0.02em" }}>
                <span className="modal-qty">0</span>
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 11 }}>
              <span style={{ color: "var(--color-ink-3)" }}>Artikel</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500 }}>UGA348</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 11, marginBottom: 12 }}>
              <span style={{ color: "var(--color-ink-3)" }}>Adres</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500 }}>Industrielaan · Kortrijk</span>
            </div>
            <button className="demo-modal-cta-1" style={{ width: "100%", background: "var(--color-ok)", color: "#fff", border: "none", padding: "11px 0", borderRadius: 6, fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              Kies datum
            </button>
          </div>

          {/* Step 2 — Datum kiezen */}
          <div className="modal-step-2" style={{ display: "none" }}>
            <h5 style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 3 }}>Gewenste leverdatum</h5>
            <p style={{ fontSize: 10, color: "var(--color-ink-3)", marginBottom: 12 }}>160 palletten · UGA348</p>
            {/* Mini calendar header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--color-ink)" }}>{deliveryMonth}</span>
            </div>
            {/* Day headers */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 3 }}>
              {["Ma","Di","Wo","Do","Vr","Za","Zo"].map(d => (
                <div key={d} style={{ fontSize: 8, textAlign: "center", color: "var(--color-ink-3)", fontWeight: 600 }}>{d}</div>
              ))}
            </div>
            {/* Mini calendar days — dynamisch */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 12 }}>
              {calDays.map((d, i) => d < 1 ? <div key={`e${i}`} /> : (
                <div
                  key={d}
                  className={`mini-cal-day${d === deliveryDay ? " mini-target" : ""}`}
                  data-day={String(d)}
                  data-date-label={d === deliveryDay ? `${d} ${deliveryMonthShort}` : undefined}
                  style={{
                    fontSize: 10,
                    textAlign: "center",
                    padding: "4px 2px",
                    borderRadius: 4,
                    cursor: "pointer",
                    background: "transparent",
                    color: "var(--color-ink)",
                    fontWeight: 400,
                    border: "1px solid transparent",
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
            <button className="demo-modal-cta-2" style={{ width: "100%", background: "var(--color-ok)", color: "#fff", border: "none", padding: "9px 0", borderRadius: 6, fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              Bevestig afroep
            </button>
          </div>
        </div>
      </div>

      {/* Scene dots — 6 scenes */}
      <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5, zIndex: 30 }}>
        {[1,2,3,4,5,6].map(i => (
          <span key={i} className="demo-scene-dot" style={{ width: 18, height: 3, borderRadius: 999, background: "rgba(31,35,40,0.15)", transition: "background 0.3s" }} />
        ))}
      </div>

      {/* Pause indicator */}
      <div className="dash-pause" style={{ position: "absolute", bottom: 10, right: 14, background: "rgba(31,35,40,0.8)", color: "var(--color-paper)", padding: "4px 10px", borderRadius: 999, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, opacity: 0, transition: "opacity 0.25s", zIndex: 30, pointerEvents: "none" }}>
        ⏸ Gepauzeerd
      </div>

      <style>{`
        #demo-dash::before {
          content: '';
          position: absolute; top: 8px; left: 50%; transform: translateX(-50%);
          background: var(--color-ink); color: var(--color-paper);
          padding: 3px 10px; border-radius: 999px;
          font-size: 9px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
          z-index: 30; pointer-events: none;
        }
        #demo-dash[data-scene="1"]::before { content: '01 · Voorraad'; }
        #demo-dash[data-scene="2"]::before { content: '02 · Bestel'; background: var(--color-blue); }
        #demo-dash[data-scene="3"]::before { content: '03 · Afroep plaatsen'; background: var(--color-blue); }
        #demo-dash[data-scene="4"]::before { content: '04 · Kies datum'; background: var(--color-ink-3); }
        #demo-dash[data-scene="5"]::before { content: '05 · Bevestigd'; background: var(--color-ok); }
        #demo-dash[data-scene="6"]::before { content: '06 · Kalender'; background: var(--color-ink); }

        #demo-dash .demo-scene-dot.active { background: var(--color-blue) !important; }
        #demo-dash .demo-scene-dot.past   { background: rgba(31,35,40,0.35) !important; }

        #demo-dash .demo-toast.shown { transform: translateX(0) !important; opacity: 1 !important; }
        #demo-dash .demo-toast.ok { border-left-color: var(--color-ok) !important; }
        #demo-dash .demo-toast.ok svg { color: var(--color-ok) !important; }

        #demo-dash .demo-modal-backdrop.shown { opacity: 1 !important; pointer-events: auto !important; }
        #demo-dash .demo-modal.shown { transform: none !important; opacity: 1 !important; }

        #demo-dash .demo-cursor.shown   { opacity: 1 !important; }
        #demo-dash .demo-cursor.clicking { animation: dash-cursor-click 0.4s ease; }
        #demo-dash .click-ripple.go { animation: dash-ripple 0.6s ease-out forwards; }

        #demo-dash .dash-pill.shown { transform: none !important; opacity: 1 !important; }
        #demo-dash .dash-pill.new   { box-shadow: 0 0 0 2px var(--color-ok); }

        #demo-dash .mini-cal-day.selected {
          background: var(--color-ok) !important;
          color: #fff !important;
          border-color: var(--color-ok) !important;
          font-weight: 700;
        }

        #demo-dash .cal-day-target.event {
          background: var(--color-ok) !important;
          color: #fff !important;
          font-weight: 700 !important;
          border-radius: 6px !important;
          padding: 6px 4px 5px !important;
          box-shadow: 0 2px 8px rgba(45,106,79,0.35) !important;
        }
        #demo-dash .cal-day-target.event::after {
          content: 'UGA348 · 160 st';
          display: block;
          font-size: 8px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          margin-top: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: 0.01em;
        }

        #demo-dash:hover .dash-pause { opacity: 1 !important; }

        @keyframes dash-cursor-click {
          0%, 100% { filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25)); }
          40% { filter: drop-shadow(0 0 0 rgba(0,0,0,0)) brightness(1.3); }
        }
        @keyframes dash-ripple {
          0%   { transform: translate(-50%,-50%) scale(0.3); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(2.4); opacity: 0; }
        }
        @keyframes dash-kpi-pop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.12); color: var(--color-blue); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
