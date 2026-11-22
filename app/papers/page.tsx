"use client";

import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import PapersCatalogue from "@/components/PapersCatalogue";

export default function PapersPage() {
  return (
    <div>
      <PageHero
        eyebrow="1,654 papers · 2021-2025"
        title="Past Papers"
        description="Past papers by board, subject, year and session. Catalogue papers download directly from the public archive; files uploaded in the admin portal can be downloaded here - in the same browser they were uploaded from (v1 stores files locally). Papers are copyright of their examination boards and are shared here for students' revision use."
        image="/images/purdue/1.jpg"
        imageAlt="Students working on laptops"
      />
      <Suspense
        fallback={
          <div className="px-5 md:px-14 py-10 max-w-6xl mx-auto">
            <p className="text-[rgba(0,70,67,0.6)]">Loading past papers...</p>
          </div>
        }
      >
        <PapersCatalogue />
      </Suspense>
    </div>
  );
}
