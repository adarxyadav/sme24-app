import Link from 'next/link'

export const metadata = { title: 'Expert sign in · SME24' }

export default function ExpertLoginPage() {
  return (
    <main className="min-h-screen bg-muted flex items-center justify-center px-6 py-16">
      <div className="bg-background border border-border rounded-md p-8 w-full max-w-sm flex flex-col gap-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          SME24
        </Link>

        <h1 className="text-2xl font-semibold">Expert sign in</h1>

        <button
          type="button"
          className="inline-flex items-center justify-center w-full rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm font-medium transition-colors"
        >
          Continue with Google
        </button>

        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          <span>Use the same Google account you applied with.</span>
          <span>
            Signing in as a client?{' '}
            <Link href="/auth/login" className="text-foreground hover:underline">
              /auth/login →
            </Link>
          </span>
        </div>
      </div>
    </main>
  )
}
