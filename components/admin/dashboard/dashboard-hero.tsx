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
      <div className="rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),rgba(255,255,255,0.03)_35%,rgba(9,9,11,0.92)_100%)] p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-gray-500">Control Center</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight text-white">Semua master data portfolio dalam satu dashboard yang lebih rapi.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-400">
          Atur konten utama, unggah media, dan update daftar project atau experience tanpa menyentuh source file manual.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {summaryItems.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.22em] text-gray-500">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
