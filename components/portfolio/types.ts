export type ProjectCategory = "all" | "web" | "system" | "ai" | "backend" | "mobile" | "devops" | "uiux";

export type Project = {
    category: Exclude<ProjectCategory, "all">;
    title: string;
    description: string;
    tech: string[];
    image: string;
    repoHref?: string;
    repoApi?: string;
    demoHref?: string;
    features: string[];
};

export type RepoStats = {
    stars: number | string;
    forks: number | string;
    updated: string;
};

export type WorkExperience = {
    title: string;
    company: string;
    location: string;
    period: string;
    highlights: string[];
};

export type NavItem = {
    id: string;
    href: string;
    label: string;
};

export type InfoItem = {
    title: string;
    subtitle: string;
    period: string;
};

export type InfoGroup = {
    title: string;
    iconKey: string;
    items: InfoItem[];
};

export type SiteSettings = {
    siteTitle: string;
    siteDescription: string;
    heroBadge: string;
    heroName: string;
    heroRole: string;
    heroDescription: string;
    aboutDescription: string;
    resumeUrl: string;
    githubUrl: string;
    linkedinUrl: string;
    instagramUrl: string;
    contactTitle: string;
    contactDescription: string;
};

export type PortfolioContent = {
    siteSettings: SiteSettings;
    techStack: string[];
    workExperiences: WorkExperience[];
    projects: Project[];
    educationGroups: InfoGroup[];
    organizationGroups: InfoGroup[];
    awardGroups: InfoGroup[];
};
