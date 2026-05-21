# Feature 03 — Database Schema + Supabase Setup

## Overview

Foundation for all portal features. Provisions the Supabase project in
the EU (Frankfurt) region, creates all tables with RLS, sets up storage
buckets, and runs a seed migration with placeholder experts so Feature 02's
Expert Network page renders immediately.

## Key Files

```
supabase/
  migrations/
    0001_initial_schema.sql     — all tables, indexes, RLS policies
    0002_seed_experts.sql       — placeholder experts for dev + staging
  config.toml                   — local dev config (supabase CLI)
lib/
  supabase/
    client.ts                   — browser client singleton
    server.ts                   — server component client (cookies)
    service.ts                  — service role client (trigger/ and webhooks only)
```

## Dependencies

None. This is the foundation all other features build on.

## Env Vars

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

---

## Skeleton

> Goal: Supabase project live in EU, core tables exist, RLS enabled,
> storage buckets created, Supabase client singletons wired into the app.

### What to build

- Supabase project created in Frankfurt (eu-central-1) region.
- `lib/supabase/client.ts` — browser client using
  `createBrowserClient` from `@supabase/ssr`.
- `lib/supabase/server.ts` — server client using `createServerClient`
  with cookie store from `next/headers`.
- `lib/supabase/service.ts` — service role client using
  `createClient` with `SUPABASE_SERVICE_ROLE_KEY`. Exported only for use
  in `trigger/` and `app/api/webhooks/`.
- Migration `0001_initial_schema.sql`: create `profiles` and `experts`
  tables (minimum columns). Enable RLS on both. Add permissive placeholder
  policies (tighten in Full Implementation).
- Migration `0002_seed_experts.sql`: insert 4 placeholder experts with
  `status = 'approved'` so the marketing Expert Network page renders.
- Storage buckets created: `expert-photos`, `expert-cvs`, `proposals`,
  `reports`, `vault-documents`.

### Acceptance

- `supabase db push` runs without error
- Browser client connects without throwing (verify in a test server
  component)
- `experts` query from marketing Expert Network page returns the 4 seeded
  rows
- Storage buckets visible in Supabase dashboard

---

## Full Implementation

### Table: `profiles`

Extends `auth.users`. Created automatically by a Supabase trigger on first
sign-in (see Feature 04).

```sql
create table profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  full_name   text,
  role        text not null default 'client'
                check (role in ('client', 'expert')),
  created_at  timestamptz not null default now()
);
```

RLS policies:
- Users can select their own row: `auth.uid() = id`
- Users can update their own row (except `role`): `auth.uid() = id`
- No insert via RLS — profiles are created by the trigger only

### Table: `experts`

```sql
create table experts (
  id                uuid primary key default gen_random_uuid(),
  profile_id        uuid references profiles(id) on delete cascade,
  slug              text unique not null,
  bio               text,
  specialty         text,           -- one-line description (e.g. "EHS lead, chemicals · 32 yrs")
  years_experience  integer,
  competency_tags   text[] not null default '{}',
  photo_path        text,           -- storage path, served via signed URL
  cv_path           text,           -- storage path, admin-only access
  status            text not null default 'pending'
                      check (status in ('pending', 'approved', 'rejected')),
  applied_at        timestamptz not null default now(),
  reviewed_at       timestamptz,
  rejection_reason  text
);
```

RLS policies:
- `SELECT` approved experts: `status = 'approved'` — public (anon role)
- `SELECT` own row: `auth.uid() = profile_id` — authenticated user
- `INSERT`: `auth.uid() = profile_id` and `status = 'pending'` (one
  application per user enforced by unique constraint on `profile_id`)
- `UPDATE` own row (bio, specialty, photo, cv only): `auth.uid() = profile_id`
- Admin mutations use service role (bypasses RLS), checked at app layer

### Table: `benchmark_runs`

```sql
create table benchmark_runs (
  id              uuid primary key default gen_random_uuid(),
  client_id       uuid not null references profiles(id),
  company_name    text not null,
  company_slug    text not null,   -- normalized: lowercase, hyphens
  industry_hint   text,
  status          text not null default 'queued'
                    check (status in (
                      'queued','researching','benchmarking',
                      'matching','drafting','completed',
                      'failed','low_signal'
                    )),
  kpi_data        jsonb,
  benchmark_data  jsonb,
  shortlist       jsonb,           -- [{expert_id, rank, why_match}]
  risk_value_chf  numeric,
  risk_range_low  numeric,
  risk_range_high numeric,
  confidence      text check (confidence in ('low','medium','high')),
  trigger_job_id  text,
  cached_month    text,            -- yyyy-mm, for cache lookup
  created_at      timestamptz not null default now(),
  completed_at    timestamptz
);
```

