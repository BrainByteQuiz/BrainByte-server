import { Result } from "@badrap/result";
import client from "../client";
import { ImageDeleteData } from "./types/data"
import { ImageDeleteResult } from "./types/result"
import fs from "fs";

const deleteImage = async (data: ImageDeleteData): ImageDeleteResult => {
  try {
    return Result.ok(await client.$transaction(async (tx) => {
      const image = await tx.image.findUniqueOrThrow({
        where: {
          id: data.id,
        },
      });

      if (image.deletedAt !== null) {
        throw new Error("The image has already been deleted");
      }

      const filePath = image.URI.replace("http://localhost:3000/uploads", "uploads");

      if (fs.existsSync(filePath)) {

        fs.unlink(filePath, error => {
          if (error) {
            throw new Error("Failed to delete file");
          }
        });
      } else {
        throw new Error("File not found");
      }

      const deletedAt = new Date();
      const updated = await tx.image.update({
        where: {
          id: data.id,
        },
        data: {
          deletedAt,
        },
      });

      return updated;
    }));
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default deleteImage;
