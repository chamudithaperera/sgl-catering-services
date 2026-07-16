const { PrismaClient } = require("@prisma/client");

const prisma = globalThis.__sglPrisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__sglPrisma = prisma;
}

module.exports = { prisma };

