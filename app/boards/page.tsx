import Link from "next/link";
import { BOARDS } from "@/lib/boards";
import { CATALOGUE_PAPERS } from "@/lib/papers-catalogue";

export const metadata = {
  title: "Examination Boards — Zass Education",
  description:
    "Past papers by examination board: Cambridge International, AQA GCSE, OxfordAQA, Oxford Education and IB Diploma Programme.",
};

export default function BoardsPage() {
  return (
    <div className="px-5 md:px-14 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-[#004643]">
        Examination Boards
      </h1>
      <p className="text-[rgba(0,70,67,0.6)] mt-2 max-w-2xl">
        Past papers, mark schemes and grade thresholds by examination board.
        Counts shown are real — a board with no papers yet is marked coming
        soon.
      </p>
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        {BOARDS.map((b) => {
          const count = CATALOGUE_PAPERS.filter(
            (p) => p.board === b.name,
          ).length;
          return (
            <Link
              key={b.slug}
              href={`/boards/${b.slug}`}
              className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-6 hover:border-[var(--zass-primary)] block"
            >
              <h2 className="font-bold text-lg text-[#004643]">{b.name}</h2>
              <p className="text-sm text-[rgba(0,70,67,0.6)] mt-2">
                {b.description}
              </p>
              <p className="text-sm font-bold text-[#004643] mt-4">
                {count > 0
                  ? `${count} paper${count === 1 ? "" : "s"} available`
                  : "Coming soon — no papers added yet"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
