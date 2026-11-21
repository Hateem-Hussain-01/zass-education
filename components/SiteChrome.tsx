"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

/** Public chrome (navbar + footer). Admin routes get their own portal shell.
 *  The home page renders the Design 1 panel with its own in-panel nav, so
 *  the global navbar is hidden on "/" (the footer still shows). */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return <>{children}</>;
  }
  if (pathname === "/") {
    return (
      <>
        <main className="flex-1">{children}</main>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
