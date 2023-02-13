import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { transactionsSchema } from "../../../zodSchemas/transactionSchema";

export const transactionsRouter = router({
  createOrEdit: protectedProcedure
    .input(transactionsSchema)
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { receiver, id, category, amount, createdAt } = input;

      return prisma.transaction.upsert({
        where: { id },
        update: { receiver, category, amount, createdAt },
        create: { receiver, category, amount, createdAt },
      });
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    const transactions = await prisma.transaction.findMany();

    return { transactions };
  }),

  totals: protectedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    const transactions = await prisma.transaction.findMany();

    const totals = transactions.reduce(
      (acc, currentValue) => acc + currentValue.amount,
      0
    );

    return totals;
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

      return prisma.transaction.delete({
        where: {
          id,
        },
      });
    }),
});
