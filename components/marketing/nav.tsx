"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Experts", href: "/experts" },
  { label: "Packages", href: "/packages" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 border-b border-[#E8E8E8] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-sans font-medium text-base tracking-tight text-[#000000]"
        >
          SME24
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`type-mono-label transition-colors ${
                pathname === href
                  ? "text-[#000000]"
                  : "text-[#959494] hover:text-[#000000]"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/auth/signup"
            className="hidden md:block type-mono-button bg-[#000000] text-white px-6 py-2 rounded-sm hover:bg-[#222222] transition-colors"
          >
            Get your benchmark
          </Link>
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 text-[#000000]"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 bg-canvas-dark z-100 flex flex-col items-center justify-center transition-opacity duration-200 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-5 right-6 text-white p-2"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center gap-10">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`type-display-md ${
                pathname === href ? "text-white" : "text-white/60"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/auth/signup"
            onClick={() => setMobileOpen(false)}
            className="type-mono-button bg-white text-[#000000] px-8 py-3 rounded-sm mt-4"
          >
            Get your benchmark
          </Link>
        </div>
      </div>
    </nav>
  );
}