Indexes:
- `(client_id, created_at desc)` — dashboard query
- `(company_slug, cached_month)` where `status = 'completed'` — cache
  lookup

RLS policies:
- `SELECT`, `INSERT` own rows: `auth.uid() = client_id`
- No client `UPDATE` — status transitions are pipeline-only (service role)

### Table: `proposals`

```sql
create table proposals (
  id           uuid primary key default gen_random_uuid(),
  run_id       uuid not null references benchmark_runs(id),
  client_id    uuid not null references profiles(id),
  pdf_path     text not null,      -- storage path
  status       text not null default 'pending_review'
                 check (status in ('pending_review','approved','rejected')),
  reviewed_by  text,               -- admin email
  reviewed_at  timestamptz,
  created_at   timestamptz not null default now()
);
```

RLS policies:
- `SELECT` own row where `status = 'approved'`: `auth.uid() = client_id`
- No client insert/update — pipeline and admin only (service role)

### Table: `orders`

```sql
create table orders (
  id                      uuid primary key default gen_random_uuid(),
  client_id               uuid not null references profiles(id),
  run_id                  uuid references benchmark_runs(id),
  package                 text not null
                            check (package in (
                              'snapshot','reality_check',
                              'transformation_plan','execution_partner'
                            )),
  amount_chf_rappen       integer not null,  -- in rappen (CHF * 100)
  stripe_session_id       text unique,
  stripe_payment_intent   text unique,
  status                  text not null default 'pending'
                            check (status in ('pending','paid','refunded')),
  created_at              timestamptz not null default now()
);
```

RLS policies:
- `SELECT` own rows: `auth.uid() = client_id`
- No client insert/update — webhook handler only (service role)

### Table: `engagements`

```sql
create table engagements (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null unique references orders(id),
  client_id   uuid not null references profiles(id),
  expert_id   uuid references experts(id),
  status      text not null default 'open'
                check (status in (
                  'open','confirmed','in_progress','delivered','closed'
                )),
  report_path text,                -- storage path for final report PDF
  created_at  timestamptz not null default now(),
  closed_at   timestamptz
);
```

RLS policies:
- `SELECT` own engagement: `auth.uid() = client_id`
- Expert `SELECT` assigned engagement: `auth.uid() = (select profile_id from experts where id = expert_id)`
- No client insert/update — webhook and admin only (service role)

### Table: `vault_documents`

```sql
create table vault_documents (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  path        text not null,       -- storage path
  tags        text[] not null default '{}',
  uploaded_by text not null,       -- admin email
  created_at  timestamptz not null default now()
);
```

RLS policies:
- No client or expert access via RLS
- Service role only (pipeline reads, admin writes)

### Table: `feedback`

```sql
create table feedback (
  id            uuid primary key default gen_random_uuid(),
  engagement_id uuid not null unique references engagements(id),
  client_id     uuid not null references profiles(id),
  rating        integer not null check (rating between 1 and 5),
  comment       text,
  created_at    timestamptz not null default now()
);
```

RLS policies:
- `INSERT` own feedback where engagement is closed: `auth.uid() = client_id`
- `SELECT` own row: `auth.uid() = client_id`

### Storage Buckets

| Bucket | Access |
|---|---|
| `expert-photos` | Public read for approved experts; expert-owner write |
| `expert-cvs` | Private; signed URLs for admin only |
| `proposals` | Private; signed URLs for client (approved only) + admin |
| `reports` | Private; signed URLs for client + expert of that engagement |
| `vault-documents` | Private; service role read + admin write |

All protected files are served via time-bounded signed URLs (1 hour
expiry). Never expose raw storage paths to the client.

### Seed Migration (`0002_seed_experts.sql`)

Insert 4 placeholder experts with `status = 'approved'`, covering
different industries and competency tags. These populate the marketing
site Expert Network page and the Home page preview before real expert
applications are processed.

### Supabase Client Singletons

Follow the `@supabase/ssr` pattern exactly:

- `lib/supabase/client.ts` — `createBrowserClient(url, anon)` for
  client components
- `lib/supabase/server.ts` — `createServerClient(url, anon, { cookies })`
  for server components and server actions. Import from `next/headers`.
- `lib/supabase/service.ts` — `createClient(url, serviceRole)` for
  `trigger/` and `app/api/webhooks/` only. This file must never be
  imported from a server action or page.

### Acceptance

- All 8 tables created with correct columns, types, and constraints
- RLS enabled on every table
- All policies in place and verified (test with anon + authenticated
  requests)
- Storage buckets created with correct access rules
- Seed migration inserts 4 approved experts
- `supabase db push` + `supabase db reset` both succeed cleanly
- `npm run build` passes with Supabase client imports resolved
