"use client";

import type { AdminInfoEntryRecord } from "@/lib/admin-data";
import { infoIconOptions } from "@/lib/icon-map";
import { FaAddressCard } from "react-icons/fa6";
import {
  EditorCard,
  SectionCard,
  fieldClassName,
  selectClassName,
  labelClassName,
  primaryButtonClassName,
  secondaryButtonClassName,
} from "@/components/admin/dashboard/shared";

export function InfoEntriesSection({
  infoEntries,
  status,
  onAdd,
  onSave,
  onChange,
  onRemove,
}: {
  infoEntries: AdminInfoEntryRecord[];
  status?: string;
  onAdd: () => void;
  onSave: () => void;
  onChange: (
    id: string,
    updater: (current: AdminInfoEntryRecord) => AdminInfoEntryRecord,
  ) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <SectionCard
      eyebrow="Master Data"
      title="Info Entries"
      description="Kelola education, organization, dan award entries yang dipakai ulang di beberapa section."
      icon={FaAddressCard}
      status={status}
      actions={
        <>
          <button
            type="button"
            onClick={onAdd}
            className={secondaryButtonClassName}
          >
            Add Entry
          </button>
          <button
            type="button"
            onClick={onSave}
            className={primaryButtonClassName}
          >
            Save Entries
          </button>
        </>
      }
    >
      <div className="space-y-4">
        {infoEntries.map((entry, index) => (
          <EditorCard
            key={entry.id}
            title={`Entry #${index + 1}`}
            subtitle="Reusable Record"
            index={index}
            onRemove={() => onRemove(entry.id)}
          >
            <div className="grid gap-4 md:grid-cols-4">
              <label>
                <span className={labelClassName}>Section</span>
                <select
                  value={entry.section}
                  onChange={(event) =>
                    onChange(entry.id, (current) => ({
                      ...current,
                      section: event.target
                        .value as AdminInfoEntryRecord["section"],
                    }))
                  }
                  className={selectClassName}
                >
                  <option value="education">Education</option>
                  <option value="organization">Organization</option>
                  <option value="award">Award</option>
                </select>
              </label>
              <label>
                <span className={labelClassName}>Group Title</span>
                <input
                  value={entry.groupTitle}
                  onChange={(event) =>
                    onChange(entry.id, (current) => ({
                      ...current,
                      groupTitle: event.target.value,
                    }))
                  }
                  className={fieldClassName}
                />
              </label>
              <label>
                <span className={labelClassName}>Group Icon</span>
                <select
                  value={entry.groupIcon}
                  onChange={(event) =>
                    onChange(entry.id, (current) => ({
                      ...current,
                      groupIcon: event.target.value,
                    }))
                  }
                  className={selectClassName}
                >
                  {infoIconOptions.map((iconName) => (
                    <option key={iconName} value={iconName}>
                      {iconName}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className={labelClassName}>Group Order</span>
                <input
                  type="number"
                  value={entry.groupOrder}
                  onChange={(event) =>
                    onChange(entry.id, (current) => ({
                      ...current,
                      groupOrder: Number(event.target.value),
                    }))
                  }
                  className={fieldClassName}
                />
              </label>
              <label>
                <span className={labelClassName}>Title</span>
                <input
                  value={entry.title}
                  onChange={(event) =>
                    onChange(entry.id, (current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  className={fieldClassName}
                />
              </label>
              <label>
                <span className={labelClassName}>Subtitle</span>
                <input
                  value={entry.subtitle}
                  onChange={(event) =>
                    onChange(entry.id, (current) => ({
                      ...current,
                      subtitle: event.target.value,
                    }))
                  }
                  className={fieldClassName}
                />
              </label>
              <label>
                <span className={labelClassName}>Period</span>
                <input
                  value={entry.period}
                  onChange={(event) =>
                    onChange(entry.id, (current) => ({
                      ...current,
                      period: event.target.value,
                    }))
                  }
                  className={fieldClassName}
                />
              </label>
              <label>
                <span className={labelClassName}>Sort Order</span>
                <input
                  type="number"
                  value={entry.sortOrder}
                  onChange={(event) =>
                    onChange(entry.id, (current) => ({
                      ...current,
                      sortOrder: Number(event.target.value),
                    }))
                  }
                  className={fieldClassName}
                />
              </label>
            </div>
          </EditorCard>
        ))}
      </div>
    </SectionCard>
  );
}
