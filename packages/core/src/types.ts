export type LikertValue = 1 | 2 | 3 | 4 | 5;

export type AssessmentModelType = "jungian" | "bigfive" | "enneagram" | "disc" | "riasec";

export type CognitiveDimension = "EI" | "SN" | "TF" | "JP";
export type CognitivePole = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface QuestionItem {
  id: string;
  dimension: string;
  pole?: string;
  isReversed: boolean;
  prompt: string;
  target: string;
  modelType?: AssessmentModelType;
}

export interface PolarityScores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export interface ArchetypeProfile {
  code: string;
  title: string;
  summary: string;
  temperament?: string;
  cognitiveStack?: string;
  leadFunction?: string;
  majors: string[];
  careers: string[];
}

export interface AssessmentResult {
  typeCode: string;
  archetypeTitle: string;
  scores: PolarityScores;
  summary: string;
  temperament?: string;
  cognitiveStack?: string;
  leadFunction?: string;
  majors: string[];
  careers: string[];
  validityIndex?: ResponseValidity;
}

/* ========================================================================= */
/* BIG FIVE (OCEAN) FACTOR MODEL TYPES                                       */
/* ========================================================================= */
export type BigFiveDimension = "O" | "C" | "E" | "A" | "N";

export interface BigFiveScores {
  O: number; // Openness to Experience (0-100%)
  C: number; // Conscientiousness (0-100%)
  E: number; // Extraversion (0-100%)
  A: number; // Agreeableness (0-100%)
  N: number; // Neuroticism / Emotional Stability (0-100%)
}

export interface BigFiveResult {
  modelType: "bigfive";
  scores: BigFiveScores;
  primaryTrait: string;
  dossierSummary: string;
  traitDescriptions: Record<
    BigFiveDimension,
    { score: number; level: "Low" | "Moderate" | "High"; description: string }
  >;
  validityIndex?: ResponseValidity;
}

/* ========================================================================= */
/* ENNEAGRAM 9-TYPES MODEL TYPES                                             */
/* ========================================================================= */
export type EnneagramTypeNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface EnneagramScores {
  type1: number;
  type2: number;
  type3: number;
  type4: number;
  type5: number;
  type6: number;
  type7: number;
  type8: number;
  type9: number;
}

export interface EnneagramResult {
  modelType: "enneagram";
  coreType: EnneagramTypeNumber;
  title: string;
  wing: string; // e.g. "5w4"
  triad: "Head" | "Heart" | "Gut";
  coreFear: string;
  coreDesire: string;
  growthArrow: EnneagramTypeNumber;
  stressArrow: EnneagramTypeNumber;
  summary: string;
  scores: EnneagramScores;
  validityIndex?: ResponseValidity;
}

/* ========================================================================= */
/* DISC WORKPLACE BEHAVIORAL MODEL TYPES                                     */
/* ========================================================================= */
export type DISCQuadrant = "D" | "I" | "S" | "C";

export interface DISCScores {
  D: number; // Dominance (0-100%)
  I: number; // Influence (0-100%)
  S: number; // Steadiness (0-100%)
  C: number; // Conscientiousness (0-100%)
}

export interface DISCResult {
  modelType: "disc";
  primaryStyle: DISCQuadrant;
  secondaryStyle: DISCQuadrant;
  styleLockup: string; // e.g. "Di" or "SC"
  styleTitle: string;
  scores: DISCScores;
  leadershipStyle: string;
  communicationDos: string[];
  communicationDonts: string[];
  summary: string;
  validityIndex?: ResponseValidity;
}

/* ========================================================================= */
/* HOLLAND CODES (RIASEC) VOCATIONAL MODEL TYPES                             */
/* ========================================================================= */
export type RIASECDimension = "R" | "I" | "A" | "S" | "E" | "C";

export interface RIASECScores {
  R: number; // Realistic
  I: number; // Investigative
  A: number; // Artistic
  S: number; // Social
  E: number; // Enterprising
  C: number; // Conventional
}

export interface RIASECResult {
  modelType: "riasec";
  hollandCode: string; // e.g. "IAS"
  primaryTheme: string;
  scores: RIASECScores;
  recommendedMajors: string[]; // UNESCO ISCED-F 2013
  recommendedCareers: string[]; // ILO ISCO-08
  environmentFit: string;
  validityIndex?: ResponseValidity;
}

/* ========================================================================= */
/* RESPONSE VALIDITY & RELIABILITY TYPES                                     */
/* ========================================================================= */
export interface ResponseValidity {
  score: number; // 0 - 100%
  rating: "HIGH_RELIABILITY" | "MODERATE_RELIABILITY" | "LOW_RELIABILITY";
  straightLining: boolean;
  inconsistencyCount: number;
  summary: string;
}

/* ========================================================================= */
/* SESSION STATE CONTRACT                                                    */
/* ========================================================================= */
export type AnyAssessmentResult =
  | AssessmentResult
  | BigFiveResult
  | EnneagramResult
  | DISCResult
  | RIASECResult;

export interface AssessmentSession {
  sessionId: string;
  instrumentId: string;
  modelType?: AssessmentModelType;
  startedAt: string;
  updatedAt: string;
  completedAt: string | null;
  currentIndex: number;
  responses: Record<string, LikertValue>;
  result: AnyAssessmentResult | null;
}
