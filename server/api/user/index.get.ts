import { getServerSession } from '#auth'
import prisma from "../../../libs/prismadb";

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event);

    const account = await prisma.user.findFirst({
        where: {
            email: session?.user?.email
        }
    })

    if (!account) {
        throw createError({
            statusCode: 500,
            statusMessage: "Something went wrong"
        })
    }

    const { email, name, image, id, favoriteIds } = account;

    return {
        email, name, image, id, favoriteIds
    };
});
