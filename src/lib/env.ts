const requiredEnvVars = [
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

type EnvVarName = (typeof requiredEnvVars)[number];

function validateEnv(): Record<EnvVarName, string> {
  const missing: string[] = [];

  for (const name of requiredEnvVars) {
    if (!process.env[name]?.trim()) {
      missing.push(name);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}`
    );
  }

  return Object.fromEntries(
    requiredEnvVars.map((name) => [name, process.env[name]!.trim()])
  ) as Record<EnvVarName, string>;
}

const env = validateEnv();

export const STRIPE_SECRET_KEY = env.STRIPE_SECRET_KEY;
export const STRIPE_WEBHOOK_SECRET = env.STRIPE_WEBHOOK_SECRET;
export const SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
export const NEXT_PUBLIC_SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
export const NEXT_PUBLIC_SUPABASE_ANON_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
