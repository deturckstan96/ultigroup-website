"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError("Ongeldig e-mailadres of wachtwoord.");
      setLoading(false);
      return;
    }

    router.push("/portaal/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-1.5">
          E-mailadres
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="aankoop@bedrijf.be"
          className="w-full border border-[#1F2328]/15 rounded-lg px-3.5 py-2.5 text-sm text-[#1F2328] placeholder-[#1F2328]/25 focus:outline-none focus:border-[#1D4E89] transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-1.5">
          Wachtwoord
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full border border-[#1F2328]/15 rounded-lg px-3.5 py-2.5 text-sm text-[#1F2328] placeholder-[#1F2328]/25 focus:outline-none focus:border-[#1D4E89] transition-colors"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-[#1D4E89] text-white text-sm font-semibold rounded-lg hover:bg-[#163d6e] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
      >
        {loading ? "Bezig met inloggen…" : "Inloggen"}
      </button>
    </form>
  );
}
