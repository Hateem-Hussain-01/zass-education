"use client";

import { useMemo, useRef, useState } from "react";
import type { Paper, Session } from "../../../lib/types";
import {
  deleteFileBlob,
  downloadStoredFile,
  formatBytes,
  saveFileBlob,
  subjectName,
  uid,
  usePapers,
  useSubjects,
} from "../../../lib/store";
import {
  Card,
  DangerButton,
  Field,
  GhostButton,
  PrimaryButton,
  SampleBadge,
  inputCls,
} from "../ui";

const SESSIONS: Session[] = ["Feb/Mar", "May/June", "Oct/Nov"];

interface FormState {
  title: string;
  subjectId: string;
  board: string;
  year: string;
  session: Session;
  paperNo: string;
}

const emptyForm: FormState = {
  title: "",
  subjectId: "",
  board: "Cambridge",
  year: String(new Date().getFullYear()),
  session: "May/June",
  paperNo: "Paper 1",
};

export default function PapersAdmin() {
  const { papers, savePaper, deletePaper } = usePapers();
  const { subjects } = useSubjects();

  const [filterSubject, setFilterSubject] = useState("all");
  const [filterYear, setFilterYear] = useState("all");
  const [filterSession, setFilterSession] = useState("all");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [existingFileName, setExistingFileName] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const years = useMemo(
    () =>
      Array.from(new Set(papers.map((p) => p.year))).sort((a, b) => b - a),
    [papers],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return [...papers]
      .filter((p) => (filterSubject === "all" ? true : p.subjectId === filterSubject))
      .filter((p) => (filterYear === "all" ? true : p.year === Number(filterYear)))
      .filter((p) => (filterSession === "all" ? true : p.session === filterSession))
      .filter((p) =>
        q
          ? p.title.toLowerCase().includes(q) ||
            subjectName(subjects, p.subjectId).toLowerCase().includes(q) ||
            (p.fileName ?? "").toLowerCase().includes(q)
          : true,
      )
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [papers, subjects, filterSubject, filterYear, filterSession, search]);

  const startAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm, subjectId: subjects[0]?.id ?? "" });
    setFile(null);
    setExistingFileName(null);
    setError("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const startEdit = (p: Paper) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      subjectId: p.subjectId,
      board: p.board,
      year: String(p.year),
      session: p.session,
      paperNo: p.paperNo,
    });
    setFile(null);
    setExistingFileName(p.fileName);
    setError("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFile(null);
    setExistingFileName(null);
    setError("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim()) return setError("Please enter a title.");
    if (!form.subjectId) return setError("Please choose a subject.");
    const year = Number(form.year);
    if (!Number.isInteger(year) || year < 1900 || year > 2100)
      return setError("Please enter a valid year.");
    setSaving(true);
    try {
      const existing = editingId
        ? papers.find((p) => p.id === editingId)
        : undefined;
      let fileId = existing?.fileId ?? null;
      let fileName = existing?.fileName ?? null;
      let fileSize = existing?.fileSize ?? null;
      if (file) {
        // Replace the old stored file, if any.
        if (fileId) await deleteFileBlob(fileId).catch(() => {});
        fileId = uid();
        await saveFileBlob(fileId, file);
        fileName = file.name;
        fileSize = file.size;
      }
      const paper: Paper = {
        id: editingId ?? uid(),
        title: form.title.trim(),
        subjectId: form.subjectId,
        board: form.board.trim() || "Cambridge",
        year,
        session: form.session,
        paperNo: form.paperNo.trim(),
        fileName,
        fileSize,
        fileId,
        sample: existing?.sample,
        createdAt: existing?.createdAt ?? Date.now(),
      };
      savePaper(paper);
      cancelEdit();
    } catch {
      setError("Could not save the file. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p: Paper) => {
    if (!window.confirm(`Delete "${p.title}"?`)) return;
    if (p.fileId) await deleteFileBlob(p.fileId).catch(() => {});
    deletePaper(p.id);
  };

  const download = async (p: Paper) => {
    if (!p.fileId || !p.fileName) return;
    setDownloadingId(p.id);
    try {
      const ok = await downloadStoredFile(p.fileId, p.fileName);
      if (!ok) window.alert("File not found in this browser.");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#004643]">Past Papers</h1>
        <p className="mt-1 text-sm">
          Upload and manage Cambridge past papers (PDF). Files are stored in
          this browser only.
        </p>
      </div>

      <Card title={editingId ? "Edit paper" : "Add a past paper"}>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Title">
                <input
                  className={inputCls}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Mathematics 9709 — Paper 1 (Pure Mathematics 1)"
                />
              </Field>
            </div>
            <Field label="Subject">
              <select
                className={inputCls}
                value={form.subjectId}
                onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
              >
                <option value="">Choose a subject…</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.level}, {s.code})
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Board">
              <input
                className={inputCls}
                value={form.board}
                onChange={(e) => setForm({ ...form, board: e.target.value })}
              />
            </Field>
            <Field label="Year">
              <input
                className={inputCls}
                type="number"
                inputMode="numeric"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
              />
            </Field>
            <Field label="Session">
              <select
                className={inputCls}
                value={form.session}
                onChange={(e) =>
                  setForm({ ...form, session: e.target.value as Session })
                }
              >
                {SESSIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Paper number">
              <input
                className={inputCls}
                value={form.paperNo}
                onChange={(e) => setForm({ ...form, paperNo: e.target.value })}
                placeholder="Paper 1"
              />
            </Field>
            <Field
              label="PDF file"
              hint={
                existingFileName && !file
                  ? `Current file: ${existingFileName} — leave empty to keep it.`
                  : "PDF only."
              }
            >
              <input
                ref={fileRef}
                className={inputCls}
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </Field>
          </div>
          {error ? (
            <p className="rounded-lg bg-[rgba(0,70,67,0.06)] px-3 py-2 text-sm font-medium text-[#004643]">
              {error}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            <PrimaryButton type="submit" disabled={saving}>
              {saving ? "Saving…" : editingId ? "Save changes" : "Add paper"}
            </PrimaryButton>
            {editingId ? (
              <GhostButton onClick={cancelEdit}>Cancel</GhostButton>
            ) : (
              <GhostButton onClick={startAdd}>Clear form</GhostButton>
            )}
          </div>
        </form>
      </Card>

      <Card title={`All papers (${filtered.length})`}>
        <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Subject">
            <select
              className={inputCls}
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
            >
              <option value="all">All subjects</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.level})
                </option>
              ))}
            </select>
          </Field>
          <Field label="Year">
            <select
              className={inputCls}
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            >
              <option value="all">All years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Session">
            <select
              className={inputCls}
              value={filterSession}
              onChange={(e) => setFilterSession(e.target.value)}
            >
              <option value="all">All sessions</option>
              {SESSIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Search">
            <input
              className={inputCls}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, subject or file…"
            />
          </Field>
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm">No papers match these filters.</p>
        ) : (
          <ul className="divide-y divide-[rgba(0,70,67,0.15)]">
            {filtered.map((p) => (
              <li key={p.id} className="py-3">
                <div className="flex flex-wrap items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#004643]">
                      {p.title} {p.sample ? <SampleBadge /> : null}
                    </p>
                    <p className="text-xs">
                      {subjectName(subjects, p.subjectId)} · {p.board} ·{" "}
                      {p.session} {p.year} · {p.paperNo}
                    </p>
                    <p className="text-xs">
                      {p.fileName
                        ? `${p.fileName} (${formatBytes(p.fileSize)})`
                        : "No file"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <GhostButton
                      onClick={() => download(p)}
                      disabled={!p.fileId || downloadingId === p.id}
                    >
                      {downloadingId === p.id ? "Downloading…" : "Download"}
                    </GhostButton>
                    <GhostButton onClick={() => startEdit(p)}>Edit</GhostButton>
                    <DangerButton onClick={() => remove(p)}>Delete</DangerButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
