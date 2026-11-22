"use client";

import { useSubjects } from "@/lib/store";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SubjectGroup from "@/components/SubjectGroup";

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
