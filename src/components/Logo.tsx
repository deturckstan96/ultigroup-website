type Props = {
  variant?: "default" | "reversed" | "mark-only";
  size?: "xs" | "sm" | "md" | "lg";
};

export default function Logo({ variant = "default", size = "md" }: Props) {
  const sizes = {
    xs: { box: "w-8 h-8 text-[11px]",  dot: "w-1.5 h-1.5", text: "text-sm" },
    sm: { box: "w-9 h-9 text-sm",      dot: "w-2 h-2",      text: "text-base" },
    md: { box: "w-14 h-14 text-xl",    dot: "w-3 h-3",      text: "text-2xl" },
    lg: { box: "w-24 h-24 text-4xl",   dot: "w-5 h-5",      text: "text-5xl" },
  }[size];

  const isReversed = variant === "reversed";
  const boxBg      = isReversed ? "bg-paper text-pine" : "bg-pine text-paper";
  const textColor  = isReversed ? "text-paper" : "text-pine";
  const groupCol   = isReversed ? "text-paper/55" : "text-ink-3";

  return (
    <div className="flex items-center gap-4">
      <div
        className={`relative flex items-center justify-center font-display font-black tracking-tighter ${sizes.box} ${boxBg}`}
      >
        UG
        <span className={`absolute bottom-0 right-0 bg-accent ${sizes.dot}`} />
      </div>
      {variant !== "mark-only" && (
        <span className={`font-display font-extrabold tracking-tight uppercase whitespace-nowrap ${sizes.text} ${textColor}`}>
          ULTI<span className={`font-normal ${groupCol}`}> GROUP</span>
        </span>
      )}
    </div>
  );
}
