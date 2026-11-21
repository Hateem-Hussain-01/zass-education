"use client";

import { useState } from "react";
import type { Subject } from "../../../lib/types";
import { uid, useSubjects } from "../../../lib/store";
import {
  Card,
  DangerButton,
  Field,
  GhostButton,
  PrimaryButton,
  inputCls,
} from "../ui";

type LevelValue = "O Level" | "A Level" | "Both";

const emptyForm = { name: "", level: "O Level" as LevelValue, code: "" };

export default function SubjectsAdmin() {
  const { subjects, saveSubject, deleteSubject } = useSubjects();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const startEdit = (s: Subject) => {
    setEditingId(s.id);
    setForm({ name: s.name, level: s.level, code: s.code });
    setError("");
  };

  const cancel = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return setError("Please enter a subject name.");
    if (!form.code.trim()) return setError("Please enter a syllabus code.");
    const subject: Subject = {
      id: editingId ?? uid(),
      name: form.name.trim(),
      level: form.level,
      code: form.code.trim(),
    };
    saveSubject(subject);
    cancel();
  };

  const remove = (s: Subject) => {
    if (!window.confirm(`Delete subject "${s.name}" (${s.code})?`)) return;
    deleteSubject(s.id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Subjects</h1>
        <p className="mt-1 text-sm">
          O &amp; A Level subjects offered by Zass Education.
        </p>
      </div>

      <Card title={editingId ? "Edit subject" : "Add a subject"}>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Name">
              <input
                className={inputCls}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Mathematics"
              />
            </Field>
            <Field label="Level">
              <select
                className={inputCls}
                value={form.level}
                onChange={(e) =>
                  setForm({ ...form, level: e.target.value as LevelValue })
                }
              >
                <option value="O Level">O Level</option>
                <option value="A Level">A Level</option>
                <option value="Both">Both</option>
              </select>
            </Field>
            <Field label="Syllabus code">
              <input
                className={inputCls}
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder="e.g. 9709"
              />
            </Field>
          </div>
          {error ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {error}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            <PrimaryButton type="submit">
              {editingId ? "Save changes" : "Add subject"}
            </PrimaryButton>
            {editingId ? (
              <GhostButton onClick={cancel}>Cancel</GhostButton>
            ) : null}
          </div>
        </form>
      </Card>

      <Card title={`All subjects (${subjects.length})`}>
        {subjects.length === 0 ? (
          <p className="text-sm">No subjects yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-[#0F172A]">
                  <th className="py-2 pr-3 font-semibold">Name</th>
                  <th className="py-2 pr-3 font-semibold">Level</th>
                  <th className="py-2 pr-3 font-semibold">Code</th>
                  <th className="py-2 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((s) => (
                  <tr key={s.id} className="border-b border-slate-100 last:border-0">
                    <td className="py-2.5 pr-3 font-medium text-[#0F172A]">{s.name}</td>
                    <td className="py-2.5 pr-3">{s.level}</td>
                    <td className="py-2.5 pr-3">{s.code}</td>
                    <td className="py-2.5 text-right">
                      <div className="flex justify-end gap-2">
                        <GhostButton onClick={() => startEdit(s)}>Edit</GhostButton>
                        <DangerButton onClick={() => remove(s)}>Delete</DangerButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
