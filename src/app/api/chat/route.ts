/**
 * POST /api/chat — Streaming aunty chat via Claude
 *
 * Uses Vercel AI SDK v6 with Anthropic provider for real-time streaming.
 * Rate-limited to 20 messages/minute/IP via existing Upstash Redis setup.
 *
 * Client connects via TextStreamChatTransport → expects toTextStreamResponse().
 */

import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { buildSystemPrompt, isValidAuntyId } from "@/lib/auntyPrompts";
import { isRateLimited, exceedsDailyCap } from "@/lib/rateLimit";

// Hard ceiling on total chat completions per UTC day across all users.
// Bounds the Anthropic bill if the public endpoint is scraped/abused.
const CHAT_DAILY_CAP = Number(process.env.CHAT_DAILY_CAP ?? 1000);

export const runtime = "edge";

export async function POST(req: Request) {
  // ── Rate limit ──────────────────────────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const limited = await isRateLimited(ip, 20, 60_000);
  if (limited) {
    return new Response(
      JSON.stringify({
        error: "Aunty needs a breather. Try again in a minute.",
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  // ── Parse & validate ────────────────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { messages, auntyId } = body;

  if (!isValidAuntyId(auntyId)) {
    return new Response(JSON.stringify({ error: "Invalid auntyId" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(
      JSON.stringify({ error: "Messages array is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // ── Global daily spend cap (checked only after validation, so junk
  //    requests don't burn the budget) ──────────────────────────────────────
  if (await exceedsDailyCap("chat", CHAT_DAILY_CAP)) {
    return new Response(
      JSON.stringify({
        error: "The aunties are resting for the day. Try again tomorrow.",
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  // ── Stream response ─────────────────────────────────────────────────────────
  const result = streamText({
    // Haiku — matches the mobile app and PRODUCT.md; far cheaper than Sonnet
    // for this short, public, unauthenticated endpoint.
    model: anthropic("claude-haiku-4-5-20251001"),
    system: buildSystemPrompt(auntyId),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: messages as any,
    maxOutputTokens: 300,
  });

  return result.toUIMessageStreamResponse();
}
