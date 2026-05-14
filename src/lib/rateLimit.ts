/**
 * Per-IP rate limiter with Upstash Redis support.
 *
 * If UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set, uses
 * @upstash/ratelimit with a sliding-window algorithm (persists across
 * serverless cold starts).
 *
 * Otherwise falls back to an in-memory Map (fine for dev / single-process,
 * but resets on every Vercel cold start).
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// ── Upstash setup (lazy, created once per cold start) ───────────────────────

let upstashCache: Map<string, Ratelimit> | null = null;

function getUpstashLimiter(
  limit: number,
  windowMs: number
): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  // Cache one Ratelimit instance per (limit, windowMs) pair so we don't
  // re-create on every request.
  if (!upstashCache) upstashCache = new Map();
  const key = `${limit}:${windowMs}`;
  const cached = upstashCache.get(key);
  if (cached) return cached;

  const windowSeconds = Math.max(1, Math.round(windowMs / 1000));

  const rl = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
    prefix: "rl",
  });
  upstashCache.set(key, rl);
  return rl;
}

// ── In-memory fallback ──────────────────────────────────────────────────────

interface RateLimitState {
  count: number;
  resetAt: number;
}

const memoryStore = new Map<string, RateLimitState>();

/** Clean up expired entries every 5 minutes to avoid unbounded memory growth. */
if (typeof globalThis !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [k, v] of memoryStore) {
      if (v.resetAt <= now) memoryStore.delete(k);
    }
  }, 5 * 60 * 1000);
}

function isRateLimitedInMemory(
  ip: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const state = memoryStore.get(ip);

  if (!state || state.resetAt <= now) {
    memoryStore.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  state.count += 1;
  return state.count > limit;
}

// ── Public API ──────────────────────────────────────────────────────────────

/**
 * Check whether the given IP has exceeded the allowed rate.
 * @param ip         The client IP string
 * @param limit      Max requests allowed in the window (default 10)
 * @param windowMs   Rolling window in ms (default 60 000 = 1 min)
 * @returns `true` if the request should be blocked (rate exceeded)
 */
export async function isRateLimited(
  ip: string,
  limit = 10,
  windowMs = 60_000
): Promise<boolean> {
  const upstash = getUpstashLimiter(limit, windowMs);

  if (upstash) {
    try {
      const { success } = await upstash.limit(ip);
      return !success; // success === false means rate-limited
    } catch (err) {
      console.error("[rateLimit] Upstash error, falling back to in-memory:", err);
      // Fall through to in-memory if Upstash is unreachable
    }
  }

  return isRateLimitedInMemory(ip, limit, windowMs);
}
