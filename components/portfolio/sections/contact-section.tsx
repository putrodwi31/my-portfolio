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
        <SectionShell id="contact" className="border-t border-border bg-surface py-24">
            <div className="mx-auto max-w-3xl text-center">
                <MotionReveal>
                    <h2 className="mb-6 text-4xl font-bold text-white">{siteSettings.contactTitle}</h2>
                </MotionReveal>
                <MotionReveal delay={0.1}>
                    <p className="mb-10 text-lg text-gray-400">
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

                <MotionReveal className="mb-2 border border-border bg-bg p-8 text-left" variant="zoom-in">
                    <form className="space-y-6" onSubmit={onFormSubmit}>
                        <div className="grid gap-6 md:grid-cols-1">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-400">Email</label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    className="w-full border border-border bg-zinc-900 p-3 text-white transition focus:border-white focus:outline-none"
                                    placeholder="Enter Your Email"
                                />
                                {errors.email ? <p className="mt-2 text-sm text-red-400">{errors.email.message}</p> : null}
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-400">Message</label>
                            <textarea
                                {...register("message")}
                                rows={4}
                                className="w-full border border-border bg-zinc-900 p-3 text-white transition focus:border-white focus:outline-none"
                                placeholder="Enter Your Message"
                            />
                            {errors.message ? <p className="mt-2 text-sm text-red-400">{errors.message.message}</p> : null}
                        </div>
                        <TurnstileCaptcha
                            siteKey={siteKey}
                            onTokenChange={onCaptchaTokenChange}
                            errorMessage={errors.captchaToken?.message}
                            resetKey={captchaResetKey}
                        />
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
