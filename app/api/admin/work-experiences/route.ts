import { NextResponse, type NextRequest } from "next/server";
import { assertApiAdminSession } from "@/lib/auth";
import { workExperiencesSchema } from "@/lib/admin-schemas";
import { prisma } from "@/lib/prisma";
import { applyRateLimit } from "@/lib/rate-limit";

async function authorize(request: NextRequest) {
  const limit = applyRateLimit(request, { key: "admin-work-experiences", max: 60, windowMs: 60 * 1000 });
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

  const workExperiences = await prisma.workExperience.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      highlights: { orderBy: { sortOrder: "asc" } },
    },
  });

  return NextResponse.json({
    workExperiences: workExperiences.map((experience) => ({
      id: experience.id,
      title: experience.title,
      company: experience.company,
      location: experience.location,
      period: experience.period,
      sortOrder: experience.sortOrder,
      highlights: experience.highlights.map((item) => item.text),
    })),
  });
}

export async function PUT(request: NextRequest) {
  const denied = await authorize(request);
  if (denied) return denied;

  const rawBody = await request.json().catch(() => null);
  const parsed = workExperiencesSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid work experiences payload." }, { status: 400 });
  }

  await prisma.$transaction(async (tx) => {
    await tx.workHighlight.deleteMany();
    await tx.workExperience.deleteMany();

    for (const experience of parsed.data.workExperiences) {
      await tx.workExperience.create({
        data: {
          title: experience.title,
          company: experience.company,
          location: experience.location,
          period: experience.period,
          sortOrder: experience.sortOrder,
          highlights: {
            create: experience.highlights.map((text, index) => ({
              text,
              sortOrder: index,
            })),
          },
        },
      });
    }
  });

  return NextResponse.json({ ok: true });
}
