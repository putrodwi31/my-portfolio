"use client";

import { useMutation } from "@tanstack/react-query";
import { useId, useState } from "react";
import type { IconType } from "react-icons";
import { FaCheck, FaX } from "react-icons/fa6";

type FileUploadControlProps = {
    accept: string;
    buttonLabel: string;
    currentValue?: string;
    kind: "document" | "image";
    icon?: IconType;
    onUploaded: (url: string) => void;
};

export function FileUploadControl({ accept, buttonLabel, currentValue, kind, icon: Icon, onUploaded }: FileUploadControlProps) {
    const inputId = useId();
    const [message, setMessage] = useState("");
    const uploadMutation = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("kind", kind);

            const response = await fetch("/api/admin/upload", {
                method: "POST",
                body: formData,
            });

            const payload = (await response.json()) as { error?: string; url?: string };

            if (!response.ok || !payload.url) {
                throw new Error(payload.error ?? "Upload failed.");
            }

            return payload.url;
        },
    });

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setMessage("");

        try {
            const uploadedUrl = await uploadMutation.mutateAsync(file);
            onUploaded(uploadedUrl);
            setMessage("Upload successful.");
        } catch (cause) {
            setMessage(cause instanceof Error ? cause.message : "Upload failed.");
        } finally {
            event.target.value = "";
        }
    };

    const isError = message.endsWith("failed.") || message.includes("Invalid") || message.includes("Too many");

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
                <label
                    htmlFor={inputId}
                    className="group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border border-cyan-600/40 bg-cyan-950/30 px-4 py-2.5 text-sm font-medium tracking-wide text-cyan-100 transition-all duration-300 hover:scale-105 hover:border-cyan-500/60 hover:bg-cyan-900/40 hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)] hover:text-cyan-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
                    title={uploadMutation.isPending ? "Uploading..." : "Click to select a file"}
                >
                    {uploadMutation.isPending ? (
                        <>
                            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            <span>Uploading</span>
                        </>
                    ) : (
                        <>
                            {Icon ? (
                                <Icon className="h-4 w-4" />
                            ) : (
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                                </svg>
                            )}
                            <span>{buttonLabel}</span>
                        </>
                    )}
                </label>
                <input
                    id={inputId}
                    type="file"
                    accept={accept}
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={uploadMutation.isPending}
                />
                {currentValue ? (
                    <a
                        href={currentValue}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400/80 transition-colors hover:text-cyan-300 hover:underline"
                    >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                        View current
                    </a>
                ) : null}
            </div>
            {message ? (
                <p
                    className={`animate-in fade-in text-xs font-medium inline-flex items-center gap-1.5 ${isError ? "text-red-300" : "text-emerald-300"}`}
                >
                    {isError ? <FaX className="h-3.5 w-3.5" /> : <FaCheck className="h-3.5 w-3.5" />}
                    {message}
                </p>
            ) : null}
        </div>
    );
}
