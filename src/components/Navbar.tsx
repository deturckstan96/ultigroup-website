"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/ultiapp", label: "Klantenportaal" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#1F2328]/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-[#1F2328] flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold tracking-tight" style={{ fontFamily: 'var(--font-jakarta)' }}>ug</span>
          </div>
          <span className="text-lg font-bold text-[#1F2328] tracking-tight" style={{ fontFamily: 'var(--font-jakarta)' }}>
            ulti group.
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-[#1D4E89]" : "text-[#1F2328]/60 hover:text-[#1F2328]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/offerte"
            className="ml-2 px-5 py-2 bg-[#1D4E89] text-white text-sm font-semibold rounded hover:bg-[#163d6e] transition-colors"
          >
            Offerte aanvragen
          </Link>
          <Link
            href="/portaal/login"
            className="flex items-center gap-1.5 px-4 py-2 border border-[#1F2328]/20 text-[#1F2328]/60 text-sm font-semibold rounded hover:border-[#1D4E89] hover:text-[#1D4E89] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Klanten login
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#1F2328]/50 hover:text-[#1F2328]"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-[#1F2328]/10 bg-white px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-[#1F2328]/60 hover:text-[#1F2328] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/offerte"
            onClick={() => setOpen(false)}
            className="inline-block px-5 py-2 bg-[#1D4E89] text-white text-sm font-semibold rounded hover:bg-[#163d6e] transition-colors w-fit"
          >
            Offerte aanvragen
          </Link>
          <Link
            href="/portaal/login"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#1F2328]/20 text-[#1F2328]/60 text-sm font-semibold rounded hover:border-[#1D4E89] hover:text-[#1D4E89] transition-colors w-fit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Klanten login
          </Link>
        </nav>
      )}
    </header>
  );
}
