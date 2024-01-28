import prisma from "../../../../libs/prismadb";
import { useAccount } from "~/utils/getAccount"

export default defineEventHandler(async (event) => {
    const reservationId = getRouterParam(event, 'reservationId');

    const account = await useAccount(event);

    if (!account) return;

    if (!reservationId || typeof reservationId !== 'string') {

        throw createError({
            statusCode: 500,
            statusMessage: "Invalid ID"
        })
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: account.id },
                { listing: { userId: account.id } }
            ]
        }
    });
    return {
        reservation
    }
});