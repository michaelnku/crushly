"use client";

import { cn } from "@/lib/utils";

export type FloatingBadgePosition =
  | "left-top"
  | "left-middle"
  | "left-bottom"
  | "right-top"
  | "right-middle"
  | "right-bottom";

interface FloatingBadgeProps {
  text: string;
  emoji: string;
  position: FloatingBadgePosition;
  delay?: number;
}

const positions: Record<FloatingBadgePosition, string> = {
  "left-top": "-left-12 top-16",
  "left-middle": "-left-14 top-1/2 -translate-y-1/2",
  "left-bottom": "-left-10 bottom-24",

  "right-top": "-right-12 top-36",
  "right-middle": "-right-14 top-1/2 -translate-y-1/2",
  "right-bottom": "-right-10 bottom-20",
};

export default function FloatingBadge({
  text,
  emoji,
  position,
  delay = 0,
}: FloatingBadgeProps) {
  return (
    <div
      className={cn(
        "absolute z-30",
        positions[position],

        "rounded-full",
        "transition-all duration-300 hover:scale-105",
        "border border-crushly-soft",
        "bg-crushly-glass",
        "backdrop-blur-xl",

        "px-4 py-2",

        "shadow-crushly",

        "flex items-center gap-2",

        "text-sm font-medium",

        "text-crushly-primary",

        "animate-[crushly-float_6s_ease-in-out_infinite]",
      )}
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      <span className="text-base">{emoji}</span>

      <span>{text}</span>
    </div>
  );
}
