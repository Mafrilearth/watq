import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsPagePath = path.resolve(__dirname, "../../docs/src/app/page.tsx");
const docsPkgJsonPath = path.resolve(__dirname, "../../docs/package.json");

test("Fumadocs Architecture: Modern UI components integration", () => {
  const content = fs.readFileSync(docsPagePath, "utf-8");

  // Verify core Fumadocs UI component imports
  assert.ok(
    content.includes('from "fumadocs-ui/components/callout"'),
    "Must import Callout from fumadocs-ui/components/callout",
  );
  assert.ok(
    content.includes('from "fumadocs-ui/components/card"'),
    "Must import Card & Cards from fumadocs-ui/components/card",
  );
  assert.ok(
    content.includes('from "fumadocs-ui/components/tabs"'),
    "Must import Tab & Tabs from fumadocs-ui/components/tabs",
  );
  assert.ok(
    content.includes('from "fumadocs-ui/components/steps"'),
    "Must import Step & Steps from fumadocs-ui/components/steps",
  );
  assert.ok(
    content.includes('from "fumadocs-ui/components/files"'),
    "Must import File, Files, Folder from fumadocs-ui/components/files",
  );
  assert.ok(
    content.includes('from "fumadocs-ui/components/type-table"'),
    "Must import TypeTable from fumadocs-ui/components/type-table",
  );
  assert.ok(
    content.includes('from "fumadocs-ui/components/accordion"'),
    "Must import Accordion & Accordions from fumadocs-ui/components/accordion",
  );
});

test("Fumadocs Content Structure: 4-Axis Bipolar Formula and Invariants", () => {
  const content = fs.readFileSync(docsPagePath, "utf-8");

  // Psychometric scoring formula documentation
  assert.ok(
    content.includes("S_dim = sum(item_response_i * polarity_i)"),
    "Must document S_dim formula",
  );
  assert.ok(
    content.includes("Pole_Primary_% = ((S_dim - 6) / 24) * 100%"),
    "Must document percentage formula",
  );
  assert.ok(content.includes("Carl Gustav Jung (1921)"), "Must credit Carl Gustav Jung (1921)");
  assert.ok(content.includes("Exact Median Rule (50.0%)"), "Must document 50.0% median rule");
});

test("Fumadocs Interactive Visualizer: Monorepo Files and Folder Tree", () => {
  const content = fs.readFileSync(docsPagePath, "utf-8");

  // Monorepo hierarchy visualized via Fumadocs Files tree
  assert.ok(content.includes("<Files>"), "Must use Fumadocs Files container");
  assert.ok(
    content.includes('<Folder name="apps" defaultOpen>'),
    "Must present apps folder in Files tree",
  );
  assert.ok(
    content.includes('<Folder name="packages" defaultOpen>'),
    "Must present packages folder in Files tree",
  );
});

test("Fumadocs TypeTable: Platform Security Specifications", () => {
  const content = fs.readFileSync(docsPagePath, "utf-8");

  // Security properties documented in Fumadocs TypeTable
  assert.ok(content.includes("<TypeTable"), "Must render Fumadocs TypeTable");
  assert.ok(
    content.includes("turnstileVerification:"),
    "Must document turnstileVerification in TypeTable",
  );
  assert.ok(content.includes("arcjetShield:"), "Must document arcjetShield in TypeTable");
  assert.ok(content.includes("scryptHashing:"), "Must document scryptHashing in TypeTable");
  assert.ok(content.includes("r2ZeroEgress:"), "Must document r2ZeroEgress in TypeTable");
});

test("Fumadocs Dependencies: Modern v16.17 package configuration", () => {
  const pkgJson = JSON.parse(fs.readFileSync(docsPkgJsonPath, "utf-8"));
  const deps = pkgJson.dependencies || {};

  assert.ok(deps["fumadocs-core"], "fumadocs-core must be installed in apps/docs");
  assert.ok(deps["fumadocs-ui"], "fumadocs-ui must be installed in apps/docs");
  assert.ok(pkgJson.name === "@watq/docs", "Target package name must match @watq/docs");
});
