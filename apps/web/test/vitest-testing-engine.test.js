import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test, vi } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "../../..");
const WEB_PKG_PATH = path.resolve(__dirname, "../package.json");
const VITEST_CONFIG_PATH = path.resolve(__dirname, "../vitest.config.mts");

describe("Vitest Testing Engine Architecture: Invariants & Runtime Proofs", () => {
  test("1. Vitest Configuration: File existence and v8 coverage engine", () => {
    assert.ok(
      fs.existsSync(VITEST_CONFIG_PATH),
      "vitest.config.mts must exist in apps/web directory",
    );
    const content = fs.readFileSync(VITEST_CONFIG_PATH, "utf-8");

    assert.ok(
      content.includes('provider: "v8"'),
      "Vitest must configure native V8 code coverage provider",
    );
    assert.ok(
      content.includes('reporter: ["text", "json", "html"]'),
      "Vitest must output text, json, and html coverage reports",
    );
  });

  test("2. Vitest Configuration: Node environment, globals, and path alias", () => {
    const content = fs.readFileSync(VITEST_CONFIG_PATH, "utf-8");

    assert.ok(
      content.includes('environment: "node"'),
      "Vitest must configure node runtime environment",
    );
    assert.ok(
      content.includes("globals: true"),
      "Vitest must enable globals for ergonomic test suites",
    );
    assert.ok(content.includes("alias: {"), "Vitest must define module resolution path alias");
    assert.ok(
      content.includes("import.meta.dirname"),
      "Vitest must use modern ESM import.meta.dirname",
    );
  });

  test("3. Vitest Package Manifest: Modern dependencies installed", () => {
    const pkg = JSON.parse(fs.readFileSync(WEB_PKG_PATH, "utf-8"));
    const devDeps = pkg.devDependencies || {};

    assert.ok(devDeps.vitest, "vitest must be installed in devDependencies");
    assert.ok(
      devDeps["@vitest/coverage-v8"],
      "@vitest/coverage-v8 must be installed in devDependencies",
    );
    assert.ok(devDeps["@vitest/ui"], "@vitest/ui must be installed in devDependencies");
  });

  test("4. Vitest Scripts: Package test script lifecycle definitions", () => {
    const pkg = JSON.parse(fs.readFileSync(WEB_PKG_PATH, "utf-8"));
    const scripts = pkg.scripts || {};

    assert.ok(scripts.test, "package.json must define test script");
    assert.ok(scripts.test.includes("vitest run"), "test script must execute vitest run");
  });

  test("5. Vitest Mock Engine: vi.fn function invocation and parameter tracking", () => {
    const mockCallback = vi.fn((x) => x * 2);

    const result1 = mockCallback(5);
    const result2 = mockCallback(10);

    expect(result1).toBe(10);
    expect(result2).toBe(20);
    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenNthCalledWith(1, 5);
    expect(mockCallback).toHaveBeenNthCalledWith(2, 10);
  });

  test("6. Vitest Spy Engine: vi.spyOn object method monitoring and restoration", () => {
    const calculator = {
      computeDiagnosticScore: (raw) => raw * 1.5,
    };

    const spy = vi.spyOn(calculator, "computeDiagnosticScore");
    const output = calculator.computeDiagnosticScore(20);

    expect(output).toBe(30);
    expect(spy).toHaveBeenCalledWith(20);

    spy.mockImplementation(() => 999);
    expect(calculator.computeDiagnosticScore(20)).toBe(999);

    spy.mockRestore();
    expect(calculator.computeDiagnosticScore(20)).toBe(30);
  });

  test("7. Vitest Timers: vi.useFakeTimers and deterministic clock acceleration", () => {
    vi.useFakeTimers();

    let triggered = false;
    setTimeout(() => {
      triggered = true;
    }, 5000);

    expect(triggered).toBe(false);

    vi.advanceTimersByTime(5000);
    expect(triggered).toBe(true);

    vi.useRealTimers();
  });

  test("8. Vitest Async Engine: Promise resolution and rejection assertion flows", async () => {
    const asyncSuccess = async () => "WATQ_COGNITIVE_DECODED";
    const asyncFailure = async () => {
      throw new Error("COGNITIVE_CALIBRATION_OVERFLOW");
    };

    await expect(asyncSuccess()).resolves.toBe("WATQ_COGNITIVE_DECODED");
    await expect(asyncFailure()).rejects.toThrow("COGNITIVE_CALIBRATION_OVERFLOW");
  });

  test("9. Vitest Matchers: Deep equality and type assertion precision", () => {
    const cognitiveVector = {
      model: "jungian",
      axes: {
        EI: 68,
        SN: 42,
        TF: 85,
        JP: 71,
      },
      archetype: "Architect",
    };

    expect(cognitiveVector).toEqual({
      model: "jungian",
      axes: {
        EI: 68,
        SN: 42,
        TF: 85,
        JP: 71,
      },
      archetype: "Architect",
    });

    expect(cognitiveVector.axes.TF).toBeGreaterThanOrEqual(80);
    expect(cognitiveVector.archetype).toMatch(/^Arch/);
  });
});
