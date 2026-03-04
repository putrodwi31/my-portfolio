import { ReactElement } from "react";
import { FaArrowRight, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import type { SiteSettings } from "@/components/portfolio/types";
import { MotionReveal } from "@/components/portfolio/ui/motion-reveal";

type HeroSectionProps = {
    siteSettings: SiteSettings;
};

export function HeroSection({ siteSettings }: HeroSectionProps): ReactElement {
    return (
        <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
            <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-800/20 via-bg to-bg" />
            <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-4">
                <MotionReveal variant="fade-right" duration={1}>
                    <span className="mb-6 inline-block rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium tracking-wider text-white uppercase">
                        {siteSettings.heroBadge}
                    </span>
                    <h1 className="mb-6 text-4xl leading-tight font-bold text-white md:text-6xl">
                        Hello, I am {siteSettings.heroName} <br /> <span className="text-gray-500">{siteSettings.heroRole}</span>
                    </h1>
                    <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-400 md:text-xl">{siteSettings.heroDescription}</p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#projects"
                            className="flex items-center gap-2 bg-white px-8 py-4 font-bold text-black transition hover:bg-gray-200"
                        >
                            View Projects <FaArrowRight />
                        </a>
                        <a
                            href="#contact"
                            className="border border-border px-8 py-4 font-medium text-white transition duration-300 hover:border-white hover:bg-surface"
                        >
                            Contact Me
                        </a>
                    </div>
                    <div className="mt-10 flex gap-6">
                        <a href={siteSettings.githubUrl} className="text-2xl transition hover:text-white" target="_blank" rel="noreferrer">
                            <FaGithub />
                        </a>
                        {siteSettings.linkedinUrl ? (
                            <a
                                href={siteSettings.linkedinUrl}
                                className="text-2xl transition hover:text-white"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaLinkedin />
                            </a>
                        ) : null}
                        {siteSettings.instagramUrl ? (
                            <a
                                href={siteSettings.instagramUrl}
                                className="text-2xl transition hover:text-white"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaInstagram />
                            </a>
                        ) : null}
                    </div>
                </MotionReveal>
            </div>
        </section>
    );
}
