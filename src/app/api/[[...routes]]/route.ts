/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import z from "zod";

import { getAuth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/config/prisma";
import createOnusChecker from "../middlewares/createOnusChecker";
import getVersesFromExternalApi from "@/lib/getVersesFromExternalApi";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.use("*", cors());

// -------------------- GET VERSES FROM EXTERNAL API --------------------
app.post("/app/get-verses", async ({ req, json }: any) => {
  try {
    const { book, chapter, translation, verses } = await req.json();

    const fetchedVerses = await getVersesFromExternalApi({
      book,
      chapter,
      translation,
      verses,
    });

    return json(fetchedVerses);
  } catch (err) {
    console.error(err);
    return json({ error: "Failed to fetch verse" }, 500);
  }
});

// -------------------- CREATE ONUS VERSE --------------------
app.post(
  "/app/create-onus",
  createOnusChecker(prisma),
  async ({ req, json }: any) => {
    try {
      // Get Clerk user from request
      const { userId } = getAuth(req.raw);
      if (!userId) return json({ error: "Unauthorized" }, 401);

      const client = await clerkClient();

      const user = await client.users.getUser(userId);

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
      } = await req.json();

      await prisma.verses.create({
        data: {
          book,
          chapter,
          verse,
          verseTo: verseTo ?? null,
          version,
          onusVerse,
          verseNotes,
          tags,
          memorised,
          user: {
            connect: { id: user.id },
          },
        },
      });

      return json({ message: "Verse created successfully" });
    } catch (error) {
      console.error(error);
      return json({ error: "An Error Occurred" }, 400);
    }
  }
);

// -------------------- GET USER VERSES --------------------
app.get("/app/get-onus", async (c: any) => {
  try {
    const { userId } = getAuth(c.req.raw);

    const user = await prisma.user.findFirst({
      where: { clerkId: userId },
    });
    if (!userId) return c.json({ error: "Unauthorized" }, 401);

    const verses = await prisma.verses.findMany({
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

    const result = await prisma.verses.deleteMany({
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
app.post("/app/create-onus-quize", async ({ req, json }: any) => {
  try {
    const { userId } = getAuth(req.raw);
    if (!userId) return json({ error: "Unauthorized" }, 401);

    const client = await clerkClient();

    const user = await client.users.getUser(userId);

    const { quizName, score, total } = await req.json();

    await prisma.quizScore.upsert({
      where: {
        userId_quizName: { userId: user.id, quizName },
      },
      update: { score, total, takenAt: new Date() },
      create: { userId: user.id, quizName, score, total },
    });

    return json({ message: "Quiz saved successfully" });
  } catch (error) {
    console.error(error);
    return json({ error: "An Error Occurred" }, 500);
  }
});

// -------------------- GET USER QUIZZES --------------------
app.get("/app/get-onus-quize", async ({ json, req }: any) => {
  try {
    const { userId } = getAuth(req.raw);
    if (!userId) return json({ error: "Unauthorized" }, 401);

    const quizzes = await prisma.quizScore.findMany({ where: { userId } });

    return json(quizzes);
  } catch (error) {
    console.error(error);
    return json({ error: "An error occurred" }, 500);
  }
});

// -------------------- EXPORT HANDLERS --------------------
export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
