import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { isRateLimited } from "@/lib/rateLimit";

export const runtime = "nodejs";

const ALLOWED_SOURCES = new Set(["website", "hero", "sticky", "footer"]);

export async function POST(req: NextRequest) {
  // Rate limit: 5 requests per IP per minute
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded
    ? forwarded.split(",").at(-1)!.trim()
    : (req.headers.get("x-real-ip") ?? "unknown");
  if (await isRateLimited(ip, 5, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { email?: unknown; source?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const rawSource = typeof body.source === "string" ? body.source : "website";
  const source = ALLOWED_SOURCES.has(rawSource) ? rawSource : "website";

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email" }, { status: 400 });
  }

  // Insert with the service role key (bypasses RLS, server-side only)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/waitlist`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ email, source }),
    }
  );

  // 409 = already on the list. Return success so we never reveal who's signed up.
  const isDuplicate = res.status === 409;

  if (!res.ok && !isDuplicate) {
    const text = await res.text().catch(() => "");
    console.error("Waitlist insert failed:", res.status, text);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }

  // Send the welcome email only on a genuinely new signup.
  if (!isDuplicate && process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails
      .send({
        from: "Aunty Council <hello@auntycurlcouncil.com>",
        to: [email],
        subject: "You're on the list 🤎",
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#F3E9DD;color:#1A0F08;">
            <h1 style="font-size:24px;margin:0 0 12px;">You're on the list 🤎</h1>
            <p style="color:#5C4433;font-size:15px;line-height:1.7;margin:0 0 16px;">
              The aunties are getting ready for you. We'll hit your inbox the
              moment the app drops — with <strong>20% off your first month</strong>
              waiting inside.
            </p>
            <p style="color:#5C4433;font-size:15px;line-height:1.7;margin:0 0 24px;">
              Until then, the marketplace is open whenever you want to start your
              routine.
            </p>
            <a href="https://auntycurlcouncil.com/products"
               style="display:inline-block;padding:13px 28px;border-radius:999px;background:#1A0F08;color:#F3E9DD;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;text-decoration:none;">
              Shop the marketplace
            </a>
            <p style="margin-top:32px;font-size:13px;color:#9E8C7A;">With love,<br/>The Aunty Council</p>
          </div>
        `,
      })
      .catch((err: unknown) => console.error("Waitlist welcome email failed:", err));
  }

  return NextResponse.json({ success: true });
}
