"use client";

import { FaBriefcase } from "react-icons/fa6";
import type { AdminWorkExperienceRecord } from "@/lib/admin-data";
import {
  EditorCard,
  SectionCard,
  fieldClassName,
  textareaClassName,
  labelClassName,
  parseLines,
  primaryButtonClassName,
  secondaryButtonClassName,
} from "@/components/admin/dashboard/shared";

export function WorkExperiencesSection({
  workExperiences,
  status,
  onAdd,
  onSave,
  onChange,
  onRemove,
}: {
  workExperiences: AdminWorkExperienceRecord[];
  status?: string;
  onAdd: () => void;
  onSave: () => void;
  onChange: (
    id: string,
    updater: (current: AdminWorkExperienceRecord) => AdminWorkExperienceRecord,
  ) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <SectionCard
      eyebrow="Master Data"
      title="Work Experience"
      description="Susun riwayat kerja dan bullet impact yang tampil di halaman depan."
      icon={FaBriefcase}
      status={status}
      actions={
        <>
          <button
            type="button"
            onClick={onAdd}
            className={secondaryButtonClassName}
          >
            Add Experience
          </button>
          <button
            type="button"
            onClick={onSave}
            className={primaryButtonClassName}
          >
            Save Work Experience
          </button>
        </>
      }
    >
      <div className="space-y-6">
        {workExperiences.map((experience, index) => (
          <EditorCard
            key={experience.id}
            title={experience.title || `Experience #${index + 1}`}
            subtitle="Timeline Item"
            index={index}
            onRemove={() => onRemove(experience.id)}
          >
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["title", "Role Title"],
                ["company", "Company"],
                ["location", "Location"],
                ["period", "Period"],
              ].map(([key, label]) => (
                <label key={key}>
                  <span className={labelClassName}>{label}</span>
                  <input
                    value={
                      experience[
                        key as keyof AdminWorkExperienceRecord
                      ] as string
                    }
                    onChange={(event) =>
                      onChange(experience.id, (current) => ({
                        ...current,
                        [key]: event.target.value,
                      }))
                    }
                    className={fieldClassName}
                  />
                </label>
              ))}
              <label>
                <span className={labelClassName}>Sort Order</span>
                <input
                  type="number"
                  value={experience.sortOrder}
                  onChange={(event) =>
                    onChange(experience.id, (current) => ({
                      ...current,
                      sortOrder: Number(event.target.value),
                    }))
                  }
                  className={fieldClassName}
                />
              </label>
              <label className="md:col-span-2">
                <span className={labelClassName}>
                  Highlights (one per line)
                </span>
                <textarea
                  rows={6}
                  value={experience.highlights.join("\n")}
                  onChange={(event) =>
                    onChange(experience.id, (current) => ({
                      ...current,
                      highlights: parseLines(event.target.value),
                    }))
                  }
                  className={textareaClassName}
                />
              </label>
            </div>
          </EditorCard>
        ))}
      </div>
    </SectionCard>
  );
}
