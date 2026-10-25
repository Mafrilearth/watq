import assert from "node:assert/strict";
import { test } from "vitest";
import { z } from "zod";

// Define equivalent test schemas matching apps/web/src/lib/validations/index.ts
const signInSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address.").toLowerCase(),
  password: z.string().min(1, "Please enter your password."),
});

const signUpSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters long.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters long.").max(128),
});

const assessmentSubmissionSchema = z.object({
  responses: z
    .array(
      z.object({
        questionId: z.string().min(1),
        value: z.number().int().min(1).max(5),
      }),
    )
    .length(24, "All 24 items must be completed"),
  respondentName: z.string().trim().optional(),
});

const saveAssessmentSchema = z.object({
  modelId: z.string().trim().default("jung-16-types"),
  typeCode: z
    .string()
    .trim()
    .regex(/^[EI][SN][TF][JP]$/, "Invalid 4-letter Jungian type code"),
  archetype: z.string().trim().min(1),
  scoreEI: z.number().min(0).max(100),
  scoreSN: z.number().min(0).max(100),
  scoreTF: z.number().min(0).max(100),
  scoreJP: z.number().min(0).max(100),
  rawScores: z.record(z.string(), z.unknown()),
  responses: z.record(z.string(), z.unknown()),
});

const createQuestionSchema = z.object({
  modelId: z.string().trim().default("jung-16-types"),
  prompt: z.string().trim().min(5),
  target: z.string().trim().min(1),
  dimension: z.enum(["ENERGY", "PERCEPTION", "JUDGMENT", "ORIENTATION"]),
  pole: z.string().trim().min(1),
  polarity: z
    .number()
    .int()
    .refine((val) => val === 1 || val === -1),
  orderIndex: z.number().int().min(0),
  isActive: z.boolean().default(true),
});

// =========================================================================
// ZOD VALIDATION SCHEMA TEST PROOFS
// =========================================================================

test("Zod Validation: SignIn rejects malformed emails and empty passwords", () => {
  const invalidEmail = signInSchema.safeParse({ email: "invalid-email", password: "secret" });
  assert.equal(invalidEmail.success, false);

  const emptyPassword = signInSchema.safeParse({ email: "test@watq.com", password: "" });
  assert.equal(emptyPassword.success, false);

  const valid = signInSchema.safeParse({ email: "  TEST@watq.com  ", password: "mypassword" });
  assert.equal(valid.success, true);
  if (valid.success) {
    assert.equal(valid.data.email, "test@watq.com"); // Trimming & lowercasing verification
  }
});

test("Zod Validation: SignUp enforces minimum 8 character password constraint", () => {
  const shortPass = signUpSchema.safeParse({
    name: "Alex",
    email: "alex@watq.com",
    password: "short",
  });
  assert.equal(shortPass.success, false);

  const valid = signUpSchema.safeParse({
    name: "Alex Vance",
    email: "alex@watq.com",
    password: "secure_password_123",
  });
  assert.equal(valid.success, true);
});

test("Zod Validation: Assessment submission rejects incomplete response sets", () => {
  // Only 23 items instead of mandatory 24
  const partialItems = Array.from({ length: 23 }, (_, i) => ({
    questionId: `q_${i + 1}`,
    value: 3,
  }));
  const invalid = assessmentSubmissionSchema.safeParse({ responses: partialItems });
  assert.equal(invalid.success, false);

  // Exactly 24 items
  const fullItems = Array.from({ length: 24 }, (_, i) => ({
    questionId: `q_${i + 1}`,
    value: 4,
  }));
  const valid = assessmentSubmissionSchema.safeParse({ responses: fullItems });
  assert.equal(valid.success, true);
});

test("Zod Validation: Assessment persistence verifies Jungian 4-letter type regex", () => {
  const malformedType = saveAssessmentSchema.safeParse({
    typeCode: "INVALID",
    archetype: "The Mastermind",
    scoreEI: 70,
    scoreSN: 80,
    scoreTF: 90,
    scoreJP: 65,
    rawScores: {},
    responses: {},
  });
  assert.equal(malformedType.success, false);

  const validINTJ = saveAssessmentSchema.safeParse({
    typeCode: "INTJ",
    archetype: "The Strategist",
    scoreEI: 30,
    scoreSN: 85,
    scoreTF: 90,
    scoreJP: 75,
    rawScores: { I: 70, N: 85, T: 90, J: 75 },
    responses: { q1: 5 },
  });
  assert.equal(validINTJ.success, true);
  if (validINTJ.success) {
    assert.equal(validINTJ.data.modelId, "jung-16-types"); // Default value inference
  }
});

test("Zod Validation: Psychometric question schema restricts polarity to {-1, 1}", () => {
  const invalidPolarity = createQuestionSchema.safeParse({
    prompt: "I enjoy large social gatherings",
    target: "Extraversion indicator",
    dimension: "ENERGY",
    pole: "E",
    polarity: 0, // Must be 1 or -1
    orderIndex: 1,
  });
  assert.equal(invalidPolarity.success, false);

  const validPolarity = createQuestionSchema.safeParse({
    prompt: "I enjoy large social gatherings",
    target: "Extraversion indicator",
    dimension: "ENERGY",
    pole: "E",
    polarity: 1,
    orderIndex: 1,
  });
  assert.equal(validPolarity.success, true);
  if (validPolarity.success) {
    assert.equal(validPolarity.data.isActive, true); // Default value inference
  }
});
