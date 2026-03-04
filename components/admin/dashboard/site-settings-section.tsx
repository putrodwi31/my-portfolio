"use client";

import { FileUploadControl } from "@/components/admin/file-upload-control";
import type { SiteSettings } from "@/components/portfolio/types";
import { SectionCard, fieldClassName, panelCardClassName, primaryButtonClassName } from "@/components/admin/dashboard/shared";

export function SiteSettingsSection({
  siteSettings,
  status,
  onChange,
  onSave,
}: {
  siteSettings: SiteSettings;
  status?: string;
  onChange: (value: SiteSettings) => void;
  onSave: () => void;
}) {
  return (
    <SectionCard
      eyebrow="Master Data"
      title="Site Settings"
      description="Atur identitas utama portfolio, hero copy, social link, dan dokumen resume."
      status={status}
      actions={
        <button type="button" onClick={onSave} className={primaryButtonClassName}>
          Save Site Settings
        </button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["siteTitle", "Site Title"],
          ["siteDescription", "Site Description"],
          ["heroBadge", "Hero Badge"],
          ["heroName", "Hero Name"],
          ["heroRole", "Hero Role"],
          ["heroDescription", "Hero Description"],
          ["aboutDescription", "About Description"],
          ["githubUrl", "GitHub URL"],
          ["linkedinUrl", "LinkedIn URL"],
          ["instagramUrl", "Instagram URL"],
          ["contactTitle", "Contact Title"],
          ["contactDescription", "Contact Description"],
        ].map(([key, label]) => (
          <label key={key} className={key.includes("Description") ? "md:col-span-2" : ""}>
            <span className="mb-2 block text-sm uppercase tracking-[0.2em] text-gray-400">{label}</span>
            {key.includes("Description") ? (
              <textarea
                rows={4}
                value={siteSettings[key as keyof SiteSettings]}
                onChange={(event) => onChange({ ...siteSettings, [key]: event.target.value })}
                className={fieldClassName}
              />
            ) : (
              <input
                value={siteSettings[key as keyof SiteSettings]}
                onChange={(event) => onChange({ ...siteSettings, [key]: event.target.value })}
                className={fieldClassName}
              />
            )}
          </label>
        ))}
      </div>
      <div className="mt-6 grid gap-4 border-t border-white/8 pt-6 md:grid-cols-2">
        <div className={panelCardClassName}>
          <span className="mb-2 block text-sm uppercase tracking-[0.2em] text-gray-400">Resume URL</span>
          <input
            value={siteSettings.resumeUrl}
            onChange={(event) => onChange({ ...siteSettings, resumeUrl: event.target.value })}
            className={fieldClassName}
          />
        </div>
        <div className={panelCardClassName}>
          <span className="mb-2 block text-sm uppercase tracking-[0.2em] text-gray-400">Upload Resume Document</span>
          <FileUploadControl
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            buttonLabel="Upload Resume"
            currentValue={siteSettings.resumeUrl}
            kind="document"
            onUploaded={(url) => onChange({ ...siteSettings, resumeUrl: url })}
          />
        </div>
      </div>
    </SectionCard>
  );
}
