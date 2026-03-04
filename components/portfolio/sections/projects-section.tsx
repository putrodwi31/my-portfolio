import type { Project, ProjectCategory, RepoStats } from "@/components/portfolio/types";
import { MotionReveal } from "@/components/portfolio/ui/motion-reveal";
import { ProjectCard } from "@/components/portfolio/ui/project-card";
import { SectionShell } from "@/components/portfolio/ui/section-shell";
import { ReactElement } from "react";

type ProjectsSectionProps = {
    selectedFilter: ProjectCategory;
    onFilterChange: (filter: ProjectCategory) => void;
    projects: Project[];
    filteredProjects: Project[];
    repoStats: Record<string, RepoStats>;
    onProjectSelect: (project: Project) => void;
};

export function ProjectsSection({
    selectedFilter,
    onFilterChange,
    projects,
    filteredProjects,
    repoStats,
    onProjectSelect,
}: ProjectsSectionProps): ReactElement {
    const filters: ProjectCategory[] = ["all", ...Array.from(new Set(projects.map((project) => project.category)))];
    const filterLabels: Record<ProjectCategory, string> = {
        all: "All",
        web: "Web",
        system: "System",
        ai: "AI",
        backend: "Backend",
        mobile: "Mobile",
        devops: "DevOps",
        uiux: "UI/UX",
    };

    return (
        <SectionShell id="projects" className="border-t border-border py-24">
            <MotionReveal className="mb-12 flex flex-col justify-between md:flex-row md:items-end" variant="fade-in">
                <div>
                    <h2 className="mb-2 text-3xl font-bold text-white">Featured Projects</h2>
                    <p className="text-gray-400">Combination of visual design and code technicality.</p>
                </div>
                <a
                    href="https://github.com/putrodwi31"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 flex items-center gap-2 border-b border-white pb-1 text-white transition hover:text-gray-300 md:mt-0"
                >
                    <span>View Github</span>
                </a>
            </MotionReveal>

            <MotionReveal className="mb-8 flex flex-wrap gap-3" variant="fade-up">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        type="button"
                        onClick={() => onFilterChange(filter)}
                        aria-pressed={selectedFilter === filter}
                        className={`border bg-surface px-4 py-2 text-sm text-white transition hover:border-white ${
                            selectedFilter === filter ? "border-white" : "border-border"
                        }`}
                    >
                        {filterLabels[filter]}
                    </button>
                ))}
            </MotionReveal>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project, index) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        index={index}
                        stats={repoStats[project.title]}
                        onClick={() => onProjectSelect(project)}
                    />
                ))}
            </div>
        </SectionShell>
    );
}
