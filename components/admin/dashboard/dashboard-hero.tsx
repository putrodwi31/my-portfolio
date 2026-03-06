"use client";

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
    <section className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
      <div className="group relative overflow-hidden rounded-[32px] border border-cyan-500/20 bg-black/40 p-8 sm:p-10 shadow-[0_0_80px_-20px_rgba(34,211,238,0.2)] backdrop-blur-2xl transition-all duration-500 hover:border-cyan-400/30">
        <div className="pointer-events-none absolute -inset-px rounded-[32px] bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-[80px]" />

        <p className="relative inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" /> Control Center
        </p>
        <h2 className="relative mt-5 max-w-2xl bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-4xl font-bold leading-[1.15] tracking-tight text-transparent sm:text-5xl">
          Semua master data portfolio dalam satu dashboard.
        </h2>
        <p className="relative mt-5 max-w-2xl text-base leading-relaxed text-gray-400">
          Atur konten utama, unggah media, dan update daftar project atau experience tanpa menyentuh source file manual. <i className="text-gray-300">Everything syncs up instantly.</i>
        </p>
        <div className="relative mt-8 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium text-cyan-200 shadow-[0_0_15px_-3px_rgba(34,211,238,0.2)]">✨ Live Content</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:bg-white/10">⚡ Fast Editing</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:bg-white/10">☁️ Asset Upload</span>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {summaryItems.map((item) => (
          <div
            key={item.label}
            className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.15)]"
          >
            <div className="pointer-events-none absolute -inset-px bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500 transition-colors group-hover:text-cyan-200/70">{item.label}</p>
            <p className="origin-left mt-3 flex items-baseline gap-2 text-4xl font-bold tracking-tight text-white transition-all group-hover:scale-105 group-hover:text-cyan-50">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
