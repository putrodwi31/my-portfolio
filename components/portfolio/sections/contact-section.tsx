import { useEffect, useRef, type ReactElement, type SubmitEvent } from "react";
import type { SiteSettings } from "@/components/portfolio/types";
import { MotionReveal } from "@/components/portfolio/ui/motion-reveal";
import { SectionShell } from "@/components/portfolio/ui/section-shell";

type ContactSectionProps = {
    siteSettings: SiteSettings;
    email: string;
    message: string;
    captchaToken: string;
    isSubmitting: boolean;
    onEmailChange: (value: string) => void;
    onMessageChange: (value: string) => void;
    onCaptchaTokenChange: (value: string) => void;
    onSubmit: (event: SubmitEvent<HTMLFormElement>) => Promise<void>;
};

export function ContactSection({
    siteSettings,
    email,
    message,
    captchaToken,
    isSubmitting,
    onEmailChange,
    onMessageChange,
    onCaptchaTokenChange,
    onSubmit,
}: ContactSectionProps): ReactElement {
    const turnstileRef = useRef<HTMLDivElement | null>(null);
    const widgetIdRef = useRef<string | null>(null);
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    useEffect(() => {
        if (!siteKey || !turnstileRef.current) {
            return undefined;
        }

        let isCancelled = false;

        const renderWidget = () => {
            if (isCancelled || !window.turnstile || !turnstileRef.current) return;

            if (widgetIdRef.current) {
                window.turnstile.remove(widgetIdRef.current);
                widgetIdRef.current = null;
            }

            widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
                sitekey: siteKey,
                theme: "dark",
                callback: (token: string) => onCaptchaTokenChange(token),
                "expired-callback": () => onCaptchaTokenChange(""),
                "error-callback": () => onCaptchaTokenChange(""),
            });
        };

        if (window.turnstile) {
            renderWidget();
        } else {
            const existingScript = document.querySelector<HTMLScriptElement>("script[data-turnstile='true']");
            if (existingScript) {
                existingScript.addEventListener("load", renderWidget, { once: true });
            } else {
                const script = document.createElement("script");
                script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
                script.async = true;
                script.defer = true;
                script.dataset.turnstile = "true";
                script.onload = renderWidget;
                document.head.appendChild(script);
            }
        }

        return () => {
            isCancelled = true;
            if (window.turnstile && widgetIdRef.current) {
                window.turnstile.remove(widgetIdRef.current);
                widgetIdRef.current = null;
            }
        };
    }, [onCaptchaTokenChange, siteKey]);

    return (
        <SectionShell id="contact" className="border-t border-border bg-surface py-24">
            <div className="mx-auto max-w-3xl text-center">
                <MotionReveal>
                    <h2 className="mb-6 text-4xl font-bold text-white">{siteSettings.contactTitle}</h2>
                </MotionReveal>
                <MotionReveal delay={0.1}>
                    <p className="mb-10 text-lg text-gray-400">
                        {siteSettings.contactDescription.split("\n").map((line, index) => (
                            <span key={`${line}-${index}`}>
                                {index > 0 ? <br /> : null}
                                {line}
                            </span>
                        ))}
                    </p>
                </MotionReveal>

                <MotionReveal className="mb-2 border border-border bg-bg p-8 text-left" variant="zoom-in">
                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div className="grid gap-6 md:grid-cols-1">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-400">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={(event) => onEmailChange(event.target.value)}
                                    className="w-full border border-border bg-zinc-900 p-3 text-white transition focus:border-white focus:outline-none"
                                    placeholder="Enter Your Email"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-400">Message</label>
                            <textarea
                                name="message"
                                rows={4}
                                required
                                value={message}
                                onChange={(event) => onMessageChange(event.target.value)}
                                className="w-full border border-border bg-zinc-900 p-3 text-white transition focus:border-white focus:outline-none"
                                placeholder="Enter Your Message"
                            />
                        </div>
                        {siteKey ? (
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-400">Captcha</label>
                                <div ref={turnstileRef} className="min-h-16.25" />
                            </div>
                        ) : null}
                        <button
                            type="submit"
                            disabled={isSubmitting || (Boolean(siteKey) && !captchaToken)}
                            className="w-full bg-white py-4 font-bold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </MotionReveal>
            </div>
        </SectionShell>
    );
}
