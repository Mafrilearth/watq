"use server";

import { db } from "@watq/database";

export interface NeonDbTelemetry {
  status: "ONLINE" | "OFFLINE";
  provider: "Neon Serverless PostgreSQL";
  region: "aws-ap-southeast-1 (Singapore)";
  projectId: string;
  usersCount: number;
  adminsCount: number;
  questionsCount: number;
  assessmentsCount: number;
  modelsCount: number;
  latencyMs: number;
  timestamp: string;
}

export async function getNeonDbTelemetryAction(): Promise<{
  success: boolean;
  telemetry?: NeonDbTelemetry;
  error?: string;
}> {
  const start = Date.now();
  try {
    const [usersCount, adminsCount, questionsCount, assessmentsCount, modelsCount] =
      await Promise.all([
        db.user.count(),
        db.user.count({ where: { role: "ADMIN" } }),
        db.question.count(),
        db.assessmentResult.count(),
        db.psychometricModel.count(),
      ]);

    const latencyMs = Date.now() - start;

    return {
      success: true,
      telemetry: {
        status: "ONLINE",
        provider: "Neon Serverless PostgreSQL",
        region: "aws-ap-southeast-1 (Singapore)",
        projectId: "twilight-sea-22748528",
        usersCount,
        adminsCount,
        questionsCount,
        assessmentsCount,
        modelsCount,
        latencyMs,
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Neon DB telemetry check failed";
    console.error("[NeonTelemetry] error:", message);
    return {
      success: false,
      error: message,
    };
  }
}
