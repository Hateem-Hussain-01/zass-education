"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSettings } from "@/lib/store";
import { BOARDS } from "@/lib/boards";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/subjects", label: "Subjects" },
  { href: "/papers", label: "Past Papers" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { settings } = useSettings();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40">
      {settings.announcementOn && settings.announcementText.trim() !== "" && (
        <div className="bg-[var(--zass-primary)] text-white text-center text-sm py-2 px-4">
          {settings.announcementText}
        </div>
      )}
      <nav className="bg-[var(--zass-base)] border-b border-[rgba(0,70,67,0.15)] px-5 md:px-14 py-3 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-xl text-[#004643]"
        >
          <span className="w-3 h-3 rounded-full bg-[var(--zass-accent)] inline-block" />
          {settings.logoText}
          <span className="hidden sm:inline text-sm font-semibold text-[rgba(0,70,67,0.6)]">
            Education
          </span>
        </Link>
        <div className="hidden md:flex gap-6 text-sm font-semibold text-[rgba(0,70,67,0.78)] items-center">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                pathname === l.href
                  ? "text-[var(--zass-primary)]"
                  : "hover:text-[var(--zass-primary)]"
              }
            >
              {l.label}
            </Link>
          ))}
          <div className="relative group">
            <button
              type="button"
              aria-haspopup="true"
              className="hover:text-[var(--zass-primary)] flex items-center gap-1"
            >
              Examination Boards
              <span aria-hidden="true" className="text-xs">
                ▾
              </span>
            </button>
            <div className="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block">
              <div className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl shadow-lg py-2 min-w-[250px]">
                {BOARDS.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/boards/${b.slug}`}
                    className="block px-4 py-2 hover:bg-[rgba(0,70,67,0.06)] hover:text-[var(--zass-primary)]"
                  >
                    {b.name}
                  </Link>
                ))}
                <div className="border-t border-[rgba(0,70,67,0.15)] my-2" />
                <Link
                  href="/boards"
                  className="block px-4 py-2 font-bold text-[var(--zass-primary)] hover:bg-[rgba(0,70,67,0.06)]"
                >
                  All examination boards →
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Link
          href="/admin"
          className="bg-[var(--zass-primary)] text-white text-sm font-bold px-4 py-2 rounded-full shrink-0"
        >
          Admin
        </Link>
      </nav>
      <div className="md:hidden bg-[var(--zass-base)] border-b border-[rgba(0,70,67,0.15)] px-5 py-2 flex gap-5 overflow-x-auto text-sm font-semibold text-[rgba(0,70,67,0.78)]">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={
              pathname === l.href
                ? "text-[var(--zass-primary)] whitespace-nowrap"
                : "whitespace-nowrap"
            }
          >
            {l.label}
          </Link>
        ))}
        <Link href="/boards" className="whitespace-nowrap">
          Boards
        </Link>
      </div>
    </header>
  );
}
