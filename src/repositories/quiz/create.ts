import { Result } from "@badrap/result";
import client from '../client';
import type { QuizCreateData } from "./types/data";
import type { QuizCreateResult } from "./types/result";

const create = async (data: QuizCreateData): QuizCreateResult => {
  try {
    return Result.ok(
      await client.quiz.create({
        ...data,
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};
