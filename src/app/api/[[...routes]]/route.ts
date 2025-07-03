/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { getServerSession } from "next-auth";

import prisma from "@/config/prisma";
import createOnusChecker from "../middlewares/createOnusChecker";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.post("/create-onus", createOnusChecker(prisma), async ({ req, json }) => {
  const session = (await getServerSession(authOptions)) as any;

  if (!session) {
    return json("An Error Occured", 401);
  }

  try {
    const {
      book,
      chapter,
      verse,
      version,
      onusVerse,
      verseNotes,
      memorised,
      tags,
    }: {
      book: string;
      chapter: string;
      verse: string;
      version: string;
      onusVerse: string;
      verseNotes?: string;
      tags?: any;
      memorised: "memorised" | "saved";
    } = await req.json();

    await prisma.verses.create({
      data: {
        book,
        chapter,
        verse,
        version,
        onusVerse,
        verseNotes,
        tags,
        memorised,
        user: {
          connect: { id: session?.user?.id },
        },
      },
    });

    return json("Done");
  } catch (error) {
    console.log(error);
    json("An Error Occured", 500);
  }
});

app.get("/get-onus", async ({ json }) => {
  try {
    const session = (await getServerSession(authOptions)) as any;

    if (!session) return json("An Error Occured", 401);

    const verses = await prisma.verses.findMany({
      where: {
        userId: session.user.id,
      },
    });

    const grouped = verses.reduce((acc, verse) => {
      const bookKey = verse.book.toLowerCase();

      if (!acc[bookKey]) {
        acc[bookKey] = {
          memorised: 0,
          saved: 0,
          verses: [],
        };
      }

      if (verse.memorised === "memorised") {
        acc[bookKey].memorised++;
      } else if (verse.memorised === "saved") {
        acc[bookKey].saved++;
      }

      acc[bookKey].verses.push(verse);

      return acc;
    }, {} as Record<string, { memorised: number; saved: number; verses: any[] }>);

    // Convert to array of objects with book name as key
    const result = Object.entries(grouped).map(([book, data]) => ({
      [book]: data,
    }));

    return json({ verses, grouped: result });
  } catch (error) {
    console.log(error);
    json("An Error Occured", 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
