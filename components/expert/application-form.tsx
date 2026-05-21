'use client'

import { useState } from 'react'

const steps = [
  'Bio & Specialty',
  'Competency Tags',
  'Photo & CV',
  'Review & Submit',
]

export function ApplicationForm() {
  const [step, setStep] = useState(0)
  const total = steps.length

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-2 flex-1 rounded-full ${i <= step ? 'bg-primary' : 'bg-border'}`}
            />
          ))}
        </div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Step {step + 1} of {total} · {steps[step]}
        </p>
      </div>

      {step === 0 ? (
        <fieldset className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-muted-foreground">Full name *</span>
            <input
              type="text"
              className="rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-muted-foreground">Specialty line *</span>
            <input
              type="text"
              placeholder="EHS lead, chemicals · 32 yrs"
              className="rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-muted-foreground">Years of experience *</span>
            <input
              type="number"
              min={0}
              className="rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-muted-foreground">Bio * (100–600 chars)</span>
            <textarea
              rows={5}
              className="rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
            />
          </label>
        </fieldset>
      ) : (
        <div className="bg-muted border border-border rounded-md p-6 text-sm text-muted-foreground">
          Step {step + 1} content lands in Pass 2.
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="inline-flex items-center justify-center rounded-sm border border-border bg-background hover:bg-accent disabled:opacity-40 disabled:pointer-events-none px-6 py-2.5 text-sm font-medium transition-colors"
        >
          ← Back
        </button>
        {step < total - 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
            className="inline-flex items-center justify-center rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm font-medium transition-colors"
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 px-6 py-2.5 text-sm font-medium transition-colors"
          >
            Submit application
          </button>
        )}
      </div>
    </div>
  )
}
