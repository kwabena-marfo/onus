/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import bcrypt from "bcrypt";
import z from "zod";
import { SignJWT } from "jose";
import { OAuth2Client } from "google-auth-library";

import prisma from "@/config/prisma";

import createOnusChecker from "../middlewares/createOnusChecker";
import createUserChecker from "../middlewares/createUserChecker";
import createAuthMiddleware from "../middlewares/authorize";
import getVersesFromExternalApi from "@/lib/getVersesFromExternalApi";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use("*", cors());

app.post("/mobile-auth/google", async (c) => {
  try {
    const { id_token } = await c.req.json();
    if (!id_token) return c.json({ error: "Missing id_token" }, 400);

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload: any = ticket.getPayload();
    if (!payload) return c.json({ error: "Invalid token" }, 401);

    // Check if user exists by email
    let user = await prisma.user.findFirst({
      where: { email: payload.email },
    });

    if (user) {
      // User exists but has no Google linked → require credentials login
      if (!user.googleId) {
        return c.json(
          {
            error:
              "This email is registered with a password. Please log in with credentials.",
          },
          403
        );
      }

      // User exists and Google ID matches → return existing DB _id
      if (user.googleId === payload.sub) {
        const appUser = {
          id: user.id, // database ID
          email: user.email,
          name: user.name,
        };

        const secret = process.env.CLIENT_SECRETE;
        if (!secret) throw new Error("CLIENT_SECRET env variable is missing!");

        const token = await new SignJWT(appUser)
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("30d")
          .sign(new TextEncoder().encode(secret));

        return c.json({ token, user: appUser });
      }

      // Email exists but linked to a different Google account → block
      return c.json(
        { error: "This email is already linked to another Google account." },
        403
      );
    }

    // User does not exist → create new
    user = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        username: payload.name,
        googleId: payload.sub,
      },
    });

    const appUser = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const secret = process.env.CLIENT_SECRETE;
    if (!secret) throw new Error("CLIENT_SECRET env variable is missing!");

    const token = await new SignJWT(appUser)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(new TextEncoder().encode(secret));

    return c.json({ token, user: appUser });
  } catch (err) {
    console.log(err);
    return c.json({ error: "Auth failed" }, 500);
  }
});

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

app.use("/app/*", createAuthMiddleware());

app.post("/app/get-verses", async ({ req, json }: any) => {
  const { book, chapter, translation, verses } = await req.json();

  try {
    const fetchedVerses = await getVersesFromExternalApi({
      book,
      chapter,
      translation,
      verses,
    });
    return json(fetchedVerses);
  } catch (err) {
    console.error(err);
    return json("Failed to fetch verse", 500);
  }
});

app.post(
  "/app/create-onus",
  createOnusChecker(prisma),
  async ({ req, json, get }: any) => {
    try {
      const session = get("session");

      console.log(get("onusVerse"));

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
      }: {
        book: string;
        chapter: string;
        verse: string;
        verseTo?: any;
        version: string;
        onusVerse: string;
        verseNotes?: string;
        tags?: any;
        memorised: "memorised" | "saved";
      } = await req.json();

      await prisma.verses.upsert({
        where: {
          userId_book_chapter_verse: {
            userId: session.user.id,
            book,
            chapter,
            verse,
          },
        },
        update: {
          version,
          onusVerse: onusVerse || get("onusVerse"),
          verseNotes,
          tags,
          memorised,
        },
        create: {
          book,
          chapter,
          verse,
          ...(verseTo !== null && verseTo !== undefined
            ? { verseTo }
            : { verseTo: null }),
          version,
          onusVerse: onusVerse || get("onusVerse"),
          verseNotes,
          tags,
          memorised,
          user: {
            connect: { id: session.user.id },
          },
        },
      });

      return json("Done");
    } catch (error) {
      console.error(error);
      return json("An Error Occurred", 500);
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

app.delete("/app/delete-onus", async (c) => {
  const idsParam: any = c.req.query("ids");

  console.log(idsParam);

  // Validate and parse JSON array from query string
  try {
    const parsed = z.array(z.string()).parse(JSON.parse(idsParam));

    const result = await prisma.verses.deleteMany({
      where: {
        id: { in: parsed }, // assuming 'id' is your primary key
      },
    });

    return c.json(
      {
        message: "Verse deleted successfully",
        count: result.count,
      },
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

app.post("/app/create-onus-quize", async ({ json, get, req }: any) => {
  try {
    const session = await get("session");
    const { quizName, score, total } = await req.json();

    await prisma.quizScore.upsert({
      where: {
        userId_quizName: {
          userId: session?.user?.id,
          quizName,
        },
      },
      update: {
        score,
        total,
        takenAt: new Date(),
      },
      create: {
        userId: session?.user?.id,
        quizName,
        score,
        total,
      },
    });
    return json("Done");
  } catch (error) {
    console.log(error);
    return json("An Error Occured", 500);
  }
});

app.get("/app/get-onus-quize", async ({ json, get }: any) => {
  try {
    const session = await get("session");

    const latestQuizzes = await prisma.quizScore.findMany({
      where: {
        userId: session?.user?.id,
      },
    });

    return json(latestQuizzes);
  } catch (error) {
    console.error("Error fetching latest quiz scores:", error);
    return json("An error occurred", 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
