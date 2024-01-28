import prisma from "../libs/prismadb";
import { getServerSession } from '#auth'
export const useAccount = async (event) => {

    const session = await getServerSession(event);

    const account = await prisma.user.findFirst({
        where: {
            email: session?.user?.email
        }
    })

    if (!account) {
        throw createError({
            statusCode: 500,
            statusMessage: "User not found"
        })
    }

    if (!session?.user?.email) {
        return null;
    }

    return account;
}