import Image from "next/image";

type Props = {
  variant?: "default" | "reversed" | "mark-only";
  size?: "xs" | "sm" | "md" | "lg";
};

export default function Logo({ size = "md" }: Props) {
  const heights: Record<string, number> = {
    xs: 28,
    sm: 36,
    md: 48,
    lg: 72,
  };

  const h = heights[size] ?? 48;

  return (
    <Image
      src="/logo-1.jpg"
      alt="ULTI GROUP"
      height={h}
      width={h * 4}
      style={{ height: h, width: "auto", objectFit: "contain" }}
      priority
    />
  );
}
