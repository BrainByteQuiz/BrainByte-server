import { Result } from "@badrap/result"
import { QuizDeleteData } from "./types/data"
import { QuizDeleteResult } from "./types/result"
import client from "../client"


const deleteQuiz = async (data: QuizDeleteData): QuizDeleteResult => {
  try {
    return Result.ok(
      await client.$transaction(async (tx) => {
        const quiz = await tx.quiz.findUniqueOrThrow({
          where: {
            id: data.id,
          },
        });

        if (quiz.creatorId !== data.creatorId) {
          throw new Error("The user is not the author of this quiz");
        }

        if (quiz.deletedAt !== null) {
          throw new Error("The quiz has already been deleted");
        }

        const deletedAt = new Date();

        const updated = await tx.quiz.update({
          where: {
            id: data.id,
          },
          data: {
            deletedAt,
            questions: {
              updateMany: {
                where: {
                  deletedAt: null,
                },
                data: {
                  deletedAt,
                },
              },
            },
          },
          include: {
            questions: {
              where: {
                deletedAt,
              },
              orderBy: {
                index: 'asc',
              },
            },
          },
        });

        return updated;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
}
