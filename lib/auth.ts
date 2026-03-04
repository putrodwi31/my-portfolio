import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "portfolio_admin_token";
const JWT_SECRET = process.env.JWT_SECRET ?? "dev-only-secret-change-this";

type AdminJwtPayload = {
    sub: string;
    email: string;
    name: string;
};

export function signAdminToken(payload: AdminJwtPayload) {
    return jwt.sign(payload, JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "7d",
    });
}

export function verifyAdminToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as AdminJwtPayload;
}

export async function createAdminSessionCookie(token: string) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });
}

export async function clearAdminSessionCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export async function getAdminSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
        return null;
    }

    try {
        const payload = verifyAdminToken(token);
        const admin = await prisma.adminUser.findUnique({
            where: { id: payload.sub },
            select: { id: true, email: true, name: true },
        });

        return admin;
    } catch {
        return null;
    }
}

export async function requireAdminSession() {
    const session = await getAdminSession();
    if (!session) {
        redirect("/admin/login");
    }

    return session;
}

export async function assertApiAdminSession(request: NextRequest) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
        return null;
    }

    try {
        const payload = verifyAdminToken(token);
        const admin = await prisma.adminUser.findUnique({
            where: { id: payload.sub },
            select: { id: true, email: true, name: true },
        });
        return admin;
    } catch {
        return null;
    }
}
