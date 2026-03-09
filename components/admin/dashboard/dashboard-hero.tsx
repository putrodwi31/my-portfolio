"use client";

import { FaStar, FaBolt, FaCloud } from "react-icons/fa6";

export function DashboardHero({
    techStackCount,
    workExperienceCount,
    projectCount,
    infoEntryCount,
}: {
    techStackCount: number;
    workExperienceCount: number;
    projectCount: number;
    infoEntryCount: number;
}) {
    const summaryItems = [
        { label: "Tech Stack", value: techStackCount },
        { label: "Work Entries", value: workExperienceCount },
        { label: "Projects", value: projectCount },
        { label: "Info Entries", value: infoEntryCount },
    ];

    return (
        <section className="space-y-6">
            <div className="group relative overflow-hidden rounded-[28px] border border-cyan-700/40 bg-linear-to-br from-slate-900/70 via-cyan-950/30 to-slate-900/50 p-8 sm:p-10 shadow-2xl shadow-cyan-900/25 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-600/50 hover:shadow-[0_0_60px_-15px_rgba(34,211,238,0.25)]">
                <div className="pointer-events-none absolute -inset-px rounded-[28px] bg-linear-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-cyan-600/10 blur-[100px]" />

                <div className="relative space-y-6">
                    <p className="inline-flex items-center gap-2.5 rounded-full border border-cyan-600/40 bg-cyan-950/40 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.4em] text-cyan-200 backdrop-blur-sm">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" /> Dashboard Admin
                    </p>
                    <h2 className="max-w-3xl bg-linear-to-br from-white via-cyan-50 to-white/70 bg-clip-text text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tighter text-transparent">
                        Kelola semua master data portfolio dengan mudah.
                    </h2>
                    <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-gray-300">
                        Satu dashboard terpusat untuk mengatur konten utama, mengunggah media, update project, dan kelola pengalaman kerja.{" "}
                        <span className="text-cyan-200 font-medium">Sinkronisasi otomatis</span> memastikan semuanya selalu terbaru.
                    </p>
                    <div className="flex flex-wrap gap-2.5 pt-2">
                        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-100 shadow-[0_0_15px_-3px_rgba(34,211,238,0.2)]">
                            <FaStar className="h-4 w-4" /> Live Editing
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-600/30 bg-cyan-950/30 px-4 py-2 text-xs font-semibold text-cyan-200 transition-colors hover:bg-cyan-900/40 cursor-default">
                            <FaBolt className="h-4 w-4" /> Instant Sync
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-600/30 bg-cyan-950/30 px-4 py-2 text-xs font-semibold text-cyan-200 transition-colors hover:bg-cyan-900/40 cursor-default">
                            <FaCloud className="h-4 w-4" /> Cloud Storage
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {summaryItems.map((item, idx) => (
                    <div
                        key={item.label}
                        className="group relative overflow-hidden rounded-[20px] border border-cyan-700/30 bg-linear-to-br from-slate-900/50 to-slate-800/30 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-600/50 hover:bg-cyan-950/20 hover:shadow-[0_0_35px_-10px_rgba(34,211,238,0.2)] hover:-translate-y-1"
                        style={{
                            animationDelay: `${idx * 50}ms`,
                        }}
                    >
                        <div className="pointer-events-none absolute -inset-px bg-linear-to-br from-cyan-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400/80 transition-colors group-hover:text-cyan-300">
                            {item.label}
                        </p>
                        <p className="mt-4 flex items-baseline gap-2 text-4xl font-bold tracking-tight text-white transition-all group-hover:scale-110 group-hover:text-cyan-50">
                            {item.value}
                            <span className="text-sm text-gray-500 font-normal">items</span>
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
