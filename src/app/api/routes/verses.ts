/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hono } from "hono";
import prisma from "@/config/prisma";
import createOnusChecker from "../middlewares/createOnusChecker";
import getVersesFromExternalApi from "@/lib/getVersesFromExternalApi";

export type AuthState = {
  user: { id: string } | null; // or your full user type
};

// Pass the generic type
export const versesRoutes = new Hono<{ Variables: AuthState }>();

// -------------------- GET VERSES --------------------
versesRoutes.post("/get-verses", async (c) => {
  try {
    const { book, chapter, translation, verse, verseTo } = await c.req.json();
    const fetchedVerses = await getVersesFromExternalApi({
      book,
      chapter,
      translation,
      verse,
      verseTo,
    });
    return c.json(fetchedVerses);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Failed to fetch verses" }, 500);
  }
});

// -------------------- CREATE ONUS VERSE --------------------
versesRoutes.post("/create-onus", createOnusChecker(prisma), async (c: any) => {
  try {
    const user = c.get("user");
    const {
      book,
      chapter,
      verse,
      verseTo,
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
        user: { connect: { id: user.id } },
      },
    });

    return c.json({ message: "Verse created successfully" });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to create verse" }, 400);
  }
});

// -------------------- GET USER VERSES --------------------
versesRoutes.get("/get-onus", async (c: any) => {
  try {
    const user = c.get("user");
    const verses = await prisma.verse.findMany({ where: { userId: user?.id } });

    if (!verses || verses.length === 0)
      return c.json({ verses: [], grouped: [] });

    const grouped = verses.reduce(
      (acc, verse) => {
        const bookKey = verse.book.toLowerCase();
        if (!acc[bookKey])
          acc[bookKey] = { memorised: 0, saved: 0, verses: [] };
        if (verse.memorised === "memorised") acc[bookKey].memorised++;
        if (verse.memorised === "saved") acc[bookKey].saved++;
        acc[bookKey].verses.push(verse);
        return acc;
      },
      {} as Record<string, { memorised: number; saved: number; verses: any[] }>,
    );

    const result = Object.entries(grouped).map(([book, data]) => ({
      [book]: data,
    }));
    return c.json({ verses, grouped: result });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch verses" }, 500);
  }
});

// -------------------- DELETE ONUS VERSE --------------------
versesRoutes.delete("/delete-onus", async (c) => {
  const id = c.req.query("id");
  try {
    await prisma.verse.delete({ where: { id } });
    return c.json({ message: "Verse deleted successfully" });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to delete verse" }, 400);
  }
});

export default versesRoutes;
