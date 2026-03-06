import Image from "next/image";
import { FaGithub, FaTimes } from "react-icons/fa";
import { FaUpRightFromSquare } from "react-icons/fa6";
import type { Project } from "@/components/portfolio/types";
import { ReactElement, useEffect } from "react";

type ProjectModalProps = {
    project: Project;
    onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps): ReactElement {
    // Prevent body scrolling when the modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-border bg-bg p-0 shadow-2xl md:p-6" onClick={(event) => event.stopPropagation()}>
                <button
                    type="button"
                    aria-label="Close project modal"
                    className="absolute top-3 right-3 z-10 rounded-full bg-black/40 p-2 text-gray-300 backdrop-blur-sm transition hover:bg-black/80 hover:text-white md:bg-transparent md:p-0 md:backdrop-blur-none"
                    onClick={onClose}
                >
                    <FaTimes className="text-xl" />
                </button>
                <div className="grid gap-0 md:grid-cols-2 md:gap-6">
                    <div className="border-b border-border md:border-r md:border-b-0">
                        <div className="relative aspect-video bg-zinc-900">
                            <Image
                                src={project.image}
                                alt={project.title}
                                loading="lazy"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="space-y-4 p-6">
                        <div>
                            <p className="mb-1 text-xs tracking-[0.2em] text-gray-500 uppercase">Project</p>
                            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-400">{project.description}</p>
                        <div>
                            <h4 className="mb-2 text-sm font-semibold tracking-wider text-white uppercase">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((item) => (
                                    <span
                                        key={`${project.title}-modal-${item}`}
                                        className="border border-border px-2 py-1 text-xs text-gray-300"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="mb-2 text-sm font-semibold tracking-wider text-white uppercase">Key Features</h4>
                            <ul className="list-inside list-disc space-y-2 text-sm text-gray-400 marker:text-white">
                                {project.features.map((feature) => (
                                    <li key={`${project.title}-${feature}`}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-wrap gap-3 pt-2">
                            {project.repoHref ? (
                                <a
                                    href={project.repoHref}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 bg-white px-4 py-2 font-bold text-black transition hover:bg-gray-200"
                                >
                                    <FaGithub /> View Repository
                                </a>
                            ) : null}
                            {project.demoHref ? (
                                <a
                                    href={project.demoHref}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 border border-white px-4 py-2 font-bold text-white transition hover:bg-white hover:text-black"
                                >
                                    <FaUpRightFromSquare /> Live Demo
                                </a>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
