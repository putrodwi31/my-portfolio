declare module "*.css";

interface Window {
    turnstile?: {
        render: (
            container: HTMLElement | string,
            options: {
                sitekey: string;
                theme?: "light" | "dark" | "auto";
                callback?: (token: string) => void;
                "expired-callback"?: () => void;
                "error-callback"?: () => void;
            },
        ) => string;
        remove: (widgetId: string) => void;
    };
}
