import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { goalSchema } from "../../../zodSchemas/goalSchema";

export const goalsRouter = router({
  createOrEdit: protectedProcedure
    .input(goalSchema)
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx;
      const { title, budget, id } = input;

      return prisma.goal.upsert({
        where: { id },
        update: { title, budget },
        create: { title, budget },
      });
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    const goals = await prisma.goal.findMany();

    return { goals };
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

      return prisma.goal.delete({
        where: {
          id,
        },
      });
    }),
});
