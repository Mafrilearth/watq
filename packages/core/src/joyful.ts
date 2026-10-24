const ADJECTIVES = [
  "Strategic",
  "Intuitive",
  "Analytic",
  "Visionary",
  "Pragmatic",
  "Resilient",
  "Calibrated",
  "Empathetic",
  "Harmonic",
  "Dynamic",
  "Architectural",
  "Synthesizing",
  "Vigilant",
  "Deterministic",
  "Systemic",
];

const ARCHETYPE_ANIMALS = [
  "Falcon",
  "Lynx",
  "Owl",
  "Phoenix",
  "Eagle",
  "Panther",
  "Fox",
  "Wolf",
  "Raven",
  "Dolphin",
  "Hawk",
  "Stag",
  "Crane",
  "Cheetah",
  "Otter",
];

export function generateJoyfulCallsign(seed?: number): string {
  const rand1 =
    seed !== undefined
      ? Math.abs(seed) % ADJECTIVES.length
      : Math.floor(Math.random() * ADJECTIVES.length);
  const rand2 =
    seed !== undefined
      ? Math.abs(seed * 7) % ARCHETYPE_ANIMALS.length
      : Math.floor(Math.random() * ARCHETYPE_ANIMALS.length);
  const num =
    seed !== undefined
      ? (Math.abs(seed * 13) % 90) + 10
      : Math.floor(Math.random() * 90 + 10);

  return `${ADJECTIVES[rand1]}-${ARCHETYPE_ANIMALS[rand2]}-${num}`;
}
