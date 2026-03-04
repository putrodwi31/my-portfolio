import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

declare global {
    // eslint-disable-next-line no-var
    var prismaGlobal: PrismaClient | undefined;
    // eslint-disable-next-line no-var
    var prismaAdapterGlobal: PrismaBetterSqlite3 | undefined;
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set.");
}

const adapter = global.prismaAdapterGlobal ?? new PrismaBetterSqlite3({ url: databaseUrl });

export const prisma = global.prismaGlobal ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
    global.prismaGlobal = prisma;
    global.prismaAdapterGlobal = adapter;
}
