import { User } from "@prisma/client";
import prisma from "./client"

export const userExists = async (data: { username: string, email: string }): Promise<boolean> => {
    const byUsername = await prisma.user.findFirst({where: { username: data.username, deletedAt: null }})
    if (byUsername) return true;
    const byEmail = await prisma.user.findFirst({where: { username: data.email, deletedAt: null }})
    return byEmail ? true : false;
}