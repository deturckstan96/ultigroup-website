"use client";

import Link from "next/link";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { ArtikelVoorspelling, DagPunt } from "./page";

const trendLabel = {
  stijgend: { text: "↑ Stijgend", color: "text-blue-600" },
  dalend: { text: "↓ Dalend", color: "text-amber-600" },
  stabiel: { text: "→ Stabiel", color: "text-[#1F2328]/50" },
};

const statusStyle = {
  ok: { dot: "bg-[#2E7D32]", ring: "border-[#2E7D32]/20", bg: "" },
  waarschuwing: { dot: "bg-amber-500", ring: "border-amber-200", bg: "bg-amber-50/30" },
  kritiek: { dot: "bg-red-500", ring: "border-red-200", bg: "bg-red-50/30" },
};

function formatDatum(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("nl-BE", { day: "numeric", month: "short" });
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  if (item?.value == null) return null;
  return (
    <div className="bg-[#1F2328] text-white text-xs rounded-lg px-3 py-2 shadow-lg">
      <p className="font-semibold mb-0.5">{label ? formatDatum(label) : ""}</p>
      <p>
        {item.value.toLocaleString("nl-BE")} st —{" "}
        {item.name === "historisch" ? "historisch" : "verwacht"}
      </p>
    </div>
  );
}

