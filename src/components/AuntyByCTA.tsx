/**
 * AuntyByCTA — Inline aunty portrait + speech-bubble companion that
 * sits next to a consultation CTA (e.g. "Get Your Formula").
 *
 * Render the CTA as children. The aunty portrait appears to the left,
 * with a small tooltip-style speech bubble nudging the user to take
 * the consultation. The bubble auto-shows for ~6s right after the
 * user picks an aunty, and reappears on hover/focus.
 *
 * If no aunty has been selected yet, this component is invisible
 * and just renders the CTA as-is.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { getAunty, type Aunty } from "@/data/aunties";
import AuntyPortrait from "./AuntyPortrait";
import { SELECTED_AUNTY_KEY } from "./AuntySelectorHero";

interface AuntyByCTAProps {
  children: ReactNode;
  /** Portrait size in px. Default 44. */
  size?: number;
  /** Where the speech bubble pops out relative to the portrait. */
  bubblePosition?: "top" | "bottom" | "right" | "left";
  /** Horizontal anchor for top/bottom bubbles. "start" = left-edge, "end" = right-edge. */
  bubbleAlign?: "start" | "end";
  /** Optional override for the nudge line. */
  message?: string;
}

const DEFAULT_MESSAGE = "C'mon — let's first take this consultation.";

export default function AuntyByCTA({
  children,
  size = 44,
  bubblePosition = "top",
  bubbleAlign = "start",
  message = DEFAULT_MESSAGE,
}: AuntyByCTAProps) {
  const [aunty, setAunty] = useState<Aunty | null>(null);
  const [autoShow, setAutoShow] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const refresh = (justSelected: boolean) => {
      try {
        const id = sessionStorage.getItem(SELECTED_AUNTY_KEY);
        const next = id ? getAunty(id) : null;
        setAunty(next);
        if (next && justSelected) {
          setAutoShow(true);
          if (hideTimer.current) clearTimeout(hideTimer.current);
          hideTimer.current = setTimeout(() => setAutoShow(false), 6000);
        }
      } catch {
        /* ignore */
      }
    };
    // Initial read — show the bubble briefly even on subsequent page loads
    refresh(true);
    const onSelected = () => refresh(true);
    window.addEventListener("aunty:selected", onSelected);
    return () => {
      window.removeEventListener("aunty:selected", onSelected);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  if (!aunty) return <>{children}</>;

  const bubbleOpen = autoShow || hovered;

  return (
    <div
      className="relative inline-flex items-center gap-2.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* CTA (passed as children) — on the left */}
      {children}

      {/* Portrait on the right — clicking it acts as the same CTA */}
      <button
        type="button"
        onClick={() => {
          if (typeof window !== "undefined") window.location.hash = "#quiz";
        }}
        className="relative rounded-full flex-shrink-0 transition-transform hover:scale-105 focus-visible:scale-105"
        style={{
          width: size,
          height: size,
          background: aunty.bg,
          border: `2px solid ${aunty.color}`,
          boxShadow: `0 4px 14px -4px ${aunty.color}55`,
        }}
        aria-label={`Aunty ${aunty.name} — Start consultation`}
      >
        <AuntyPortrait auntyId={aunty.id} size={size - 4} bg={aunty.bg} />
        {/* Tiny pulse dot to signal she's "there" */}
        <span
          className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full animate-pulse"
          style={{ backgroundColor: aunty.color, boxShadow: `0 0 0 2px #FDFCF8` }}
          aria-hidden="true"
        />
      </button>

      {/* Speech bubble */}
      <div
        className={`absolute z-50 transition-all duration-300 pointer-events-none ${
          bubblePosition === "top"
            ? `bottom-full mb-3 ${bubbleAlign === "end" ? "right-0" : "left-0"}`
            : bubblePosition === "bottom"
              ? `top-full mt-3 ${bubbleAlign === "end" ? "right-0" : "left-0"}`
              : bubblePosition === "right"
                ? "left-full ml-3 top-1/2 -translate-y-1/2"
                : "right-full mr-3 top-1/2 -translate-y-1/2"
        }`}
        style={{
          opacity: bubbleOpen ? 1 : 0,
          transform: (() => {
            const yCenter = bubblePosition === "right" || bubblePosition === "left"
              ? "translateY(-50%)"
              : "";
            if (bubbleOpen) return yCenter;
            switch (bubblePosition) {
              case "top": return "translateY(6px)";
              case "bottom": return "translateY(-6px)";
              case "right": return "translate(-6px, -50%)";
              case "left": return "translate(6px, -50%)";
            }
          })(),
        }}
        aria-hidden={!bubbleOpen}
      >
        <div
          className="relative max-w-[260px] rounded-2xl px-4 py-3 shadow-[0_16px_40px_-12px_rgba(26,15,8,0.25)]"
          style={{
            background: `linear-gradient(135deg, ${aunty.gradient[0]} 0%, ${aunty.gradient[1]} 100%)`,
            border: `1.5px solid ${aunty.color}`,
          }}
          role="status"
        >
          <p
            className="font-body text-[9px] font-bold tracking-[1.5px] uppercase mb-1"
            style={{ color: aunty.color }}
          >
            Aunty {aunty.name}
          </p>
          <p className="font-display text-[14px] leading-snug text-[#1A0F08]">
            {message}
          </p>
          {/* Bubble tail */}
          {(() => {
            const tailBase: React.CSSProperties = {
              position: "absolute",
              width: 12,
              height: 12,
              transform: "rotate(45deg)",
            };
            const tailHorizontal =
              bubbleAlign === "end"
                ? { right: size / 2 - 6 }
                : { left: size / 2 - 6 };
            switch (bubblePosition) {
              case "top":
                return (
                  <div
                    style={{
                      ...tailBase,
                      ...tailHorizontal,
                      bottom: -6,
                      background: aunty.gradient[1],
                      borderRight: `1.5px solid ${aunty.color}`,
                      borderBottom: `1.5px solid ${aunty.color}`,
                    }}
                    aria-hidden="true"
                  />
                );
              case "bottom":
                return (
                  <div
                    style={{
                      ...tailBase,
                      ...tailHorizontal,
                      top: -6,
                      background: aunty.gradient[0],
                      borderLeft: `1.5px solid ${aunty.color}`,
                      borderTop: `1.5px solid ${aunty.color}`,
                    }}
                    aria-hidden="true"
                  />
                );
              case "right":
                return (
                  <div
                    style={{
                      ...tailBase,
                      left: -6,
                      top: "50%",
                      marginTop: -6,
                      background: aunty.gradient[0],
                      borderLeft: `1.5px solid ${aunty.color}`,
                      borderBottom: `1.5px solid ${aunty.color}`,
                    }}
                    aria-hidden="true"
                  />
                );
              case "left":
                return (
                  <div
                    style={{
                      ...tailBase,
                      right: -6,
                      top: "50%",
                      marginTop: -6,
                      background: aunty.gradient[1],
                      borderRight: `1.5px solid ${aunty.color}`,
                      borderTop: `1.5px solid ${aunty.color}`,
                    }}
                    aria-hidden="true"
                  />
                );
            }
          })()}
        </div>
      </div>
    </div>
  );
}
