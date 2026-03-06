"use client";

import { useMutation } from "@tanstack/react-query";

export function AdminLogoutButton() {
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await fetch("/api/admin/logout", { method: "POST" });
    },
  });

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    window.location.href = "/admin/login";
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={logoutMutation.isPending}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-semibold tracking-wide text-red-400 transition-all duration-300 hover:scale-105 hover:border-red-400/50 hover:bg-red-500/20 hover:text-red-300 hover:shadow-[0_0_20px_-5px_rgba(239,68,68,0.4)] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
    >
      <svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      {logoutMutation.isPending ? "Signing Out..." : "Logout"}
    </button>
  );
}
