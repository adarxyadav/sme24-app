"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Experts", href: "/experts" },
  { label: "Packages", href: "/packages" },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-canvas/90 border-b border-[#E8E8E8] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
        {/* Logo — flex-1 so it mirrors the CTA column width */}
        <div className="flex-1">
          <Link href="/" className="inline-flex items-center">
            <Image src="/logo.svg" alt="SME24" width={36} height={36} priority />
          </Link>
        </div>

        {/* Desktop nav links — centered */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`type-mono-label transition-colors ${
                pathname === href
                  ? "text-[#000000]"
                  : "text-[#2b2b2b] hover:text-[#000000]"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA + hamburger — flex-1, right-aligned */}
        <div className="flex-1 flex items-center justify-end gap-3">
          <Link
            href="/contact"
            className="hidden md:block type-mono-button bg-[#2b2b2b] text-white px-6 py-2 rounded-sm hover:bg-[#1a1a1a] transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/auth/login"
            className="hidden md:block type-mono-button bg-[#CB3CFF] text-white px-6 py-2 rounded-sm hover:bg-[#b530e6] transition-colors"
          >
            Log In
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

      {/* Mobile full-screen overlay — only mounted when open so links aren't keyboard-focusable when closed */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-canvas-dark z-100 flex flex-col items-center justify-center">
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
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="type-mono-button bg-[#2b2b2b] text-white px-8 py-3 rounded-sm mt-4"
            >
              Contact
            </Link>
            <Link
              href="/auth/login"
              onClick={() => setMobileOpen(false)}
              className="type-mono-button bg-[#CB3CFF] text-white px-8 py-3 rounded-sm"
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
