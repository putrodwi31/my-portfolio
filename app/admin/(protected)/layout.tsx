import type { ReactNode } from "react";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { requireAdminSession } from "@/lib/auth";

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
    const session = await requireAdminSession();

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1f2937_0%,#09090b_38%,#050505_100%)]">
            <div className="border-b border-white/10 bg-black/35 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-gray-500">Admin Dashboard</p>
                            <h1 className="text-3xl font-semibold tracking-tight text-white">Portfolio Master Data</h1>
                            <p className="mt-2 max-w-2xl text-sm text-gray-400">
                                Kelola konten portfolio dari satu panel yang tetap memakai nuansa visual gelap dan kontras tinggi seperti
                                halaman utama.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
                                <p className="text-sm text-white">{session.name}</p>
                                <p className="text-xs text-gray-500">{session.email}</p>
                            </div>
                            <AdminLogoutButton />
                        </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                        {[
                            ["Portfolio", "Site settings, resume, dan links"],
                            ["Content", "Projects, work experience, info entries"],
                            ["Assets", "Upload gambar dan dokumen langsung"],
                        ].map(([title, description]) => (
                            <div
                                key={title}
                                className="rounded-2xl border border-white/10 bg-linear-to-br from-white/8 to-white/3 px-4 py-4"
                            >
                                <p className="text-sm font-medium text-white">{title}</p>
                                <p className="mt-1 text-xs text-gray-400">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
        </main>
    );
}
