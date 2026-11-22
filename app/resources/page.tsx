"use client";

import { Suspense } from "react";
import { useSubjects } from "@/lib/store";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SubjectGroup from "@/components/SubjectGroup";
import PapersCatalogue from "@/components/PapersCatalogue";

/**
 * Resources: subjects and past papers on one page.
 * The old /subjects and /papers pages stay live - this page reuses
 * their exact sections (same cards, same filters, same downloads).
 */
export default function ResourcesPage() {
  const { subjects } = useSubjects();
  const oLevel = subjects.filter((s) => s.level === "O Level");
  const aLevel = subjects.filter((s) => s.level === "A Level");
  const both = subjects.filter((s) => s.level === "Both");

  return (
    <div>
      <PageHero
        eyebrow="Subjects & Past Papers"
        title="Resources"
        description="O & A Level subjects (Cambridge) and the past papers library, in one place. Pick a subject to jump to its papers, or search and filter the full library below."
        image="/images/purdue/c1.png"
        imageAlt="Students studying together in a library"
        cta={{ href: "#papers", label: "Browse past papers" }}
      />
      <section className="bg-[var(--zass-card)] border-t-2 border-[rgba(0,70,67,0.12)] px-5 md:px-14 py-11">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SubjectGroup level="O Level" subjects={oLevel} papersBase="/resources" />
          </Reveal>
        </div>
      </section>
      <section className="bg-[var(--zass-base)] border-t-2 border-[rgba(0,70,67,0.12)] px-5 md:px-14 py-11">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SubjectGroup level="A Level" subjects={aLevel} papersBase="/resources" />
          </Reveal>
        </div>
      </section>
      {both.length > 0 && (
        <section className="bg-[var(--zass-card)] border-t-2 border-[rgba(0,70,67,0.12)] px-5 md:px-14 py-11">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SubjectGroup level="O Level" subjects={both} papersBase="/resources" />
            </Reveal>
          </div>
        </section>
      )}
      <Suspense
        fallback={
          <div className="px-5 md:px-14 py-10 max-w-6xl mx-auto">
            <p className="text-[rgba(0,70,67,0.6)]">Loading past papers...</p>
          </div>
        }
      >
        <PapersCatalogue id="papers" />
      </Suspense>
    </div>
  );
}
