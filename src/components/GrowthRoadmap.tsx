"use client";

export interface Milestone {
  jaar: string;
  titel: string;
  beschrijving: string;
  status: "completed" | "current" | "future";
}

interface Props {
  milestones: Milestone[];
}

function Node({ status }: { status: Milestone["status"] }) {
  const base =
    "flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300 ease-out group-hover:scale-[1.6]";

  if (status === "completed")
    return (
      <div
        className={`${base} bg-[#1D4E89] group-hover:shadow-[0_0_18px_rgba(29,78,137,0.45)]`}
      >
        <svg
          className="w-2.5 h-2.5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    );

  if (status === "current")
    return (
      <div
        className={`${base} bg-[#1D4E89] ring-[3px] ring-[#1D4E89]/25 ring-offset-2 group-hover:shadow-[0_0_22px_rgba(29,78,137,0.55)]`}
      >
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>
    );

  return (
    <div
      className={`${base} border-2 border-[#1F2328]/20 bg-white group-hover:border-[#1D4E89]/40`}
    />
  );
}

export default function GrowthRoadmap({ milestones }: Props) {
  return (
    <>
      {/* ── DESKTOP: horizontaal ─────────────────────────────────── */}
      <div className="hidden md:block relative">
        {/* Verbindingslijn — loopt van center eerste node tot center laatste node */}
        <div
          className="absolute h-px bg-gradient-to-r from-[#1D4E89]/30 via-[#1D4E89]/20 to-[#1D4E89]/30 pointer-events-none"
          style={{ top: "46px", left: "10%", right: "10%" }}
        />

        <div className="flex justify-between">
          {milestones.map((m) => (
            <div
              key={m.jaar}
              className="group flex flex-col items-center flex-1 px-3 cursor-default"
            >
              {/* Jaar */}
              <p
                className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#1D4E89] mb-4"
                style={{ height: "20px", lineHeight: "20px" }}
              >
                {m.jaar}
              </p>

              {/* Node — zit op de lijn (top = 20px jaar + 16px mb = 36px, center = 36+10 = 46px ✓) */}
              <div className="relative z-10 mb-7">
                <Node status={m.status} />
              </div>

              {/* Content */}
              <div className="text-center transition-all duration-300 ease-out group-hover:-translate-y-1.5">
                <h3
                  className="text-sm font-bold text-[#1F2328] mb-2 leading-snug"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {m.titel}
                </h3>
                <p className="text-xs text-[#1F2328]/45 leading-relaxed max-w-[160px] mx-auto">
                  {m.beschrijving}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE: verticaal ────────────────────────────────────── */}
      <div className="md:hidden relative">
        {/* Verticale lijn */}
        <div className="absolute left-[9px] top-2 bottom-2 w-px bg-[#1D4E89]/15" />

        <div className="space-y-10 pl-10">
          {milestones.map((m) => (
            <div key={m.jaar} className="relative">
              {/* Node */}
              <div className="absolute -left-10 top-0.5">
                <Node status={m.status} />
              </div>

              {/* Content */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1D4E89] mb-1">
                  {m.jaar}
                </p>
                <h3
                  className="text-base font-bold text-[#1F2328] mb-1.5"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {m.titel}
                </h3>
                <p className="text-sm text-[#1F2328]/50 leading-relaxed">
                  {m.beschrijving}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
