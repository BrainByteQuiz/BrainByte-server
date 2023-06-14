import update from "../../repositories/quiz/update"
import type { Request, Response } from "express";
import { errorResponse } from "../common";
import { z } from "zod";

const updateSchema = z.object({
    id: z.string().uuid(),
    creatorId: z.string().uuid(),
    name: z.string().min(2).max(128).optional(),
    description: z.string().min(0).max(1024).optional(),
    questions: z.string().optional(),
});

const updateQuizController = async (req: Request, res: Response) => {
    const validated = await updateSchema.safeParseAsync(req.body);
    if (!validated.success) {
        return res.status(400).send(errorResponse(validated.error.message));
    }

    const result = await update({
        id: validated.data.id,
        creatorId: validated.data.creatorId,
        data: {
            name: validated.data.name,
            description: validated.data.description,
            questions: validated.data.questions,
        },
    });
    if (result.isErr) {
        return res.status(404).send(errorResponse(result.error.message));
    }

    return res.status(200).send({
        status: "success",
        data: result.unwrap(),
        message: "",
    });
};

export default updateQuizController;
