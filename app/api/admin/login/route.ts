import bcrypt from "bcryptjs";
import { NextResponse, type NextRequest } from "next/server";
import { createAdminSessionCookie, signAdminToken } from "@/lib/auth";
import { loginSchema } from "@/lib/admin-schemas";
import { prisma } from "@/lib/prisma";
import { applyRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const limit = applyRateLimit(request, { key: "admin-login", max: 5, windowMs: 15 * 60 * 1000 });

  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many login attempts. Try again later." }, { status: 429 });
  }

  const rawBody = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(rawBody);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid login payload." }, { status: 400 });
  }

  const admin = await prisma.adminUser.findUnique({
    where: { email: parsed.data.email },
  });

  if (!admin) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const isValid = await bcrypt.compare(parsed.data.password, admin.passwordHash);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = signAdminToken({
    sub: admin.id,
    email: admin.email,
    name: admin.name,
  });

  await createAdminSessionCookie(token);

  return NextResponse.json({
    user: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    },
  });
}
