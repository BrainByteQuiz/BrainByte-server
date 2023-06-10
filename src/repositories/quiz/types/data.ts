export type QuizCreateData = {
    data: {
        name: string;
        description: string | undefined;
        creatorId: string;
        public: boolean;
        picturePath: string | undefined;
    }
    questions: QuestionCreateData[]; 
};

export type QuestionCreateData = {
    quizId: string;
    data: {
        text: string;
        time: number;
        multipleChoice: boolean;
        image: string | null;
        codeSnippet: string | null;
        snippetLanguage: string | null;
    };
    answers: AnswerCreateData[];
};

export type AnswerCreateData = {
    questionId: string;
    text: string;
    isCorrect: boolean;
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
};

export type QuizUpdateData = {
    id: string;
    creatorId: string;
    data: {
        name: string | undefined;
        description: string | undefined;
    };
    questions: QuestionUpdateData[];
};

export type QuestionUpdateData = {
    id: string;
    quizId: string;
    data: {
        text: string | undefined;
        time: number | undefined;
        multipleChoice: boolean | undefined;
        image: string | null | undefined;
        codeSnippet: string | null | undefined;
        snippetLanguage: string | null | undefined;
    };
    answers: AnswerUpdateData[];
};

export type AnswerUpdateData = {
    id: string;
    questionId: string;
    data: {
        text: string | undefined;
        isCorrect: boolean | undefined;
    };
};
