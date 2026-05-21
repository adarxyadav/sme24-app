import type { ReactNode } from 'react'
import { AdminNav } from '@/components/admin/admin-nav'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AdminNav />
      <main className="flex-1">{children}</main>
    </div>
  )
}
