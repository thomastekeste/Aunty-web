"use client";
import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (el) {
              el.style.opacity = "1";
              el.style.transform = "translate(0,0)";
            }
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const initial =
    direction === "up"
      ? "translateY(36px)"
      : direction === "left"
      ? "translateX(-36px)"
      : "translateX(36px)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: initial,
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
