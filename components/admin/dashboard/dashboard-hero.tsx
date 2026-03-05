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
      <div className="rounded-[30px] border border-cyan-300/20 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.2)_0%,rgba(34,211,238,0.06)_30%,rgba(9,9,11,0.95)_70%)] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.42)]">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/65">Control Center</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-white">
          Semua master data portfolio dalam satu dashboard yang lebih terstruktur.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-400">
          Atur konten utama, unggah media, dan update daftar project atau experience tanpa menyentuh source file manual.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full border border-cyan-300/25 bg-cyan-300/8 px-3 py-1 text-xs text-cyan-100">Live Content</span>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/85">Fast Editing</span>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/85">Asset Upload</span>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {summaryItems.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 backdrop-blur"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-gray-400">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
