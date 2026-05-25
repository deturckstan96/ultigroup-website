"use client";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer style={{ background: "#14352A", color: "#fff", padding: "80px clamp(24px,5vw,80px) 32px" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        {/* Grid */}
        <div
          className="grid gap-16 pb-12"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-5">
              <Logo variant="reversed" size="sm" />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "30ch" }}>
              Belgische maakindustrie. Palletten op maat, voorraadbeheer op afroep. Sinds 2022.
            </p>
          </div>

          {/* Diensten */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.4)", letterSpacing: "0.16em" }}>Diensten</p>
            <ul className="space-y-3">
              {["Palletten op maat", "Voorraadbeheer", "UltiApp"].map((item) => (
                <li key={item}>
                  <Link href="/offerte" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.65)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#5A8C4A")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bedrijf */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.4)", letterSpacing: "0.16em" }}>Bedrijf</p>
            <ul className="space-y-3">
              {[
                { label: "Over ons", href: "/over-ons" },
                { label: "Contact", href: "/contact" },
                { label: "Offerte aanvragen", href: "/offerte" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.65)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#5A8C4A")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.4)", letterSpacing: "0.16em" }}>Contact</p>
            <ul className="space-y-3">
              {[
                "info@ultigroup.be",
                "+32 492 45 66 85",
                "Kortrijk, België",
              ].map((item) => (
                <li key={item} className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-7">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            © 2026 ULTI GROUP BV · BE 0795.537.976
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            Ontworpen voor Belgische maakindustrie
          </p>
        </div>
      </div>
    </footer>
  );
}
