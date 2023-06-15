import { Result } from "@badrap/result";
import { ImageCreateData } from "./types/data";
import { ImageCreateResult } from "./types/result";
import client from "../client";

const create = async (data: ImageCreateData): ImageCreateResult => {
  try {
    return Result.ok(await client.$transaction(async (tx) => {
      const URI = data.url;

      const image = await tx.image.create({
        data: {
          URI,
        },
      });
      return image;
    }));
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default create;
