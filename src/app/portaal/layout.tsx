import PortaalSidebar from "@/components/portaal/PortaalSidebar";
import { createClient } from "@/lib/supabase/server";

export default async function PortaalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const klantNaam = (user?.user_metadata?.klant_naam as string) ?? "Klant";
  const klantEmail = user?.email ?? "";

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#ffffff" }}>
      <PortaalSidebar klantNaam={klantNaam} klantEmail={klantEmail} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
