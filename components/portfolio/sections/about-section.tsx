import Image from "next/image";
import type { SiteSettings } from "@/components/portfolio/types";
import { MotionReveal } from "@/components/portfolio/ui/motion-reveal";
import { SectionHeader } from "@/components/portfolio/ui/section-header";
import { SectionShell } from "@/components/portfolio/ui/section-shell";
import { ReactElement } from "react";

type AboutSectionProps = {
    siteSettings: SiteSettings;
    techStack: string[];
};

export function AboutSection({ siteSettings, techStack }: AboutSectionProps): ReactElement {
    return (
        <SectionShell id="about" className="border-t border-border py-24">
            <SectionHeader title="About Me" />
            <div className="grid gap-8 md:grid-cols-3">
                <MotionReveal className="space-y-6 text-justify text-lg text-gray-400 md:col-span-2" delay={0.1}>
                    <p>{siteSettings.aboutDescription}</p>

                    <div className="pt-6 text-center">
                        <a
                            href={siteSettings.resumeUrl}
                            className="block w-full bg-white px-5 py-3 font-bold text-black shadow-md transition hover:bg-gray-100"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Download Resume
                        </a>
                    </div>

                    <div className="pt-6">
                        <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">Tech Stack</h3>
                        <div className="flex flex-wrap gap-3">
                            {techStack.map((item) => (
                                <span
                                    key={item}
                                    className="rounded border border-border bg-surface px-4 py-2 text-sm text-white transition duration-300 hover:border-white"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </MotionReveal>

                <MotionReveal className="flex w-full items-center justify-center md:h-full" variant="fade-left">
                    <Image
                        src="/assets/images/about-photoo.png"
                        alt="Profile Photo"
                        width={900}
                        height={1200}
                        className="h-auto w-full max-w-sm object-cover shadow-lg md:h-full md:max-w-none"
                    />
                </MotionReveal>
            </div>
        </SectionShell>
    );
}
