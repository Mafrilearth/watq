import type { EnneagramResult, EnneagramScores, EnneagramTypeNumber, LikertValue, QuestionItem } from "../types";
import { calculateResponseValidity } from "./validity";

/**
 * 36-Item Enneagram of Personality Catalog
 * 9 Types x 4 Items each
 */
export const ENNEAGRAM_QUESTIONS: QuestionItem[] = [
  // --- Type 1: The Reformer (Ethical, Purposeful, Self-Controlled) ---
  {
    id: "ENN-1A",
    dimension: "1",
    isReversed: false,
    prompt: "I have a strong inner critic that continuously drives me to correct flaws and do things the right way.",
    target: "Type 1: High personal standards & moral integrity",
    modelType: "enneagram",
  },
  {
    id: "ENN-1B",
    dimension: "1",
    isReversed: false,
    prompt: "It bothers me deeply when people cut corners, ignore rules, or behave irresponsibly.",
    target: "Type 1: Principles & conscientious order",
    modelType: "enneagram",
  },
  {
    id: "ENN-1C",
    dimension: "1",
    isReversed: false,
    prompt: "I hold myself and others to exceedingly high benchmarks of excellence.",
    target: "Type 1: Perfectionism and responsibility",
    modelType: "enneagram",
  },
  {
    id: "ENN-1D",
    dimension: "1",
    isReversed: true,
    prompt: "I am relaxed about imperfections and rarely feel a compulsion to correct things around me.",
    target: "Low Type 1: Acceptance of imperfection",
    modelType: "enneagram",
  },

  // --- Type 2: The Helper (Empathetic, Caring, Interpersonal) ---
  {
    id: "ENN-2A",
    dimension: "2",
    isReversed: false,
    prompt: "I naturally notice when others are struggling and feel a warm impulse to nurture and assist them.",
    target: "Type 2: Nurturance and empathy",
    modelType: "enneagram",
  },
  {
    id: "ENN-2B",
    dimension: "2",
    isReversed: false,
    prompt: "Being appreciated, needed, and loved by people close to me is vital to my self-worth.",
    target: "Type 2: Desire for affection & belonging",
    modelType: "enneagram",
  },
  {
    id: "ENN-2C",
    dimension: "2",
    isReversed: false,
    prompt: "I often prioritize other people's needs and emotional comfort over my own.",
    target: "Type 2: Self-sacrificing altruism",
    modelType: "enneagram",
  },
  {
    id: "ENN-2D",
    dimension: "2",
    isReversed: true,
    prompt: "I rarely get involved in other people's personal needs and guard my emotional independence.",
    target: "Low Type 2: Interpersonal detachment",
    modelType: "enneagram",
  },

  // --- Type 3: The Achiever (Ambitious, Competent, Driven) ---
  {
    id: "ENN-3A",
    dimension: "3",
    isReversed: false,
    prompt: "I am driven to achieve tangible goals, gain respect, and be viewed as highly competent.",
    target: "Type 3: Ambition and pursuit of success",
    modelType: "enneagram",
  },
  {
    id: "ENN-3B",
    dimension: "3",
    isReversed: false,
    prompt: "I efficiently organize my time and adapt my presentation to make a winning impression.",
    target: "Type 3: Goal-oriented pragmatism",
    modelType: "enneagram",
  },
  {
    id: "ENN-3C",
    dimension: "3",
    isReversed: false,
    prompt: "Failing to achieve my objectives or being perceived as ineffective causes me acute discomfort.",
    target: "Type 3: Fear of failure / inefficiency",
    modelType: "enneagram",
  },
  {
    id: "ENN-3D",
    dimension: "3",
    isReversed: true,
    prompt: "External status and professional achievements are unimportant to my personal contentment.",
    target: "Low Type 3: Indifference to accolades",
    modelType: "enneagram",
  },

  // --- Type 4: The Individualist (Sensitive, Expressive, Dramatic) ---
  {
    id: "ENN-4A",
    dimension: "4",
    isReversed: false,
    prompt: "I feel fundamentally different from most people and have a profound yearning for unique self-expression.",
    target: "Type 4: Authentic individuality",
    modelType: "enneagram",
  },
  {
    id: "ENN-4B",
    dimension: "4",
    isReversed: false,
    prompt: "I am comfortable diving into deep melancholy, intense emotions, and poetic introspection.",
    target: "Type 4: Emotional depth & introspection",
    modelType: "enneagram",
  },
  {
    id: "ENN-4C",
    dimension: "4",
    isReversed: false,
    prompt: "Ordinary, mundane routines make me feel disconnected from my genuine identity.",
    target: "Type 4: Resistance to conformity",
    modelType: "enneagram",
  },
  {
    id: "ENN-4D",
    dimension: "4",
    isReversed: true,
    prompt: "I consider myself very conventional and rarely reflect on feeling misunderstood.",
    target: "Low Type 4: Conventional satisfaction",
    modelType: "enneagram",
  },

  // --- Type 5: The Investigator (Perceptive, Innovative, Secretive) ---
  {
    id: "ENN-5A",
    dimension: "5",
    isReversed: false,
    prompt: "I need substantial solitary time to read, investigate complex systems, and master technical topics.",
    target: "Type 5: Intellectual mastery & energy conservation",
    modelType: "enneagram",
  },
  {
    id: "ENN-5B",
    dimension: "5",
    isReversed: false,
    prompt: "I feel overwhelmed when people make intense emotional demands on my energy.",
    target: "Type 5: Boundary protection against depletion",
    modelType: "enneagram",
  },
  {
    id: "ENN-5C",
    dimension: "5",
    isReversed: false,
    prompt: "I observe situations dispassionately from a distance before deciding whether to engage.",
    target: "Type 5: Analytical detachment",
    modelType: "enneagram",
  },
  {
    id: "ENN-5D",
    dimension: "5",
    isReversed: true,
    prompt: "I dislike analyzing theoretical systems and prefer active social participation.",
    target: "Low Type 5: Action over contemplation",
    modelType: "enneagram",
  },

  // --- Type 6: The Loyalist (Engaging, Responsible, Anxious) ---
  {
    id: "ENN-6A",
    dimension: "6",
    isReversed: false,
    prompt: "I anticipate potential hazards, prepare backup plans, and value security and reliable loyalty.",
    target: "Type 6: Risk anticipation and vigilance",
    modelType: "enneagram",
  },
  {
    id: "ENN-6B",
    dimension: "6",
    isReversed: false,
    prompt: "I question authority motives while simultaneously seeking dependable alliances and trust.",
    target: "Type 6: Skeptical vigilance & alliance",
    modelType: "enneagram",
  },
  {
    id: "ENN-6C",
    dimension: "6",
    isReversed: false,
    prompt: "Uncertainty and sudden unvetted changes create an anxious internal vigilance within me.",
    target: "Type 6: Security and stabilization drive",
    modelType: "enneagram",
  },
  {
    id: "ENN-6D",
    dimension: "6",
    isReversed: true,
    prompt: "I rarely worry about future risks and step into unpredictable situations with carefree ease.",
    target: "Low Type 6: Uninhibited risk tolerance",
    modelType: "enneagram",
  },

  // --- Type 7: The Enthusiast (Spontaneous, Versatile, Distractible) ---
  {
    id: "ENN-7A",
    dimension: "7",
    isReversed: false,
    prompt: "I love exploring exciting new possibilities, keeping options open, and avoiding boring limitations.",
    target: "Type 7: Pursuit of variety and stimulation",
    modelType: "enneagram",
  },
  {
    id: "ENN-7B",
    dimension: "7",
    isReversed: false,
    prompt: "I naturally reframe negative situations into positive adventures and creative opportunities.",
    target: "Type 7: Optimistic reframing",
    modelType: "enneagram",
  },
  {
    id: "ENN-7C",
    dimension: "7",
    isReversed: false,
    prompt: "Being locked into tedious, repetitive commitments triggers an urge in me to escape.",
    target: "Type 7: Freedom and stimulus appetite",
    modelType: "enneagram",
  },
  {
    id: "ENN-7D",
    dimension: "7",
    isReversed: true,
    prompt: "I am fully content with monotonous routine and rarely seek novel distractions.",
    target: "Low Type 7: Routine tolerance",
    modelType: "enneagram",
  },

  // --- Type 8: The Challenger (Self-Confident, Decisive, Willful) ---
  {
    id: "ENN-8A",
    dimension: "8",
    isReversed: false,
    prompt: "I am direct, assertive, and unafraid of confronting injustice or taking charge in a crisis.",
    target: "Type 8: Direct assertiveness and leadership",
    modelType: "enneagram",
  },
  {
    id: "ENN-8B",
    dimension: "8",
    isReversed: false,
    prompt: "I cannot tolerate being controlled, manipulated, or shown disrespect by anyone.",
    target: "Type 8: Fierce autonomy & protective boundary",
    modelType: "enneagram",
  },
  {
    id: "ENN-8C",
    dimension: "8",
    isReversed: false,
    prompt: "I instinctively protect vulnerable people and use my strength to make things happen.",
    target: "Type 8: Protective strength & power",
    modelType: "enneagram",
  },
  {
    id: "ENN-8D",
    dimension: "8",
    isReversed: true,
    prompt: "I prefer backing down in conflicts and feel uncomfortable taking commanding authority.",
    target: "Low Type 8: Submissive conflict avoidance",
    modelType: "enneagram",
  },

  // --- Type 9: The Peacemaker (Receptive, Reassuring, Agreeable) ---
  {
    id: "ENN-9A",
    dimension: "9",
    isReversed: false,
    prompt: "I place high value on inner peace, avoiding confrontation, and seeing all points of view.",
    target: "Type 9: Harmonization and equanimity",
    modelType: "enneagram",
  },
  {
    id: "ENN-9B",
    dimension: "9",
    isReversed: false,
    prompt: "I often merge with what others want to maintain harmony and avoid creating friction.",
    target: "Type 9: Accommodation & peace-keeping",
    modelType: "enneagram",
  },
  {
    id: "ENN-9C",
    dimension: "9",
    isReversed: false,
    prompt: "I find it easy to calm agitated individuals and bring balanced perspective to debates.",
    target: "Type 9: Mediation and calm presence",
    modelType: "enneagram",
  },
  {
    id: "ENN-9D",
    dimension: "9",
    isReversed: true,
    prompt: "I relish provoking arguments and disrupting harmony to force my point across.",
    target: "Low Type 9: Combative disruption",
    modelType: "enneagram",
  },
];

