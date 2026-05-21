import Link from 'next/link'
import { ApplicationForm } from '@/components/expert/application-form'

export const metadata = { title: 'Expert application · SME24' }

export default function ExpertApplyPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            SME24
          </Link>
          <Link
            href="/auth/expert-login"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Already applied? Sign in →
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-2xl px-6 py-12 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Join the network
          </span>
          <h1 className="text-3xl font-semibold">Apply as an EHS expert</h1>
          <p className="text-sm text-muted-foreground">
            We review every application personally. You&apos;ll hear back within five working days.
          </p>
        </div>

        <ApplicationForm />
      </section>
    </main>
  )
}
