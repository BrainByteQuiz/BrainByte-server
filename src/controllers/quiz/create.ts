import create from "../../repositories/quiz/create";
import type { Request, Response } from "express";
import { errorResponse } from "../common";
import { z } from "zod";

const quizSchema = z.object({
    name: z.string().min(2).max(128),
    description: z.string().min(0).max(1024).optional(),
    creatorId: z.string().uuid(),
    questions: z.string().optional(),
    image: z.string().optional(),
});

const createQuizController = async (req: Request, res: Response) => {
    const image =
        "https://api.dicebear.com/6.x/fun-emoji/svg?seed=" + req.body.name;
    const validated = await quizSchema.safeParseAsync({ ...req.body, image });
    if (!validated.success) {
        return res.status(400).send(errorResponse(validated.error.message));
    }

    const result = await create(validated.data);
    if (result.isErr) {
        return res.status(404).send(errorResponse(result.error.message));
    }

    return res.status(200).send({
        status: "success",
        data: result.unwrap(),
        message: "",
    });
};

export default createQuizController;
