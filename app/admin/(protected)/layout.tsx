import type { ReactNode } from "react";
import { FaStar, FaFileLines, FaCloud } from "react-icons/fa6";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { requireAdminSession } from "@/lib/auth";

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
    const session = await requireAdminSession();

    return (
        <main className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 selection:bg-cyan-500/30">
            <div className="relative z-10 border-b border-cyan-700/20 bg-linear-to-b from-slate-900/80 to-slate-950/60 backdrop-blur-3xl">
                <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-cyan-600/5 via-transparent to-transparent" />
                <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative space-y-3">
                            <p className="inline-flex items-center gap-2.5 rounded-full border border-cyan-600/40 bg-cyan-950/40 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-200 backdrop-blur-sm">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                                Admin Panel
                            </p>
                            <h1 className="bg-linear-to-br from-white via-cyan-50 to-white/70 bg-clip-text text-4xl font-bold tracking-tighter text-transparent">
                                Portfolio Master Data
                            </h1>
                            <p className="max-w-2xl text-base leading-relaxed text-gray-300">
                                Kelola semua konten portfolio dari satu dashboard.{" "}
                                <span className="font-medium text-cyan-200">Perubahan langsung tayang otomatis.</span>
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-4 sm:flex-row sm:items-center sm:gap-6">
                            <div className="group relative overflow-hidden rounded-xl border border-cyan-700/30 bg-linear-to-br from-cyan-950/40 to-slate-900/40 px-5 py-3.5 text-right backdrop-blur-md transition-all hover:border-cyan-600/50 hover:bg-cyan-950/50 shadow-lg shadow-black/20">
                                <div className="pointer-events-none absolute -inset-px bg-linear-to-br from-cyan-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100 rounded-xl" />
                                <p className="relative text-sm font-bold text-white">{session.name}</p>
                                <p className="relative text-xs font-medium text-cyan-300/70">{session.email}</p>
                            </div>
                            <AdminLogoutButton />
                        </div>
                    </div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        {[
                            { title: "Portfolio", description: "Site settings, resume, dan social links", Icon: FaStar },
                            { title: "Content", description: "Projects, pengalaman kerja, info entries", Icon: FaFileLines },
                            { title: "Assets", description: "Upload & kelola media dengan mudah", Icon: FaCloud },
                        ].map(({ title, description, Icon }) => (
                            <div
                                key={title}
                                className="group relative overflow-hidden rounded-xl border border-cyan-700/20 bg-linear-to-br from-slate-900/30 to-slate-800/20 p-5 backdrop-blur-md transition-all duration-300 hover:border-cyan-600/40 hover:bg-cyan-950/15 hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)]"
                            >
                                <div className="pointer-events-none absolute -inset-px bg-linear-to-br from-cyan-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl" />
                                <div className="relative mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-600/30 bg-cyan-950/40 shadow-inner">
                                    <Icon className="h-5 w-5 text-cyan-400" />
                                </div>
                                <p className="relative text-base font-bold text-white">{title}</p>
                                <p className="relative mt-2 text-xs leading-relaxed text-gray-400">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="pointer-events-none absolute top-0 right-1/4 h-125 w-125 rounded-full bg-cyan-600/5 blur-[120px]" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-100 w-100 rounded-full bg-blue-600/5 blur-[100px]" />
                {children}
            </div>
        </main>
    );
}
