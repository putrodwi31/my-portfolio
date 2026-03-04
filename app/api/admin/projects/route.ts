import { NextResponse, type NextRequest } from "next/server";
import { assertApiAdminSession } from "@/lib/auth";
import { projectsSchema } from "@/lib/admin-schemas";
import { prisma } from "@/lib/prisma";
import { applyRateLimit } from "@/lib/rate-limit";

async function authorize(request: NextRequest) {
    const limit = applyRateLimit(request, { key: "admin-projects", max: 60, windowMs: 60 * 1000 });
    if (!limit.allowed) {
        return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    const session = await assertApiAdminSession(request);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    return null;
}

function normalizeOptional(value: string) {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}

export async function GET(request: NextRequest) {
    const denied = await authorize(request);
    if (denied) return denied;

    const projects = await prisma.project.findMany({
        orderBy: { sortOrder: "asc" },
        include: {
            technologies: { orderBy: { sortOrder: "asc" } },
            features: { orderBy: { sortOrder: "asc" } },
        },
    });

    return NextResponse.json({
        projects: projects.map((project) => ({
            id: project.id,
            category: project.category,
            title: project.title,
            description: project.description,
            image: project.image,
            repoHref: project.repoHref ?? "",
            repoApi: project.repoApi ?? "",
            demoHref: project.demoHref ?? "",
            sortOrder: project.sortOrder,
            tech: project.technologies.map((item) => item.name),
            features: project.features.map((item) => item.text),
        })),
    });
}

export async function PUT(request: NextRequest) {
    const denied = await authorize(request);
    if (denied) return denied;

    const rawBody = await request.json().catch(() => null);
    const parsed = projectsSchema.safeParse(rawBody);
    if (!parsed.success) {
        return NextResponse.json({ error: "Invalid projects payload." }, { status: 400 });
    }

    await prisma.$transaction(async (tx) => {
        await tx.projectFeature.deleteMany();
        await tx.projectTech.deleteMany();
        await tx.project.deleteMany();

        for (const project of parsed.data.projects) {
            await tx.project.create({
                data: {
                    category: project.category,
                    title: project.title,
                    description: project.description,
                    image: project.image,
                    repoHref: normalizeOptional(project.repoHref),
                    repoApi: normalizeOptional(project.repoApi),
                    demoHref: project.demoHref || null,
                    sortOrder: project.sortOrder,
                    technologies: {
                        create: project.tech.map((name, index) => ({
                            name,
                            sortOrder: index,
                        })),
                    },
                    features: {
                        create: project.features.map((text, index) => ({
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
