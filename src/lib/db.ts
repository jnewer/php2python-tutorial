import { PrismaClient } from '@prisma/client'

// Note: Prisma client is available for future database integration.
// Currently not used by any application code — models defined in prisma/schema.prisma.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db