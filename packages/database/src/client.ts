import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

const createPrismaClient = () => {
  if (!connectionString) {
    return new PrismaClient();
  }

  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
};

export const db = globalThis.prismaGlobal ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = db;
}
