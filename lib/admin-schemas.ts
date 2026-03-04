import { z } from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
});

export const siteSettingsSchema = z.object({
    siteTitle: z.string().min(1),
    siteDescription: z.string().min(1),
    heroBadge: z.string().min(1),
    heroName: z.string().min(1),
    heroRole: z.string().min(1),
    heroDescription: z.string().min(1),
    aboutDescription: z.string().min(1),
    resumeUrl: z.string().min(1),
    githubUrl: z.string().min(1),
    linkedinUrl: z.string().default(""),
    instagramUrl: z.string().default(""),
    contactTitle: z.string().min(1),
    contactDescription: z.string().min(1),
});

export const techStackSchema = z.object({
    items: z.array(z.string().min(1)).min(1),
});

export const workExperienceSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1),
    company: z.string().min(1),
    location: z.string().min(1),
    period: z.string().min(1),
    sortOrder: z.number().int().min(0),
    highlights: z.array(z.string().min(1)).min(1),
});

export const workExperiencesSchema = z.object({
    workExperiences: z.array(workExperienceSchema),
});

export const projectSchema = z.object({
    id: z.string().optional(),
    category: z.enum(["web", "system", "ai", "backend", "mobile", "devops", "uiux"]),
    title: z.string().min(1),
    description: z.string().min(1),
    image: z.string().min(1),
    repoHref: z.string().default(""),
    repoApi: z.string().default(""),
    demoHref: z.string().default(""),
    sortOrder: z.number().int().min(0),
    tech: z.array(z.string().min(1)),
    features: z.array(z.string().min(1)),
});

export const projectsSchema = z.object({
    projects: z.array(projectSchema),
});

export const infoEntrySchema = z.object({
    id: z.string().optional(),
    section: z.enum(["education", "organization", "award"]),
    groupTitle: z.string().min(1),
    groupIcon: z.string().min(1),
    title: z.string().min(1),
    subtitle: z.string().min(1),
    period: z.string().min(1),
    groupOrder: z.number().int().min(0),
    sortOrder: z.number().int().min(0),
});

export const infoEntriesSchema = z.object({
    entries: z.array(infoEntrySchema),
});
