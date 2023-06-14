import { User } from "@prisma/client";
import prisma from "../client";
import { Result } from "@badrap/result";

export const read = async (data: { id: string }): Promise<Result<User>> => {
    try {
        return Result.ok(await prisma.user.findUniqueOrThrow({ where: { id: data.id } }));
    }
    catch (error) {
        return Result.err(error as Error);
    }
}