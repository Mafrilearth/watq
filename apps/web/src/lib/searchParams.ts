import {
  createSearchParamsCache,
  parseAsString,
  parseAsStringLiteral,
  parseAsInteger,
  parseAsBoolean,
} from "nuqs/server";

// ============================================================================
// CENTRALIZED NUQS URL SEARCH PARAMS PARSERS & CACHE (SSOT)
// ============================================================================

export const assessmentSearchParams = {
  model: parseAsStringLiteral([
    "jungian",
    "bigfive",
    "enneagram",
    "disc",
    "riasec",
  ] as const).withDefault("jungian"),
  step: parseAsInteger.withDefault(1),
};

export const adminSearchParams = {
  tab: parseAsStringLiteral(["users", "questions", "models", "telemetry"] as const).withDefault(
    "users",
  ),
  q: parseAsString.withDefault(""),
  dim: parseAsString.withDefault("ALL"),
  page: parseAsInteger.withDefault(1),
};

export const resultSearchParams = {
  modal: parseAsStringLiteral(["manual", "story"] as const),
  view: parseAsString.withDefault("overview"),
  print: parseAsBoolean.withDefault(false),
};

export const vocationalSearchParams = {
  q: parseAsString.withDefault(""),
  type: parseAsStringLiteral(["all", "career", "major"] as const).withDefault("all"),
};

/**
 * Server-side caches for RSC pre-parsing of URL search parameters in Next.js 16+
 */
export const assessmentSearchParamsCache = createSearchParamsCache(assessmentSearchParams);
export const adminSearchParamsCache = createSearchParamsCache(adminSearchParams);
export const resultSearchParamsCache = createSearchParamsCache(resultSearchParams);
