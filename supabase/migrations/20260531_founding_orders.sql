-- Founding-member orders + product orders
-- Every completed Stripe checkout (membership plan OR product cart) is recorded
-- here by the Stripe webhook (src/app/api/webhook/stripe/route.ts). The account
-- page (src/app/account/page.tsx) reads a customer's orders by email.
--
-- Both reads and writes happen server-side with the service-role key, so RLS is
-- left fully locked (no public policies). Never expose this table to the client.
--
-- NOTE: `plan` is nullable — product orders have no membership plan. See
-- 20260603_founding_orders_plan_nullable.sql for the constraint that allows it.

create table if not exists founding_orders (
  id                uuid primary key default gen_random_uuid(),
  email             text not null,
  plan              text check (plan is null or plan = any (array['lifetime'::text, 'yearly'::text, 'monthly'::text])),
  -- Unique so the webhook's `res.status !== 409` duplicate guard works: Stripe
  -- can deliver checkout.session.completed more than once for the same session.
  stripe_session_id text not null unique,
  amount_cents      integer not null default 0,
  currency          text not null default 'usd',
  created_at        timestamptz not null default now()
);

create index if not exists founding_orders_email_idx
  on founding_orders (email, created_at desc);

alter table founding_orders enable row level security;
