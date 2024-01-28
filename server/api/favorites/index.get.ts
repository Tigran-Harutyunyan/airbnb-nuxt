import prisma from "../../../libs/prismadb";
import { useAccount } from "~/utils/getAccount"

export default defineEventHandler(async (event) => {
    const account = await useAccount(event);

    if (!account) return;
    const favorites = await prisma.listing.findMany({
        where: {
            id: {
                in: [...(account.favoriteIds || [])]
            }
        }
    });

    const safeFavorites = favorites.map((favorite) => ({
        ...favorite,
        createdAt: favorite.createdAt.toString(),
    }));

    return safeFavorites;

});