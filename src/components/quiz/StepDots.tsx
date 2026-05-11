"use client";

export default function StepDots({ total, current, accent }: { total: number; current: number; accent: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === current ? 22 : 6,
            height: 6,
            backgroundColor: i <= current ? accent : "rgba(26,15,8,0.1)",
          }}
        />
      ))}
    </div>
  );
}
