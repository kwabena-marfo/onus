/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import z from "zod";

import prisma from "@/config/prisma";
import createOnusChecker from "../middlewares/createOnusChecker";
import getVersesFromExternalApi from "@/lib/getVersesFromExternalApi";
import authMiddleware from "../middlewares/authorize";
import authAdminMiddleware from "../middlewares/authoriseAdmin";

import { auth } from "@/lib/auth";
import transporter from "@/config/nodemailer";
import quizzes from "@/data/matthewQuiz.json";

import EmailTemplate from "@/components/email";
export const runtime = "nodejs";

export type AuthState = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
  onusVerse?: string | null;
};

interface ReferenceInput {
  book: string;
  chapter: number;
  verse: number;
}

interface QuestionInput {
  question: string;
  options: string[]; // array of option texts
  correctAnswerIndex: number;
  reference: ReferenceInput;
}

interface QuizInput {
  quizName: string;
  questions: QuestionInput[];
}

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
  }),
);

app.on(["GET", "POST"], "/auth/*", (c) => auth.handler(c.req.raw));

app.post("/app/send-email", async ({ req, json }: any) => {
  try {
    const { to, subject, text } = await req.json();

    const mailBody = EmailTemplate({
      message: `${text}`,
    });

    await transporter.sendMail({
      from: `"Onus" <"noreply@onusbible.com">`,
      to,
      subject,
      html: mailBody,
    });

    return json("Done");
  } catch (error) {
    console.error({ error });
    return json("An Error Occurred", 500);
  }
});

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
    return c.json({ error: "An error occurred" }, 500);
  }
});

// -------------------- DELETE ONUS VERSES --------------------
app.delete("/app/delete-onus", async (c) => {
  const id: any = c.req.query("id");

  try {
    await prisma.verse.delete({
      where: { id },
    });

    return c.json({ message: "Verse deleted successfully" }, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      {
        error: "An error occurred",
      },
      400,
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

app.post("/app/create-quiz-batch", authMiddleware(), async (c) => {
  try {
    const body: any[] = quizzes; // expect an array of quizzes

    if (!body.length) {
      return c.json({ error: "No quizzes provided" }, 400);
    }

    const createdQuizzes: any[] = [];

    for (const quizData of body) {
      const { book, questions } = quizData;

      if (!book || !questions?.length) {
        return c.json(
          { error: "Each quiz must have a book and questions" },
          400,
        );
      }

      // Transform questions
      const quizQuestions = questions.map((q: any) => {
        const [refBook, chapVerse] = q.reference.split(" ");
        const [chapterStr, verseStr] = chapVerse.split(":");

        const chapter = Number(chapterStr);
        const verse = Number(verseStr.split(/–|-|—/)[0]); // Take first verse if range

        return {
          text: q.question,
          reference: {
            create: {
              book: refBook,
              chapter,
              verse,
            },
          },
          options: {
            create: q.options.map((opt: string, idx: number) => ({
              text: opt,
              isCorrect: idx === q.correctAnswerIndex,
            })),
          },
        };
      });

      // Create quiz in DB
      const createdQuiz = await prisma.quiz.create({
        data: {
          name: book,
          questions: {
            create: quizQuestions,
          },
        },
        include: {
          questions: {
            include: {
              options: true,
              reference: true,
            },
          },
        },
      });

      createdQuizzes.push(createdQuiz);
    }

    return c.json({
      message: "All quizzes created successfully",
      quizzes: createdQuizzes,
    });
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "An error occurred while creating quizzes", details: error },
      500,
    );
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

app.get("/app/get-added-quizzes", authMiddleware(), async (c) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        questions: {
          include: {
            options: true,
            reference: true,
          },
        },
      },
    });

    return c.json(quizzes);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch added quizzes" }, 500);
  }
});

app.post(
  "/app/create-quiz",
  authMiddleware(),
  authAdminMiddleware(),
  async (c) => {
    try {
      const body: QuizInput = await c.req.json();
      const { quizName, questions } = body;

      if (!quizName || !questions?.length) {
        return c.json({ error: "Quiz name and questions are required" }, 400);
      }

      // Check for duplicate quiz name
      const existingQuiz = await prisma.quiz.findFirst({
        where: { name: quizName },
      });

      if (existingQuiz) {
        return c.json(
          { error: `A quiz with the name "${quizName}" already exists` },
          400,
        );
      }

      // Validate each question has distinct options
      for (const q of questions) {
        const optionsSet = new Set(q.options);
        if (optionsSet.size !== q.options.length) {
          return c.json(
            { error: `Question "${q.question}" has duplicate options` },
            400,
          );
        }

        if (
          q.correctAnswerIndex < 0 ||
          q.correctAnswerIndex >= q.options.length
        ) {
          return c.json(
            {
              error: `Question "${q.question}" has invalid correctAnswerIndex`,
            },
            400,
          );
        }
      }

      // Create quiz with nested questions and options
      const createdQuiz = await prisma.quiz.create({
        data: {
          name: quizName,
          questions: {
            create: questions.map((q) => ({
              text: q.question,
              reference: {
                create: {
                  book: q.reference.book,
                  chapter: q.reference.chapter,
                  verse: q.reference.verse,
                },
              },
              options: {
                create: q.options.map((opt, idx) => ({
                  text: opt,
                  isCorrect: idx === q.correctAnswerIndex,
                })),
              },
            })),
          },
        },
        include: {
          questions: {
            include: {
              options: true,
              reference: true,
            },
          },
        },
      });

      return c.json({
        message: "Quiz created successfully",
        quiz: createdQuiz,
      });
    } catch (error) {
      console.error(error);
      return c.json(
        { error: "An error occurred while creating the quiz" },
        500,
      );
    }
  },
);

