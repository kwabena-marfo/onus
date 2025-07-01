import { Hono } from "hono";
import { handle } from "hono/vercel";

import prisma from "@/config/prisma";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.post("/create-onus", async ({ req, json }) => {
  try {
    const {
      book,
      chapter,
      verse,
      version,
      onusVerse,
      verseNotes,
      memorised,
    }: {
      book: string;
      chapter: string;
      verse: string;
      version: string;
      onusVerse: string;
      verseNotes?: string;
      memorised: "memorised" | "saved";
    } = await req.json();

    await prisma.verses.create({
      data: {
        book: book,
        chapter: chapter,
        verse: verse,
        version: version,
        onusVerse: onusVerse,
        verseNotes: verseNotes,
        memorised: memorised,
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
    const onuss = await prisma.verses.findMany();
    console.log(onuss);

    return json(onuss);
  } catch (error) {
    console.log(error);
    json("An Error Occured", 500);
  }
});
export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
