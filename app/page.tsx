"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCourses, useSettings, useSubjects } from "@/lib/store";
import { TEAM, initials } from "@/lib/types";

const FEATURED_SUBJECTS: { name: string; image: string }[] = [
  { name: "Mathematics", image: "/images/1524178232363-1fb2b075b655.jpg" },
  { name: "Physics", image: "/images/1519389950473-47ba0277781c.jpg" },
  { name: "Chemistry", image: "/images/1523240795612-9a054b0db644.jpg" },
  { name: "Biology", image: "/images/1571260899304-425eee4c7efc.jpg" },
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

export default function HomePage() {
  const { settings } = useSettings();
  const { subjects } = useSubjects();
  const { courses } = useCourses();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const codesFor = (name: string) =>
    subjects
      .filter((s) => s.name === name)
      .map((s) => s.code)
      .join(" · ");

  const headlineLines = settings.heroHeadline.split("\n");

  return (
    <div>
      {/* Hero — flat Cyprus, LearnMix layout */}
      <section className="bg-[var(--zass-primary)] text-white px-5 md:px-14 pt-6 pb-14">
        <div className="flex flex-col md:flex-row gap-10 items-center max-w-6xl mx-auto pt-6">
          <div className="flex-1">
            <span className="inline-block bg-white/15 border border-white/35 text-xs font-bold px-3.5 py-1.5 rounded-full">
              {settings.heroBadge}
            </span>
            <h1 className="text-4xl md:text-[42px] leading-tight font-extrabold mt-4">
              {headlineLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < headlineLines.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-white/85 max-w-lg">
              {settings.heroSubtext}
            </p>
            <form
              className="mt-6 flex bg-[var(--zass-card)] rounded-full p-1.5 pl-5 max-w-md items-center"
              onSubmit={(e) => {
                e.preventDefault();
                router.push(
                  query.trim()
                    ? `/papers?q=${encodeURIComponent(query.trim())}`
                    : "/papers",
                );
              }}
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={settings.heroSearchPlaceholder}
                className="border-none outline-none flex-1 text-sm text-[rgba(0,70,67,0.6)] bg-transparent min-w-0"
                aria-label="Search courses and papers"
              />
              <button
                type="submit"
                className="bg-[var(--zass-accent)] text-white px-5 py-2.5 rounded-full text-sm font-bold shrink-0"
              >
                {settings.heroCta}
              </button>
            </form>
          </div>
          <div className="relative flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/1522202176988-66273c2fd55f.jpg"
              alt="O & A Level students studying together"
              className="w-[300px] h-[360px] object-cover rounded-t-[200px] rounded-b-3xl shadow-[0_0_0_12px_rgba(255,255,255,0.14)]"
            />
            <div className="absolute left-[-30px] bottom-[90px] bg-[var(--zass-card)] text-[#004643] rounded-2xl shadow-xl px-4 py-3 text-[13px]">
              <b className="text-lg block">{settings.statsRating} ★</b>
              <span className="text-[rgba(0,70,67,0.6)]">
                Rated by students for
                <br />
                quality learning
              </span>
            </div>
            <div className="absolute right-[-14px] top-[60px] bg-[var(--zass-card)] text-[#004643] rounded-2xl shadow-xl px-4 py-3 text-[13px]">
              <b className="text-lg block">{settings.statsLearners}</b>
              <span className="text-[#004643]">★★★★★</span>
              <br />
              <span className="text-[rgba(0,70,67,0.6)]">
                Learners growing with
                <br />
                expert guidance
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="px-5 md:px-14 py-11 max-w-6xl mx-auto">
        <h2 className="text-center text-2xl md:text-[26px] font-extrabold text-[#004643]">
          Explore Our Top Subjects
        </h2>
        <p className="text-center text-[rgba(0,70,67,0.6)] text-sm mt-2">
          O &amp; A Level (Cambridge) — from Mathematics to Biology, notes and
          papers in one place.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
          {FEATURED_SUBJECTS.map((s) => (
            <Link
              key={s.name}
              href="/subjects"
              className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt={`${s.name} students`}
                className="h-[130px] w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-bold text-[#004643]">{s.name}</h3>
                <span className="text-[13px] text-[rgba(0,70,67,0.6)]">
                  Cambridge {codesFor(s.name) || "O & A Level"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="px-5 md:px-14 py-4 max-w-6xl mx-auto">
        <h2 className="text-center text-2xl md:text-[26px] font-extrabold text-[#004643]">
          Explore Most Popular Courses
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
          {courses.slice(0, 4).map((c) => (
            <Link
              key={c.id}
              href="/courses"
              className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-[110px]">
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
              <div className="p-3.5">
                <h3 className="text-sm font-bold leading-snug text-[#004643]">
                  {c.title}
                </h3>
                <div className="text-xs text-[rgba(0,70,67,0.6)] mt-1.5">{c.level}</div>
                <div className="text-[15px] font-extrabold text-[var(--zass-primary)] mt-2">
                  {c.price === 0 ? "Free" : `Rs ${c.price.toLocaleString()}`}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/courses"
            className="inline-block bg-[var(--zass-primary)] text-white font-bold text-sm px-6 py-2.5 rounded-full"
          >
            View all courses &amp; notes
          </Link>
        </div>
      </section>

      {/* Why Zass */}
      <section className="px-5 md:px-14 py-11 max-w-6xl mx-auto">
        <h2 className="text-center text-2xl md:text-[26px] font-extrabold text-[#004643]">
          Why Zass Education
        </h2>
        <div className="grid sm:grid-cols-3 gap-5 mt-7">
          {WHY_ZASS.map((f) => (
            <div
              key={f.title}
              className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-5 shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--zass-primary)] text-white flex items-center justify-center text-xl font-bold">
                {f.glyph}
              </div>
              <h3 className="font-bold text-[#004643] mt-3">{f.title}</h3>
              <p className="text-sm text-[rgba(0,70,67,0.6)] mt-1.5 leading-relaxed">
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
        <h2 className="text-center text-2xl md:text-[26px] font-extrabold text-[#004643]">
          Meet the Team
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-7">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-5 text-center shadow-sm"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-[var(--zass-primary)] text-white flex items-center justify-center text-lg font-extrabold">
                {initials(m.name)}
              </div>
              <h3 className="font-bold text-[#004643] mt-3 text-sm">
                {m.name}
              </h3>
              <span className="text-xs text-[rgba(0,70,67,0.6)]">Team Member</span>
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
