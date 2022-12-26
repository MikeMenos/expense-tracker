import { categorySchema } from "../../../zodSchemas/categorySchema";
import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const categoryRouter = router({
  createOrEdit: protectedProcedure
    .input(categorySchema)
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx;
      const { name, id } = input;

      return prisma.category.upsert({
        where: { id },
        update: { name },
        create: { name },
      });
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    const categories = await prisma.category.findMany();

    return { categories };
  }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;

      return prisma.category.delete({
        where: {
          id,
        },
      });
    }),
});
