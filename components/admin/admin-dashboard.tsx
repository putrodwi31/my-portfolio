"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { DashboardHero } from "@/components/admin/dashboard/dashboard-hero";
import { InfoEntriesSection } from "@/components/admin/dashboard/info-entries-section";
import { AdminProjectsSection } from "@/components/admin/dashboard/projects-section";
import { SiteSettingsSection } from "@/components/admin/dashboard/site-settings-section";
import { TechStackSection } from "@/components/admin/dashboard/tech-stack-section";
import { WorkExperiencesSection } from "@/components/admin/dashboard/work-experiences-section";
import { formatStatus, parseLines } from "@/components/admin/dashboard/shared";
import type { SiteSettings } from "@/components/portfolio/types";
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
    const [techStackItems, setTechStackItems] = useState(initialData.techStack);
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
    const saveMutation = useMutation({
        mutationFn: async ({ url, payload }: { section: keyof SaveState; url: string; payload: object }) => {
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = (await response.json()) as { error?: string };

            if (!response.ok) {
                throw new Error(data.error ?? "Save failed.");
            }
        },
        onMutate: ({ section }) => {
            setSaveState((current) => ({ ...current, [section]: "" }));
        },
        onSuccess: (_, { section }) => {
            setSaveState((current) => ({ ...current, [section]: formatStatus("success", "Saved successfully.") }));
        },
        onError: (error, { section }) => {
            setSaveState((current) => ({
                ...current,
                [section]: formatStatus("error", error instanceof Error ? error.message : "Network error."),
            }));
        },
    });

    return (
        <div className="relative overflow-hidden rounded-[36px] border border-cyan-300/12 bg-[linear-gradient(180deg,rgba(3,7,12,0.5),rgba(2,2,4,0.42))] p-4 sm:p-6 lg:p-8">
            <div className="pointer-events-none absolute -top-28 -right-24 h-80 w-80 rounded-full bg-cyan-400/8 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-blue-400/6 blur-3xl" />

            <div className="relative space-y-10">
                <DashboardHero
                    techStackCount={techStackItems.length}
                    workExperienceCount={workExperiences.length}
                    projectCount={projects.length}
                    infoEntryCount={infoEntries.length}
                />

                <SiteSettingsSection
                    initialSiteSettings={siteSettings}
                    status={saveState.site}
                    onSave={(nextValue: SiteSettings) => {
                        setSiteSettings(nextValue);
                        saveMutation.mutate({ section: "site", url: "/api/admin/site-settings", payload: nextValue });
                    }}
                />

                <TechStackSection
                    initialValue={techStackItems.join("\n")}
                    status={saveState.tech}
                    onSave={(nextValue) => {
                        const items = parseLines(nextValue);
                        setTechStackItems(items);
                        saveMutation.mutate({ section: "tech", url: "/api/admin/tech-stack", payload: { items } });
                    }}
                />

                <WorkExperiencesSection
                    workExperiences={workExperiences}
                    status={saveState.work}
                    onAdd={() => setWorkExperiences((current) => [...current, createEmptyWorkExperience(current.length)])}
                    onSave={() =>
                        saveMutation.mutate({
                            section: "work",
                            url: "/api/admin/work-experiences",
                            payload: { workExperiences },
                        })
                    }
                    onChange={(id, updater) =>
                        setWorkExperiences((current) => current.map((item) => (item.id === id ? updater(item) : item)))
                    }
                    onRemove={(id) => setWorkExperiences((current) => current.filter((item) => item.id !== id))}
                />

                <AdminProjectsSection
                    projects={projects}
                    status={saveState.projects}
                    onAdd={() => setProjects((current) => [...current, createEmptyProject(current.length)])}
                    onSave={() =>
                        saveMutation.mutate({
                            section: "projects",
                            url: "/api/admin/projects",
                            payload: { projects },
                        })
                    }
                    onChange={(id, updater) => setProjects((current) => current.map((item) => (item.id === id ? updater(item) : item)))}
                    onRemove={(id) => setProjects((current) => current.filter((item) => item.id !== id))}
                />

                <InfoEntriesSection
                    infoEntries={infoEntries}
                    status={saveState.info}
                    onAdd={() => setInfoEntries((current) => [...current, createEmptyInfoEntry(current.length)])}
                    onSave={() =>
                        saveMutation.mutate({
                            section: "info",
                            url: "/api/admin/info-entries",
                            payload: { entries: infoEntries },
                        })
                    }
                    onChange={(id, updater) => setInfoEntries((current) => current.map((item) => (item.id === id ? updater(item) : item)))}
                    onRemove={(id) => setInfoEntries((current) => current.filter((item) => item.id !== id))}
                />
            </div>
        </div>
    );
}
