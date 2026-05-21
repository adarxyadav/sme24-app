import type { ReactNode } from 'react'
import { PortalNav } from '@/components/portal/portal-nav'

export default function ExpertDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PortalNav role="expert" />
      <main className="flex-1">{children}</main>
    </div>
  )
}
