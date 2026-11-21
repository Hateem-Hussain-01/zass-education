"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadAdminSetup, saveAdminSetup, setAdminAuthed, sha256Hex } from "../../../lib/store";
import { Card, Field, PrimaryButton, inputCls } from "../ui";

export default function AdminSetupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (loadAdminSetup()) router.replace("/admin/signin");
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(email.trim()))
      return setError("Please enter a valid email address.");
    if (!/^\d{6,}$/.test(pin))
      return setError("PIN must be at least 6 digits.");
    if (pin !== confirmPin) return setError("PINs do not match.");
    setSaving(true);
    try {
      saveAdminSetup({
        name: name.trim(),
        email: email.trim(),
        pinHash: await sha256Hex(pin),
      });
      setAdminAuthed(true);
      router.push("/admin");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title="Set up the Admin Portal">
      <p className="mb-5 text-sm">
        This is a one-time first-run setup. Create your admin account and a
        6-digit (or longer) PIN to sign in.
      </p>
      <form onSubmit={submit} className="space-y-4">
        <Field label="Your name">
          <input
            className={inputCls}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Your full name"
          />
        </Field>
        <Field label="Email">
          <input
            className={inputCls}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
          />
        </Field>
        <Field label="PIN (at least 6 digits)">
          <input
            className={inputCls}
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            autoComplete="new-password"
            placeholder="••••••"
          />
        </Field>
        <Field label="Confirm PIN">
          <input
            className={inputCls}
            type="password"
            inputMode="numeric"
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))}
            autoComplete="new-password"
            placeholder="••••••"
          />
        </Field>
        {error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}
        <p className="rounded-lg bg-[var(--zass-card)] px-3 py-2 text-sm">
          Your PIN lives only in this browser. There is no forgot-PIN in v1.
        </p>
        <PrimaryButton type="submit" disabled={saving}>
          {saving ? "Setting up…" : "Create admin account"}
        </PrimaryButton>
      </form>
    </Card>
  );
}
