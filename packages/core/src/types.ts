export type LikertValue = 1 | 2 | 3 | 4 | 5;

export type CognitiveDimension = 'EI' | 'SN' | 'TF' | 'JP';

export type CognitivePole = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface QuestionItem {
  id: string;
  dimension: CognitiveDimension;
  pole: CognitivePole;
  isReversed: boolean;
  prompt: string;
  target: string;
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
}

export interface AssessmentSession {
  sessionId: string;
  instrumentId: string;
  startedAt: string;
  updatedAt: string;
  completedAt: string | null;
  currentIndex: number;
  responses: Record<string, LikertValue>;
  result: AssessmentResult | null;
}
