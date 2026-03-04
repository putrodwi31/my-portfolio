import type { NextRequest } from "next/server";

type RateLimitOptions = {
    key: string;
    max: number;
    windowMs: number;
};

type RateLimitResult = {
    allowed: boolean;
    remaining: number;
    resetAt: number;
};

type Bucket = {
    count: number;
    resetAt: number;
};

const buckets = new Map<string, Bucket>();

function getClientIp(request: NextRequest) {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
        return forwarded.split(",")[0]?.trim() ?? "unknown";
    }

    return request.headers.get("x-real-ip") ?? "unknown";
}

export function applyRateLimit(request: NextRequest, options: RateLimitOptions): RateLimitResult {
    const ip = getClientIp(request);
    const bucketKey = `${options.key}:${ip}`;
    const now = Date.now();
    const current = buckets.get(bucketKey);

    if (!current || current.resetAt <= now) {
        const nextBucket = {
            count: 1,
            resetAt: now + options.windowMs,
        };
        buckets.set(bucketKey, nextBucket);
        return {
            allowed: true,
            remaining: options.max - 1,
            resetAt: nextBucket.resetAt,
        };
    }

    if (current.count >= options.max) {
        return {
            allowed: false,
            remaining: 0,
            resetAt: current.resetAt,
        };
    }

    current.count += 1;
    buckets.set(bucketKey, current);

    return {
        allowed: true,
        remaining: options.max - current.count,
        resetAt: current.resetAt,
    };
}
