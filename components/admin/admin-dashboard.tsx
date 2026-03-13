"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FaGear, FaCode, FaBriefcase, FaFolder, FaAddressCard } from "react-icons/fa6";
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

const navItems = [
    { id: "site-settings", label: "Site Settings", icon: FaGear },
    { id: "tech-stack", label: "Tech Stack", icon: FaCode },
    { id: "work-experience", label: "Work Experience", icon: FaBriefcase },
    { id: "projects", label: "Projects", icon: FaFolder },
    { id: "info-entries", label: "Info Entries", icon: FaAddressCard },
] as const;

type SectionId = (typeof navItems)[number]["id"];

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
    const [activeSection, setActiveSection] = useState<SectionId>("site-settings");

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
            setSaveState((current) => ({
                ...current,
                [section]: formatStatus("success", "Saved successfully."),
            }));
        },
        onError: (error, { section }) => {
            setSaveState((current) => ({
                ...current,
                [section]: formatStatus("error", error instanceof Error ? error.message : "Network error."),
            }));
        },
    });

    const activeIndex = navItems.findIndex((i) => i.id === activeSection);

    return (
        <div className="flex items-start gap-6">
            {/* ── Sticky Sidebar Navigation ── */}
            <nav className="hidden xl:block w-52 shrink-0">
                <div className="sticky top-8 overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(12,16,24,0.88),rgba(5,7,10,0.92))] p-4 shadow-2xl backdrop-blur-2xl ring-1 ring-inset ring-white/5">
                    {/* Sidebar glow */}
                    <div className="pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full bg-cyan-500/10 blur-[60px]" />

                    <p className="relative mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-400/60">Navigasi</p>

                    {/* Nav items */}
                    <div className="relative space-y-0.5">
                        {navItems.map(({ id, label, icon: Icon }) => {
                            const isActive = activeSection === id;
                            return (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => setActiveSection(id)}
                                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? "bg-cyan-500/15 text-cyan-200 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.2)]"
                                            : "text-gray-500 hover:bg-white/5 hover:text-gray-200"
                                    }`}
                                >
                                    <Icon
                                        className={`h-4 w-4 shrink-0 transition-colors duration-200 ${
                                            isActive ? "text-cyan-400" : "text-gray-600 group-hover:text-gray-400"
                                        }`}
                                    />
                                    <span className="truncate">{label}</span>
                                    {isActive && (
                                        <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Step indicator */}
                    <div className="relative mt-4 border-t border-white/5 pt-4">
                        <div className="mb-2 flex items-center justify-between px-1">
                            <p className="text-[10px] font-medium text-gray-600">Section</p>
                            <p className="text-[10px] font-semibold text-cyan-400/70">
                                {activeIndex + 1} / {navItems.length}
                            </p>
                        </div>
                        <div className="flex gap-1">
                            {navItems.map((item, i) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setActiveSection(item.id)}
                                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                        i === activeIndex
                                            ? "bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]"
                                            : i < activeIndex
                                              ? "bg-cyan-700/60"
                                              : "bg-white/10"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* ── Main Content Card ── */}
            <div className="relative min-w-0 flex-1 overflow-hidden rounded-[40px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,20,0.7),rgba(5,7,10,0.8))] p-5 shadow-2xl ring-1 ring-inset ring-white/5 backdrop-blur-3xl sm:p-8 lg:p-10">
                {/* Background effects */}
                <div className="pointer-events-none absolute -top-40 -right-40 h-125 w-125 rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="pointer-events-none absolute -bottom-40 -left-40 h-125 w-125 rounded-full bg-blue-600/10 blur-[120px]" />
                <div className="pointer-events-none absolute top-1/2 left-1/2 h-200 w-250 -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-cyan-900/5 blur-[150px]" />

                <div className="relative space-y-8">
                    {/* Stats overview — always visible */}
                    <DashboardHero
                        techStackCount={techStackItems.length}
                        workExperienceCount={workExperiences.length}
                        projectCount={projects.length}
                        infoEntryCount={infoEntries.length}
                    />

                    {/* ── Mobile / Tablet Tab Bar ── */}
                    <div className="xl:hidden">
                        <div className="flex gap-1.5 overflow-x-auto rounded-2xl border border-white/10 bg-white/3 p-1.5 backdrop-blur-md scrollbar-hide">
                            {navItems.map(({ id, label, icon: Icon }) => {
                                const isActive = activeSection === id;
                                return (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => setActiveSection(id)}
                                        className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? "bg-cyan-500/20 text-cyan-200 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.25)]"
                                                : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
                                        }`}
                                    >
                                        <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-cyan-400" : "text-gray-600"}`} />
                                        <span className="whitespace-nowrap">{label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Active Section Content ── */}
                    <div key={activeSection} className="animate-in fade-in duration-200">
                        {activeSection === "site-settings" && (
                            <SiteSettingsSection
                                initialSiteSettings={siteSettings}
                                status={saveState.site}
                                onSave={(nextValue: SiteSettings) => {
                                    setSiteSettings(nextValue);
                                    saveMutation.mutate({
                                        section: "site",
                                        url: "/api/admin/site-settings",
                                        payload: nextValue,
                                    });
                                }}
                            />
                        )}

                        {activeSection === "tech-stack" && (
                            <TechStackSection
                                initialValue={techStackItems.join("\n")}
                                status={saveState.tech}
                                onSave={(nextValue) => {
                                    const items = parseLines(nextValue);
                                    setTechStackItems(items);
                                    saveMutation.mutate({
                                        section: "tech",
                                        url: "/api/admin/tech-stack",
                                        payload: { items },
                                    });
                                }}
                            />
                        )}

                        {activeSection === "work-experience" && (
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
                        )}

                        {activeSection === "projects" && (
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
                                onChange={(id, updater) =>
                                    setProjects((current) => current.map((item) => (item.id === id ? updater(item) : item)))
                                }
                                onRemove={(id) => setProjects((current) => current.filter((item) => item.id !== id))}
                            />
                        )}

                        {activeSection === "info-entries" && (
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
                                onChange={(id, updater) =>
                                    setInfoEntries((current) => current.map((item) => (item.id === id ? updater(item) : item)))
                                }
                                onRemove={(id) => setInfoEntries((current) => current.filter((item) => item.id !== id))}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
