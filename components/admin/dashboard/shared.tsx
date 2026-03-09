"use client";

import type { ReactNode } from "react";
import { FaCheck, FaExclamation } from "react-icons/fa6";

export const sectionCardClassName =
    "relative overflow-hidden rounded-[28px] border border-cyan-700/40 bg-linear-to-br from-slate-900/60 via-slate-800/40 to-slate-900/50 p-6 sm:p-8 shadow-2xl shadow-cyan-900/20 ring-1 ring-inset ring-cyan-400/10 transition-all duration-500 hover:border-cyan-600/50 hover:shadow-[0_0_50px_-15px_rgba(34,211,238,0.2)] hover:ring-cyan-400/20 backdrop-blur-2xl group";
export const panelCardClassName =
    "relative overflow-hidden rounded-2xl border border-cyan-700/20 bg-linear-to-br from-slate-900/30 to-slate-800/20 p-5 shadow-md shadow-black/20 transition-all duration-300 hover:border-cyan-600/30 hover:bg-cyan-950/15 hover:shadow-[0_0_25px_-8px_rgba(34,211,238,0.1)] backdrop-blur-md";
export const fieldClassName =
    "w-full rounded-lg border border-cyan-700/30 bg-slate-950/60 px-4 py-2.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-cyan-500/70 focus:bg-slate-950/80 focus:shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] focus:ring-1 focus:ring-cyan-400/60 backdrop-blur-sm";
export const textareaClassName =
    "w-full rounded-lg border border-cyan-700/30 bg-slate-950/60 px-4 py-2.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-cyan-500/70 focus:bg-slate-950/80 focus:shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] focus:ring-1 focus:ring-cyan-400/60 backdrop-blur-sm resize-vertical";
export const primaryButtonClassName =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-linear-to-r from-cyan-600 via-blue-600 to-cyan-600 px-8 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_0_25px_-5px_rgba(34,211,238,0.5)] ring-1 ring-cyan-400/30 transition-all duration-300 hover:scale-105 hover:from-cyan-500 hover:via-blue-500 hover:to-cyan-500 hover:shadow-[0_0_35px_-5px_rgba(34,211,238,0.7)] hover:ring-cyan-300/50 active:scale-[0.98]";
export const secondaryButtonClassName =
    "relative inline-flex items-center justify-center rounded-full border border-cyan-600/40 bg-cyan-950/40 px-6 py-2.5 text-sm font-medium tracking-wide text-cyan-100 transition-all duration-300 hover:scale-105 hover:border-cyan-500/60 hover:bg-cyan-900/50 hover:shadow-[0_0_25px_-5px_rgba(34,211,238,0.3)] hover:text-cyan-50 active:scale-[0.98] backdrop-blur-md";
export const subtleButtonClassName =
    "group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-cyan-500/10 hover:text-cyan-200 active:scale-95";

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
            ? "border-emerald-600/40 bg-emerald-950/30 text-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.15)]"
            : "border-red-600/40 bg-red-950/30 text-red-200 shadow-[0_0_25px_rgba(239,68,68,0.15)]";

    return (
        <div
            className={`mb-6 flex animate-in fade-in slide-in-from-top-3 items-center gap-3 rounded-xl border px-5 py-3 text-sm font-medium backdrop-blur-md transition-all ${className}`}
        >
            {kind === "success" ? (
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/30 text-emerald-300">
                    <FaCheck className="h-3 w-3" />
                </span>
            ) : (
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/30 text-red-300">
                    <FaExclamation className="h-3 w-3" />
                </span>
            )}
            <p className="flex-1">{message}</p>
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
            <div className="relative mb-8 flex flex-col gap-4 border-b border-cyan-700/20 pb-6 md:flex-row md:items-end md:justify-between">
                <div className="space-y-2.5">
                    <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.35em] text-cyan-300/90">
                        <span className="h-px w-5 bg-linear-to-r from-cyan-500 to-transparent" />
                        {eyebrow}
                    </p>
                    <h2 className="bg-linear-to-r from-white via-white to-cyan-100 bg-clip-text text-3xl font-bold tracking-tighter text-transparent">
                        {title}
                    </h2>
                    <p className="max-w-3xl text-sm leading-relaxed text-gray-400">{description}</p>
                </div>
                {actions ? <div className="flex flex-wrap gap-3 md:ml-auto">{actions}</div> : null}
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
        <div className="relative overflow-hidden rounded-3xl border border-cyan-700/25 bg-linear-to-br from-slate-900/40 to-slate-800/20 p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:border-cyan-600/35 hover:bg-cyan-950/10 backdrop-blur-md ring-1 ring-inset ring-cyan-400/5">
            <div className="mb-6 flex flex-col gap-4 border-b border-cyan-700/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-cyan-600/30 to-blue-600/20 ring-1 ring-cyan-500/30 shadow-lg shadow-cyan-500/10">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold tracking-tight text-white">{title}</h3>
                        <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400/60">{subtitle}</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onRemove}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-red-600/40 bg-red-950/30 px-4 py-2 text-xs font-semibold tracking-wider text-red-300 transition-all duration-300 hover:scale-105 hover:border-red-500/60 hover:bg-red-900/40 hover:text-red-200 hover:shadow-[0_0_20px_-3px_rgba(239,68,68,0.4)] active:scale-[0.98]"
                >
                    <svg
                        className="h-4 w-4 transition-transform group-hover:rotate-90"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Remove
                </button>
            </div>
            {children}
        </div>
    );
}
