import { ReactElement } from "react";

type SectionHeaderProps = {
    title: string;
    subtitle?: string;
};

export function SectionHeader({ title, subtitle }: SectionHeaderProps): ReactElement {
    return (
        <div className="mb-12">
            <h2 className="mb-2 text-3xl font-bold text-white">{title}</h2>
            {subtitle ? <p className="text-gray-400">{subtitle}</p> : <div className="h-1 w-20 bg-white" />}
        </div>
    );
}
