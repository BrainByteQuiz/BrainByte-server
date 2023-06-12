import { Result } from "@badrap/result";
import type { Image } from '@prisma/client';

export type ImageCreateResult = Promise<Result<Image>>;
export type ImageReadResult = Promise<Result<Image>>;
export type ImageDeleteResult = Promise<Result<any>>;