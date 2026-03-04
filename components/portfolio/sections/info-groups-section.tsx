import { InfoList } from "@/components/portfolio/ui/info-list";
import { MotionReveal } from "@/components/portfolio/ui/motion-reveal";
import { SectionShell } from "@/components/portfolio/ui/section-shell";
import type { InfoGroup } from "@/components/portfolio/types";
import { infoIconMap } from "@/lib/icon-map";
import { ReactElement } from "react";

type InfoGroupsSectionProps = {
    id: string;
    className: string;
    groups: InfoGroup[];
};

export function InfoGroupsSection({ id, className, groups }: InfoGroupsSectionProps): ReactElement {
    return (
        <SectionShell id={id} className={className}>
            <div className="grid gap-12 md:grid-cols-2">
                {groups.map((group, index) => {
                    const Icon = infoIconMap[group.iconKey] ?? infoIconMap.FaUsers;
                    return (
                        <MotionReveal key={group.title} delay={index * 0.1}>
                            <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold text-white">
                                <Icon /> {group.title}
                            </h2>
                            <InfoList items={group.items} />
                        </MotionReveal>
                    );
                })}
            </div>
        </SectionShell>
    );
}
