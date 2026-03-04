"use client";

import type { ReactNode } from "react";

export const sectionCardClassName =
  "rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(24,24,27,0.9)_0%,rgba(9,9,11,0.92)_100%)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)]";
export const panelCardClassName = "rounded-2xl border border-white/8 bg-zinc-950/70 p-5";
export const fieldClassName =
  "w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-white/60";
export const primaryButtonClassName = "rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200";
export const secondaryButtonClassName =
  "rounded-full border border-white/12 bg-white/4 px-4 py-3 text-sm text-white transition hover:border-white hover:bg-white/10";
export const subtleButtonClassName = "text-sm text-gray-400 transition hover:text-white";

export function formatStatus(kind: "success" | "error", message: string) {
  return `${kind}|${message}`;
}

export function parseLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function StatusBanner({ value }: { value?: string }) {
  if (!value) return null;

  const [kind, message] = value.split("|");
  const className =
    kind === "success"
      ? "border-emerald-900 bg-emerald-950/30 text-emerald-200"
      : "border-red-900 bg-red-950/30 text-red-200";

  return <p className={`mb-4 rounded-2xl border px-4 py-3 text-sm ${className}`}>{message}</p>;
}

export function SectionCard({
  eyebrow,
  title,
  description,
  actions,
  status,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  status?: string;
  children: ReactNode;
}) {
  return (
    <section className={sectionCardClassName}>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{eyebrow}</p>
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-400">{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
      <StatusBanner value={status} />
      {children}
    </section>
  );
}

export function EditorCard({
  title,
  subtitle,
  onRemove,
  children,
}: {
  title: string;
  subtitle: string;
  onRemove: () => void;
  children: ReactNode;
}) {
  return (
    <div className={panelCardClassName}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{subtitle}</p>
        </div>
        <button type="button" onClick={onRemove} className={subtleButtonClassName}>
          Remove
        </button>
      </div>
      {children}
    </div>
  );
}
