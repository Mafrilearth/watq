import type { DISCQuadrant, DISCResult, DISCScores, LikertValue, QuestionItem } from "../types";
import { calculateResponseValidity } from "./validity";

/**
 * 16-Item DISC Workplace Behavioral Assessment Catalog
 * 4 Quadrants x 4 Items each
 * Standard: William Moulton Marston (1928) Workplace Behavioral Matrix
 */
export const DISC_QUESTIONS: QuestionItem[] = [
  // --- Dominance (D): Direct, Results-Oriented, Firm, Strong-Willed ---
  {
    id: "DISC-D1",
    dimension: "D",
    isReversed: false,
    prompt: "I am direct, assertive, and thrive on driving high-stakes results quickly.",
    target: "Dominance: Result-oriented drive",
    modelType: "disc",
  },
  {
    id: "DISC-D2",
    dimension: "D",
    isReversed: false,
    prompt: "I readily take charge of projects and make decisive calls in ambiguous situations.",
    target: "Dominance: Executive command",
    modelType: "disc",
  },
  {
    id: "DISC-D3",
    dimension: "D",
    isReversed: false,
    prompt: "I confront obstacles head-on and push vigorously past bureaucratic resistance.",
    target: "Dominance: Overcoming resistance",
    modelType: "disc",
  },
  {
    id: "DISC-D4",
    dimension: "D",
    isReversed: true,
    prompt: "I prefer staying in background support roles rather than taking command of outcomes.",
    target: "Low Dominance: Non-confrontational support",
    modelType: "disc",
  },

  // --- Influence (I): Outgoing, Enthusiastic, Optimistic, High-Spirited ---
  {
    id: "DISC-I1",
    dimension: "I",
    isReversed: false,
    prompt: "I inspire enthusiasm in teams and use verbal persuasion to bring ideas to life.",
    target: "Influence: Inspiring persuasion",
    modelType: "disc",
  },
  {
    id: "DISC-I2",
    dimension: "I",
    isReversed: false,
    prompt: "I thrive in vibrant social environments and build professional rapport effortlessly.",
    target: "Influence: Communal rapport",
    modelType: "disc",
  },
  {
    id: "DISC-I3",
    dimension: "I",
    isReversed: false,
    prompt: "I express optimism and motivate colleagues during challenging operational phases.",
    target: "Influence: Morale boosting",
    modelType: "disc",
  },
  {
    id: "DISC-I4",
    dimension: "I",
    isReversed: true,
    prompt: "I avoid social self-promotion and prefer communicating strictly through written data.",
    target: "Low Influence: Reserved factual transmission",
    modelType: "disc",
  },

  // --- Steadiness (S): Even-Tempered, Accommodating, Patient, Humble ---
  {
    id: "DISC-S1",
    dimension: "S",
    isReversed: false,
    prompt: "I am patient, dependable, and provide a calm, stabilizing presence to my team.",
    target: "Steadiness: Patient dependability",
    modelType: "disc",
  },
  {
    id: "DISC-S2",
    dimension: "S",
    isReversed: false,
    prompt: "I value consistent routines, team harmony, and gradual, well-planned evolution.",
    target: "Steadiness: Harmony and consistency",
    modelType: "disc",
  },
  {
    id: "DISC-S3",
    dimension: "S",
    isReversed: false,
    prompt: "I am a dedicated listener who proactively helps colleagues complete their tasks.",
    target: "Steadiness: Cooperative support",
    modelType: "disc",
  },
  {
    id: "DISC-S4",
    dimension: "S",
    isReversed: true,
    prompt: "I get restless with steady routines and frequently disrupt stable plans for fast change.",
    target: "Low Steadiness: Pacing volatility",
    modelType: "disc",
  },

  // --- Conscientiousness (C): Analytical, Reserved, Precise, Private ---
  {
    id: "DISC-C1",
    dimension: "C",
    isReversed: false,
    prompt: "I focus on precision, factual accuracy, and high technical quality in my deliverables.",
    target: "Conscientiousness: Systematic precision",
    modelType: "disc",
  },
  {
    id: "DISC-C2",
    dimension: "C",
    isReversed: false,
    prompt: "I analyze objective data methodically before committing to a decision.",
    target: "Conscientiousness: Methodical analysis",
    modelType: "disc",
  },
  {
    id: "DISC-C3",
    dimension: "C",
    isReversed: false,
    prompt: "I follow established standards, error-checking protocols, and technical specifications.",
    target: "Conscientiousness: Protocol compliance",
    modelType: "disc",
  },
  {
    id: "DISC-C4",
    dimension: "C",
    isReversed: true,
    prompt: "I dislike meticulous fine-print details and prefer trusting gut feeling over spreadsheets.",
    target: "Low Conscientiousness: Intuitive estimation",
    modelType: "disc",
  },
];

