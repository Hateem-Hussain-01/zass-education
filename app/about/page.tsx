"use client";

import { useSettings } from "@/lib/store";
import { TEAM } from "@/lib/types";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import TeamLinkedIn from "@/components/TeamLinkedIn";

/* Same team photos as the home page: matched by the person, not by
   file order (the template ships 2 men + 2 women; the team is 3 men +
   1 woman - Sufyan uses an existing repo portrait of a smiling man). */
const TEAM_PHOTOS: Record<string, string> = {
  "Zaeem Noor": "/images/purdue/team1.jpg",
  "Shahbaz Hussain": "/images/purdue/team3.jpg",
  "Alliya Shahbaz": "/images/purdue/team2.jpg",
  "Sufyan Munawar": "/images/1507003211169-0a1dd7228f2d.jpg",
};

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="text-center">
      <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[rgba(0,70,67,0.6)]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-extrabold text-[#004643] md:text-[28px]">
        {title}
      </h2>
      {sub && (
        <p className="mt-2 text-sm text-[rgba(0,70,67,0.6)] max-w-2xl mx-auto">
          {sub}
        </p>
      )}
    </div>
  );
}

export default function AboutPage() {
  const { settings } = useSettings();

  return (
    <div>
      <PageHero
        eyebrow="About"
        title={`About ${settings.siteName}`}
        description={`${settings.siteName} is a learning platform for O & A Level (Cambridge) students. We bring past papers, chapter notes and revision courses together in one place - so students can find what they need without hunting across ten different websites.`}
        image="/images/purdue/c3.png"
        imageAlt="O & A Level students studying together"
      />
      <section className="bg-[var(--zass-card)] border-t-2 border-[rgba(0,70,67,0.12)] px-5 md:px-14 py-11">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-[rgba(0,70,67,0.78)] max-w-3xl mx-auto text-center leading-relaxed">
              {settings.tagline}
            </p>
            <div className="mt-10">
              <SectionHeading eyebrow="What We Offer" title="What You Get Here" />
              <div className="grid sm:grid-cols-3 gap-5 mt-7">
                <div className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                  <h3 className="font-bold text-[#004643]">Past Papers</h3>
                  <p className="text-sm text-[rgba(0,70,67,0.6)] mt-1.5 leading-relaxed">
                    Organised by subject, year and session, with downloadable files.
                  </p>
                </div>
                <div className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                  <h3 className="font-bold text-[#004643]">Notes &amp; Lessons</h3>
                  <p className="text-sm text-[rgba(0,70,67,0.6)] mt-1.5 leading-relaxed">
                    Clear chapter notes written in simple language.
                  </p>
                </div>
                <div className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                  <h3 className="font-bold text-[#004643]">Revision Courses</h3>
                  <p className="text-sm text-[rgba(0,70,67,0.6)] mt-1.5 leading-relaxed">
                    Structured courses for the subjects that matter most.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--zass-base)] border-t-2 border-[rgba(0,70,67,0.12)] px-5 md:px-14 py-11">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SectionHeading
              eyebrow="Our Team"
              title="Meet the Team"
              sub={`The people behind ${settings.siteName}.`}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-7">
              {TEAM.map((m) => (
                <div
                  key={m.name}
                  className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-6 text-left shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={TEAM_PHOTOS[m.name] ?? "/images/purdue/team1.jpg"}
                    alt={m.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <h3 className="font-bold text-[#004643]">{m.name}</h3>
                    <TeamLinkedIn url={m.linkedinUrl} name={m.name} />
                  </div>
                  <span className="mt-1 block text-xs text-[rgba(0,70,67,0.6)]">{m.role}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--zass-card)] border-t-2 border-[rgba(0,70,67,0.12)] px-5 md:px-14 py-11">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SectionHeading eyebrow="Get In Touch" title="Contact" />
            <div className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-6 mt-7 max-w-xl mx-auto shadow-sm">
              <p className="text-sm text-[rgba(0,70,67,0.78)]">
                Email:{" "}
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="font-semibold text-[var(--zass-primary)]"
                >
                  {settings.contactEmail}
                </a>
              </p>
              <p className="text-sm text-[rgba(0,70,67,0.78)] mt-2">
                Phone:{" "}
                <a
                  href={`tel:${settings.contactPhone.replace(/\s/g, "")}`}
                  className="font-semibold text-[var(--zass-primary)]"
                >
                  {settings.contactPhone}
                </a>
              </p>
              <p className="text-sm text-[rgba(0,70,67,0.78)] mt-2">
                WhatsApp:{" "}
                <a
                  href={settings.contactWhatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[var(--zass-primary)]"
                >
                  Chat on WhatsApp
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
