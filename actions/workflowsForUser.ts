import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export const GetUserWorkflows = async () => {
        const {userId} = await auth()
        if (!userId) {
            throw new Error("Unauthenticated User")
        }

        return prisma.workflow.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "asc"
            }
        })
}