import { Result } from "@badrap/result";
import { User } from "@prisma/client";
import prisma from "../client";

const deleteUser = async (data: { id: string}): Promise<Result<User>> => {
  try {
    const user = await prisma.user.findFirst({where: { id: data.id, deletedAt: null }});
    if (!user) {
        throw new Error("User does not exist");
    }
    const result = await prisma.user.update({where: { id: data.id }, data: { deletedAt: Date()}});
    return Result.ok(result);
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default deleteUser;
