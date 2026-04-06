"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaFile, FaGear, FaImage } from "react-icons/fa6";
import { FileUploadControl } from "@/components/admin/file-upload-control";
import type { SiteSettings } from "@/components/portfolio/types";
import {
  SectionCard,
  fieldClassName,
  textareaClassName,
  panelCardClassName,
  labelClassName,
  primaryButtonClassName,
} from "@/components/admin/dashboard/shared";
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
  const { register, handleSubmit, reset, setValue, watch, getValues, trigger } =
    useForm<SiteSettings>({
      resolver: zodResolver(siteSettingsFormSchema),
      defaultValues: initialSiteSettings,
    });
  const resumeUrl: string = watch("resumeUrl");
  const aboutImageUrl: string = watch("aboutImageUrl");

  useEffect((): void => {
    reset(initialSiteSettings);
  }, [initialSiteSettings, reset]);

  const formId = "site-settings-form";

  async function saveAfterUpload(
    key: "resumeUrl" | "aboutImageUrl",
    url: string,
  ): Promise<void> {
    setValue(key, url, {
      shouldDirty: true,
      shouldValidate: true,
    });

    const isValid = await trigger();
    if (!isValid) return;
    onSave(getValues());
  }

  return (
    <SectionCard
      eyebrow="Master Data"
      title="Site Settings"
      description="Atur identitas utama portfolio, hero copy, social link, dan dokumen resume."
      icon={FaGear}
      status={status}
      actions={
        <button type="submit" form={formId} className={primaryButtonClassName}>
          Save Site Settings
        </button>
      }
    >
      <form id={formId} onSubmit={handleSubmit((value) => onSave(value))}>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400/90">
              Basic Information
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["siteTitle", "Site Title"],
                ["heroName", "Hero Name"],
              ].map(([key, label]) => (
                <label key={key}>
                  <span className={labelClassName}>{label}</span>
                  <input
                    {...register(key as keyof SiteSettings)}
                    className={fieldClassName}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400/90">
              Hero Section
            </h3>
            <div className="grid gap-4">
              <label>
                <span className={labelClassName}>Hero Badge</span>
                <input {...register("heroBadge")} className={fieldClassName} />
              </label>
              <label>
                <span className={labelClassName}>Hero Role</span>
                <input {...register("heroRole")} className={fieldClassName} />
              </label>
              <label>
                <span className={labelClassName}>Hero Description</span>
                <textarea
                  rows={3}
                  {...register("heroDescription")}
                  className={textareaClassName}
                />
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400/90">
              Site Descriptions
            </h3>
            <div className="grid gap-4">
              <label>
                <span className={labelClassName}>Site Description</span>
                <textarea
                  rows={3}
                  {...register("siteDescription")}
                  className={textareaClassName}
                />
              </label>
              <label>
                <span className={labelClassName}>About Description</span>
                <textarea
                  rows={3}
                  {...register("aboutDescription")}
                  className={textareaClassName}
                />
              </label>
            </div>
          </div>

          <div className="space-y-4 border-t border-cyan-700/20 pt-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400/90">
              Contact Section
            </h3>
            <div className="grid gap-4">
              <label>
                <span className={labelClassName}>Contact Title</span>
                <input
                  {...register("contactTitle")}
                  className={fieldClassName}
                />
              </label>
              <label>
                <span className={labelClassName}>Contact Description</span>
                <textarea
                  rows={3}
                  {...register("contactDescription")}
                  className={textareaClassName}
                />
              </label>
            </div>
          </div>

          <div className="space-y-4 border-t border-cyan-700/20 pt-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400/90">
              Social Links
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["githubUrl", "GitHub"],
                ["linkedinUrl", "LinkedIn"],
                ["instagramUrl", "Instagram"],
              ].map(([key, label]) => (
                <label key={key}>
                  <span className={labelClassName}>{label} URL</span>
                  <input
                    {...register(key as keyof SiteSettings)}
                    className={fieldClassName}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4 border-t border-cyan-700/20 pt-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400/90">
              Media & Files
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className={panelCardClassName}>
                <span className={labelClassName}>Resume URL</span>
                <input {...register("resumeUrl")} className={fieldClassName} />
              </div>
              <div className={panelCardClassName}>
                <span className={labelClassName}>Upload Resume</span>
                <FileUploadControl
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  buttonLabel="Upload Resume"
                  icon={FaFile}
                  currentValue={resumeUrl}
                  kind="document"
                  onUploaded={(url) => {
                    void saveAfterUpload("resumeUrl", url);
                  }}
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className={panelCardClassName}>
                <span className={labelClassName}>About Image URL</span>
                <input
                  {...register("aboutImageUrl")}
                  className={fieldClassName}
                />
              </div>
              <div className={panelCardClassName}>
                <span className={labelClassName}>Upload About Image</span>
                <FileUploadControl
                  accept="image/*"
                  buttonLabel="Upload Image"
                  icon={FaImage}
                  currentValue={aboutImageUrl}
                  kind="image"
                  onUploaded={(url) => {
                    void saveAfterUpload("aboutImageUrl", url);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </SectionCard>
  );
}
