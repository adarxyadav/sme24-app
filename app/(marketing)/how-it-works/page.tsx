import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How It Works — SME24',
  description:
    'From a company name to a senior expert in one screen. We do the research. You pick the package. A senior EHS expert does the work.',
  openGraph: {
    title: 'How It Works — SME24',
    description: 'From a company name to a senior expert in one screen.',
    url: 'https://sme24.ch/how-it-works',
    images: [{ url: 'https://sme24.ch/og-image.png' }],
  },
  alternates: { canonical: 'https://sme24.ch/how-it-works' },
}

const steps = [
  {
    n: '01',
    title: 'Enter a company',
    detail: 'Type a name. Add an industry hint if you have one.',
    youGet: 'Queued run with live status.',
    time: 'Under 10 seconds.',
  },
  {
    n: '02',
    title: 'We pull the EHS data',
    detail:
      'Claude reads public sources. Extracts the KPIs that matter. Cites every source.',
    youGet: 'Benchmark with KPIs, source citations, and a confidence score.',
    time: '30–60 seconds.',
  },
  {
    n: '03',
    title: 'We compare and match',
    detail:
      'KPIs run against an industry peer set. Gap turns into a CHF risk figure. Senior experts ranked against that risk profile.',
    youGet: 'Peer comparison, a CHF risk number, and a ranked shortlist.',
    time: 'Under 15 seconds.',
  },
  {
    n: '04',
    title: 'You pick a package and go',
    detail: 'Three fixed-price packages cover most situations.',
    youGet: 'A paid order, a project workspace, and an email confirmation.',
    time: 'Under 90 seconds.',
  },
]

const whatThisIsnt = [
  'This is not unlimited AI access. Each account gets 3 runs per day.',
  'This is not a research subscription. You pay for a deliverable, not a query.',
  'This is not a marketplace where you message anyone. The shortlist is curated.',
  'This is not where contracts and time sheets live. We deliver work; we don’t run your back office.',
]

const faq = [
  {
    q: 'Do you store the company data I research?',
    a: 'Yes, in EU regions only. Keyed to company + month; re-used within that window for the same company.',
  },
  {
    q: 'What if the AI can’t find enough public data?',
    a: 'Run finishes with a “low signal” status. You are not billed for it.',
  },
  {
    q: 'Can I share the proposal PDF with my team?',
    a: 'Yes, once reviewed and published. Unreviewed drafts stay inside SME24.',
  },
]

export default function HowItWorksPage() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-24 flex flex-col gap-6">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">HOW IT WORKS</p>
        <h1 className="font-semibold tracking-tight text-4xl sm:text-5xl lg:text-6xl max-w-2xl">
          From a company name to a senior expert. In one screen.
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          We do the research. You pick the package. A senior EHS expert does the work.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm font-medium transition-colors w-full sm:w-auto"
          >
            Start a benchmark
          </Link>
          <Link
            href="/packages"
            className="inline-flex items-center justify-center rounded-sm border border-border bg-transparent hover:bg-accent px-6 py-2.5 text-sm font-medium transition-colors w-full sm:w-auto"
          >
            See the packages →
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-muted">
        <div className="mx-auto max-w-5xl px-6 py-20 flex flex-col gap-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">THE PROCESS</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map(({ n, title, detail, youGet, time }) => (
              <div
                key={n}
                className="bg-background border border-border rounded-md p-6 flex flex-col gap-3"
              >
                <span className="font-mono text-xs text-muted-foreground">{n}</span>
                <h2 className="font-semibold tracking-tight text-lg">{title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{detail}</p>
                <div className="flex flex-col gap-1 text-xs text-muted-foreground pt-3 border-t border-border">
                  <span>{youGet}</span>
                  <span className="font-medium text-foreground">{time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-2xl flex flex-col gap-4">
          <h2 className="font-semibold tracking-tight text-2xl">
            One more thing — a human reads it.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Before any AI-drafted proposal leaves SME24, a senior expert reviews it. We don&apos;t
            ship unreviewed AI to third parties. Ever.
          </p>
          <p className="text-sm text-muted-foreground border-l-2 border-primary pl-4">
            This is a hard rule. We won&apos;t make exceptions for speed.
          </p>
        </div>
      </section>

      {/* What This Isn't */}
      <section className="bg-muted">
        <div className="mx-auto max-w-5xl px-6 py-20 flex flex-col gap-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            WHAT THIS ISN&apos;T
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {whatThisIsnt.map((item) => (
              <li
                key={item}
                className="bg-background border border-border rounded-md px-5 py-4 text-sm text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-2xl flex flex-col gap-8">
          <h2 className="font-semibold tracking-tight text-2xl">Three questions we get.</h2>
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
            One name. Ninety seconds. A senior expert.
          </h2>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-2.5 text-sm font-medium transition-colors"
          >
            Start a benchmark
          </Link>
          <p className="text-xs text-muted-foreground">SME24. Just. Different.</p>
        </div>
      </section>
    </main>
  )
}
