"use client";

import { useRef, useState } from "react";
import type { Note } from "../../../lib/types";
import {
  deleteFileBlob,
  downloadStoredFile,
  formatBytes,
  saveFileBlob,
  subjectName,
  uid,
  useNotes,
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

const emptyForm = { title: "", subjectId: "", body: "" };

export default function NotesAdmin() {
  const { notes, saveNote, deleteNote } = useNotes();
  const { subjects } = useSubjects();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [existingFileName, setExistingFileName] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const startEdit = (n: Note) => {
    setEditingId(n.id);
    setForm({ title: n.title, subjectId: n.subjectId, body: n.body });
    setFile(null);
    setExistingFileName(n.fileName);
    setError("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const cancel = () => {
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
    setSaving(true);
    try {
      const existing = editingId
        ? notes.find((n) => n.id === editingId)
        : undefined;
      let fileId = existing?.fileId ?? null;
      let fileName = existing?.fileName ?? null;
      let fileSize = existing?.fileSize ?? null;
      if (file) {
        if (fileId) await deleteFileBlob(fileId).catch(() => {});
        fileId = uid();
        await saveFileBlob(fileId, file);
        fileName = file.name;
        fileSize = file.size;
      }
      const note: Note = {
        id: editingId ?? uid(),
        title: form.title.trim(),
        subjectId: form.subjectId,
        body: form.body,
        fileName,
        fileSize,
        fileId,
        sample: existing?.sample,
        createdAt: existing?.createdAt ?? Date.now(),
      };
      saveNote(note);
      cancel();
    } catch {
      setError("Could not save the file. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (n: Note) => {
    if (!window.confirm(`Delete note "${n.title}"?`)) return;
    if (n.fileId) await deleteFileBlob(n.fileId).catch(() => {});
    deleteNote(n.id);
  };

  const sorted = [...notes].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#004643]">Notes &amp; Lessons</h1>
        <p className="mt-1 text-sm">
          Chapter notes and lesson write-ups, with an optional attached file.
        </p>
      </div>

      <Card title={editingId ? "Edit note" : "Add a note"}>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title">
              <input
                className={inputCls}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Functions: key definitions & worked examples"
              />
            </Field>
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
            <div className="sm:col-span-2">
              <Field label="Body">
                <textarea
                  className={inputCls}
                  rows={6}
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  placeholder="Write the note or lesson content here…"
                />
              </Field>
            </div>
            <Field
              label="Attachment (optional, any file)"
              hint={
                existingFileName && !file
                  ? `Current file: ${existingFileName} — leave empty to keep it.`
                  : undefined
              }
            >
              <input
                ref={fileRef}
                className={inputCls}
                type="file"
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
              {saving ? "Saving…" : editingId ? "Save changes" : "Add note"}
            </PrimaryButton>
            {editingId ? (
              <GhostButton onClick={cancel}>Cancel</GhostButton>
            ) : null}
          </div>
        </form>
      </Card>

      <Card title={`All notes (${sorted.length})`}>
        {sorted.length === 0 ? (
          <p className="text-sm">No notes yet.</p>
        ) : (
          <ul className="divide-y divide-[rgba(0,70,67,0.15)]">
            {sorted.map((n) => (
              <li key={n.id} className="py-3">
                <div className="flex flex-wrap items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#004643]">
                      {n.title} {n.sample ? <SampleBadge /> : null}
                    </p>
                    <p className="text-xs">
                      {subjectName(subjects, n.subjectId)}
                      {n.createdAt
                        ? ` · ${new Date(n.createdAt).toLocaleDateString()}`
                        : ""}
                    </p>
                    {n.fileName ? (
                      <p className="text-xs">
                        {n.fileName} ({formatBytes(n.fileSize)})
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {n.fileId && n.fileName ? (
                      <GhostButton
                        onClick={() => downloadStoredFile(n.fileId as string, n.fileName as string)}
                      >
                        Download
                      </GhostButton>
                    ) : null}
                    <GhostButton onClick={() => startEdit(n)}>Edit</GhostButton>
                    <DangerButton onClick={() => remove(n)}>Delete</DangerButton>
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
