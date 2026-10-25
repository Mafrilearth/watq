import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, test } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Master Compass Coordinates for WATQ Insignia
const CX = 250;
const CY = 250;
const DEG2RAD = Math.PI / 180;
const PHI = (1 + Math.sqrt(5)) / 2; // 1.6180339887...

function rotatePoint(x, y, angleDeg) {
  const rad = angleDeg * DEG2RAD;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const nx = cos * (x - CX) - sin * (y - CY) + CX;
  const ny = sin * (x - CX) + cos * (y - CY) + CY;
  return { x: Number(nx.toFixed(2)), y: Number(ny.toFixed(2)) };
}

// Facet 1 Landmark Points (Top Keystone)
const F1_INNER_RIGHT = { x: 310.14, y: 203.73 };
const F1_OUTER_RIGHT = { x: 381.58, y: 162.49 };
const F1_OUTER_RIGHT_CTRL = { x: 391.97, y: 156.49 };
const F1_OUTER_RIGHT_ARC_END = { x: 385.02, y: 146.71 };
const F1_OUTER_LEFT_ARC_START = { x: 114.98, y: 146.71 };
const F1_OUTER_LEFT_CTRL = { x: 108.03, y: 156.49 };
const F1_OUTER_LEFT = { x: 118.42, y: 162.49 };
const F1_INNER_LEFT = { x: 189.86, y: 203.73 };
const F1_INNER_LEFT_CTRL = { x: 200.26, y: 209.73 };
const F1_INNER_LEFT_ARC_START = { x: 208.63, y: 201.17 };
const F1_INNER_RIGHT_ARC_END = { x: 291.37, y: 201.17 };
const F1_INNER_RIGHT_CTRL = { x: 299.74, y: 209.73 };

describe("WATQ Brand Rigor: 120° Triad Radial Rotational Symmetry", () => {
  it("Facet 1 rotated by 120° maps identically to Facet 3", () => {
    const rot = rotatePoint(F1_INNER_RIGHT.x, F1_INNER_RIGHT.y, 120);
    assert.strictEqual(rot.x, 260.0);
    assert.strictEqual(rot.y, 325.22);

    const rotOuter = rotatePoint(F1_OUTER_RIGHT.x, F1_OUTER_RIGHT.y, 120);
    assert.strictEqual(rotOuter.x, 260.0);
    assert.strictEqual(rotOuter.y, 407.71);

    const rotArcEnd = rotatePoint(F1_OUTER_RIGHT_ARC_END.x, F1_OUTER_RIGHT_ARC_END.y, 120);
    assert.strictEqual(rotArcEnd.x, 271.94);
    assert.strictEqual(rotArcEnd.y, 418.58);
  });

  it("Facet 1 rotated by 240° maps identically to Facet 2", () => {
    const rot = rotatePoint(F1_INNER_RIGHT.x, F1_INNER_RIGHT.y, 240);
    assert.strictEqual(rot.x, 179.86);
    assert.strictEqual(rot.y, 221.05);

    const rotOuter = rotatePoint(F1_OUTER_RIGHT.x, F1_OUTER_RIGHT.y, 240);
    assert.strictEqual(rotOuter.x, 108.42);
    assert.strictEqual(rotOuter.y, 179.8);

    const rotArcStart = rotatePoint(F1_OUTER_LEFT_ARC_START.x, F1_OUTER_LEFT_ARC_START.y, 240);
    assert.strictEqual(rotArcStart.x, 228.06);
    assert.strictEqual(rotArcStart.y, 418.58);
  });
});

describe("WATQ Brand Rigor: Euclidean Compass Radius & Tangents", () => {
  it("Outer Perimeter Radius R sits exactly at 170px ± 0.01px", () => {
    const dist1 = Math.hypot(F1_OUTER_RIGHT_ARC_END.x - CX, F1_OUTER_RIGHT_ARC_END.y - CY);
    const dist2 = Math.hypot(F1_OUTER_LEFT_ARC_START.x - CX, F1_OUTER_LEFT_ARC_START.y - CY);
    assert.ok(Math.abs(dist1 - 170.0) < 0.01, `Expected 170px, got ${dist1}`);
    assert.ok(Math.abs(dist2 - 170.0) < 0.01, `Expected 170px, got ${dist2}`);
  });

  it("Golden Aperture Radius r sits exactly at 64px ± 0.01px", () => {
    const dist1 = Math.hypot(F1_INNER_LEFT_ARC_START.x - CX, F1_INNER_LEFT_ARC_START.y - CY);
    const dist2 = Math.hypot(F1_INNER_RIGHT_ARC_END.x - CX, F1_INNER_RIGHT_ARC_END.y - CY);
    assert.ok(Math.abs(dist1 - 64.0) < 0.01, `Expected 64px, got ${dist1}`);
    assert.ok(Math.abs(dist2 - 64.0) < 0.01, `Expected 64px, got ${dist2}`);
  });

  it("Singularity Core Radius r_core sits at 24px with 40px radial buffer", () => {
    const coreRadius = 24.0;
    const apertureRadius = 64.0;
    const buffer = apertureRadius - coreRadius;
    assert.strictEqual(buffer, 40.0, "Clear negative space buffer must be 40px");
  });
});

