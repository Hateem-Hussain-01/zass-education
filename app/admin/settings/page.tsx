"use client";

import { useEffect, useState } from "react";
import type { SiteSettings } from "../../../lib/types";
import { useSettings } from "../../../lib/store";
import {
  Card,
  DangerButton,
  Field,
  PrimaryButton,
  inputCls,
} from "../ui";

type FormState = Omit<SiteSettings, "palette"> & {
  palette: { base: string; card: string; primary: string; accent: string };
};

function toForm(s: SiteSettings): FormState {
  return { ...s, palette: { ...s.palette } };
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-slate-300 bg-white p-1"
          aria-label={`${label} colour picker`}
        />
        <input
          className={inputCls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#004643"
          spellCheck={false}
        />
      </div>
    </Field>
  );
}

export default function SettingsAdmin() {
  const { settings, update, updatePalette, reset } = useSettings();
  const [form, setForm] = useState<FormState>(() => toForm(settings));
  const [saved, setSaved] = useState(false);

  // Settings load from localStorage after mount; keep the form in sync
  // until the admin starts editing (save/reset only change settings).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- form syncs from settings loaded after mount (see above)
    setForm(toForm(settings));
  }, [settings]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const { palette, ...rest } = form;
    update(rest);
    updatePalette(palette);
    setSaved(true);
  };

  const doReset = () => {
    if (!window.confirm("Reset all settings to the Zass defaults?")) return;
    reset();
    setSaved(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Settings</h1>
        <p className="mt-1 text-sm">
          Settings apply immediately across the public site and are saved in
          this browser only.
        </p>
      </div>

      <form onSubmit={save} className="space-y-6">
        <Card title="Site">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Site name">
              <input
                className={inputCls}
                value={form.siteName}
                onChange={(e) => set("siteName", e.target.value)}
              />
            </Field>
            <Field label="Logo text">
              <input
                className={inputCls}
                value={form.logoText}
                onChange={(e) => set("logoText", e.target.value)}
              />
            </Field>
            <Field label="Tagline">
              <input
                className={inputCls}
                value={form.tagline}
                onChange={(e) => set("tagline", e.target.value)}
              />
            </Field>
            <Field label="Footer text">
              <input
                className={inputCls}
                value={form.footerText}
                onChange={(e) => set("footerText", e.target.value)}
              />
            </Field>
          </div>
        </Card>

        <Card title="Hero">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Hero badge">
              <input
                className={inputCls}
                value={form.heroBadge}
                onChange={(e) => set("heroBadge", e.target.value)}
              />
            </Field>
            <Field label="Hero search placeholder">
              <input
                className={inputCls}
                value={form.heroSearchPlaceholder}
                onChange={(e) => set("heroSearchPlaceholder", e.target.value)}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Hero headline" hint="Use a new line for a line break.">
                <textarea
                  className={inputCls}
                  rows={2}
                  value={form.heroHeadline}
                  onChange={(e) => set("heroHeadline", e.target.value)}
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Hero subtext">
                <textarea
                  className={inputCls}
                  rows={3}
                  value={form.heroSubtext}
                  onChange={(e) => set("heroSubtext", e.target.value)}
                />
              </Field>
            </div>
            <Field label="Hero button text">
              <input
                className={inputCls}
                value={form.heroCta}
                onChange={(e) => set("heroCta", e.target.value)}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Rating stat">
                <input
                  className={inputCls}
                  value={form.statsRating}
                  onChange={(e) => set("statsRating", e.target.value)}
                />
              </Field>
              <Field label="Learners stat">
                <input
                  className={inputCls}
                  value={form.statsLearners}
                  onChange={(e) => set("statsLearners", e.target.value)}
                />
              </Field>
            </div>
          </div>
        </Card>

        <Card title="Announcement">
          <div className="space-y-4">
            <Field label="Announcement text">
              <input
                className={inputCls}
                value={form.announcementText}
                onChange={(e) => set("announcementText", e.target.value)}
              />
            </Field>
            <label className="flex items-center gap-2 text-sm font-medium text-[#0F172A]">
              <input
                type="checkbox"
                checked={form.announcementOn}
                onChange={(e) => set("announcementOn", e.target.checked)}
                className="h-4 w-4 accent-[var(--zass-primary)]"
              />
              Show announcement banner
            </label>
          </div>
        </Card>

        <Card title="Contact">
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Contact email">
              <input
                className={inputCls}
                type="email"
                value={form.contactEmail}
                onChange={(e) => set("contactEmail", e.target.value)}
              />
            </Field>
            <Field label="Contact phone">
              <input
                className={inputCls}
                value={form.contactPhone}
                onChange={(e) => set("contactPhone", e.target.value)}
              />
            </Field>
            <Field label="Contact WhatsApp (URL)">
              <input
                className={inputCls}
                value={form.contactWhatsapp}
                onChange={(e) => set("contactWhatsapp", e.target.value)}
              />
            </Field>
          </div>
        </Card>

        <Card title="Social links">
          <p className="mb-4 text-sm">
            Leave a field empty to hide that link on the public site.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="WhatsApp URL">
              <input
                className={inputCls}
                value={form.socialWhatsapp}
                onChange={(e) => set("socialWhatsapp", e.target.value)}
                placeholder="https://wa.me/…"
              />
            </Field>
            <Field label="Facebook URL">
              <input
                className={inputCls}
                value={form.socialFacebook}
                onChange={(e) => set("socialFacebook", e.target.value)}
                placeholder="https://facebook.com/…"
              />
            </Field>
            <Field label="Instagram URL">
              <input
                className={inputCls}
                value={form.socialInstagram}
                onChange={(e) => set("socialInstagram", e.target.value)}
                placeholder="https://instagram.com/…"
              />
            </Field>
            <Field label="LinkedIn URL">
              <input
                className={inputCls}
                value={form.socialLinkedin}
                onChange={(e) => set("socialLinkedin", e.target.value)}
                placeholder="https://linkedin.com/…"
              />
            </Field>
            <Field label="YouTube URL">
              <input
                className={inputCls}
                value={form.socialYoutube}
                onChange={(e) => set("socialYoutube", e.target.value)}
                placeholder="https://youtube.com/…"
              />
            </Field>
          </div>
        </Card>

        <Card title="SEO">
          <div className="grid gap-4">
            <Field label="SEO title">
              <input
                className={inputCls}
                value={form.seoTitle}
                onChange={(e) => set("seoTitle", e.target.value)}
              />
            </Field>
            <Field label="SEO description">
              <textarea
                className={inputCls}
                rows={2}
                value={form.seoDescription}
                onChange={(e) => set("seoDescription", e.target.value)}
              />
            </Field>
          </div>
        </Card>

        <Card title="Palette">
          <div className="grid gap-4 sm:grid-cols-2">
            <ColorField
              label="Base (background)"
              value={form.palette.base}
              onChange={(v) =>
                setForm((f) => ({ ...f, palette: { ...f.palette, base: v } }))
              }
            />
            <ColorField
              label="Card"
              value={form.palette.card}
              onChange={(v) =>
                setForm((f) => ({ ...f, palette: { ...f.palette, card: v } }))
              }
            />
            <ColorField
              label="Primary (Cyprus)"
              value={form.palette.primary}
              onChange={(v) =>
                setForm((f) => ({
                  ...f,
                  palette: { ...f.palette, primary: v },
                }))
              }
            />
            <ColorField
              label="Accent (orange)"
              value={form.palette.accent}
              onChange={(v) =>
                setForm((f) => ({ ...f, palette: { ...f.palette, accent: v } }))
              }
            />
          </div>
        </Card>

        <div className="flex flex-wrap items-center gap-3">
          <PrimaryButton type="submit">Save settings</PrimaryButton>
          <DangerButton onClick={doReset}>Reset to defaults</DangerButton>
          {saved ? (
            <span className="rounded-lg bg-[var(--zass-card)] px-3 py-2 text-sm font-semibold text-[var(--zass-primary)]">
              Saved
            </span>
          ) : null}
        </div>
      </form>
    </div>
  );
}
