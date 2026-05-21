import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { QuotaFooter } from '@/components/portal/quota-footer'

export const metadata = { title: 'Dashboard · SME24' }

const USER_NAME = 'Adarsh'
const TODAY = '18 May 2026'
const QUOTA_LIMIT = 5
const QUOTA_USED = 3

const activeRuns = [
  {
    id: '7f3a9e21',
    company: 'Glencore',
    stage: 'Benchmarking',
    startedLabel: 'started 2 minutes ago',
    spotlight: {
      headline: 'Your run for Glencore is in progress.',
      status: 'Comparing to peers',
      startedLabel: 'Started 2 minutes ago',
    },
  },
  {
    id: 'b2c1d3e4',
    company: 'Lonza Group',
    stage: 'Drafting',
    startedLabel: 'started 4 minutes ago',
  },
]

const recentOrders = [
  { id: '7f3a9e21', pkg: 'Reality Check', company: 'Sika AG', date: '3 days ago', status: 'Paid' as const },
  { id: '3c2b1d84', pkg: 'Snapshot', company: 'Schindler', date: '12 days ago', status: 'Delivered' as const },
  { id: '9e8d7c65', pkg: 'Snapshot', company: 'Givaudan', date: '28 days ago', status: 'Delivered' as const },
]

export default function PortalDashboardPage() {
  return (
    <div className="flex flex-col flex-1">
      <section className="mx-auto w-full max-w-5xl px-6 pt-10 pb-16 flex flex-col gap-10">
        <p className="text-sm text-muted-foreground">
          {USER_NAME} · {TODAY}
        </p>

        <ActiveRunSpotlight />
        <ActiveRunsTable />
        <RecentOrdersTable />
      </section>

      <QuotaFooter used={QUOTA_USED} limit={QUOTA_LIMIT} verb="used" />
    </div>
  )
}

function ActiveRunSpotlight() {
  const run = activeRuns[0]
  if (!run.spotlight) return null
  return (
    <div className="border border-warning/40 bg-warning/5 rounded-md p-6 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <span className="mt-1.5 inline-block w-2 h-2 rounded-full bg-warning shrink-0" />
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium text-foreground">{run.spotlight.headline}</p>
          <p className="text-sm text-muted-foreground">
            Status: {run.spotlight.status}. {run.spotlight.startedLabel}.
          </p>
        </div>
      </div>
      <div>
        <Link
          href={`/portal/research/${run.id}`}
          className="inline-flex items-center justify-center rounded-sm bg-foreground text-background hover:bg-foreground/85 px-5 py-2 text-sm font-medium transition-colors"
        >
          Open run
        </Link>
      </div>
    </div>
  )
}

function ActiveRunsTable() {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">Active runs</span>
      <div className="border border-border rounded-md divide-y divide-border">
        {activeRuns.map((run) => (
          <div
            key={run.id}
            className="grid grid-cols-[1.4fr_1fr_1fr_auto] items-center gap-4 px-6 py-4 text-sm"
          >
            <span className="font-medium">{run.company}</span>
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <span className="inline-block w-2 h-2 rounded-full bg-warning" />
              {run.stage}
            </span>
            <span className="text-muted-foreground">{run.startedLabel}</span>
            <Link
              href={`/portal/research/${run.id}`}
              className="text-sm font-medium text-foreground inline-flex items-center gap-1 hover:underline justify-self-end"
            >
              Open <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

function RecentOrdersTable() {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">Recent orders</span>
      <div className="border border-border rounded-md divide-y divide-border">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-[7rem_1fr_1fr_1fr_auto_auto] items-center gap-4 px-6 py-4 text-sm"
          >
            <span className="font-mono text-xs text-muted-foreground">#{order.id}</span>
            <span className="font-medium">{order.pkg}</span>
            <span className="text-muted-foreground">{order.company}</span>
            <span className="text-muted-foreground">{order.date}</span>
            <StatusPill label={order.status} />
            <Link
              href={`/portal/projects/${order.id}`}
              className="text-sm font-medium text-foreground inline-flex items-center gap-1 hover:underline justify-self-end"
            >
              Open <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
      <Link
        href="/portal/projects"
        className="self-end text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
      >
        See all orders <ArrowRight size={14} />
      </Link>
    </div>
  )
}

function StatusPill({ label }: { label: 'Paid' | 'Delivered' | 'Completed' }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-success/30 bg-success/10 text-success px-2 py-0.5 text-xs font-medium">
      {label}
    </span>
  )
}
