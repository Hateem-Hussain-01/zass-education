"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSettings } from "@/lib/store";
import { BOARDS } from "@/lib/boards";
import Logo from "./Logo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/subjects", label: "Subjects" },
  { href: "/papers", label: "Past Papers" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Right-side actions. The admin portal is intentionally NOT linked here —
 *  it is reachable only via its direct /admin URL. */
const ACTIONS = [
  {
    href: "/book-session",
    label: "Book a 1-to-1 Session",
    style: "bg-[var(--zass-primary)] text-white",
  },
  {
    href: "/papers",
    label: "Find Resources",
    style: "bg-[var(--zass-primary)] text-white",
  },
];

export default function Navbar() {
  const { settings } = useSettings();
  const pathname = usePathname();

  return (
    <div>
      {settings.announcementOn && settings.announcementText.trim() !== "" && (
        <div className="bg-[var(--zass-primary)] text-white text-center text-sm py-2 px-4">
          {settings.announcementText}
        </div>
      )}
      <nav className="sticky top-0 z-40 bg-[var(--zass-card)] border-b border-[rgba(0,70,67,0.15)] px-5 md:px-10 py-2.5 flex items-center justify-between gap-4 shadow-[0_2px_12px_rgba(0,70,67,0.06)]">
        <Logo />
        <div className="hidden lg:flex gap-5 text-[15px] font-semibold text-[rgba(0,70,67,0.78)] items-center">
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
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {ACTIONS.map((a) => (
            <Link
              key={a.href + a.label}
              href={a.href}
              className={`${a.style} text-[13px] font-bold px-3.5 py-2 rounded-full whitespace-nowrap hover:opacity-90`}
            >
              {a.label}
            </Link>
          ))}
        </div>
      </nav>
      <div className="md:hidden bg-[var(--zass-card)] border-b border-[rgba(0,70,67,0.15)] px-5 py-2 flex gap-5 overflow-x-auto text-sm font-semibold text-[rgba(0,70,67,0.78)]">
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
        <Link href="/book-session" className="whitespace-nowrap">
          Book a 1-to-1 Session
        </Link>
        <Link href="/papers" className="whitespace-nowrap">
          Find Resources
        </Link>
      </div>
    </div>
  );
}
