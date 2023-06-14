import { specific, allOfUser } from "../../repositories/quiz/read";
import type { Request, Response } from "express";
import { errorResponse } from "../common";
import { z } from "zod";

const readSingleSchema = z.object({
    id: z.string().uuid(),
    creatorId: z.string().uuid(),
});

const readAllSchema = z.object({
    creatorId: z.string().uuid(),
});

const readQuizControl = async (req: Request, res: Response) => {
    let result;
    if (!req.params["id"] && req.params["creatorId"]) {
        const validated = await readAllSchema.safeParseAsync(req.params);
        if (!validated.success) {
            return res.status(400).send(errorResponse(validated.error.message));
        }
        
        result = await allOfUser(validated.data);
    } else if (req.params["id"] && req.params["creatorId"]) {
        const validated = await readSingleSchema.safeParseAsync(req.params);
        if (!validated.success) {
            return res.status(400).send(errorResponse(validated.error.message));
        }

        result = await specific(validated.data);
    } else {
        return res.status(400).send(errorResponse("Required fields are missing"));
    }

    if (result.isErr) {
        return res.status(404).send(errorResponse(result.error.message));
    }

    return res.status(200).send({
        status: "success",
        data: result.unwrap(),
        message: "",
    });
};

export default readQuizControl;
