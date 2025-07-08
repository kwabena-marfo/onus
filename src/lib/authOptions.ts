/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/config/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRETE!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as any;
        const user = await prisma.user.findFirst({ where: { email } });

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(
          password,
          user?.password as any
        );

        if (!passwordsMatch) return null;

        return {
          id: user.id,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const existingUser = await prisma.user.findFirst({
        where: { googleId: user?.id },
      });

      if (existingUser) {
        await prisma.user.update({
          where: { googleId: existingUser?.googleId as any },
          data: { name: user?.name || "", image: user?.image || "" },
        });

        user.id = existingUser.id;
        return true;
      }

      const createdUser = await prisma.user.create({
        data: {
          googleId: user.id,
          email: user?.email as string,
          name: user?.name || "",
          image: user?.image || "",
        },
      });

      user.id = createdUser.id;

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 60 * 60,
  },
};
