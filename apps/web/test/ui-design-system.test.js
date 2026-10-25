const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const webGlobalsCssPath = path.resolve(__dirname, "../src/app/globals.css");
const appGlobalsCssPath = path.resolve(__dirname, "../../app/src/app/globals.css");
const webPkgJsonPath = path.resolve(__dirname, "../package.json");

test("Tailwind CSS v4: @theme and @utility tokens in globals.css", () => {
  const webGlobalsCss = fs.readFileSync(webGlobalsCssPath, "utf-8");

  // Verify Tailwind v4 @theme variables
  assert.ok(webGlobalsCss.includes("@theme"), "globals.css must use Tailwind v4 @theme directive");
  assert.ok(
    webGlobalsCss.includes("--container-assessment: 680px;"),
    "Must specify 680px focused container token",
  );
  assert.ok(
    webGlobalsCss.includes("--ease-psychomotor: cubic-bezier(0.16, 1, 0.3, 1);"),
    "Must specify 120ms psychomotor easing",
  );

  // Verify Tailwind v4 @utility directives
  assert.ok(
    webGlobalsCss.includes("@utility focus-container"),
    "Must define @utility focus-container",
  );
  assert.ok(
    webGlobalsCss.includes("@utility psychomotor-btn"),
    "Must define @utility psychomotor-btn",
  );
  assert.ok(webGlobalsCss.includes("@utility glass-panel"), "Must define @utility glass-panel");
});

test("Personality Decoded: Cognitive Polarity Axis Color Tokens", () => {
  const webGlobalsCss = fs.readFileSync(webGlobalsCssPath, "utf-8");

  // 4 Polarity axes for personality decoding
  assert.ok(
    webGlobalsCss.includes("--color-axis-energy: var(--axis-energy);"),
    "Energy axis color token must exist",
  );
  assert.ok(
    webGlobalsCss.includes("--color-axis-info: var(--axis-info);"),
    "Information axis color token must exist",
  );
  assert.ok(
    webGlobalsCss.includes("--color-axis-decision: var(--axis-decision);"),
    "Decision axis color token must exist",
  );
  assert.ok(
    webGlobalsCss.includes("--color-axis-lifestyle: var(--axis-lifestyle);"),
    "Lifestyle axis color token must exist",
  );
});

test("Radix UI: Accessibility primitives installed and configured", () => {
  const pkgJson = JSON.parse(fs.readFileSync(webPkgJsonPath, "utf-8"));
  const deps = pkgJson.dependencies || {};

  assert.ok(deps["@radix-ui/react-dialog"], "Radix Dialog must be present for accessible modals");
  assert.ok(
    deps["@radix-ui/react-tabs"],
    "Radix Tabs must be present for cognitive tab navigation",
  );
  assert.ok(deps["@radix-ui/react-tooltip"], "Radix Tooltip must be present for tooltips");
  assert.ok(
    deps["@radix-ui/react-progress"],
    "Radix Progress must be present for assessment tracking",
  );
  assert.ok(deps["@radix-ui/react-slot"], "Radix Slot must be present for polymorphic composition");
});

test("Lucide React: Iconography package dependency and tree-shaking", () => {
  const pkgJson = JSON.parse(fs.readFileSync(webPkgJsonPath, "utf-8"));
  assert.ok(pkgJson.dependencies["lucide-react"], "Lucide React must be installed");
});

test("Monorepo Harmony: Workspace app tokens synchronization", () => {
  const appGlobalsCss = fs.readFileSync(appGlobalsCssPath, "utf-8");

  assert.ok(
    appGlobalsCss.includes("@theme"),
    "apps/app must also use Tailwind v4 @theme directive",
  );
  assert.ok(
    appGlobalsCss.includes("--container-assessment: 680px;"),
    "apps/app must have identical 680px token",
  );
  assert.ok(
    appGlobalsCss.includes("@utility focus-container"),
    "apps/app must define @utility focus-container",
  );
  assert.ok(
    appGlobalsCss.includes("@utility psychomotor-btn"),
    "apps/app must define @utility psychomotor-btn",
  );
});
