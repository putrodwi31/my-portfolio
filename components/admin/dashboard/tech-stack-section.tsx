"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SectionCard, fieldClassName, primaryButtonClassName } from "@/components/admin/dashboard/shared";
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
                <textarea rows={10} {...register("value")} className={fieldClassName} />
            </form>
        </SectionCard>
    );
}
