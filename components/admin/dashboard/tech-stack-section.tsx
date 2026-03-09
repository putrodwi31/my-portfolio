"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaFileLines } from "react-icons/fa6";
import { SectionCard, textareaClassName, primaryButtonClassName } from "@/components/admin/dashboard/shared";
import { techStackFormSchema } from "@/validations/masters.validation";

export function TechStackSection({
    initialValue,
    status,
    onSave,
}: {
    initialValue: string;
    status?: string;
    onSave: (value: string) => void;
}): ReactElement {
    const formId = "tech-stack-form";
    const { register, handleSubmit, reset } = useForm<{ value: string }>({
        resolver: zodResolver(techStackFormSchema),
        defaultValues: { value: initialValue },
    });

    useEffect(() => {
        reset({ value: initialValue });
    }, [initialValue, reset]);

    return (
        <SectionCard
            eyebrow="Master Data"
            title="Tech Stack"
            description="Kelola daftar teknologi yang tampil di section About."
            status={status}
            actions={
                <button type="submit" form={formId} className={primaryButtonClassName}>
                    Save Tech Stack
                </button>
            }
        >
            <form id={formId} onSubmit={handleSubmit(({ value }) => onSave(value))}>
                <div className="space-y-4">
                    <div className="relative rounded-lg border border-cyan-700/20 bg-slate-900/30 p-4 backdrop-blur-sm">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80 inline-flex items-center gap-2">
                            <FaFileLines className="h-3.5 w-3.5" /> Petunjuk Format
                        </p>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Masukkan satu teknologi per baris. Contoh: React, Node.js, TypeScript, Tailwind CSS
                        </p>
                    </div>
                    <textarea
                        rows={12}
                        {...register("value")}
                        className={textareaClassName}
                        placeholder="React&#10;Node.js&#10;TypeScript&#10;PostgreSQL"
                    />
                </div>
            </form>
        </SectionCard>
    );
}
