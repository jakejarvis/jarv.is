import { PrismaClient } from "@prisma/client/edge";

// creating PrismaClient here prevents next.js from starting too many concurrent prisma instances and exhausting the
// number of connection pools available (especially when hot reloading from `next dev`).
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
