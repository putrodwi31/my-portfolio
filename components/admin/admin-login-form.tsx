"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, type TLoginForm } from "@/validations/auth.validation";

export function AdminLoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<TLoginForm>({
        resolver: zodResolver(loginFormSchema),
        mode: "onBlur",
    });
    const loginMutation = useMutation({
        mutationFn: async (payload: TLoginForm) => {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = (await response.json()) as { error?: string };
            if (!response.ok) {
                throw new Error(data.error ?? "Login failed.");
            }
        },
    });

    const onSubmit = async (data: TLoginForm) => {
        try {
            await loginMutation.mutateAsync(data);
            window.location.href = "/admin";
        } catch (cause) {
            setError("root", {
                message: cause instanceof Error ? cause.message : "Unable to login. Please try again.",
            });
        }
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-200">
                    Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="w-full rounded-lg border border-cyan-700/30 bg-slate-950/60 px-4 py-3 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-cyan-500/70 focus:bg-slate-950/80 focus:shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] focus:ring-1 focus:ring-cyan-400/60"
                    placeholder="admin@example.com"
                    autoComplete="off"
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-200">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="w-full rounded-lg border border-cyan-700/30 bg-slate-950/60 px-4 py-3 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-cyan-500/70 focus:bg-slate-950/80 focus:shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] focus:ring-1 focus:ring-cyan-400/60"
                    placeholder="••••••••"
                    autoComplete="new-password"
                />
                {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
            </div>
            {errors.root && (
                <div className="animate-in fade-in slide-in-from-top-2 rounded-lg border border-red-600/40 bg-red-950/30 px-4 py-3 text-sm text-red-200 shadow-[0_0_25px_rgba(239,68,68,0.15)]">
                    <p className="flex items-center gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/30 text-red-300 font-bold text-xs">
                            !
                        </span>
                        {errors.root.message}
                    </p>
                </div>
            )}
            <button
                type="submit"
                disabled={isSubmitting || loginMutation.isPending}
                className="w-full relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-linear-to-r from-cyan-600 via-blue-600 to-cyan-600 px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_0_25px_-5px_rgba(34,211,238,0.5)] ring-1 ring-cyan-400/30 transition-all duration-300 hover:scale-105 hover:from-cyan-500 hover:via-blue-500 hover:to-cyan-500 hover:shadow-[0_0_35px_-5px_rgba(34,211,238,0.7)] hover:ring-cyan-300/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-[0_0_25px_-5px_rgba(34,211,238,0.5)]"
            >
                <span className="flex items-center gap-2">
                    {isSubmitting || loginMutation.isPending ? (
                        <>
                            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Signing In...
                        </>
                    ) : (
                        <>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Sign In
                        </>
                    )}
                </span>
            </button>
        </form>
    );
}
