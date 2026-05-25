"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { MaandData, TopArtikel } from "./page";

interface Props {
  maandData: MaandData[];
  topArtikelen: TopArtikel[];
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1F2328] text-white text-xs rounded-lg px-3 py-2 shadow-lg">
      <p className="font-semibold mb-0.5">{label}</p>
      <p>{payload[0].value.toLocaleString("nl-BE")} stuks</p>
    </div>
  );
}

export default function RapportCharts({ maandData, topArtikelen }: Props) {
  const maxStuks = Math.max(...topArtikelen.map((a) => a.stuks), 1);

  if (maandData.every((m) => m.stuks === 0) && topArtikelen.length === 0) {
    return (
      <div className="bg-white border border-dashed border-[#1F2328]/15 rounded-xl p-12 text-center">
        <p className="text-[#1F2328]/35 text-sm">Geen leveringsdata beschikbaar voor de afgelopen 12 maanden.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Maandgrafiek */}
      <div className="bg-white border border-[#1F2328]/10 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[#1F2328] mb-1">Maandelijks verbruik</h2>
        <p className="text-xs text-[#1F2328]/40 mb-6">Aantal stuks geleverd per maand</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={maandData} barSize={28} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#1F23280f" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#1F232860" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#1F232860" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => v.toLocaleString("nl-BE")}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#1F23280a" }} />
            <Bar
              dataKey="stuks"
              fill="#1D4E89"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top artikelen */}
      {topArtikelen.length > 0 && (
        <div className="bg-white border border-[#1F2328]/10 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-[#1F2328] mb-1">Top palletten</h2>
          <p className="text-xs text-[#1F2328]/40 mb-6">Meest afgenomen artikelen — laatste 12 maanden</p>
          <div className="space-y-4">
            {topArtikelen.map((art, i) => {
              const pct = Math.round((art.stuks / maxStuks) * 100);
              return (
                <div key={art.nr}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xs font-bold text-white bg-[#1D4E89] rounded px-1.5 py-0.5 shrink-0">
                        #{i + 1}
                      </span>
                      <span className="text-xs font-bold text-[#1D4E89] bg-[#1D4E89]/8 border border-[#1D4E89]/15 rounded px-2 py-0.5 shrink-0">
                        {art.nr}
                      </span>
                      <span className="text-sm font-medium text-[#1F2328] truncate">{art.naam}</span>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <span className="text-sm font-bold text-[#1F2328]">
                        {art.stuks.toLocaleString("nl-BE")}
                      </span>
                      <span className="text-xs text-[#1F2328]/35 ml-1">st</span>
                    </div>
                  </div>
                  <div className="h-2 bg-[#1F2328]/6 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#1D4E89] transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-[#1F2328]/30 mt-0.5">
                    {art.leveringen} {art.leveringen === 1 ? "levering" : "leveringen"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
