"use client";

import { useState } from "react";
import { useSettings } from "@/lib/store";

export default function ContactPage() {
  const { settings } = useSettings();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sentNote, setSentNote] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Message from ${name || "a student"} — ${settings.siteName}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\n\n${message}`,
    );
    window.location.href = `mailto:${settings.contactEmail}?subject=${subject}&body=${body}`;
    setSentNote(
      "Your email app should open with the message ready to send.",
    );
  };

  return (
    <div className="px-5 md:px-14 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-[#004643]">Contact</h1>
      <p className="text-[rgba(0,70,67,0.6)] mt-2 max-w-2xl">
        Questions about a subject, a past paper or a course? Send us a message.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-6 h-fit">
          <h2 className="font-bold text-[#004643]">Reach us directly</h2>
          <p className="text-sm text-[rgba(0,70,67,0.78)] mt-3">
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

        <form
          onSubmit={onSubmit}
          className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-6 space-y-4"
        >
          <div>
            <label htmlFor="contact-name" className="text-sm font-bold text-[#004643]">
              Your name
            </label>
            <input
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-[rgba(0,70,67,0.25)] rounded-xl px-3 py-2 text-sm bg-white outline-none focus:border-[var(--zass-primary)]"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="text-sm font-bold text-[#004643]">
              Message
            </label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
              className="mt-1 w-full border border-[rgba(0,70,67,0.25)] rounded-xl px-3 py-2 text-sm bg-white outline-none focus:border-[var(--zass-primary)]"
              placeholder="Write your message..."
            />
          </div>
          <button
            type="submit"
            className="bg-[var(--zass-primary)] text-white font-bold text-sm px-6 py-2.5 rounded-full"
          >
            Send via email
          </button>
          {sentNote && (
            <p className="text-sm text-[rgba(0,70,67,0.6)]">{sentNote}</p>
          )}
          <p className="text-xs text-[rgba(0,70,67,0.6)]">
            This opens your own email app — v1 has no server to receive
            messages yet.
          </p>
        </form>
      </div>
    </div>
  );
}
