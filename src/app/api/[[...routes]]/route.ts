/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { auth } from "@/lib/auth";

import authMiddleware from "../middlewares/authorize";
import { quizzesRoutes } from "../routes/quizzes";
import { versesRoutes } from "../routes/verses";
import { emailsRoutes } from "../routes/emails";

export const runtime = "nodejs";

export type AuthState = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
  onusVerse?: string | null;
};

export const app = new Hono<{ Variables: AuthState }>().basePath("/api");

// -------------------- GLOBAL MIDDLEWARE --------------------
app.use(
  "*",
  cors({
    origin: [
      "onusbible://",
      "http://10.0.2.2:8081",
      "exp://*/*",
      "exp://10.0.0.*:*/*",
      "exp://192.168.*.*:*/*",
      "exp://172.*.*.*:*/*",
      "exp://localhost:*/*",
    ],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS", "DELETE"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.on(["GET", "POST"], "/auth/*", (c) => auth.handler(c.req.raw));

app.route("/email", emailsRoutes);

// -------------------- GLOBAL AUTH --------------------
app.use(authMiddleware());

// -------------------- ROUTES --------------------
app.route("/verses", versesRoutes);
app.route("/quizzes", quizzesRoutes);

// -------------------- EXPORT HANDLERS --------------------
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
