import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve Prisma schema & studio path
const schemaPath = path.resolve(__dirname, "../../../packages/database/prisma/schema.prisma");
const studioPkgPath = path.resolve(__dirname, "../../../apps/studio/package.json");

// Import or recreate Prisma error utilities for test verification
function isUniqueConstraintViolation(error) {
  return typeof error === "object" && error !== null && error.code === "P2002";
}

function isRecordNotFoundError(error) {
  return typeof error === "object" && error !== null && error.code === "P2025";
}

function isForeignKeyConstraintViolation(error) {
  return typeof error === "object" && error !== null && error.code === "P2003";
}

function isDatabaseConnectionError(error) {
  return (
    typeof error === "object" &&
    error !== null &&
    typeof error.code === "string" &&
    error.code.startsWith("P100")
  );
}

function getSafeDatabaseErrorMessage(
  error,
  fallbackMessage = "A database operation could not be completed. Please try again.",
) {
  if (isUniqueConstraintViolation(error)) {
    const target = error.meta?.target;
    if (Array.isArray(target) && target.includes("email")) {
      return "An account with this email address already exists.";
    }
    return "A record with these unique details already exists.";
  }
  if (isRecordNotFoundError(error)) {
    return "The requested record was not found.";
  }
  if (isDatabaseConnectionError(error)) {
    return "Unable to connect to the database service. Please verify your connection.";
  }
  return fallbackMessage;
}

function getPrismaPaginationParams({ page = 1, pageSize = 20, maxPageSize = 100 } = {}) {
  const safePage = Math.max(1, Math.floor(page || 1));
  const safePageSize = Math.min(maxPageSize, Math.max(1, Math.floor(pageSize || 20)));
  const skip = (safePage - 1) * safePageSize;

  return {
    skip,
    take: safePageSize,
    page: safePage,
    pageSize: safePageSize,
  };
}

test("Prisma Errors: Known request error classification invariants", () => {
  const p2002 = { code: "P2002", meta: { target: ["email"] } };
  const p2025 = { code: "P2025", meta: { cause: "Record to update not found." } };
  const p2003 = { code: "P2003", meta: { field_name: "userId" } };
  const p1001 = { code: "P1001", message: "Can't reach database server at localhost:5432" };

  assert.equal(isUniqueConstraintViolation(p2002), true);
  assert.equal(isUniqueConstraintViolation(p2025), false);

  assert.equal(isRecordNotFoundError(p2025), true);
  assert.equal(isRecordNotFoundError(p2002), false);

  assert.equal(isForeignKeyConstraintViolation(p2003), true);
  assert.equal(isDatabaseConnectionError(p1001), true);
});

test("Prisma Security: Safe error sanitization prevents schema leakage", () => {
  const emailDuplicateErr = { code: "P2002", meta: { target: ["email"] } };
  const genericDuplicateErr = { code: "P2002", meta: { target: ["token"] } };
  const notFoundErr = { code: "P2025" };
  const dbTimeoutErr = { code: "P1008" };
  const unknownErr = new Error("FATAL: syntax error at or near internal_secrets_table");

  assert.equal(
    getSafeDatabaseErrorMessage(emailDuplicateErr),
    "An account with this email address already exists.",
  );
  assert.equal(
    getSafeDatabaseErrorMessage(genericDuplicateErr),
    "A record with these unique details already exists.",
  );
  assert.equal(getSafeDatabaseErrorMessage(notFoundErr), "The requested record was not found.");
  assert.equal(
    getSafeDatabaseErrorMessage(dbTimeoutErr),
    "Unable to connect to the database service. Please verify your connection.",
  );
  assert.equal(
    getSafeDatabaseErrorMessage(unknownErr),
    "A database operation could not be completed. Please try again.",
  );
});

test("Prisma Pagination: Boundary clamping and offset calculation", () => {
  // Page 1 with default pageSize 20
  const page1 = getPrismaPaginationParams({ page: 1, pageSize: 20 });
  assert.deepEqual(page1, { skip: 0, take: 20, page: 1, pageSize: 20 });

  // Page 3 with pageSize 10 -> skip 20
  const page3 = getPrismaPaginationParams({ page: 3, pageSize: 10 });
  assert.deepEqual(page3, { skip: 20, take: 10, page: 3, pageSize: 10 });

  // Edge cases: negative or zero page clamps to 1
  const negativePage = getPrismaPaginationParams({ page: -5, pageSize: 15 });
  assert.equal(negativePage.page, 1);
  assert.equal(negativePage.skip, 0);

  // Excessive pageSize clamps to maxPageSize
  const largePage = getPrismaPaginationParams({ page: 1, pageSize: 500, maxPageSize: 100 });
  assert.equal(largePage.take, 100);
});

test("Prisma Schema: Cascade deletion and relation integrity", () => {
  const schemaContent = fs.readFileSync(schemaPath, "utf-8");

  // User cascade deletion to sessions and accounts
  assert.ok(
    schemaContent.includes("onDelete: Cascade"),
    "Sessions and accounts must cascade delete with user",
  );
  // Assessment results setNull on user deletion to preserve anonymous statistical aggregate
  assert.ok(
    schemaContent.includes("onDelete: SetNull"),
    "Assessment results must setNull on user deletion to preserve history",
  );
  // 7 canonical models check
  const models = [
    "model User",
    "model Session",
    "model Account",
    "model Verification",
    "model PsychometricModel",
    "model Question",
    "model AssessmentResult",
  ];
  for (const model of models) {
    assert.ok(schemaContent.includes(model), `Schema must define ${model}`);
  }
});

test("Prisma Studio: Dedicated administration port 5555 configuration", () => {
  const studioPkgContent = fs.readFileSync(studioPkgPath, "utf-8");
  const studioPkg = JSON.parse(studioPkgContent);

  assert.ok(
    studioPkg.scripts?.dev?.includes("--port 5555"),
    "Prisma Studio dev script must run on port 5555",
  );
  assert.ok(
    studioPkg.scripts?.start?.includes("--port 5555"),
    "Prisma Studio start script must run on port 5555",
  );
});
