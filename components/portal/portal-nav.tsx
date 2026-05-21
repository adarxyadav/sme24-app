'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, LogOut } from 'lucide-react'

type Role = 'client' | 'expert'

const clientLinks = [
  { href: '/portal', label: 'Dashboard' },
  { href: '/portal/research', label: 'Research' },
  { href: '/portal/expert-network', label: 'Expert Network' },
  { href: '/portal/projects', label: 'Projects' },
]

const expertLinks = [
  { href: '/expert/dashboard', label: 'My Projects' },
  { href: '/portal/expert-network', label: 'Expert Network' },
]

export function PortalNav({
  role = 'client',
  displayName = 'Adarsh',
}: {
  role?: Role
  displayName?: string
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const links = role === 'expert' ? expertLinks : clientLinks

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={role === 'expert' ? '/expert/dashboard' : '/portal'} className="font-semibold tracking-tight text-lg">
            SME24
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {links.map(({ href, label }) => {
              const active = pathname === href || pathname?.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  className={`transition-colors hover:text-foreground ${active ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-3 text-sm">
          {displayName ? <span className="text-foreground">{displayName}</span> : null}
          <button
            type="button"
            aria-label="Sign out"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>

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

      <div
        className={`md:hidden absolute top-full left-0 right-0 border-border bg-background shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'border-t max-h-[calc(100svh-4rem)] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-foreground py-1"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border flex items-center justify-between text-sm">
            {displayName ? <span className="text-foreground">{displayName}</span> : <span />}
            <button
              type="button"
              aria-label="Sign out"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
