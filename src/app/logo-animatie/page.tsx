"use client";

export default function LogoAnimatiePreview() {
  return (
    <>
      <style>{`
        @keyframes rollIn {
          0%   { transform: translate(200px, -160px) rotate(720deg); opacity: 0; }
          15%  { opacity: 1; }
          78%  { transform: translate(4px, 4px) rotate(18deg); }
          90%  { transform: translate(-3px, -3px) rotate(-4deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); opacity: 1; }
        }

        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes labelFade {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }

        .piece-light {
          animation: rollIn 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
        }

        .logo-text {
          animation: fadeSlideUp 0.5s ease 1.6s both;
        }

        .label-client {
          animation: labelFade 0.4s ease 1.8s both;
        }
        .label-ulti {
          animation: labelFade 0.4s ease 2.0s both;
        }

        .tagline {
          animation: fadeSlideUp 0.6s ease 2.2s both;
        }
      `}</style>

      {/* ── DARK HERO SECTIE ── */}
      <section style={{
        background: "#14352A",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        gap: 64,
      }}>

        {/* Eyebrow */}
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
          animation: "labelFade 0.5s ease 0.1s both",
        }}>
          — Over ons — Concept preview
        </p>

        {/* ── LOGO ANIMATIE ── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 56 }}>

          {/* Logo blokken */}
          <div style={{ position: "relative", width: 160, height: 160, overflow: "visible" }}>

            {/* Donkergroen blok — DE KLANT */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 160,
              height: 160,
              background: "#1F4A38",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}>
              <span className="logo-text" style={{
                fontFamily: "var(--font-display)",
                fontSize: 48,
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "-0.04em",
              }}>
                UG
              </span>
            </div>

            {/* Lichtgroen klein vierkant — THE MISSING PIECE */}
            <div
              className="piece-light"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 48,
                height: 48,
                background: "#8FA663",
                zIndex: 2,
              }}
            />

            {/* Labels */}
            <div className="label-client" style={{
              position: "absolute",
              bottom: -58,
              left: 0,
              width: 160,
              textAlign: "center",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              fontWeight: 600,
            }}>
              De klant
            </div>
            <div className="label-ulti" style={{
              position: "absolute",
              bottom: -72,
              right: -28,
              textAlign: "center",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#8FA663",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}>
              Wij
            </div>
          </div>

          {/* Tagline */}
          <div className="tagline" style={{ textAlign: "center", maxWidth: 480 }}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: "0 0 20px",
            }}>
              Jij hebt het bedrijf.<br />
              <span style={{ color: "#5A8C4A" }}>Wij zijn het ontbrekende stuk.</span>
            </h2>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.65,
              maxWidth: 44 + "ch",
            }}>
              ULTI GROUP vult precies aan wat jouw productieproces mist — op maat gemaakte pallets, voorraad als service, en directe communicatie.
            </p>
          </div>
        </div>

        {/* ── UITLEG ONDER DE ANIMATIE ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 24,
          maxWidth: 760,
          width: "100%",
          animation: "fadeSlideUp 0.6s ease 2.6s both",
        }}>
          {[
            { kleur: "#1F4A38", label: "De klant", tekst: "Heeft een productiebehoefte. Zoekt een partner die meedenkt." },
            { kleur: "#5A8C4A", label: "ULTI GROUP", tekst: "Het ontbrekende stuk. Vult exact aan — geen minimumafnames, geen standaardmaten." },
          ].map((item) => (
            <div key={item.label} style={{
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              padding: "24px 24px",
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
            }}>
              <div style={{ width: 12, height: 12, background: item.kleur, border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 2, flexShrink: 0, marginTop: 4 }} />
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 6, fontWeight: 600 }}>
                  {item.label}
                </p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                  {item.tekst}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dev note */}
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.1em",
          animation: "labelFade 0.4s ease 3s both",
        }}>
          Preview — herlaad de pagina om de animatie opnieuw te zien
        </p>
      </section>
    </>
  );
}
