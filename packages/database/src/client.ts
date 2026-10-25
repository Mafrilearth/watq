import { Pool, neon, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

// Optimize Neon serverless connection pipelining & write coalescing
neonConfig.pipelineConnect = "password";
neonConfig.coalesceWrites = true;

const connectionString = process.env.DATABASE_URL;

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
  // eslint-disable-next-line no-var
  var neonSqlGlobal: ReturnType<typeof neon> | undefined;
}

const createPrismaClient = () => {
  if (!connectionString) {
    return new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });
  }

  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
};

export const db = globalThis.prismaGlobal ?? createPrismaClient();

/**
 * Ultra-fast serverless Neon HTTP query executor using tagged template literals.
 * Executes over stateless HTTPS fetch with zero connection overhead and sub-10ms latency.
 */
export const sql = globalThis.neonSqlGlobal ?? (connectionString ? neon(connectionString) : null);

export { neon, Pool, neonConfig };

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = db;
  if (sql) globalThis.neonSqlGlobal = sql;
}
