"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSettings } from "@/lib/store";

export default function Footer() {
  const { settings } = useSettings();
  // Current year is read after mount — Next forbids new Date() during prerender.
  const [year, setYear] = useState("");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Next instructs moving the Date read into an effect (see above)
    setYear(String(new Date().getFullYear()));
  }, []);

  const socials: { label: string; href: string }[] = [
    { label: "WhatsApp", href: settings.socialWhatsapp },
    { label: "Facebook", href: settings.socialFacebook },
    { label: "Instagram", href: settings.socialInstagram },
    { label: "LinkedIn", href: settings.socialLinkedin },
    { label: "YouTube", href: settings.socialYoutube },
  ].filter((s) => s.href.trim() !== "");

  return (
    <footer className="border-t border-slate-200 bg-[var(--zass-base)]">
      <div className="px-5 md:px-14 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-lg text-[#0F172A]">
            <span className="w-3 h-3 rounded-full bg-[var(--zass-accent)] inline-block" />
            {settings.logoText} Education
          </div>
          <p className="text-sm text-slate-500 mt-3 leading-relaxed">
            {settings.footerText}
          </p>
          <p className="text-sm text-slate-500 mt-2">{settings.tagline}</p>
        </div>
        <div>
          <h3 className="font-bold text-[#0F172A]">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/subjects" className="hover:text-[var(--zass-primary)]">
                Subjects
              </Link>
            </li>
            <li>
              <Link href="/papers" className="hover:text-[var(--zass-primary)]">
                Past Papers
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-[var(--zass-primary)]">
                Courses &amp; Notes
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[var(--zass-primary)]">
                About &amp; Team
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[var(--zass-primary)]">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[#0F172A]">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <a
                href={`mailto:${settings.contactEmail}`}
                className="hover:text-[var(--zass-primary)]"
              >
                {settings.contactEmail}
              </a>
            </li>
            <li>
              <a
                href={`tel:${settings.contactPhone.replace(/\s/g, "")}`}
                className="hover:text-[var(--zass-primary)]"
              >
                {settings.contactPhone}
              </a>
            </li>
            {socials.length > 0 && (
              <li className="flex flex-wrap gap-3 pt-1">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--zass-primary)] font-semibold hover:underline"
                  >
                    {s.label}
                  </a>
                ))}
              </li>
            )}
            <li className="pt-2">
              <Link
                href="/admin"
                className="text-sm font-semibold text-slate-500 hover:text-[var(--zass-primary)]"
              >
                Admin Portal
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        © {year} {settings.siteName}. Photos: Unsplash (free stock).
      </div>
    </footer>
  );
}
