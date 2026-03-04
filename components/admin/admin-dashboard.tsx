"use client";

import { useState } from "react";
import { DashboardHero } from "@/components/admin/dashboard/dashboard-hero";
import { InfoEntriesSection } from "@/components/admin/dashboard/info-entries-section";
import { AdminProjectsSection } from "@/components/admin/dashboard/projects-section";
import { SiteSettingsSection } from "@/components/admin/dashboard/site-settings-section";
import { TechStackSection } from "@/components/admin/dashboard/tech-stack-section";
import { WorkExperiencesSection } from "@/components/admin/dashboard/work-experiences-section";
import { formatStatus, parseLines } from "@/components/admin/dashboard/shared";
import type { AdminDashboardData, AdminInfoEntryRecord, AdminProjectRecord, AdminWorkExperienceRecord } from "@/lib/admin-data";
import { infoIconOptions } from "@/lib/icon-map";

type AdminDashboardProps = {
  initialData: AdminDashboardData;
};

type SaveState = {
  site: string;
  tech: string;
  work: string;
  projects: string;
  info: string;
};

function createEmptyProject(sortOrder: number): AdminProjectRecord {
  return {
    id: `new-project-${sortOrder}`,
    category: "web",
    title: "",
    description: "",
    image: "",
    repoHref: "",
    repoApi: "",
    demoHref: "",
    sortOrder,
    tech: [],
    features: [],
  };
}

function createEmptyInfoEntry(sortOrder: number): AdminInfoEntryRecord {
  return {
    id: `new-entry-${sortOrder}`,
    section: "education",
    groupTitle: "",
    groupIcon: infoIconOptions[0] ?? "FaUsers",
    title: "",
    subtitle: "",
    period: "",
    groupOrder: 0,
    sortOrder,
  };
}

function createEmptyWorkExperience(sortOrder: number): AdminWorkExperienceRecord {
  return {
    id: `new-work-${sortOrder}`,
    title: "",
    company: "",
    location: "",
    period: "",
    sortOrder,
    highlights: [],
  };
}

export function AdminDashboard({ initialData }: AdminDashboardProps) {
  const [siteSettings, setSiteSettings] = useState(initialData.siteSettings);
  const [techStackText, setTechStackText] = useState(initialData.techStack.join("\n"));
  const [workExperiences, setWorkExperiences] = useState(initialData.workExperiences);
  const [projects, setProjects] = useState(initialData.projects);
  const [infoEntries, setInfoEntries] = useState(initialData.infoEntries);
  const [saveState, setSaveState] = useState<SaveState>({
    site: "",
    tech: "",
    work: "",
    projects: "",
    info: "",
  });

  const saveSection = async (section: keyof SaveState, url: string, payload: object) => {
    setSaveState((current) => ({ ...current, [section]: "" }));

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setSaveState((current) => ({ ...current, [section]: formatStatus("error", data.error ?? "Save failed.") }));
        return;
      }

      setSaveState((current) => ({ ...current, [section]: formatStatus("success", "Saved successfully.") }));
    } catch {
      setSaveState((current) => ({ ...current, [section]: formatStatus("error", "Network error.") }));
    }
  };

  return (
    <div className="space-y-10">
      <DashboardHero
        techStackCount={initialData.techStack.length}
        workExperienceCount={workExperiences.length}
        projectCount={projects.length}
        infoEntryCount={infoEntries.length}
      />

      <SiteSettingsSection
        siteSettings={siteSettings}
        status={saveState.site}
        onChange={setSiteSettings}
        onSave={() => saveSection("site", "/api/admin/site-settings", siteSettings)}
      />

      <TechStackSection
        value={techStackText}
        status={saveState.tech}
        onChange={setTechStackText}
        onSave={() => saveSection("tech", "/api/admin/tech-stack", { items: parseLines(techStackText) })}
      />

      <WorkExperiencesSection
        workExperiences={workExperiences}
        status={saveState.work}
        onAdd={() => setWorkExperiences((current) => [...current, createEmptyWorkExperience(current.length)])}
        onSave={() => saveSection("work", "/api/admin/work-experiences", { workExperiences })}
        onChange={(id, updater) =>
          setWorkExperiences((current) => current.map((item) => (item.id === id ? updater(item) : item)))
        }
        onRemove={(id) => setWorkExperiences((current) => current.filter((item) => item.id !== id))}
      />

      <AdminProjectsSection
        projects={projects}
        status={saveState.projects}
        onAdd={() => setProjects((current) => [...current, createEmptyProject(current.length)])}
        onSave={() => saveSection("projects", "/api/admin/projects", { projects })}
        onChange={(id, updater) => setProjects((current) => current.map((item) => (item.id === id ? updater(item) : item)))}
        onRemove={(id) => setProjects((current) => current.filter((item) => item.id !== id))}
      />

      <InfoEntriesSection
        infoEntries={infoEntries}
        status={saveState.info}
        onAdd={() => setInfoEntries((current) => [...current, createEmptyInfoEntry(current.length)])}
        onSave={() => saveSection("info", "/api/admin/info-entries", { entries: infoEntries })}
        onChange={(id, updater) => setInfoEntries((current) => current.map((item) => (item.id === id ? updater(item) : item)))}
        onRemove={(id) => setInfoEntries((current) => current.filter((item) => item.id !== id))}
      />
    </div>
  );
}
