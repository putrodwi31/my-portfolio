"use client";

import { useMutation } from "@tanstack/react-query";
import { useId, useState } from "react";

type FileUploadControlProps = {
    accept: string;
    buttonLabel: string;
    currentValue?: string;
    kind: "document" | "image";
    onUploaded: (url: string) => void;
};

export function FileUploadControl({ accept, buttonLabel, currentValue, kind, onUploaded }: FileUploadControlProps) {
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
                    className="inline-flex cursor-pointer items-center border border-border px-4 py-2 text-sm text-white transition hover:border-white"
                >
                    {uploadMutation.isPending ? "Uploading..." : buttonLabel}
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
                        className="text-sm text-gray-400 underline underline-offset-4 hover:text-white"
                    >
                        Preview current file
                    </a>
                ) : null}
            </div>
            {message ? <p className={`text-xs ${isError ? "text-red-300" : "text-emerald-300"}`}>{message}</p> : null}
        </div>
    );
}
