"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import Logo from "@/components/Logo";
import {
  isAdminAuthed,
  loadAdminSetup,
  setAdminAuthed,
} from "../../lib/store";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/papers", label: "Past Papers" },
  { href: "/admin/subjects", label: "Subjects" },
  { href: "/admin/notes", label: "Notes & Lessons" },
  { href: "/admin/courses", label: "Courses" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/settings", label: "Settings" },
];

function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [adminName, setAdminName] = useState("");

  const isPublic = pathname === "/admin/setup" || pathname === "/admin/signin";

  // Auth guard reads localStorage (browser-only) after mount.
  useEffect(() => {
    if (isPublic) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- auth-guard state after localStorage read (see above)
      setChecked(true);
      return;
    }
    const setup = loadAdminSetup();
    if (!setup) {
      router.replace("/admin/setup");
      return;
    }
    if (!isAdminAuthed()) {
      router.replace("/admin/signin");
      return;
    }
    setAdminName(setup.name);
    setChecked(true);
  }, [pathname, isPublic, router]);

  if (isPublic) {
    return (
      <div className="min-h-screen bg-[var(--zass-base)] text-[rgba(0,70,67,0.78)]">
        <main className="mx-auto w-full max-w-lg px-4 py-10">{children}</main>
      </div>
    );
  }

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--zass-base)]">
        <p className="text-sm text-[rgba(0,70,67,0.78)]">Loading admin portal…</p>
      </div>
    );
  }

  const signOut = () => {
    setAdminAuthed(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[var(--zass-base)] text-[rgba(0,70,67,0.78)] md:flex">
      {/* Sidebar (desktop) / top bar (mobile) */}
      <aside className="bg-[var(--zass-primary)] text-white md:flex md:w-64 md:shrink-0 md:flex-col md:min-h-screen">
        <div className="flex items-center justify-between px-4 py-4 md:block md:px-5 md:py-6">
          <Logo tone="white" compact />
          <p className="mt-2 hidden text-[11px] font-bold uppercase tracking-[0.22em] text-white/70 md:block">
            Admin Portal
          </p>
          <Link
            href="/"
            className="rounded-full border border-white/40 px-2.5 py-1 text-xs font-medium hover:bg-white/10 md:hidden"
          >
            View site
          </Link>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:gap-1 md:overflow-visible md:px-3 md:pb-4">
          {NAV.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium ${
                  active
                    ? "bg-white text-[var(--zass-primary)]"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto hidden border-t border-white/20 px-5 py-4 md:block">
          <p className="text-sm font-semibold text-white">
            {adminName || "Admin"}
          </p>
          <div className="mt-2 flex gap-3 text-xs">
            <Link href="/" className="text-white/85 underline hover:text-white">
              View site
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="text-white/85 underline hover:text-white"
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Right column: persistent header + page content. The header stays
          visible on every admin tab, including while scrolling. */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b-2 border-[rgba(0,70,67,0.12)] bg-[var(--zass-card)] px-4 py-3 shadow-sm sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="shrink-0 text-base font-extrabold text-[#004643]">
              Zass Admin Portal
            </span>
            <span className="truncate text-sm">
              Signed in as{" "}
              <strong className="text-[#004643]">{adminName || "Admin"}</strong>
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/"
              className="rounded-full border-2 border-[var(--zass-primary)] px-3.5 py-1.5 text-[13px] font-bold text-[var(--zass-primary)]"
            >
              View Site
            </Link>
            <span
              aria-hidden="true"
              className="h-5 w-px bg-[rgba(0,70,67,0.25)]"
            />
            <button
              type="button"
              onClick={signOut}
              className="rounded-full bg-[var(--zass-primary)] px-3.5 py-1.5 text-[13px] font-bold text-white"
            >
              Sign Out
            </button>
          </div>
        </header>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  // SettingsProvider already wraps the whole app in the root layout.
  return <AdminShell>{children}</AdminShell>;
}
