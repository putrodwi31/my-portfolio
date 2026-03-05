declare module "*.css";

interface Window {
    turnstile?: {
        render: (
            container: HTMLElement | string,
            options: {
                sitekey: string;
                theme?: "light" | "dark" | "auto";
                size?: "normal" | "compact" | "flexible";
                callback?: (token: string) => void;
                "expired-callback"?: () => void;
                "error-callback"?: () => void;
            },
        ) => string;
        remove: (widgetId: string) => void;
    };
}
