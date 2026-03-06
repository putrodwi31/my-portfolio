"use client";

import { ReactElement, useEffect, useState } from "react";
import { FaArrowRight, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import type { SiteSettings } from "@/components/portfolio/types";
import { MotionReveal } from "@/components/portfolio/ui/motion-reveal";

type HeroSectionProps = {
    siteSettings: SiteSettings;
};

export function HeroSection({ siteSettings }: HeroSectionProps): ReactElement {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Calculate parallax offsets based on mouse position
    const winWidth = typeof window !== "undefined" ? window.innerWidth : 1000;
    const winHeight = typeof window !== "undefined" ? window.innerHeight : 1000;

    // Abstract card tilt logic
    const calcRotateX = (mousePos.y - winHeight / 2) * -0.015;
    const calcRotateY = (mousePos.x - winWidth / 2) * 0.015;

    // Background orb shift logic (moves opposite to mouse)
    const bgShiftX = (mousePos.x - winWidth / 2) * -0.05;
    const bgShiftY = (mousePos.y - winHeight / 2) * -0.05;

    return (
        <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16 lg:min-h-screen">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-bg">
                <div
                    className="absolute top-0 right-[-10%] h-[500px] w-[500px] rounded-full bg-zinc-800/30 blur-[120px] transition-transform duration-1000 ease-out lg:top-[-20%] lg:right-[10%] lg:h-[800px] lg:w-[800px] lg:bg-zinc-800/40"
                    style={{ transform: isMounted ? `translate(${bgShiftX}px, ${bgShiftY}px)` : 'none' }}
                ></div>
                <div
                    className="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-zinc-900/50 blur-[100px] transition-transform duration-1000 ease-out lg:bottom-[-20%] lg:left-[5%] lg:h-[600px] lg:w-[600px]"
                    style={{ transform: isMounted ? `translate(${bgShiftX * -1.5}px, ${bgShiftY * -1.5}px)` : 'none' }}
                ></div>
            </div>

            {/* Grid background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:px-6">
                {/* Left Content column */}
                <MotionReveal variant="fade-up" duration={1}>
                    <div className="flex flex-col max-w-2xl">
                        <span className="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-zinc-800/80 bg-zinc-900/60 px-4 py-2.5 text-xs font-semibold tracking-widest text-zinc-300 uppercase backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-800/80 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                            </span>
                            {siteSettings.heroBadge}
                        </span>

                        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                            Hello, I am{" "}
                            <span className="block mt-2 bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600 bg-clip-text text-transparent drop-shadow-sm">
                                {siteSettings.heroName}
                            </span>
                        </h1>

                        <h2 className="mb-6 text-xl font-medium text-zinc-400 sm:text-2xl">
                            {siteSettings.heroRole}
                        </h2>

                        <p className="mb-10 max-w-xl text-base leading-relaxed text-zinc-500 sm:text-lg">
                            {siteSettings.heroDescription}
                        </p>

                        <div className="flex flex-wrap gap-4 mb-12">
                            <a
                                href="#projects"
                                className="group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-zinc-100 px-8 py-3.5 text-sm font-bold text-zinc-900 shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all hover:scale-105 hover:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-bg sm:w-auto"
                            >
                                <span className="relative z-10 flex items-center gap-2.5">
                                    View Projects <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                                </span>
                            </a>
                            <a
                                href="#contact"
                                className="flex items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/30 px-8 py-3.5 text-sm font-bold text-zinc-300 backdrop-blur-md transition-all duration-300 hover:border-zinc-400 hover:bg-zinc-800/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-bg sm:w-auto"
                            >
                                Contact Me
                            </a>
                        </div>

                        <div className="flex flex-col gap-4 border-t border-zinc-800/50 pt-8 sm:flex-row sm:items-center sm:gap-6">
                            <span className="text-sm font-medium text-zinc-500">Connect with me:</span>
                            <div className="flex gap-4">
                                <a
                                    href={siteSettings.githubUrl}
                                    aria-label="Visit GitHub profile"
                                    title="GitHub"
                                    className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/80 text-lg text-zinc-400 border border-zinc-800 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaGithub />
                                </a>
                                {siteSettings.linkedinUrl ? (
                                    <a
                                        href={siteSettings.linkedinUrl}
                                        aria-label="Visit LinkedIn profile"
                                        title="LinkedIn"
                                        className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/80 text-lg text-zinc-400 border border-zinc-800 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FaLinkedin />
                                    </a>
                                ) : null}
                                {siteSettings.instagramUrl ? (
                                    <a
                                        href={siteSettings.instagramUrl}
                                        aria-label="Visit Instagram profile"
                                        title="Instagram"
                                        className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/80 text-lg text-zinc-400 border border-zinc-800 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FaInstagram />
                                    </a>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </MotionReveal>

                {/* Right Abstract Visual column */}
                <MotionReveal variant="fade-up" duration={1.2} delay={0.2}>
                    <div className="hidden lg:flex relative h-full w-full items-center justify-center">
                        {/* Soft glowing orb behind the card */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-zinc-500/10 rounded-full blur-[80px] animate-pulse"></div>

                        {/* 3D Container for perspective */}
                        <div className="relative flex h-[460px] w-full max-w-[380px] perspective-[1000px]">
                            {/* Glassmorphism Abstract Card with Dynamic Tilt */}
                            <div
                                className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-zinc-700/50 bg-zinc-900/40 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-[transform] duration-200 ease-out"
                                style={{
                                    transform: isMounted ? `rotateX(${calcRotateX}deg) rotateY(${calcRotateY}deg)` : 'rotateX(5deg) rotateY(-5deg)',
                                }}
                            >
                                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-zinc-600/20 blur-3xl"></div>
                                <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-zinc-700/20 blur-3xl"></div>

                                {/* Decorative Top header of card */}
                                <div className="flex items-center justify-between border-b border-zinc-700/50 pb-5 opacity-90 z-10">
                                    <div className="flex gap-2.5">
                                        <div className="h-3 w-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                                        <div className="h-3 w-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
                                        <div className="h-3 w-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                                    </div>
                                    <div className="h-2 w-16 rounded-full bg-zinc-700/50"></div>
                                </div>

                                {/* Floating Code-like blocks */}
                                <div className="mt-8 flex flex-col gap-6 opacity-60 z-10">
                                    <div className="flex flex-col gap-3">
                                        <div className="h-3 w-3/4 rounded-full bg-gradient-to-r from-zinc-500 to-zinc-700"></div>
                                        <div className="flex gap-3">
                                            <div className="h-3 w-1/4 rounded-full bg-zinc-700"></div>
                                            <div className="h-3 w-1/3 rounded-full bg-zinc-700"></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="h-3 w-full rounded-full bg-zinc-700/80"></div>
                                        <div className="h-3 w-5/6 rounded-full bg-zinc-700/80"></div>
                                        <div className="h-3 w-1/2 rounded-full bg-zinc-700/80"></div>
                                    </div>
                                </div>

                                {/* Decorative grid modules */}
                                <div className="mt-auto pt-6 grid grid-cols-2 gap-4 opacity-70 z-10">
                                    <div className="relative h-20 overflow-hidden rounded-2xl bg-zinc-800/80 border border-zinc-600/40 shadow-inner">
                                        <div className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-white/5 blur-xl"></div>
                                    </div>
                                    <div className="relative h-20 overflow-hidden rounded-2xl bg-zinc-800/80 border border-zinc-600/40 shadow-inner">
                                        <div className="absolute -left-4 -bottom-4 h-12 w-12 rounded-full bg-white/5 blur-xl"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary floating element behind the main card */}
                            <div
                                className="absolute -right-8 bottom-12 h-32 w-32 rounded-2xl border border-zinc-700/30 bg-zinc-800/20 backdrop-blur-md shadow-2xl transition-[transform] duration-200 ease-out"
                                style={{
                                    transform: isMounted ? `translateZ(-50px) rotateX(${calcRotateX * 1.5}deg) rotateY(${calcRotateY * 1.5}deg) translateX(${bgShiftX * 0.5}px)` : 'rotateX(5deg) rotateY(-5deg)',
                                }}
                            >
                                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                    <FaGithub className="text-4xl text-zinc-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </MotionReveal>
            </div>
        </section>
    );
}
