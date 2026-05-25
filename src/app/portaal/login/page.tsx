import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#1F2328] flex items-center justify-center mb-3">
            <span className="text-white text-sm font-bold" style={{ fontFamily: 'var(--font-jakarta)' }}>ug</span>
          </div>
          <h1 className="text-xl font-bold text-[#1F2328]" style={{ fontFamily: 'var(--font-jakarta)' }}>ulti group.</h1>
          <p className="text-sm text-[#1F2328]/45 mt-1">Klantenportaal</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#1F2328]/8 shadow-sm p-8">
          <h2 className="text-lg font-semibold text-[#1F2328] mb-1">Inloggen</h2>
          <p className="text-sm text-[#1F2328]/45 mb-6">
            Vul uw gegevens in om toegang te krijgen tot uw portaal.
          </p>
          <LoginForm />
          <p className="text-xs text-[#1F2328]/30 text-center mt-6">
            Geen toegang?{" "}
            <a href="mailto:info@ultigroup.be" className="text-[#1D4E89] hover:underline">
              Contacteer ULTI GROUP
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
