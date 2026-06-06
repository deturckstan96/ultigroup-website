import { createClient } from "@/lib/supabase/server";
import { getKlantNaam } from "@/lib/supabase/get-klant";
import IoNummersClient from "./IoNummersClient";

async function getIoData(klantNaam: string) {
  const supabase = await createClient();

  // Zoek partner
  const { data: relatie } = await supabase
    .from("zakenrelaties")
    .select("id")
    .eq("naam", klantNaam)
    .single();

  if (!relatie) return [];

  // IO nummers
  const { data: ios } = await supabase
    .from("klant_io_nummers")
    .select("id, io_nummer, item_id, item_name, qty_totaal, qty_verbruikt, notitie")
    .eq("partner_id", relatie.id)
    .eq("actief", true)
    .order("io_nummer");

  if (!ios?.length) return [];

  // Afroepen in behandeling per IO
  const ioIds = ios.map((io) => io.id);
  const { data: inBehandeling } = await supabase
    .from("portaal_afroepen")
    .select("io_nummer_id, qty")
    .in("io_nummer_id", ioIds)
    .not("status", "in", '("afgewezen","geannuleerd","geleverd")');

  const behandelingMap: Record<string, number> = {};
  for (const afr of inBehandeling ?? []) {
    if (afr.io_nummer_id) {
      behandelingMap[afr.io_nummer_id] = (behandelingMap[afr.io_nummer_id] ?? 0) + Number(afr.qty ?? 0);
    }
  }

  // Afroepen gekoppeld aan elk IO (incl. status + delivery link)
  const { data: alleAfroepen } = await supabase
    .from("portaal_afroepen")
    .select("id, io_nummer_id, qty, status, sales_delivery_id, gewenste_datum, created_at")
    .in("io_nummer_id", ioIds);

  // Delivery details voor afgeleverde afroepen
  const deliveryIds = (alleAfroepen ?? [])
    .map((a) => a.sales_delivery_id)
    .filter(Boolean) as string[];

  let deliveryMap: Record<string, { planned_date: string | null; delivery_date: string | null; status: string; qty_planned: number; qty_received: number }> = {};

  if (deliveryIds.length) {
    const { data: deliveries } = await supabase
      .from("sales_delivery")
      .select("delivery_id, planned_date, delivery_date, status")
      .in("delivery_id", deliveryIds);

    const { data: lines } = await supabase
      .from("sales_delivery_line")
      .select("delivery_id, item_id, qty_planned, qty_received")
      .in("delivery_id", deliveryIds);

    for (const del of deliveries ?? []) {
      const line = (lines ?? []).find(
        (l) => l.delivery_id === del.delivery_id
      );
      deliveryMap[del.delivery_id] = {
        planned_date:  del.planned_date,
        delivery_date: del.delivery_date,
        status:        del.status,
        qty_planned:   line ? Number(line.qty_planned) : 0,
        qty_received:  line ? Number(line.qty_received) : 0,
      };
    }
  }

  // Groepeer afroepen per IO
  const afroepenPerIo: Record<string, typeof alleAfroepen> = {};
  for (const afr of alleAfroepen ?? []) {
    if (!afr.io_nummer_id) continue;
    if (!afroepenPerIo[afr.io_nummer_id]) afroepenPerIo[afr.io_nummer_id] = [];
    afroepenPerIo[afr.io_nummer_id]!.push(afr);
  }

  return ios.map((io) => {
    const inBeh   = behandelingMap[io.id] ?? 0;
    const beschikb = Math.max(0, Number(io.qty_totaal) - Number(io.qty_verbruikt) - inBeh);

    const ioAfroepen = (afroepenPerIo[io.id] ?? []).sort((a, b) => {
      const da = a.gewenste_datum || a.created_at || "";
      const db = b.gewenste_datum || b.created_at || "";
      return db.localeCompare(da);
    });

    const leveringen = ioAfroepen.map((afr) => {
      const del = afr.sales_delivery_id ? deliveryMap[afr.sales_delivery_id] : null;
      return {
        delivery_id:   afr.sales_delivery_id ?? `afroep-${afr.id}`,
        planned_date:  del?.planned_date ?? afr.gewenste_datum ?? null,
        delivery_date: del?.delivery_date ?? null,
        status:        del?.status ?? afr.status,
        qty_planned:   del?.qty_planned ?? Number(afr.qty ?? 0),
        qty_received:  del?.qty_received ?? 0,
        afroep_status: afr.status,
      };
    });

    return {
      id:                 io.id,
      io_nummer:          io.io_nummer,
      item_id:            io.item_id,
      item_name:          io.item_name ?? null,
      qty_totaal:         Number(io.qty_totaal),
      qty_verbruikt:      Number(io.qty_verbruikt),
      qty_in_behandeling: inBeh,
      qty_beschikbaar:    beschikb,
      notitie:            io.notitie ?? null,
      leveringen,
    };
  });
}

export default async function IoNummersPage() {
  const klantNaam = await getKlantNaam();
  const ioNummers = klantNaam ? await getIoData(klantNaam) : [];

  return (
    <div>
      <div className="px-8 py-6 border-b border-[#E1DDD0]" style={{ background: "#F4F1E8" }}>
        <p className="text-xs font-semibold text-[#14352A]/40 uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-display)" }}>Contractbeheer</p>
        <h1 className="text-2xl font-bold text-[#14352A]" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
          IO-nummers
        </h1>
        <p className="text-sm text-[#1F2328]/45 mt-0.5">
          Overzicht van uw contracten, beschikbaar saldo en leveringshistoriek per artikel.
        </p>
      </div>
    <div className="p-8 max-w-5xl">

      <IoNummersClient ioNummers={ioNummers} />
    </div>
    </div>
  );
}