interface EnneagramMeta {
  title: string;
  triad: "Head" | "Heart" | "Gut";
  coreFear: string;
  coreDesire: string;
  growthArrow: EnneagramTypeNumber;
  stressArrow: EnneagramTypeNumber;
  summary: string;
}

export const ENNEAGRAM_METAS: Record<EnneagramTypeNumber, EnneagramMeta> = {
  1: {
    title: "The Reformer (Ethical Perfectionist)",
    triad: "Gut",
    coreFear: "Being corrupt, flawed, or morally defective.",
    coreDesire: "To be good, balanced, and have personal integrity.",
    growthArrow: 7, // Goes to 7 in healthy integration (spontaneous, joyful)
    stressArrow: 4, // Goes to 4 in stress (moody, alienated)
    summary: "Conscientious, ethical, with a profound sense of right and wrong. Driven to improve the world.",
  },
  2: {
    title: "The Helper (Empathetic Altruist)",
    triad: "Heart",
    coreFear: "Being unwanted, unworthy of being loved, or rejected.",
    coreDesire: "To feel loved, appreciated, and emotionally connected.",
    growthArrow: 4, // Goes to 4 in growth (self-nurturing, authentic)
    stressArrow: 8, // Goes to 8 in stress (aggressive, controlling)
    summary: "Warm, empathetic, and demonstrative. Prioritizes the welfare and affection of close connections.",
  },
  3: {
    title: "The Achiever (Driven Performer)",
    triad: "Heart",
    coreFear: "Being worthless, ineffective, or a failure.",
    coreDesire: "To feel valuable, competent, and genuinely successful.",
    growthArrow: 6, // Goes to 6 in growth (cooperative, committed to team)
    stressArrow: 9, // Goes to 9 in stress (disengaged, burned out)
    summary: "Success-oriented, pragmatic, adaptable, and industrious. Excels at turning vision into reality.",
  },
  4: {
    title: "The Individualist (Authentic Romantic)",
    triad: "Heart",
    coreFear: "Having no unique identity or personal significance.",
    coreDesire: "To express individuality and create deep meaning.",
    growthArrow: 1, // Goes to 1 in growth (disciplined, objective)
    stressArrow: 2, // Goes to 2 in stress (needy, over-involved)
    summary: "Sensitive, creative, introspective, and expressive. Attuned to beauty and nuance.",
  },
  5: {
    title: "The Investigator (Analytical Observer)",
    triad: "Head",
    coreFear: "Being helpless, incompetent, or mentally overwhelmed.",
    coreDesire: "To master knowledge, understand systems, and be capable.",
    growthArrow: 8, // Goes to 8 in growth (confident, decisive leader)
    stressArrow: 7, // Goes to 7 in stress (scattered, hyperactive)
    summary: "Intense, cerebral, perceptive, and independent. Synthesizes complex models in quiet contemplation.",
  },
  6: {
    title: "The Loyalist (Committed Guardian)",
    triad: "Head",
    coreFear: "Being without support, guidance, or security.",
    coreDesire: "To have security, dependable alliances, and certainty.",
    growthArrow: 9, // Goes to 9 in growth (relaxed, optimistic peace)
    stressArrow: 3, // Goes to 3 in stress (workaholic, status-driven)
    summary: "Reliable, hardworking, risk-aware, and loyal. Builds protective structures and trustworthy partnerships.",
  },
  7: {
    title: "The Enthusiast (Visionary Explorer)",
    triad: "Head",
    coreFear: "Being deprived, trapped in pain, or limited.",
    coreDesire: "To maintain freedom, experience joy, and explore.",
    growthArrow: 5, // Goes to 5 in growth (focused, deep mastery)
    stressArrow: 1, // Goes to 1 in stress (critical, rigid, perfectionist)
    summary: "Spontaneous, versatile, acquisitive, and optimistic. Envisions limitless possibilities.",
  },
  8: {
    title: "The Challenger (Protective Leader)",
    triad: "Gut",
    coreFear: "Being harmed, controlled, or vulnerable.",
    coreDesire: "To protect themselves, assert autonomy, and champion truth.",
    growthArrow: 2, // Goes to 2 in growth (open-hearted, caring protector)
    stressArrow: 5, // Goes to 5 in stress (withdrawn, hyper-vigilant)
    summary: "Commanding, direct, decisive, and protective. Takes charge boldly in moments of crisis.",
  },
  9: {
    title: "The Peacemaker (Harmonious Mediator)",
    triad: "Gut",
    coreFear: "Loss of connection, conflict, and fragmentation.",
    coreDesire: "To maintain inner peace, harmony, and wholeness.",
    growthArrow: 3, // Goes to 3 in growth (decisive, energetic action)
    stressArrow: 6, // Goes to 6 in stress (anxious, worried, defensive)
    summary: "Receptive, reassuring, agreeable, and calm. Masters the art of seeing all perspectives.",
  },
};

