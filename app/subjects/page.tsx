"use client";

import Link from "next/link";
import { useSubjects } from "@/lib/store";
import type { Level } from "@/lib/types";

function SubjectGroup({ level, subjects }: { level: Level; subjects: { id: string; name: string; code: string }[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-extrabold text-[#0F172A]">{level} Subjects</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {subjects.map((s) => (
          <Link
            key={s.id}
            href={`/papers?subject=${s.id}`}
            className="bg-[var(--zass-card)] border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-bold text-[#0F172A]">{s.name}</h3>
              <span className="text-xs font-bold bg-white border border-slate-200 rounded-full px-2.5 py-1 text-slate-500 shrink-0">
                {s.code}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-2">
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

export default function SubjectsPage() {
  const { subjects } = useSubjects();
  const oLevel = subjects.filter((s) => s.level === "O Level");
  const aLevel = subjects.filter((s) => s.level === "A Level");
  const both = subjects.filter((s) => s.level === "Both");

  return (
    <div className="px-5 md:px-14 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-[#0F172A]">Subjects</h1>
      <p className="text-slate-500 mt-2 max-w-2xl">
        O &amp; A Level subjects (Cambridge). Pick a subject to see its past
        papers, notes and courses. More subjects can be added from the admin
        portal.
      </p>
      <SubjectGroup level="O Level" subjects={oLevel} />
      <SubjectGroup level="A Level" subjects={aLevel} />
      {both.length > 0 && (
        <SubjectGroup level="O Level" subjects={both} />
      )}
    </div>
  );
}
