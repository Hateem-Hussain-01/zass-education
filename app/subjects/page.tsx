"use client";

import Link from "next/link";
import { useSubjects } from "@/lib/store";
import type { Level } from "@/lib/types";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

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

function SubjectGroup({ level, subjects }: { level: Level; subjects: { id: string; name: string; code: string }[] }) {
  return (
    <section>
      <SectionHeading eyebrow="Cambridge" title={`${level} Subjects`} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
        {subjects.map((s) => (
          <Link
            key={s.id}
            href={`/papers?subject=${s.id}`}
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
        image="/images/purdue/c1.png"
        imageAlt="Students studying together in a library"
        cta={{ href: "/papers", label: "Browse past papers" }}
      />
      <section className="bg-[var(--zass-card)] border-t-2 border-[rgba(0,70,67,0.12)] px-5 md:px-14 py-11">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SubjectGroup level="O Level" subjects={oLevel} />
          </Reveal>
        </div>
      </section>
      <section className="bg-[var(--zass-base)] border-t-2 border-[rgba(0,70,67,0.12)] px-5 md:px-14 py-11">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SubjectGroup level="A Level" subjects={aLevel} />
          </Reveal>
        </div>
      </section>
      {both.length > 0 && (
        <section className="bg-[var(--zass-card)] border-t-2 border-[rgba(0,70,67,0.12)] px-5 md:px-14 py-11">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SubjectGroup level="O Level" subjects={both} />
            </Reveal>
          </div>
        </section>
      )}
    </div>
  );
}
