export type QuizCreateData = {
    name: string;
    description?: string | undefined;
    creatorId: string;
    questions?: string | undefined;
    image?: string | undefined;
};

export type QuizDeleteData = {
    id: string;
    creatorId: string;
};

export type QuizReadData = {
    id: string;
    creatorId: string;
};

export type QuizReadUserData = {
    creatorId: string;
};

export type QuizUpdateData = {
    id: string;
    creatorId: string;
    data: {
        name?: string | undefined;
        description?: string | undefined;
        questions?: string | undefined;
    };
};
