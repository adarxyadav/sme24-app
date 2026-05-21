import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { ExpertNetworkGrid } from '@/components/marketing/expert-network-grid'
import type { Expert } from '@/components/marketing/expert-card'

export const metadata: Metadata = {
  title: 'Expert Network — SME24',
  description:
    'Senior EHS experts with thirty years of real-world experience. Every profile reviewed by hand. Track record over titles.',
  openGraph: {
    title: 'Expert Network — SME24',
    description: 'Senior EHS experts with thirty years of real-world experience.',
    url: 'https://sme24.ch/expert-network',
    images: [{ url: 'https://sme24.ch/og-image.png' }],
  },
  alternates: { canonical: 'https://sme24.ch/expert-network' },
}

async function getExperts(): Promise<Expert[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return []
  try {
    const supabase = createClient(url, key)
    const { data } = await supabase
      .from('experts')
      .select('id, name, specialty, years_experience, competency_tags, slug')
      .eq('status', 'approved')
      .order('name')
    return (data as Expert[]) ?? []
  } catch {
    return []
  }
}

const trustSignals = [
  {
    title: 'Reviewed by hand.',
    body: 'Every application read by a senior partner. No automated approvals.',
  },
  {
    title: 'Track record over titles.',
    body: 'We care what you did, not who you reported to.',
  },
  {
    title: 'Published, not promised.',
    body: 'If a profile is on the site, the work has been verified.',
  },
]

export default async function ExpertNetworkPage() {
  const experts = await getExperts()

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-24 flex flex-col gap-6">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">EXPERT NETWORK</p>
        <h1 className="font-semibold tracking-tight text-4xl sm:text-5xl lg:text-6xl max-w-2xl">
          Senior people. Industry scars. The juniors stayed home.
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Every expert on SME24 has done the work — in plants, in audits, in board rooms — for
          thirty years or more.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm font-medium transition-colors w-full sm:w-auto"
          >
            Start a benchmark
          </Link>
          <Link
            href="/expert/apply"
            className="inline-flex items-center justify-center rounded-sm border border-border bg-transparent hover:bg-accent px-6 py-2.5 text-sm font-medium transition-colors w-full sm:w-auto"
          >
            Apply to join
          </Link>
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-muted">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trustSignals.map(({ title, body }) => (
              <div
                key={title}
                className="bg-background border border-border rounded-md p-6 flex flex-col gap-2"
              >
                <h3 className="font-semibold tracking-tight text-sm">{title}</h3>
                <p className="text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert grid */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <ExpertNetworkGrid experts={experts} />
      </section>

      {/* Apply CTA */}
      <section className="bg-muted">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="max-w-lg flex flex-col gap-4">
            <h2 className="font-semibold tracking-tight text-2xl">
              Are you a senior EHS expert?
            </h2>
            <p className="text-muted-foreground">
              SME24 takes a small number of new experts each quarter. We publish profiles only after
              review.
            </p>
            <div>
              <Link
                href="/expert/apply"
                className="inline-flex items-center justify-center rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm font-medium transition-colors"
              >
                Apply to join
              </Link>
              <p className="text-xs text-muted-foreground mt-3">
                Five-minute application. Five-working-day reply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24 flex flex-col items-center gap-6 text-center">
        <h2 className="font-semibold tracking-tight text-3xl max-w-sm">
          One name. A ranked shortlist. Senior people.
        </h2>
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
