import { createClient } from "./server";

/**
 * Haal de klant_naam op uit de Supabase Auth user metadata.
 * Stan stelt dit in via het Supabase dashboard bij het aanmaken van elk klantaccount.
 * Voorbeeld metadata: { klant_naam: "Vergalle NV" }
 */
export async function getKlantNaam(): Promise<string | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const klantNaam = user.user_metadata?.klant_naam as string | undefined;
  return klantNaam ?? null;
}
