/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import bcrypt from "bcrypt";

import prisma from "@/config/prisma";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID as any,
      clientSecret: process.env.CLIENT_SECRETE as any,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { username, password } = credentials as any;

          const user: any = await prisma.users.findFirst({
            where: {
              username,
            },
          });

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user?.password);

          if (!passwordsMatch) return null;

          return {
            name: user.display_name,
            id: user._id,
            role: user.role,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      console.log(user);
      if (user) {
        token.accessToken = user?.accessToken;
      }

      return { ...token, ...(user || {}) };
    },

    async session({ session, token }: any) {
      console.log(session);
      session.user = token;

      return session;
    },
  },
  session: {
    maxAge: 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
