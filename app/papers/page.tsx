"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  downloadStoredFile,
  formatBytes,
  subjectName,
  usePapers,
  useSubjects,
} from "@/lib/store";

function PapersInner() {
  const searchParams = useSearchParams();
  const { papers } = usePapers();
  const { subjects } = useSubjects();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [subjectFilter, setSubjectFilter] = useState(
    searchParams.get("subject") ?? "all",
  );
  const [sessionFilter, setSessionFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  const years = useMemo(
    () =>
      Array.from(new Set(papers.map((p) => p.year))).sort((a, b) => b - a),
    [papers],
  );

  const filtered = papers.filter((p) => {
    if (subjectFilter !== "all" && p.subjectId !== subjectFilter) return false;
    if (sessionFilter !== "all" && p.session !== sessionFilter) return false;
    if (yearFilter !== "all" && String(p.year) !== yearFilter) return false;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      const hay = `${p.title} ${subjectName(subjects, p.subjectId)} ${p.board} ${p.year}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloadMsg, setDownloadMsg] = useState("");

  const onDownload = async (fileId: string, fileName: string, id: string) => {
    setDownloading(id);
    setDownloadMsg("");
    const ok = await downloadStoredFile(fileId, fileName);
    setDownloadMsg(
      ok ? "" : "This file is not in this browser — upload it again from the admin portal.",
    );
    setDownloading(null);
  };

  return (
    <div className="px-5 md:px-14 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-[#004643]">Past Papers</h1>
      <p className="text-[rgba(0,70,67,0.6)] mt-2 max-w-2xl">
        Past papers by subject, year and session. Files uploaded in the admin
        portal can be downloaded here — in the same browser they were uploaded
        from (v1 stores files locally).
      </p>

      <div className="flex flex-wrap gap-3 mt-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search papers..."
          className="border border-[rgba(0,70,67,0.25)] rounded-full px-4 py-2 text-sm flex-1 min-w-[200px] bg-white outline-none focus:border-[var(--zass-primary)]"
          aria-label="Search past papers"
        />
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="border border-[rgba(0,70,67,0.25)] rounded-full px-4 py-2 text-sm bg-white"
          aria-label="Filter by subject"
        >
          <option value="all">All subjects</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.level})
            </option>
          ))}
        </select>
        <select
          value={sessionFilter}
          onChange={(e) => setSessionFilter(e.target.value)}
          className="border border-[rgba(0,70,67,0.25)] rounded-full px-4 py-2 text-sm bg-white"
          aria-label="Filter by session"
        >
          <option value="all">All sessions</option>
          <option value="Feb/Mar">Feb/Mar</option>
          <option value="May/June">May/June</option>
          <option value="Oct/Nov">Oct/Nov</option>
        </select>
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="border border-[rgba(0,70,67,0.25)] rounded-full px-4 py-2 text-sm bg-white"
          aria-label="Filter by year"
        >
          <option value="all">All years</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {downloadMsg && (
        <p className="mt-4 text-sm text-[rgba(0,70,67,0.78)] bg-[rgba(0,70,67,0.06)] border border-[rgba(0,70,67,0.2)] rounded-xl px-4 py-3">
          {downloadMsg}
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="mt-8 bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-8 text-center">
          <h2 className="font-bold text-[#004643]">No papers found</h2>
          <p className="text-sm text-[rgba(0,70,67,0.6)] mt-2">
            {papers.length === 0
              ? "No papers uploaded yet — add them from the admin portal (Past Papers → Add paper)."
              : "Try a different search or filter."}
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {filtered.map((p) => (
            <li
              key={p.id}
              className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-bold text-[#004643]">{p.title}</h2>
                  {p.sample && (
                    <span className="text-[11px] font-bold bg-[rgba(0,70,67,0.08)] text-[#004643] px-2 py-0.5 rounded-full">
                      Sample
                    </span>
                  )}
                </div>
                <p className="text-sm text-[rgba(0,70,67,0.6)] mt-1">
                  {subjectName(subjects, p.subjectId)} · {p.board} ·{" "}
                  {p.session} {p.year} · {p.paperNo}
                </p>
                <p className="text-xs text-[rgba(0,70,67,0.6)] mt-1">
                  {p.fileName
                    ? `${p.fileName} (${formatBytes(p.fileSize)})`
                    : "No file uploaded yet"}
                </p>
              </div>
              {p.fileId && p.fileName ? (
                <button
                  onClick={() => onDownload(p.fileId as string, p.fileName as string, p.id)}
                  disabled={downloading === p.id}
                  className="bg-[var(--zass-primary)] text-white text-sm font-bold px-5 py-2.5 rounded-full shrink-0 disabled:opacity-50"
                >
                  {downloading === p.id ? "Preparing..." : "Download PDF"}
                </button>
              ) : (
                <span className="text-xs text-[rgba(0,70,67,0.6)] shrink-0">
                  File coming soon
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function PapersPage() {
  return (
    <Suspense
      fallback={
        <div className="px-5 md:px-14 py-10 max-w-6xl mx-auto">
          <p className="text-[rgba(0,70,67,0.6)]">Loading past papers...</p>
        </div>
      }
    >
      <PapersInner />
    </Suspense>
  );
}
