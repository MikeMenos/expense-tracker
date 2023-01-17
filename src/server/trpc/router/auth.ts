import * as trpc from "@trpc/server";
import { publicProcedure, router } from "../trpc";
import { hash } from "argon2";
import { loginSchema, signUpSchema } from "../../../zodSchemas/loginSchema";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "../../../lib/auth";
import cookie from "cookie";

export const authRouter = router({
  login: publicProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const { res } = ctx;
    const { email, password } = input;

    const credsCorrect = await ctx.prisma.user.findFirst({
      where: { email, password },
    });

    if (email === credsCorrect?.email && password === credsCorrect?.password) {
      const token = await new SignJWT({})
        .setProtectedHeader({ alg: "HS256" })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(new TextEncoder().encode(getJwtSecretKey()));

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("user-token", token, {
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
        })
      );

      return { success: true };
    }

    throw new trpc.TRPCError({
      code: "UNAUTHORIZED",
      message: "Wrong Email or Password",
    });
  }),

  signup: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, email, password } = input;
      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });
      if (exists) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }
      const hashedPassword = await hash(password);
      const result = await ctx.prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    }),
});

export type ServerRouter = typeof authRouter;
