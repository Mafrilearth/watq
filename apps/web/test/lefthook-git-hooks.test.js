import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const ROOT_DIR = path.resolve(process.cwd(), "../..");
const LEFTHOOK_YML_PATH = path.join(ROOT_DIR, "lefthook.yml");
const PACKAGE_JSON_PATH = path.join(ROOT_DIR, "package.json");
const VERIFY_SCRIPT_PATH = path.join(ROOT_DIR, "scripts", "verify-commit-msg.js");

test("Lefthook Architecture: Configuration Integrity and File Existence", () => {
  assert.ok(fs.existsSync(LEFTHOOK_YML_PATH), "lefthook.yml must exist at monorepo root");
  const rawYml = fs.readFileSync(LEFTHOOK_YML_PATH, "utf-8");

  assert.match(rawYml, /colors:\s*true/, "Lefthook must enable colorful terminal output");
  assert.match(rawYml, /output:/, "Lefthook must declare output verbosity configuration");
  assert.match(rawYml, /- meta/, "Lefthook output must include meta header");
  assert.match(rawYml, /- summary/, "Lefthook output must include execution summary");
});

test("Lefthook Pre-Commit Invariants: Biome Auto-Staging Execution", () => {
  const rawYml = fs.readFileSync(LEFTHOOK_YML_PATH, "utf-8");

  assert.match(rawYml, /pre-commit:/, "Must declare pre-commit hook");
  assert.match(rawYml, /parallel:\s*true/, "Pre-commit hook must enable parallel execution");
  assert.match(rawYml, /biome-check:/, "Must define biome-check command");
  assert.match(rawYml, /pnpm biome check --write/, "Pre-commit must run biome check with write");
  assert.match(
    rawYml,
    /stage_fixed:\s*true/,
    "Pre-commit must enable stage_fixed to auto-stage formatting",
  );
  assert.match(rawYml, /\{staged_files\}/, "Pre-commit must operate on staged files template");
});

test("Lefthook Commit-Msg Policy: Conventional Commits Invariants", () => {
  const rawYml = fs.readFileSync(LEFTHOOK_YML_PATH, "utf-8");

  assert.match(rawYml, /commit-msg:/, "Must declare commit-msg hook");
  assert.match(
    rawYml,
    /scripts\/verify-commit-msg\.js/,
    "Commit-msg must execute verification script",
  );

  assert.ok(fs.existsSync(VERIFY_SCRIPT_PATH), "verify-commit-msg.js must exist");
  const scriptContent = fs.readFileSync(VERIFY_SCRIPT_PATH, "utf-8");

  // Verify conventional regex invariants
  const conventionalRegex =
    /^(feat|fix|docs|style|refactor|perf|test|chore|ci|build|revert)(\([a-zA-Z0-9_\-\/.]+\))?: .+/;

  // Positive validation cases
  assert.ok(conventionalRegex.test("feat: add psychological profiling engine"));
  assert.ok(conventionalRegex.test("fix(web): prevent hydration error on dark mode"));
  assert.ok(conventionalRegex.test("chore(deps): update lefthook to v2.2.2"));
  assert.ok(conventionalRegex.test("docs(readme): update master testing count"));
  assert.ok(conventionalRegex.test("refactor(core): optimize Jungian median scoring"));

  // Negative validation cases (must reject)
  assert.equal(conventionalRegex.test("added some features"), false);
  assert.equal(conventionalRegex.test("WIP"), false);
  assert.equal(conventionalRegex.test("Fix bug"), false);
  assert.equal(conventionalRegex.test("feat no colon"), false);
});

test("Lefthook Pre-Push Parallel Verification: Test and Typecheck Suite", () => {
  const rawYml = fs.readFileSync(LEFTHOOK_YML_PATH, "utf-8");

  assert.match(rawYml, /pre-push:/, "Must declare pre-push hook");
  assert.match(rawYml, /parallel:\s*true/, "Pre-push hook must enable parallel execution");
  assert.match(rawYml, /pnpm test/, "Pre-push must execute comprehensive test suite");
  assert.match(rawYml, /pnpm typecheck/, "Pre-push must execute strict Turbo typecheck");
});

test("Lefthook Monorepo Ecosystem: Package Scripts and Dependency Invariants", () => {
  assert.ok(fs.existsSync(PACKAGE_JSON_PATH), "Root package.json must exist");
  const rawPkg = fs.readFileSync(PACKAGE_JSON_PATH, "utf-8");
  const pkg = JSON.parse(rawPkg);

  assert.ok(pkg.devDependencies.lefthook, "lefthook must be installed in devDependencies");
  assert.equal(
    pkg.scripts.prepare,
    "lefthook install",
    "prepare script must install lefthook hooks",
  );
});
