import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getAdminSession } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center bg-[radial-gradient(circle_at_top,#1f2937_0%,#09090b_52%,#050505_100%)] px-4 py-12">
      <section className="mx-auto w-full max-w-md border border-border bg-black/40 p-8 backdrop-blur">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-gray-500">Admin</p>
        <h1 className="text-3xl font-semibold text-white">Sign In</h1>
        <p className="mt-3 mb-8 text-sm text-gray-400">Masuk untuk mengelola master data portfolio.</p>
        <AdminLoginForm />
      </section>
    </main>
  );
}
