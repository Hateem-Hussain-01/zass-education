"use client";

import { useSettings } from "@/lib/store";
import Icon from "./icons";

/**
 * Thin top bar (Purdue layout): phone + email on the left, social icons
 * on the right. No opening hours — that would be an invented fact.
 * Only social links the admin actually filled in are shown.
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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-1.5 text-[13px] md:px-10">
        <div className="flex min-w-0 items-center gap-5">
          <a
            href={`tel:${settings.contactPhone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 whitespace-nowrap hover:underline"
          >
            <Icon name="phone" className="h-3.5 w-3.5" />
            {settings.contactPhone}
          </a>
          <a
            href={`mailto:${settings.contactEmail}`}
            className="hidden items-center gap-1.5 whitespace-nowrap hover:underline sm:flex"
          >
            <Icon name="mail" className="h-3.5 w-3.5" />
            {settings.contactEmail}
          </a>
        </div>
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
