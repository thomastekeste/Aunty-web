/**
 * Launch mode flag — flip NEXT_PUBLIC_LAUNCH_MODE to switch the whole site.
 *
 *   "waitlist" → capture emails prominently, shop accessible but not the focus
 *   "live"     → full launch, app download CTAs, shop is primary
 *
 * NEXT_PUBLIC_ vars are inlined at build time, so this works in both server
 * and client components.
 */
export const isLive = process.env.NEXT_PUBLIC_LAUNCH_MODE === "live";
