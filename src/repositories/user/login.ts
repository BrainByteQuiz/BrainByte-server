import { Result } from "@badrap/result";
import { createHash } from 'crypto';
import { findUser } from "../common";
import { User } from "@prisma/client";

const login = async (data: { email: string, password: string}): Promise<Result<User>> => {
  try {
    const user = await findUser(data);
    if (!user) {
      throw new Error("User with this email doesn't exist")
    }
    const passSalt = data.password + user.salt;
    const hash = createHash('sha256');
    hash.update(passSalt);
    if (hash.digest('hex') == user.hashedPassword)
        return Result.ok(user);
    else
        throw new Error("Incorrect password")
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default login;
