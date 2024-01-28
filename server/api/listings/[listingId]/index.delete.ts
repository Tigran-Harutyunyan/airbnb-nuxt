import prisma from "../../../../libs/prismadb";
import { useAccount } from "~/utils/getAccount"

export default defineEventHandler(async (event) => {
    const account = await useAccount(event);
    if (!account) return;

    const listingId = getRouterParam(event, 'listingId');

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: account.id
        }
    });

    return listing

});