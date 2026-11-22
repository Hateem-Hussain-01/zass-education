"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCourses, useSettings } from "@/lib/store";
import Logo from "./Logo";

const NEWSLETTER_KEY = "zass.newsletter.v1";

function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      const raw = window.localStorage.getItem(NEWSLETTER_KEY);
      const list: string[] = raw ? (JSON.parse(raw) as string[]) : [];
      if (!list.includes(value)) {
        list.push(value);
        window.localStorage.setItem(NEWSLETTER_KEY, JSON.stringify(list));
      }
    } catch {
      // browser storage unavailable - still confirm in this session
    }
    setError("");
    setDone(true);
  };

  return (
    <section className="bg-[var(--zass-primary)] px-5 md:px-14 py-14 text-center text-white">
      <h2 className="mx-auto max-w-xl text-3xl font-extrabold leading-tight md:text-4xl">
        Subscribe to our newsletter, We don&apos;t make any spam.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/85">
        New past papers, notes and courses - straight to your inbox, only when
        there is something new.
      </p>
      {done ? (
        <p className="mx-auto mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-bold text-[#004643]">
          Thanks for subscribing - you&apos;re on the list.
        </p>
      ) : (
        <form
          onSubmit={subscribe}
          className="mx-auto mt-6 flex max-w-md items-center rounded-full bg-[var(--zass-card)] p-1.5 pl-5"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email Address"
            aria-label="Email address for the newsletter"
            className="min-w-0 flex-1 border-none bg-transparent text-sm text-[rgba(0,70,67,0.78)] outline-none"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-[var(--zass-primary)] px-6 py-2.5 text-sm font-bold text-white"
          >
            Subscribe
          </button>
        </form>
      )}
      {error && <p className="mt-3 text-sm font-semibold text-white">{error}</p>}
    </section>
  );
}

export default function Footer() {
  const { settings } = useSettings();
  const { courses } = useCourses();
  // Current year is read after mount - Next forbids new Date() during prerender.
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
    <footer>
      <NewsletterBand />
      <div className="bg-[var(--zass-base)] px-5 md:px-14 py-12">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-[rgba(0,70,67,0.6)]">
              {settings.footerText}
            </p>
            <p className="mt-2 text-sm text-[rgba(0,70,67,0.6)]">
              {settings.tagline}
            </p>
            {socials.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="rounded-full bg-[var(--zass-primary)] px-3 py-1.5 text-xs font-bold text-white hover:opacity-90"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-extrabold text-[#004643]">Courses</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[rgba(0,70,67,0.78)]">
              {courses.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <Link href="/courses" className="hover:text-[var(--zass-primary)]">
                    {c.title.split(" - ")[0]}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/courses" className="font-bold text-[var(--zass-primary)] hover:underline">
                  All courses →
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-extrabold text-[#004643]">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[rgba(0,70,67,0.78)]">
              <li>
                <Link href="/about" className="hover:text-[var(--zass-primary)]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/papers" className="hover:text-[var(--zass-primary)]">
                  Past Papers
                </Link>
              </li>
              <li>
                <Link href="/boards" className="hover:text-[var(--zass-primary)]">
                  Examination Boards
                </Link>
              </li>
              <li>
                <Link href="/book-session" className="hover:text-[var(--zass-primary)]">
                  Book a 1-to-1 Session
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
            <h3 className="font-extrabold text-[#004643]">Contact Info</h3>
            <ul className="mt-4 space-y-3 text-sm text-[rgba(0,70,67,0.78)]">
              <li>
                <span className="block text-xs font-bold uppercase tracking-wide text-[rgba(0,70,67,0.6)]">
                  Phone number
                </span>
                <a
                  href={`tel:${settings.contactPhone.replace(/\s/g, "")}`}
                  className="hover:text-[var(--zass-primary)]"
                >
                  {settings.contactPhone}
                </a>
              </li>
              <li>
                <span className="block text-xs font-bold uppercase tracking-wide text-[rgba(0,70,67,0.6)]">
                  Email Address
                </span>
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="hover:text-[var(--zass-primary)]"
                >
                  {settings.contactEmail}
                </a>
              </li>
              <li>
                <span className="block text-xs font-bold uppercase tracking-wide text-[rgba(0,70,67,0.6)]">
                  WhatsApp
                </span>
                <a
                  href={settings.contactWhatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--zass-primary)]"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-[rgba(0,70,67,0.15)] bg-[var(--zass-base)] py-4 text-center text-xs text-[rgba(0,70,67,0.6)]">
        © {year} {settings.siteName}. All Rights Reserved.
      </div>
    </footer>
  );
}
