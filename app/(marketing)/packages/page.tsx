import type { Metadata } from 'next'
import Link from 'next/link'
import { PackageCard } from '@/components/marketing/package-card'
import { PACKAGES } from '@/lib/packages'

export const metadata: Metadata = {
  title: 'Packages — SME24',
  description:
    'Three packages you can buy in a click. One ongoing engagement we scope together. Fixed prices, senior people, Swiss VAT included.',
  openGraph: {
    title: 'Packages — SME24',
    description: 'Fixed prices. Senior people. No hourly meter.',
    url: 'https://sme24.ch/packages',
    images: [{ url: 'https://sme24.ch/og-image.png' }],
  },
  alternates: { canonical: 'https://sme24.ch/packages' },
}

const tableRows = [
  { feature: 'Senior expert assigned', snapshot: '✓', realityCheck: '✓', plan: '✓', execution: '✓' },
  { feature: 'Written deliverable', snapshot: '✓', realityCheck: '✓', plan: '✓', execution: '✓' },
  { feature: 'Peer benchmark', snapshot: '✓', realityCheck: '✓', plan: '✓', execution: '✓' },
  { feature: 'Readout call', snapshot: '✓', realityCheck: '✓', plan: '✓', execution: '✓' },
  { feature: 'Site visit', snapshot: '—', realityCheck: '2 days', plan: '5 days', execution: 'Ongoing' },
  { feature: 'Timeline', snapshot: '5 days', realityCheck: '10 days', plan: '15 days', execution: 'Scoped' },
  { feature: 'Price', snapshot: 'CHF 2,000', realityCheck: 'CHF 5,000', plan: 'CHF 10,000', execution: 'Day rate' },
  { feature: 'Buyable online', snapshot: '✓', realityCheck: '✓', plan: '✓', execution: '—' },
]

const faq = [
  {
    q: 'Is Swiss VAT included or extra?',
    a: 'Included. Every invoice shows the line. No surprise charges.',
  },
  {
    q: 'Can I get a refund if the report isn’t useful?',
    a: 'Yes, within 7 days if the expert agrees the brief was met. We’ve never had to.',
  },
  {
    q: 'What if my company isn’t in your peer benchmark?',
    a: 'We tell you in the run. Check and Plan default to a smaller comparison — price drops.',
  },
  {
    q: 'Can a package be expanded mid-flight?',
    a: 'Snapshot rolls into Reality Check with credit applied. Reality Check rolls into Plan.',
  },
  {
    q: 'Who actually does the work?',
    a: 'A named senior expert. You see who before you buy.',
  },
]

export default function PackagesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-24 flex flex-col gap-6">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">PACKAGES</p>
        <h1 className="font-semibold tracking-tight text-4xl sm:text-5xl lg:text-6xl max-w-2xl">
          Fixed prices. Senior people. No hourly meter.
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Three packages you can buy in a click. One ongoing engagement we scope together. Swiss VAT
          included on every invoice.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm font-medium transition-colors w-full sm:w-auto"
          >
            Start a benchmark
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-sm border border-border bg-transparent hover:bg-accent px-6 py-2.5 text-sm font-medium transition-colors w-full sm:w-auto"
          >
            Talk to Philipp →
          </Link>
        </div>
      </section>

      {/* Package cards */}
      <section className="bg-muted">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PACKAGES.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">COMPARE</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-140">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-6 font-medium w-44 text-muted-foreground"></th>
                {['Snapshot', 'Reality Check', 'Plan', 'Execution'].map((col) => (
                  <th key={col} className="text-left py-3 px-3 font-medium">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map(({ feature, snapshot, realityCheck, plan, execution }) => (
                <tr key={feature} className="border-b border-border last:border-0">
                  <td className="py-3 pr-6 text-muted-foreground text-xs">{feature}</td>
                  <td className="py-3 px-3">{snapshot}</td>
                  <td className="py-3 px-3">{realityCheck}</td>
                  <td className="py-3 px-3">{plan}</td>
                  <td className="py-3 px-3">{execution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Execution Partner */}
      <section className="bg-muted">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="max-w-2xl flex flex-col gap-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              EXECUTION PARTNER
            </p>
            <h2 className="font-semibold tracking-tight text-2xl">The long form.</h2>
            <p className="text-muted-foreground leading-relaxed">
              A working engagement, typically 2–4 days per month, with scope agreed each quarter. No
              retainer invoice. No account manager. A named senior expert who knows your site and
              your risk profile, embedded in your work for as long as you need.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm font-medium transition-colors"
              >
                Tell us about the work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-2xl flex flex-col gap-8">
          <h2 className="font-semibold tracking-tight text-2xl">Five questions we get.</h2>
          <dl>
            {faq.map(({ q, a }) => (
              <div
                key={q}
                className="flex flex-col gap-2 py-5 border-b border-border last:border-0 first:pt-0"
              >
                <dt className="font-medium text-sm">{q}</dt>
                <dd className="text-muted-foreground text-sm">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-muted">
        <div className="mx-auto max-w-5xl px-6 py-24 flex flex-col items-center gap-6 text-center">
          <h2 className="font-semibold tracking-tight text-3xl max-w-sm">
            A senior expert. A fixed price. Today.
          </h2>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-2.5 text-sm font-medium transition-colors"
          >
            Start a benchmark
          </Link>
        </div>
      </section>
    </main>
  )
}
