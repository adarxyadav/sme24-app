import Link from 'next/link'
import type { Package } from '@/lib/packages'

export function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <div
      className={`border rounded-lg p-6 flex flex-col gap-5 bg-card ${pkg.highlight ? 'border-foreground ring-1 ring-foreground' : 'border-border'}`}
    >
      <div>
        <h3 className="font-bold tracking-tight text-lg">{pkg.name}</h3>
        <p className="text-sm text-muted-foreground mt-0.5">{pkg.tagline}</p>
      </div>

      <p className="text-3xl font-bold tracking-tight">{pkg.price}</p>

      <div className="flex flex-col gap-3 text-sm flex-1">
        <div>
          <span className="font-medium">For: </span>
          <span className="text-muted-foreground">{pkg.forDescription}</span>
        </div>

        <div>
          <p className="font-medium mb-1">You get:</p>
          <ul className="space-y-0.5">
            {pkg.youGet.map((item) => (
              <li key={item} className="text-muted-foreground flex gap-2">
                <span className="shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-6">
          <div>
            <span className="font-medium">Timeline: </span>
            <span className="text-muted-foreground">{pkg.timeline}</span>
          </div>
          <div>
            <span className="font-medium">Format: </span>
            <span className="text-muted-foreground">{pkg.format}</span>
          </div>
        </div>
      </div>

      <Link
        href={pkg.ctaHref}
        className="mt-2 inline-flex items-center justify-center rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2.5 text-sm font-medium transition-colors"
      >
        {pkg.cta}
      </Link>
    </div>
  )
}
