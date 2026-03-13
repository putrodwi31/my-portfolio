import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import type { SiteSettings } from "@/components/portfolio/types";
import { MotionReveal } from "@/components/portfolio/ui/motion-reveal";
import { SectionShell } from "@/components/portfolio/ui/section-shell";
import { TurnstileCaptcha } from "@/components/portfolio/ui/turnstile-captcha";
import { contactFormSchema, TContactForm } from "@/validations/contacts.validation";

type ContactSectionProps = {
    siteSettings: SiteSettings;
    isSubmitting: boolean;
    onSubmit: (payload: TContactForm) => Promise<boolean>;
};

export function ContactSection({ siteSettings, isSubmitting, onSubmit }: ContactSectionProps): ReactElement {
    const siteKey: string | undefined = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    const requireCaptcha: boolean = Boolean(siteKey);
    const [captchaResetKey, setCaptchaResetKey] = useState(0);
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        reset,
        watch,
        formState: { errors },
    } = useForm<TContactForm>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: { email: "", message: "", captchaToken: "" },
    });
    const captchaToken: string | undefined = watch("captchaToken");

    const onCaptchaTokenChange: (token: string) => void = useCallback(
        (token: string): void => {
            setValue("captchaToken", token, { shouldValidate: requireCaptcha });
            if (token) {
                clearErrors("captchaToken");
            }
        },
        [clearErrors, requireCaptcha, setValue],
    );

    const onFormSubmit = handleSubmit(async (payload) => {
        if (requireCaptcha && !payload.captchaToken?.trim()) {
            setError("captchaToken", { type: "manual", message: "Please complete captcha verification." });
            return;
        }

        const isSuccess: boolean = await onSubmit(payload);
        if (!isSuccess) return;

        reset({ email: "", message: "", captchaToken: "" });
        if (requireCaptcha) {
            setCaptchaResetKey((value: number): number => value + 1);
        }
    });

    return (
        <SectionShell id="contact" className="relative overflow-hidden border-t border-border bg-surface/30 py-24">
            {/* Background orbs — consistent with other sections */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -bottom-24 right-[-5%] h-96 w-96 rounded-full bg-zinc-800/20 blur-[130px]" />
                <div className="absolute top-0 -left-16 h-72 w-72 rounded-full bg-zinc-900/50 blur-[100px]" />
            </div>
            {/* Grid overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[32px_32px]" />

            <div className="relative z-10 mx-auto max-w-2xl">
                {/* Header */}
                <MotionReveal className="mb-3 text-center">
                    <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        {siteSettings.contactTitle}
                    </h2>
                </MotionReveal>
                <MotionReveal delay={0.1} className="mb-12 text-center">
                    <p className="text-lg leading-relaxed text-zinc-400">
                        {siteSettings.contactDescription.split("\n").map(
                            (line: string, index: number): ReactElement => (
                                <span key={`${line}-${index}`}>
                                    {index > 0 ? <br /> : null}
                                    {line}
                                </span>
                            ),
                        )}
                    </p>
                </MotionReveal>

                {/* Form card */}
                <MotionReveal variant="zoom-in" delay={0.15}>
                    <div className="relative">
                        {/* Offset shadow */}
                        <div className="absolute inset-0 translate-x-2 translate-y-2 border border-zinc-800/40 bg-zinc-900/20" />
                        {/* Corner brackets */}
                        <div className="absolute -top-3 -left-3 z-10 h-6 w-6 border-t-2 border-l-2 border-white/20" />
                        <div className="absolute -bottom-3 -right-3 z-10 h-6 w-6 border-b-2 border-r-2 border-white/20" />

                        <div className="relative border border-zinc-800 bg-zinc-950/80 p-8 backdrop-blur-sm sm:p-10">
                            <form className="space-y-6" onSubmit={onFormSubmit}>
                                {/* Email field */}
                                <div className="group">
                                    <label className="mb-2 block text-xs font-semibold tracking-widest text-zinc-500 uppercase">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        {...register("email")}
                                        className="w-full border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder-zinc-600 backdrop-blur-sm transition-all duration-300 focus:border-zinc-500 focus:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                                        placeholder="your@email.com"
                                    />
                                    {errors.email ? (
                                        <p className="mt-2 text-xs text-red-400">{errors.email.message}</p>
                                    ) : null}
                                </div>

                                {/* Message field */}
                                <div className="group">
                                    <label className="mb-2 block text-xs font-semibold tracking-widest text-zinc-500 uppercase">
                                        Message
                                    </label>
                                    <textarea
                                        {...register("message")}
                                        rows={5}
                                        className="w-full border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder-zinc-600 backdrop-blur-sm transition-all duration-300 focus:border-zinc-500 focus:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                                        placeholder="What's on your mind?"
                                    />
                                    {errors.message ? (
                                        <p className="mt-2 text-xs text-red-400">{errors.message.message}</p>
                                    ) : null}
                                </div>

                                <TurnstileCaptcha
                                    siteKey={siteKey}
                                    onTokenChange={onCaptchaTokenChange}
                                    errorMessage={errors.captchaToken?.message}
                                    resetKey={captchaResetKey}
                                />

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting || (Boolean(siteKey) && !captchaToken)}
                                    className="group relative w-full overflow-hidden rounded-full bg-zinc-100 py-4 text-sm font-bold text-zinc-900 shadow-[0_0_24px_rgba(255,255,255,0.08)] transition-all duration-300 hover:scale-[1.02] hover:bg-white hover:shadow-[0_0_36px_rgba(255,255,255,0.2)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-600 border-t-zinc-900" />
                                            Sending...
                                        </span>
                                    ) : (
                                        "Send Message"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </MotionReveal>
            </div>
        </SectionShell>
    );
}
