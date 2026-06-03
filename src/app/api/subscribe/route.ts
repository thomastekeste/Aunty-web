import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { isRateLimited } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",").at(-1)!.trim() : (req.headers.get("x-real-ip") ?? "unknown");
  if (await isRateLimited(ip, 5, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { email: rawEmail } = await req.json();
  const email = typeof rawEmail === "string" ? rawEmail.trim() : rawEmail;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/waitlist`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Service-role key (server-side only). The waitlist table has RLS
        // enabled with no public policies, so the anon key cannot insert — and
        // crucially cannot be used to read/harvest signups either.
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ email }),
    }
  );

  if (res.status === 409) {
    return NextResponse.json({ error: "Already on the waitlist" }, { status: 409 });
  }

  if (!res.ok) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }

  // ── Welcome email (best-effort — never fail the signup over it) ──────────
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Aunty Council <hello@auntycurlcouncil.com>",
        to: [email],
        subject: "You're on the list 🤎",
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#FDFCF8;color:#2D1B0E;">
            <img src="https://auntycurlcouncil.com/logo.png" alt="Aunty Council" style="height:36px;margin-bottom:28px;" />
            <h1 style="font-size:22px;margin:0 0 8px;font-weight:700;">You're in 🤎</h1>
            <p style="color:#6B5040;margin:0 0 20px;line-height:1.7;">The aunties are getting ready for you. We'll hit your inbox the moment the app drops — with <strong>20% off your first month</strong> inside.</p>
            <div style="margin:24px 0;padding:18px 22px;background:#FEF8EC;border:1.5px solid #D4A04A;border-radius:14px;">
              <p style="margin:0;font-size:13px;color:#6B5040;line-height:1.7;">In the meantime, the marketplace is already open &mdash; bonnets, durags, silk pillowcases and more, curated for textured hair &amp; melanin-rich skin.</p>
              <p style="margin:12px 0 0;"><a href="https://auntycurlcouncil.com/products" style="color:#A0701E;font-weight:700;text-decoration:none;">Shop the marketplace &rarr;</a></p>
            </div>
            <p style="margin-top:28px;font-size:13px;color:#9E8C7A;">With love,<br/>The Aunty Council</p>
          </div>
        `,
      });
    } catch (e) {
      console.error("Waitlist welcome email failed:", e);
    }
  }

  return NextResponse.json({ success: true });
}
