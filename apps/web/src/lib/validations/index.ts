import { z } from "zod";

/**
 * Universal error formatter for Zod validation errors.
 * Returns a human-friendly error string suitable for UI toasts and server responses.
 */
export function formatZodError(error: z.ZodError): string {
  const firstIssue = error.issues[0];
  if (firstIssue) {
    return firstIssue.message;
  }
  return "Invalid request payload.";
}

// ============================================================================
// AUTHENTICATION SCHEMAS
// ============================================================================

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email("Please enter a valid email address.")
    .toLowerCase(),
  password: z
    .string({ required_error: "Password is required." })
    .min(1, "Please enter your password."),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .trim()
    .min(2, "Name must be at least 2 characters long.")
    .max(100, "Name cannot exceed 100 characters."),
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email("Please enter a valid email address.")
    .toLowerCase(),
  password: z
    .string({ required_error: "Password is required." })
    .min(8, "Password must be at least 8 characters long.")
    .max(128, "Password cannot exceed 128 characters."),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

// ============================================================================
// ASSESSMENT SCHEMAS
// ============================================================================

export const assessmentResponseItemSchema = z.object({
  questionId: z.string().min(1, "Question ID is required"),
  value: z.number().int().min(1).max(5),
});

export const assessmentSubmissionSchema = z.object({
  responses: z.array(assessmentResponseItemSchema).length(24, "All 24 items must be completed"),
  respondentName: z.string().trim().optional(),
});

export type AssessmentSubmissionInput = z.infer<typeof assessmentSubmissionSchema>;

export const saveAssessmentSchema = z.object({
  modelId: z.string().trim().default("jung-16-types"),
  typeCode: z
    .string()
    .trim()
    .regex(/^[EI][SN][TF][JP]$/, "Invalid 4-letter Jungian type code (e.g. INTJ)"),
  archetype: z.string().trim().min(1, "Archetype is required"),
  scoreEI: z.number().min(0).max(100),
  scoreSN: z.number().min(0).max(100),
  scoreTF: z.number().min(0).max(100),
  scoreJP: z.number().min(0).max(100),
  rawScores: z.record(z.string(), z.unknown()),
  responses: z.record(z.string(), z.unknown()),
});

export type SaveAssessmentInput = z.infer<typeof saveAssessmentSchema>;

// ============================================================================
// ENTERPRISE USER MANAGEMENT SCHEMAS
// ============================================================================

export const updateUserRoleSchema = z.object({
  targetUserId: z.string().min(1, "Target user ID is required."),
  newRole: z.enum(["ADMIN", "MEMBER"], {
    errorMap: () => ({ message: "Role must be either ADMIN or MEMBER." }),
  }),
});

export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;

export const createEnterpriseUserSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .trim()
    .min(2, "Name must be at least 2 characters."),
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email("Please provide a valid email address.")
    .toLowerCase(),
  role: z.enum(["ADMIN", "MEMBER"]).default("MEMBER"),
});

export type CreateEnterpriseUserInput = z.infer<typeof createEnterpriseUserSchema>;

// ============================================================================
// QUESTION & TAXONOMY SCHEMAS
// ============================================================================

export const createQuestionSchema = z.object({
  modelId: z.string().trim().default("jung-16-types"),
  prompt: z
    .string({ required_error: "Prompt is required." })
    .trim()
    .min(5, "Prompt must be at least 5 characters long."),
  target: z.string().trim().min(1, "Target description is required."),
  dimension: z.enum(["ENERGY", "PERCEPTION", "JUDGMENT", "ORIENTATION"], {
    errorMap: () => ({
      message: "Dimension must be ENERGY, PERCEPTION, JUDGMENT, or ORIENTATION.",
    }),
  }),
  pole: z.string().trim().min(1, "Pole is required."),
  polarity: z
    .number()
    .int()
    .refine((val) => val === 1 || val === -1, {
      message: "Polarity must be 1 (positive) or -1 (reverse-scored).",
    }),
  orderIndex: z.number().int().min(0, "Order index must be non-negative."),
  isActive: z.boolean().default(true),
});

export type CreateQuestionInput = z.infer<typeof createQuestionSchema>;

export const updateQuestionSchema = z.object({
  id: z.number().int().positive("Question ID must be a positive integer."),
  prompt: z.string().trim().min(5).optional(),
  target: z.string().trim().min(1).optional(),
  dimension: z.enum(["ENERGY", "PERCEPTION", "JUDGMENT", "ORIENTATION"]).optional(),
  pole: z.string().trim().min(1).optional(),
  polarity: z
    .number()
    .int()
    .refine((val) => val === 1 || val === -1, {
      message: "Polarity must be 1 or -1.",
    })
    .optional(),
  orderIndex: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>;
