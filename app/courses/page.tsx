"use client";

import Link from "next/link";
import {
  downloadStoredFile,
  formatBytes,
  subjectName,
  useCourses,
  useNotes,
  useSubjects,
} from "@/lib/store";
import PageHero from "@/components/PageHero";

export default function CoursesPage() {
  const { courses } = useCourses();
  const { notes } = useNotes();
  const { subjects } = useSubjects();

  return (
    <div>
      <PageHero
        eyebrow="Learn"
        title="Courses & Notes"
        description="Revision courses and chapter notes for O & A Level subjects. New content is added from the admin portal."
        image="/images/1558655146-9f40138edfeb.jpg"
        imageAlt="Student working on a revision course"
      />
      <div className="px-5 md:px-14 py-10 max-w-6xl mx-auto">
        <h2 className="text-xl font-extrabold text-[#004643]">Courses</h2>
      {courses.length === 0 ? (
        <p className="text-sm text-[rgba(0,70,67,0.6)] mt-3">
          No courses yet — add them from the admin portal.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
          {courses.map((c) => (
            <article
              key={c.id}
              className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="relative h-[130px]">
                {c.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.image}
                    alt={c.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-[var(--zass-primary)]" />
                )}
                <span className="absolute left-3 bottom-3 bg-white/90 text-[var(--zass-primary)] text-[11px] font-extrabold px-2.5 py-1 rounded-full">
                  {c.level}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[#004643]">{c.title}</h3>
                  {c.sample && (
                    <span className="text-[11px] font-bold bg-[rgba(0,70,67,0.08)] text-[#004643] px-2 py-0.5 rounded-full shrink-0">
                      Sample
                    </span>
                  )}
                </div>
                <p className="text-sm text-[rgba(0,70,67,0.6)] mt-1">
                  {subjectName(subjects, c.subjectId)}
                </p>
                <p className="text-sm text-[rgba(0,70,67,0.78)] mt-2 leading-relaxed">
                  {c.description}
                </p>
                <div className="text-[15px] font-extrabold text-[var(--zass-primary)] mt-3">
                  {c.price === 0 ? "Free" : `Rs ${c.price.toLocaleString()}`}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <h2 className="text-xl font-extrabold text-[#004643] mt-12 border-t-2 border-[rgba(0,70,67,0.12)] pt-10">
        Notes &amp; Lessons
      </h2>
      {notes.length === 0 ? (
        <p className="text-sm text-[rgba(0,70,67,0.6)] mt-3">
          No notes yet — add them from the admin portal (Notes &amp; Lessons).
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {notes.map((n) => (
            <li
              key={n.id}
              className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-5"
            >
              <details>
                <summary className="cursor-pointer font-bold text-[#004643] list-none">
                  {n.title}{" "}
                  {n.sample && (
                    <span className="text-[11px] font-bold bg-[rgba(0,70,67,0.08)] text-[#004643] px-2 py-0.5 rounded-full align-middle">
                      Sample
                    </span>
                  )}
                  <span className="block text-sm font-normal text-[rgba(0,70,67,0.6)] mt-1">
                    {subjectName(subjects, n.subjectId)} · click to read
                  </span>
                </summary>
                <p className="text-sm text-[rgba(0,70,67,0.78)] mt-3 leading-relaxed whitespace-pre-wrap">
                  {n.body}
                </p>
                {n.fileId && n.fileName && (
                  <button
                    onClick={() =>
                      downloadStoredFile(n.fileId as string, n.fileName as string)
                    }
                    className="mt-3 bg-[var(--zass-primary)] text-white text-sm font-bold px-4 py-2 rounded-full"
                  >
                    Download {n.fileName} ({formatBytes(n.fileSize)})
                  </button>
                )}
              </details>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-10 text-sm text-[rgba(0,70,67,0.6)]">
        Looking for a past paper?{" "}
        <Link
          href="/papers"
          className="font-semibold text-[var(--zass-primary)] hover:underline"
        >
          Browse the past papers library →
        </Link>
      </p>
      </div>
    </div>
  );
}
