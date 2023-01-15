// import * as trpc from "@trpc/server";
import { publicProcedure, router } from "../trpc";
// import { hash } from "argon2";
// import { signUpSchema } from "../../../zodSchemas/loginSchema";

export const authRouter = router({
  // signup: publicProcedure
  //   .input(signUpSchema)
  //   .mutation(async ({ ctx, input }) => {
  //     const { username, email, password } = input;
  //     const exists = await ctx.prisma.user.findFirst({
  //       where: { email },
  //     });
  //     if (exists) {
  //       throw new trpc.TRPCError({
  //         code: "CONFLICT",
  //         message: "User already exists.",
  //       });
  //     }
  //     const hashedPassword = await hash(password);
  //     const result = await ctx.prisma.user.create({
  //       data: { username, email, password: hashedPassword },
  //     });
  //     return {
  //       status: 201,
  //       message: "Account created successfully",
  //       result: result.email,
  //     };
  //   }),
});

export type ServerRouter = typeof authRouter;
