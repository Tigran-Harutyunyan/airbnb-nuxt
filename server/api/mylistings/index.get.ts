import prisma from "../../../libs/prismadb";
import { useAccount } from "~/utils/getAccount"

export default defineEventHandler(async (event) => {
    const account = await useAccount(event);

    if (!account) return;

    try {

        let query: any = {};

        query.userId = account.id;

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error
        });
    }

});
