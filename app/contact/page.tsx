"use client";

import { useState } from "react";
import { useSettings } from "@/lib/store";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export default function ContactPage() {
  const { settings } = useSettings();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sentNote, setSentNote] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Message from ${name || "a student"} - ${settings.siteName}`,
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
    <div>
      <PageHero
        eyebrow="Get in touch"
        title="Contact"
        description="Questions about a subject, a past paper or a course? Send us a message."
        image="/images/purdue/c4.png"
        imageAlt="Books on a study desk"
      />
      <section className="bg-[var(--zass-card)] border-t-2 border-[rgba(0,70,67,0.12)] px-5 md:px-14 py-11">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[rgba(0,70,67,0.6)]">
                Contact Us
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-[#004643] md:text-[28px]">
                We&apos;d Love to Hear From You
              </h2>
              <p className="mt-2 text-sm text-[rgba(0,70,67,0.6)] max-w-2xl mx-auto">
                Reach us directly, or send a message using the form.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-6 h-fit shadow-sm">
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
                className="bg-[var(--zass-card)] border border-[rgba(0,70,67,0.15)] rounded-2xl p-6 space-y-4 shadow-sm"
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
                  className="bg-[var(--zass-primary)] text-white font-bold text-sm px-6 py-2.5 rounded-full hover:opacity-90"
                >
                  Send via email
                </button>
                {sentNote && (
                  <p className="text-sm text-[rgba(0,70,67,0.6)]">{sentNote}</p>
                )}
                <p className="text-xs text-[rgba(0,70,67,0.6)]">
                  This opens your own email app - v1 has no server to receive
                  messages yet.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
