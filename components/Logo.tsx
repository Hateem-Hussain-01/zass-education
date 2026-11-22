"use client";

import Link from "next/link";
import { useSettings } from "@/lib/store";

/**
 * Zass brand lockup - drawn in code (never the template's logo file):
 * a graduation cap (mortarboard + tassel) in Cyprus, the wordmark ZASS
 * in bold, and LEARNING in small capitals underneath. When the admin
 * has uploaded a logo PNG (Settings → Site Logo), that image replaces
 * this lockup everywhere; Remove/Reset in Settings brings it back.
 */
export function CapIcon({
  className,
  color = "#004643",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Mortarboard top */}
      <path d="M24 4 46 13.5 24 23 2 13.5 24 4Z" fill={color} />
      {/* Cap band under the board */}
      <path
        d="M12.5 19.5v9.4c0 3.9 5.1 6.6 11.5 6.6s11.5-2.7 11.5-6.6v-9.4l-11.5 4.6-11.5-4.6Z"
        fill={color}
      />
      {/* Tassel hanging from the right corner */}
      <path
        d="M44 15.5v11.5"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="44" cy="30.5" r="2.8" fill={color} />
    </svg>
  );
}

export default function Logo({
  tone = "cyprus",
  compact = false,
}: {
  /** "cyprus" on light backgrounds, "white" on Cyprus backgrounds. */
  tone?: "cyprus" | "white";
  /** Compact hides the LEARNING line (tight spots like the admin sidebar). */
  compact?: boolean;
}) {
  const { settings } = useSettings();
  const color = tone === "white" ? "#ffffff" : "#004643";
  const subColor =
    tone === "white" ? "rgba(255,255,255,0.85)" : "rgba(0,70,67,0.6)";

  if (settings.siteLogo) {
    return (
      <Link href="/" className="flex shrink-0 items-center" aria-label="Zass Education - home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={settings.siteLogo}
          alt="Zass Education logo"
          className="h-10 w-auto max-w-[180px] object-contain"
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className="flex shrink-0 items-start gap-2"
      aria-label="Zass Education - home"
    >
      {/* Tall cap (full lockup only): h-12 so the cap spans both text
          lines - its band bottom lands level with the L of LEARNING.
          Compact (admin sidebar, no LEARNING line) keeps the h-9 cap. */}
      <CapIcon
        className={compact ? "h-9 w-9 shrink-0" : "h-12 w-12 shrink-0"}
        color={color}
      />
      <span className="flex flex-col leading-none">
        <span
          className="text-[22px] font-extrabold tracking-tight"
          style={{ color }}
        >
          {(settings.logoText || "Zass").toUpperCase()}
        </span>
        {!compact && (
          <span
            className="mt-1 text-[10px] font-bold uppercase"
            style={{ color: subColor, letterSpacing: "0.32em" }}
          >
            Learning
          </span>
        )}
      </span>
    </Link>
  );
}
