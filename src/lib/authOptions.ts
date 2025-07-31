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
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as any;

        if (!email || !password) throw new Error("Missing email or password");

        const googleUser = await prisma.user.findFirst({
          where: {
            email,
            googleId: {
              not: null,
            },
          },
        });

        if (googleUser) throw new Error("Please sign in with google");

        const user = await prisma.user.findFirst({
          where: { email },
        });

        if (!user)
          throw new Error(
            "Sorry, this email is not associated with any account"
          );

        const passwordsMatch = await bcrypt.compare(
          password,
          user?.password as any
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
    strategy: "jwt", // or 'database' if you're using database sessions
    maxAge: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 5, // Update the session every 5 minutes if the user is active
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // Match session maxAge for consistency
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allow any mobile URL scheme
      if (url.startsWith("exp://") || url.startsWith("myapp://")) return url;
      return baseUrl;
    },
    async signIn({ user }) {
      const existingGoogleUser = await prisma.user.findFirst({
        where: { googleId: user?.id },
      });

      if (existingGoogleUser) {
        await prisma.user.update({
          where: { googleId: existingGoogleUser?.googleId as any },
          data: { name: user?.name || "", image: user?.image || "" },
        });

        user.id = existingGoogleUser.id;
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
};
