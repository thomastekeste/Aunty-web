import { ImageResponse } from "next/og";

export const alt = "Aunty Council — Hair & Skin, Aunty Curated";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FEF8EC",
          padding: "60px",
        }}
      >
        {/* Decorative top accent line */}
        <div
          style={{
            width: 80,
            height: 4,
            backgroundColor: "#D4A04A",
            borderRadius: 2,
            marginBottom: 40,
          }}
        />

        {/* Main title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#2D1B0E",
            letterSpacing: "-1px",
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          Aunty Council
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: "#D4A04A",
            marginTop: 16,
            textAlign: "center",
          }}
        >
          Hair &amp; Skin, Aunty Curated
        </div>

        {/* Decorative divider */}
        <div
          style={{
            width: 40,
            height: 2,
            backgroundColor: "#2D1B0E",
            opacity: 0.2,
            borderRadius: 1,
            marginTop: 32,
            marginBottom: 32,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: "#2D1B0E",
            opacity: 0.7,
            textAlign: "center",
          }}
        >
          Take the free consultation. Shop your picks.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
