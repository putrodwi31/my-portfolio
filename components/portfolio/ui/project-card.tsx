"use client";

import Image from "next/image";
import type { Project, RepoStats } from "@/components/portfolio/types";
import { MotionReveal } from "@/components/portfolio/ui/motion-reveal";
import { ReactElement, useState, useRef } from "react";

type ProjectCardProps = {
    project: Project;
    index: number;
    stats?: RepoStats;
    onClick: () => void;
};

export function ProjectCard({ project, index, stats, onClick }: ProjectCardProps): ReactElement {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [cardTransform, setCardTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMousePosition({ x, y });

        // Calculate dynamic tilt based on mouse position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Moderate tilt values for subtle, professional effect
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        setCardTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`);
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        // Reset transform on leave back to default
        setCardTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    };

    return (
        <MotionReveal variant="fade-up" delay={index * 0.1}>
            <div
                ref={cardRef}
                onClick={onClick}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="group relative cursor-pointer overflow-hidden border border-zinc-800 bg-zinc-950 p-1 shadow-[0_10px_30px_rgb(0_0_0/0.35)] transition-all duration-200 ease-out sm:rounded-xl"
                style={{
                    transform: cardTransform,
                    transition: isHovering ? "transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1)" : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
                }}
            >
                {/* Mouse follow spotlight gradient overlay */}
                <div
                    className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300"
                    style={{
                        opacity: isHovering ? 1 : 0,
                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.08), transparent 45%)`,
                    }}
                />

                <div className="relative z-10 p-1">
                    <div className="relative mb-4 aspect-video overflow-hidden border border-zinc-800/60 bg-zinc-900 sm:rounded-lg">
                        <div className="absolute inset-0 z-10 bg-black/20 transition-colors duration-500 group-hover:bg-transparent" />
                        <Image
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            fill
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                        />
                    </div>
                </div>

                <div className="relative z-10 px-3 pb-4 pt-1 sm:px-4">
                    <h3 className="text-xl font-bold text-zinc-100 transition-colors duration-300 group-hover:text-white">{project.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400 line-clamp-2">{project.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        {project.tech.map((item) => (
                            <span
                                key={`${project.title}-${item}`}
                                className="rounded-md border border-zinc-800 bg-zinc-900/50 px-2.5 py-1 text-zinc-300 transition-colors duration-300 group-hover:border-zinc-700 group-hover:bg-zinc-800/50 group-hover:text-zinc-200"
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    {stats && project.repoHref ? (
                        <div className="mt-5 flex flex-wrap gap-3 text-xs text-zinc-500">
                            <span className="flex items-center gap-1.5 rounded-md border border-zinc-800/80 px-2 py-1 transition-colors group-hover:border-zinc-700/80">
                                Stars {stats.stars}
                            </span>
                            <span className="flex items-center gap-1.5 rounded-md border border-zinc-800/80 px-2 py-1 transition-colors group-hover:border-zinc-700/80">
                                Forks {stats.forks}
                            </span>
                            <span className="flex items-center gap-1.5 rounded-md border border-zinc-800/80 px-2 py-1 transition-colors group-hover:border-zinc-700/80">
                                Updated {stats.updated}
                            </span>
                        </div>
                    ) : null}
                </div>
            </div>
        </MotionReveal>
    );
}
