"use client";

import type { ReactNode } from "react";

export const sectionCardClassName =
  "rounded-[30px] border border-cyan-300/15 bg-[linear-gradient(145deg,rgba(16,20,28,0.98)_0%,rgba(9,10,14,0.94)_45%,rgba(7,7,9,0.95)_100%)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] ring-1 ring-inset ring-white/4";
export const panelCardClassName =
  "rounded-2xl border border-cyan-200/10 bg-[linear-gradient(180deg,rgba(14,15,20,0.95)_0%,rgba(7,7,10,0.9)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]";
export const fieldClassName =
  "w-full rounded-xl border border-white/12 bg-zinc-950/80 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-300/70 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.12)]";
export const primaryButtonClassName =
  "rounded-full bg-[linear-gradient(90deg,#d6f7ff_0%,#ffffff_50%,#d2eefc_100%)] px-5 py-3 text-sm font-semibold text-black transition hover:brightness-95";
export const secondaryButtonClassName =
  "rounded-full border border-white/20 bg-white/6 px-4 py-3 text-sm text-white transition hover:border-cyan-300/60 hover:bg-cyan-300/10";
export const subtleButtonClassName = "text-sm text-gray-400 transition hover:text-cyan-200";

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
      ? "border-emerald-700/60 bg-emerald-950/35 text-emerald-100"
      : "border-red-700/60 bg-red-950/30 text-red-100";

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
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">{eyebrow}</p>
          <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
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
          <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/50">{subtitle}</p>
        </div>
        <button type="button" onClick={onRemove} className={subtleButtonClassName}>
          Remove
        </button>
      </div>
      {children}
    </div>
  );
}
