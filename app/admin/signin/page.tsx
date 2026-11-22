"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadAdminSetup, setAdminAuthed, verifyPin } from "../../../lib/store";
import { Card, Field, PrimaryButton, inputCls } from "../ui";

export default function AdminSigninPage() {
  const router = useRouter();
  const [adminName, setAdminName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  // Read the saved setup (browser-only) after mount.
  useEffect(() => {
    const setup = loadAdminSetup();
    if (!setup) {
      router.replace("/admin/setup");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- admin name from localStorage after mount (see above)
    setAdminName(setup.name);
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setChecking(true);
    try {
      if (await verifyPin(pin)) {
        setAdminAuthed(true);
        router.push("/admin");
      } else {
        setError("Wrong PIN - please try again.");
        setPin("");
      }
    } finally {
      setChecking(false);
    }
  };

  return (
    <Card title="Admin sign in">
      {adminName ? (
        <p className="mb-5 text-sm">
          Welcome back,{" "}
          <strong className="text-[#004643]">{adminName}</strong>. Enter your
          PIN to continue.
        </p>
      ) : (
        <p className="mb-5 text-sm">Enter your admin PIN to continue.</p>
      )}
      <form onSubmit={submit} className="space-y-4">
        <Field label="PIN">
          <input
            className={inputCls}
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            autoComplete="current-password"
            placeholder="••••••"
            autoFocus
          />
        </Field>
        {error ? (
          <p className="rounded-lg bg-[rgba(0,70,67,0.06)] px-3 py-2 text-sm font-medium text-[#004643]">
            {error}
          </p>
        ) : null}
        <PrimaryButton type="submit" disabled={checking || pin.length === 0}>
          {checking ? "Checking…" : "Sign in"}
        </PrimaryButton>
      </form>
    </Card>
  );
}
