import type { InfoItem } from "@/components/portfolio/types";
import { ReactElement } from "react";

type InfoListProps = {
    items: InfoItem[];
};

export function InfoList({ items }: InfoListProps): ReactElement {
    return (
        <div className="space-y-6">
            {items.map((item) => (
                <div key={`${item.title}-${item.period}`} className="flex gap-4">
                    <div>
                        <h3 className="font-bold text-white">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.subtitle}</p>
                        <p className="mt-1 mb-3 text-xs text-gray-500">{item.period}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
