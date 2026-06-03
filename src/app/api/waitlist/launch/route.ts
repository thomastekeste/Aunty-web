import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const STATIC_CODE = "AUNTY20";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function sbHeaders() {
  return {
    "Content-Type": "application/json",
    apikey: SERVICE_KEY!,
    Authorization: `Bearer ${SERVICE_KEY!}`,
  };
}

/** Claim one unused offer code, or fall back to the static code. */
async function nextCode(email: string): Promise<string> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/offer_codes?used=eq.false&order=id.asc&limit=1&select=id,code`,
      { headers: sbHeaders() }
    );
    if (!res.ok) return STATIC_CODE;
    const rows = await res.json();
    if (!rows.length) return STATIC_CODE;

    const { id, code } = rows[0];
    await fetch(`${SUPABASE_URL}/rest/v1/offer_codes?id=eq.${id}`, {
      method: "PATCH",
      headers: { ...sbHeaders(), Prefer: "return=minimal" },
      body: JSON.stringify({
        used: true,
        assigned_to_email: email,
        assigned_at: new Date().toISOString(),
      }),
    }).catch(() => {});
    return code as string;
  } catch {
    return STATIC_CODE;
  }
}

function launchEmailHtml(code: string): string {
  return `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#F3E9DD;color:#1A0F08;">
      <h1 style="font-size:24px;margin:0 0 12px;">The aunties are live 🎉</h1>
      <p style="color:#5C4433;font-size:15px;line-height:1.7;margin:0 0 20px;">
        It's here. The Aunty Curl app is live — daily coaching from seven
        culturally-aware aunties, built for your texture.
      </p>
      <div style="background:#1A0F08;border-radius:16px;padding:20px 24px;margin:0 0 20px;text-align:center;">
        <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#D4A04A;margin:0 0 6px;">
          20% off your first month
        </p>
        <p style="font-size:26px;font-weight:800;letter-spacing:3px;color:#D4A04A;margin:0;font-family:monospace;">
          ${code}
        </p>
      </div>
      <a href="https://auntycurlcouncil.com/app"
         style="display:inline-block;padding:13px 28px;border-radius:999px;background:#1A0F08;color:#F3E9DD;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;text-decoration:none;">
        Get the app
      </a>
      <p style="margin-top:32px;font-size:13px;color:#9E8C7A;">With love,<br/>The Aunty Council</p>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  // Protected: only callable with the internal secret.
  const secret = req.headers.get("x-internal-secret");
  if (!process.env.INTERNAL_API_SECRET || secret !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!SUPABASE_URL || !SERVICE_KEY || !process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  // Fetch everyone who hasn't been blasted yet (idempotent on re-run).
  const listRes = await fetch(
    `${SUPABASE_URL}/rest/v1/waitlist?launched_at=is.null&select=id,email`,
    { headers: sbHeaders() }
  );
  if (!listRes.ok) {
    return NextResponse.json({ error: "Failed to read waitlist" }, { status: 500 });
  }
  const entries: { id: string; email: string }[] = await listRes.json();

  const resend = new Resend(process.env.RESEND_API_KEY);
  let sent = 0;
  const failures: string[] = [];

  for (const entry of entries) {
    try {
      const code = await nextCode(entry.email);
      await resend.emails.send({
        from: "Aunty Council <hello@auntycurlcouncil.com>",
        to: [entry.email],
        subject: "The aunties are live 🎉",
        html: launchEmailHtml(code),
      });

      // Mark this entry as blasted so re-runs skip it.
      await fetch(`${SUPABASE_URL}/rest/v1/waitlist?id=eq.${entry.id}`, {
        method: "PATCH",
        headers: { ...sbHeaders(), Prefer: "return=minimal" },
        body: JSON.stringify({ launched_at: new Date().toISOString() }),
      });
      sent += 1;
    } catch (err) {
      console.error(`Launch email failed for ${entry.email}:`, err);
      failures.push(entry.email);
    }
  }

  return NextResponse.json({
    total: entries.length,
    sent,
    failed: failures.length,
    failures,
  });
}
