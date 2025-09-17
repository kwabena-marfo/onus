/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/config/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    // 1. Standard Google web auth (browser / Next.js login page)
    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRETE!,
    }),

    // 2. Normal email/password auth
    CredentialsProvider({
      id: "credentials", // default
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as any;

        if (!email || !password) throw new Error("Missing email or password");

        const googleUser = await prisma.user.findFirst({
          where: {
            email,
            googleId: { not: null },
          },
        });

        if (googleUser) throw new Error("Please sign in with Google");

        const user = await prisma.user.findFirst({ where: { email } });

        if (!user)
          throw new Error(
            "Sorry, this email is not associated with any account"
          );

        const passwordsMatch = await bcrypt.compare(
          password,
          user.password as any
        );

        if (!passwordsMatch) throw new Error("Incorrect password");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
    updateAge: 60 * 5,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      console.log({ token, account, user });
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }: any) {
      console.log({ token });
      session.user.id = token.id;
      session.accessToken = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
