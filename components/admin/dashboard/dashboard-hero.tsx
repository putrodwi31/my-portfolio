"use client";

import {
  FaStar,
  FaBolt,
  FaCloud,
  FaCode,
  FaBriefcase,
  FaFolder,
  FaAddressCard,
} from "react-icons/fa6";

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
    {
      label: "Tech Stack",
      value: techStackCount,
      icon: FaCode,
      desc: "technologies",
      cardClasses:
        "border-violet-700/30 hover:border-violet-600/50 hover:bg-violet-950/15 hover:shadow-[0_0_35px_-10px_rgba(139,92,246,0.3)]",
      iconBg: "bg-violet-950/50 border-violet-600/30",
      iconColor: "text-violet-400",
      labelColor: "text-violet-400/80 group-hover:text-violet-300",
      accentColor: "bg-violet-400",
    },
    {
      label: "Work Entries",
      value: workExperienceCount,
      icon: FaBriefcase,
      desc: "experiences",
      cardClasses:
        "border-emerald-700/30 hover:border-emerald-600/50 hover:bg-emerald-950/15 hover:shadow-[0_0_35px_-10px_rgba(16,185,129,0.3)]",
      iconBg: "bg-emerald-950/50 border-emerald-600/30",
      iconColor: "text-emerald-400",
      labelColor: "text-emerald-400/80 group-hover:text-emerald-300",
      accentColor: "bg-emerald-400",
    },
    {
      label: "Projects",
      value: projectCount,
      icon: FaFolder,
      desc: "portfolio items",
      cardClasses:
        "border-orange-700/30 hover:border-orange-600/50 hover:bg-orange-950/15 hover:shadow-[0_0_35px_-10px_rgba(249,115,22,0.3)]",
      iconBg: "bg-orange-950/50 border-orange-600/30",
      iconColor: "text-orange-400",
      labelColor: "text-orange-400/80 group-hover:text-orange-300",
      accentColor: "bg-orange-400",
    },
    {
      label: "Info Entries",
      value: infoEntryCount,
      icon: FaAddressCard,
      desc: "records",
      cardClasses:
        "border-pink-700/30 hover:border-pink-600/50 hover:bg-pink-950/15 hover:shadow-[0_0_35px_-10px_rgba(236,72,153,0.3)]",
      iconBg: "bg-pink-950/50 border-pink-600/30",
      iconColor: "text-pink-400",
      labelColor: "text-pink-400/80 group-hover:text-pink-300",
      accentColor: "bg-pink-400",
    },
  ];

  return (
    <section className="space-y-5">
      {/* Hero Banner */}
      <div className="group relative overflow-hidden rounded-[28px] border border-cyan-700/40 bg-linear-to-br from-slate-900/70 via-cyan-950/30 to-slate-900/50 p-8 sm:p-10 shadow-2xl shadow-cyan-900/20 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-600/50 hover:shadow-[0_0_60px_-15px_rgba(34,211,238,0.25)]">
        {/* Top edge highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />

        {/* Glow blobs */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-cyan-600/10 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-blue-600/8 blur-[80px]" />

        <div className="relative space-y-6">
          {/* Badge */}
          <p className="inline-flex items-center gap-2.5 rounded-full border border-cyan-600/40 bg-cyan-950/50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.4em] text-cyan-200 backdrop-blur-sm shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Dashboard Admin
          </p>

          {/* Heading */}
          <h2 className="max-w-3xl bg-linear-to-br from-white via-cyan-50 to-white/70 bg-clip-text text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tighter text-transparent">
            Kelola semua master data portfolio dengan mudah.
          </h2>

          {/* Description */}
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-gray-400">
            Satu dashboard terpusat untuk mengatur konten utama, mengunggah
            media, update project, dan kelola pengalaman kerja.{" "}
            <span className="font-medium text-cyan-200">
              Sinkronisasi otomatis
            </span>{" "}
            memastikan semuanya selalu terbaru.
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-100 shadow-[0_0_15px_-3px_rgba(34,211,238,0.2)]">
              <FaStar className="h-3.5 w-3.5" />
              Live Editing
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-600/30 bg-blue-950/30 px-4 py-2 text-xs font-semibold text-blue-200 transition-colors hover:bg-blue-900/40 cursor-default">
              <FaBolt className="h-3.5 w-3.5" />
              Instant Sync
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-600/30 bg-violet-950/30 px-4 py-2 text-xs font-semibold text-violet-200 transition-colors hover:bg-violet-900/40 cursor-default">
              <FaCloud className="h-3.5 w-3.5" />
              Cloud Storage
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryItems.map((item) => (
          <div
            key={item.label}
            className={`group relative overflow-hidden rounded-[20px] border bg-linear-to-br from-slate-900/50 to-slate-800/30 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${item.cardClasses}`}
          >
            {/* Hover overlay */}
            <div className="pointer-events-none absolute -inset-px rounded-[20px] bg-linear-to-br from-white/3 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Top edge highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 transition-all duration-300" />

            <div className="relative space-y-4">
              {/* Icon */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl border ${item.iconBg} shadow-inner transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
              >
                <item.icon className={`h-5 w-5 ${item.iconColor}`} />
              </div>

              {/* Label */}
              <p
                className={`text-xs font-bold uppercase tracking-[0.25em] transition-colors duration-200 ${item.labelColor}`}
              >
                {item.label}
              </p>

              {/* Value */}
              <div>
                <p className="flex items-baseline gap-1.5 text-4xl font-bold tracking-tight text-white">
                  {item.value}
                  <span className="text-xs font-normal text-gray-500">
                    {item.desc}
                  </span>
                </p>
              </div>

              {/* Expanding accent bar */}
              <div className="h-0.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className={`h-full w-8 rounded-full ${item.accentColor} opacity-60 transition-all duration-500 group-hover:w-full group-hover:opacity-100`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
