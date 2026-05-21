import type { ReactNode } from 'react'
import { PortalNav } from '@/components/portal/portal-nav'

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PortalNav />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  )
}
