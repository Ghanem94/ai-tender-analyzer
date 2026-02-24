import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// Force new client if models have changed
if (globalForPrisma.prisma) {
    globalForPrisma.prisma.$disconnect()
    globalForPrisma.prisma = undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
