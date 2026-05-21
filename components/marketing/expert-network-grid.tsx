'use client'

import { useState, useMemo } from 'react'
import { ExpertCard, type Expert } from './expert-card'

interface ExpertNetworkGridProps {
  experts: Expert[]
}

const AREAS = ['All areas', 'Safety Management', 'Environmental', 'Health', 'Auditing', 'Chemical', 'Construction', 'Energy', 'Logistics']

export function ExpertNetworkGrid({ experts }: ExpertNetworkGridProps) {
  const [search, setSearch] = useState('')
  const [area, setArea] = useState('All areas')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return experts.filter((e) => {
      const matchesSearch =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.competency_tags.some((t) => t.toLowerCase().includes(q)) ||
        e.specialty.toLowerCase().includes(q)
      const matchesArea =
        area === 'All areas' ||
        e.competency_tags.some((t) => t.toLowerCase().includes(area.toLowerCase())) ||
        e.specialty.toLowerCase().includes(area.toLowerCase())
      return matchesSearch && matchesArea
    })
  }, [experts, search, area])

  if (experts.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-16">
        Applications open. First experts joining soon.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by name or competency"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {filtered.length} of {experts.length} expert{experts.length !== 1 ? 's' : ''}
      </p>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-10">No experts match your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      )}
    </div>
  )
}
