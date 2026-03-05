"use client";

import { useMutation } from "@tanstack/react-query";
import type { SubmitEvent, SubmitEventHandler } from "react";
import { useState } from "react";

export function AdminLoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const loginMutation = useMutation({
        mutationFn: async (payload: { email: string; password: string }) => {
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

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event: SubmitEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setError("");

        try {
            await loginMutation.mutateAsync({ email, password });
            window.location.href = "/admin";
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : "Unable to login. Please try again.");
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
            <div>
                <label className="mb-2 block text-sm text-gray-400">Email</label>
                <input
                    type="email"
                    name="admin_email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full border border-border bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-white"
                    placeholder="admin@putrodwi.my.id"
                    autoComplete="off"
                />
            </div>
            <div>
                <label className="mb-2 block text-sm text-gray-400">Password</label>
                <input
                    type="password"
                    name="admin_password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full border border-border bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-white"
                    placeholder="Password"
                    autoComplete="new-password"
                />
            </div>
            {error ? <p className="border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-200">{error}</p> : null}
            <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
                {loginMutation.isPending ? "Signing In..." : "Sign In"}
            </button>
        </form>
    );
}
