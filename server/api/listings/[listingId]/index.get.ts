import prisma from "../../../../libs/prismadb";

export default defineEventHandler(async (event) => {
    interface IParams {
        listingId?: string;
    }

    try {
        const listingId = getRouterParam(event, 'listingId');

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                user: true
            }
        });

        if (!listing) {
            return null;
        }

        return {
            ...listing,
            createdAt: listing.createdAt.toString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toString(),
                updatedAt: listing.user.updatedAt.toString(),
                emailVerified:
                    listing.user.emailVerified?.toString() || null,
            }
        };
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error
        })
    }
}); 