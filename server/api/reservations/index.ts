import prisma from "../../../libs/prismadb";
import { useAccount } from "~/utils/getAccount"

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const account = await useAccount(event);

    if (!account) return;

    try {
        const { listingId, userId, authorId } = body;

        const query: any = {};

        if (listingId) {
            query.listingId = listingId;
        };

        if (userId) {
            query.userId = account.id;
        }

        if (authorId) {
            query.listing = { userId: account.id };
        }


        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeReservations = reservations.map(
            (reservation) => ({
                ...reservation,
                createdAt: reservation.createdAt.toISOString(),
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                listing: {
                    ...reservation.listing,
                    createdAt: reservation.listing.createdAt.toISOString(),
                },
            }));

        return safeReservations;
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error?.message
        })
    }

});