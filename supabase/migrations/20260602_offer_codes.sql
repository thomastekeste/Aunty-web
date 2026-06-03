-- App Store Offer Codes
-- Stores pre-generated 50%-off offer codes from App Store Connect.
-- One code is assigned per web store purchase and emailed to the buyer.

create table if not exists offer_codes (
  id            uuid primary key default gen_random_uuid(),
  code          text not null unique,
  used          boolean not null default false,
  assigned_to   text,                          -- customer email
  assigned_at   timestamptz,
  stripe_session_id text,                      -- which purchase triggered the assignment
  created_at    timestamptz not null default now()
);

-- Fast lookup: find an unused code
create index if not exists offer_codes_unused_idx on offer_codes (used) where used = false;

-- RLS: only service role can read/write (never expose to client)
alter table offer_codes enable row level security;

-- CJ fulfillment orders table
create table if not exists cj_orders (
  id              uuid primary key default gen_random_uuid(),
  stripe_session_id text not null unique,
  cj_order_id     text,
  cj_order_number text,
  status          text not null default 'pending',   -- pending | placed | shipped | delivered | failed
  customer_email  text,
  tracking_number text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table cj_orders enable row level security;
