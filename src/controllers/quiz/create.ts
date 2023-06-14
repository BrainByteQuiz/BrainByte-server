import create from "../../repositories/quiz/create";
import type { Request, Response } from "express";
import { errorResponse } from "../common";

const createQuizControl = async (req: Request, res: Response) => {
    if (!req.params["name"] || !req.params["creatorId"]) {
        return res.status(400).send(errorResponse("Required fields are missing"));
    }

    const result = await create({
        name: req.params['name'],
        description: req.params['description'],
        creatorId: req.params['creatorId'],
        questions: req.params['questions'],
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

export default createQuizControl;
