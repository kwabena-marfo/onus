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

  callbacks: {
    async signIn({ user, account }: any) {
      if (!user?.email) return false;

      if (account?.provider === "google") {
        // ✅ This is a Google sign-in
        const googleUser = await prisma.user.findFirst({
          where: {
            email: user.email,
            googleId: { not: null },
          },
        });

        if (googleUser) {
          // update existing
          await prisma.user.update({
            where: { id: googleUser.id },
            data: {
              name: user.name ?? googleUser.name,
              username: user.name ?? googleUser.username,
              googleId: googleUser.googleId ?? account.providerAccountId,
            },
          });
        } else {
          // create new Google user
          await prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
              username: user.name,
              googleId: account.providerAccountId, // comes from provider
            },
          });
        }
      }

      return true;
    },

    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      if (user && account?.provider === "credentials") {
        token.id = user.id;
      }

      // Google provider → only look up the DB user
      if (account?.provider === "google") {
        const dbUser = await prisma.user.findFirst({
          where: { email: user?.email as any },
        });
        if (dbUser) {
          token.id = dbUser.id;
        }
      }

      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.accessToken = token;
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
    updateAge: 60 * 5,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
    signIn: "/login",
  },
};
