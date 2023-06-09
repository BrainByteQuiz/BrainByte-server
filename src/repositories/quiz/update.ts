import { Result } from "@badrap/result";
import { QuizUpdateData } from "./types/data";
import { QuizUpdateResult } from "./types/result";
import client from "../client";

const update = async (data: QuizUpdateData): QuizUpdateResult => {
  try {
    return await client.$transaction(async (tx) => {
      const quiz = tx.quiz.findUniqueOrThrow({
        where: {
          id: data.id,
        },
      });

      if (quiz.creatorId !== data.creatorId) {
        throw new Error("The user is not the author of this quiz");
      }

      const result = await tx.quiz.update({
        where: {
          id: data.id,
        },
        ...data,
      });

      return result;
    });
  } catch (e) {
    return Result.err(e as Error);
  }
};