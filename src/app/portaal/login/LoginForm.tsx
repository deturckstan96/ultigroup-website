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

  const inputStyle = {
    fontFamily: "var(--font-display)",
    border: "1px solid #D3DBE7",
    borderRadius: 0,
    padding: "10px 14px",
    fontSize: 14,
    color: "#0C355F",
    width: "100%",
    outline: "none",
    background: "#fff",
  };

  const labelStyle = {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: "rgba(31,35,40,0.4)",
    marginBottom: 6,
    fontFamily: "var(--font-display)",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <label style={labelStyle}>E-mailadres</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="aankoop@bedrijf.be"
          style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = "#0C355F")}
          onBlur={e => (e.currentTarget.style.borderColor = "#D3DBE7")}
        />
      </div>
      <div>
        <label style={labelStyle}>Wachtwoord</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = "#0C355F")}
          onBlur={e => (e.currentTarget.style.borderColor = "#D3DBE7")}
        />
      </div>

      {error && (
        <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", padding: "10px 14px" }}>
          <p style={{ fontSize: 13, color: "#DC2626", fontFamily: "var(--font-display)" }}>{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "11px 0",
          background: loading ? "#4FA3D8" : "#0C355F",
          color: "#ffffff",
          fontSize: 14,
          fontWeight: 700,
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.01em",
          border: "none",
          borderRadius: 0,
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background 0.15s",
          marginTop: 4,
        }}
      >
        {loading ? "Bezig met inloggen…" : "Inloggen"}
      </button>
    </form>
  );
}
