import { NextResponse, type NextRequest } from "next/server";
import { assertApiAdminSession } from "@/lib/auth";
import { techStackSchema } from "@/lib/admin-schemas";
import { prisma } from "@/lib/prisma";
import { applyRateLimit } from "@/lib/rate-limit";

async function authorize(request: NextRequest) {
  const limit = applyRateLimit(request, { key: "admin-tech-stack", max: 60, windowMs: 60 * 1000 });
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

  const techStack = await prisma.techStackItem.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ items: techStack.map((item) => item.name) });
}

export async function PUT(request: NextRequest) {
  const denied = await authorize(request);
  if (denied) return denied;

  const rawBody = await request.json().catch(() => null);
  const parsed = techStackSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid tech stack payload." }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.techStackItem.deleteMany(),
    prisma.techStackItem.createMany({
      data: parsed.data.items.map((name, index) => ({ name, sortOrder: index })),
    }),
  ]);

  return NextResponse.json({ ok: true });
}
