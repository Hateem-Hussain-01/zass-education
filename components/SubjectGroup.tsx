"use client";

import Link from "next/link";
import type { Level } from "@/lib/types";

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="text-center">
      <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[rgba(0,70,67,0.6)]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-extrabold text-[#004643] md:text-[28px]">
        {title}
      </h2>
    </div>
  );
}

/**
 * One level's subject cards. Shared by /subjects and /resources.
 * papersBase is where a card's "View past papers" link goes:
 * "/papers" on the Subjects page, "/resources" on the Resources page
 * (so the filter opens on the same page, in the papers section).
 */
export default function SubjectGroup({
  level,
  subjects,
  papersBase = "/papers",
}: {
  level: Level;
  subjects: { id: string; name: string; code: string }[];
  papersBase?: string;
}) {
  return (
    <section>
      <SectionHeading eyebrow="Cambridge" title={`${level} Subjects`} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
        {subjects.map((s) => (
          <Link
            key={s.id}
            href={
              papersBase === "/resources"
                ? `${papersBase}?subject=${s.id}#papers`
                : `${papersBase}?subject=${s.id}`
            }
            className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-bold text-[#004643]">{s.name}</h3>
              <span className="text-xs font-bold bg-white border border-[rgba(0,70,67,0.15)] rounded-full px-2.5 py-1 text-[rgba(0,70,67,0.6)] shrink-0">
                {s.code}
              </span>
            </div>
            <p className="text-sm text-[rgba(0,70,67,0.6)] mt-2">
              Cambridge {level} · syllabus {s.code}
            </p>
            <span className="inline-block mt-3 text-sm font-semibold text-[var(--zass-primary)]">
              View past papers →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
