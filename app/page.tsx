"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCourses, useNotes, useSettings, useSubjects } from "@/lib/store";
import { TEAM } from "@/lib/types";
import { BOARDS } from "@/lib/boards";
import { CATALOGUE_PAPERS } from "@/lib/papers-catalogue";
import Reveal from "@/components/Reveal";
import Icon, { type IconName } from "@/components/icons";

/* ------------------------------------------------------------------ */
/* Count-up number for the stats strip (respects reduced motion).       */
/* ------------------------------------------------------------------ */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reduced-motion: show final value (see above)
      setVal(to);
      return;
    }
    const startCount = () => {
      const start = performance.now();
      const dur = 1200;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    // Already in view on load - count immediately instead of waiting
    // for a scroll event that will never come.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startCount();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        startCount();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Purdue section heading: small eyebrow + big bold title.              */
/* ------------------------------------------------------------------ */
function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="text-center">
      <p className="text-sm font-bold uppercase tracking-wider text-[var(--zass-primary)]">
        {eyebrow}
      </p>
      <h2 className="mx-auto mt-2 max-w-xl text-3xl font-extrabold leading-tight text-[#004643] md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

const BAND_DIVIDER = "border-t-2 border-[rgba(0,70,67,0.12)]";

/* 8 most popular real Cambridge subjects. Paper counts are the real
   catalogue counts; subjects with no papers yet say so honestly. */
const CATEGORIES: {
  name: string;
  code: string;
  subjectId: string;
  level: string;
  papers: number | null;
}[] = [
  { name: "Mathematics", code: "9709", subjectId: "al-mathematics", level: "A Level", papers: 433 },
  { name: "Physics", code: "9702", subjectId: "al-physics", level: "A Level", papers: 407 },
  { name: "Chemistry", code: "9701", subjectId: "al-chemistry", level: "A Level", papers: 407 },
  { name: "Biology", code: "9700", subjectId: "al-biology", level: "A Level", papers: 407 },
  { name: "English Language", code: "1123", subjectId: "ol-english", level: "O Level", papers: null },
  { name: "Computer Science", code: "9618", subjectId: "al-computer-science", level: "A Level", papers: null },
  { name: "Economics", code: "9708", subjectId: "al-economics", level: "A Level", papers: null },
  { name: "Business", code: "9609", subjectId: "al-business", level: "A Level", papers: null },
];

/* Tile backgrounds cycle through the two palette colours + white. */
const TILE_STYLES = [
  "bg-[var(--zass-primary)] text-white",
  "bg-[var(--zass-base)] text-[#004643]",
  "bg-[var(--zass-card)] text-[#004643] border border-[rgba(0,70,67,0.15)]",
  "bg-[rgba(0,70,67,0.08)] text-[#004643]",
];

/* Team photos: the template ships 2 men + 2 women, but the team is
   3 men + 1 woman - so the photos are matched by the person, not by
   file order. Sufyan uses an existing repo portrait of a smiling man
   (the template has no third male photo). */
const TEAM_PHOTOS: Record<string, string> = {
  "Zaeem Noor": "/images/purdue/team1.jpg",
  "Shahbaz Hussain": "/images/purdue/team3.jpg",
  "Alliya Shahbaz": "/images/purdue/team2.jpg",
  "Sufyan Munawar": "/images/1507003211169-0a1dd7228f2d.jpg",
};

const COURSE_PHOTOS = [
  "/images/purdue/c1.png",
  "/images/purdue/c2.png",
  "/images/purdue/c3.png",
  "/images/purdue/c4.png",
];

const NOTES_PHOTOS = [
  "/images/purdue/1.jpg",
  "/images/purdue/2.jpg",
  "/images/purdue/3.jpg",
];

export default function HomePage() {
  const { settings } = useSettings();
  const { subjects } = useSubjects();
  const { courses } = useCourses();
  const { notes } = useNotes();
  const headlineLines = settings.heroHeadline.split("\n");
  const papersCount = CATALOGUE_PAPERS.length;

  const subjectName = (id: string) =>
    subjects.find((s) => s.id === id)?.name ?? "";

  return (
    <div>
      {/* ------------------------------------------------ Hero - light, like the reference */}
      <section className="relative overflow-hidden bg-[var(--zass-base)] px-5 pt-14 text-[#004643] md:px-14">
        {/* Soft flat background washes - Cyprus at very low opacity only. */}
        <div
          aria-hidden="true"
          className="absolute -right-28 -top-36 h-[520px] w-[520px] rounded-full bg-[rgba(0,70,67,0.05)]"
        />
        <div
          aria-hidden="true"
          className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-[rgba(0,70,67,0.06)]"
        />
        <div
          aria-hidden="true"
          className="absolute right-[30%] top-6 h-40 w-40 rounded-full border-[24px] border-[rgba(0,70,67,0.05)]"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col md:flex-row">
          <div className="flex flex-1 flex-col justify-center py-8 md:py-16">
            <h1 className="text-[44px] font-extrabold leading-[1.05] text-[#004643] md:text-[60px]">
              {headlineLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < headlineLines.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[rgba(0,70,67,0.78)]">
              {settings.heroSubtext}
            </p>
            <div className="mt-7">
              <Link
                href="/courses"
                className="inline-block rounded-full bg-white px-6 py-3 text-xs font-extrabold uppercase tracking-wide text-[#004643] shadow-md hover:shadow-lg"
              >
                Explore Courses →
              </Link>
            </div>
          </div>
          <div className="relative flex shrink-0 items-center justify-center pb-8 md:items-end">
            {/* Student photo: its bottom edge sits clear ABOVE the stats
                strip's top edge (strip overlaps the hero bottom by 16px),
                so no stats card ever covers any part of her. */}
            <div className="animate-zass-rise">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/purdue/home-image.png"
                alt="Smiling student holding a laptop"
                className="block h-[400px] w-auto object-contain md:h-[500px]"
              />
            </div>
            <div className="animate-zass-fade-in animate-zass-bob absolute -right-3 top-8 flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 text-[#004643] shadow-xl">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(0,70,67,0.08)]">
                <Icon name="file" className="h-4 w-4" />
              </span>
              <span>
                <b className="block text-base leading-none">
                  <CountUp to={papersCount} suffix="+" />
                </b>
                <span className="text-[11px] text-[rgba(0,70,67,0.6)]">
                  Past Papers
                </span>
              </span>
            </div>
            <div className="animate-zass-fade-in animate-zass-bob absolute -left-6 top-[45%] flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 text-[#004643] shadow-xl">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(0,70,67,0.08)]">
                <Icon name="users" className="h-4 w-4" />
              </span>
              <span>
                <b className="block text-base leading-none">
                  <CountUp to={subjects.length} />
                </b>
                <span className="text-[11px] text-[rgba(0,70,67,0.6)]">
                  Subjects
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Stats strip - overlaps the hero bottom edge */}
      <section className="relative z-10 mx-auto -mt-4 max-w-6xl px-5 md:px-14">
        <Reveal>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { icon: "book", value: subjects.length, suffix: "", label: "Subjects", bg: "bg-[var(--zass-card)]" },
              { icon: "file", value: papersCount, suffix: "", label: "Past Papers", bg: "bg-[var(--zass-base)]" },
              { icon: "grid", value: BOARDS.length, suffix: "", label: "Examination Boards", bg: "bg-[rgba(0,70,67,0.08)]" },
              { icon: "cap", value: courses.length, suffix: "", label: "Courses", bg: "bg-[var(--zass-card)]" },
            ].map((s) => (
              <div
                key={s.label}
                className={`flex h-full items-center gap-3 rounded-2xl border border-[rgba(0,70,67,0.15)] ${s.bg} p-4 shadow-lg transition-transform hover:-translate-y-1`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--zass-primary)] text-white">
                  <Icon name={s.icon as IconName} className="h-5 w-5" />
                </span>
                <span>
                  <b className="block text-2xl leading-none text-[#004643]">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </b>
                  <span className="text-[13px] text-[rgba(0,70,67,0.6)]">
                    {s.label}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* --------------------------------- Create, Learn & grow (pointing girl) */}
      <section className={`bg-[var(--zass-card)] px-5 py-14 md:px-14 ${BAND_DIVIDER}`}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row">
          <Reveal className="relative shrink-0">
            {/* Cut-out PNG of the pointing girl: object-contain keeps the
                pointing hand fully in frame. */}
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/purdue/about1.png"
                alt="Student pointing while holding her books"
                className="h-[380px] w-auto max-w-[330px] object-contain"
              />
            </div>
            <div className="animate-zass-bob absolute -bottom-4 left-4 rounded-2xl bg-[var(--zass-card)] px-4 py-3 text-[#004643] shadow-xl">
              <b className="flex items-center gap-1.5 text-lg leading-none">
                {settings.statsRating}
                <Icon name="star" filled className="h-4 w-4" />
              </b>
              <span className="text-[13px] text-[rgba(0,70,67,0.6)]">
                Rated by students for quality learning
              </span>
            </div>
          </Reveal>
          <Reveal className="flex-1">
            <p className="text-sm font-bold uppercase tracking-wider text-[var(--zass-primary)]">
              Start Learning
            </p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#004643] md:text-4xl">
              Create, Learn &amp; grow your skills from anywhere.
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[rgba(0,70,67,0.78)]">
              Past papers, notes and revision courses for O &amp; A Level
              (Cambridge) - everything in one place, free for every student.
            </p>
            <div className="mt-6 space-y-5">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[rgba(0,70,67,0.08)] text-[#004643]">
                  <Icon name="bulb" className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-[#004643]">
                    Discover the joy of lifelong learning
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[rgba(0,70,67,0.6)]">
                    Practise with real past papers and clear chapter notes,
                    whenever it suits you.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[rgba(0,70,67,0.08)] text-[#004643]">
                  <Icon name="heart" className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-[#004643]">
                    Build a real community
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[rgba(0,70,67,0.6)]">
                    Learn with other O &amp; A Level students - and book a
                    1-to-1 session when you need a tutor.
                  </p>
                </div>
              </div>
            </div>
            <Link
              href="/about"
              className="mt-7 inline-block rounded-full border-2 border-[var(--zass-primary)] px-6 py-2.5 text-sm font-bold text-[var(--zass-primary)]"
            >
              Discover More →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------- Build Better skills (4 cards) */}
      <section className={`bg-[var(--zass-base)] px-5 py-14 md:px-14 ${BAND_DIVIDER}`}>
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Start Learning"
              title="Build Better skills, faster From Today."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "medal",
                title: "Verified Past Papers",
                text: "1,654 real Cambridge papers from 2021-2025, with mark schemes and grade thresholds.",
                href: "/papers",
              },
              {
                icon: "pencil",
                title: "Quality Notes & Lessons",
                text: "Clear chapter notes for O & A Level, written in simple language.",
                href: "/courses",
              },
              {
                icon: "users",
                title: "Expert Team",
                text: "A small team that knows the Cambridge syllabus inside out.",
                href: "/about",
              },
              {
                icon: "heart",
                title: "Free for Everyone",
                text: "No fees, no shop, no cart - past papers, notes and courses cost nothing.",
                href: "/contact",
              },
            ].map((f) => (
              <Reveal key={f.title} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-[rgba(0,70,67,0.15)] bg-[var(--zass-card)] p-5 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--zass-primary)] text-white">
                    <Icon name={f.icon as IconName} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 line-clamp-2 min-h-[3rem] font-extrabold leading-snug text-[#004643]">
                    {f.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[rgba(0,70,67,0.6)]">
                    {f.text}
                  </p>
                  <Link
                    href={f.href}
                    className="mt-4 text-[13px] font-bold text-[var(--zass-primary)] hover:underline"
                  >
                    Learn More →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------- Popular Categories (8 tiles) */}
      <section className={`bg-[var(--zass-card)] px-5 py-14 md:px-14 ${BAND_DIVIDER}`}>
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Start Learning"
              title="Popular Categories From Today."
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.code} className="h-full">
                <Link
                  href={`/papers?subject=${c.subjectId}`}
                  className={`flex h-full min-h-[176px] flex-col items-center justify-center gap-3 rounded-2xl p-5 text-center shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md ${TILE_STYLES[i % TILE_STYLES.length]}`}
                >
                  <span className="block min-h-[3.1rem] text-lg font-extrabold leading-snug">
                    <span className="line-clamp-2">{c.name}</span>
                    <span className="block text-sm font-semibold opacity-70">
                      {c.level} · {c.code}
                    </span>
                  </span>
                  <span
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold ${
                      TILE_STYLES[i % TILE_STYLES.length].startsWith(
                        "bg-[var(--zass-primary)]",
                      )
                        ? "bg-white text-[#004643]"
                        : "bg-[var(--zass-primary)] text-white"
                    }`}
                  >
                    {c.papers !== null
                      ? `${c.papers} past papers`
                      : "Papers coming soon"}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/subjects"
              className="inline-block rounded-full border-2 border-[var(--zass-primary)] px-6 py-2.5 text-sm font-bold text-[var(--zass-primary)]"
            >
              View All Subjects →
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- Find the best features */}
      <section className={`bg-[var(--zass-base)] px-5 py-14 md:px-14 ${BAND_DIVIDER}`}>
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Why Choose Zass"
              title="Find the best features of Zass."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "book",
                title: "Learn Anywhere",
                text: "Past papers and notes open on any device - phone, tablet or laptop.",
                href: "/papers",
              },
              {
                icon: "users",
                title: "Expert Team",
                text: "Four people who run Zass and know the O & A Level journey first-hand.",
                href: "/about",
              },
              {
                icon: "phone",
                title: "1-to-1 Sessions",
                text: "Book a one-to-one session with a tutor for the subject you are stuck on.",
                href: "/book-session",
              },
              {
                icon: "calendar",
                title: "Course Planning",
                text: "Structured revision courses that follow the Cambridge syllabus, topic by topic.",
                href: "/courses",
              },
              {
                icon: "file",
                title: "Past Paper Practice",
                text: "Question papers, mark schemes and grade thresholds - practise like the real exam.",
                href: "/papers",
              },
              {
                icon: "headphones",
                title: "Free Support",
                text: "Stuck somewhere? Message us - Zass is free, and so is the help.",
                href: "/contact",
              },
            ].map((f) => (
              <Reveal key={f.title} className="h-full">
                <div className="flex h-full flex-col items-center rounded-2xl border border-[rgba(0,70,67,0.15)] bg-[var(--zass-card)] p-6 text-center shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--zass-primary)] text-white">
                    <Icon name={f.icon as IconName} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 line-clamp-2 min-h-[3.5rem] text-lg font-extrabold leading-snug text-[#004643]">
                    {f.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[rgba(0,70,67,0.6)]">
                    {f.text}
                  </p>
                  <Link
                    href={f.href}
                    className="mt-4 text-[13px] font-bold text-[var(--zass-primary)] hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Choose Our Top Courses */}
      <section className={`bg-[var(--zass-card)] px-5 py-14 md:px-14 ${BAND_DIVIDER}`}>
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Popular Courses"
              title="Choose Our Top Courses"
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {courses.slice(0, 4).map((c, i) => (
              <Reveal key={c.id} className="h-full">
                <Link
                  href="/courses"
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(0,70,67,0.15)] bg-[var(--zass-card)] shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative h-[150px] shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={COURSE_PHOTOS[i % COURSE_PHOTOS.length]}
                      alt={c.title}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-extrabold text-[#004643]">
                      {c.level}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="line-clamp-2 min-h-[2.5rem] text-[15px] font-bold leading-snug text-[#004643]">
                      {c.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-1.5 text-sm font-bold text-[#004643]">
                      <Icon name="star" filled className="h-4 w-4" />
                      {settings.statsRating}
                      <span className="ml-1 font-medium text-[rgba(0,70,67,0.6)]">
                        Rating
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-[rgba(0,70,67,0.6)]">
                      <Icon name="book" className="h-3.5 w-3.5" />
                      <span>{subjectName(c.subjectId)}</span>
                      <span>· {c.level}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/courses"
              className="inline-block rounded-full bg-[var(--zass-primary)] px-6 py-2.5 text-sm font-bold text-white"
            >
              View All Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------- One Platform & Many Courses */}
      <section className={`bg-[var(--zass-base)] px-5 py-14 md:px-14 ${BAND_DIVIDER}`}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row">
          <Reveal className="relative shrink-0">
            <div className="overflow-hidden rounded-[28px] shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/purdue/about-image.jpg"
                alt="Teacher holding an open book"
                className="h-[380px] w-[320px] object-cover"
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--zass-primary)] text-white shadow-xl"
            >
              <Icon name="play" filled className="ml-1 h-6 w-6" />
            </span>
          </Reveal>
          <Reveal className="flex-1">
            <p className="text-sm font-bold uppercase tracking-wider text-[var(--zass-primary)]">
              Best Online Learning Platform
            </p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#004643] md:text-4xl">
              One Platform &amp; Many Courses For You
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[rgba(0,70,67,0.78)]">
              Everything an O &amp; A Level student needs to revise with
              confidence - in one place, and free.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "1,654+ verified past papers",
                "Free for every student",
                "O & A Level Cambridge",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 rounded-full bg-[var(--zass-card)] px-4 py-2.5 text-sm font-semibold text-[#004643] shadow-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--zass-primary)] text-white">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <Link
              href="/courses"
              className="mt-7 inline-block rounded-full bg-[var(--zass-primary)] px-6 py-2.5 text-sm font-bold text-white"
            >
              Explore Our Courses →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- Our Expert Team */}
      <section className={`bg-[var(--zass-card)] px-5 py-14 md:px-14 ${BAND_DIVIDER}`}>
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Our Instructor"
              title="Our Expert Instructors"
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {TEAM.map((m) => (
              <Reveal key={m.name} className="h-full">
                <div className="h-full overflow-hidden rounded-2xl border border-[rgba(0,70,67,0.15)] bg-[var(--zass-card)] shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                  <div className="h-[220px] overflow-hidden bg-[rgba(0,70,67,0.08)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={TEAM_PHOTOS[m.name] ?? "/images/purdue/team1.jpg"}
                      alt={m.name}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-extrabold text-[#004643]">{m.name}</h3>
                    <span className="mt-1 block text-xs text-[rgba(0,70,67,0.6)]">
                      Team Member
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------- Latest Notes (real only) */}
      {notes.length > 0 && (
        <section className={`bg-[var(--zass-card)] px-5 py-14 md:px-14 ${BAND_DIVIDER}`}>
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionHeading eyebrow="News" title="Our Latest Notes" />
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {notes.slice(0, 3).map((n, i) => (
                <Reveal key={n.id} className="h-full">
                  <Link
                    href="/courses"
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(0,70,67,0.15)] bg-[var(--zass-card)] shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="h-[150px] shrink-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={NOTES_PHOTOS[i % NOTES_PHOTOS.length]}
                        alt={n.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <span className="text-xs font-bold text-[var(--zass-primary)]">
                        {subjectName(n.subjectId)}
                        {n.sample ? " · Sample" : ""}
                      </span>
                      <h3 className="mt-2 line-clamp-2 min-h-[2.5rem] flex-1 text-[15px] font-bold leading-snug text-[#004643]">
                        {n.title}
                      </h3>
                      <span className="mt-3 text-[13px] font-bold text-[var(--zass-primary)]">
                        Read More →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------- Two CTA cards */}
      <section className={`bg-[var(--zass-base)] px-5 py-14 md:px-14 ${BAND_DIVIDER}`}>
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="flex h-full items-center gap-5 rounded-2xl bg-[var(--zass-card)] p-6 shadow-sm">
              <div className="flex-1">
                <p className="text-sm font-bold text-[var(--zass-primary)]">
                  Build Your Career
                </p>
                <h3 className="mt-1 text-2xl font-extrabold leading-tight text-[#004643]">
                  Become an Instructor
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[rgba(0,70,67,0.6)]">
                  Teach O &amp; A Level students at your own pace, across
                  multiple subjects.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-block rounded-full bg-[var(--zass-primary)] px-5 py-2.5 text-sm font-bold text-white"
                >
                  Apply Now →
                </Link>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/purdue/become-ins.png"
                alt="Instructor holding books"
                className="hidden h-[190px] w-[150px] shrink-0 rounded-2xl object-contain sm:block"
              />
            </div>
          </Reveal>
          <Reveal className="h-full">
            <div className="flex h-full items-center gap-5 rounded-2xl bg-[var(--zass-card)] p-6 shadow-sm">
              <div className="flex-1">
                <p className="text-sm font-bold text-[var(--zass-primary)]">
                  Build Your Career
                </p>
                <h3 className="mt-1 text-2xl font-extrabold leading-tight text-[#004643]">
                  Get Free Courses
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[rgba(0,70,67,0.6)]">
                  Learn at your own pace - past papers, notes and courses,
                  all free.
                </p>
                <Link
                  href="/courses"
                  className="mt-4 inline-block rounded-full bg-[var(--zass-primary)] px-5 py-2.5 text-sm font-bold text-white"
                >
                  Contact Us →
                </Link>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/purdue/free-course.png"
                alt="Girl pointing while holding her books"
                className="hidden h-[190px] w-[150px] shrink-0 rounded-2xl object-contain sm:block"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
