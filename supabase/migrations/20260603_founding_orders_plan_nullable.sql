-- Fix: product orders have no membership plan, but the original founding_orders
-- schema had `plan` NOT NULL with a check allowing only lifetime|yearly|monthly.
-- The webhook inserted plan="" for product orders, which violated the check and
-- failed the insert → webhook 500 → Stripe retries → CJ fulfillment + email
-- never fired. Allow NULL plan and permit it in the check.

alter table founding_orders alter column plan drop not null;

alter table founding_orders drop constraint if exists founding_orders_plan_check;

alter table founding_orders
  add constraint founding_orders_plan_check
  check (plan is null or plan = any (array['lifetime'::text, 'yearly'::text, 'monthly'::text]));