interface DISCProfileMeta {
  title: string;
  leadershipStyle: string;
  communicationDos: string[];
  communicationDonts: string[];
  summary: string;
}

export const DISC_METAS: Record<string, DISCProfileMeta> = {
  D: {
    title: "The Pioneer (Dominant Driver)",
    leadershipStyle: "Decisive, visionary, commanding, results-first.",
    communicationDos: [
      "Be concise, state the bottom line immediately, and focus on outcomes.",
      "Bring solutions, not problems; respect their pace and urgency.",
    ],
    communicationDonts: [
      "Do not beat around the bush or overload them with unnecessary trivia.",
      "Do not take their direct, blunt communication personally.",
    ],
    summary: "Assertive, fast-paced, and motivated by overcoming obstacles. Thrives in crisis and rapid execution.",
  },
  I: {
    title: "The Catalyst (Influential Persuader)",
    leadershipStyle: "Energetic, inspirational, people-focused, collaborative.",
    communicationDos: [
      "Be warm, express enthusiasm, and acknowledge their creative contributions.",
      "Leave room for verbal brainstorming and shared vision.",
    ],
    communicationDonts: [
      "Do not drown discussions in dry technical jargon without human context.",
      "Do not restrict their creative autonomy or isolate them socially.",
    ],
    summary: "Charismatic, optimistic, and visionary. Excels at rallying people, building alliances, and boosting morale.",
  },
  S: {
    title: "The Anchor (Steady Collaborator)",
    leadershipStyle: "Supportive, empathetic, methodical, patient.",
    communicationDos: [
      "Communicate with sincere warmth, provide clear timelines, and give notice before changes.",
      "Acknowledge their consistent, reliable contributions to the team.",
    ],
    communicationDonts: [
      "Do not impose sudden, chaotic disruptions without logical justification.",
      "Do not be aggressive or pressure them for instantaneous reactions.",
    ],
    summary: "Reliable, patient, and deeply loyal. The stabilizing backbone of any high-performing team.",
  },
  C: {
    title: "The Architect (Conscientious Analyst)",
    leadershipStyle: "Systematic, meticulous, data-driven, quality-focused.",
    communicationDos: [
      "Present verifiable data, structured facts, and realistic timelines.",
      "Respect their analytical rigor and give them time to audit details.",
    ],
    communicationDonts: [
      "Do not make vague, unsubstantiated claims or push sloppy shortcuts.",
      "Do not interpret their objective scrutiny as personal criticism.",
    ],
    summary: "Thorough, precise, and intellectually rigorous. Upholds standards, data integrity, and engineering quality.",
  },
};

/**
 * Calculates DISC Scores & Behavioral Dossier
 */
export function calculateDISCScores(responses: Record<string, LikertValue>): DISCResult {
  const sums: Record<DISCQuadrant, number> = {
    D: 0,
    I: 0,
    S: 0,
    C: 0,
  };

  for (const item of DISC_QUESTIONS) {
    const rawVal = responses[item.id] ?? 3;
    const score = item.isReversed ? 6 - rawVal : rawVal;
    sums[item.dimension as DISCQuadrant] += score;
  }

  // Linear percentage: 4 items, min 4, max 20 => (sum - 4) / 16 * 100%
  const scores: DISCScores = {
    D: Math.round(((sums.D - 4) / 16) * 100),
    I: Math.round(((sums.I - 4) / 16) * 100),
    S: Math.round(((sums.S - 4) / 16) * 100),
    C: Math.round(((sums.C - 4) / 16) * 100),
  };

  const sortedQuadrants = (["D", "I", "S", "C"] as DISCQuadrant[]).sort(
    (a, b) => sums[b] - sums[a]
  );

  const primaryStyle = sortedQuadrants[0];
  const secondaryStyle = sortedQuadrants[1];
  const styleLockup = `${primaryStyle}${secondaryStyle.toLowerCase()}`;

  const primaryMeta = DISC_METAS[primaryStyle] || DISC_METAS.D;
  const validityIndex = calculateResponseValidity(responses, DISC_QUESTIONS);

  return {
    modelType: "disc",
    primaryStyle,
    secondaryStyle,
    styleLockup,
    styleTitle: `${primaryMeta.title} (${primaryStyle}/${secondaryStyle})`,
    scores,
    leadershipStyle: primaryMeta.leadershipStyle,
    communicationDos: primaryMeta.communicationDos,
    communicationDonts: primaryMeta.communicationDonts,
    summary: primaryMeta.summary,
    validityIndex,
  };
}
