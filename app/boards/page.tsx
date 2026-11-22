import Link from "next/link";
import { BOARDS } from "@/lib/boards";
import { CATALOGUE_PAPERS } from "@/lib/papers-catalogue";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Examination Boards - Zass Education",
  description:
    "Past papers by examination board: Cambridge International, AQA GCSE, OxfordAQA, Oxford Education and IB Diploma Programme.",
};

export default function BoardsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Five boards"
        title="Examination Boards"
        description="Past papers, mark schemes and grade thresholds by examination board. Counts shown are real - a board with no papers yet is marked coming soon."
        image="/images/purdue/2.jpg"
        imageAlt="Graduation caps in the air"
      />
      <section className="bg-[var(--zass-card)] border-t-2 border-[rgba(0,70,67,0.12)] px-5 md:px-14 py-11">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[rgba(0,70,67,0.6)]">
                Examination Boards
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-[#004643] md:text-[28px]">
                Browse by Board
              </h2>
              <p className="mt-2 text-sm text-[rgba(0,70,67,0.6)] max-w-2xl mx-auto">
                Pick a board to see its subjects and papers.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5 mt-7">
              {BOARDS.map((b) => {
                const count = CATALOGUE_PAPERS.filter(
                  (p) => p.board === b.name,
                ).length;
                return (
                  <Link
                    key={b.slug}
                    href={`/boards/${b.slug}`}
                    className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[var(--zass-primary)] transition-all block"
                  >
                    <h2 className="font-bold text-lg text-[#004643]">{b.name}</h2>
                    <p className="text-sm text-[rgba(0,70,67,0.6)] mt-2">
                      {b.description}
                    </p>
                    <p className="text-sm font-bold text-[#004643] mt-4">
                      {count > 0
                        ? `${count} paper${count === 1 ? "" : "s"} available`
                        : "Coming soon - no papers added yet"}
                    </p>
                    <span className="inline-block mt-3 text-sm font-semibold text-[var(--zass-primary)]">
                      View board →
                    </span>
                  </Link>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
