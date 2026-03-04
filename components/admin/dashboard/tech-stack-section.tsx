"use client";

import { SectionCard, fieldClassName, primaryButtonClassName } from "@/components/admin/dashboard/shared";

export function TechStackSection({
  value,
  status,
  onChange,
  onSave,
}: {
  value: string;
  status?: string;
  onChange: (value: string) => void;
  onSave: () => void;
}) {
  return (
    <SectionCard
      eyebrow="Master Data"
      title="Tech Stack"
      description="Kelola daftar teknologi yang tampil di section About."
      status={status}
      actions={
        <button type="button" onClick={onSave} className={primaryButtonClassName}>
          Save Tech Stack
        </button>
      }
    >
      <textarea rows={10} value={value} onChange={(event) => onChange(event.target.value)} className={fieldClassName} />
    </SectionCard>
  );
}
