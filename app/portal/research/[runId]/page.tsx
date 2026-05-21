import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Square } from 'lucide-react'

export const metadata = { title: 'Run · SME24' }

const COMPANY = 'Glencore'
const STARTED_LABEL = 'Started 2 minutes ago'

const kpis = [
  { label: 'Recordable incident rate', value: '2.4 / 200k hrs', confidence: 'High', source: "Sustainability '25" },
  { label: 'Lost-time injury frequency', value: '0.81 / 1M hrs', confidence: 'High', source: 'Annual report' },
  { label: 'Scope 1 emissions', value: '22.3 Mt CO₂e', confidence: 'High', source: 'CDP 2025' },
  { label: 'Water withdrawal', value: '128 ML', confidence: 'Medium', source: 'ESG data pack' },
  { label: 'Hazardous waste', value: '14,200 t', confidence: 'Medium', source: 'EPER filing' },
  { label: 'Governance: EHS board oversight', value: 'Yes', confidence: 'High', source: "Proxy '25" },
]

const peerComparison = {
  peers: ['Anglo Am.', 'Rio Tinto', 'BHP', 'Vale'],
  rows: [
    { label: 'Recordable rate', self: '2.4', selfTrend: 'up' as const, values: ['1.8', '1.6', '1.4', '1.9'] },
    { label: 'LTIF', self: '0.81', selfTrend: 'up' as const, values: ['0.62', '0.55', '0.49', '0.71'] },
    { label: 'Scope 1 (Mt)', self: '22.3', selfTrend: 'flat' as const, values: ['17.8', '30.1', '40.2', '11.4'] },
    { label: 'Hazardous waste (t)', self: '14,200', selfTrend: 'up' as const, values: ['9,800', '10,400', '8,200', '12,100'] },
  ],
}

const shortlist = [
  {
    rank: '01',
    initials: 'PM',
    name: 'Peter Müller',
    title: 'EHS lead, chemicals · 32 yrs',
    why: "32 years in chemicals, including SEVESO-tier operations matching Glencore's footprint.",
  },
  {
    rank: '02',
    initials: 'TS',
    name: 'Thomas Steiner',
    title: 'Process safety, energy · 33 yrs',
    why: 'Led environmental compliance through three IPO-level audits in the energy sector.',
  },
  {
    rank: '03',
    initials: 'AB',
    name: 'Anna Brunner',
    title: 'Safety auditor, logistics · 28 yrs',
    why: 'Built incident-reduction programs at scale — your recordable-rate gap is exactly the brief.',
  },
]

export default async function RunDetailPage({
  params,
}: {
  params: Promise<{ runId: string }>
}) {
  const { runId } = await params

  return (
    <div className="flex flex-col flex-1">
      <section className="mx-auto w-full max-w-5xl px-6 pt-10 pb-12 flex flex-col gap-8">
        <header className="flex items-start justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold tracking-tight">{COMPANY}</h1>
            <p className="text-sm text-muted-foreground">
              {STARTED_LABEL} · Run <span className="font-mono">#{runId}</span>
            </p>
          </div>
          <CompletedBadge />
        </header>

        <div className="border-l-2 border-success bg-success/5 rounded-r-md px-6 py-5 flex flex-col gap-2">
          <p className="text-base font-medium text-foreground">Done.</p>
          <p className="text-sm text-muted-foreground">
            Finished in 67 seconds. KPIs, peer comparison, risk, and shortlist are below. The proposal
            PDF is being reviewed — we&apos;ll email when it&apos;s ready.
          </p>
        </div>

        <KpiSection />
      </section>

      <section className="bg-muted border-y border-border">
        <div className="mx-auto w-full max-w-5xl px-6 py-12 flex flex-col gap-12">
          <PeerComparisonSection />
          <RiskSection />
          <ShortlistSection />
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-12 flex flex-col gap-4">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Proposal</span>
        <div className="border border-warning/40 bg-warning/5 rounded-md px-6 py-5 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Square size={14} className="text-warning" />
            <p className="text-base font-medium text-foreground">Proposal in review.</p>
          </div>
          <p className="text-sm text-muted-foreground pl-6">
            We don&apos;t share AI output until a senior expert has read it. You&apos;ll get an email
            when it&apos;s ready — usually within a working day.
          </p>
        </div>
      </section>

      <footer className="border-t border-border mt-auto">
        <div className="mx-auto w-full max-w-5xl px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/portal/research"
              className="font-medium text-foreground inline-flex items-center gap-1 hover:underline"
            >
              Run another benchmark <ArrowRight size={14} />
            </Link>
            <Link
              href="/portal/projects"
              className="text-muted-foreground inline-flex items-center gap-1 hover:text-foreground"
            >
              See past runs <ArrowRight size={14} />
            </Link>
          </div>
          <span className="text-sm text-muted-foreground">2 of 5 runs left today</span>
        </div>
      </footer>
    </div>
  )
}

