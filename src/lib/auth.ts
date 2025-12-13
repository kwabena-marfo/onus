/* eslint-disable @typescript-eslint/no-explicit-any */
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import PrismaClient from "@/config/prisma";
import { Hono } from "hono";

export const auth = betterAuth({
  database: prismaAdapter(PrismaClient, {
    provider: "mongodb",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRETE as string,
    },
  },
});

export const authApp = new Hono();

authApp.on(["GET", "POST"], "/*", (c) => {
  return auth.handler(c.req.raw);
});

export type AuthType = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};
