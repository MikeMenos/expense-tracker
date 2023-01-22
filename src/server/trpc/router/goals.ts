import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { goalSchema } from "../../../zodSchemas/goalSchema";

export const goalsRouter = router({
  createOrEdit: protectedProcedure
    .input(goalSchema)
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx;
      const { title, budget, id, gathered } = input;

      if (gathered > budget) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Gathered amount cannot be higher than the Budget amount",
        });
      }

      return prisma.goal.upsert({
        where: { id },
        update: { title, budget, gathered },
        create: { title, budget, gathered },
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