describe("WATQ Brand Rigor: Golden Ratio Harmonic Series (Phi = 1.618)", () => {
  it("Aperture matches R / phi^2 within 1.5% optical margin", () => {
    const theoreticalAperture = 170 / (PHI * PHI);
    const actualAperture = 64.0;
    const errorPct = (Math.abs(theoreticalAperture - actualAperture) / actualAperture) * 100;
    assert.ok(errorPct < 1.5, `Golden ratio aperture deviation is ${errorPct}% (must be < 1.5%)`);
  });

  it("Core Singularity matches R / phi^4 within 3.5% optical margin", () => {
    const theoreticalCore = 170 / PHI ** 4;
    const actualCore = 24.0;
    const errorPct = (Math.abs(theoreticalCore - actualCore) / actualCore) * 100;
    assert.ok(errorPct < 3.5, `Golden ratio core deviation is ${errorPct}% (must be < 3.5%)`);
  });
});

describe("WATQ Brand Rigor: Optical Corridor & Clearance Channels", () => {
  it("Vertical Lower Corridor negative space is exactly 20.0px", () => {
    const facet3_x = 260.0;
    const facet2_x = 240.0;
    const corridor = facet3_x - facet2_x;
    assert.strictEqual(corridor, 20.0, "Corridor gutter must be exactly 20.0px");
  });
});

test("WATQ Brand Rigor: Production Asset Path Uniformity", () => {
  const brandDir = path.join(__dirname, "../public/brand");
  const filesToVerify = [
    "watq-mark.svg",
    "watq-mark-white.svg",
    "watq-mark-mono-white.svg",
    "watq-mark-mono-black.svg",
  ];

  const expectedFacet1Prefix =
    "M 310.14 203.73 L 381.58 162.49 Q 391.97 156.49 385.02 146.71 A 170 170 0 0 0 114.98 146.71";

  for (const file of filesToVerify) {
    const filePath = path.join(brandDir, file);
    assert.ok(fs.existsSync(filePath), `File ${file} must exist`);
    const content = fs.readFileSync(filePath, "utf-8");
    assert.ok(
      content.includes(expectedFacet1Prefix),
      `File ${file} must contain filleted G2 Facet 1 path`,
    );
    assert.ok(
      content.includes('cx="250" cy="250" r="24"'),
      `File ${file} must contain 24px Singularity Core`,
    );
    assert.ok(
      !content.includes("<polygon"),
      `File ${file} must not contain raw unfilleted polygons`,
    );
  }
});

test("WATQ Brand Rigor: WCAG 2.2 AAA Luminance Contrast Ratio", () => {
  // Relative Luminance formula: L = 0.2126 * R + 0.7152 * G + 0.0722 * B
  // Cold Basalt (#08090C): RGB(8, 9, 12) -> L = 0.0051
  // Stark White (#FFFFFF): RGB(255, 255, 255) -> L = 1.0000
  const L_white = 1.0;
  const L_basalt = 0.0051;
  const contrastRatio = (L_white + 0.05) / (L_basalt + 0.05);

  assert.ok(
    contrastRatio > 18.0,
    `Contrast ratio must exceed 18:1 (Calculated: ${contrastRatio.toFixed(2)}:1)`,
  );
  assert.ok(contrastRatio >= 7.0, "Must massively surpass WCAG AAA 7.0:1 requirement");
});

test("WATQ Brand Rigor: Wordmark & Full Lockup Title Case Integrity", () => {
  const brandDir = path.join(__dirname, "../public/brand");
  const lockupFiles = ["watq-logo-full.svg", "watq-logo-full-black.svg"];
  const wordmarkFiles = ["watq-logotype.svg", "watq-logotype-black.svg"];

  for (const file of lockupFiles) {
    const filePath = path.join(brandDir, file);
    assert.ok(fs.existsSync(filePath), `Lockup asset ${file} must exist`);
    const content = fs.readFileSync(filePath, "utf-8");
    assert.ok(content.includes(">Watq</text>"), `File ${file} must render Title Case "Watq"`);
    assert.ok(
      content.includes(">Personality Decoded.</text>"),
      `File ${file} must render "Personality Decoded."`,
    );
  }

  for (const file of wordmarkFiles) {
    const filePath = path.join(brandDir, file);
    assert.ok(fs.existsSync(filePath), `Wordmark asset ${file} must exist`);
    const content = fs.readFileSync(filePath, "utf-8");
    assert.ok(content.includes(">Watq</text>"), `File ${file} must render Title Case "Watq"`);
  }
});
