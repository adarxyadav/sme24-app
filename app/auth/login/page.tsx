import Link from 'next/link'

export const metadata = { title: 'Sign in · SME24' }

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-muted flex items-center justify-center px-6 py-16">
      <div className="bg-background border border-border rounded-md p-8 w-full max-w-sm flex flex-col gap-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          SME24
        </Link>

        <h1 className="text-2xl font-semibold">Sign in</h1>

        <button
          type="button"
          className="inline-flex items-center justify-center w-full rounded-sm border border-border bg-background hover:bg-accent px-6 py-2.5 text-sm font-medium transition-colors"
        >
          Continue with Google
        </button>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex-1 border-t border-border" />
          <span>or</span>
          <span className="flex-1 border-t border-border" />
        </div>

        <form className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-muted-foreground">Email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm font-medium transition-colors"
          >
            Send magic link
          </button>
        </form>

        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          <span>No password required.</span>
          <span>
            Signing in as an expert?{' '}
            <Link href="/auth/expert-login" className="text-foreground hover:underline">
              /auth/expert-login →
            </Link>
          </span>
        </div>
      </div>
    </main>
  )
}
