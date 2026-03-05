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
      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-white hover:bg-white hover:text-black disabled:opacity-60"
    >
      {logoutMutation.isPending ? "Signing Out..." : "Logout"}
    </button>
  );
}
