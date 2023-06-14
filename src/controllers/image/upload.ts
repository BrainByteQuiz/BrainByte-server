import type { Request, Response } from "express";
import fs from "fs";
import create from "../../repositories/image/create";
import { ApiResponse } from "../types";
import { Result } from "@badrap/result";
import { Image } from "@prisma/client";

const uploadImageController = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }

  const file = req.file;

  const destinationDirectory = "uploads/";
  const fileName = `${Date.now()}-${file.originalname}`;
  const filePath = destinationDirectory + fileName;

  const imageURL = `http://localhost:3000/uploads/${fileName}`;

  fs.rename(file.path, filePath, error => {
    if (error) {
      return res.status(500).json({ error: "Failed to save the file" });
    }
  });

  const result = await create({ url: imageURL });

  const response: ApiResponse<Image> = {
    data: result.unwrap(),
    status: "success",
    message: "Image uploaded successfully"
  };

  return res.status(200).send(response);
};

export default uploadImageController;
