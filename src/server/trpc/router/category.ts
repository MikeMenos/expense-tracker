import { categorySchema } from "../../../zodSchemas/categorySchema";
import { router, protectedProcedure } from "../trpc";

export const categoryRouter = router({
  create: protectedProcedure
    .input(categorySchema)
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx;
      const { category } = input;

      return prisma.category.create({
        data: {
          category,
        },
      });
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    const categories = await prisma.category.findMany();

    return { categories };
  }),
});
