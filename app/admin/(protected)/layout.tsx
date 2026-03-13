import type { ReactNode } from "react";
import { FaStar, FaFileLines, FaCloud } from "react-icons/fa6";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { requireAdminSession } from "@/lib/auth";

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
    const session = await requireAdminSession();

    return (
        <main className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 selection:bg-cyan-500/30">
            {/* Top accent line */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-cyan-500/60 to-transparent" />

            {/* Header */}
            <div className="relative z-10 border-b border-cyan-700/20 bg-linear-to-b from-slate-900/90 to-slate-950/70 backdrop-blur-3xl">
                {/* Background glows */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-cyan-600/5 via-transparent to-transparent" />
                <div className="pointer-events-none absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-cyan-500/8 blur-[80px]" />
                <div className="pointer-events-none absolute -top-32 right-1/3 h-48 w-48 rounded-full bg-blue-600/8 blur-[70px]" />

                <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Main header row */}
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        {/* Left: branding & title */}
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-2.5">
                                <span className="inline-flex items-center gap-2.5 rounded-full border border-cyan-600/40 bg-cyan-950/50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-200 backdrop-blur-sm shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                                    </span>
                                    Admin Panel
                                </span>
                                <span className="rounded-full border border-emerald-600/30 bg-emerald-950/30 px-3 py-1 text-[10px] font-semibold text-emerald-300 shadow-[0_0_12px_-3px_rgba(16,185,129,0.3)]">
                                    ● Live
                                </span>
                            </div>
                            <h1 className="bg-linear-to-br from-white via-cyan-50 to-white/60 bg-clip-text text-4xl font-bold tracking-tighter text-transparent">
                                Portfolio Master Data
                            </h1>
                            <p className="max-w-xl text-sm leading-relaxed text-gray-400">
                                Kelola semua konten portfolio dari satu dashboard.{" "}
                                <span className="font-medium text-cyan-300">Perubahan langsung tayang otomatis.</span>
                            </p>
                        </div>

                        {/* Right: user card + logout */}
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-cyan-700/30 hover:bg-cyan-950/20">
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-cyan-500/5 to-transparent" />
                                <div className="relative flex items-center gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-500/30 bg-linear-to-br from-cyan-600/30 to-blue-600/30 text-sm font-bold text-cyan-100 shadow-lg shadow-cyan-900/30">
                                        {session.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold leading-tight text-white">{session.name}</p>
                                        <p className="text-xs text-cyan-300/60">{session.email}</p>
                                    </div>
                                </div>
                            </div>
                            <AdminLogoutButton />
                        </div>
                    </div>

                    {/* Feature cards */}
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {[
                            {
                                title: "Portfolio",
                                description: "Site settings, resume, dan social links",
                                Icon: FaStar,
                                iconBg: "bg-cyan-950/60 border-cyan-600/30",
                                iconColor: "text-cyan-400",
                                borderColor: "border-cyan-700/25",
                                hoverBorder: "hover:border-cyan-600/40",
                                hoverGlow: "hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)]",
                                dotColor: "bg-cyan-400",
                            },
                            {
                                title: "Content",
                                description: "Projects, pengalaman kerja, info entries",
                                Icon: FaFileLines,
                                iconBg: "bg-violet-950/60 border-violet-600/30",
                                iconColor: "text-violet-400",
                                borderColor: "border-violet-700/25",
                                hoverBorder: "hover:border-violet-600/40",
                                hoverGlow: "hover:shadow-[0_0_30px_-10px_rgba(139,92,246,0.2)]",
                                dotColor: "bg-violet-400",
                            },
                            {
                                title: "Assets",
                                description: "Upload & kelola media dengan mudah",
                                Icon: FaCloud,
                                iconBg: "bg-emerald-950/60 border-emerald-600/30",
                                iconColor: "text-emerald-400",
                                borderColor: "border-emerald-700/25",
                                hoverBorder: "hover:border-emerald-600/40",
                                hoverGlow: "hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)]",
                                dotColor: "bg-emerald-400",
                            },
                        ].map(({ title, description, Icon, iconBg, iconColor, borderColor, hoverBorder, hoverGlow, dotColor }) => (
                            <div
                                key={title}
                                className={`group relative overflow-hidden rounded-2xl border ${borderColor} bg-linear-to-br from-slate-900/40 to-slate-800/20 p-5 backdrop-blur-md transition-all duration-300 ${hoverBorder} ${hoverGlow} hover:-translate-y-0.5`}
                            >
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/2 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                <div className="relative flex items-start gap-4">
                                    <div
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${iconBg} shadow-inner transition-all duration-300 group-hover:scale-110`}
                                    >
                                        <Icon className={`h-5 w-5 ${iconColor}`} />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-bold text-white">{title}</p>
                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${dotColor} opacity-50 group-hover:opacity-80 transition-opacity`}
                                            />
                                        </div>
                                        <p className="mt-1 text-xs leading-relaxed text-gray-400">{description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Page content */}
            <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="pointer-events-none absolute top-0 right-1/4 h-96 w-96 rounded-full bg-cyan-600/5 blur-[120px]" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blue-600/5 blur-[100px]" />
                {children}
            </div>
        </main>
    );
}
