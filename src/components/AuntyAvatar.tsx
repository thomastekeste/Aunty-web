interface AuntyAvatarProps {
  color: string;
  size?: number;
  glow?: boolean;
  className?: string;
}

export default function AuntyAvatar({
  color,
  size = 48,
  glow = false,
  className = "",
}: AuntyAvatarProps) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Glow */}
      {glow && (
        <div
          className="absolute inset-[-8px] rounded-full animate-[glowPulse_3s_ease-in-out_infinite]"
          style={{ backgroundColor: color, opacity: 0.15, filter: "blur(12px)" }}
        />
      )}
      {/* Ring */}
      <div
        className="rounded-full flex items-center justify-center"
        style={{
          width: size,
          height: size,
          backgroundColor: color + "20",
          border: `2px solid ${color}40`,
        }}
      >
        {/* Dot */}
        <div
          className="rounded-full"
          style={{
            width: size * 0.35,
            height: size * 0.35,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
