"use client";
import { useEffect, useRef } from "react";

export default function DashboardDemo() {
  const dashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dash = dashRef.current as HTMLDivElement;
    if (!dash) return;

    const cursor     = dash.querySelector<HTMLElement>(".demo-cursor")!;
    const ripple     = dash.querySelector<HTMLElement>(".click-ripple")!;
    const toast      = dash.querySelector<HTMLElement>(".demo-toast")!;
    const toastTitle = dash.querySelector<HTMLElement>(".demo-toast-title")!;
    const toastBody  = dash.querySelector<HTMLElement>(".demo-toast-body")!;
    const toastIconPath = dash.querySelector<SVGPathElement>("#demo-toast-icon-path")!;
    const modalBd    = dash.querySelector<HTMLElement>(".demo-modal-backdrop")!;
    const modal      = dash.querySelector<HTMLElement>(".demo-modal")!;
    const modalQty   = dash.querySelector<HTMLElement>(".modal-qty")!;
    const modalCta   = dash.querySelector<HTMLElement>(".demo-modal-cta")!;
    const sceneDots  = dash.querySelectorAll<HTMLElement>(".demo-scene-dot");
    const kpiStock   = dash.querySelector<HTMLElement>("#kpi-stock")!;
    const kpiAfroep  = dash.querySelector<HTMLElement>("#kpi-afroep")!;
    const row3val    = dash.querySelector<HTMLElement>("#stock-row3-val")!;
    const row3bar    = dash.querySelector<HTMLElement>("#stock-row3-bar")!;
    const row3barFill = row3bar.querySelector<HTMLElement>("[data-bar-fill]")!;
    const recents    = dash.querySelector<HTMLElement>(".dash-recents")!;
    const stockRows  = dash.querySelectorAll<HTMLElement>(".stock-row");

    const ICON_WARN = "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17v.5";
    const ICON_OK   = "M20 6 9 17l-5-5";

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
        const step = 50;
        const tick = () => {
          if (destroyed) { resolve(); return; }
          if (!paused && tabVisible && inViewport) elapsed += step;
          if (elapsed >= ms) resolve();
          else setTimeout(tick, step);
        };
        tick();
      });
    }

    function formatDotted(n: number) {
      return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function countUp(el: HTMLElement, from: number, to: number, dur: number): Promise<void> {
      const startTime = performance.now();
      const dotted = el.dataset.format === "dotted";
      const suffix = el.dataset.suffix || "";
      return new Promise(resolve => {
        const tick = (now: number) => {
          if (destroyed) { resolve(); return; }
          if (paused || !tabVisible || !inViewport) {
            requestAnimationFrame(tick);
            return;
          }
          const t = Math.min(1, (now - startTime) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          const val = from + (to - from) * eased;
          el.textContent = (dotted ? formatDotted(val) : Math.round(val)) + suffix;
          if (t < 1) requestAnimationFrame(tick);
          else resolve();
        };
        requestAnimationFrame(tick);
      });
    }

    function setCursor(x: number, y: number) {
      cursor.style.transform = `translate(${x}px, ${y}px)`;
    }
    function showCursor() { cursor.classList.add("shown"); }
    function hideCursor() { cursor.classList.remove("shown"); }

    async function rippleAt(x: number, y: number) {
      ripple.style.left = (x + 11) + "px";
      ripple.style.top  = (y + 11) + "px";
      ripple.classList.remove("go");
      void ripple.offsetWidth;
      ripple.classList.add("go");
      cursor.classList.add("clicking");
      await wait(400);
      cursor.classList.remove("clicking");
    }

    function getRel(el: HTMLElement) {
      const dr = dash.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      return {
        x: er.left - dr.left + er.width / 2 - 11,
        y: er.top  - dr.top  + er.height / 2 - 11,
      };
    }
    async function moveTo(el: HTMLElement) {
      const { x, y } = getRel(el);
      setCursor(x, y);
      await wait(750);
    }
    async function clickEl(el: HTMLElement) {
      const { x, y } = getRel(el);
      await rippleAt(x, y);
    }

    function setScene(n: number) {
      dash.setAttribute("data-scene", String(n));
      sceneDots.forEach((d, i) => {
        d.classList.remove("active", "past");
        if (i + 1 === n) d.classList.add("active");
        else if (i + 1 < n) d.classList.add("past");
      });
    }

    function setToast(kind: "ok" | "warn", title: string, body: string) {
      toast.classList.toggle("ok", kind === "ok");
      toastIconPath.setAttribute("d", kind === "ok" ? ICON_OK : ICON_WARN);
      toastTitle.textContent = title;
      toastBody.textContent  = body;
    }

    function reset() {
      kpiStock.textContent  = "0";
      kpiAfroep.textContent = "0";
      dash.querySelectorAll<HTMLElement>("[data-bar-fill]").forEach(b => { b.style.width = "0%"; });
      dash.querySelectorAll<HTMLElement>("[data-stock-val]").forEach(el => { el.textContent = "0 st"; });
      row3val.textContent = "0 st";
      row3val.classList.remove("warn");
      row3bar.classList.remove("warn");
      row3barFill.style.background = "";
      row3barFill.style.width = "0%";
      dash.querySelectorAll<HTMLElement>(".dash-pill").forEach(p => {
        p.classList.remove("shown", "new");
      });
      const extra = recents.querySelector<HTMLElement>("[data-pill=\"3\"]");
      if (extra) extra.remove();
      toast.classList.remove("shown", "ok");
      modalBd.classList.remove("shown");
      modal.classList.remove("shown");
      hideCursor();
    }

    async function scene1_dashboard() {
      setScene(1);
      await wait(400);
      countUp(kpiStock, 0, 1240, 1400);
      countUp(kpiAfroep, 0, 2, 800);
      await wait(200);
      dash.querySelectorAll<HTMLElement>("[data-bar-fill]").forEach((b, i) => {
        setTimeout(() => { b.style.width = (b.dataset.target || "0") + "%"; }, i * 220);
      });
      const stockVals = dash.querySelectorAll<HTMLElement>("[data-stock-val]");
      countUp(stockVals[0], 0, 850, 1100);
      setTimeout(() => countUp(stockVals[1], 0, 420, 1100), 220);
      setTimeout(() => {
        row3barFill.style.width = "22%";
        countUp(row3val, 0, 85, 1100);
      }, 440);
      await wait(1100);
      dash.querySelectorAll<HTMLElement>(".dash-pill").forEach((p, i) => {
        setTimeout(() => p.classList.add("shown"), i * 180);
      });
      await wait(1800);
    }

    async function scene2_warning() {
      setScene(2);
      await wait(400);
      row3val.classList.add("warn");
      row3bar.classList.add("warn");
      row3barFill.style.background = "var(--color-warn)";
      stockRows[2]?.classList.add("row-flash");
      await wait(300);
      setToast("warn", "⚠ Stockwaarschuwing", "UGA521 · kritiek over 6 dagen");
      toast.classList.add("shown");
      await wait(800);
      countUp(row3val, 85, 74, 700);
      row3barFill.style.width = "18%";
      await wait(2500);
      toast.classList.remove("shown");
      stockRows[2]?.classList.remove("row-flash");
      await wait(500);
    }

    async function scene3_afroep() {
      setScene(3);
      await wait(300);
      showCursor();
      await moveTo(stockRows[0] as HTMLElement);
      await wait(300);
      await clickEl(stockRows[0] as HTMLElement);
      await wait(300);
      modalBd.classList.add("shown");
      modal.classList.add("shown");
      await wait(600);
      await countUp(modalQty, 0, 220, 1400);
      await wait(500);
      await moveTo(modalCta);
      await wait(400);
      await clickEl(modalCta);
      await wait(400);
      modal.classList.remove("shown");
      await wait(200);
      modalBd.classList.remove("shown");
      hideCursor();
      await wait(400);
    }

    async function scene4_confirmed() {
      setScene(4);
      await wait(400);
      setToast("ok", "✓ Afroep bevestigd", "AFR-2026-042 · levering binnen 24u");
      toast.classList.add("shown");
      await wait(700);
      const newPill = document.createElement("div");
      newPill.className = "dash-pill new";
      newPill.setAttribute("data-pill", "3");
      newPill.innerHTML = `
        <div class="dash-pill-ref">AFR-2026-042</div>
        <div class="dash-pill-status" style="color: var(--color-ok)"><span class="d" style="background: var(--color-ok)"></span> Net geplaatst</div>
      `;
      const pill2 = recents.querySelector<HTMLElement>("[data-pill=\"2\"]");
      const pill1 = recents.querySelector<HTMLElement>("[data-pill=\"1\"]");
      if (pill1) pill1.style.display = "none";
      if (pill2) recents.insertBefore(newPill, pill2);
      requestAnimationFrame(() => newPill.classList.add("shown"));
      await wait(500);
      kpiAfroep.classList.add("pop");
      await countUp(kpiAfroep, 2, 3, 600);
      setTimeout(() => kpiAfroep.classList.remove("pop"), 600);
      await wait(2400);
      toast.classList.remove("shown");
      await wait(500);
      if (pill1) pill1.style.display = "";
    }

    async function startLoop() {
      if (isRunning) return;
      isRunning = true;
      await wait(800);
      while (!destroyed) {
        reset();
        await wait(300);
        await scene1_dashboard();
        if (destroyed) break;
        await scene2_warning();
        if (destroyed) break;
        await scene3_afroep();
        if (destroyed) break;
        await scene4_confirmed();
        if (destroyed) break;
        await wait(800);
      }
    }

    return () => {
      destroyed = true;
      document.removeEventListener("visibilitychange", onVisibility);
      obs.disconnect();
    };
  }, []);

  return (
    <div
      ref={dashRef}
      className="dash reveal reveal-d1"
      id="demo-dash"
      data-scene="1"
      style={{
        background: "var(--color-paper)",
        borderRadius: 12,
        boxShadow: "0 30px 80px -20px rgba(31,35,40,0.18), 0 8px 20px -8px rgba(31,35,40,0.1)",
        border: "1px solid var(--color-line)",
        overflow: "hidden",
        fontFamily: "var(--font-sans)",
        position: "relative",
      }}
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

      {/* Dashboard body */}
      <div style={{ display: "grid", gridTemplateColumns: "56px 1fr", minHeight: 460 }}>
        {/* Sidebar */}
        <div style={{ background: "var(--color-ink)", padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ width: 32, height: 32, background: "var(--color-blue)", color: "var(--color-paper)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 12, marginBottom: 18 }}>ug</div>
          <div style={{ width: 32, height: 32, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.1)", color: "var(--color-paper)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.45)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.45)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.45)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18M7 17V11M12 17V7M17 17V13"/></svg>
          </div>
        </div>

        {/* Main area */}
        <div style={{ padding: "22px 24px", background: "#FBFCFD" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--color-ink)" }}>Goedendag, ULTI GROUP BV</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--color-ink-3)" }}>
              <span>UG BV</span>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--color-ink)", color: "var(--color-paper)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700 }}>U</div>
            </div>
          </div>

          {/* KPIs */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
            <div style={{ background: "var(--color-paper)", border: "1px solid var(--color-line)", borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-ink-3)", fontWeight: 600 }}>Stuks in stock</div>
              <div id="kpi-stock" data-format="dotted" style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", marginTop: 4, color: "var(--color-ink)", transition: "color 0.4s" }}>0</div>
              <div style={{ fontSize: 10, color: "var(--color-ink-3)", marginTop: 2 }}>verspreid over 7 artikelen</div>
            </div>
            <div style={{ background: "var(--color-paper)", border: "1px solid var(--color-line)", borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-ink-3)", fontWeight: 600 }}>Open afroepen</div>
              <div id="kpi-afroep" style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", marginTop: 4, color: "var(--color-ink)", transition: "color 0.4s" }}>0</div>
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
            <div className="stock-row" data-row="1" style={{ padding: "10px 14px", borderBottom: "1px solid var(--color-line)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-ink)", fontWeight: 500 }}>UGA348 · 1500×3000</span>
                <span className="dash-row-stock" data-stock-val data-target="850" data-suffix=" st">0 st</span>
              </div>
              <div className="dash-row-bar" style={{ marginTop: 6, height: 4, background: "var(--color-paper-3)", borderRadius: 999, overflow: "hidden" }}>
                <div data-bar-fill data-target="78" style={{ height: "100%", background: "var(--color-ok)", width: "0%", transition: "width 0.9s cubic-bezier(0.2,0.8,0.2,1), background 0.4s" }} />
              </div>
            </div>
            <div className="stock-row" data-row="2" style={{ padding: "10px 14px", borderBottom: "1px solid var(--color-line)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-ink)", fontWeight: 500 }}>UGA812 · 1000×2000</span>
                <span className="dash-row-stock" data-stock-val data-target="420" data-suffix=" st">0 st</span>
              </div>
              <div className="dash-row-bar" style={{ marginTop: 6, height: 4, background: "var(--color-paper-3)", borderRadius: 999, overflow: "hidden" }}>
                <div data-bar-fill data-target="56" style={{ height: "100%", background: "var(--color-ok)", width: "0%", transition: "width 0.9s cubic-bezier(0.2,0.8,0.2,1), background 0.4s" }} />
              </div>
            </div>
            <div className="stock-row" data-row="3" style={{ padding: "10px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-ink)", fontWeight: 500 }}>UGA521 · 1250×2500</span>
                <span id="stock-row3-val" className="dash-row-stock" data-target="85" data-suffix=" st">0 st</span>
              </div>
              <div id="stock-row3-bar" className="dash-row-bar" style={{ marginTop: 6, height: 4, background: "var(--color-paper-3)", borderRadius: 999, overflow: "hidden" }}>
                <div data-bar-fill data-target="22" style={{ height: "100%", background: "var(--color-ok)", width: "0%", transition: "width 0.9s cubic-bezier(0.2,0.8,0.2,1), background 0.4s" }} />
              </div>
            </div>
          </div>

          {/* Recent pills */}
          <div className="dash-recents" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div className="dash-pill" data-pill="1" style={{ background: "var(--color-paper)", border: "1px solid var(--color-line)", borderRadius: 8, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 2, transform: "translateY(8px)", opacity: 0, transition: "opacity 0.4s, transform 0.4s" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-ink-3)" }}>AFR-2026-041</div>
              <div className="dash-pill-status blue" style={{ fontSize: 11, fontWeight: 600, color: "var(--color-blue)", display: "flex", alignItems: "center", gap: 6 }}>
                <span className="d" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-blue)", display: "block" }} />
                Bevestigd
              </div>
            </div>
            <div className="dash-pill" data-pill="2" style={{ background: "var(--color-paper)", border: "1px solid var(--color-line)", borderRadius: 8, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 2, transform: "translateY(8px)", opacity: 0, transition: "opacity 0.4s, transform 0.4s" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-ink-3)" }}>AFR-2026-038</div>
              <div className="dash-pill-status" style={{ fontSize: 11, fontWeight: 600, color: "var(--color-ok)", display: "flex", alignItems: "center", gap: 6 }}>
                <span className="d" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-ok)", display: "block" }} />
                Geleverd
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
        <svg className="demo-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ flexShrink: 0, width: 16, height: 16, marginTop: 1, color: "var(--color-warn)" }}>
          <path id="demo-toast-icon-path" d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17v.5" />
        </svg>
        <div>
          <div className="demo-toast-title" style={{ fontWeight: 600, fontSize: 11 }}>Stockwaarschuwing</div>
          <div className="demo-toast-body" style={{ color: "var(--color-ink-3)", fontSize: 10, marginTop: 2, lineHeight: 1.4 }}>UGA521 · kritiek over 6 dagen</div>
        </div>
      </div>

      {/* Modal backdrop */}
      <div className="demo-modal-backdrop" style={{ position: "absolute", top: 36, left: 56, right: 0, bottom: 0, background: "rgba(31,35,40,0.4)", zIndex: 26, opacity: 0, pointerEvents: "none", transition: "opacity 0.35s", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="demo-modal" style={{ background: "var(--color-paper)", borderRadius: 10, padding: 20, width: "86%", maxWidth: 320, boxShadow: "0 16px 40px -8px rgba(0,0,0,0.3)", transform: "translateY(20px)", opacity: 0, transition: "transform 0.4s cubic-bezier(0.2,0.8,0.2,1), opacity 0.3s" }}>
          <h5 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 4 }}>Nieuwe afroep</h5>
          <p style={{ fontSize: 11, color: "var(--color-ink-3)", marginBottom: 16 }}>UGA348 · 1500×3000 — beschikbaar in Waregem</p>
          <div style={{ background: "var(--color-paper-2)", borderRadius: 6, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ink-3)", fontWeight: 600 }}>Aantal</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--color-ink)", letterSpacing: "-0.02em" }}>
              <span className="modal-qty">0</span> stuks
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 11 }}>
            <span style={{ color: "var(--color-ink-3)" }}>Levering</span><span style={{ color: "var(--color-ink)", fontWeight: 500, fontFamily: "var(--font-mono)", fontSize: 10 }}>binnen 24u</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 11 }}>
            <span style={{ color: "var(--color-ink-3)" }}>Referentie</span><span style={{ color: "var(--color-ink)", fontWeight: 500, fontFamily: "var(--font-mono)", fontSize: 10 }}>AFR-2026-042</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 11 }}>
            <span style={{ color: "var(--color-ink-3)" }}>Adres</span><span style={{ color: "var(--color-ink)", fontWeight: 500, fontFamily: "var(--font-mono)", fontSize: 10 }}>HQ · Kortrijk</span>
          </div>
          <button className="demo-modal-cta" style={{ width: "100%", background: "var(--color-blue)", color: "var(--color-paper)", border: "none", padding: 10, borderRadius: 6, fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, cursor: "pointer", marginTop: 12 }}>
            → Bevestig afroep
          </button>
        </div>
      </div>

      {/* Scene dots */}
      <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6, zIndex: 30 }}>
        <span className="demo-scene-dot active" style={{ width: 22, height: 3, borderRadius: 999, background: "var(--color-blue)", transition: "background 0.3s" }} />
        <span className="demo-scene-dot" style={{ width: 22, height: 3, borderRadius: 999, background: "rgba(31,35,40,0.15)", transition: "background 0.3s" }} />
        <span className="demo-scene-dot" style={{ width: 22, height: 3, borderRadius: 999, background: "rgba(31,35,40,0.15)", transition: "background 0.3s" }} />
        <span className="demo-scene-dot" style={{ width: 22, height: 3, borderRadius: 999, background: "rgba(31,35,40,0.15)", transition: "background 0.3s" }} />
      </div>

      {/* Pause indicator */}
      <div className="dash-pause" style={{ position: "absolute", bottom: 10, right: 14, background: "rgba(31,35,40,0.8)", color: "var(--color-paper)", padding: "4px 10px", borderRadius: 999, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, opacity: 0, transition: "opacity 0.25s", zIndex: 30, pointerEvents: "none" }}>
        ⏸ Gepauzeerd
      </div>

      {/* Scene label pseudo-element substitute */}
      <style>{`
        #demo-dash::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--color-ink);
          color: var(--color-paper);
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          z-index: 30;
          pointer-events: none;
        }
        #demo-dash[data-scene="1"]::before { content: '01 · Voorraad'; }
        #demo-dash[data-scene="2"]::before { content: '02 · Waarschuwing'; background: var(--color-warn); }
        #demo-dash[data-scene="3"]::before { content: '03 · Afroep plaatsen'; background: var(--color-blue); }
        #demo-dash[data-scene="4"]::before { content: '04 · Bevestigd'; background: var(--color-ok); }
        #demo-dash .demo-toast.shown { transform: translateX(0) !important; opacity: 1 !important; }
        #demo-dash .demo-toast.ok { border-left-color: var(--color-ok) !important; }
        #demo-dash .demo-toast.ok .demo-toast-icon { color: var(--color-ok) !important; }
        #demo-dash .demo-modal-backdrop.shown { opacity: 1 !important; }
        #demo-dash .demo-modal.shown { transform: none !important; opacity: 1 !important; }
        #demo-dash .demo-cursor.shown { opacity: 1 !important; }
        #demo-dash .demo-cursor.clicking { animation: dash-cursor-click 0.4s ease; }
        #demo-dash .click-ripple.go { animation: dash-ripple 0.6s ease-out; }
        #demo-dash .dash-pill.shown { transform: none !important; opacity: 1 !important; }
        #demo-dash .dash-pill.new { box-shadow: 0 0 0 2px var(--color-ok); }
        #demo-dash .dash-row-stock.warn { color: var(--color-warn) !important; }
        #demo-dash .dash-row-bar.warn > div { background: var(--color-warn) !important; }
        #demo-dash .stock-row.row-flash { animation: dash-row-flash 0.6s ease; }
        #demo-dash .kpi-val.pop { animation: dash-kpi-pop 0.5s ease; }
        #demo-dash:hover .dash-pause { opacity: 1 !important; }
        @keyframes dash-cursor-click {
          0%, 100% { filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25)); }
          40% { filter: drop-shadow(0 0 0 rgba(0,0,0,0)) brightness(1.3); }
        }
        @keyframes dash-ripple {
          0% { transform: translate(-50%,-50%) scale(0.3); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(2.4); opacity: 0; }
        }
        @keyframes dash-row-flash {
          0%, 100% { background: transparent; }
          50% { background: #FFF1EF; }
        }
        @keyframes dash-kpi-pop {
          0% { transform: scale(1); }
          40% { transform: scale(1.12); color: var(--color-blue); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
