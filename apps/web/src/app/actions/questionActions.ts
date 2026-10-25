"use server";

import { db, Dimension, type Question } from "@watq/database";
import { createQuestionSchema, formatZodError, updateQuestionSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { getEnterpriseSessionAction } from "./authActions";

export interface EnterpriseQuestionItem {
  id: number;
  modelId: string;
  prompt: string;
  target: string;
  dimension: "ENERGY" | "PERCEPTION" | "JUDGMENT" | "ORIENTATION";
  pole: string;
  polarity: number;
  orderIndex: number;
  isActive: boolean;
}

async function assertAdminRole() {
  const session = await getEnterpriseSessionAction();
  if (!session.user || session.user.role !== "ADMIN") {
    throw new Error("UNAUTHORIZED: Enterprise administrator privileges required.");
  }
  return session.user;
}

/**
 * Fetches questions from Neon PostgreSQL for a given psychometric model.
 */
export async function getEnterpriseQuestionsAction(modelId: string = "jung-16-types"): Promise<{
  success: boolean;
  questions?: EnterpriseQuestionItem[];
  error?: string;
}> {
  try {
    const questions = await db.question.findMany({
      where: { modelId },
      orderBy: { orderIndex: "asc" },
    });

    return {
      success: true,
      questions: questions.map((q: Question) => ({
        id: q.id,
        modelId: q.modelId,
        prompt: q.prompt,
        target: q.target,
        dimension: q.dimension as EnterpriseQuestionItem["dimension"],
        pole: q.pole,
        polarity: q.polarity,
        orderIndex: q.orderIndex,
        isActive: q.isActive,
      })),
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to load questions from database";
    console.error("[EnterpriseQuestions] getEnterpriseQuestions error:", message);
    return { success: false, error: message };
  }
}

/**
 * Creates a new question in Neon PostgreSQL.
 * Strict RBAC: Caller must be ADMIN.
 */
export async function createEnterpriseQuestionAction(data: {
  modelId: string;
  prompt: string;
  target: string;
  dimension: "ENERGY" | "PERCEPTION" | "JUDGMENT" | "ORIENTATION";
  pole: string;
  polarity: number;
  orderIndex?: number;
}): Promise<{ success: boolean; question?: EnterpriseQuestionItem; error?: string }> {
  try {
    await assertAdminRole();

    const parseResult = createQuestionSchema.safeParse(data);
    if (!parseResult.success) {
      return { success: false, error: formatZodError(parseResult.error) };
    }
    const validated = parseResult.data;

    const maxOrder = await db.question.aggregate({
      where: { modelId: validated.modelId },
      _max: { orderIndex: true },
    });
    const nextOrder = (maxOrder._max.orderIndex || 0) + 1;

    const created = await db.question.create({
      data: {
        modelId: validated.modelId,
        prompt: validated.prompt,
        target: validated.target,
        dimension: validated.dimension as Dimension,
        pole: validated.pole.toUpperCase(),
        polarity: validated.polarity,
        orderIndex: validated.orderIndex || nextOrder,
        isActive: validated.isActive,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/assess");

    return {
      success: true,
      question: {
        id: created.id,
        modelId: created.modelId,
        prompt: created.prompt,
        target: created.target,
        dimension: created.dimension as EnterpriseQuestionItem["dimension"],
        pole: created.pole,
        polarity: created.polarity,
        orderIndex: created.orderIndex,
        isActive: created.isActive,
      },
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to create question in database";
    console.error("[EnterpriseQuestions] createEnterpriseQuestion error:", message);
    return { success: false, error: message };
  }
}

/**
 * Updates an existing question in Neon PostgreSQL.
 * Strict RBAC: Caller must be ADMIN.
 */
export async function updateEnterpriseQuestionAction(
  id: number,
  data: Partial<{
    prompt: string;
    target: string;
    dimension: "ENERGY" | "PERCEPTION" | "JUDGMENT" | "ORIENTATION";
    pole: string;
    polarity: number;
    isActive: boolean;
  }>,
): Promise<{ success: boolean; error?: string }> {
  try {
    await assertAdminRole();

    const parseResult = updateQuestionSchema.safeParse({ id, ...data });
    if (!parseResult.success) {
      return { success: false, error: formatZodError(parseResult.error) };
    }
    const validated = parseResult.data;

    await db.question.update({
      where: { id: validated.id },
      data: {
        ...(validated.prompt !== undefined && { prompt: validated.prompt }),
        ...(validated.target !== undefined && { target: validated.target }),
        ...(validated.dimension !== undefined && { dimension: validated.dimension as Dimension }),
        ...(validated.pole !== undefined && { pole: validated.pole.toUpperCase() }),
        ...(validated.polarity !== undefined && { polarity: validated.polarity }),
        ...(validated.isActive !== undefined && { isActive: validated.isActive }),
      },
    });

    revalidatePath("/admin");
    revalidatePath("/assess");

    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update question in database";
    console.error("[EnterpriseQuestions] updateEnterpriseQuestion error:", message);
    return { success: false, error: message };
  }
}

/**
 * Deletes a question from Neon PostgreSQL.
 * Strict RBAC: Caller must be ADMIN.
 */
export async function deleteEnterpriseQuestionAction(
  id: number,
): Promise<{ success: boolean; error?: string }> {
  try {
    await assertAdminRole();

    await db.question.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/assess");

    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to delete question from database";
    console.error("[EnterpriseQuestions] deleteEnterpriseQuestion error:", message);
    return { success: false, error: message };
  }
}

/**
 * Loads psychometric questions dynamically from Neon PostgreSQL for runner execution.
 * Zero hardcoding. Pulls live items from the database.
 */
export async function getPublicAssessmentQuestionsAction(
  modelId: string = "jung-16-types",
): Promise<{
  success: boolean;
  questions?: Array<{
    id: string;
    prompt: string;
    target: string;
    dimension: string;
    pole: string;
    isReversed: boolean;
  }>;
  error?: string;
}> {
  try {
    const dbQuestions = await db.question.findMany({
      where: { modelId, isActive: true },
      orderBy: { orderIndex: "asc" },
    });

    if (dbQuestions.length === 0) {
      return { success: false, error: "No active questions found in database." };
    }

    return {
      success: true,
      questions: dbQuestions.map((q) => {
        let dimCode = "EI";
        if (q.dimension === "PERCEPTION") dimCode = "SN";
        else if (q.dimension === "JUDGMENT") dimCode = "TF";
        else if (q.dimension === "ORIENTATION") dimCode = "JP";

        return {
          id: `${dimCode}-${String(q.orderIndex).padStart(2, "0")}`,
          prompt: q.prompt,
          target: q.target,
          dimension: dimCode,
          pole: q.pole,
          isReversed: q.polarity === -1,
        };
      }),
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to load questions from database";
    return { success: false, error: message };
  }
}
