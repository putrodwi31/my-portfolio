import type { WorkExperience } from "@/components/portfolio/types";
import { MotionReveal } from "@/components/portfolio/ui/motion-reveal";
import { SectionHeader } from "@/components/portfolio/ui/section-header";
import { SectionShell } from "@/components/portfolio/ui/section-shell";
import { ReactElement } from "react";

type WorkSectionProps = {
    workExperiences: WorkExperience[];
};

export function WorkSection({ workExperiences }: WorkSectionProps): ReactElement {
    return (
        <SectionShell id="work" className="border-t border-border bg-surface/30 py-24">
            <SectionHeader title="Work Experience" subtitle="My professional journey in the technology industry." />
            <div className="space-y-12">
                {workExperiences.map((experience, index) => (
                    <MotionReveal
                        key={`${experience.title}-${experience.company}`}
                        className="relative border-l-2 border-zinc-800 pl-8 pb-2"
                        delay={index * 0.1}
                    >
                        <span className="absolute top-0 -left-2.25 h-4 w-4 rounded-full bg-white" />
                        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h3 className="text-2xl font-bold text-white">{experience.title}</h3>
                            <span className="mt-1 font-mono text-sm text-gray-500 sm:mt-0">{experience.period}</span>
                        </div>
                        <p className="mb-4 font-medium text-white">
                            {experience.company} - {experience.location}
                        </p>
                        <ul className="list-inside list-disc space-y-2 text-sm text-gray-400 marker:text-white">
                            {experience.highlights.map((highlight) => (
                                <li key={`${experience.title}-${highlight}`}>{highlight}</li>
                            ))}
                        </ul>
                    </MotionReveal>
                ))}
            </div>
        </SectionShell>
    );
}
