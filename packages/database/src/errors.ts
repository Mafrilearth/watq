import { Prisma } from "@prisma/client";

/**
 * Type guard for PrismaClientKnownRequestError
 */
export function isPrismaKnownError(error: unknown): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError;
}

/**
 * Checks if the error is a Unique Constraint Violation (P2002)
 * e.g., duplicate email registration.
 */
export function isUniqueConstraintViolation(error: unknown): boolean {
  return isPrismaKnownError(error) && error.code === "P2002";
}

/**
 * Checks if the error is a Record Not Found Error (P2025)
 * e.g., trying to update or delete a non-existent record.
 */
export function isRecordNotFoundError(error: unknown): boolean {
  return isPrismaKnownError(error) && error.code === "P2025";
}

/**
 * Checks if the error is a Foreign Key Constraint Violation (P2003)
 */
export function isForeignKeyConstraintViolation(error: unknown): boolean {
  return isPrismaKnownError(error) && error.code === "P2003";
}

/**
 * Checks if the error is a Database Connection or Timeout Error (P1000 - P1008)
 */
export function isDatabaseConnectionError(error: unknown): boolean {
  if (!isPrismaKnownError(error)) return false;
  return error.code.startsWith("P100");
}

/**
 * Sanitizes and returns an executive, safe user-facing message
 * without exposing internal database schemas or table names.
 */
export function getSafeDatabaseErrorMessage(
  error: unknown,
  fallbackMessage = "A database operation could not be completed. Please try again.",
): string {
  if (isUniqueConstraintViolation(error)) {
    const target = (error as Prisma.PrismaClientKnownRequestError).meta?.target;
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

/**
 * Bounded pagination parameter calculator for Prisma queries.
 */
export interface PaginationOptions {
  page?: number;
  pageSize?: number;
  maxPageSize?: number;
}

export interface PrismaPaginationResult {
  skip: number;
  take: number;
  page: number;
  pageSize: number;
}

export function getPrismaPaginationParams({
  page = 1,
  pageSize = 20,
  maxPageSize = 100,
}: PaginationOptions = {}): PrismaPaginationResult {
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