app.put(
  "/app/update-quiz/:quizId",
  authMiddleware(),
  authAdminMiddleware(),
  async (c) => {
    try {
      const quizId = c.req.param("quizId");
      const body: QuizInput = await c.req.json();

      const { quizName, questions } = body;

      if (!quizName || !questions?.length) {
        return c.json({ error: "Quiz name and questions are required" }, 400);
      }

      // Ensure quiz exists
      const existingQuiz = await prisma.quiz.findFirst({
        where: { id: quizId },
      });

      if (!existingQuiz) {
        return c.json({ error: "Quiz not found" }, 404);
      }

      // Prevent duplicate quiz names (except self)
      const duplicateQuiz = await prisma.quiz.findFirst({
        where: {
          name: quizName,
          NOT: { id: quizId },
        },
      });

      if (duplicateQuiz) {
        return c.json(
          { error: `A quiz with the name "${quizName}" already exists` },
          400,
        );
      }

      // Validate questions
      for (const q of questions) {
        const optionsSet = new Set(q.options);
        if (optionsSet.size !== q.options.length) {
          return c.json(
            { error: `Question "${q.question}" has duplicate options` },
            400,
          );
        }

        if (
          q.correctAnswerIndex < 0 ||
          q.correctAnswerIndex >= q.options.length
        ) {
          return c.json(
            {
              error: `Question "${q.question}" has invalid correctAnswerIndex`,
            },
            400,
          );
        }
      }

      // 🔥 Transaction keeps data consistent
      const updatedQuiz = await prisma.$transaction(async (tx) => {
        // Delete old questions (cascade deletes options & reference)
        await tx.question.deleteMany({
          where: { quizId },
        });

        // Recreate quiz content
        return tx.quiz.update({
          where: { id: quizId },
          data: {
            name: quizName,
            questions: {
              create: questions.map((q) => ({
                text: q.question,
                reference: {
                  create: {
                    book: q.reference.book,
                    chapter: q.reference.chapter,
                    verse: q.reference.verse,
                  },
                },
                options: {
                  create: q.options.map((opt, idx) => ({
                    text: opt,
                    isCorrect: idx === q.correctAnswerIndex,
                  })),
                },
              })),
            },
          },
          include: {
            questions: {
              include: {
                options: true,
                reference: true,
              },
            },
          },
        });
      });

      return c.json({
        message: "Quiz updated successfully",
        quiz: updatedQuiz,
      });
    } catch (error) {
      console.error(error);
      return c.json(
        { error: "An error occurred while updating the quiz" },
        500,
      );
    }
  },
);

app.get("/app/get-quiz-raw/:book", async (c) => {
  const book = c.req.param("book");

  const quiz = await prisma.quiz.findFirst({
    where: {
      name: book.toLowerCase(),
    },
    include: {
      questions: {
        include: {
          options: {
            orderBy: { id: "asc" }, // keep option order stable
          },
          reference: true,
        },
      },
    },
  });

  if (!quiz) {
    return c.json({ error: "Quiz not found" }, 404);
  }

  const response = {
    quizName: quiz.name,
    questions: quiz.questions.map((q) => ({
      question: q.text,
      reference: q.reference
        ? {
            book: q.reference.book,
            chapter: q.reference.chapter,
            verse: q.reference.verse,
          }
        : null,
      options: q.options.map((o) => o.text),
      correctAnswerIndex: q.options.findIndex((o) => o.isCorrect),
    })),
  };

  return c.json(response);
});

app.get("/app/get-quiz/:book", async (c) => {
  const book = c.req.param("book");

  const quiz = await prisma.quiz.findFirst({
    where: { name: book?.toLowerCase() },
    include: {
      questions: {
        include: {
          options: true,
          reference: true,
        },
      },
    },
  });

  if (!quiz) {
    return c.json({ error: "Quiz not found" }, 404);
  }

  const response = {
    name: quiz.name,
    questions: quiz.questions.map((q) => {
      const correctIndex = q.options.findIndex((o) => o.isCorrect);

      return {
        question: q.text,
        options: q.options.map((o) => o.text),
        correctAnswerIndex: correctIndex,
        reference: q.reference
          ? `${q.reference.book} ${q.reference.chapter}:${q.reference.verse}`
          : null,
      };
    }),
  };

  return c.json(response);
});
// -------------------- EXPORT HANDLERS --------------------
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
