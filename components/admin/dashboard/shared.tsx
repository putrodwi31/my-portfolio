"use client";

import type { ComponentType, ReactNode } from "react";
import { FaCheck, FaExclamation } from "react-icons/fa6";

export const sectionCardClassName =
    "relative overflow-hidden rounded-[28px] border border-cyan-700/40 bg-linear-to-br from-slate-900/60 via-slate-800/40 to-slate-900/50 p-6 sm:p-8 shadow-2xl shadow-cyan-900/20 ring-1 ring-inset ring-cyan-400/10 transition-all duration-500 hover:border-cyan-600/50 hover:shadow-[0_0_50px_-15px_rgba(34,211,238,0.2)] hover:ring-cyan-400/20 backdrop-blur-2xl group";
export const panelCardClassName =
    "relative overflow-hidden rounded-2xl border border-cyan-700/20 bg-linear-to-br from-slate-900/30 to-slate-800/20 p-5 shadow-md shadow-black/20 transition-all duration-300 hover:border-cyan-600/30 hover:bg-cyan-950/15 hover:shadow-[0_0_25px_-8px_rgba(34,211,238,0.1)] backdrop-blur-md";
export const fieldClassName =
    "w-full rounded-xl border border-white/10 bg-slate-950/75 px-4 py-2.5 text-sm text-slate-100 outline-none transition-all duration-200 placeholder:text-slate-600 hover:border-white/20 hover:bg-slate-900/70 focus:border-cyan-500/60 focus:bg-slate-900/80 focus:ring-2 focus:ring-cyan-500/15";
export const textareaClassName =
    "field-textarea w-full rounded-xl border border-white/10 bg-slate-950/75 px-4 py-3 text-sm text-slate-100 outline-none transition-all duration-200 placeholder:text-slate-600 hover:border-white/20 hover:bg-slate-900/70 focus:border-cyan-500/60 focus:bg-slate-900/80 focus:ring-2 focus:ring-cyan-500/15";
export const selectClassName =
    "field-select w-full rounded-xl border border-white/10 bg-slate-950/75 px-4 py-2.5 text-sm text-slate-100 outline-none transition-all duration-200 hover:border-white/20 hover:bg-slate-900/70 focus:border-cyan-500/60 focus:bg-slate-900/80 focus:ring-2 focus:ring-cyan-500/15 cursor-pointer";
export const labelClassName = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400";
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
    const isSuccess = kind === "success";
    const className = isSuccess
        ? "border-emerald-600/40 bg-emerald-950/30 text-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.12)]"
        : "border-red-600/40 bg-red-950/30 text-red-200 shadow-[0_0_25px_rgba(239,68,68,0.12)]";

    return (
        <div
            className={`mb-6 flex animate-in fade-in slide-in-from-top-3 items-center gap-3 rounded-xl border px-5 py-3.5 text-sm font-medium backdrop-blur-md ${className}`}
        >
            {isSuccess ? (
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 ring-1 ring-emerald-500/40 text-emerald-300">
                    <FaCheck className="h-3 w-3" />
                </span>
            ) : (
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20 ring-1 ring-red-500/40 text-red-300">
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
    icon: SectionIcon,
}: {
    eyebrow: string;
    title: string;
    description: string;
    actions?: ReactNode;
    status?: string;
    children: ReactNode;
    icon?: ComponentType<{ className?: string }>;
}) {
    return (
        <section className={sectionCardClassName}>
            {/* Top edge highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/40 to-transparent" />

            {/* Section header */}
            <div className="relative mb-8 flex flex-col gap-5 border-b border-cyan-700/20 pb-6 md:flex-row md:items-end md:justify-between">
                <div className="flex items-start gap-4">
                    {/* Icon badge */}
                    {SectionIcon && (
                        <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-600/30 bg-cyan-950/60 shadow-lg shadow-cyan-900/20 ring-1 ring-inset ring-cyan-400/10 transition-all duration-300 group-hover:border-cyan-500/50 group-hover:bg-cyan-900/40 group-hover:shadow-cyan-900/30">
                            <SectionIcon className="h-5 w-5 text-cyan-400 transition-colors duration-300 group-hover:text-cyan-300" />
                        </div>
                    )}

                    <div className="space-y-2">
                        <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.35em] text-cyan-300/80">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                            </span>
                            {eyebrow}
                        </p>
                        <h2 className="bg-linear-to-r from-white via-white to-cyan-100/80 bg-clip-text text-3xl font-bold tracking-tighter text-transparent">
                            {title}
                        </h2>
                        <p className="max-w-3xl text-sm leading-relaxed text-gray-400">{description}</p>
                    </div>
                </div>

                {actions ? <div className="flex flex-wrap gap-3 md:ml-auto md:shrink-0">{actions}</div> : null}
            </div>

            <StatusBanner value={status} />
            {children}
        </section>
    );
}

export function EditorCard({
    title,
    subtitle,
    index,
    onRemove,
    children,
}: {
    title: string;
    subtitle: string;
    index?: number;
    onRemove: () => void;
    children: ReactNode;
}) {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-linear-to-br from-slate-900/50 to-slate-800/25 shadow-lg shadow-black/25 ring-1 ring-inset ring-white/5 backdrop-blur-md transition-all duration-300 hover:border-cyan-700/30 hover:shadow-xl hover:shadow-cyan-900/10">
            {/* Top edge highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-white/5 bg-white/2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    {/* Number badge or pulse dot */}
                    {index !== undefined ? (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-600/30 bg-linear-to-br from-cyan-600/20 to-blue-600/15 text-xs font-bold text-cyan-300 shadow-lg shadow-cyan-900/20 ring-1 ring-inset ring-cyan-400/15">
                            {String(index + 1).padStart(2, "0")}
                        </div>
                    ) : (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-600/25 bg-linear-to-br from-cyan-600/15 to-blue-600/10 ring-1 ring-inset ring-cyan-400/10 shadow-lg shadow-cyan-900/15">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                        </div>
                    )}

                    <div>
                        <h3 className="text-sm font-bold tracking-tight text-white">{title}</h3>
                        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-cyan-400/50 mt-0.5">{subtitle}</p>
                    </div>
                </div>

                {/* Remove button */}
                <button
                    type="button"
                    onClick={onRemove}
                    className="group inline-flex items-center gap-2 rounded-full border border-red-600/30 bg-red-950/20 px-4 py-2 text-xs font-semibold tracking-wider text-red-400/80 transition-all duration-300 hover:scale-105 hover:border-red-500/50 hover:bg-red-900/35 hover:text-red-300 hover:shadow-[0_0_18px_-3px_rgba(239,68,68,0.35)] active:scale-[0.98] sm:self-auto self-start"
                >
                    <svg
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-90"
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

            {/* Content */}
            <div className="p-6">{children}</div>
        </div>
    );
}
