import type { ReactElement, ReactNode } from "react";

type SectionShellProps = {
    id?: string;
    className?: string;
    children: ReactNode;
};

export function SectionShell({ id, className = "", children }: SectionShellProps): ReactElement {
    return (
        <section id={id} className={className}>
            <div className="mx-auto max-w-6xl px-4">{children}</div>
        </section>
    );
}
