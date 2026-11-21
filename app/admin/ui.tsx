// Shared admin UI bits (not a route — only page.tsx / layout.tsx are routes).
import type { ButtonHTMLAttributes, ReactNode } from "react";

export const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0F172A] outline-none focus:border-[var(--zass-primary)] focus:ring-2 focus:ring-[var(--zass-primary)]/30";
export const labelCls =
  "mb-1 block text-sm font-medium text-[#0F172A]";

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
    <section className="rounded-xl border border-slate-200 bg-[var(--zass-card)] p-4 shadow-sm sm:p-5">
      {title ? (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-[#0F172A]">{title}</h2>
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
      {hint ? <span className="mt-1 block text-xs text-[#475569]">{hint}</span> : null}
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
      className="rounded-lg bg-[var(--zass-primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
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
      className="rounded-lg border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
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
      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-[#0F172A] hover:bg-slate-50"
      {...props}
    >
      {children}
    </button>
  );
}
