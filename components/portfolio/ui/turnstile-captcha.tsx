import { useCallback, useEffect, useRef, type ReactElement } from "react";

type TurnstileCaptchaProps = {
    siteKey?: string;
    onTokenChange: (token: string) => void;
    errorMessage?: string;
    label?: string;
    resetKey?: number;
    theme?: "light" | "dark" | "auto";
};

export function TurnstileCaptcha({
    siteKey,
    onTokenChange,
    errorMessage,
    label = "Captcha",
    resetKey = 0,
    theme = "dark",
}: TurnstileCaptchaProps): ReactElement | null {
    const turnstileRef = useRef<HTMLDivElement | null>(null);
    const widgetIdRef = useRef<string | null>(null);

    const renderWidget = useCallback(() => {
        if (!siteKey || !window.turnstile || !turnstileRef.current) {
            return;
        }

        if (widgetIdRef.current) {
            window.turnstile.remove(widgetIdRef.current);
            widgetIdRef.current = null;
        }

        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
            sitekey: siteKey,
            theme,
            size: "flexible",
            callback: (token: string) => onTokenChange(token),
            "expired-callback": () => onTokenChange(""),
            "error-callback": () => onTokenChange(""),
        });
    }, [onTokenChange, siteKey, theme]);

    useEffect(() => {
        if (!siteKey || !turnstileRef.current) {
            return undefined;
        }

        let isCancelled = false;

        const waitForTurnstile = async () => {
            for (let i = 0; i < 50; i += 1) {
                if (window.turnstile) return true;
                await new Promise((resolve) => window.setTimeout(resolve, 100));
            }
            return false;
        };

        const existingScript = document.querySelector<HTMLScriptElement>("script[data-turnstile='true']");
        if (!existingScript) {
            const script = document.createElement("script");
            script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
            script.async = true;
            script.defer = true;
            script.dataset.turnstile = "true";
            document.head.appendChild(script);
        }

        waitForTurnstile().then((ready) => {
            if (!ready || isCancelled) return;
            renderWidget();
        });

        return () => {
            isCancelled = true;
            if (window.turnstile && widgetIdRef.current) {
                window.turnstile.remove(widgetIdRef.current);
                widgetIdRef.current = null;
            }
        };
    }, [renderWidget, resetKey, siteKey]);

    if (!siteKey) {
        return null;
    }

    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-gray-400">{label}</label>
            <div ref={turnstileRef} className="min-h-16.25 w-full overflow-hidden" />
            {errorMessage ? <p className="mt-2 text-sm text-red-400">{errorMessage}</p> : null}
        </div>
    );
}
