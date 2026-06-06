import Logo from "@/components/Logo";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#F4F1E8" }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Logo size="md" />
          <p className="text-sm mt-3" style={{ color: "rgba(31,35,40,0.4)", fontFamily: "var(--font-display)" }}>
            Klantenportaal
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#E1DDD0] p-8" style={{ borderRadius: 0 }}>
          <h2
            className="text-lg font-bold text-[#14352A] mb-1"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
          >
            Inloggen
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(31,35,40,0.45)", fontFamily: "var(--font-display)" }}>
            Vul uw gegevens in om toegang te krijgen tot uw portaal.
          </p>
          <LoginForm />
          <p className="text-xs text-center mt-6" style={{ color: "rgba(31,35,40,0.3)", fontFamily: "var(--font-display)" }}>
            Geen toegang?{" "}
            <a
              href="mailto:info@ultigroup.be"
              className="hover:underline"
              style={{ color: "#5A8C4A" }}
            >
              Contacteer ULTI GROUP
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
