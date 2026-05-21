# Feature 04 — Authentication

## Overview

Supabase Auth for all user identity. Clients sign in via magic link (email
OTP) or Google OAuth. Experts sign in via Google OAuth only. Admin access
is gated by an `ADMIN_EMAILS` env-var whitelist — no admins table. Route
protection via Next.js middleware. Profiles row created on first sign-in.

## Routes

| Route | Purpose |
|---|---|
| `/auth/login` | Client login (magic link + Google OAuth) |
| `/auth/expert-login` | Expert login (Google OAuth only) |
| `/auth/callback` | OAuth + magic link callback handler |
| `/auth/error` | Auth error page (expired link, OAuth denied) |
| `/portal` | Protected — client role required |
| `/portal/expert/*` | Protected — expert role required |
| `/admin/*` | Protected — ADMIN_EMAILS whitelist |

## Key Files

```
app/
  auth/
    login/page.tsx
    expert-login/page.tsx
    callback/route.ts          — handles OAuth + OTP exchange
    error/page.tsx
middleware.ts                  — route protection for /portal and /admin
lib/
  supabase/
    client.ts                  — (from Feature 03)
    server.ts                  — (from Feature 03)
    service.ts                 — (from Feature 03)
  auth.ts                      — server helpers: getUser, requireRole, isAdmin
```

## Dependencies

- Feature 03 (DB schema): `profiles` table, Supabase client singletons

## Env Vars

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ADMIN_EMAILS                   # comma-separated list, e.g. "philipp@ichotz.com"
NEXT_PUBLIC_SITE_URL           # https://sme24.ch (used in OAuth redirect URLs)
```

---

## Skeleton

> Goal: middleware protects /portal and /admin, login pages exist,
> Google OAuth flow completes, profile row created on first sign-in.

### What to build

- `middleware.ts`: check Supabase session on every request. Unauthenticated
  requests to `/portal/*` or `/admin/*` redirect to `/auth/login`.
  Admin routes additionally check `ADMIN_EMAILS` whitelist; non-admin
  authenticated users redirected to `/portal`.
- `app/auth/login/page.tsx`: "Sign in" page with Google OAuth button
  and magic link email input.
- `app/auth/expert-login/page.tsx`: "Expert sign in" page with Google
  OAuth button only.
- `app/auth/callback/route.ts`: exchanges the code/token from Supabase
  Auth, sets the session cookie, redirects to `/portal`.
- `app/auth/error/page.tsx`: generic error page with a "Try again" link.
- Supabase database trigger: on `auth.users` insert, create a row in
  `profiles` with `role = 'client'` (default). Expert role is set by
  admin during expert approval (Feature 05).
- Google OAuth configured in Supabase Auth dashboard with
  `NEXT_PUBLIC_SITE_URL/auth/callback` as the redirect URI.
- Magic link (email OTP) enabled in Supabase Auth settings.

### Acceptance

- Unauthenticated visit to `/portal` redirects to `/auth/login`
- Google OAuth completes and lands on `/portal`
- Magic link email arrives and clicking it lands on `/portal`
- `profiles` row exists after first sign-in
- `/admin` redirects non-admin users to `/portal`

---

## Full Implementation

### Magic link flow (client)

1. User enters email on `/auth/login`.
2. Server action calls `supabase.auth.signInWithOtp({ email })`.
3. Page shows "Check your email" confirmation.
4. User clicks link → `/auth/callback` exchanges OTP → redirects to
   `/portal`.

### Google OAuth flow (client + expert)

1. User clicks "Continue with Google" on `/auth/login` or
   `/auth/expert-login`.
2. Client calls `supabase.auth.signInWithOAuth({ provider: 'google',
   redirectTo: '/auth/callback' })`.
3. After OAuth, `/auth/callback` sets session and determines redirect:
   - If profile `role = 'expert'` → `/portal/expert/dashboard`
   - If profile `role = 'client'` → `/portal`
   - If email in `ADMIN_EMAILS` → update role detection + `/admin`

### Profile creation trigger

Supabase SQL trigger fires on `auth.users` insert:

```sql
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'client'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
```

Expert role is not set here — it is set by admin approval in Feature 05.

### Admin detection

`lib/auth.ts` exports:

```ts
export function isAdmin(email: string): boolean {
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) ?? []
  return adminEmails.includes(email)
}
```

Middleware reads the authenticated user's email and calls `isAdmin()`.
Admin users can access both `/admin/*` and `/portal/*`.

### `lib/auth.ts` helpers

```ts
// Returns the authenticated user or null
export async function getUser(supabase: SupabaseClient)

// Throws redirect to /auth/login if no session
export async function requireAuth(supabase: SupabaseClient)

// Throws redirect if user role doesn't match
export async function requireRole(supabase: SupabaseClient, role: 'client' | 'expert')

// Returns true if authenticated user email is in ADMIN_EMAILS
export function isAdmin(email: string): boolean
```

### Login page design

- Minimal centered card on `bg-background`
- SME24 logo at top
- `/auth/login`: headline "Sign in", Google OAuth button + divider +
  magic link email input + submit. Note: "No password required."
- `/auth/expert-login`: headline "Expert sign in", Google OAuth button
  only. Note: "Use the same Google account you applied with."
- Link between the two pages: "Signing in as a client? / Signing in as
  an expert?"

### Error states

- Expired magic link → `/auth/error?reason=expired`
- OAuth denied → `/auth/error?reason=oauth_denied`
- Email not in allowed expert applicants → redirect with message
- All error states show a clear message and a "Try again" / "Go home"
  button

### Session management

- Server components use `lib/supabase/server.ts` (cookie-based)
- Client components use `lib/supabase/client.ts`
- Middleware refreshes the session on every request using
  `supabase.auth.getUser()` — never `getSession()` (not secure server-side)
- Sign out: server action calls `supabase.auth.signOut()` and redirects
  to `/`

### Acceptance

- All OAuth and magic link flows work end to end
- `profiles` row created correctly on first sign-in
- Role-based redirects work (client → /portal, expert → /portal/expert/dashboard)
- Admin whitelist check works for /admin routes
- Expired link and OAuth denial show error page with clear message
- Sign out clears session and redirects to home
- `npm run lint` and `npm run build` pass
