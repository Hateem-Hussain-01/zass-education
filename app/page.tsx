"use client";

import Link from "next/link";
import { useCourses, useSettings, useSubjects } from "@/lib/store";
import { TEAM, initials } from "@/lib/types";

const FEATURED_SUBJECTS: { name: string; image: string }[] = [
  { name: "Mathematics", image: "/images/1524178232363-1fb2b075b655.jpg" },
  { name: "Physics", image: "/images/1519389950473-47ba0277781c.jpg" },
  { name: "Chemistry", image: "/images/1523240795612-9a054b0db644.jpg" },
  { name: "Biology", image: "/images/1571260899304-425eee4c7efc.jpg" },
];

/** Placeholder review counts from the approved Design 1 preview — replace
 *  with real counts when available. */
const POPULAR_REVIEWS = [25, 27, 23];

const JOINED_AVATARS = [
  "/images/1494790108377-be9c29b29330.jpg",
  "/images/1507003211169-0a1dd7228f2d.jpg",
  "/images/1500648767791-00dcc994a43e.jpg",
];

const PANEL_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/courses", label: "Course" },
  { href: "/courses", label: "Pricing" },
];

const WHY_ZASS = [
  {
    glyph: "▤",
    title: "Past Papers",
    text: "Past papers organised by subject, year and session — download and practise.",
  },
  {
    glyph: "✎",
    title: "Notes & Lessons",
    text: "Clear chapter notes for O & A Level, written in simple language.",
  },
  {
    glyph: "✓",
    title: "Revision Courses",
    text: "Structured revision courses for the subjects that matter most.",
  },
];

