import type { BigFiveDimension, BigFiveResult, BigFiveScores, LikertValue, QuestionItem } from "../types";
import { calculateResponseValidity } from "./validity";

/**
 * The 20-Item Mini-IPIP Big Five Assessment Catalog
 * Standard: International Personality Item Pool (Goldberg 1999, Donnellan et al. 2006)
 * 5 Dimensions x 4 Items each (50% reversed-keying)
 */
export const BIG_FIVE_QUESTIONS: QuestionItem[] = [
  // --- Extraversion (E) ---
  {
    id: "BF-E1",
    dimension: "E",
    isReversed: false,
    prompt: "I am the life of the party and naturally initiate conversations with strangers.",
    target: "Extraversion: Social engagement and vigor",
    modelType: "bigfive",
  },
  {
    id: "BF-E2",
    dimension: "E",
    isReversed: false,
    prompt: "I feel comfortable and energized around large groups of diverse people.",
    target: "Extraversion: Communal enthusiasm",
    modelType: "bigfive",
  },
  {
    id: "BF-E3",
    dimension: "E",
    isReversed: true,
    prompt: "I keep in the background and prefer to stay quiet in social gatherings.",
    target: "Introversion: Reserved interpersonal stance",
    modelType: "bigfive",
  },
  {
    id: "BF-E4",
    dimension: "E",
    isReversed: true,
    prompt: "I rarely speak a lot and prefer solitary tasks over group discussions.",
    target: "Introversion: Solitary energy recharge",
    modelType: "bigfive",
  },

  // --- Agreeableness (A) ---
  {
    id: "BF-A1",
    dimension: "A",
    isReversed: false,
    prompt: "I sympathize deeply with others' feelings and show compassion easily.",
    target: "Agreeableness: Empathy and interpersonal warmth",
    modelType: "bigfive",
  },
  {
    id: "BF-A2",
    dimension: "A",
    isReversed: false,
    prompt: "I am genuinely interested in other people and take time to help them.",
    target: "Agreeableness: Altruism and cooperation",
    modelType: "bigfive",
  },
  {
    id: "BF-A3",
    dimension: "A",
    isReversed: true,
    prompt: "I am not interested in other people's problems and keep emotional distance.",
    target: "Detachment: Low agreeableness",
    modelType: "bigfive",
  },
  {
    id: "BF-A4",
    dimension: "A",
    isReversed: true,
    prompt: "I can be blunt and indifferent to whether my statements hurt others.",
    target: "Directness / Scepticism",
    modelType: "bigfive",
  },

  // --- Conscientiousness (C) ---
  {
    id: "BF-C1",
    dimension: "C",
    isReversed: false,
    prompt: "I get chores and obligations done immediately without procrastination.",
    target: "Conscientiousness: Task diligence and self-discipline",
    modelType: "bigfive",
  },
  {
    id: "BF-C2",
    dimension: "C",
    isReversed: false,
    prompt: "I like order, structured systems, and methodical organization.",
    target: "Conscientiousness: Methodical orderliness",
    modelType: "bigfive",
  },
  {
    id: "BF-C3",
    dimension: "C",
    isReversed: true,
    prompt: "I often leave my belongings around and procrastinate on important duties.",
    target: "Spontaneity / Low orderliness",
    modelType: "bigfive",
  },
  {
    id: "BF-C4",
    dimension: "C",
    isReversed: true,
    prompt: "I make careless mistakes when I feel hurried or uninspired by routine.",
    target: "Improvisational pacing",
    modelType: "bigfive",
  },

  // --- Neuroticism / Emotional Stability (N) ---
  {
    id: "BF-N1",
    dimension: "N",
    isReversed: false,
    prompt: "I have frequent mood swings and get stressed out relatively easily.",
    target: "Neuroticism: Stress reactivity and volatility",
    modelType: "bigfive",
  },
  {
    id: "BF-N2",
    dimension: "N",
    isReversed: false,
    prompt: "I worry about things frequently, even when things are objectively fine.",
    target: "Neuroticism: Anxiety anticipation",
    modelType: "bigfive",
  },
  {
    id: "BF-N3",
    dimension: "N",
    isReversed: true,
    prompt: "I am relaxed most of the time and rarely feel overwhelmed by tension.",
    target: "Emotional Stability: Resilience under pressure",
    modelType: "bigfive",
  },
  {
    id: "BF-N4",
    dimension: "N",
    isReversed: true,
    prompt: "I seldom feel blue or discouraged, recovering quickly from setbacks.",
    target: "Emotional Stability: Affective equilibrium",
    modelType: "bigfive",
  },

  // --- Openness to Experience (O) ---
  {
    id: "BF-O1",
    dimension: "O",
    isReversed: false,
    prompt: "I have a vivid imagination and love exploring theoretical, abstract ideas.",
    target: "Openness: Intellectual curiosity & imagination",
    modelType: "bigfive",
  },
  {
    id: "BF-O2",
    dimension: "O",
    isReversed: false,
    prompt: "I enjoy philosophical discussions and contemplating unconventional concepts.",
    target: "Openness: Divergent thinking & novelty",
    modelType: "bigfive",
  },
  {
    id: "BF-O3",
    dimension: "O",
    isReversed: true,
    prompt: "I am not interested in abstract ideas and prefer plain, literal facts.",
    target: "Pragmatism: Concrete factual orientation",
    modelType: "bigfive",
  },
  {
    id: "BF-O4",
    dimension: "O",
    isReversed: true,
    prompt: "I prefer sticking to conventional, tried-and-true methods over untried experiments.",
    target: "Tradition: Established precedent preference",
    modelType: "bigfive",
  },
];

