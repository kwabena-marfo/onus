/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import z from "zod";

import prisma from "@/config/prisma";
import createOnusChecker from "../middlewares/createOnusChecker";
import getVersesFromExternalApi from "@/lib/getVersesFromExternalApi";
import authMiddleware from "../middlewares/authorize";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

export type AuthState = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
  onusVerse?: string | null;
};

export const app = new Hono<{ Variables: AuthState }>().basePath("/api");

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
  })
);

app.on(["GET", "POST"], "/auth/*", (c) => auth.handler(c.req.raw));

app.use(authMiddleware());

app.post("/app/get-verses", authMiddleware(), async ({ req, json }: any) => {
  try {
    const { book, chapter, translation, verse, verseTo } = await req.json();

    const fetchedVerses = await getVersesFromExternalApi({
      book,
      chapter,
      translation,
      verse,
      verseTo,
    });

    return json(fetchedVerses);
  } catch (err) {
    console.error(err);
    return json({ error: "Failed to fetch verse" }, 500);
  }
});

// -------------------- CREATE ONUS VERSE --------------------
app.post("/app/create-onus", createOnusChecker(prisma), async (c: any) => {
  try {
    const user = c.get("user");

    const {
      book,
      chapter,
      verse,
      verseTo,
      version,
      onusVerse,
      verseNotes,
      tags,
      memorised,
    } = await c.req.json();

    await prisma.verse.create({
      data: {
        book,
        chapter,
        verse,
        verseTo: verseTo ?? null,
        version: "NIV",
        onusVerse: onusVerse || c.get("onusVerse"),
        verseNotes,
        tags,
        memorised,
        user: {
          connect: { id: user.id },
        },
      },
    });

    return c.json({ message: "Verse created successfully" });
  } catch (error) {
    console.error(error);
    return c.json({ error: "An Error Occurred" }, 400);
  }
});

// -------------------- GET USER VERSES --------------------
app.get("/app/get-onus", async (c: any) => {
  try {
    const user = c.get("user");

    const verses = await prisma.verse.findMany({
      where: { userId: user?.id },
    });

    if (!verses || verses.length === 0)
      return c.json({ error: "No verses found" }, 404);

    const grouped = verses.reduce((acc, verse) => {
      const bookKey = verse.book.toLowerCase();
      if (!acc[bookKey]) acc[bookKey] = { memorised: 0, saved: 0, verses: [] };

      if (verse.memorised === "memorised") acc[bookKey].memorised++;
      if (verse.memorised === "saved") acc[bookKey].saved++;

      acc[bookKey].verses.push(verse);
      return acc;
    }, {} as Record<string, { memorised: number; saved: number; verses: any[] }>);

    const result = Object.entries(grouped).map(([book, data]) => ({
      [book]: data,
    }));

    return c.json({ verses, grouped: result });
  } catch (error) {
    console.error(error);
    return c.json({ error: "An error occurred" }, 500);
  }
});

// -------------------- DELETE ONUS VERSES --------------------
app.delete("/app/delete-onus", async (c) => {
  const idsParam: any = c.req.query("ids");

  try {
    const parsed = z.array(z.string()).parse(JSON.parse(idsParam));

    const result = await prisma.verse.deleteMany({
      where: { id: { in: parsed } },
    });

    return c.json(
      { message: "Verse deleted successfully", count: result.count },
      200
    );
  } catch (error) {
    return c.json(
      {
        message: "Invalid request or IDs",
        error: error instanceof Error ? error.message : String(error),
      },
      400
    );
  }
});

// -------------------- CREATE ONUS QUIZ --------------------
app.post("/app/create-onus-quize", authMiddleware(), async (c: any) => {
  try {
    const user = c.get("user");

    const { quizName, score, total } = await c.req.json();

    await prisma.quizScore.upsert({
      where: {
        userId_quizName: { userId: user.id, quizName },
      },
      update: { score, total, takenAt: new Date() },
      create: { userId: user.id, quizName, score, total },
    });

    return c.json({ message: "Quiz saved successfully" });
  } catch (error) {
    console.error(error);
    return c.json({ error: "An Error Occurred" }, 500);
  }
});

// -------------------- GET USER QUIZZES --------------------
app.get("/app/get-onus-quize", authMiddleware(), async (c: any) => {
  try {
    const user = c.get("user");

    const quizzes = await prisma.quizScore.findMany({
      where: { userId: user?.id },
    });

    return c.json(quizzes);
  } catch (error) {
    console.error(error);
    return c.json({ error: "An error occurred" }, 500);
  }
});
// -------------------- EXPORT HANDLERS --------------------
export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
