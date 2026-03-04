import Image from "next/image";
import type { Project, RepoStats } from "@/components/portfolio/types";
import { MotionReveal } from "@/components/portfolio/ui/motion-reveal";
import { ReactElement } from "react";

type ProjectCardProps = {
    project: Project;
    index: number;
    stats?: RepoStats;
    onClick: () => void;
};

export function ProjectCard({ project, index, stats, onClick }: ProjectCardProps): ReactElement {
    return (
        <MotionReveal variant="fade-up" delay={index * 0.1}>
            <div
                className="group relative cursor-pointer shadow-[0_10px_30px_rgb(0_0_0/0.35)] transition-[transform,box-shadow] duration-200 ease-out transform-[perspective(900px)_rotateX(0deg)_rotateY(0deg)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_45%)] before:opacity-0 before:transition-opacity before:duration-200 before:content-[''] hover:shadow-[0_18px_40px_rgb(0_0_0/0.45)] hover:transform-[perspective(900px)_rotateX(4deg)_rotateY(-4deg)_translateY(-4px)] hover:before:opacity-100"
                onClick={onClick}
            >
                <div className="relative mb-4 aspect-video overflow-hidden border border-border bg-zinc-900">
                    <div className="absolute inset-0 z-10 bg-black/20 transition group-hover:bg-transparent" />
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                </div>
                <h3 className="text-xl font-bold text-white transition group-hover:text-gray-300">{project.title}</h3>
                <p className="mt-2 mb-3 line-clamp-2 text-sm text-gray-500">{project.description}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                    {project.tech.map((item) => (
                        <span key={`${project.title}-${item}`} className="border border-zinc-700 px-2 py-1 text-gray-300">
                            {item}
                        </span>
                    ))}
                </div>
                {stats && project.repoHref ? (
                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-400">
                        <span className="border border-zinc-800 px-2 py-1">Stars {stats.stars}</span>
                        <span className="border border-zinc-800 px-2 py-1">Forks {stats.forks}</span>
                        <span className="border border-zinc-800 px-2 py-1">Updated {stats.updated}</span>
                    </div>
                ) : null}
            </div>
        </MotionReveal>
    );
}
