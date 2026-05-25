import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getKlantNaam } from "@/lib/supabase/get-klant";

export async function GET() {
  const klantNaam = await getKlantNaam();
  if (!klantNaam) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const supabase = await createClient();

  // Alle geposte leveringen voor deze klant
  const { data: leveringen, error: levError } = await supabase
    .from("sales_delivery")
    .select("delivery_id, customer_name, planned_date, delivery_date, status, ref, transporter_name, posted_at")
    .eq("customer_name", klantNaam)
    .eq("status", "Posted")
    .order("posted_at", { ascending: false })
    .limit(50);

  if (levError) {
    return NextResponse.json({ error: levError.message }, { status: 500 });
  }

  if (!leveringen || leveringen.length === 0) {
    return NextResponse.json({ leveringen: [] });
  }

  const deliveryIds = leveringen.map((l) => l.delivery_id);

  // Haal regels op voor al deze leveringen
  const { data: regels, error: regelError } = await supabase
    .from("sales_delivery_line")
    .select("delivery_id, item_id, item_name, qty_planned, qty_received, uom")
    .in("delivery_id", deliveryIds);

  if (regelError) {
    return NextResponse.json({ error: regelError.message }, { status: 500 });
  }

  // Haal verkoopprijzen op voor de artikelen in deze leveringen
  const itemIds = [...new Set((regels ?? []).map((r) => r.item_id))];
  let prijzen: Record<string, number> = {};

  if (itemIds.length > 0) {
    const { data: prijsData } = await supabase
      .from("productiekost_verkoopprijzen")
      .select("artikel_nr, verkoopprijs")
      .in("artikel_nr", itemIds);

    if (prijsData) {
      prijzen = Object.fromEntries(
        prijsData.map((p) => [p.artikel_nr, Number(p.verkoopprijs)])
      );
    }
  }

  // Combineer alles
  const result = leveringen.map((lev) => {
    const levRegels = (regels ?? [])
      .filter((r) => r.delivery_id === lev.delivery_id)
      .map((r) => ({
        artikel_nr: r.item_id,
        naam: r.item_name,
        stuks: Number(r.qty_received ?? r.qty_planned),
        prijs_per_stuk: prijzen[r.item_id] ?? 0,
      }));

    return {
      id: lev.delivery_id,
      datum: lev.delivery_date ?? lev.planned_date,
      status: lev.status,
      klant_ref: lev.ref ?? "",
      transporter: lev.transporter_name ?? "",
      regels: levRegels,
    };
  });

  return NextResponse.json({ leveringen: result });
}
