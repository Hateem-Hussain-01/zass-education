"use client";

import { useSettings } from "@/lib/store";
import { TEAM, initials } from "@/lib/types";

export default function AboutPage() {
  const { settings } = useSettings();

  return (
    <div className="px-5 md:px-14 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-[#0F172A]">
        About {settings.siteName}
      </h1>
      <p className="text-slate-600 mt-4 max-w-3xl leading-relaxed">
        {settings.siteName} is a learning platform for O &amp; A Level
        (Cambridge) students. We bring past papers, chapter notes and revision
        courses together in one place — so students can find what they need
        without hunting across ten different websites.
      </p>
      <p className="text-slate-600 mt-3 max-w-3xl leading-relaxed">
        {settings.tagline}
      </p>

      <h2 className="text-xl font-extrabold text-[#0F172A] mt-10">
        What you get here
      </h2>
      <div className="grid sm:grid-cols-3 gap-5 mt-4">
        <div className="bg-[var(--zass-card)] border border-slate-200 rounded-2xl p-5">
          <h3 className="font-bold text-[#0F172A]">Past Papers</h3>
          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
            Organised by subject, year and session, with downloadable files.
          </p>
        </div>
        <div className="bg-[var(--zass-card)] border border-slate-200 rounded-2xl p-5">
          <h3 className="font-bold text-[#0F172A]">Notes &amp; Lessons</h3>
          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
            Clear chapter notes written in simple language.
          </p>
        </div>
        <div className="bg-[var(--zass-card)] border border-slate-200 rounded-2xl p-5">
          <h3 className="font-bold text-[#0F172A]">Revision Courses</h3>
          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
            Structured courses for the subjects that matter most.
          </p>
        </div>
      </div>

      <h2 className="text-xl font-extrabold text-[#0F172A] mt-12">
        Meet the Team
      </h2>
      <p className="text-sm text-slate-500 mt-2">
        The people behind {settings.siteName}.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
        {TEAM.map((m) => (
          <div
            key={m.name}
            className="bg-[var(--zass-card)] border border-slate-200 rounded-2xl p-6 text-center shadow-sm"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-[var(--zass-primary)] text-white flex items-center justify-center text-xl font-extrabold">
              {initials(m.name)}
            </div>
            <h3 className="font-bold text-[#0F172A] mt-3">{m.name}</h3>
            <span className="text-xs text-slate-500">Team Member</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-extrabold text-[#0F172A] mt-12">Contact</h2>
      <div className="bg-[var(--zass-card)] border border-slate-200 rounded-2xl p-5 mt-4 max-w-xl">
        <p className="text-sm text-slate-600">
          Email:{" "}
          <a
            href={`mailto:${settings.contactEmail}`}
            className="font-semibold text-[var(--zass-primary)]"
          >
            {settings.contactEmail}
          </a>
        </p>
        <p className="text-sm text-slate-600 mt-2">
          Phone:{" "}
          <a
            href={`tel:${settings.contactPhone.replace(/\s/g, "")}`}
            className="font-semibold text-[var(--zass-primary)]"
          >
            {settings.contactPhone}
          </a>
        </p>
        <p className="text-sm text-slate-600 mt-2">
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
    </div>
  );
}
