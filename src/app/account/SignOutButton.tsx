"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <button
      onClick={handleSignOut}
      className="font-body text-sm text-[rgba(26,15,8,0.4)] hover:text-[#D4A04A] transition-colors underline underline-offset-2"
    >
      Sign out
    </button>
  );
}
