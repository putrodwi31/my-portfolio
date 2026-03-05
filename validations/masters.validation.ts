import { z } from "zod";
export const siteSettingsFormSchema = z.object({
    siteTitle: z.string().min(1),
    siteDescription: z.string().min(1),
    heroBadge: z.string().min(1),
    heroName: z.string().min(1),
    heroRole: z.string().min(1),
    heroDescription: z.string().min(1),
    aboutDescription: z.string().min(1),
    resumeUrl: z.string().min(1),
    githubUrl: z.string().min(1),
    linkedinUrl: z.string(),
    instagramUrl: z.string(),
    contactTitle: z.string().min(1),
    contactDescription: z.string().min(1),
});

export const techStackFormSchema = z.object({
    value: z.string().trim().min(1, "Tech stack cannot be empty."),
});
