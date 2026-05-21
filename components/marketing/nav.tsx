'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/expert-network', label: 'Expert Network' },
  { href: '/packages', label: 'Packages' },
]

const mobileLinks = [
  ...navLinks,
  { href: '/contact', label: 'Contact' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Left: logo + nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold tracking-tight text-lg">
            SME24
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`transition-colors hover:text-foreground ${pathname === href ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: contact + sign in button */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          <Link
            href="/contact"
            className={`transition-colors hover:text-foreground ${pathname === '/contact' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
          >
            Contact
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-sm border border-border px-4 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            Sign in
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex justify-end">
          <button
            className="p-2 rounded-sm hover:bg-accent"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 border-border bg-background shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'border-t max-h-[calc(100svh-4rem)] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4 overflow-y-auto max-h-[calc(100svh-4rem)]">
          {mobileLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-foreground py-1"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center rounded-sm border border-border px-4 py-1.5 text-sm font-medium transition-colors hover:bg-accent w-full"
              onClick={() => setOpen(false)}
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
