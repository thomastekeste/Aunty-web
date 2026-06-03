-- Waitlist capture for pre-launch email collection.
-- Safe to run whether or not the `waitlist` table already exists.

create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text default 'website',   -- 'hero', 'sticky', 'footer'
  launched_at timestamptz,         -- set when the launch blast is sent
  created_at timestamptz not null default now()
);

-- Ensure columns exist if the table predates this migration.
alter table waitlist add column if not exists source text default 'website';
alter table waitlist add column if not exists launched_at timestamptz;

alter table waitlist enable row level security;

-- Allow public signups (insert only). Reads/updates stay restricted to the
-- service role, which bypasses RLS entirely.
drop policy if exists "waitlist_public_insert" on waitlist;
create policy "waitlist_public_insert"
  on waitlist for insert
  to anon, authenticated
  with check (true);
