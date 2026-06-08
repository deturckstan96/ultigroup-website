"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/ultiapp", label: "Klantenportaal" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        height: "76px",
        background: "rgba(238,240,234,0.94)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid #D4D8CE",
        padding: "0 clamp(24px, 5vw, 80px)",
      }}
    >
      {/* Left: logo + links */}
      <div className="flex items-center gap-12">
        <Link href="/">
          <Logo size="sm" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium transition-colors"
                style={{ color: active ? "#14352A" : "#3A3F46" }}
              >
                {link.label}
                {active && (
                  <span
                    className="absolute left-0 right-0 bg-[#14352A]"
                    style={{ height: 2, bottom: -28 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Right: CTA buttons */}
      <div className="hidden md:flex items-center gap-3">
        <Link
          href="/offerte"
          className="inline-flex items-center gap-2 text-white text-sm font-medium transition-colors"
          style={{ background: "#14352A", padding: "10px 20px", borderRadius: 0 }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#1F4A38")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#14352A")}
        >
          Offerte aanvragen
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        <Link
          href="/portaal/login"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ border: "1.5px solid #14352A", color: "#14352A", padding: "10px 20px", borderRadius: 0 }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#14352A"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#14352A"; }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Klanten login
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <div className="w-5 flex flex-col gap-1.5">
          <span className={`block h-0.5 bg-[#14352A] transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 bg-[#14352A] transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 bg-[#14352A] transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </div>
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          className="absolute top-full left-0 right-0 border-t flex flex-col gap-4 md:hidden"
          style={{ background: "var(--cream)", borderColor: "#E1DDD0", padding: "20px clamp(24px,5vw,80px)" }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium"
              style={{ color: "#3A3F46" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/offerte"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 text-sm font-medium text-white w-fit"
            style={{ background: "#14352A", padding: "10px 20px", borderRadius: 0 }}
          >
            Offerte aanvragen
          </Link>
          <Link
            href="/portaal/login"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 text-sm font-medium w-fit"
            style={{ border: "1.5px solid #14352A", color: "#14352A", padding: "10px 20px", borderRadius: 0 }}
          >
            Klanten login
          </Link>
        </div>
      )}
    </header>
  );
}
