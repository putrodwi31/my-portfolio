import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { applyRateLimit } from "@/lib/rate-limit";

const contactSchema = z.object({
  email: z.email(),
  message: z.string().min(1).max(4000),
  captchaToken: z.string().optional(),
});

const formspreeEndpoint = process.env.CONTACT_FORM_ENDPOINT ?? "https://formspree.io/f/xkovdzvp";
const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

async function verifyTurnstileToken(token: string, remoteIp: string | null) {
  if (!turnstileSecret) {
    return false;
  }

  const payload = new URLSearchParams();
  payload.set("secret", turnstileSecret);
  payload.set("response", token);
  if (remoteIp) {
    payload.set("remoteip", remoteIp);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: payload.toString(),
    cache: "no-store",
  });

  if (!response.ok) {
    return false;
  }

  const json = (await response.json()) as { success?: boolean };
  return Boolean(json.success);
}

export async function POST(request: NextRequest) {
  const limit = applyRateLimit(request, { key: "contact-form", max: 10, windowMs: 60 * 1000 });
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const rawBody = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form payload." }, { status: 400 });
  }

  if (!turnstileSecret) {
    return NextResponse.json({ error: "Captcha is not configured on server." }, { status: 500 });
  }

  if (!parsed.data.captchaToken) {
    return NextResponse.json({ error: "Captcha token is required." }, { status: 400 });
  }

  const remoteIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const isValidCaptcha = await verifyTurnstileToken(parsed.data.captchaToken, remoteIp);
  if (!isValidCaptcha) {
    return NextResponse.json({ error: "Captcha verification failed." }, { status: 400 });
  }

  const response = await fetch(formspreeEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: parsed.data.email,
      message: parsed.data.message,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
