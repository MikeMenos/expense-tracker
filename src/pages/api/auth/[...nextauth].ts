import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { verify } from "argon2";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import { loginSchema } from "../../../zodSchemas/loginSchema";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize: async (credentials) => {
        const creds = await loginSchema.parseAsync(credentials);

        const user = await prisma.user.findFirst({
          where: { email: creds.email },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await verify(user.password, creds.password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
  // Include user.id on session
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.name;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user?.name) {
        // session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signin",
    // error: '/auth/error',
    newUser: "/register",
  },
};

export default NextAuth(authOptions);
