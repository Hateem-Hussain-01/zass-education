// Shared admin UI bits (not a route - only page.tsx / layout.tsx are routes).
import type { ButtonHTMLAttributes, ReactNode } from "react";

export const inputCls =
  "w-full rounded-xl border border-[rgba(0,70,67,0.25)] bg-white px-3 py-2 text-sm text-[rgba(0,70,67,0.78)] outline-none focus:border-[var(--zass-primary)] focus:ring-2 focus:ring-[var(--zass-primary)]/30";
export const labelCls =
  "mb-1 block text-sm font-bold text-[#004643]";

export function Card({
  title,
  children,
  actions,
}: {
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[rgba(0,70,67,0.15)] bg-[var(--zass-card)] p-4 shadow-sm sm:p-6">
      {title ? (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-extrabold text-[#004643]">{title}</h2>
          {actions}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-[rgba(0,70,67,0.6)]">{hint}</span> : null}
    </label>
  );
}

export function SampleBadge() {
  return (
    <span className="inline-block rounded-full bg-[var(--zass-accent)]/15 px-2 py-0.5 text-xs font-semibold text-[var(--zass-accent)]">
      Sample
    </span>
  );
}

export function PrimaryButton({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="rounded-full bg-[var(--zass-primary)] px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  );
}

export function DangerButton({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="rounded-full border-2 border-[rgba(0,70,67,0.3)] px-4 py-2 text-sm font-bold text-[#004643] hover:bg-[rgba(0,70,67,0.06)]"
      {...props}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="rounded-full border border-[rgba(0,70,67,0.25)] bg-white px-4 py-2 text-sm font-bold text-[#004643] hover:bg-[rgba(0,70,67,0.04)]"
      {...props}
    >
      {children}
    </button>
  );
}
