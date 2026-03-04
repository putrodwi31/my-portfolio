"use client";

import { FileUploadControl } from "@/components/admin/file-upload-control";
import {
  EditorCard,
  SectionCard,
  fieldClassName,
  panelCardClassName,
  parseLines,
  primaryButtonClassName,
  secondaryButtonClassName,
} from "@/components/admin/dashboard/shared";
import type { AdminProjectRecord } from "@/lib/admin-data";

export function AdminProjectsSection({
  projects,
  status,
  onAdd,
  onSave,
  onChange,
  onRemove,
}: {
  projects: AdminProjectRecord[];
  status?: string;
  onAdd: () => void;
  onSave: () => void;
  onChange: (id: string, updater: (current: AdminProjectRecord) => AdminProjectRecord) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <SectionCard
      eyebrow="Master Data"
      title="Projects"
      description="Kelola kategori, media, link, dan detail project yang muncul di portfolio."
      status={status}
      actions={
        <>
          <button type="button" onClick={onAdd} className={secondaryButtonClassName}>
            Add Project
          </button>
          <button type="button" onClick={onSave} className={primaryButtonClassName}>
            Save Projects
          </button>
        </>
      }
    >
      <div className="space-y-6">
        {projects.map((project, index) => (
          <EditorCard key={project.id} title={`Project #${index + 1}`} subtitle="Portfolio Item" onRemove={() => onRemove(project.id)}>
            <div className="grid gap-4 md:grid-cols-2">
              <label>
                <span className="mb-2 block text-sm text-gray-400">Category</span>
                <select
                  value={project.category}
                  onChange={(event) => onChange(project.id, (current) => ({ ...current, category: event.target.value as AdminProjectRecord["category"] }))}
                  className={fieldClassName}
                >
                  <option value="web">Web</option>
                  <option value="system">System</option>
                  <option value="ai">AI</option>
                  <option value="backend">Backend</option>
                  <option value="mobile">Mobile</option>
                  <option value="devops">DevOps</option>
                  <option value="uiux">UI/UX</option>
                </select>
              </label>
              <label>
                <span className="mb-2 block text-sm text-gray-400">Sort Order</span>
                <input
                  type="number"
                  value={project.sortOrder}
                  onChange={(event) => onChange(project.id, (current) => ({ ...current, sortOrder: Number(event.target.value) }))}
                  className={fieldClassName}
                />
              </label>
              {[
                ["title", "Title"],
                ["repoHref", "Repository URL"],
                ["repoApi", "Repository API Path"],
                ["demoHref", "Demo URL"],
              ].map(([key, label]) => (
                <label key={key}>
                  <span className="mb-2 block text-sm text-gray-400">{label}</span>
                  <input
                    value={project[key as keyof AdminProjectRecord] as string}
                    onChange={(event) => onChange(project.id, (current) => ({ ...current, [key]: event.target.value }))}
                    className={fieldClassName}
                  />
                </label>
              ))}
              <label>
                <span className="mb-2 block text-sm text-gray-400">Image URL</span>
                <input
                  value={project.image}
                  onChange={(event) => onChange(project.id, (current) => ({ ...current, image: event.target.value }))}
                  className={fieldClassName}
                />
              </label>
              <div className={panelCardClassName}>
                <span className="mb-2 block text-sm text-gray-400">Upload Project Image</span>
                <FileUploadControl
                  accept="image/*"
                  buttonLabel="Upload Image"
                  currentValue={project.image}
                  kind="image"
                  onUploaded={(url) => onChange(project.id, (current) => ({ ...current, image: url }))}
                />
              </div>
              <label className="md:col-span-2">
                <span className="mb-2 block text-sm text-gray-400">Description</span>
                <textarea
                  rows={3}
                  value={project.description}
                  onChange={(event) => onChange(project.id, (current) => ({ ...current, description: event.target.value }))}
                  className={fieldClassName}
                />
              </label>
              <label>
                <span className="mb-2 block text-sm text-gray-400">Tech Stack (one per line)</span>
                <textarea
                  rows={5}
                  value={project.tech.join("\n")}
                  onChange={(event) => onChange(project.id, (current) => ({ ...current, tech: parseLines(event.target.value) }))}
                  className={fieldClassName}
                />
              </label>
              <label>
                <span className="mb-2 block text-sm text-gray-400">Features (one per line)</span>
                <textarea
                  rows={5}
                  value={project.features.join("\n")}
                  onChange={(event) => onChange(project.id, (current) => ({ ...current, features: parseLines(event.target.value) }))}
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
