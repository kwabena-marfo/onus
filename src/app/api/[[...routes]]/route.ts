/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

import prisma from "@/config/prisma";
import createOnusChecker from "../middlewares/createOnusChecker";
import { authOptions } from "@/lib/authOptions";
import createUserChecker from "../middlewares/createUserChecker";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.post(
  "/create-user",
  createUserChecker(prisma),
  async ({ req, json }: any) => {
    try {
      const data = await req.json();

      const {
        name,
        email,
        username,
        password,
      }: {
        name: string;
        email: string;
        username: string;
        password: string;
      } = data;

      await prisma.user.create({
        data: {
          name,
          email,
          username,
          password: await bcrypt.hash(password || "", 10),
        },
      });

      return json("Done");
    } catch (error) {
      console.log({ error });
      return json("An Error Occured", 500);
    }
  }
);

app.use("/app/*", async ({ path, json, set }: any, next) => {
  console.log(path);
  if (path === "/create-user") await next();

  const session = (await getServerSession(authOptions)) as any;

  if (!session) return json("An Error Occured", 401);

  set("session", session);
  return await next();
});

app.post(
  "/app/create-onus",
  createOnusChecker(prisma),
  async ({ req, json, get }: any) => {
    try {
      const session = get("session");

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
      return json("An Error Occured", 500);
    }
  }
);

app.get("/app/get-onus", async ({ json, get }: any) => {
  try {
    const session = await get("session");

    const verses = await prisma.verses.findMany({
      where: {
        userId: session?.user?.id,
      },
    });

    console.log({ verses });

    if (!verses) return json("An Error Occured", 500);

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
    console.log({ error });
    return json("An Error Occured", 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
