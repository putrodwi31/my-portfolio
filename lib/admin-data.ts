import type { InfoSection, ProjectCategory } from "@prisma/client";
import type { SiteSettings } from "@/components/portfolio/types";
import { prisma } from "@/lib/prisma";

export type AdminProjectRecord = {
    id: string;
    category: Exclude<ProjectCategory, never>;
    title: string;
    description: string;
    image: string;
    repoHref: string;
    repoApi: string;
    demoHref: string;
    sortOrder: number;
    tech: string[];
    features: string[];
};

export type AdminWorkExperienceRecord = {
    id: string;
    title: string;
    company: string;
    location: string;
    period: string;
    sortOrder: number;
    highlights: string[];
};

export type AdminInfoEntryRecord = {
    id: string;
    section: InfoSection;
    groupTitle: string;
    groupIcon: string;
    title: string;
    subtitle: string;
    period: string;
    groupOrder: number;
    sortOrder: number;
};

export type AdminDashboardData = {
    siteSettings: SiteSettings;
    techStack: string[];
    workExperiences: AdminWorkExperienceRecord[];
    projects: AdminProjectRecord[];
    infoEntries: AdminInfoEntryRecord[];
};

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
    const [siteSetting, techStack, workExperiences, projects, infoEntries] = await Promise.all([
        prisma.siteSetting.findUnique({ where: { id: 1 } }),
        prisma.techStackItem.findMany({ orderBy: { sortOrder: "asc" } }),
        prisma.workExperience.findMany({
            orderBy: { sortOrder: "asc" },
            include: {
                highlights: { orderBy: { sortOrder: "asc" } },
            },
        }),
        prisma.project.findMany({
            orderBy: { sortOrder: "asc" },
            include: {
                technologies: { orderBy: { sortOrder: "asc" } },
                features: { orderBy: { sortOrder: "asc" } },
            },
        }),
        prisma.infoEntry.findMany({ orderBy: [{ section: "asc" }, { groupOrder: "asc" }, { sortOrder: "asc" }] }),
    ]);

    if (!siteSetting) {
        throw new Error("Site settings not found. Run `npm run db:seed` first.");
    }

    return {
        siteSettings: {
            siteTitle: siteSetting.siteTitle,
            siteDescription: siteSetting.siteDescription,
            heroBadge: siteSetting.heroBadge,
            heroName: siteSetting.heroName,
            heroRole: siteSetting.heroRole,
            heroDescription: siteSetting.heroDescription,
            aboutDescription: siteSetting.aboutDescription,
            resumeUrl: siteSetting.resumeUrl,
            githubUrl: siteSetting.githubUrl,
            linkedinUrl: siteSetting.linkedinUrl ?? "",
            instagramUrl: siteSetting.instagramUrl ?? "",
            contactTitle: siteSetting.contactTitle,
            contactDescription: siteSetting.contactDescription,
        },
        techStack: techStack.map((item) => item.name),
        workExperiences: workExperiences.map((experience) => ({
            id: experience.id,
            title: experience.title,
            company: experience.company,
            location: experience.location,
            period: experience.period,
            sortOrder: experience.sortOrder,
            highlights: experience.highlights.map((item) => item.text),
        })),
        projects: projects.map((project) => ({
            id: project.id,
            category: project.category,
            title: project.title,
            description: project.description,
            image: project.image,
            repoHref: project.repoHref ?? "",
            repoApi: project.repoApi ?? "",
            demoHref: project.demoHref ?? "",
            sortOrder: project.sortOrder,
            tech: project.technologies.map((item) => item.name),
            features: project.features.map((item) => item.text),
        })),
        infoEntries: infoEntries.map((entry) => ({
            id: entry.id,
            section: entry.section,
            groupTitle: entry.groupTitle,
            groupIcon: entry.groupIcon,
            title: entry.title,
            subtitle: entry.subtitle,
            period: entry.period,
            groupOrder: entry.groupOrder,
            sortOrder: entry.sortOrder,
        })),
    };
}
