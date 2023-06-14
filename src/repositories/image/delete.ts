import { Result } from "@badrap/result";
import client from "../client";
import { ImageDeleteData } from "./types/data"
import { ImageDeleteResult } from "./types/result"

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

      // TODO: Delete the actual image

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
