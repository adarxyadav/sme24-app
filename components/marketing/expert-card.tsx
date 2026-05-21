import Link from 'next/link'

export interface Expert {
  id: string
  name: string
  specialty: string
  years_experience: number
  competency_tags: string[]
  slug: string
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <div className="border border-border rounded-lg p-6 flex flex-col gap-4 bg-card">
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-muted text-muted-foreground w-10 h-10 flex items-center justify-center font-medium text-sm shrink-0">
          {getInitials(expert.name)}
        </div>
        <div className="min-w-0">
          <p className="font-medium truncate">{expert.name}</p>
          <p className="text-sm text-muted-foreground truncate">
            {expert.specialty} · {expert.years_experience}y exp
          </p>
        </div>
      </div>

      {expert.competency_tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {expert.competency_tags.map((tag) => (
            <span key={tag} className="rounded-sm bg-muted px-1.5 py-0.5 text-xs">
              {tag}
            </span>
          ))}
        </div>
      )}

      <Link
        href={`/experts/${expert.slug}`}
        className="text-sm hover:underline mt-auto"
      >
        View profile →
      </Link>
    </div>
  )
}
