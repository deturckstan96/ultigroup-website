"use client";
import Link from "next/link";
import { useState, useRef } from "react";

export default function ContactPage() {
  const [status, setStatus]     = useState<"idle"|"sending"|"ok"|"error">("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload  = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);

    let attachment = null;
    const file = fileRef.current?.files?.[0];
    if (file) {
      const base64 = await readFileAsBase64(file);
      attachment = { filename: file.name, base64, contentType: file.type };
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        voornaam:   fd.get("voornaam"),
        achternaam: fd.get("achternaam"),
        bedrijf:    fd.get("bedrijf"),
        email:      fd.get("email"),
        bericht:    fd.get("bericht"),
        attachment,
      }),
    });
    setStatus(res.ok ? "ok" : "error");
  }

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ padding: "clamp(80px,10vw,140px) clamp(24px,5vw,80px) clamp(60px,8vw,100px)", background: "var(--color-paper)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="eyebrow">Contact</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,7vw,96px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.04em", color: "var(--color-ink)", margin: "18px 0 0", maxWidth: "14ch" }}>
            Laten we kennismaken.
          </h1>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section style={{ padding: "0 clamp(24px,5vw,80px) clamp(80px,10vw,140px)", background: "var(--color-paper)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ maxWidth: 1440, margin: "0 auto", gap: "clamp(48px,8vw,120px)", alignItems: "start" }}>

          {/* Links — contactinfo */}
          <div>
            <p style={{ fontSize: 17, color: "var(--color-ink-2)", lineHeight: 1.65, maxWidth: "44ch", marginBottom: 48 }}>
              Heeft u een vraag, wilt u een offerte of wilt u gewoon eens langs komen? Wij staan voor u klaar.
            </p>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                { label: "E-mail",             value: "info@ultigroup.be",   href: "mailto:info@ultigroup.be" },
                { label: "Verkoop",            value: "+32 492 45 66 85",    href: "tel:+32492456685" },
                { label: "Admin / Facturatie", value: "+32 474 66 83 17",    href: "tel:+32474668317" },
                { label: "BTW",                value: "BE 0795 537 976",      href: undefined },
              ].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 16, padding: "20px 0", borderBottom: "1px solid var(--color-line)" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ink-3)", paddingTop: 2 }}>
                    {row.label}
                  </span>
                  {row.href ? (
                    <a href={row.href} style={{ fontSize: 15, color: "var(--color-ink)", fontWeight: 500, textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--color-ok)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--color-ink)")}>
                      {row.value}
                    </a>
                  ) : (
                    <span style={{ fontSize: 15, color: "var(--color-ink)", fontWeight: 500 }}>{row.value}</span>
                  )}
                </div>
              ))}
            </div>

          </div>

          {/* Rechts — formulier */}
          <div>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[["Voornaam", "text", "Olivier", "voornaam"], ["Achternaam", "text", "Vermeersch", "achternaam"]].map(([lbl, type, ph, name]) => (
                  <div key={lbl}>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-ink-3)", marginBottom: 8 }}>{lbl}</label>
                    <input type={type} name={name} placeholder={ph} required={name === "voornaam"}
                      style={{ width: "100%", background: "var(--color-paper)", border: "1px solid var(--color-line)", padding: "12px 16px", fontSize: 14, color: "var(--color-ink)", outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-ink-3)", marginBottom: 8 }}>Bedrijf</label>
                <input type="text" name="bedrijf" placeholder="Uw bedrijfsnaam"
                  style={{ width: "100%", background: "var(--color-paper)", border: "1px solid var(--color-line)", padding: "12px 16px", fontSize: 14, color: "var(--color-ink)", outline: "none" }} />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-ink-3)", marginBottom: 8 }}>E-mail</label>
                <input type="email" name="email" placeholder="info@bedrijf.be" required
                  style={{ width: "100%", background: "var(--color-paper)", border: "1px solid var(--color-line)", padding: "12px 16px", fontSize: 14, color: "var(--color-ink)", outline: "none" }} />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-ink-3)", marginBottom: 8 }}>Bericht</label>
                <textarea rows={5} name="bericht" placeholder="Uw vraag of opmerking..." required
                  style={{ width: "100%", background: "var(--color-paper)", border: "1px solid var(--color-line)", padding: "12px 16px", fontSize: 14, color: "var(--color-ink)", outline: "none", resize: "none", fontFamily: "inherit" }} />
              </div>

              {/* Bijlage */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-ink-3)", marginBottom: 8 }}>
                  Bijlage <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optioneel — PDF of afbeelding)</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", border: "1px solid var(--color-line)", background: "var(--color-paper)", cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--color-ink)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--color-line)")}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-ink-3)", flexShrink: 0 }}>
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                  </svg>
                  <span style={{ fontSize: 13, color: fileName ? "var(--color-ink)" : "var(--color-ink-3)" }}>
                    {fileName ?? "Kies bestand…"}
                  </span>
                  <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp"
                    style={{ display: "none" }}
                    onChange={e => setFileName(e.target.files?.[0]?.name ?? null)} />
                </label>
                {fileName && (
                  <button type="button" onClick={() => { setFileName(null); if (fileRef.current) fileRef.current.value = ""; }}
                    style={{ marginTop: 6, fontSize: 11, color: "var(--color-ink-3)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                    ✕ verwijder bijlage
                  </button>
                )}
              </div>

              {status === "ok" && (
                <div style={{ padding: "14px 18px", background: "#E0F4E9", borderLeft: "3px solid var(--color-ok)", fontSize: 14, color: "var(--color-ok)", fontWeight: 600 }}>
                  ✓ Bericht verzonden. Wij nemen zo snel mogelijk contact op.
                </div>
              )}
              {status === "error" && (
                <div style={{ padding: "14px 18px", background: "#FFE5E0", borderLeft: "3px solid var(--color-crit)", fontSize: 14, color: "var(--color-crit)", fontWeight: 600 }}>
                  Versturen mislukt. Probeer opnieuw of mail ons direct.
                </div>
              )}

              <button type="submit" disabled={status === "sending" || status === "ok"}
                style={{ background: "#14352A", color: "#fff", border: "none", padding: "16px 24px", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, cursor: status === "ok" ? "default" : "pointer", letterSpacing: "0.01em", opacity: status === "sending" ? 0.7 : 1 }}
                onMouseEnter={e => { if (status !== "ok") (e.currentTarget as HTMLButtonElement).style.background = "#1F4A38"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#14352A"; }}>
                {status === "sending" ? "Versturen…" : status === "ok" ? "Verzonden ✓" : "Verstuur bericht →"}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* ── DARK CTA ── */}
      <section style={{ background: "var(--color-ink)", color: "var(--color-paper)", padding: "clamp(80px,10vw,140px) clamp(24px,5vw,80px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ maxWidth: 1440, margin: "0 auto", gap: 64, alignItems: "end" }}>
          <div>
            <div className="eyebrow-light">Liever direct?</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,72px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.02, marginTop: 20, color: "#fff", maxWidth: "18ch" }}>
              Vraag direct een offerte aan.
            </h2>
            <p style={{ marginTop: 20, color: "rgba(255,255,255,0.6)", maxWidth: "52ch", fontSize: "clamp(16px,1.3vw,18px)", lineHeight: 1.6 }}>
              Vul uw specificaties in en ontvang binnen 24 uur een persoonlijke offerte op maat.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Link href="/offerte" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 24px", background: "var(--color-paper)", color: "var(--color-ink)", fontSize: 15, fontWeight: 500, textDecoration: "none" }}>
              Offerte aanvragen →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
