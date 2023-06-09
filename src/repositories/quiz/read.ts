import { Result } from "@badrap/result";
import { QuizReadData, QuizReadUserData } from "./types/data";
import { QuizReadResult, QuizReadUserResult } from "./types/result";
import client from "../client";

const specific = async (data: QuizReadData): QuizReadResult => {
  try {
    return Result.ok(
      await client.$transaction(async (tx) => {
        const quiz = await tx.quiz.findUniqueOrThrow({
          where: {
            id: data.id,
          },
        });

        if (!quiz.public && quiz.creatorId !== data.creatorId) {
          throw new Error("The user is not the owner of this private quiz");
        }

        return quiz;
      })
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

const allOfUser = async (data: QuizReadUserData): QuizReadUserResult => {
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
