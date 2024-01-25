import { getServerSession } from '#auth'
import prisma from "../../../libs/prismadb";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price,

    } = body;

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

    if (!session?.user?.email) {
        return null;
    }

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: account.id
        }
    });

    return listing;
});
