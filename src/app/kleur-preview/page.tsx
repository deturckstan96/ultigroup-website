const kleuren = [
  {
    nr: 1,
    naam: "Lichtere zand",
    hex: "#F2EEE3",
    omschrijving: "Zelfde familie als nu, maar bleker en minder uitgesproken.",
  },
  {
    nr: 2,
    naam: "Warm grijs-beige",
    hex: "#EEEBE4",
    omschrijving: "Minder geel, meer steengrijs. Professioneler gevoel.",
  },
  {
    nr: 3,
    naam: "Neutraal linen",
    hex: "#EDEDE8",
    omschrijving: "Bijna grijs maar nog warm. Werkt goed met het donkergroen.",
  },
  {
    nr: 4,
    naam: "Koel wit-grijs",
    hex: "#F1F1EC",
    omschrijving: "Nauwelijks kleur, clean. Zoals Notion of Linear.",
  },
  {
    nr: 5,
    naam: "Licht groen-grijs",
    hex: "#EEF0EA",
    omschrijving: "Subtiel groen ondertoon — sluit aan op het pine-groen van het logo.",
  },
];

const PINE = "#14352A";
const ACCENT = "#5A8C4A";
const INK = "#1F2328";
const INK_2 = "#3A3F46";

export default function KleurPreview() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "40px 24px", background: "#fff" }}>
      <p style={{ fontSize: 12, color: "#999", marginBottom: 8, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        Preview — achtergrondkleuren
      </p>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: INK, marginBottom: 8 }}>
        Kies je achtergrondkleur
      </h1>
      <p style={{ fontSize: 14, color: INK_2, marginBottom: 40 }}>
        Huidige kleur: <strong>#F4F1E8</strong> (cream). Hieronder 5 alternatieven.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {kleuren.map((k) => (
          <div key={k.nr} style={{ border: "1px solid #e5e5e5", borderRadius: 12, overflow: "hidden" }}>
            {/* Label balk */}
            <div style={{ padding: "12px 20px", background: "#f9f9f9", borderBottom: "1px solid #e5e5e5", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ background: PINE, color: "#fff", borderRadius: 4, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>
                Optie {k.nr}
              </span>
              <strong style={{ fontSize: 14, color: INK }}>{k.naam}</strong>
              <code style={{ marginLeft: "auto", fontSize: 12, color: "#888", background: "#eee", padding: "2px 8px", borderRadius: 4 }}>
                {k.hex}
              </code>
            </div>

            {/* Mini-pagina preview */}
            <div style={{ background: k.hex, padding: "40px 32px" }}>
              {/* Nav */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48, paddingBottom: 20, borderBottom: `1px solid rgba(0,0,0,0.08)` }}>
                <div style={{ background: PINE, color: "#fff", fontWeight: 900, fontSize: 13, padding: "6px 10px", borderRadius: 6, letterSpacing: "0.05em" }}>
                  UG
                </div>
                <span style={{ fontWeight: 700, fontSize: 14, color: INK, letterSpacing: "0.02em" }}>ULTI GROUP</span>
                <div style={{ marginLeft: "auto", display: "flex", gap: 24 }}>
                  {["Producten", "Over ons", "Contact"].map((l) => (
                    <span key={l} style={{ fontSize: 13, color: INK_2 }}>{l}</span>
                  ))}
                  <span style={{ background: PINE, color: "#fff", fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 6 }}>
                    Offerte
                  </span>
                </div>
              </div>

              {/* Hero tekst */}
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: ACCENT, marginBottom: 12 }}>
                  — ULTI GROUP · KORTRIJK · BE
                </p>
                <h2 style={{ fontSize: 48, fontWeight: 800, color: PINE, lineHeight: 1, margin: 0, letterSpacing: "-0.03em" }}>
                  Palletten op maat
                </h2>
                <p style={{ fontSize: 16, color: INK_2, marginTop: 16, maxWidth: 420, lineHeight: 1.6 }}>
                  Industriële pallets exact op uw specificaties — snel geleverd, geen minimumafnames.
                </p>
              </div>

              {/* Beschrijving */}
              <p style={{ fontSize: 12, color: INK_2, marginTop: 24, fontStyle: "italic" }}>
                {k.omschrijving}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 40, fontSize: 13, color: "#aaa" }}>
        Zeg welk nummer je kiest — dan pas ik de kleur aan in globals.css.
      </p>
    </div>
  );
}
