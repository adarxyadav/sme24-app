import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SME24 — Senior EHS Experts. Fixed Prices. Switzerland.',
  description:
    'SME24 matches your EHS risk to a senior expert who has done the work before. Enter a company name. Get a benchmark, a shortlist, and a fixed price.',
  openGraph: {
    title: 'SME24 — Senior EHS Experts. Fixed Prices. Switzerland.',
    description:
      'SME24 matches your EHS risk to a senior expert who has done the work before. Enter a company name. Get a benchmark, a shortlist, and a fixed price.',
    url: 'https://sme24.ch',
    images: [{ url: 'https://sme24.ch/og-image.png' }],
  },
  alternates: { canonical: 'https://sme24.ch' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SME24',
  url: 'https://sme24.ch',
  description: 'AI-powered EHS consulting marketplace connecting companies with senior safety experts.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bahnhofstrasse 1',
    addressLocality: 'Zürich',
    postalCode: '8001',
    addressCountry: 'CH',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@sme24.ch',
    contactType: 'customer service',
  },
}

const steps = [
  {
    n: '01',
    title: 'Enter a company',
    detail: 'Type a name. The AI pulls public EHS data, extracts KPIs, and benchmarks against industry peers.',
  },
  {
    n: '02',
    title: 'Review the run',
    detail: 'See the full benchmark, a CHF risk figure, and a shortlist of three matched senior experts — before you pay.',
  },
  {
    n: '03',
    title: 'Pick a package',
    detail: 'Three fixed prices. One click to purchase. A named expert confirms within one working day.',
  },
]

const differentiators = [
  {
    title: 'Senior-only network.',
    detail: 'Every expert has 30+ years of real site experience. Plants, audits, board rooms. No juniors.',
  },
  {
    title: 'See before you buy.',
    detail: 'The AI benchmark and expert shortlist are ready before any payment. No scoping calls, no surprises.',
  },
  {
    title: 'Fixed price, always.',
    detail: 'Three packages. Prices on the page. Swiss VAT included on every invoice.',
  },
]

const packages = [
  {
    name: 'EHS Snapshot',
    price: 'CHF 2,000',
    detail: 'Remote · 5-day delivery',
    href: '/packages',
  },
  {
    name: 'EHS Reality Check',
    price: 'CHF 5,000',
    detail: '2 on-site days · 10-day delivery',
    href: '/packages',
  },
  {
    name: 'EHS Plan',
    price: 'CHF 10,000',
    detail: '5 on-site days · 15-day delivery',
    href: '/packages',
  },
]

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="w-full max-w-5xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-6">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          EHS CONSULTING · SWITZERLAND
        </p>
        <h1 className="font-semibold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-balance max-w-2xl">
          Senior experts. No slides. Results.
        </h1>
        <p className="text-base text-muted-foreground max-w-xl text-pretty">
          SME24 matches your EHS risk to a senior expert who has done the work before. Enter a
          company name. Get a benchmark, a shortlist, and a fixed price.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm font-medium transition-colors w-full sm:w-auto"
          >
            Start a benchmark
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center rounded-sm border border-border bg-transparent hover:bg-accent px-6 py-2.5 text-sm font-medium transition-colors w-full sm:w-auto"
          >
            How it works
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted">
        <div className="mx-auto max-w-5xl px-6 py-20 flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">HOW IT WORKS</p>
            <Link
              href="/how-it-works"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Full details →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {steps.map(({ n, title, detail }) => (
              <div
                key={n}
                className="bg-background border border-border rounded-md p-6 flex flex-col gap-3"
              >
                <span className="font-mono text-xs text-muted-foreground">{n}</span>
                <h2 className="font-semibold tracking-tight">{title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SME24 */}
      <section className="mx-auto max-w-5xl px-6 py-20 flex flex-col gap-10">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">WHY SME24</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {differentiators.map(({ title, detail }) => (
            <div key={title} className="flex flex-col gap-2">
              <h3 className="font-semibold tracking-tight">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="bg-muted">
        <div className="mx-auto max-w-5xl px-6 py-20 flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">PACKAGES</p>
            <Link
              href="/packages"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Full details →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {packages.map(({ name, price, detail, href }) => (
              <Link
                key={name}
                href={href}
                className="bg-background border border-border rounded-md p-6 flex flex-col gap-3 hover:border-foreground/20 transition-colors"
              >
                <p className="text-sm font-medium">{name}</p>
                <p className="text-2xl font-semibold tracking-tight">{price}</p>
                <p className="text-xs text-muted-foreground">{detail}</p>
              </Link>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Swiss VAT included. Execution Partner (day rate) available for ongoing engagements —{' '}
            <Link href="/contact" className="underline hover:text-foreground transition-colors">
              contact us
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24 flex flex-col items-center gap-6 text-center">
        <h2 className="font-semibold tracking-tight text-3xl max-w-sm">
          Your EHS risk, benchmarked in ninety seconds.
        </h2>
        <p className="text-muted-foreground text-sm max-w-sm">
          No calls. No proposals. A benchmark and a shortlist ready before you spend a franc.
        </p>
        <Link
          href="/auth/login"
          className="inline-flex items-center justify-center rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-2.5 text-sm font-medium transition-colors"
        >
          Start a benchmark
        </Link>
      </section>
    </main>
  )
}
