"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FileUploadControl } from "@/components/admin/file-upload-control";
import type { SiteSettings } from "@/components/portfolio/types";
import { SectionCard, fieldClassName, panelCardClassName, primaryButtonClassName } from "@/components/admin/dashboard/shared";
import { siteSettingsFormSchema } from "@/validations/masters.validation";

export function SiteSettingsSection({
    initialSiteSettings,
    status,
    onSave,
}: {
    initialSiteSettings: SiteSettings;
    status?: string;
    onSave: (value: SiteSettings) => void;
}): ReactElement {
    const { register, handleSubmit, reset, setValue, watch } = useForm<SiteSettings>({
        resolver: zodResolver(siteSettingsFormSchema),
        defaultValues: initialSiteSettings,
    });
    const resumeUrl: string = watch("resumeUrl");
    const aboutImageUrl: string = watch("aboutImageUrl");

    useEffect((): void => {
        reset(initialSiteSettings);
    }, [initialSiteSettings, reset]);

    const formId = "site-settings-form";

    return (
        <SectionCard
            eyebrow="Master Data"
            title="Site Settings"
            description="Atur identitas utama portfolio, hero copy, social link, dan dokumen resume."
            status={status}
            actions={
                <button type="submit" form={formId} className={primaryButtonClassName}>
                    Save Site Settings
                </button>
            }
        >
            <form id={formId} onSubmit={handleSubmit((value) => onSave(value))}>
                <div className="grid gap-4 md:grid-cols-2">
                    {[
                        ["siteTitle", "Site Title"],
                        ["siteDescription", "Site Description"],
                        ["heroBadge", "Hero Badge"],
                        ["heroName", "Hero Name"],
                        ["heroRole", "Hero Role"],
                        ["heroDescription", "Hero Description"],
                        ["aboutDescription", "About Description"],
                        ["aboutImageUrl", "About Image URL"],
                        ["githubUrl", "GitHub URL"],
                        ["linkedinUrl", "LinkedIn URL"],
                        ["instagramUrl", "Instagram URL"],
                        ["contactTitle", "Contact Title"],
                        ["contactDescription", "Contact Description"],
                    ].map(([key, label]) => (
                        <label key={key} className={key.includes("Description") ? "md:col-span-2" : ""}>
                            <span className="mb-2 block text-sm uppercase tracking-[0.2em] text-gray-400">{label}</span>
                            {key.includes("Description") ? (
                                <textarea rows={4} {...register(key as keyof SiteSettings)} className={fieldClassName} />
                            ) : (
                                <input {...register(key as keyof SiteSettings)} className={fieldClassName} />
                            )}
                        </label>
                    ))}
                </div>
                <div className="mt-6 grid gap-4 border-t border-white/8 pt-6 md:grid-cols-2">
                    <div className={panelCardClassName}>
                        <span className="mb-2 block text-sm uppercase tracking-[0.2em] text-gray-400">Resume URL</span>
                        <input {...register("resumeUrl")} className={fieldClassName} />
                    </div>
                    <div className={panelCardClassName}>
                        <span className="mb-2 block text-sm uppercase tracking-[0.2em] text-gray-400">Upload Resume Document</span>
                        <FileUploadControl
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            buttonLabel="Upload Resume"
                            currentValue={resumeUrl}
                            kind="document"
                            onUploaded={(url) => setValue("resumeUrl", url, { shouldDirty: true, shouldValidate: true })}
                        />
                    </div>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className={panelCardClassName}>
                        <span className="mb-2 block text-sm uppercase tracking-[0.2em] text-gray-400">About Image URL</span>
                        <input {...register("aboutImageUrl")} className={fieldClassName} />
                    </div>
                    <div className={panelCardClassName}>
                        <span className="mb-2 block text-sm uppercase tracking-[0.2em] text-gray-400">Upload About Image</span>
                        <FileUploadControl
                            accept="image/*"
                            buttonLabel="Upload About Image"
                            currentValue={aboutImageUrl}
                            kind="image"
                            onUploaded={(url) => setValue("aboutImageUrl", url, { shouldDirty: true, shouldValidate: true })}
                        />
                    </div>
                </div>
            </form>
        </SectionCard>
    );
}
