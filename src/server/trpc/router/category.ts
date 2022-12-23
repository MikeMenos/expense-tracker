import { categorySchema } from "../../../zodSchemas/categorySchema";
import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const categoryRouter = router({
  createOrEdit: protectedProcedure
    .input(categorySchema)
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx;
      const { category, id } = input;

      return prisma.category.upsert({
        where: { id },
        update: { category },
        create: { category },
      });
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    const categories = await prisma.category.findMany();

    return { categories };
  }),

  remove: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      return prisma.category.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
