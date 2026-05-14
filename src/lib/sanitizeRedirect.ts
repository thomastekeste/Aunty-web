/**
 * Sanitize a redirect path to prevent open redirect attacks.
 * Only allows relative paths starting with "/".
 * Returns "/" for any invalid or potentially malicious input.
 */
export function sanitizeRedirect(path: string | null | undefined): string {
  if (!path) return "/";
  if (path.startsWith("//")) return "/";
  if (path.includes("://")) return "/";
  if (!path.startsWith("/")) return "/";
  return path;
}
