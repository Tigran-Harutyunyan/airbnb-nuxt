// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// export default defineEventHandler(async (event) => {
 

//   const lesson = await prisma.lesson.findFirst({
//     where: {
//       slug: lessonSlug,
//       chapter: {
//         slug: chapterSlug,
//       },
//     },
//   });

//   if (!lesson) {
//     throw createError({
//       statusCode: 404,
//       statusMessage: 'Lesson not found',
//     });
//   }

//   return lesson;
// });