"use client";

import Image from "next/image";
import { useState } from "react";
import type { Course } from "../../../lib/types";
import { subjectName, uid, useCourses, useSubjects } from "../../../lib/store";
import {
  Card,
  DangerButton,
  Field,
  GhostButton,
  PrimaryButton,
  SampleBadge,
  inputCls,
} from "../ui";

const IMAGE_OPTIONS = [
  "/images/1516321318423-f06f85e504b3.jpg",
  "/images/1531482615713-2afd69097998.jpg",
  "/images/1460925895917-afdab827c52f.jpg",
  "/images/1524995997946-a1c2e315a42f.jpg",
  "/images/1522202176988-66273c2fd55f.jpg",
  "/images/1523240795612-9a054b0db644.jpg",
  "/images/1571260899304-425eee4c7efc.jpg",
  "/images/1524178232363-1fb2b075b655.jpg",
  "/images/1552664730-d307ca884978.jpg",
  "/images/1558655146-9f40138edfeb.jpg",
  "/images/1519389950473-47ba0277781c.jpg",
  "/images/1544717297-fa95b6ee9643.jpg",
];

type LevelValue = "O Level" | "A Level" | "Both";

const emptyForm = {
  title: "",
  subjectId: "",
  level: "A Level" as LevelValue,
  description: "",
  price: "0",
  image: "",
};

export default function CoursesAdmin() {
  const { courses, saveCourse, deleteCourse } = useCourses();
  const { subjects } = useSubjects();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const startEdit = (c: Course) => {
    setEditingId(c.id);
    setForm({
      title: c.title,
      subjectId: c.subjectId,
      level: c.level,
      description: c.description,
      price: String(c.price),
      image: c.image ?? "",
    });
    setError("");
  };

  const cancel = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return setError("Please enter a course title.");
    if (!form.subjectId) return setError("Please choose a subject.");
    const price = Number(form.price);
    if (!Number.isFinite(price) || price < 0)
      return setError("Please enter a valid price (0 = Free).");
    const course: Course = {
      id: editingId ?? uid(),
      title: form.title.trim(),
      subjectId: form.subjectId,
      description: form.description,
      price,
      level: form.level,
      image: form.image || null,
      sample: editingId
        ? courses.find((c) => c.id === editingId)?.sample
        : undefined,
      createdAt: editingId
        ? (courses.find((c) => c.id === editingId)?.createdAt ?? Date.now())
        : Date.now(),
    };
    saveCourse(course);
    cancel();
  };

  const remove = (c: Course) => {
    if (!window.confirm(`Delete course "${c.title}"?`)) return;
    deleteCourse(c.id);
  };

  const sorted = [...courses].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#004643]">Courses</h1>
        <p className="mt-1 text-sm">
          Manage the courses shown on the public site. Price 0 means Free.
        </p>
      </div>

      <Card title={editingId ? "Edit course" : "Add a course"}>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Title">
                <input
                  className={inputCls}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Mathematics 9709 — Full Revision Course"
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
            <div className="sm:col-span-2">
              <Field label="Description">
                <textarea
                  className={inputCls}
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="What does this course cover?"
                />
              </Field>
            </div>
            <Field label="Price (PKR, 0 = Free)">
              <input
                className={inputCls}
                type="number"
                min={0}
                inputMode="numeric"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </Field>
            <Field label="Image">
              <select
                className={inputCls}
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              >
                <option value="">No image</option>
                {IMAGE_OPTIONS.map((src) => (
                  <option key={src} value={src}>
                    {src.split("/").pop()}
                  </option>
                ))}
              </select>
            </Field>
            {form.image ? (
              <div className="sm:col-span-2">
                <p className="mb-1 text-sm font-medium text-[#004643]">Preview</p>
                <Image
                  src={form.image}
                  alt="Course image preview"
                  width={320}
                  height={180}
                  className="rounded-lg object-cover"
                />
              </div>
            ) : null}
          </div>
          {error ? (
            <p className="rounded-lg bg-[rgba(0,70,67,0.06)] px-3 py-2 text-sm font-medium text-[#004643]">
              {error}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            <PrimaryButton type="submit">
              {editingId ? "Save changes" : "Add course"}
            </PrimaryButton>
            {editingId ? (
              <GhostButton onClick={cancel}>Cancel</GhostButton>
            ) : null}
          </div>
        </form>
      </Card>

      <Card title={`All courses (${sorted.length})`}>
        {sorted.length === 0 ? (
          <p className="text-sm">No courses yet.</p>
        ) : (
          <ul className="divide-y divide-[rgba(0,70,67,0.15)]">
            {sorted.map((c) => (
              <li key={c.id} className="flex flex-wrap items-start gap-3 py-3">
                {c.image ? (
                  <Image
                    src={c.image}
                    alt=""
                    width={96}
                    height={64}
                    className="rounded-lg object-cover"
                  />
                ) : null}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[#004643]">
                    {c.title} {c.sample ? <SampleBadge /> : null}
                  </p>
                  <p className="text-xs">
                    {subjectName(subjects, c.subjectId)} · {c.level} ·{" "}
                    {c.price === 0 ? "Free" : `Rs ${c.price.toLocaleString()}`}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <GhostButton onClick={() => startEdit(c)}>Edit</GhostButton>
                  <DangerButton onClick={() => remove(c)}>Delete</DangerButton>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
