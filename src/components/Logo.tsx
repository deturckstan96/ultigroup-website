type Props = {
  variant?: "default" | "reversed" | "mark-only";
  size?: "xs" | "sm" | "md" | "lg";
};

export default function Logo({ variant = "default", size = "md" }: Props) {
  const sizes = {
    xs: { box: "w-8 h-8 text-[11px]",  dot: "w-1.5 h-1.5", text: "text-sm"  },
    sm: { box: "w-9 h-9 text-sm",      dot: "w-2 h-2",      text: "text-base" },
    md: { box: "w-14 h-14 text-xl",    dot: "w-3 h-3",      text: "text-2xl" },
    lg: { box: "w-24 h-24 text-4xl",   dot: "w-5 h-5",      text: "text-5xl" },
  }[size];

  const isReversed = variant === "reversed";
  const boxBg    = isReversed ? "bg-white" : "bg-[#14352A]";
  const boxText  = isReversed ? "text-[#14352A]" : "text-white";
  const textColor = isReversed ? "text-white" : "text-[#14352A]";
  const groupCol  = isReversed ? "text-white/55" : "text-[#6B7280]";

  return (
    <div className="flex items-center gap-3">
      <div
        className={`relative flex items-center justify-center shrink-0 ${sizes.box} ${boxBg} ${boxText}`}
        style={{ fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "-0.03em" }}
      >
        UG
        <span className={`absolute bottom-0 right-0 bg-[#5A8C4A] ${sizes.dot}`} />
      </div>
      {variant !== "mark-only" && (
        <span
          className={`whitespace-nowrap uppercase ${sizes.text} ${textColor}`}
          style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.02em" }}
        >
          ULTI<span className={`font-normal ${groupCol}`}> GROUP</span>
        </span>
      )}
    </div>
  );
}
