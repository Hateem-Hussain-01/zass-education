import Link from "next/link";
import { notFound } from "next/navigation";
import { BOARDS, boardBySlug } from "@/lib/boards";
import { CATALOGUE_PAPERS } from "@/lib/papers-catalogue";
import { SEED_SUBJECTS } from "@/lib/types";
import PageHero from "@/components/PageHero";

export function generateStaticParams() {
  return BOARDS.map((b) => ({ slug: b.slug }));
}

export default async function BoardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const board = boardBySlug(slug);
  if (!board) notFound();

  const papers = CATALOGUE_PAPERS.filter((p) => p.board === board.name);
  const isCambridge = board.slug === "cambridge-international";

  // Subjects for this board: Cambridge lists the real syllabus catalogue;
  // other boards list only subjects that actually have papers so far.
  const subjects = isCambridge
    ? SEED_SUBJECTS.map((s) => ({
        ...s,
        count: papers.filter((p) => p.subjectId === s.id).length,
      }))
    : [];

  const latest = [...papers]
    .sort((a, b) => b.year - a.year || b.createdAt - a.createdAt)
    .slice(0, 10);

  return (
    <div>
      <PageHero
        eyebrow="Examination Board"
        title={board.name}
        description={board.description}
        image="/images/1571260899304-425eee4c7efc.jpg"
        imageAlt="Graduation caps in the air"
      />
      <div className="px-5 md:px-14 py-10 max-w-6xl mx-auto">
        <Link
          href="/boards"
          className="text-sm font-bold text-[#004643] hover:underline"
        >
          ← All examination boards
        </Link>
        <p className="text-sm font-bold text-[#004643] mt-4">
          {papers.length > 0
            ? `${papers.length} paper${papers.length === 1 ? "" : "s"} available`
            : "Coming soon — no papers added yet"}
        </p>

      {papers.length > 0 && (
        <Link
          href={`/papers?board=${encodeURIComponent(board.name)}`}
          className="inline-block mt-4 bg-[var(--zass-primary)] text-white text-sm font-bold px-5 py-2.5 rounded-full"
        >
          Browse all {board.name} papers →
        </Link>
      )}

      <h2 className="text-xl font-extrabold text-[#004643] mt-10 border-t-2 border-[rgba(0,70,67,0.12)] pt-10">Subjects</h2>
      {subjects.length === 0 ? (
        <p className="text-sm text-[rgba(0,70,67,0.6)] mt-3">
          Subjects coming soon — papers for this board have not been added
          yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-3 mt-4">
          {subjects.map((s) => (
            <div
              key={s.id}
              className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-5 flex items-center justify-between gap-3"
            >
              <div>
                <h3 className="font-bold text-[#004643]">
                  {s.name} ({s.code})
                </h3>
                <p className="text-sm text-[rgba(0,70,67,0.6)]">{s.level}</p>
              </div>
              <span className="text-sm font-bold text-[#004643] shrink-0">
                {s.count > 0
                  ? `${s.count} papers`
                  : "No papers yet"}
              </span>
            </div>
          ))}
        </div>
      )}

      {latest.length > 0 && (
        <>
          <h2 className="text-xl font-extrabold text-[#004643] mt-10 border-t-2 border-[rgba(0,70,67,0.12)] pt-10">
            Latest papers
          </h2>
          <ul className="mt-4 space-y-3">
            {latest.map((p) => (
              <li
                key={p.id}
                className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#004643]">{p.title}</h3>
                  <p className="text-sm text-[rgba(0,70,67,0.6)] mt-1">
                    {p.session} {p.year} · {p.paperNo}
                    {p.source ? ` · Source: ${p.source}` : ""}
                  </p>
                </div>
                {p.downloadUrl && (
                  <a
                    href={p.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[var(--zass-primary)] text-white text-sm font-bold px-5 py-2.5 rounded-full shrink-0 text-center"
                  >
                    Download PDF
                  </a>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
      </div>
    </div>
  );
}
