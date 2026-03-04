import { NextResponse, type NextRequest } from "next/server";
import { assertApiAdminSession } from "@/lib/auth";
import { infoEntriesSchema } from "@/lib/admin-schemas";
import { prisma } from "@/lib/prisma";
import { applyRateLimit } from "@/lib/rate-limit";

async function authorize(request: NextRequest) {
  const limit = applyRateLimit(request, { key: "admin-info-entries", max: 60, windowMs: 60 * 1000 });
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

  const entries = await prisma.infoEntry.findMany({
    orderBy: [{ section: "asc" }, { groupOrder: "asc" }, { sortOrder: "asc" }],
  });

  return NextResponse.json({ entries });
}

export async function PUT(request: NextRequest) {
  const denied = await authorize(request);
  if (denied) return denied;

  const rawBody = await request.json().catch(() => null);
  const parsed = infoEntriesSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid info entries payload." }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.infoEntry.deleteMany(),
    prisma.infoEntry.createMany({
      data: parsed.data.entries.map((entry) => ({
        section: entry.section,
        groupTitle: entry.groupTitle,
        groupIcon: entry.groupIcon,
        title: entry.title,
        subtitle: entry.subtitle,
        period: entry.period,
        groupOrder: entry.groupOrder,
        sortOrder: entry.sortOrder,
      })),
    }),
  ]);

  return NextResponse.json({ ok: true });
}
