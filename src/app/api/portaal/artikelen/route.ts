import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getKlantNaam } from "@/lib/supabase/get-klant";

export async function GET() {
  const klantNaam = await getKlantNaam();
  if (!klantNaam) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("artikelen")
    .select("nr, naam, type, eenheid, p_lengte, p_breedte, p_hoogte, klantref, minstock")
    .eq("klant", klantNaam)
    .order("nr");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ artikelen: data ?? [] });
}