function CompletedBadge() {
  return (
    <span className="inline-flex items-center rounded-sm border border-success/30 bg-success/10 text-success px-2.5 py-1 text-xs font-medium">
      Completed
    </span>
  )
}

function KpiSection() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">KPIs</span>
        <p className="text-sm text-muted-foreground">
          6 KPIs extracted from public sources for {COMPANY}.
        </p>
      </div>

      <div className="border border-border rounded-md overflow-hidden">
        <div className="grid grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-4 px-6 py-3 text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
          <span>KPI</span>
          <span>Value</span>
          <span>Confidence</span>
          <span>Source</span>
        </div>
        <div className="divide-y divide-border">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="grid grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-4 px-6 py-3 text-sm items-center"
            >
              <span className="text-foreground">{kpi.label}</span>
              <span className="font-medium">{kpi.value}</span>
              <span className="text-muted-foreground">{kpi.confidence}</span>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-foreground hover:underline"
              >
                {kpi.source} <ArrowUpRight size={12} />
              </a>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        All values cited. Confidence is the AI&apos;s read on source quality.
      </p>
    </div>
  )
}

function PeerComparisonSection() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          Peer comparison
        </span>
        <p className="text-sm text-muted-foreground">
          How {COMPANY} stacks up against {peerComparison.peers.length} industry peers.
        </p>
      </div>

      <div className="border border-border rounded-md overflow-hidden bg-background">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-3 text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
          <span>KPI</span>
          <span className="text-foreground">{COMPANY}</span>
          {peerComparison.peers.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
        <div className="divide-y divide-border">
          {peerComparison.rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-3 text-sm items-center"
            >
              <span className="text-foreground">{row.label}</span>
              <span className="font-medium inline-flex items-center gap-1.5">
                {row.self}{' '}
                {row.selfTrend === 'up' ? (
                  <span className="text-danger text-xs">▲</span>
                ) : (
                  <span className="text-muted-foreground text-xs">●</span>
                )}
              </span>
              {row.values.map((v, i) => (
                <span key={i} className="text-muted-foreground">
                  {v}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Peers chosen from companies with similar industry and revenue size.{' '}
        <a href="#" className="text-foreground hover:underline">
          See methodology →
        </a>
      </p>
    </div>
  )
}

function RiskSection() {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">Risk in CHF</span>

      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8 items-start">
        <div className="flex flex-col gap-4">
          <p className="text-5xl font-semibold tracking-tight">CHF 4.2M</p>
          <p className="text-sm text-muted-foreground max-w-md">
            Estimated annual EHS risk for {COMPANY}, based on the KPI gap against peers.
          </p>
          <p className="text-xs text-muted-foreground max-w-md">
            This is a directional figure. It&apos;s the cost of standing still — not a quote for fixing
            it. The packages and shortlist below are how we&apos;d close the gap.
          </p>
        </div>

        <dl className="flex flex-col gap-3 text-sm">
          <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
            <dt className="text-muted-foreground">Range</dt>
            <dd className="text-right">CHF 2.8M – 5.7M</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted-foreground">Confidence</dt>
            <dd className="text-right">Medium</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

function ShortlistSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          Your shortlist
        </span>
        <p className="text-sm text-muted-foreground">
          Three senior experts ranked against the risk profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {shortlist.map((expert) => (
          <div
            key={expert.rank}
            className="bg-background border border-border rounded-md p-5 flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <span className="bg-foreground text-background rounded-sm px-2 py-0.5 text-xs font-mono">
                {expert.rank}
              </span>
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted text-foreground text-xs font-medium border border-border">
                {expert.initials}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base font-semibold">{expert.name}</p>
              <p className="text-xs text-muted-foreground">{expert.title}</p>
            </div>
            <p className="text-sm text-muted-foreground flex-1">
              <span className="font-medium text-foreground">Why this match:</span> {expert.why}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-sm bg-foreground text-background hover:bg-foreground/85 px-3 py-1.5 text-xs font-medium transition-colors"
              >
                View profile
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-sm border border-border bg-background hover:bg-accent px-3 py-1.5 text-xs font-medium transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Not the right match?{' '}
        <Link href="/portal/expert-network" className="text-foreground hover:underline">
          Browse the full network →
        </Link>
      </p>
    </div>
  )
}
