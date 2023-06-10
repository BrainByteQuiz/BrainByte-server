import { Result } from "@badrap/result";
import { QuizUpdateData } from "./types/data";
import { QuizUpdateResult } from "./types/result";
import client from "../client";

const update = async (data: QuizUpdateData): QuizUpdateResult => {
  try {
    return Result.ok(await client.$transaction(async (tx) => {
        const quiz = await tx.quiz.findUniqueOrThrow({
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
          data: {
            name: data.name,
            description: data.description,
            public: data.public,
            picturePath: data.picturePath,
          }
        });

        return result;
      })
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};