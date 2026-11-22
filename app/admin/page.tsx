"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  formatBytes,
  subjectName,
  totalStoredBytes,
  useBookings,
  useCourses,
  useNotes,
  usePapers,
  useSubjects,
} from "../../lib/store";
import { Card, SampleBadge } from "./ui";

export default function AdminDashboard() {
  const { subjects } = useSubjects();
  const { papers } = usePapers();
  const { notes } = useNotes();
  const { courses } = useCourses();
  const { bookings } = useBookings();
  const [storedBytes, setStoredBytes] = useState<number | null>(null);

  useEffect(() => {
    let live = true;
    totalStoredBytes().then((n) => {
      if (live) setStoredBytes(n);
    });
    return () => {
      live = false;
    };
  }, []);

  const recentPapers = [...papers]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  const stats = [
    { label: "Subjects", value: subjects.length, href: "/admin/subjects" },
    { label: "Past Papers", value: papers.length, href: "/admin/papers" },
    { label: "Notes & Lessons", value: notes.length, href: "/admin/notes" },
    { label: "Courses", value: courses.length, href: "/admin/courses" },
    {
      label: "Bookings",
      value: bookings.filter((b) => b.status === "new").length,
      href: "/admin/bookings",
    },
    {
      label: "Total file size",
      value: storedBytes === null ? "…" : formatBytes(storedBytes),
      href: "/admin/papers",
    },
  ];

  const quickActions = [
    { label: "Upload paper", href: "/admin/papers" },
    { label: "Add subject", href: "/admin/subjects" },
    { label: "Add note", href: "/admin/notes" },
    { label: "View bookings", href: "/admin/bookings" },
    { label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[rgba(0,70,67,0.6)]">
          Admin Portal
        </p>
        <h1 className="mt-1 text-2xl font-extrabold text-[#004643] md:text-[28px]">Dashboard</h1>
        <p className="mt-1 text-sm text-[rgba(0,70,67,0.6)]">
          Manage past papers, subjects, notes, courses and site settings.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-6">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-[rgba(0,70,67,0.15)] bg-[var(--zass-card)] p-4 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[var(--zass-primary)] transition-all"
          >
            <p className="text-2xl font-extrabold text-[#004643]">{s.value}</p>
            <p className="mt-1 text-sm text-[rgba(0,70,67,0.6)]">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card
            title="Recent past papers"
            actions={
              <Link
                href="/admin/papers"
                className="text-sm font-medium text-[var(--zass-primary)] underline"
              >
                View all
              </Link>
            }
          >
            {recentPapers.length === 0 ? (
              <p className="text-sm">No past papers yet.</p>
            ) : (
              <ul className="divide-y divide-[rgba(0,70,67,0.15)]">
                {recentPapers.map((p) => (
                  <li key={p.id} className="flex flex-wrap items-center gap-2 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#004643]">
                        {p.title}
                      </p>
                      <p className="text-xs">
                        {subjectName(subjects, p.subjectId)} · {p.board} ·{" "}
                        {p.session} {p.year} · {p.paperNo}
                      </p>
                    </div>
                    {p.sample ? <SampleBadge /> : null}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <Card title="Quick actions">
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {quickActions.map((a) => (
              <Link
                key={a.href + a.label}
                href={a.href}
                className="rounded-full bg-[var(--zass-primary)] px-4 py-2.5 text-center text-sm font-bold text-white hover:opacity-90"
              >
                {a.label}
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <div className="rounded-2xl border border-[rgba(0,70,67,0.15)] bg-[var(--zass-card)] px-5 py-4 text-sm text-[#004643] shadow-sm">
        <strong>Note:</strong> v1 stores data in this browser only
        (localStorage + IndexedDB). A shared backend is the next step — data
        does not sync to other devices yet.
      </div>
    </div>
  );
}
