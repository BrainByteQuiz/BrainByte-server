import deleteQuiz from "../../repositories/quiz/delete";
import type { Request, Response } from "express";
import { errorResponse } from "../common";
import { z } from "zod";

const deleteSchema = z.object({
    id: z.string().uuid(),
    creatorId: z.string().uuid(),
});

const deleteQuizController = async (req: Request, res: Response) => {
    const validated = await deleteSchema.safeParseAsync(req.params);
    if (!validated.success) {
        return res.status(400).send(errorResponse(validated.error.message));
    }

    const result = await deleteQuiz(validated.data);
    if (result.isErr) {
        return res.status(404).send(errorResponse(result.error.message));
    }

    return res.status(200).send({
        status: "success",
        data: result.unwrap(),
        message: "",
    });
};

export default deleteQuizController;
