import type { CurlType } from "@/data/quiz";

interface Props {
  type: CurlType;
  size?: number;
  color?: string;
}

export default function CurlPatternIcon({
  type,
  size = 48,
  color = "#FEF8EC",
}: Props) {
  // All patterns in a 48x80 viewBox — wider to show clear wave/curl shapes
  const paths: Record<CurlType, string> = {
    // Wavy — clear S-curves like the reference
    "2a": "M 24 4 C 30 16, 18 24, 24 36 C 30 48, 18 56, 24 68 C 28 74, 22 76, 24 76",
    "2b": "M 24 4 C 34 12, 14 24, 24 32 C 34 40, 14 52, 24 60 C 34 68, 18 74, 24 76",
    "2c": "M 24 4 C 40 10, 8 24, 24 32 C 40 40, 8 54, 24 62 C 36 68, 16 74, 24 76",

    // Curly — open loops matching reference spirals
    "3a": "M 24 4 C 38 8, 40 18, 24 20 C 8 22, 6 32, 24 34 C 42 36, 40 46, 24 48 C 8 50, 6 60, 24 62 C 38 64, 34 74, 24 76",
    "3b": "M 24 4 C 38 6, 40 14, 24 16 C 8 18, 6 26, 24 28 C 42 30, 40 38, 24 40 C 8 42, 6 50, 24 52 C 42 54, 40 62, 24 64 C 8 66, 10 74, 24 76",
    "3c": "M 24 4 C 36 5, 38 10, 24 12 C 10 14, 8 19, 24 21 C 40 23, 38 28, 24 30 C 10 32, 8 37, 24 39 C 40 41, 38 46, 24 48 C 10 50, 8 55, 24 57 C 40 59, 38 64, 24 66 C 10 68, 12 74, 24 76",

    // Coily — S-coils tightening to zigzag
    "4a": "M 24 4 C 34 8, 34 14, 24 18 C 14 22, 14 28, 24 32 C 34 36, 34 42, 24 46 C 14 50, 14 56, 24 60 C 34 64, 34 70, 24 76",
    "4b": "M 24 4 L 36 10 L 12 17 L 36 24 L 12 31 L 36 38 L 12 45 L 36 52 L 12 59 L 36 66 L 12 73 L 24 76",
    "4c": "M 24 4 L 35 7 L 13 11 L 35 15 L 13 19 L 35 23 L 13 27 L 35 31 L 13 35 L 35 39 L 13 43 L 35 47 L 13 51 L 35 55 L 13 59 L 35 63 L 13 67 L 35 71 L 13 74 L 24 76",
  };

  const strokeWidths: Record<CurlType, number> = {
    "2a": 2.5, "2b": 2.5, "2c": 3,
    "3a": 2.5, "3b": 2.5, "3c": 2.5,
    "4a": 2.5, "4b": 3, "4c": 3,
  };

  const isZigzag = type === "4b" || type === "4c";

  return (
    <svg
      width={size * 0.6}
      height={size}
      viewBox="0 0 48 80"
      fill="none"
    >
      <path
        d={paths[type]}
        stroke={color}
        strokeWidth={strokeWidths[type]}
        strokeLinecap="round"
        strokeLinejoin={isZigzag ? "round" : undefined}
      />
    </svg>
  );
}
