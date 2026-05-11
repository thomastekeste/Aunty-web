import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Find Stripe customer by email
  const customers = await getStripe().customers.list({ email: user.email, limit: 1 });

  if (customers.data.length === 0) {
    return NextResponse.redirect(new URL("/account?error=no_subscription", req.url));
  }

  const portal = await getStripe().billingPortal.sessions.create({
    customer: customers.data[0].id,
    return_url: `${req.nextUrl.origin}/account`,
  });

  return NextResponse.redirect(portal.url);
}
