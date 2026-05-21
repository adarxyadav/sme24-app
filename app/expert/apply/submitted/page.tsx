import Link from 'next/link'

export const metadata = { title: 'Application received · SME24' }

export default function ApplicationSubmittedPage() {
  return (
    <main className="min-h-screen bg-muted flex items-center justify-center px-6 py-16">
      <div className="bg-background border border-border rounded-md p-8 w-full max-w-md flex flex-col gap-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          SME24
        </Link>
        <h1 className="text-2xl font-semibold">Application received.</h1>
        <p className="text-sm text-muted-foreground">
          We review every application personally. You&apos;ll hear back within five working days.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center w-full rounded-sm border border-border bg-background hover:bg-accent px-6 py-2.5 text-sm font-medium transition-colors"
        >
          Back to sme24.ch →
        </Link>
      </div>
    </main>
  )
}