/**
 * Calculates Big Five (OCEAN) Scores & Dossier
 */
export function calculateBigFiveScores(responses: Record<string, LikertValue>): BigFiveResult {
  const sums: Record<BigFiveDimension, number> = {
    O: 0,
    C: 0,
    E: 0,
    A: 0,
    N: 0,
  };

  for (const item of BIG_FIVE_QUESTIONS) {
    const rawVal = responses[item.id] ?? 3;
    const score = item.isReversed ? 6 - rawVal : rawVal;
    sums[item.dimension as BigFiveDimension] += score;
  }

  // Linear percentage: 4 items, min 4, max 20 => (sum - 4) / 16 * 100%
  const scores: BigFiveScores = {
    O: Math.round(((sums.O - 4) / 16) * 100),
    C: Math.round(((sums.C - 4) / 16) * 100),
    E: Math.round(((sums.E - 4) / 16) * 100),
    A: Math.round(((sums.A - 4) / 16) * 100),
    N: Math.round(((sums.N - 4) / 16) * 100),
  };

  const getLevel = (val: number): "Low" | "Moderate" | "High" =>
    val >= 67 ? "High" : val <= 33 ? "Low" : "Moderate";

  const traitDescriptions: BigFiveResult["traitDescriptions"] = {
    O: {
      score: scores.O,
      level: getLevel(scores.O),
      description:
        scores.O >= 67
          ? "High intellectual curiosity, deep artistic sensitivity, and preference for unconventional novelty."
          : scores.O <= 33
          ? "Grounded pragmatist with strong preference for concrete facts, routine, and established methods."
          : "Balanced orientation between practical execution and conceptual innovation.",
    },
    C: {
      score: scores.C,
      level: getLevel(scores.C),
      description:
        scores.C >= 67
          ? "Highly disciplined, methodical, organized, with exceptional anticipatory task follow-through."
          : scores.C <= 33
          ? "Highly flexible, spontaneous, and emergent; thrives without rigid blueprints."
          : "Healthy equilibrium between structured discipline and situational adaptability.",
    },
    E: {
      score: scores.E,
      level: getLevel(scores.E),
      description:
        scores.E >= 67
          ? "Socially vibrant, energetic, assertively expressive, drawing mental energy from external engagement."
          : scores.E <= 33
          ? "Quietly contemplative, independent, recharges energy in serene solitary environments."
          : "Ambiverted: fluidly shifts between social participation and focused solitary work.",
    },
    A: {
      score: scores.A,
      level: getLevel(scores.A),
      description:
        scores.A >= 67
          ? "Deeply empathetic, cooperative, trusting, and proactive in cultivating communal harmony."
          : scores.A <= 33
          ? "Analytically skeptical, competitive, and unswayed by social sentiment or peer pressure."
          : "Diplomatic balance of constructive skepticism and collaborative warmth.",
    },
    N: {
      score: scores.N,
      level: getLevel(scores.N),
      description:
        scores.N >= 67
          ? "Heightened sensitivity to environmental stressors; alert to risks and subtle emotional undercurrents."
          : scores.N <= 33
          ? "High affective stability, emotionally calm, composed, and resilient in high-pressure scenarios."
          : "Normal affective reactivity with healthy recovery mechanisms under acute stress.",
    },
  };

  // Determine dominant signature trait
  const traits = (["O", "C", "E", "A", "N"] as BigFiveDimension[]).sort((a, b) => scores[b] - scores[a]);
  const primaryCode = traits[0];
  const traitNames: Record<BigFiveDimension, string> = {
    O: "Openness to Experience (Explorer of Concepts)",
    C: "Conscientiousness (Disciplined Achiever)",
    E: "Extraversion (Social Catalyst)",
    A: "Agreeableness (Empathetic Cooperator)",
    N: "Emotional Reactivity (Alert Sentinel)",
  };

  const validityIndex = calculateResponseValidity(responses, BIG_FIVE_QUESTIONS);

  return {
    modelType: "bigfive",
    scores,
    primaryTrait: traitNames[primaryCode],
    dossierSummary: `Empirical profiling reveals a dominant signature in ${traitNames[primaryCode]} (${scores[primaryCode]}%), accompanied by an emotional stability index of ${100 - scores.N}%.`,
    traitDescriptions,
    validityIndex,
  };
}
