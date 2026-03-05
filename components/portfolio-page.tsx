"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { navItems } from "@/components/portfolio/data";
import { AboutSection } from "@/components/portfolio/sections/about-section";
import { ContactSection } from "@/components/portfolio/sections/contact-section";
import { HeroSection } from "@/components/portfolio/sections/hero-section";
import { InfoGroupsSection } from "@/components/portfolio/sections/info-groups-section";
import { ProjectsSection } from "@/components/portfolio/sections/projects-section";
import { SiteFooter } from "@/components/portfolio/sections/site-footer";
import { WorkSection } from "@/components/portfolio/sections/work-section";
import type { PortfolioContent, Project, ProjectCategory, RepoStats } from "@/components/portfolio/types";
import { formatUpdatedDate } from "@/components/portfolio/utils";
import { ProjectModal } from "@/components/portfolio/ui/project-modal";
import { SiteNav } from "@/components/portfolio/ui/site-nav";
import { SupportModal } from "@/components/portfolio/ui/support-modal";
import { ToastNotification } from "@/components/portfolio/ui/toast-notification";
import { TContactForm } from "@/validations/contacts.validation";

type PortfolioPageProps = {
    content: PortfolioContent;
};

export default function PortfolioPage({ content }: PortfolioPageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("intro");
    const [selectedFilter, setSelectedFilter] = useState<ProjectCategory>("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [supportOpen, setSupportOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const filteredProjects =
        selectedFilter === "all" ? content.projects : content.projects.filter((project) => project.category === selectedFilter);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => setIsLoading(false), 500);
        return () => window.clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        const onScroll = () => {
            const offset = window.scrollY + 140;
            let currentSection = "intro";

            for (const item of navItems.slice(1)) {
                const section = document.getElementById(item.id);
                if (section && section.offsetTop <= offset) {
                    currentSection = item.id;
                }
            }

            setActiveSection(currentSection);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const shouldLock = selectedProject !== null || supportOpen;
        document.body.classList.toggle("overflow-hidden", shouldLock);
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [selectedProject, supportOpen]);

    const { data: repoStats = {} } = useQuery<Record<string, RepoStats>>({
        queryKey: ["repo-stats", content.projects],
        queryFn: async () => {
            const entries: Array<[string, RepoStats] | null> = await Promise.all(
                content.projects.map(async (project) => {
                    if (!project.repoHref?.trim() || !project.repoApi?.trim()) {
                        return null;
                    }

                    try {
                        const response = await fetch(`https://api.github.com/repos/${project.repoApi}`);
                        if (!response.ok) {
                            return [project.title, { stars: "--", forks: "--", updated: "--" }];
                        }
                        const data = (await response.json()) as {
                            stargazers_count?: number;
                            forks_count?: number;
                            updated_at?: string;
                        };
                        return [
                            project.title,
                            {
                                stars: data.stargazers_count ?? "--",
                                forks: data.forks_count ?? "--",
                                updated: formatUpdatedDate(data.updated_at),
                            },
                        ];
                    } catch {
                        return [project.title, { stars: "--", forks: "--", updated: "--" }];
                    }
                }),
            );

            const validEntries = entries.filter((entry): entry is [string, RepoStats] => entry !== null);
            return Object.fromEntries(validEntries);
        },
        staleTime: 5 * 60 * 1000,
    });

    useEffect(() => {
        if (!showNotification) return undefined;
        const timeoutId = window.setTimeout(() => setShowNotification(false), 3000);
        return () => window.clearTimeout(timeoutId);
    }, [showNotification]);

    useEffect(() => {
        const onEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedProject(null);
                setSupportOpen(false);
            }
        };

        window.addEventListener("keydown", onEscape);
        return () => window.removeEventListener("keydown", onEscape);
    }, []);

    const contactMutation = useMutation({
        mutationFn: async (payload: TContactForm) => {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: payload.email,
                    message: payload.message,
                    captchaToken: payload.captchaToken,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }
        },
    });

    const handleSubmit = async (payload: TContactForm) => {
        try {
            await contactMutation.mutateAsync(payload);
            setShowNotification(true);
            return true;
        } catch {
            window.alert("Error sending message");
            return false;
        }
    };

    return (
        <main>
            {isLoading ? (
                <div id="loading-screen">
                    <div className="text-center">
                        <div className="loader" />
                        <div className="loading-logo">&lt;putro /&gt;</div>
                        <div className="loading-text">Loading...</div>
                    </div>
                </div>
            ) : null}

            {showNotification ? (
                <ToastNotification message="Pesan Anda telah berhasil terkirim." onClose={() => setShowNotification(false)} />
            ) : null}

            <SiteNav
                items={navItems}
                activeSection={activeSection}
                mobileMenuOpen={mobileMenuOpen}
                onToggleMobileMenu={() => setMobileMenuOpen((value) => !value)}
                onCloseMobileMenu={() => setMobileMenuOpen(false)}
            />

            <HeroSection siteSettings={content.siteSettings} />
            <AboutSection siteSettings={content.siteSettings} techStack={content.techStack} />
            <WorkSection workExperiences={content.workExperiences} />
            <ProjectsSection
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
                projects={content.projects}
                filteredProjects={filteredProjects}
                repoStats={repoStats}
                onProjectSelect={setSelectedProject}
            />
            <InfoGroupsSection id="education" className="border-t border-border py-24" groups={content.educationGroups} />
            <InfoGroupsSection
                id="organization"
                className="border-t border-border bg-surface/20 py-24"
                groups={content.organizationGroups}
            />
            <InfoGroupsSection id="awards" className="border-t border-border bg-surface/20 py-24" groups={content.awardGroups} />
            <ContactSection siteSettings={content.siteSettings} isSubmitting={contactMutation.isPending} onSubmit={handleSubmit} />
            <SiteFooter onOpenSupport={() => setSupportOpen(true)} />

            {selectedProject ? <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} /> : null}
            {supportOpen ? <SupportModal onClose={() => setSupportOpen(false)} /> : null}
        </main>
    );
}
