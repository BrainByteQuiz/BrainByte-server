import { Result } from "@badrap/result";
import type { Quiz, Question, User } from '@prisma/client';

type GenericQuizResult = Promise<Result<Quiz>>;

export type QuizCreateResult = GenericQuizResult;
export type QuizDeleteResult = GenericQuizResult;
export type QuizUpdateResult = GenericQuizResult;
export type QuizReadResult = GenericQuizResult;

export type QuizReadUserResult = Promise<Result<User & {
    createdQuizzes: Quiz[];
}>>;