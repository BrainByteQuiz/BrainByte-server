import { Result } from "@badrap/result";
import type { Quiz, Question, User } from '@prisma/client';

export type QuizCreateResult = Promise<Result<Quiz>>;

export type QuizDeleteResult = Promise<Result<Quiz & {
    questions: Question[];
}>>;

export type QuizReadResult = Promise<Result<Quiz>>;

export type QuizReadUserResult = Promise<Result<User & {
    createdQuizzes: Quiz[];
}>>;

export type QuizUpdateResult = Promise<Result<Quiz>>;