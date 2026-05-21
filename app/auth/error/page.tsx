import Link from 'next/link'

export const metadata = { title: 'Sign-in error · SME24' }

const reasons: Record<string, string> = {
  expired: 'This link has expired. Magic links are valid for one hour.',
  oauth_denied: 'Google sign-in was cancelled.',
}

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>
}) {
  const { reason } = await searchParams
  const message = (reason && reasons[reason]) || 'An unexpected error occurred.'

  return (
    <main className="min-h-screen bg-muted flex items-center justify-center px-6 py-16">
      <div className="bg-background border border-border rounded-md p-8 w-full max-w-sm flex flex-col gap-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          SME24
        </Link>

        <h1 className="text-2xl font-semibold">Something went wrong.</h1>

        <p className="text-sm text-muted-foreground">{message}</p>

        <div className="flex gap-3">
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm font-medium transition-colors"
          >
            Try again →
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-sm border border-border bg-background hover:bg-accent px-6 py-2.5 text-sm font-medium transition-colors"
          >
            Go home →
          </Link>
        </div>
      </div>
    </main>
  )
}
