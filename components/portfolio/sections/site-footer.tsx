import { ReactElement } from "react";

type SiteFooterProps = {
    onOpenSupport: () => void;
};

export function SiteFooter({ onOpenSupport }: SiteFooterProps): ReactElement {
    return (
        <footer className="border-t border-border bg-bg py-8 text-center">
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="mb-1 flex items-center justify-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                    </span>
                    <span className="text-sm font-semibold tracking-wide text-green-400">Uptime Status</span>
                </div>
                <p className="text-sm text-gray-600">
                    Putro Dwi Mulyo <span className="mx-2">|</span>
                    <button type="button" onClick={onOpenSupport} className="text-gray-500 hover:underline">
                        Support Me
                    </button>
                </p>
            </div>
        </footer>
    );
}
