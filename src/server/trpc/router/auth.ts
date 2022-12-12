import { publicProcedure, router } from "../trpc";
import { hash } from "argon2";
import { signUpSchema } from "../../common/auth";

export const authRouter = router({
  create: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: { email, password: hashedPassword },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    }),
});

export type ServerRouter = typeof authRouter;
