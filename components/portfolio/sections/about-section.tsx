import Image from "next/image";
import type { SiteSettings } from "@/components/portfolio/types";
import { MotionReveal } from "@/components/portfolio/ui/motion-reveal";
import { SectionHeader } from "@/components/portfolio/ui/section-header";
import { SectionShell } from "@/components/portfolio/ui/section-shell";
import { ReactElement } from "react";
import { FaArrowRight, FaDownload } from "react-icons/fa";

type AboutSectionProps = {
    siteSettings: SiteSettings;
    techStack: string[];
};

export function AboutSection({ siteSettings, techStack }: AboutSectionProps): ReactElement {
    return (
        <SectionShell id="about" className="relative overflow-hidden border-t border-border py-24">
            {/* Background orbs */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-32 right-[-5%] h-96 w-96 rounded-full bg-zinc-800/25 blur-[130px]" />
                <div className="absolute bottom-0 -left-16 h-72 w-72 rounded-full bg-zinc-900/50 blur-[100px]" />
            </div>
            {/* Grid overlay — matches hero section */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[32px_32px]" />

            <div className="relative z-10">
                <SectionHeader title="About Me" />

                <div className="grid items-start gap-16 md:grid-cols-5 lg:gap-20">
                    {/* ── Left: text content ── */}
                    <MotionReveal className="md:col-span-3 flex flex-col gap-10" delay={0.1}>
                        {/* Bio with left accent bar */}
                        <div className="border-l-2 border-zinc-700 pl-5">
                            <p className="text-lg leading-[1.9] text-zinc-400">
                                {siteSettings.aboutDescription}
                            </p>
                        </div>

                        {/* Decorative divider */}
                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-linear-to-r from-transparent via-zinc-700 to-transparent" />
                            <span className="text-[10px] font-semibold tracking-widest text-zinc-600 uppercase">
                                Tech Stack
                            </span>
                            <div className="h-px flex-1 bg-linear-to-r from-transparent via-zinc-700 to-transparent" />
                        </div>

                        {/* Tech Stack pills */}
                        <div className="flex flex-wrap gap-2">
                            {techStack.map((item) => (
                                <span
                                    key={item}
                                    className="cursor-default rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-sm text-zinc-400 backdrop-blur-sm transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800/70 hover:text-white"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <a
                                href={siteSettings.resumeUrl}
                                className="group inline-flex items-center gap-2.5 rounded-full bg-zinc-100 px-7 py-3.5 text-sm font-bold text-zinc-900 shadow-[0_0_24px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_0_36px_rgba(255,255,255,0.22)]"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaDownload className="text-xs transition-transform duration-300 group-hover:-translate-y-0.5" />
                                Download Resume
                            </a>
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900/30 px-7 py-3.5 text-sm font-semibold text-zinc-400 backdrop-blur-md transition-all duration-300 hover:border-zinc-500 hover:text-white"
                            >
                                Get in Touch
                                <FaArrowRight className="text-xs" />
                            </a>
                        </div>
                    </MotionReveal>

                    {/* ── Right: profile image ── */}
                    <MotionReveal
                        className="md:col-span-2 flex w-full justify-center md:justify-end"
                        variant="fade-left"
                        delay={0.25}
                    >
                        <div className="group relative w-full max-w-xs">
                            {/* Offset shadow card */}
                            <div className="absolute inset-0 translate-x-5 translate-y-5 border border-zinc-700/40 bg-zinc-900/30" />
                            {/* Corner accent brackets */}
                            <div className="absolute -top-3 -left-3 z-10 h-7 w-7 border-t-2 border-l-2 border-white/30 transition-all duration-500 group-hover:border-white/60" />
                            <div className="absolute -bottom-3 -right-3 z-10 h-7 w-7 border-b-2 border-r-2 border-white/30 transition-all duration-500 group-hover:border-white/60" />
                            <div className="absolute -top-3 -right-3 z-10 h-5 w-5 border-t border-r border-white/15 transition-all duration-500 group-hover:border-white/35" />
                            <div className="absolute -bottom-3 -left-3 z-10 h-5 w-5 border-b border-l border-white/15 transition-all duration-500 group-hover:border-white/35" />
                            {/* Image */}
                            <div className="relative overflow-hidden shadow-2xl">
                                <Image
                                    src={siteSettings.aboutImageUrl}
                                    alt="Profile Photo"
                                    loading="lazy"
                                    width={900}
                                    height={1200}
                                    className="h-auto w-full object-cover grayscale-20 transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                                />
                                {/* Bottom gradient fade */}
                                <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-bg/50 to-transparent" />
                            </div>
                        </div>
                    </MotionReveal>
                </div>
            </div>
        </SectionShell>
    );
}
