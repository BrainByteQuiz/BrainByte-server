import { User } from "@prisma/client";
import prisma from "./client"

export const findUser = async (data: { username?: string, email: string }): Promise<User | null> => {
    if (data.username) {
        const byUsername = await prisma.user.findFirst({where: { username: data.username, deletedAt: null }})
        if (byUsername) return byUsername;
    }
    const byEmail = await prisma.user.findFirst({where: { username: data.email, deletedAt: null }})
    return byEmail;
}