/** Renders one headline line, circling the word "success" (Design 1). */
function HeadlineLine({ line }: { line: string }) {
  const parts = line.split(/(\bsuccess\b)/i);
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === "success" ? (
          <span
            key={i}
            className="border-[3px] border-[var(--zass-primary)] rounded-full px-3 whitespace-nowrap"
          >
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export default function HomePage() {
  const { settings } = useSettings();
  const { subjects } = useSubjects();
  const { courses } = useCourses();

  const codesFor = (name: string) =>
    subjects
      .filter((s) => s.name === name)
      .map((s) => s.code)
      .join(" · ");

  const headlineLines = settings.heroHeadline.split("\n");
  const popular = courses.slice(0, 3);

  const subjectFor = (subjectId: string) =>
    subjects.find((s) => s.id === subjectId);

  return (
    <div>
      {/* Design 1 (Global Academy) — Cyprus outer, Sand Dune panel */}
      <section
        className="px-4 md:px-10 py-6 md:py-8"
        style={{
          background:
            "linear-gradient(135deg, #004643 0%, var(--zass-primary) 60%, #00604F 100%)",
        }}
      >
        <div className="bg-[var(--zass-base)] rounded-[28px] shadow-[0_24px_60px_rgba(0,0,0,0.35)] px-6 md:px-14 pt-6 pb-10 max-w-6xl mx-auto">
          {/* In-panel nav */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="w-11 h-11 rounded-full bg-[var(--zass-primary)] text-white flex items-center justify-center font-extrabold text-[22px]">
                Z
              </span>
              <span className="font-extrabold text-[15px] tracking-wide text-[var(--zass-primary)] leading-tight">
                ZASS
                <span className="block text-[11px] tracking-[3px] text-slate-500 font-bold">
                  EDUCATION
                </span>
              </span>
            </Link>
            <div className="flex-1" />
            <div className="flex gap-6 text-[15px] font-bold text-[#0F172A] order-3 w-full md:order-none md:w-auto">
              {PANEL_LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="hover:text-[var(--zass-primary)]"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              className="bg-[var(--zass-accent)] text-white text-[15px] font-extrabold px-5 py-2.5 rounded-[10px]"
            >
              Sign up
            </Link>
          </nav>

          {/* Hero */}
          <div className="flex flex-col md:flex-row gap-10 items-center mt-10">
            <div className="flex-1">
              <span className="inline-block bg-[var(--zass-primary)]/10 border border-[var(--zass-primary)]/30 text-[var(--zass-primary)] text-xs font-bold px-3.5 py-1.5 rounded-full">
                {settings.heroBadge}
              </span>
              <h1 className="text-4xl md:text-[52px] leading-[1.12] font-extrabold mt-5 text-[#0F172A]">
                {headlineLines.map((line, i) => (
                  <span key={i} className="block">
                    <HeadlineLine line={line} />
                  </span>
                ))}
              </h1>
              <p className="mt-5 text-[16px] leading-relaxed text-slate-500 max-w-md">
                {settings.heroSubtext}
              </p>
              <div className="mt-7 flex flex-wrap gap-3.5">
                <Link
                  href="/courses"
                  className="bg-[var(--zass-primary)] text-white font-extrabold text-[15px] px-6 py-3 rounded-[10px]"
                >
                  Enroll now
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-[var(--zass-primary)] text-[var(--zass-primary)] font-extrabold text-[15px] px-6 py-3 rounded-[10px]"
                >
                  Apply Online →
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center shrink-0">
              <span
                aria-hidden
                className="absolute top-1 right-1 w-11 h-11 rounded-full border-[3px] border-[var(--zass-primary)] opacity-50"
              />
              <span
                aria-hidden
                className="absolute top-[74px] left-[-6px] text-[var(--zass-accent)] text-3xl font-extrabold"
              >
                +
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/1523240795612-9a054b0db644.jpg"
                alt="O & A Level students studying together"
                className="w-[300px] h-[300px] md:w-[330px] md:h-[330px] object-cover rounded-full shadow-[0_0_0_14px_#FAF7F0,0_0_0_28px_rgba(0,70,67,0.10)]"
              />
              <div className="absolute left-[-6px] bottom-[34px] bg-white rounded-2xl shadow-xl px-4 py-3 text-[13px] text-[#0F172A]">
                <b className="font-extrabold">
                  {settings.statsLearners} students joined
                </b>
                <div className="flex my-2">
                  {JOINED_AVATARS.map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      src={src}
                      alt=""
                      className={`w-[30px] h-[30px] rounded-full border-2 border-white object-cover ${i > 0 ? "-ml-2" : ""}`}
                    />
                  ))}
                  <span className="w-[30px] h-[30px] rounded-full border-2 border-white bg-[var(--zass-accent)] text-white flex items-center justify-center text-[13px] font-extrabold -ml-2">
                    +
                  </span>
                </div>
                <span className="text-slate-500 font-semibold text-xs">
                  learning with us this month
                </span>
              </div>
              <span
                aria-hidden
                className="absolute right-0 top-[190px] w-[52px] h-[52px] rounded-full opacity-80"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, var(--zass-primary) 0 4px, transparent 4px 10px)",
                }}
              />
            </div>
          </div>

          {/* Most popular courses (inside the panel) */}
          <div className="mt-14">
            <h2 className="text-2xl font-extrabold text-[#0F172A]">
              Most popular courses{" "}
              <span className="text-[var(--zass-accent)]">★</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-5 mt-5 items-stretch">
              {popular.map((c, i) => {
                const s = subjectFor(c.subjectId);
                return (
                  <Link
                    key={c.id}
                    href="/courses"
                    className="flex-1 bg-white rounded-2xl overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:shadow-md transition-shadow"
                  >
                    <div className="h-[130px]">
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
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-[#0F172A] text-[16px]">
                        {s ? `${s.name} ${s.code} course` : c.title}
                      </h3>
                      <p className="text-[13px] text-slate-400 mt-1.5">
                        <span className="text-[var(--zass-accent)]">
                          ★★★★★
                        </span>{" "}
                        ({POPULAR_REVIEWS[i] ?? 25} reviews)
                      </p>
                    </div>
                  </Link>
                );
              })}
              <Link
                href="/courses"
                className="flex flex-col items-center justify-center gap-3 min-w-[140px] py-4"
              >
                <span className="w-[74px] h-[74px] rounded-full bg-[var(--zass-primary)] text-white flex items-center justify-center text-2xl">
                  →
                </span>
                <span className="font-extrabold text-[#0F172A] text-[15px]">
                  Browse all
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="px-5 md:px-14 py-11 max-w-6xl mx-auto">
        <h2 className="text-center text-2xl md:text-[26px] font-extrabold text-[#0F172A]">
          Explore Our Top Subjects
        </h2>
        <p className="text-center text-slate-500 text-sm mt-2">
          O &amp; A Level (Cambridge) — from Mathematics to Biology, notes and
          papers in one place.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
          {FEATURED_SUBJECTS.map((s) => (
            <Link
              key={s.name}
              href="/subjects"
              className="bg-[var(--zass-card)] border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt={`${s.name} students`}
                className="h-[130px] w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-bold text-[#0F172A]">{s.name}</h3>
                <span className="text-[13px] text-slate-500">
                  Cambridge {codesFor(s.name) || "O & A Level"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Zass */}
      <section className="px-5 md:px-14 py-11 max-w-6xl mx-auto">
        <h2 className="text-center text-2xl md:text-[26px] font-extrabold text-[#0F172A]">
          Why Zass Education
        </h2>
        <div className="grid sm:grid-cols-3 gap-5 mt-7">
          {WHY_ZASS.map((f) => (
            <div
              key={f.title}
              className="bg-[var(--zass-card)] border border-slate-200 rounded-2xl p-5 shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--zass-primary)] text-white flex items-center justify-center text-xl font-bold">
                {f.glyph}
              </div>
              <h3 className="font-bold text-[#0F172A] mt-3">{f.title}</h3>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                {f.text}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/papers"
            className="inline-block border-2 border-[var(--zass-primary)] text-[var(--zass-primary)] font-bold text-sm px-6 py-2.5 rounded-full"
          >
            Browse past papers
          </Link>
        </div>
      </section>

      {/* Team strip */}
      <section className="px-5 md:px-14 pb-12 max-w-6xl mx-auto">
        <h2 className="text-center text-2xl md:text-[26px] font-extrabold text-[#0F172A]">
          Meet the Team
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-7">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className="bg-[var(--zass-card)] border border-slate-200 rounded-2xl p-5 text-center shadow-sm"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-[var(--zass-primary)] text-white flex items-center justify-center text-lg font-extrabold">
                {initials(m.name)}
              </div>
              <h3 className="font-bold text-[#0F172A] mt-3 text-sm">
                {m.name}
              </h3>
              <span className="text-xs text-slate-500">Team Member</span>
            </div>
          ))}
        </div>
        <p className="text-center mt-5">
          <Link
            href="/about"
            className="text-sm font-semibold text-[var(--zass-primary)] hover:underline"
          >
            More about Zass Education →
          </Link>
        </p>
      </section>
    </div>
  );
}
