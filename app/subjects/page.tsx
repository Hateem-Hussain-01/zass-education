"use client";

import Link from "next/link";
import { useSubjects } from "@/lib/store";
import type { Level } from "@/lib/types";
import PageHero from "@/components/PageHero";

function SubjectGroup({ level, subjects }: { level: Level; subjects: { id: string; name: string; code: string }[] }) {
  return (
    <section className="border-t-2 border-[rgba(0,70,67,0.12)] first:border-t-0 mt-10 first:mt-0 pt-10 first:pt-0">
      <h2 className="text-xl font-extrabold text-[#004643]">{level} Subjects</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {subjects.map((s) => (
          <Link
            key={s.id}
            href={`/papers?subject=${s.id}`}
            className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
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

export default function SubjectsPage() {
  const { subjects } = useSubjects();
  const oLevel = subjects.filter((s) => s.level === "O Level");
  const aLevel = subjects.filter((s) => s.level === "A Level");
  const both = subjects.filter((s) => s.level === "Both");

  return (
    <div>
      <PageHero
        eyebrow="Cambridge"
        title="Subjects"
        description="O & A Level subjects (Cambridge). Pick a subject to see its past papers, notes and courses. More subjects can be added from the admin portal."
        image="/images/1523240795612-9a054b0db644.jpg"
        imageAlt="Students studying together in a library"
      />
      <div className="px-5 md:px-14 py-10 max-w-6xl mx-auto">
        <SubjectGroup level="O Level" subjects={oLevel} />
        <SubjectGroup level="A Level" subjects={aLevel} />
        {both.length > 0 && (
          <SubjectGroup level="O Level" subjects={both} />
        )}
      </div>
    </div>
  );
}
