"use client";

import { useState } from "react";

export function AdminLogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-white hover:bg-white hover:text-black disabled:opacity-60"
    >
      {isLoading ? "Signing Out..." : "Logout"}
    </button>
  );
}
