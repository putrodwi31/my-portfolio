import type { InfoSection, ProjectCategory } from "@prisma/client";
import type { InfoGroup, PortfolioContent, Project, SiteSettings, WorkExperience } from "@/components/portfolio/types";
import { prisma } from "@/lib/prisma";

function groupInfoEntries(
    section: InfoSection,
    entries: Array<{
        section: InfoSection;
        groupTitle: string;
        groupIcon: string;
        title: string;
        subtitle: string;
        period: string;
        groupOrder: number;
        sortOrder: number;
    }>,
): InfoGroup[] {
    const grouped = new Map<string, { title: string; iconKey: string; groupOrder: number; items: InfoGroup["items"] }>();

    for (const entry of entries.filter((item) => item.section === section)) {
        const current = grouped.get(entry.groupTitle) ?? {
            title: entry.groupTitle,
            iconKey: entry.groupIcon,
            groupOrder: entry.groupOrder,
            items: [],
        };

        current.items.push({
            title: entry.title,
            subtitle: entry.subtitle,
            period: entry.period,
        });

        grouped.set(entry.groupTitle, current);
    }

    return [...grouped.values()]
        .sort((a, b) => a.groupOrder - b.groupOrder)
        .map((group) => ({
            title: group.title,
            iconKey: group.iconKey,
            items: group.items,
        }));
}

function normalizeCategory(category: ProjectCategory): Project["category"] {
    return category;
}

function mapSiteSetting(setting: {
    siteTitle: string;
    siteDescription: string;
    heroBadge: string;
    heroName: string;
    heroRole: string;
    heroDescription: string;
    aboutDescription: string;
    resumeUrl: string;
    githubUrl: string;
    linkedinUrl: string | null;
    instagramUrl: string | null;
    contactTitle: string;
    contactDescription: string;
}): SiteSettings {
    return {
        siteTitle: setting.siteTitle,
        siteDescription: setting.siteDescription,
        heroBadge: setting.heroBadge,
        heroName: setting.heroName,
        heroRole: setting.heroRole,
        heroDescription: setting.heroDescription,
        aboutDescription: setting.aboutDescription,
        resumeUrl: setting.resumeUrl,
        githubUrl: setting.githubUrl,
        linkedinUrl: setting.linkedinUrl ?? "",
        instagramUrl: setting.instagramUrl ?? "",
        contactTitle: setting.contactTitle,
        contactDescription: setting.contactDescription,
    };
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
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
        prisma.infoEntry.findMany({
            orderBy: [{ section: "asc" }, { groupOrder: "asc" }, { sortOrder: "asc" }],
        }),
    ]);

    if (!siteSetting) {
        throw new Error("Site settings not found. Run `npm run db:seed` first.");
    }

    return {
        siteSettings: mapSiteSetting(siteSetting),
        techStack: techStack.map((item) => item.name),
        workExperiences: workExperiences.map(
            (experience): WorkExperience => ({
                title: experience.title,
                company: experience.company,
                location: experience.location,
                period: experience.period,
                highlights: experience.highlights.map((item) => item.text),
            }),
        ),
        projects: projects.map(
            (project): Project => ({
                category: normalizeCategory(project.category),
                title: project.title,
                description: project.description,
                tech: project.technologies.map((item) => item.name),
                image: project.image,
                repoHref: project.repoHref ?? undefined,
                repoApi: project.repoApi ?? undefined,
                demoHref: project.demoHref ?? undefined,
                features: project.features.map((item) => item.text),
            }),
        ),
        educationGroups: groupInfoEntries("education", infoEntries),
        organizationGroups: groupInfoEntries("organization", infoEntries),
        awardGroups: groupInfoEntries("award", infoEntries),
    };
}
