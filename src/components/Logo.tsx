import Image from "next/image";

type Props = {
  variant?: "default" | "reversed" | "mark-only";
  size?: "xs" | "sm" | "md" | "lg";
};

// Officiële SVG-verhoudingen (viewBox):
//  volledig logo : 704 × 136  (≈ 5.18:1)
//  beeldmerk     : 108 × 105  (≈ 1:1)
const HEIGHTS: Record<NonNullable<Props["size"]>, number> = {
  xs: 20,
  sm: 28,
  md: 40,
  lg: 64,
};

export default function Logo({ variant = "default", size = "md" }: Props) {
  const h = HEIGHTS[size];
  const isReversed = variant === "reversed";

  if (variant === "mark-only") {
    const w = Math.round(h * (108 / 105));
    return (
      <Image
        src={isReversed ? "/ultigroup-mark-white.svg" : "/ultigroup-mark.svg"}
        alt="ULTI GROUP"
        width={w}
        height={h}
        priority
        unoptimized
        style={{ height: h, width: "auto" }}
      />
    );
  }

  const w = Math.round(h * (704 / 136));
  return (
    <Image
      src={isReversed ? "/ultigroup-logo-white.svg" : "/ultigroup-logo.svg"}
      alt="ULTI GROUP"
      width={w}
      height={h}
      priority
      unoptimized
      style={{ height: h, width: "auto" }}
    />
  );
}
