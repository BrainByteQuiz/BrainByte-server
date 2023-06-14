import { Result } from "@badrap/result";
import { QuizReadData, QuizReadUserData } from "./types/data";
import { QuizReadResult, QuizReadUserResult } from "./types/result";
import client from "../client";

export const specific = async (data: QuizReadData): QuizReadResult => {
  try {
    return Result.ok(
      await client.$transaction(async (tx) => {
        const quiz = await tx.quiz.findUniqueOrThrow({
          where: {
            id: data.id,
          },
        });

        if (quiz.creatorId !== data.creatorId) {
          throw new Error("The user is not the owner of this quiz");
        }

        return quiz;
      })
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export const allOfUser = async (data: QuizReadUserData): QuizReadUserResult => {
  try {
    return Result.ok(
      await client.user.findUniqueOrThrow({
        where: {
          id: data.creatorId,
        },
        include: {
          createdQuizzes: true,
        },
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

