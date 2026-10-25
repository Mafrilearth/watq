"use server";

import { actionClient } from "@/lib/action";
import { assessmentSubmissionSchema } from "@/lib/validations";
import { type LikertValue, calculateJungianScores } from "@watq/core";

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
