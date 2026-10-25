import assert from "node:assert/strict";
import {
  createSearchParamsCache,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";
import { test } from "vitest";

// =========================================================================
// NUQS V2 SEARCH PARAMS PARSER & CACHE PROOFS
// =========================================================================

test("nuqs: parseAsStringLiteral validates allowed models with deterministic fallback", () => {
  const modelParser = parseAsStringLiteral([
    "jungian",
    "bigfive",
    "enneagram",
    "disc",
    "riasec",
  ]).withDefault("jungian");

  // Valid inputs
  assert.equal(modelParser.parseServerSide("bigfive"), "bigfive");
  assert.equal(modelParser.parseServerSide("enneagram"), "enneagram");
  assert.equal(modelParser.parseServerSide("jungian"), "jungian");

  // Invalid inputs fallback to default "jungian"
  assert.equal(modelParser.parseServerSide("invalid-model"), "jungian");
  assert.equal(modelParser.parseServerSide(""), "jungian");
  assert.equal(modelParser.parseServerSide(undefined), "jungian");
});

test("nuqs: parseAsInteger coerces numeric strings and rejects NaN", () => {
  const stepParser = parseAsInteger.withDefault(1);

  // Valid integers
  assert.equal(stepParser.parseServerSide("5"), 5);
  assert.equal(stepParser.parseServerSide("24"), 24);

  // Non-integers fallback
  assert.equal(stepParser.parseServerSide("not-a-number"), 1);
  assert.equal(stepParser.parseServerSide(undefined), 1);
});

test("nuqs: parseAsBoolean handles boolean query values", () => {
  const boolParser = parseAsBoolean.withDefault(false);

  assert.equal(boolParser.parseServerSide("true"), true);
  assert.equal(boolParser.parseServerSide("false"), false);
  assert.equal(boolParser.parseServerSide("unknown"), false);
  assert.equal(boolParser.parseServerSide(undefined), false);
});

test("nuqs: createSearchParamsCache parses multi-param search query dictionary", () => {
  const adminCache = createSearchParamsCache({
    tab: parseAsStringLiteral(["users", "questions", "models", "telemetry"]).withDefault("users"),
    q: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
  });

  const parsed = adminCache.parse({
    tab: "questions",
    q: "extraversion",
    page: "3",
  });

  assert.equal(parsed.tab, "questions");
  assert.equal(parsed.q, "extraversion");
  assert.equal(parsed.page, 3);
});
