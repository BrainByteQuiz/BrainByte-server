import { Result } from "@badrap/result";
import client from '../client';
import type { QuizCreateData } from "./types/data";
import type { GenericQuestionResult, QuizCreateResult } from "./types/result";
import { Answer } from "@prisma/client";

const create = async (data: QuizCreateData): QuizCreateResult => {
  try {
    return Result.ok(
      await client.$transaction(async (tx) => {
        const quiz = await tx.quiz.create({
          data: {
            ...data.data,
          },
        });

        const questions: GenericQuestionResult[] = [];
        for (let q = 0; q < data.questions.length; ++q) {
          const question = data.questions[q];
          const questionData = await tx.question.create({
            data: {
              ...question.data,
              quizId: question.quizId,
            },
          });

          const answers: Answer[] = [];
          for (let a = 0; a < question.answers.length; ++a) {
            const answer = question.answers[a];
            const answerData = await tx.answer.create({
              data: {
                ...answer,
              },
            });

            answers.push(answerData);
          }

          questions.push({
            ...questionData,
            answers,
          });
        }

        return {
          ...quiz,
          questions,
        };
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};
