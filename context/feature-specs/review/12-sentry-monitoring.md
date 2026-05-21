# Feature 12 — Error Monitoring (Sentry)

## Overview

Sentry for runtime error capture across the Next.js app and Trigger.dev
pipeline. Source maps uploaded so stack traces show original TypeScript.
Alert rules for critical errors (pipeline failures, payment failures).

## Files

```
sentry.client.config.ts
sentry.server.config.ts
sentry.edge.config.ts
next.config.ts               — updated with withSentryConfig wrapper
lib/
  sentry.ts                  — capture helpers for pipeline tasks
```

## Dependencies

- All prior features: adds instrumentation to existing code
- Sentry project provisioned

## Env Vars

```
NEXT_PUBLIC_SENTRY_DSN
SENTRY_ORG
SENTRY_PROJECT
SENTRY_AUTH_TOKEN            # for source map upload in CI/Vercel
```

---

## Skeleton

> Goal: Sentry SDK installed, basic error capture working in app and
> pipeline, source maps uploaded on Vercel deploy.

### What to build

- Install `@sentry/nextjs`.
- Run `npx @sentry/wizard@latest -i nextjs` to generate config files.
- Update `next.config.ts` with `withSentryConfig` wrapper.
- Set `NEXT_PUBLIC_SENTRY_DSN` and other env vars in Vercel.
- Verify by throwing a test error and checking Sentry dashboard.

### Acceptance

- A thrown error in a server component appears in Sentry
- Source maps resolve to original TypeScript line numbers

---

## Full Implementation

### App instrumentation

`sentry.client.config.ts`:
```ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,    // 10% of transactions in production
  replaysSessionSampleRate: 0, // no session replay
})
```

`sentry.server.config.ts`:
```ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
})
```

### Pipeline instrumentation (`lib/sentry.ts`)

```ts
import * as Sentry from '@sentry/nextjs'

export function captureRunError(runId: string, stage: string, error: unknown) {
  Sentry.captureException(error, {
    tags: { run_id: runId, pipeline_stage: stage },
    level: 'error',
  })
}
```

Call `captureRunError` in the `catch` block of each Trigger.dev task
before setting `status = 'failed'`.

### Email error capture

In `lib/email.ts`, replace `console.error` with `Sentry.captureException`
after Feature 12 is in place.

### Alert rules

Configure in Sentry dashboard:
- **Pipeline failure**: `tags.pipeline_stage is set` + `level = error`
  → alert to Philipp's email within 1 hour.
- **Payment webhook failure**: tag `webhook = stripe` + `level = error`
  → alert immediately.
- **Unhandled app error**: any unhandled exception in production → alert
  within 1 hour.

### Source maps

`withSentryConfig` in `next.config.ts` uploads source maps to Sentry
during Vercel build. Set `SENTRY_AUTH_TOKEN` in Vercel environment.

### Acceptance

- Errors from app, API routes, and pipeline tasks appear in Sentry with
  correct TypeScript stack traces
- Pipeline errors tagged with `run_id` and `pipeline_stage`
- Alert rules configured and tested with a manual trigger
- `npm run build` passes with Sentry config in place