/**
 * Calculates Enneagram Core Type, Wings, and Growth/Stress Vectors
 */
export function calculateEnneagramScores(responses: Record<string, LikertValue>): EnneagramResult {
  const sums: Record<EnneagramTypeNumber, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  };

  for (const item of ENNEAGRAM_QUESTIONS) {
    const rawVal = responses[item.id] ?? 3;
    const score = item.isReversed ? 6 - rawVal : rawVal;
    const typeNum = Number(item.dimension) as EnneagramTypeNumber;
    sums[typeNum] += score;
  }

  // Linear percentage per type: 4 items, min 4, max 20 => (sum - 4) / 16 * 100%
  const scores: EnneagramScores = {
    type1: Math.round(((sums[1] - 4) / 16) * 100),
    type2: Math.round(((sums[2] - 4) / 16) * 100),
    type3: Math.round(((sums[3] - 4) / 16) * 100),
    type4: Math.round(((sums[4] - 4) / 16) * 100),
    type5: Math.round(((sums[5] - 4) / 16) * 100),
    type6: Math.round(((sums[6] - 4) / 16) * 100),
    type7: Math.round(((sums[7] - 4) / 16) * 100),
    type8: Math.round(((sums[8] - 4) / 16) * 100),
    type9: Math.round(((sums[9] - 4) / 16) * 100),
  };

  // Find dominant core type
  const typeList = ([1, 2, 3, 4, 5, 6, 7, 8, 9] as EnneagramTypeNumber[]).sort(
    (a, b) => sums[b] - sums[a]
  );
  const coreType = typeList[0];

  // Calculate adjacent wings (e.g. for Type 5, wings are 4 and 6; for 1: 9 and 2; for 9: 8 and 1)
  const leftWing = (coreType === 1 ? 9 : coreType - 1) as EnneagramTypeNumber;
  const rightWing = (coreType === 9 ? 1 : coreType + 1) as EnneagramTypeNumber;
  const dominantWing = sums[leftWing] >= sums[rightWing] ? leftWing : rightWing;
  const wingNotation = `${coreType}w${dominantWing}`;

  const meta = ENNEAGRAM_METAS[coreType];
  const validityIndex = calculateResponseValidity(responses, ENNEAGRAM_QUESTIONS);

  return {
    modelType: "enneagram",
    coreType,
    title: meta.title,
    wing: wingNotation,
    triad: meta.triad,
    coreFear: meta.coreFear,
    coreDesire: meta.coreDesire,
    growthArrow: meta.growthArrow,
    stressArrow: meta.stressArrow,
    summary: meta.summary,
    scores,
    validityIndex,
  };
}
