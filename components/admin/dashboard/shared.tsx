"use client";

import type { ReactNode } from "react";

export const sectionCardClassName =
  "relative overflow-hidden rounded-[32px] border border-cyan-800/30 bg-[linear-gradient(145deg,rgba(16,20,28,0.6)_0%,rgba(9,10,14,0.4)_100%)] p-6 sm:p-8 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/5 transition-all duration-500 hover:border-cyan-500/30 hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.15)] backdrop-blur-2xl";
export const panelCardClassName =
  "relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 shadow-lg transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] backdrop-blur-md";
export const fieldClassName =
  "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-cyan-400/50 focus:bg-black/60 focus:shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)] focus:ring-1 focus:ring-cyan-400/50 backdrop-blur-sm";
export const primaryButtonClassName =
  "group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] ring-1 ring-white/10 transition-all duration-300 hover:scale-[1.02] hover:from-cyan-400 hover:to-blue-500 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.6)] active:scale-[0.98]";
export const secondaryButtonClassName =
  "relative inline-flex items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-950/30 px-6 py-3 text-sm font-medium tracking-wide text-cyan-50 transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/50 hover:bg-cyan-900/40 hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)] active:scale-[0.98] backdrop-blur-md";
export const subtleButtonClassName =
  "group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-gray-400 transition-all duration-200 hover:bg-white/5 hover:text-cyan-300 active:scale-95";

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
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
      : "border-red-500/30 bg-red-500/10 text-red-200 shadow-[0_0_20px_rgba(239,68,68,0.1)]";

  return (
    <div className={`mb-6 flex animate-in fade-in slide-in-from-top-2 items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm font-medium backdrop-blur-md ${className}`}>
      {kind === "success" ? (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">✓</span>
      ) : (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20 text-red-400">!</span>
      )}
      <p>{message}</p>
    </div>
  );
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
      <div className="mb-8 flex flex-col gap-4 border-b border-white/5 pb-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1.5">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-400">
            <span className="h-px w-4 bg-cyan-400/50" />
            {eyebrow}
          </p>
          <h2 className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">{title}</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-500">{description}</p>
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
      <div className="mb-6 flex flex-col gap-4 border-b border-white/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 ring-1 ring-white/10">
            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-tight text-white">{title}</h3>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">{subtitle}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="group inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-red-400 transition-all duration-300 hover:scale-[1.02] hover:border-red-400/50 hover:bg-red-500/20 hover:text-red-300 hover:shadow-[0_0_15px_-3px_rgba(239,68,68,0.3)] active:scale-[0.98]"
        >
          <svg className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Remove
        </button>
      </div>
      {children}
    </div>
  );
}
