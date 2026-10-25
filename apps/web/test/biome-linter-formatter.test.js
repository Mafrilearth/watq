import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "vitest";

const ROOT_DIR = path.resolve(process.cwd(), "../..");
const BIOME_CONFIG_PATH = path.join(ROOT_DIR, "biome.json");
const PACKAGE_JSON_PATH = path.join(ROOT_DIR, "package.json");
const CI_WORKFLOW_PATH = path.join(ROOT_DIR, ".github", "workflows", "ci.yml");

test("Biome Architecture: Configuration and Schema Invariants", () => {
  assert.ok(fs.existsSync(BIOME_CONFIG_PATH), "biome.json must exist in monorepo root");
  const rawConfig = fs.readFileSync(BIOME_CONFIG_PATH, "utf-8");
  const config = JSON.parse(rawConfig);

  assert.ok(config.$schema, "$schema must be defined");
  assert.match(config.$schema, /biomejs\.dev\/schemas\/1\.9\.\d+\/schema\.json/);

  // Formatter Invariants
  assert.equal(config.formatter.enabled, true, "Formatter must be enabled");
  assert.equal(config.formatter.indentStyle, "space", "Indent style must be space");
  assert.equal(config.formatter.indentWidth, 2, "Indent width must be 2");
  assert.equal(config.formatter.lineWidth, 100, "Line width must be 100");
  assert.equal(config.formatter.bracketSpacing, true, "Bracket spacing must be true");

  // Organize Imports Invariant
  assert.equal(config.organizeImports.enabled, true, "Organize imports must be enabled");
});

test("Biome VCS Integration: Git Repository Awareness", () => {
  const rawConfig = fs.readFileSync(BIOME_CONFIG_PATH, "utf-8");
  const config = JSON.parse(rawConfig);

  assert.ok(config.vcs, "VCS integration object must be present");
  assert.equal(config.vcs.enabled, true, "VCS integration must be enabled");
  assert.equal(config.vcs.clientKind, "git", "VCS client must be git");
  assert.equal(config.vcs.useIgnoreFile, true, "VCS ignore file (.gitignore) must be respected");
  assert.equal(
    config.vcs.defaultBranch,
    "main",
    "Default branch must target main for --changed diffs",
  );
});

test("Biome Multi-Language Support: JavaScript, JSON, and CSS Formatters", () => {
  const rawConfig = fs.readFileSync(BIOME_CONFIG_PATH, "utf-8");
  const config = JSON.parse(rawConfig);

  // JavaScript/JSX Rules
  assert.ok(config.javascript, "javascript configuration must be present");
  assert.equal(config.javascript.formatter.quoteStyle, "double");
  assert.equal(config.javascript.formatter.semicolons, "always");

  // JSON Rules
  assert.ok(config.json, "json configuration must be present");
  assert.equal(config.json.formatter.enabled, true);
  assert.equal(config.json.parser.allowComments, true);

  // CSS Rules
  assert.ok(config.css, "css configuration must be present");
  assert.equal(config.css.formatter.enabled, true);
  assert.equal(config.css.linter.enabled, true);
});

test("Biome Monorepo Scripts: Root Package.json Automation", () => {
  assert.ok(fs.existsSync(PACKAGE_JSON_PATH), "Root package.json must exist");
  const rawPkg = fs.readFileSync(PACKAGE_JSON_PATH, "utf-8");
  const pkg = JSON.parse(rawPkg);

  assert.ok(pkg.scripts.lint, "lint script must be defined");
  assert.ok(pkg.scripts["lint:fix"], "lint:fix script must be defined");
  assert.ok(pkg.scripts.format, "format script must be defined");
  assert.ok(pkg.scripts["ci:check"], "ci:check script must be defined");

  assert.match(pkg.scripts.lint, /biome check/);
  assert.match(pkg.scripts["lint:fix"], /biome check --write/);
  assert.match(pkg.scripts.format, /biome format --write/);
  assert.match(pkg.scripts["ci:check"], /biome ci/);
});

test("Biome CI/CD Hardening: GitHub Actions Verification", () => {
  assert.ok(fs.existsSync(CI_WORKFLOW_PATH), "ci.yml workflow must exist");
  const rawWorkflow = fs.readFileSync(CI_WORKFLOW_PATH, "utf-8");

  assert.match(
    rawWorkflow,
    /pnpm biome check \./,
    "GitHub Actions CI workflow must execute Biome check step",
  );
});
