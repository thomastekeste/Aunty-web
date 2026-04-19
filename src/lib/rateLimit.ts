/**
 * Simple in-memory per-IP rate limiter.
 * Works for single-process Node.js runtimes (dev + typical small deployments).
 * For multi-instance production, replace with Upstash Redis or similar.
 */

interface RateLimitState {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitState>();

/** Clean up expired entries every 5 minutes to avoid unbounded memory growth. */
setInterval(() => {
  const now = Date.now();
  for (const [key, state] of store) {
    if (state.resetAt <= now) store.delete(key);
  }
}, 5 * 60 * 1000);

/**
 * Check whether the given IP has exceeded the allowed rate.
 * @param ip         The client IP string
 * @param limit      Max requests allowed in the window (default 10)
 * @param windowMs   Rolling window in ms (default 60 000 = 1 min)
 * @returns `true` if the request should be blocked (rate exceeded)
 */
export function isRateLimited(
  ip: string,
  limit = 10,
  windowMs = 60_000
): boolean {
  const now = Date.now();
  const state = store.get(ip);

  if (!state || state.resetAt <= now) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  state.count += 1;
  return state.count > limit;
}
