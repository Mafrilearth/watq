import { JUNGIAN_QUESTIONS, ARCHETYPES } from '@/data/assessments/jungian16';
import { LikertValue, AssessmentResult, PolarityScores } from '@/types/assessment';

/**
 * Deterministic scoring engine for Watq 16 Cognitive Types
 * Standard: WATQ-PRD-01 // Classical Test Theory (CTT)
 */
export function calculateJungianScores(responses: Record<string, LikertValue>): AssessmentResult {
  // Accumulators for the 4 bipolar dimensions (range: 6 to 30 each)
  let sumEI = 0;
  let sumSN = 0;
  let sumTF = 0;
  let sumJP = 0;

  for (const item of JUNGIAN_QUESTIONS) {
    const rawVal = responses[item.id] ?? 3; // Fallback to neutral median (3) if missing
    const normalizedScore = item.isReversed ? 6 - rawVal : rawVal;

    switch (item.dimension) {
      case 'EI':
        sumEI += normalizedScore;
        break;
      case 'SN':
        sumSN += normalizedScore;
        break;
      case 'TF':
        sumTF += normalizedScore;
        break;
      case 'JP':
        sumJP += normalizedScore;
        break;
    }
  }

  // Linear percentage mapping: Score% = ((S - 6) / 24) * 100%
  const scoreE = Math.round(((sumEI - 6) / 24) * 100);
  const scoreI = 100 - scoreE;

  const scoreS = Math.round(((sumSN - 6) / 24) * 100);
  const scoreN = 100 - scoreS;

  const scoreT = Math.round(((sumTF - 6) / 24) * 100);
  const scoreF = 100 - scoreT;

  const scoreJ = Math.round(((sumJP - 6) / 24) * 100);
  const scoreP = 100 - scoreJ;

  // Deterministic tie-breaking threshold (>= 50% maps to primary pole)
  const letterE_I = scoreE >= 50 ? 'E' : 'I';
  const letterS_N = scoreS >= 50 ? 'S' : 'N';
  const letterT_F = scoreT >= 50 ? 'T' : 'F';
  const letterJ_P = scoreJ >= 50 ? 'J' : 'P';

  const typeCode = `${letterE_I}${letterS_N}${letterT_F}${letterJ_P}`;
  const archetype = ARCHETYPES[typeCode] || ARCHETYPES.INTJ;

  const scores: PolarityScores = {
    E: scoreE,
    I: scoreI,
    S: scoreS,
    N: scoreN,
    T: scoreT,
    F: scoreF,
    J: scoreJ,
    P: scoreP,
  };

  return {
    typeCode,
    archetypeTitle: archetype.title,
    scores,
    summary: archetype.summary,
    majors: archetype.majors,
    careers: archetype.careers,
  };
}
