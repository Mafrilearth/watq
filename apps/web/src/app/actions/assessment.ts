"use server";

import { z } from "zod";
import { actionClient } from "@/lib/action";
import { calculateJungianScores, type LikertValue } from "@watq/core";

const assessmentSubmissionSchema = z.object({
  responses: z
    .array(
      z.object({
        questionId: z.string().min(1),
        value: z.number().int().min(1).max(5),
      })
    )
    .length(24, "All 24 items must be completed"),
  respondentName: z.string().optional(),
});

export const submitAssessmentAction = actionClient
  .schema(assessmentSubmissionSchema)
  .action(async ({ parsedInput }) => {
    const { responses, respondentName } = parsedInput;

    const responseRecord: Record<string, LikertValue> = {};
    for (const item of responses) {
      responseRecord[item.questionId] = item.value as LikertValue;
    }

    // Deterministic Jungian calculation via @watq/core
    const result = calculateJungianScores(responseRecord);

    return {
      success: true,
      typeCode: result.typeCode,
      archetypeTitle: result.archetypeTitle,
      scores: result.scores,
      summary: result.summary,
      temperament: result.temperament,
      cognitiveStack: result.cognitiveStack,
      leadFunction: result.leadFunction,
      majors: result.majors,
      careers: result.careers,
      respondentName: respondentName || "Cognitive Explorer",
      computedAt: new Date().toISOString(),
    };
  });
