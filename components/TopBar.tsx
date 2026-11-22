"use client";

import { useSettings } from "@/lib/store";

/**
 * Thin top bar (Purdue layout): social icons only, right-aligned.
 * Phone + email were removed from the top bar (they stay in the
 * footer's Contact Info column). No opening hours — that would be
 * an invented fact. Only social links the admin actually filled
 * in are shown.
 */
export default function TopBar() {
  const { settings } = useSettings();

  const socials: { label: string; href: string; glyph: string }[] = [
    { label: "Facebook", href: settings.socialFacebook, glyph: "f" },
    { label: "Instagram", href: settings.socialInstagram, glyph: "◎" },
    { label: "LinkedIn", href: settings.socialLinkedin, glyph: "in" },
  ].filter((s) => s.href.trim() !== "");

  // WhatsApp is shown as a social too (it is the one social link filled in).
  if (settings.socialWhatsapp.trim() !== "") {
    socials.unshift({
      label: "WhatsApp",
      href: settings.socialWhatsapp,
      glyph: "✆",
    });
  }

  return (
    <div className="bg-[var(--zass-primary)] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-end gap-4 px-5 py-1.5 text-[13px] md:px-10">
        {socials.length > 0 && (
          <div className="flex shrink-0 items-center gap-1.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs font-bold hover:bg-white/30"
              >
                {s.glyph}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
