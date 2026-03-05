import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const contentTypeByExtension: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export async function GET(_: Request, context: { params: Promise<{ path: string[] }> }) {
    const params = await context.params;
    const segments = params.path ?? [];

    if (segments.length === 0) {
        return NextResponse.json({ error: "File not found." }, { status: 404 });
    }

    // Prevent path traversal outside /public/uploads.
    const uploadsDir = path.resolve(process.cwd(), "public", "uploads");
    const targetPath = path.resolve(uploadsDir, ...segments);
    if (!targetPath.startsWith(uploadsDir + path.sep) && targetPath !== uploadsDir) {
        return NextResponse.json({ error: "Invalid file path." }, { status: 400 });
    }

    try {
        const fileBuffer = await readFile(targetPath);
        const extension = path.extname(targetPath).toLowerCase();
        const contentType = contentTypeByExtension[extension] ?? "application/octet-stream";

        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch {
        return NextResponse.json({ error: "File not found." }, { status: 404 });
    }
}
