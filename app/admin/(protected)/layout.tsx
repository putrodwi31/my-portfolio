import type { ReactNode } from "react";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { requireAdminSession } from "@/lib/auth";

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
    const session = await requireAdminSession();

    return (
        <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,#0e2336_0%,#05080f_44%,#020305_100%)] selection:bg-cyan-500/30">
            <div className="relative z-10 border-b border-white/5 bg-black/40 backdrop-blur-2xl">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
                <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative">
                            <p className="mb-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                                Admin Dashboard
                            </p>
                            <h1 className="bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent">Portfolio Master Data</h1>
                            <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-400">
                                Kelola konten portfolio dari satu panel terpusat. <span className="text-gray-300">Semua perubahan akan langsung tayang.</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-right backdrop-blur-md transition-all hover:border-cyan-500/30 hover:bg-white/10">
                                <div className="pointer-events-none absolute -inset-px bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                <p className="text-sm font-semibold text-white">{session.name}</p>
                                <p className="text-xs font-medium text-cyan-200/60">{session.email}</p>
                            </div>
                            <AdminLogoutButton />
                        </div>
                    </div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        {[
                            ["Portfolio", "Site settings, resume, dan links", "✨"],
                            ["Content", "Projects, work experience, info entries", "📝"],
                            ["Assets", "Upload gambar dan dokumen langsung", "☁️"],
                        ].map(([title, description, icon]) => (
                            <div
                                key={title}
                                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.15)]"
                            >
                                <div className="pointer-events-none absolute -inset-px bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg shadow-inner">
                                    {icon}
                                </div>
                                <p className="text-base font-semibold text-white">{title}</p>
                                <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="pointer-events-none absolute top-0 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
                {children}
            </div>
        </main>
    );
}
