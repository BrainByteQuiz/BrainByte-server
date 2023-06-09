import { Result } from "@badrap/result";
import prisma from "../client";
import { createHash } from 'crypto';
import { findUser } from "../common";
import { User } from "@prisma/client";

const register = async (data: { email: string, password: string, username: string }): Promise<Result<User>> => {
  try {
    if (await findUser(data)) {
      throw new Error("Username or email are already taken")
    }
    const salt = [...Array(4)].map(() => Math.random().toString(36).substring(2, 3)).join('');
    const passSalt = data.password + salt;
    const hash = createHash('sha256');
    hash.update(passSalt);
    const hashedValue = hash.digest('hex');
    const result = await prisma.user.create({ data: { email: data.email, hashedPassword: hashedValue, username: data.username, salt: salt} });
    return Result.ok(result);
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default register;
