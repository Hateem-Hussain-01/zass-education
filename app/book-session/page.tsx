"use client";

import { useState } from "react";
import { uid, useBookings, useSubjects } from "@/lib/store";
import PageHero from "@/components/PageHero";

export default function BookSessionPage() {
  const { subjects } = useSubjects();
  const { saveBooking } = useBookings();
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [preferredDay, setPreferredDay] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const inputCls =
    "mt-1 w-full border border-[rgba(0,70,67,0.25)] rounded-xl px-3 py-2 text-sm bg-white outline-none focus:border-[var(--zass-primary)]";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!whatsapp.trim() && !email.trim()) {
      setError("Please share your WhatsApp number or your email so we can reach you.");
      return;
    }
    saveBooking({
      id: uid(),
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      subjectId,
      preferredDay,
      preferredTime,
      message: message.trim(),
      status: "new",
      createdAt: Date.now(),
    });
    setDone(true);
  };

  return (
    <div>
      <PageHero
        eyebrow="1-to-1 Session"
        title="Book a 1-to-1 Session"
        description="Sit down with a tutor for one focused hour — your subject, your questions, your pace. Fill in the form and we will confirm your slot."
        image="/images/1522202176988-66273c2fd55f.jpg"
        imageAlt="O & A Level students studying together"
      />

      <div className="px-5 md:px-14 py-10 max-w-6xl mx-auto">
        {done ? (
          <div className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-8 text-center max-w-xl mx-auto">
            <div className="w-14 h-14 mx-auto rounded-full bg-[var(--zass-primary)] text-white flex items-center justify-center text-2xl font-bold">
              ✓
            </div>
            <h2 className="font-extrabold text-xl text-[#004643] mt-4">
              Request received
            </h2>
            <p className="text-sm text-[rgba(0,70,67,0.78)] mt-2 leading-relaxed">
              Thank you, {name.trim()}. We will confirm your 1-to-1 session
              on WhatsApp or email shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-6 max-w-xl mx-auto space-y-4"
          >
            <div>
              <label htmlFor="bk-name" className="text-sm font-bold text-[#004643]">
                Your name *
              </label>
              <input
                id="bk-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputCls}
                placeholder="Your full name"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="bk-whatsapp" className="text-sm font-bold text-[#004643]">
                  WhatsApp
                </label>
                <input
                  id="bk-whatsapp"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className={inputCls}
                  placeholder="03xx xxxxxxx"
                />
              </div>
              <div>
                <label htmlFor="bk-email" className="text-sm font-bold text-[#004643]">
                  Email
                </label>
                <input
                  id="bk-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <p className="text-xs text-[rgba(0,70,67,0.6)]">
              WhatsApp or email — at least one is needed so we can confirm
              your slot.
            </p>
            <div>
              <label htmlFor="bk-subject" className="text-sm font-bold text-[#004643]">
                Subject
              </label>
              <select
                id="bk-subject"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className={inputCls}
              >
                <option value="">Any subject</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="bk-day" className="text-sm font-bold text-[#004643]">
                  Preferred day
                </label>
                <input
                  id="bk-day"
                  type="date"
                  value={preferredDay}
                  onChange={(e) => setPreferredDay(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="bk-time" className="text-sm font-bold text-[#004643]">
                  Preferred time
                </label>
                <input
                  id="bk-time"
                  type="time"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>
            <div>
              <label htmlFor="bk-message" className="text-sm font-bold text-[#004643]">
                What do you want to cover?
              </label>
              <textarea
                id="bk-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className={inputCls}
                placeholder="e.g. Mechanics for Physics 9702, Paper 4 practice..."
              />
            </div>
            {error && (
              <p className="text-sm font-semibold text-[#004643] bg-[rgba(0,70,67,0.08)] border border-[rgba(0,70,67,0.2)] rounded-xl px-4 py-3">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="bg-[var(--zass-primary)] text-white font-bold text-sm px-6 py-2.5 rounded-full"
            >
              Request my session
            </button>
            <p className="text-xs text-[rgba(0,70,67,0.6)]">
              Your request is saved in this browser for now (v1 stores data
              locally). The admin sees bookings in the admin portal on the
              same device.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
