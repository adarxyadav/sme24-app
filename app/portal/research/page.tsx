import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { QuotaFooter } from '@/components/portal/quota-footer'

export const metadata = { title: 'Start a benchmark · SME24' }

const USER_NAME = 'Adarsh'
const TODAY = '18 May 2026'
const QUOTA_LIMIT = 5

const whatHappensNext = [
  { n: '01', bold: 'We read public sources', tail: " for the company's EHS data. 30–60 seconds." },
  { n: '02', bold: 'We compare the KPIs', tail: ' to industry peers and estimate the risk in CHF.' },
  { n: '03', bold: 'We rank our senior experts', tail: ' against the risk profile.' },
  { n: '04', bold: 'We draft a proposal.', tail: " A senior expert reviews it before it's released." },
]

export default function ResearchPage() {
  return (
    <div className="flex flex-col flex-1">
      <section className="mx-auto w-full max-w-5xl px-6 pt-10 pb-16 flex flex-col gap-10">
        <p className="text-sm text-muted-foreground">
          {USER_NAME} · {TODAY}
        </p>

        <FirstBenchmarkCard />
        <WhatHappensNext />
        <LookAroundFirst />
      </section>

      <QuotaFooter used={0} limit={QUOTA_LIMIT} verb="available" />
    </div>
  )
}

function FirstBenchmarkCard() {
  return (
    <div className="bg-background border border-border rounded-md p-8 sm:p-10 flex flex-col gap-8">
      <div className="flex flex-col gap-3 max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight">First benchmark.</h2>
        <p className="text-sm text-muted-foreground">
          Type a company name. We pull the EHS data, benchmark it, and rank our senior experts against
          the risk profile. Under 90 seconds.
        </p>
      </div>

      <form className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-foreground">
              Company <span className="text-muted-foreground">*</span>
            </span>
            <input
              type="text"
              required
              placeholder="e.g. Glencore"
              className="rounded-sm border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/30"
            />
            <span className="text-xs text-muted-foreground">The legal name works best.</span>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-foreground">
              Industry <span className="text-muted-foreground">(optional)</span>
            </span>
            <input
              type="text"
              placeholder="e.g. Mining"
              className="rounded-sm border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/30"
            />
            <span className="text-xs text-muted-foreground">Helps us pick the right peer set.</span>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-sm bg-foreground text-background hover:bg-foreground/85 px-6 py-2.5 text-sm font-medium transition-colors w-full sm:w-auto"
          >
            Start research
          </button>
          <span className="text-sm text-muted-foreground">
            {QUOTA_LIMIT} of {QUOTA_LIMIT} runs available today.
          </span>
        </div>
      </form>
    </div>
  )
}

function WhatHappensNext() {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">
        What happens next
      </span>
      <div className="border border-border rounded-md divide-y divide-border">
        {whatHappensNext.map(({ n, bold, tail }) => (
          <div key={n} className="grid grid-cols-[3rem_1fr] gap-4 px-6 py-4 text-sm">
            <span className="font-mono text-muted-foreground">{n}</span>
            <span>
              <span className="font-medium text-foreground">{bold}</span>
              <span className="text-muted-foreground">{tail}</span>
            </span>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        You can close this tab. We&apos;ll keep working.
      </p>
    </div>
  )
}

function LookAroundFirst() {
  const links = [
    { href: '/portal/expert-network', label: 'Browse the expert network' },
    { href: '/packages', label: 'See the packages' },
    { href: '/how-it-works', label: 'How it works' },
  ]
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">
        Or look around first
      </span>
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start gap-x-6 gap-y-3">
        {links.map(({ href, label }, i) => (
          <span key={href} className="inline-flex items-center gap-6">
            <Link
              href={href}
              className="text-sm font-medium text-foreground inline-flex items-center gap-2 hover:underline"
            >
              {label} <ArrowRight size={14} />
            </Link>
            {i < links.length - 1 ? (
              <span className="hidden sm:inline text-muted-foreground">·</span>
            ) : null}
          </span>
        ))}
      </div>
    </div>
  )
}
