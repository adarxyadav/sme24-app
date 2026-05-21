'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const adminLinks = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/proposals', label: 'Proposals' },
  { href: '/admin/vault', label: 'Vault' },
  { href: '/admin/experts', label: 'Experts' },
]

export function AdminNav({ email }: { email?: string }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-muted">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/admin" className="font-semibold tracking-tight text-lg">
            SME24 <span className="text-muted-foreground font-normal">Admin</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {adminLinks.map(({ href, label }) => {
              const active = href === '/admin' ? pathname === '/admin' : pathname?.startsWith(href)
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

        <div className="hidden md:flex items-center gap-4 text-sm">
          {email ? <span className="text-muted-foreground">{email}</span> : null}
          <button type="button" className="text-muted-foreground hover:text-foreground transition-colors">
            Sign out
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
        className={`md:hidden absolute top-full left-0 right-0 border-border bg-muted shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'border-t max-h-[calc(100svh-4rem)] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {adminLinks.map(({ href, label }) => (
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
            {email ? <span className="text-muted-foreground">{email}</span> : <span />}
            <button type="button" className="text-muted-foreground hover:text-foreground">
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
