"use server";

import { db, type Prisma } from "@watq/database";
import { revalidatePath } from "next/cache";
import { getEnterpriseSessionAction } from "./authActions";

export interface EnterpriseAssessmentResultItem {
  id: string;
  userId: string | null;
  modelId: string;
  typeCode: string;
  archetype: string;
  scoreEI: number;
  scoreSN: number;
  scoreTF: number;
  scoreJP: number;
  rawScores: Record<string, unknown>;
  responses: Record<string, unknown>;
  completedAt: string;
}

/**
 * Persists an assessment result into Neon PostgreSQL.
 * If user is authenticated, links to their PostgreSQL user account.
 */
export async function saveEnterpriseAssessmentAction(data: {
  modelId?: string;
  typeCode: string;
  archetype: string;
  scoreEI: number;
  scoreSN: number;
  scoreTF: number;
  scoreJP: number;
  rawScores: Record<string, unknown>;
  responses: Record<string, unknown>;
}): Promise<{
  success: boolean;
  resultId?: string;
  error?: string;
}> {
  try {
    const session = await getEnterpriseSessionAction();
    const userId = session.user?.id || null;

    const saved = await db.assessmentResult.create({
      data: {
        userId,
        modelId: data.modelId || "jung-16-types",
        typeCode: data.typeCode,
        archetype: data.archetype,
        scoreEI: data.scoreEI,
        scoreSN: data.scoreSN,
        scoreTF: data.scoreTF,
        scoreJP: data.scoreJP,
        rawScores: data.rawScores as Prisma.InputJsonValue,
        responses: data.responses as Prisma.InputJsonValue,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin");

    return {
      success: true,
      resultId: saved.id,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to persist assessment in database";
    console.error("[EnterpriseAssessment] save error:", message);
    return { success: false, error: message };
  }
}

/**
 * Fetches assessment history from Neon PostgreSQL.
 * If user is logged in, fetches their assessments.
 * If admin, can fetch all or specific.
 */
export async function getUserEnterpriseAssessmentsAction(): Promise<{
  success: boolean;
  assessments?: EnterpriseAssessmentResultItem[];
  error?: string;
}> {
  try {
    const session = await getEnterpriseSessionAction();
    const userId = session.user?.id;

    if (!userId) {
      return { success: true, assessments: [] };
    }

    const items = await db.assessmentResult.findMany({
      where: { userId },
      orderBy: { completedAt: "desc" },
    });

    return {
      success: true,
      assessments: items.map((r) => ({
        id: r.id,
        userId: r.userId,
        modelId: r.modelId,
        typeCode: r.typeCode,
        archetype: r.archetype,
        scoreEI: r.scoreEI,
        scoreSN: r.scoreSN,
        scoreTF: r.scoreTF,
        scoreJP: r.scoreJP,
        rawScores: (r.rawScores as Record<string, unknown>) || {},
        responses: (r.responses as Record<string, unknown>) || {},
        completedAt: r.completedAt.toISOString(),
      })),
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load assessments from database";
    console.error("[EnterpriseAssessment] getUserAssessments error:", message);
    return { success: false, error: message };
  }
}

/**
 * Deletes an assessment result record from Neon PostgreSQL.
 */
export async function deleteEnterpriseAssessmentAction(
  resultId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await getEnterpriseSessionAction();
    if (!session.user) {
      return { success: false, error: "Authentication required" };
    }

    // Admins can delete any, members can only delete their own
    const existing = await db.assessmentResult.findUnique({
      where: { id: resultId },
    });

    if (!existing) {
      return { success: false, error: "Record not found" };
    }

    if (session.user.role !== "ADMIN" && existing.userId !== session.user.id) {
      return { success: false, error: "Unauthorized to delete this record" };
    }

    await db.assessmentResult.delete({
      where: { id: resultId },
    });

    revalidatePath("/dashboard");

    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete assessment from database";
    console.error("[EnterpriseAssessment] delete error:", message);
    return { success: false, error: message };
  }
}
