import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse, type NextRequest } from "next/server";
import { assertApiAdminSession } from "@/lib/auth";
import { applyRateLimit } from "@/lib/rate-limit";

const maxFileSize = 10 * 1024 * 1024;

const imageMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);
const documentMimeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function sanitizeBaseName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "file";
}

function getExtension(fileName: string) {
  const extension = path.extname(fileName).toLowerCase();
  return extension || "";
}

export async function POST(request: NextRequest) {
  const limit = applyRateLimit(request, { key: "admin-upload", max: 20, windowMs: 60 * 1000 });
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many upload requests." }, { status: 429 });
  }

  const session = await assertApiAdminSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const kind = formData.get("kind");
  const file = formData.get("file");

  if ((kind !== "image" && kind !== "document") || !(file instanceof File)) {
    return NextResponse.json({ error: "Invalid upload payload." }, { status: 400 });
  }

  if (file.size === 0 || file.size > maxFileSize) {
    return NextResponse.json({ error: "Invalid file size. Max 10MB." }, { status: 400 });
  }

  const mimeSet = kind === "image" ? imageMimeTypes : documentMimeTypes;
  if (!mimeSet.has(file.type)) {
    return NextResponse.json({ error: `Invalid ${kind} file type.` }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const extension = getExtension(file.name);
  const uploadDir = path.join(process.cwd(), "public", "uploads", kind === "image" ? "images" : "documents");
  const fileName = `${Date.now()}-${sanitizeBaseName(file.name.replace(extension, ""))}-${randomUUID().slice(0, 8)}${extension}`;

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, fileName), bytes);

  const url = `/uploads/${kind === "image" ? "images" : "documents"}/${fileName}`;
  return NextResponse.json({ url });
}
