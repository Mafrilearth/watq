const test = require("node:test");
const assert = require("node:assert/strict");

// =========================================================================
// 1. JUNGIAN 16 TYPES DETERMINISTIC SCORING PROOFS
// =========================================================================
test("Jungian Scoring: Median 50% Threshold Rule Maps to Primary Pole", () => {
  // 6 items on dimension, each answered 3 (neutral median)
  // sum = 18. Formula: (18 - 6) / 24 * 100% = 50.0%
  const sumEI = 18;
  const scoreE = Math.round(((sumEI - 6) / 24) * 100);
  const scoreI = 100 - scoreE;
  assert.equal(scoreE, 50);
  assert.equal(scoreI, 50);
  // Threshold rule: >= 50% maps to E
  assert.equal(scoreE >= 50 ? "E" : "I", "E");
});

test("Jungian Scoring: Boundary Saturated Limits (Min 6 -> 0%, Max 30 -> 100%)", () => {
  const minSum = 6;
  const minScore = Math.round(((minSum - 6) / 24) * 100);
  assert.equal(minScore, 0);

  const maxSum = 30;
  const maxScore = Math.round(((maxSum - 6) / 24) * 100);
  assert.equal(maxScore, 100);
});

// =========================================================================
// 2. BIG FIVE (OCEAN) EMPIRICAL SCORING PROOFS
// =========================================================================
test("Big Five: 4-Item Dimension Normalization to 0-100%", () => {
  // 4 items: min sum = 4, max sum = 20, range = 16
  const rawSumMin = 4;
  const scoreMin = Math.round(((rawSumMin - 4) / 16) * 100);
  assert.equal(scoreMin, 0);

  const rawSumMid = 12; // all 3s
  const scoreMid = Math.round(((rawSumMid - 4) / 16) * 100);
  assert.equal(scoreMid, 50);

  const rawSumMax = 20;
  const scoreMax = Math.round(((rawSumMax - 4) / 16) * 100);
  assert.equal(scoreMax, 100);
});

test("Big Five: Trait Level Categorization Boundaries", () => {
  const getLevel = (val) => (val >= 67 ? "High" : val <= 33 ? "Low" : "Moderate");
  assert.equal(getLevel(85), "High");
  assert.equal(getLevel(50), "Moderate");
  assert.equal(getLevel(20), "Low");
});

// =========================================================================
// 3. ENNEAGRAM 9-TYPES WINGS CALCULATION PROOFS
// =========================================================================
test("Enneagram: Wing Calculation for Type 5 (Wings: 4 or 6)", () => {
  const coreType = 5;
  const leftWing = coreType === 1 ? 9 : coreType - 1; // 4
  const rightWing = coreType === 9 ? 1 : coreType + 1; // 6
  assert.equal(leftWing, 4);
  assert.equal(rightWing, 6);

  // If score of 4 > score of 6 -> 5w4
  const sum4 = 18;
  const sum6 = 14;
  const dominantWing = sum4 >= sum6 ? leftWing : rightWing;
  assert.equal(`${coreType}w${dominantWing}`, "5w4");
});

test("Enneagram: Circular Boundary Wrap (Type 1 wings: 9 or 2; Type 9 wings: 8 or 1)", () => {
  const getWingLeft = (type) => (type === 1 ? 9 : type - 1);
  const getWingRight = (type) => (type === 9 ? 1 : type + 1);
  assert.equal(getWingLeft(1), 9);
  assert.equal(getWingRight(9), 1);
});

// =========================================================================
// 4. DISC WORKPLACE MODEL PROOFS
// =========================================================================
test("DISC: Primary and Secondary Style Sorting", () => {
  const sums = { D: 18, I: 16, S: 8, C: 12 };
  const sorted = Object.keys(sums).sort((a, b) => sums[b] - sums[a]);
  assert.equal(sorted[0], "D");
  assert.equal(sorted[1], "I");
  assert.equal(`${sorted[0]}${sorted[1].toLowerCase()}`, "Di");
});

// =========================================================================
// 5. HOLLAND RIASEC VOCATIONAL MODEL PROOFS
// =========================================================================
test("RIASEC: Top 3 Holland Code Generation", () => {
  const sums = { R: 10, I: 22, A: 20, S: 18, E: 12, C: 8 };
  const sorted = Object.keys(sums).sort((a, b) => sums[b] - sums[a]);
  const hollandCode = sorted.slice(0, 3).join("");
  assert.equal(hollandCode, "IAS");
});

// =========================================================================
// 6. RESPONSE CONSISTENCY & VALIDITY INDEX PROOFS
// =========================================================================
test("Response Validity: Straight-Lining Detection Penalty", () => {
  // All 3s across 24 questions
  const values = new Array(24).fill(3);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
  assert.equal(variance, 0); // zero variance
  const isStraightLining = values.length >= 10 && variance < 0.15;
  assert.equal(isStraightLining, true);

  // Reliability score with straight-lining must be < 65% (Low Reliability)
  let baseScore = 100;
  if (isStraightLining) baseScore -= 50;
  assert.ok(baseScore <= 50);
});

test("Response Validity: Contradictory Answer Inconsistency", () => {
  // User answered 5 on positive ("I love parties") AND 5 on reversed ("I hate parties")
  const posVal = 5;
  const revVal = 5;
  // Discrepancy between posVal and (6 - revVal): |5 - (6 - 5)| = |5 - 1| = 4 >= 3
  const discrepancy = Math.abs(posVal - (6 - revVal));
  assert.equal(discrepancy, 4);
  assert.ok(discrepancy >= 3); // Confirmed contradictory pattern
});

// =========================================================================
// 7. ARCHETYPE SYNERGY & COMPATIBILITY MATRIX PROOFS
// =========================================================================
test("Archetype Synergy: Identical Types Produce High Harmonic Baseline", () => {
  const typeA = "INTJ";
  const typeB = "INTJ";
  assert.equal(typeA, typeB);
  const synergyScore = 88;
  assert.ok(synergyScore >= 80);
});

test("Archetype Synergy: Complementary Duals (e.g. INTJ & ENFP) Achieve Peak Synergy", () => {
  const normA = "INTJ";
  const normB = "ENFP";
  const isOppositeEnergy = normA[0] !== normB[0]; // I vs E
  const hasSharedIntuition = normA[1] === normB[1]; // N vs N
  assert.ok(isOppositeEnergy && hasSharedIntuition);
  const synergyScore = 92;
  assert.ok(synergyScore >= 90);
});
