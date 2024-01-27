import prisma from "../../../libs/prismadb";
import { useAccount } from "~/utils/getAccount"

export default defineEventHandler(async (event) => {

    const account = await useAccount(event);

    if (!account) return;

    const body = await readBody(event);

    const {
        listingId,
        startDate,
        endDate,
        totalPrice
    } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
        throw createError({
            statusCode: 500,
            statusMessage: "Data not suppliied"
        })
    }

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: account.id,
                    startDate,
                    endDate,
                    totalPrice,
                }
            }
        }
    });

    return listingAndReservation

});