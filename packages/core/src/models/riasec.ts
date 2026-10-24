import type { LikertValue, QuestionItem, RIASECDimension, RIASECResult, RIASECScores } from "../types";
import { calculateResponseValidity } from "./validity";

/**
 * 30-Item Holland Codes (RIASEC) Vocational Interest Inventory
 * 6 Themes x 5 Items each
 * Standard: John L. Holland (1959/1997) Vocational Guidance Theory
 */
export const RIASEC_QUESTIONS: QuestionItem[] = [
  // --- Realistic (R): Hands-on, practical, mechanical, tools ---
  {
    id: "RIA-R1",
    dimension: "R",
    isReversed: false,
    prompt: "I enjoy assembling, repairing, or troubleshooting mechanical devices and hardware systems.",
    target: "Realistic: Mechanical aptitude",
    modelType: "riasec",
  },
  {
    id: "RIA-R2",
    dimension: "R",
    isReversed: false,
    prompt: "I prefer working outdoors or in tangible environments rather than sitting at a desk all day.",
    target: "Realistic: Physical environment",
    modelType: "riasec",
  },
  {
    id: "RIA-R3",
    dimension: "R",
    isReversed: false,
    prompt: "I like operating equipment, electronic tools, or crafting physical objects with my hands.",
    target: "Realistic: Technical craftsmanship",
    modelType: "riasec",
  },
  {
    id: "RIA-R4",
    dimension: "R",
    isReversed: false,
    prompt: "I value practical, tangible outcomes over theoretical or abstract debates.",
    target: "Realistic: Practical pragmatism",
    modelType: "riasec",
  },
  {
    id: "RIA-R5",
    dimension: "R",
    isReversed: true,
    prompt: "I dislike manual physical labor or handling machinery and electronic hardware.",
    target: "Low Realistic: Preference away from mechanical tasks",
    modelType: "riasec",
  },

  // --- Investigative (I): Analytical, intellectual, scientific, research ---
  {
    id: "RIA-I1",
    dimension: "I",
    isReversed: false,
    prompt: "I love exploring scientific questions, analyzing complex data, and solving logic puzzles.",
    target: "Investigative: Scientific inquiry",
    modelType: "riasec",
  },
  {
    id: "RIA-I2",
    dimension: "I",
    isReversed: false,
    prompt: "I enjoy conducting deep independent research to uncover root causes of problems.",
    target: "Investigative: Independent research",
    modelType: "riasec",
  },
  {
    id: "RIA-I3",
    dimension: "I",
    isReversed: false,
    prompt: "I am fascinated by abstract mathematics, coding algorithms, or biological systems.",
    target: "Investigative: Mathematical & algorithmic thinking",
    modelType: "riasec",
  },
  {
    id: "RIA-I4",
    dimension: "I",
    isReversed: false,
    prompt: "I prefer developing hypotheses and testing theories methodically over executing routine tasks.",
    target: "Investigative: Hypothesis testing",
    modelType: "riasec",
  },
  {
    id: "RIA-I5",
    dimension: "I",
    isReversed: true,
    prompt: "I find rigorous mathematical proofs and long research studies dry and tedious.",
    target: "Low Investigative: Preference away from research",
    modelType: "riasec",
  },

  // --- Artistic (A): Creative, intuitive, aesthetic, expressive ---
  {
    id: "RIA-A1",
    dimension: "A",
    isReversed: false,
    prompt: "I enjoy expressing ideas through visual design, writing, music, or creative arts.",
    target: "Artistic: Creative expression",
    modelType: "riasec",
  },
  {
    id: "RIA-A2",
    dimension: "A",
    isReversed: false,
    prompt: "I appreciate original, aesthetically rich environments and dislike rigid uniformity.",
    target: "Artistic: Aesthetic sensitivity",
    modelType: "riasec",
  },
  {
    id: "RIA-A3",
    dimension: "A",
    isReversed: false,
    prompt: "I thrive when given freedom to innovate and invent without conforming to set rules.",
    target: "Artistic: Unconventional innovation",
    modelType: "riasec",
  },
  {
    id: "RIA-A4",
    dimension: "A",
    isReversed: false,
    prompt: "I love storytelling, creative conceptualization, and evocative communication.",
    target: "Artistic: Conceptual storytelling",
    modelType: "riasec",
  },
  {
    id: "RIA-A5",
    dimension: "A",
    isReversed: true,
    prompt: "I prefer working strictly with structured corporate rules over creative ambiguity.",
    target: "Low Artistic: Preference for strict structure",
    modelType: "riasec",
  },

  // --- Social (S): Helping, teaching, advising, counseling ---
  {
    id: "RIA-S1",
    dimension: "S",
    isReversed: false,
    prompt: "I feel fulfilled when teaching, mentoring, or empowering others to grow.",
    target: "Social: Mentorship and instruction",
    modelType: "riasec",
  },
  {
    id: "RIA-S2",
    dimension: "S",
    isReversed: false,
    prompt: "I naturally empathize with personal challenges and enjoy counseling individuals.",
    target: "Social: Empathetic counseling",
    modelType: "riasec",
  },
  {
    id: "RIA-S3",
    dimension: "S",
    isReversed: false,
    prompt: "I prefer collaborative team missions focused on community impact and public welfare.",
    target: "Social: Human welfare & community",
    modelType: "riasec",
  },
  {
    id: "RIA-S4",
    dimension: "S",
    isReversed: false,
    prompt: "I excel at listening patiently and facilitating positive interpersonal relationships.",
    target: "Social: Facilitation and mediation",
    modelType: "riasec",
  },
  {
    id: "RIA-S5",
    dimension: "S",
    isReversed: true,
    prompt: "I prefer working in isolation with data and machines rather than helping people.",
    target: "Low Social: Preference away from interpersonal service",
    modelType: "riasec",
  },

  // --- Enterprising (E): Persuasion, leadership, business, venture ---
  {
    id: "RIA-E1",
    dimension: "E",
    isReversed: false,
    prompt: "I enjoy pitching ideas, persuading stakeholders, and closing high-impact deals.",
    target: "Enterprising: Persuasion and sales",
    modelType: "riasec",
  },
  {
    id: "RIA-E2",
    dimension: "E",
    isReversed: false,
    prompt: "I aspire to launch ventures, lead organizations, and take calculated business risks.",
    target: "Enterprising: Entrepreneurship & leadership",
    modelType: "riasec",
  },
  {
    id: "RIA-E3",
    dimension: "E",
    isReversed: false,
    prompt: "I thrive in competitive environments with measurable targets and public prestige.",
    target: "Enterprising: Ambition & competition",
    modelType: "riasec",
  },
  {
    id: "RIA-E4",
    dimension: "E",
    isReversed: false,
    prompt: "I am confident in mobilizing teams and delivering speeches or presentations.",
    target: "Enterprising: Public mobilization",
    modelType: "riasec",
  },
  {
    id: "RIA-E5",
    dimension: "E",
    isReversed: true,
    prompt: "I feel very uncomfortable selling products or negotiating financial agreements.",
    target: "Low Enterprising: Aversion to commercial pitching",
    modelType: "riasec",
  },

  // --- Conventional (C): Organizing, data management, systems, detail ---
  {
    id: "RIA-C1",
    dimension: "C",
    isReversed: false,
    prompt: "I enjoy creating tidy spreadsheets, organizing databases, and maintaining accurate records.",
    target: "Conventional: Data management & accuracy",
    modelType: "riasec",
  },
  {
    id: "RIA-C2",
    dimension: "C",
    isReversed: false,
    prompt: "I like working in well-structured environments with clear procedures and protocols.",
    target: "Conventional: Procedural compliance",
    modelType: "riasec",
  },
  {
    id: "RIA-C3",
    dimension: "C",
    isReversed: false,
    prompt: "I take pride in auditing numbers, catching typographical errors, and verifying details.",
    target: "Conventional: Precision auditing",
    modelType: "riasec",
  },
  {
    id: "RIA-C4",
    dimension: "C",
    isReversed: false,
    prompt: "I prefer predictable task routines and systematic filing systems.",
    target: "Conventional: Systematic filing",
    modelType: "riasec",
  },
  {
    id: "RIA-C5",
    dimension: "C",
    isReversed: true,
    prompt: "I find tracking receipts, filling out forms, and maintaining records deeply frustrating.",
    target: "Low Conventional: Aversion to clerical routines",
    modelType: "riasec",
  },
];

