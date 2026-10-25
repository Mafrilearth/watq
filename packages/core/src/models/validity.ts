import type { LikertValue, QuestionItem, ResponseValidity } from "../types";

/**
 * Calculates psychometric response consistency and reliability
 * Detects straight-lining and contradiction between positive and reversed items.
 * Standard: APA/ITC Guidelines on Computer-Based Testing (2014)
 */
export function calculateResponseValidity(
  responses: Record<string, LikertValue>,
  questions: QuestionItem[],
): ResponseValidity {
  const values = Object.values(responses);
  if (values.length === 0) {
    return {
      score: 100,
      rating: "HIGH_RELIABILITY",
      straightLining: false,
      inconsistencyCount: 0,
      summary: "Assessment initialized. No responses recorded yet.",
    };
  }

  // 1. Check for straight-lining (answering identical Likert values across the whole test)
  const mean = values.reduce((acc, v) => acc + v, 0) / values.length;
  const variance = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / values.length;
  const isStraightLining = values.length >= 10 && variance < 0.15;

  // 2. Check inconsistency between positive and reversed items within each dimension
  const dimensionGroups: Record<string, { positive: number[]; reversed: number[] }> = {};

  for (const q of questions) {
    const val = responses[q.id];
    if (val === undefined) continue;

    if (!dimensionGroups[q.dimension]) {
      dimensionGroups[q.dimension] = { positive: [], reversed: [] };
    }

    if (q.isReversed) {
      dimensionGroups[q.dimension].reversed.push(val);
    } else {
      dimensionGroups[q.dimension].positive.push(val);
    }
  }

  let inconsistencyCount = 0;
  let pairsEvaluated = 0;

  for (const dim of Object.keys(dimensionGroups)) {
    const group = dimensionGroups[dim];
    const minLen = Math.min(group.positive.length, group.reversed.length);

    for (let i = 0; i < minLen; i++) {
      pairsEvaluated++;
      const posVal = group.positive[i];
      const revVal = group.reversed[i];

      // Normalized expectation: If posVal is 5 (strongly agree), revVal should ideally be 1 or 2.
      // If both are 5 or both are 1, difference between posVal and (6 - revVal) is large.
      const discrepancy = Math.abs(posVal - (6 - revVal));
      if (discrepancy >= 3) {
        inconsistencyCount++;
      }
    }
  }

  // 3. Compute reliability score (0 - 100%)
  let baseScore = 100;

  if (isStraightLining) {
    baseScore -= 50; // Severe penalty for clicking identical values
  }

  if (pairsEvaluated > 0) {
    const contradictionRate = inconsistencyCount / pairsEvaluated;
    baseScore -= Math.round(contradictionRate * 40);
  }

  const finalScore = Math.max(10, Math.min(100, baseScore));

  let rating: ResponseValidity["rating"] = "HIGH_RELIABILITY";
  let summary =
    "Response pattern demonstrates high cognitive integrity and thoughtful self-reflection.";

  if (finalScore < 65) {
    rating = "LOW_RELIABILITY";
    summary = isStraightLining
      ? "Straight-lining detected: answers contain minimal variance across items."
      : "Elevated variance detected: multiple contradictory responses observed across paired items.";
  } else if (finalScore < 85) {
    rating = "MODERATE_RELIABILITY";
    summary =
      "Moderate variance detected: response profile is generally consistent with minor ambivalence.";
  }

  return {
    score: finalScore,
    rating,
    straightLining: isStraightLining,
    inconsistencyCount,
    summary,
  };
}
