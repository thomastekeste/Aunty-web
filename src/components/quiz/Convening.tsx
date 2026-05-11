"use client";

import { useEffect, useState } from "react";

export default function Convening({ messages, accent, onDone }: { messages: string[]; accent: string; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    messages.forEach((_, i) => {
      timers.push(setTimeout(() => setIdx(i), i * 800));
    });
    timers.push(setTimeout(onDone, messages.length * 800 + 400));
    return () => timers.forEach(clearTimeout);
  }, [messages, onDone]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="flex justify-center gap-1.5 mb-10">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: accent,
              opacity: 0.2 + 0.13 * i,
              animation: `convene 1.8s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
      <p className="font-display text-xl md:text-2xl text-[#2D1B0E]/80 max-w-md min-h-[64px]">
        {messages[idx]}
      </p>
    </div>
  );
}
