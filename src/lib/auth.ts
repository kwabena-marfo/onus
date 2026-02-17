/* eslint-disable @typescript-eslint/no-explicit-any */
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { expo } from "@better-auth/expo";

import PrismaClient from "@/config/prisma";
import axios from "axios";

export const auth = betterAuth({
  database: prismaAdapter(PrismaClient, {
    provider: "mongodb",
  }),
  plugins: [expo()],

  trustedOrigins: [
    "onusbible://",
    "https://onusbible.com",
    "https://onusbible.vercel.app",
    ...(process.env.NODE_ENV === "development"
      ? [
          "http://localhost:3000",
          "null",
          "exp://*/*", // Trust all Expo development URLs
          "exp://10.0.0.*:*/*", // Trust 10.0.0.x IP range
          "exp://192.168.*.*:*/*", // Trust 192.168.x.x IP range
          "exp://172.*.*.*:*/*", // Trust 172.x.x.x IP range
          "exp://localhost:*/*", // Trust localhost
        ]
      : []),
  ],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await axios.post(`${process.env.BETTER_AUTH_URL}/api/email/send-email`, {
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
    onPasswordReset: async ({ user }) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRETE as string,
    },
  },
});

export type AuthType = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};
