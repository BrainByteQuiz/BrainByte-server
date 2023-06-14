import { Result } from "@badrap/result";
import client from "../client";
import { ImageReadData } from "./types/data";
import { ImageReadResult } from "./types/result";

const read = async (data: ImageReadData): ImageReadResult => {
  try {
    return Result.ok(await client.$transaction(async (tx) => {
      const image = await tx.image.findUniqueOrThrow({
        where: {
          id: data.id,
        },
      });

      if (image.deletedAt !== null) {
        throw new Error("The image has been deleted");
      }

      return image;
    }));
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default read;
