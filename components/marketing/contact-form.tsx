'use client'

import { useActionState } from 'react'
import type { ContactFormState } from '@/app/(marketing)/contact/actions'
import { submitContact } from '@/app/(marketing)/contact/actions'

const initial: ContactFormState = { status: 'idle' }

export function ContactForm() {
  const [state, action, isPending] = useActionState(submitContact, initial)

  if (state.status === 'success') {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center flex flex-col gap-3">
        <p className="font-medium text-lg">Message sent.</p>
        <p className="text-sm text-muted-foreground">
          Philipp will reply within one working day. Earlier, usually.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium">
          Name <span className="text-muted-foreground">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email <span className="text-muted-foreground">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="company" className="text-sm font-medium">
          Company <span className="text-muted-foreground text-xs">(optional)</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          className="rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium">
          Message <span className="text-muted-foreground">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
        />
      </div>

      {state.status === 'error' && (
        <p className="text-sm text-destructive">{state.message ?? 'Something went wrong. Please try again.'}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center rounded-md bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 px-6 py-2.5 text-sm font-medium transition-colors"
      >
        {isPending ? 'Sending…' : 'Send'}
      </button>

      <p className="text-xs text-muted-foreground">
        Reply within one working day. Earlier, usually.
      </p>
      <p className="text-xs text-muted-foreground">
        We use what you tell us only to reply. We don&apos;t add you to a list. We don&apos;t have a list.
      </p>
    </form>
  )
}
