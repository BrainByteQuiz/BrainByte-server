import { Result } from "@badrap/result";
import type { Quiz, Question, User, Answer } from '@prisma/client';

export type GenericQuestionResult = Question & {
    answers: Answer[],
};

export type GenericQuizResult = Quiz & {
    questions: GenericQuestionResult[],
};


export type QuizCreateResult = Promise<Result<GenericQuizResult>>;

export type QuizDeleteResult = Promise<Result<GenericQuizResult>>;

export type QuizReadResult = Promise<Result<GenericQuizResult>>;

export type QuizReadUserResult = Promise<Result<User & {
    createdQuizzes: GenericQuizResult[];
}>>;

export type QuizUpdateResult = Promise<Result<GenericQuizResult>>;