function VoorspellingChart({
  chartData,
  stockbreukDatum,
  openAfroepDatum,
  todayStr,
  minstock,
}: {
  chartData: DagPunt[];
  stockbreukDatum: string | null;
  openAfroepDatum: string | null;
  todayStr: string;
  minstock: number;
}) {
  const breukInWindow =
    stockbreukDatum &&
    stockbreukDatum > todayStr &&
    chartData.some((p) => p.datum === stockbreukDatum);

  const leveringInWindow =
    openAfroepDatum &&
    openAfroepDatum > todayStr &&
    chartData.some((p) => p.datum === openAfroepDatum);

  return (
    <ResponsiveContainer width="100%" height={180}>
      <ComposedChart data={chartData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#1F23280a" />
        <XAxis
          dataKey="datum"
          interval={14}
          tickFormatter={formatDatum}
          tick={{ fontSize: 10, fill: "#1F232850" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "#1F232850" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => v.toLocaleString("nl-BE")}
          width={48}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#1F232815", strokeWidth: 1 }} />

        {/* Vandaag */}
        <ReferenceLine
          x={todayStr}
          stroke="#1F232830"
          strokeDasharray="3 3"
          label={{ value: "Nu", position: "insideTopRight", fontSize: 9, fill: "#1F232860" }}
        />

        {/* Minimumstock */}
        {minstock > 0 && (
          <ReferenceLine
            y={minstock}
            stroke="#1F232820"
            strokeDasharray="3 3"
            label={{ value: "Min", position: "insideTopRight", fontSize: 9, fill: "#1F232840" }}
          />
        )}

        {/* Verwachte levering */}
        {leveringInWindow && (
          <ReferenceLine
            x={openAfroepDatum!}
            stroke="#2E7D32"
            strokeDasharray="4 2"
            label={{ value: "Levering", position: "insideTopLeft", fontSize: 9, fill: "#2E7D32" }}
          />
        )}

        {/* Stockbreuk */}
        {breukInWindow && (
          <ReferenceLine
            x={stockbreukDatum!}
            stroke="#ef4444"
            strokeWidth={1.5}
            label={{ value: "Stockbreuk", position: "insideTopLeft", fontSize: 9, fill: "#ef4444" }}
          />
        )}

        <Line
          dataKey="historisch"
          stroke="#14352A"
          strokeWidth={2}
          dot={false}
          connectNulls={false}
          name="historisch"
        />
        <Line
          dataKey="forecast"
          stroke="#14352A"
          strokeWidth={2}
          strokeDasharray="5 4"
          dot={false}
          connectNulls={false}
          name="forecast"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default function VoorspellingCards({ voorspellingen }: { voorspellingen: ArtikelVoorspelling[] }) {
  return (
    <div className="space-y-4">
      {voorspellingen.map((v) => {
        const s = statusStyle[v.status];
        const t = trendLabel[v.trend];
        return (
          <div
            key={v.nr}
            className={`bg-white border rounded-xl overflow-hidden ${s.ring || "border-[#1F2328]/10"} ${s.bg}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-[#1F2328]/6">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                <span className="text-xs font-bold text-[#14352A] bg-[#14352A]/8 border border-[#14352A]/15 rounded px-2 py-0.5">
                  {v.nr}
                </span>
                <span className="text-sm font-semibold text-[#1F2328]">{v.naam}</span>
                {v.heeftData && (
                  <span className={`text-xs font-medium ${t.color}`}>{t.text}</span>
                )}
              </div>
              <Link
                href={`/portaal/afroep?artikel=${v.nr}`}
                className="text-xs text-[#14352A] font-semibold hover:underline shrink-0"
              >
                Afroep plaatsen →
              </Link>
            </div>

            {/* Body */}
            <div className="grid grid-cols-2 gap-0">
              {/* Links: stats */}
              <div className="px-6 py-5 border-r border-[#1F2328]/6">
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-0.5">
                      Huidige stock
                    </p>
                    <p className="text-xl font-bold text-[#1F2328]" style={{ fontFamily: "var(--font-display)" }}>
                      {v.huidigStock.toLocaleString("nl-BE")}
                      <span className="text-sm font-normal text-[#1F2328]/35 ml-1">st</span>
                    </p>
                  </div>

                  {v.heeftData ? (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-0.5">
                            Gem. verbruik
                          </p>
                          <p className="text-sm font-semibold text-[#1F2328]">
                            {v.gemMaandVerbruik.toLocaleString("nl-BE")}
                            <span className="text-xs font-normal text-[#1F2328]/40 ml-1">st/mnd</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-0.5">
                            Dagen voorraad
                          </p>
                          <p className={`text-sm font-semibold ${
                            v.status === "kritiek" ? "text-red-600" :
                            v.status === "waarschuwing" ? "text-amber-600" : "text-[#1F2328]"
                          }`}>
                            {v.dagenVoorraad !== null ? Math.floor(v.dagenVoorraad) : "—"}
                          </p>
                        </div>
                      </div>

                      {v.stockbreukDatum && (
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-0.5">
                            Verwachte stockbreuk
                          </p>
                          <p className={`text-sm font-semibold ${
                            v.status === "kritiek" ? "text-red-600" :
                            v.status === "waarschuwing" ? "text-amber-600" : "text-[#2E7D32]"
                          }`}>
                            {new Date(v.stockbreukDatum + "T00:00:00").toLocaleDateString("nl-BE", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      )}

                      {v.openAfroepStuks > 0 && (
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-0.5">
                            Open afroep
                          </p>
                          <p className="text-sm font-semibold text-[#2E7D32]">
                            +{v.openAfroepStuks.toLocaleString("nl-BE")} st verwacht
                            {v.openAfroepDatum && (
                              <span className="font-normal text-[#1F2328]/40 ml-1">
                                op {new Date(v.openAfroepDatum + "T00:00:00").toLocaleDateString("nl-BE", {
                                  day: "numeric",
                                  month: "short",
                                })}
                              </span>
                            )}
                          </p>
                        </div>
                      )}

                      {v.aanbevolenAfroep > 0 && v.status !== "ok" && (
                        <div className="pt-1">
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1F2328]/35 mb-1.5">
                            Aanbevolen afroep
                          </p>
                          <Link
                            href={`/portaal/afroep?artikel=${v.nr}`}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors text-white ${
                              v.status === "kritiek"
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-amber-600 hover:bg-amber-700"
                            }`}
                          >
                            + {v.aanbevolenAfroep.toLocaleString("nl-BE")} st afroepen
                          </Link>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-xs text-[#1F2328]/35 mt-2">
                      Geen leveringsdata beschikbaar in de afgelopen 90 dagen.
                    </p>
                  )}
                </div>
              </div>

              {/* Rechts: grafiek */}
              <div className="px-4 py-5">
                {v.heeftData ? (
                  <>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-0.5 bg-[#14352A] rounded" />
                        <span className="text-[10px] text-[#1F2328]/40">Historisch</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-0.5 bg-[#14352A] rounded border-dashed" style={{ borderTop: "2px dashed #14352A", height: 0 }} />
                        <span className="text-[10px] text-[#1F2328]/40">Verwacht</span>
                      </div>
                    </div>
                    <VoorspellingChart
                      chartData={v.chartData}
                      stockbreukDatum={v.stockbreukDatum}
                      openAfroepDatum={v.openAfroepDatum}
                      todayStr={v.todayStr}
                      minstock={v.minstock}
                    />
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-xs text-[#1F2328]/25 text-center">Onvoldoende data<br />voor grafiek</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
