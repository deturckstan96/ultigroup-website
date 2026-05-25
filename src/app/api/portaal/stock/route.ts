import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getKlantNaam } from "@/lib/supabase/get-klant";

export async function GET() {
  const klantNaam = await getKlantNaam();
  if (!klantNaam) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const supabase = await createClient();

  // Haal alle artikelen op voor deze klant
  const { data: artikelen, error: artError } = await supabase
    .from("artikelen")
    .select("nr, naam, type, eenheid, p_lengte, p_breedte, p_hoogte, minstock, klantref")
    .eq("klant", klantNaam)
    .eq("type", "Pallet")
    .order("nr");

  if (artError) {
    return NextResponse.json({ error: artError.message }, { status: 500 });
  }

  if (!artikelen || artikelen.length === 0) {
    return NextResponse.json({ stock: [] });
  }

  const artikelNrs = artikelen.map((a) => a.nr);

  // Haal stock op voor deze artikelen
  const { data: stockData, error: stockError } = await supabase
    .from("pallet_stock")
    .select("pallet_nr, locatie, qty_in_stock")
    .in("pallet_nr", artikelNrs);

  if (stockError) {
    return NextResponse.json({ error: stockError.message }, { status: 500 });
  }

  // Combineer artikelen met hun stock per locatie
  const result = artikelen.map((art) => {
    const regels = (stockData ?? [])
      .filter((s) => s.pallet_nr === art.nr)
      .map((s) => ({
        locatie: s.locatie,
        qty: Number(s.qty_in_stock),
        min_stock: Number(art.minstock ?? 0),
      }));

    return {
      artikel_nr: art.nr,
      artikel_naam: art.naam,
      eenheid: art.eenheid,
      p_lengte: art.p_lengte,
      p_breedte: art.p_breedte,
      p_hoogte: art.p_hoogte,
      klantref: art.klantref,
      min_stock: Number(art.minstock ?? 0),
      totaal: regels.reduce((s, r) => s + r.qty, 0),
      regels,
    };
  });

  return NextResponse.json({ stock: result });
}
