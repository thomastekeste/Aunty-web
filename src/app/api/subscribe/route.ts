import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/waitlist`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
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

  return NextResponse.json({ success: true });
}
