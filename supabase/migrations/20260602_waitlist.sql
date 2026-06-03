-- Waitlist signups
-- Captured pre-launch via the /api/subscribe endpoint, which inserts
-- server-side with the service-role key. RLS stays fully locked (no public
-- policies) so the public anon key cannot read/harvest emails.

create table if not exists waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,   -- unique → /api/subscribe returns 409 on repeat
  created_at  timestamptz default now()
);

alter table waitlist enable row level security;
