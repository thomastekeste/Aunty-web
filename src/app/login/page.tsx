"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/account";

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const supabase = createClient();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === "login") {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      router.push(next);
    } else {
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${siteUrl}/auth/callback?next=/account`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      setEmailSent(true);
      setLoading(false);
    }
  }

  if (emailSent) {
    return (
      <main
        className="font-body min-h-screen flex flex-col items-center justify-center px-4"
        style={{ background: "#FDFCF8" }}
      >
        <div
          className="w-full max-w-md text-center rounded-3xl p-10 shadow-sm"
          style={{ background: "#FFFFFF", border: "1px solid rgba(26,15,8,0.09)" }}
        >
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "#F5ECD4" }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C9903A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>

          <h1
            className="font-display text-2xl font-bold mb-3"
            style={{ color: "#2D1B0E" }}
          >
            Check your email
          </h1>
          <p className="text-base mb-8" style={{ color: "#6B5040" }}>
            We sent a confirmation link to{" "}
            <span className="font-semibold" style={{ color: "#2D1B0E" }}>
              {email}
            </span>
            . Click the link to activate your account.
          </p>

          <button
            type="button"
            onClick={() => {
              setEmailSent(false);
              setMode("login");
            }}
            className="font-body text-sm font-semibold underline underline-offset-2"
            style={{ color: "#C9903A" }}
          >
            Back to login
          </button>
        </div>

        <Link
          href="/"
          className="mt-8 text-sm"
          style={{ color: "#9E8C7A" }}
        >
          ← Back to Aunty Council
        </Link>
      </main>
    );
  }

  return (
    <main
      className="font-body min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "#FDFCF8" }}
    >
      {/* Card */}
      <div
        className="w-full max-w-md rounded-3xl p-8 sm:p-10 shadow-sm"
        style={{ background: "#FFFFFF", border: "1px solid rgba(26,15,8,0.09)" }}
      >
        {/* Logo / wordmark */}
        <div className="flex flex-col items-center mb-8">
          <span
            className="font-display text-2xl font-bold tracking-tight mb-1"
            style={{ color: "#2D1B0E" }}
          >
            Aunty Council
          </span>
          <span className="text-sm" style={{ color: "#9E8C7A" }}>
            {mode === "login"
              ? "Welcome back, love."
              : "Join the council. It's free."}
          </span>
        </div>

        {/* Mode toggle */}
        <div
          className="flex rounded-full p-1 mb-8"
          style={{ background: "#F7F5F0" }}
        >
          {(["login", "signup"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setError(null);
              }}
              className="flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={
                mode === m
                  ? {
                      background: "#D4A04A",
                      color: "#FFFFFF",
                      boxShadow: "0 1px 4px rgba(201,144,58,0.35)",
                    }
                  : { color: "#6B5040" }
              }
            >
              {m === "login" ? "Log in" : "Sign up"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#6B5040" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
              style={{
                background: "#FDFCF8",
                border: "1.5px solid rgba(26,15,8,0.15)",
                color: "#2D1B0E",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "#C9903A")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "rgba(26,15,8,0.15)")
              }
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#6B5040" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              required
              minLength={mode === "signup" ? 8 : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                mode === "signup" ? "At least 8 characters" : "••••••••"
              }
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
              style={{
                background: "#FDFCF8",
                border: "1.5px solid rgba(26,15,8,0.15)",
                color: "#2D1B0E",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "#C9903A")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "rgba(26,15,8,0.15)")
              }
            />
          </div>

          {/* Error */}
          {error && (
            <p
              className="text-sm rounded-xl px-4 py-3"
              style={{
                background: "#FFF3E0",
                color: "#A06010",
                border: "1px solid rgba(160,96,16,0.2)",
              }}
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full py-3 text-sm font-bold tracking-wide transition-all duration-200 disabled:opacity-60"
            style={{
              background: "#D4A04A",
              color: "#FFFFFF",
              boxShadow: "0 2px 12px rgba(201,144,58,0.35)",
            }}
            onMouseEnter={(e) =>
              !loading &&
              (e.currentTarget.style.background = "#C9903A")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#D4A04A")
            }
          >
            {loading
              ? "Please wait…"
              : mode === "login"
              ? "Log in"
              : "Create account"}
          </button>
        </form>

        {/* Footer links */}
        {mode === "login" && (
          <p className="mt-5 text-center text-sm" style={{ color: "#9E8C7A" }}>
            No account yet?{" "}
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError(null);
              }}
              className="font-semibold underline underline-offset-2"
              style={{ color: "#C9903A" }}
            >
              Sign up free
            </button>
          </p>
        )}

        {mode === "signup" && (
          <p className="mt-5 text-center text-xs leading-relaxed" style={{ color: "#9E8C7A" }}>
            By signing up you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-2"
              style={{ color: "#6B5040" }}
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-2"
              style={{ color: "#6B5040" }}
            >
              Privacy Policy
            </Link>
            .
          </p>
        )}
      </div>

      {/* Back home */}
      <Link
        href="/"
        className="mt-8 text-sm transition-colors"
        style={{ color: "#9E8C7A" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#C9903A")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#9E8C7A")}
      >
        ← Back to Aunty Council
      </Link>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