interface RIASECTraitMeta {
  name: string;
  focus: string;
  majors: string[];
  careers: string[];
}

export const RIASEC_METAS: Record<RIASECDimension, RIASECTraitMeta> = {
  R: {
    name: "Realistic (The Doer)",
    focus: "Concrete, mechanical, physical tasks, and hardware engineering.",
    majors: [
      "Mechanical Engineering (ISCED 0714)",
      "Robotics & Automation (ISCED 0713)",
      "Agricultural Technology (ISCED 0811)",
      "Civil Engineering (ISCED 0732)",
    ],
    careers: [
      "Hardware Systems Engineer (ISCO-08 2151)",
      "Robotics Systems Technician (ISCO-08 3115)",
      "Architectural Project Surveyor (ISCO-08 2165)",
      "Mechatronics Operations Lead (ISCO-08 2144)",
    ],
  },
  I: {
    name: "Investigative (The Thinker)",
    focus: "Scientific research, mathematical modeling, and algorithmic problem-solving.",
    majors: [
      "Computer Science & Informatics (ISCED 0612)",
      "Data Science & AI Engineering (ISCED 0613)",
      "Applied Mathematics & Cryptography (ISCED 0541)",
      "Biomedical Sciences (ISCED 0511)",
    ],
    careers: [
      "Software Systems Architect (ISCO-08 2511)",
      "AI & Machine Learning Scientist (ISCO-08 2512)",
      "Data Scientist & Biostatistician (ISCO-08 2120)",
      "Cybersecurity Cryptanalyst (ISCO-08 2529)",
    ],
  },
  A: {
    name: "Artistic (The Creator)",
    focus: "Creative self-expression, UI/UX aesthetics, and innovative conceptual design.",
    majors: [
      "Digital Design & Media Arts (ISCED 0211)",
      "Interaction & UX/UI Architecture (ISCED 0212)",
      "Creative Writing & Screenplay (ISCED 0232)",
      "Architecture & Spatial Design (ISCED 0731)",
    ],
    careers: [
      "Principal Product Designer / UX Lead (ISCO-08 2166)",
      "Creative Director & Visual Strategist (ISCO-08 1222)",
      "Game Design & Multimedia Artist (ISCO-08 2166)",
      "Editorial Author & Narrative Architect (ISCO-08 2641)",
    ],
  },
  S: {
    name: "Social (The Helper)",
    focus: "Human empowerment, teaching, psychological counseling, and community development.",
    majors: [
      "Clinical & Educational Psychology (ISCED 0313)",
      "Humanities & Educational Pedagogy (ISCED 0111)",
      "Public Health & Medical Science (ISCED 0912)",
      "International Relations & Social Policy (ISCED 0314)",
    ],
    careers: [
      "Organizational Psychologist (ISCO-08 2634)",
      "University Lecturer & Academic Lead (ISCO-08 2310)",
      "Public Healthcare Director (ISCO-08 1342)",
      "Executive Career Counselor (ISCO-08 2423)",
    ],
  },
  E: {
    name: "Enterprising (The Persuader)",
    focus: "Leadership, business ventures, strategic sales, and organizational management.",
    majors: [
      "Business Administration & Management (ISCED 0413)",
      "Venture Capital & Finance (ISCED 0412)",
      "Strategic Marketing & Public Relations (ISCED 0414)",
      "Corporate Law & Negotiation (ISCED 0421)",
    ],
    careers: [
      "Chief Executive / Technology Founder (ISCO-08 1120)",
      "Strategic Management Consultant (ISCO-08 2421)",
      "Venture Capital Investment Partner (ISCO-08 2412)",
      "Global Commercial Director (ISCO-08 1221)",
    ],
  },
  C: {
    name: "Conventional (The Organizer)",
    focus: "Financial auditing, systematic databases, compliance, and procedural rigor.",
    majors: [
      "Accounting & Corporate Finance (ISCED 0411)",
      "Information Systems & Database Auditing (ISCED 0611)",
      "Compliance & Regulatory Law (ISCED 0421)",
      "Supply Chain & Operations Logistics (ISCED 0413)",
    ],
    careers: [
      "Certified Forensic Accountant / CFO (ISCO-08 2411)",
      "Database Administrator & Security Auditor (ISCO-08 2521)",
      "Financial Risk Analyst (ISCO-08 2413)",
      "Chief Compliance & Governance Officer (ISCO-08 1219)",
    ],
  },
};

