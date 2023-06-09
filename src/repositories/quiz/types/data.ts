import type { Question } from "@prisma/client";

export type QuizCreateData = {
    name: string;
    description: string | undefined;
    creatorId: string;
    public: boolean;
    picturePath: string | undefined;
};

export type QuizDeleteData = {
    id: string;
    creatorId: string;
};

export type QuizReadData = {
    id: string;
    creatorId: string | undefined;
};

export type QuizReadUserData = {
    creatorId: string;
    //order: Prisma.SortOrder;
};

export type QuizUpdateData = {
    id: string;
    creatorId: string;
    name: string | undefined;
    description: string | undefined;
    public: Boolean | undefined;
    picturePath: String | undefined;
};