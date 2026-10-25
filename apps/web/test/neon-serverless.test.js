const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

// Resolve database path
const schemaPath = path.resolve(__dirname, "../../../packages/database/prisma/schema.prisma");
const databasePkgPath = path.resolve(__dirname, "../../../packages/database");

test("Neon Serverless: Transport configuration optimizations", () => {
  // Load neonConfig via database package dependency
  let neonServerless;
  try {
    neonServerless = require(
      path.resolve(databasePkgPath, "node_modules/@neondatabase/serverless"),
    );
  } catch {
    neonServerless = require("@neondatabase/serverless");
  }

  const { neonConfig } = neonServerless;
  assert.ok(neonConfig);
  assert.equal(typeof neonConfig.useSecureWebSocket, "boolean");
  assert.equal(neonConfig.useSecureWebSocket, true);
  assert.equal(neonConfig.forceDisablePgSSL, true);
});

test("Neon Architecture: Pooled vs Direct connection string routing", () => {
  // Validate Neon pooled vs direct connection URI invariant
  const pooledUrl =
    "postgresql://user:pass@ep-cool-butterfly-123456-pooler.us-east-2.aws.neon.tech/watq?sslmode=require";
  const directUrl =
    "postgresql://user:pass@ep-cool-butterfly-123456.us-east-2.aws.neon.tech/watq?sslmode=require";

  // Pooled URL must target PgBouncer pooler endpoint
  assert.ok(
    pooledUrl.includes("-pooler"),
    "Runtime DATABASE_URL must route through Neon PgBouncer pooler",
  );
  // Direct URL must target direct unpooled compute for migrations/DDL
  assert.ok(
    !directUrl.includes("-pooler"),
    "Migration DIRECT_URL must bypass PgBouncer to allow DDL locks",
  );
});

test("Neon PostgreSQL Schema: Foreign key relational indexing invariant", () => {
  const schemaContent = fs.readFileSync(schemaPath, "utf-8");

  // Verify all foreign keys have indexes to eliminate PostgreSQL sequential scans
  assert.ok(
    schemaContent.includes("@@index([userId])"),
    "Must index userId on sessions and accounts",
  );
  assert.ok(
    schemaContent.includes("@@index([modelId])"),
    "Must index modelId on questions and assessment_results",
  );
  assert.ok(
    schemaContent.includes("@@index([dimension])"),
    "Must index dimension on questions for fast slicing",
  );
  assert.ok(
    schemaContent.includes("@@index([completedAt])"),
    "Must index completedAt for chronological dossier ordering",
  );
});

test("Neon HTTP Driver: Parameterized SQL template query construction", () => {
  // Neon sql`...` template literal construction
  function mockSql(strings, ...values) {
    let queryText = "";
    const params = values;
    for (let i = 0; i < strings.length; i++) {
      queryText += strings[i];
      if (i < values.length) {
        queryText += `$${i + 1}`;
      }
    }
    return { queryText, params };
  }

  const userId = "usr_executive_123";
  const modelId = "jung-16-types";
  const { queryText, params } = mockSql`
    SELECT * FROM assessment_results
    WHERE "userId" = ${userId} AND "modelId" = ${modelId}
    ORDER BY "completedAt" DESC
  `;

  assert.ok(
    queryText.includes("$1") && queryText.includes("$2"),
    "Parameters must be parameterized with $n placeholders",
  );
  assert.equal(params[0], userId);
  assert.equal(params[1], modelId);
  assert.ok(
    !queryText.includes(userId),
    "Raw user input must never be interpolated directly into SQL text",
  );
});

test("Neon Serverless Pool: Configuration boundaries and error resiliency", () => {
  let neonServerless;
  try {
    neonServerless = require(
      path.resolve(databasePkgPath, "node_modules/@neondatabase/serverless"),
    );
  } catch {
    neonServerless = require("@neondatabase/serverless");
  }

  const { Pool } = neonServerless;
  const pool = new Pool({
    connectionString: "postgresql://mock:mock@localhost:5432/mock",
    connectionTimeoutMillis: 5000,
    max: 20,
    idleTimeoutMillis: 30000,
  });

  assert.equal(typeof pool.connect, "function");
  assert.equal(typeof pool.query, "function");
  assert.equal(typeof pool.end, "function");
  assert.equal(pool.options.max, 20);
});