/**
 * Calculates RIASEC Holland Code & Vocational Trajectory
 */
export function calculateRIASECScores(responses: Record<string, LikertValue>): RIASECResult {
  const sums: Record<RIASECDimension, number> = {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  };

  for (const item of RIASEC_QUESTIONS) {
    const rawVal = responses[item.id] ?? 3;
    const score = item.isReversed ? 6 - rawVal : rawVal;
    sums[item.dimension as RIASECDimension] += score;
  }

  // Linear percentage: 5 items, min 5, max 25 => (sum - 5) / 20 * 100%
  const scores: RIASECScores = {
    R: Math.round(((sums.R - 5) / 20) * 100),
    I: Math.round(((sums.I - 5) / 20) * 100),
    A: Math.round(((sums.A - 5) / 20) * 100),
    S: Math.round(((sums.S - 5) / 20) * 100),
    E: Math.round(((sums.E - 5) / 20) * 100),
    C: Math.round(((sums.C - 5) / 20) * 100),
  };

  const sorted = (["R", "I", "A", "S", "E", "C"] as RIASECDimension[]).sort(
    (a, b) => sums[b] - sums[a]
  );

  const top3 = sorted.slice(0, 3);
  const hollandCode = top3.join("");
  const primaryDim = top3[0];
  const primaryMeta = RIASEC_METAS[primaryDim];

  // Aggregate recommended majors and careers from top 2 themes
  const recommendedMajors = [
    ...RIASEC_METAS[top3[0]].majors.slice(0, 3),
    ...RIASEC_METAS[top3[1]].majors.slice(0, 2),
  ];

  const recommendedCareers = [
    ...RIASEC_METAS[top3[0]].careers.slice(0, 3),
    ...RIASEC_METAS[top3[1]].careers.slice(0, 2),
  ];

  const validityIndex = calculateResponseValidity(responses, RIASEC_QUESTIONS);

  return {
    modelType: "riasec",
    hollandCode,
    primaryTheme: `${primaryMeta.name} — Top Drivers: ${top3.map((d) => RIASEC_METAS[d].name.split(" ")[0]).join(" • ")}`,
    scores,
    recommendedMajors,
    recommendedCareers,
    environmentFit: `Thrives in environments requiring ${primaryMeta.focus.toLowerCase()} and collaborative synergy with ${RIASEC_METAS[top3[1]].name}.`,
    validityIndex,
  };
}
