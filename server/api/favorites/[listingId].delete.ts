
import { getServerSession } from '#auth'
import prisma from "../../../libs/prismadb";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  const currentUser = await prisma.user.findFirst({
    where: {
      email: session?.user?.email
    }
  })

  if (!currentUser) {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    })
  }

  if (!session?.user?.email) {
    return null;
  }


  const listingId = getRouterParam(event, 'listingId');

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  });
  return user
});