import { NextResponse, type NextRequest } from "next/server";
import { assertApiAdminSession } from "@/lib/auth";
import { getAdminDashboardData } from "@/lib/admin-data";
import { siteSettingsSchema } from "@/lib/admin-schemas";
import { prisma } from "@/lib/prisma";
import { applyRateLimit } from "@/lib/rate-limit";

async function authorize(request: NextRequest) {
  const limit = applyRateLimit(request, { key: "admin-site-settings", max: 60, windowMs: 60 * 1000 });
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const session = await assertApiAdminSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return null;
}

export async function GET(request: NextRequest) {
  const denied = await authorize(request);
  if (denied) return denied;

  const data = await getAdminDashboardData();
  return NextResponse.json({ siteSettings: data.siteSettings });
}

export async function PUT(request: NextRequest) {
  const denied = await authorize(request);
  if (denied) return denied;

  const rawBody = await request.json().catch(() => null);
  const parsed = siteSettingsSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid site settings payload." }, { status: 400 });
  }

  await prisma.siteSetting.upsert({
    where: { id: 1 },
    update: parsed.data,
    create: {
      id: 1,
      ...parsed.data,
    },
  });

  return NextResponse.json({ ok: true });
}
