import type { Metadata } from 'next'
import { ContactForm } from '@/components/marketing/contact-form'

export const metadata: Metadata = {
  title: 'Contact — SME24',
  description:
    'One inbox. A real person. Usually within a day. Send a note — Philipp reads everything that comes in.',
  openGraph: {
    title: 'Contact — SME24',
    description: 'One inbox. A real person. Usually within a day.',
    url: 'https://sme24.ch/contact',
    images: [{ url: 'https://sme24.ch/og-image.png' }],
  },
  alternates: { canonical: 'https://sme24.ch/contact' },
}

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-24 flex flex-col gap-3">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">CONTACT</p>
        <h1 className="font-semibold tracking-tight text-4xl sm:text-5xl lg:text-6xl max-w-2xl">
          One inbox. A real person. Usually within a day.
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mt-2">
          Send a note. Philipp reads everything that comes in and replies inside a working day.
        </p>
      </section>

      {/* Form + info */}
      <section className="bg-muted">
        <div className="mx-auto max-w-5xl px-6 py-16 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: form */}
            <ContactForm />

            {/* Right: contact info */}
            <div className="flex flex-col gap-8 pt-2">
              <p className="font-medium text-sm text-muted-foreground">Or skip the form.</p>

              <div className="flex flex-col gap-6 text-sm">
                <div>
                  <a href="mailto:hello@sme24.ch" className="font-medium hover:underline">
                    hello@sme24.ch
                  </a>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="font-medium">Mon–Fri · 09:00–17:00 CET</p>
                  <p className="text-muted-foreground">Where we work from.</p>
                </div>

                <address className="not-italic flex flex-col gap-0.5 text-muted-foreground">
                  <p className="font-medium text-foreground">IC HOTZ AG</p>
                  <p>Bahnhofstrasse 1</p>
                  <p>8001 Zürich, Switzerland</p>
                  <p className="mt-1">Visits by appointment.</p>
                </address>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
