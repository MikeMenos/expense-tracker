import { TRPCError } from "@trpc/server";
import { categorySchema } from "../../../zodSchemas/categorySchema";
import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const categoryRouter = router({
  createOrEdit: protectedProcedure
    .input(categorySchema)
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { name, id } = input;

      const duplicateCategoryNameExists = await prisma.category.findUnique({
        where: {
          // @ts-ignore
          name,
        },
      });
      const categories = await prisma.category.findMany();

      if (!id && duplicateCategoryNameExists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Category name already exists",
        });
      }

      if (categories.length > 5) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You can create a maximum number of 6 Categories",
        });
      }

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
