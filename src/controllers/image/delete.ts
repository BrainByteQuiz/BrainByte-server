import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { ApiResponse } from "../types";
import deleteImage from "../../repositories/image/delete";

const deleteImageController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteImage({ id });
    if (result.isOk) 
    {
      return res.json({
        data: result,
        status: "success",
        message: "Image deleted successfully"
      });
    }
    throw result.error;    
  } catch (error) {
    const response: ApiResponse<{}> = {
      status: "failure",
      data: {},
      error: (error as Error).message
    };
    return res.status(404).send(response);
  }
};

export default deleteImageController;
