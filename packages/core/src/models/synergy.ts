export interface ArchetypeSynergy {
  typeA: string;
  typeB: string;
  synergyScore: number; // 0 - 100%
  synergyTier: "IDEAL_HARMONY" | "DYNAMIC_COMPLEMENT" | "INTELLECTUAL_CATALYST" | "CONSTRUCTIVE_FRICTION";
  summary: string;
  collaborationStrengths: string[];
  conflictHotspots: string[];
  communicationDos: string[];
  communicationDonts: string[];
}

/**
 * Calculates relationship compatibility and cognitive synergy between two archetypes
 * Based on Jungian function compatibility and cognitive tension dynamics.
 */
export function calculateArchetypeSynergy(typeA: string, typeB: string): ArchetypeSynergy {
  const normA = typeA.toUpperCase();
  const normB = typeB.toUpperCase();

  // If identical types
  if (normA === normB) {
    return {
      typeA: normA,
      typeB: normB,
      synergyScore: 88,
      synergyTier: "IDEAL_HARMONY",
      summary: `Shared cognitive architecture. Both share identical worldview vectors and intuitive pacing, creating instant mutual validation.`,
      collaborationStrengths: [
        "Unspoken alignment on core priorities and mental pace.",
        "Zero friction in interpreting each other's communication style.",
        "Shared appreciation for the same decision-making criteria.",
      ],
      conflictHotspots: [
        "Shared cognitive blindspots (e.g., both neglecting details or both avoiding conflict).",
        "Risk of groupthink or mutual stubbornness on shared strong opinions.",
      ],
      communicationDos: [
        "Leverage shared strengths while actively delegating your mutual weak functions.",
        "Check each other's logic constructively without assuming total consensus.",
      ],
      communicationDonts: [
        "Do not assume identical emotional states just because your type codes match.",
        "Do not neglect empirical operational details.",
      ],
    };
  }

  // Count shared letters
  let sharedDimensions = 0;
  for (let i = 0; i < 4; i++) {
    if (normA[i] === normB[i]) sharedDimensions++;
  }

  // Check specific high-synergy classic golden / bronze pairs (e.g. INTJ & ENFP, INFJ & ENTP, ISTJ & ESFP)
  const isOppositeEnergy = normA[0] !== normB[0];
  const hasSharedMiddle = normA[1] === normB[1] || normA[2] === normB[2];

  let baseScore = 65;
  let tier: ArchetypeSynergy["synergyTier"] = "DYNAMIC_COMPLEMENT";

  // Classic complementary pairing (e.g. NT and NF, or shared intuitive vision with opposite energy)
  if (isOppositeEnergy && normA[1] === normB[1]) {
    baseScore = 92;
    tier = "IDEAL_HARMONY";
  } else if (normA[1] === normB[1] && normA[2] === normB[2]) {
    baseScore = 85;
    tier = "INTELLECTUAL_CATALYST";
  } else if (sharedDimensions === 0) {
    // Total polar opposites (e.g. INTJ vs ESFP)
    baseScore = 74;
    tier = "CONSTRUCTIVE_FRICTION";
  } else {
    baseScore = 78 + sharedDimensions * 3;
    tier = "DYNAMIC_COMPLEMENT";
  }

  const collaborationStrengths: string[] = [];
  const conflictHotspots: string[] = [];
  const communicationDos: string[] = [];
  const communicationDonts: string[] = [];

  // Energy Dimension Analysis (E vs I)
  if (normA[0] !== normB[0]) {
    collaborationStrengths.push(
      "Energy Equilibrium: The extravert naturally facilitates external stakeholder communication while the introvert anchors deep focused analysis."
    );
    conflictHotspots.push(
      "Pacing Discrepancy: Extravert seeks real-time verbalized discussion; introvert requires solitary contemplation before responding."
    );
    communicationDos.push(
      "Provide agendas in advance so the introvert can reflect; schedule dedicated verbal breakout sessions for the extravert."
    );
    communicationDonts.push(
      "Do not pressure the introvert for instant on-the-spot decisions during crowded meetings."
    );
  } else {
    collaborationStrengths.push(
      normA[0] === "I"
        ? "Serene Focused Environment: Both thrive in quiet, deep-work settings with minimal conversational interruption."
        : "Vibrant Collective Momentum: Both generate energetic, expressive synergy and rapid verbal ideation."
    );
  }

  // Information Dimension (S vs N)
  if (normA[1] !== normB[1]) {
    collaborationStrengths.push(
      "Vision & Execution Synthesis: The Intuitive (N) charts high-level strategic horizons while the Sensing (S) guarantees operational precision and concrete feasibility."
    );
    conflictHotspots.push(
      "Abstract vs Factual Friction: Intuitive may perceive Sensing as overly bogged down in details; Sensing may perceive Intuitive as impractical or speculative."
    );
    communicationDos.push(
      "Anchor visionary ideas to tangible empirical examples and real-world milestones."
    );
    communicationDonts.push(
      "Do not dismiss operational constraints as boring trivia or creative visions as unrealistic daydreams."
    );
  } else {
    collaborationStrengths.push(
      normA[1] === "N"
        ? "Conceptual Velocity: Both immediately grasp systemic abstractions, patterns, and future trajectories."
        : "Empirical Grounding: Both value verified facts, reliable data, and concrete step-by-step procedures."
    );
  }

  // Decision Dimension (T vs F)
  if (normA[2] !== normB[2]) {
    collaborationStrengths.push(
      "Holistic Decision-Making: The Thinker (T) provides detached objective logic while the Feeler (F) safeguards stakeholder empathy, values, and team harmony."
    );
    conflictHotspots.push(
      "Critique Delivery Friction: Feeler may interpret analytical critique as personal condemnation; Thinker may interpret relational concern as irrational bias."
    );
    communicationDos.push(
      "Begin critiques with genuine positive recognition before delivering objective analytical assessments."
    );
    communicationDonts.push(
      "Do not use brutal, unvarnished bluntness; acknowledge human impact as a legitimate strategic factor."
    );
  }

  // Lifestyle Dimension (J vs P)
  if (normA[3] !== normB[3]) {
    collaborationStrengths.push(
      "Structured Agility: The Judging (J) type enforces deadlines, milestones, and closure; the Perceiving (P) type preserves opportunistic flexibility and emergent creativity."
    );
    conflictHotspots.push(
      "Closure vs Exploration Tension: J seeks early decisions and fixed milestones; P prefers keeping options open until the final hour."
    );
    communicationDos.push(
      "Agree on fixed 'Hard Deadlines' for deliverables while preserving 'Flexible Exploration Windows' for ideation."
    );
    communicationDonts.push(
      "Do not spring last-minute structural pivots on a J without notice, and do not micromanage a P's intermediate workflow."
    );
  }

  const summary = `A ${tier.toLowerCase().replace(/_/g, " ")} dynamic between ${normA} and ${normB}. Calculated cognitive resonance index of ${baseScore}%.`;

  return {
    typeA: normA,
    typeB: normB,
    synergyScore: Math.min(100, Math.max(50, baseScore)),
    synergyTier: tier,
    summary,
    collaborationStrengths,
    conflictHotspots,
    communicationDos,
    communicationDonts,
  };
}
