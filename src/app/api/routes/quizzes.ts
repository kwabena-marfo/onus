/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hono } from "hono";
import prisma from "@/config/prisma";

import authAdminMiddleware from "../middlewares/authoriseAdmin";

import quizzesData from "@/data/matthewQuiz.json";

export const quizzesRoutes = new Hono();

export type AuthState = {
  user: { id: string } | null; // or your full user type
};

// -------------------- CREATE USER QUIZ SCORE --------------------
quizzesRoutes.post("/create-user-quize", async (c: any) => {
  try {
    const user = c.get("user");
    const { quizName, score, total } = await c.req.json();

    await prisma.quizScore.upsert({
      where: { userId_quizName: { userId: user.id, quizName } },
      update: { score, total, takenAt: new Date() },
      create: { userId: user.id, quizName, score, total },
    });

    return c.json({ message: "Quiz saved successfully" });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to save quiz" }, 500);
  }
});

// -------------------- CREATE SINGLE QUIZ --------------------
quizzesRoutes.post("/create-quiz", authAdminMiddleware(), async (c: any) => {
  try {
    const body = await c.req.json();
    const { name, questions } = body;
    if (!name || !questions?.length)
      return c.json({ error: "Quiz name and questions are required" }, 400);

    const existingQuiz = await prisma.quiz.findFirst({
      where: { name },
    });
    if (existingQuiz)
      return c.json({ error: `Quiz "${name}" already exists` }, 400);

    const createdQuiz = await prisma.quiz.create({
      data: {
        name,
        questions: {
          create: questions.map((q: any) => ({
            text: q.question,
            reference: {
              create: {
                book: name,
                chapter: q.reference.chapter,
                verse: q.reference.verse,
              },
            },
            options: {
              create: q.options.map((opt: string, idx: number) => ({
                text: opt,
                isCorrect: idx === q.correctAnswerIndex,
              })),
            },
          })),
        },
      },
      include: { questions: { include: { options: true, reference: true } } },
    });

    return c.json({ message: "Quiz created successfully", quiz: createdQuiz });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to create quiz" }, 500);
  }
});

// -------------------- CREATE QUIZ BATCH --------------------

quizzesRoutes.post(
  "/create-quiz-batch",
  authAdminMiddleware(),
  async (c: any) => {
    try {
      const body: any[] = quizzesData;
      if (!body.length) return c.json({ error: "No quizzes provided" }, 400);

      const createdQuizzes: any[] = [];
      for (const quizData of body) {
        const { book, questions } = quizData;
        if (!book || !questions?.length)
          return c.json(
            { error: "Each quiz must have a book and questions" },
            400,
          );

        const quizQuestions = questions.map((q: any) => {
          const [refBook, chapVerse] = q.reference.split(" ");
          const [chapterStr, verseStr] = chapVerse.split(":");
          const chapter = Number(chapterStr);
          const verse = Number(verseStr.split(/–|-|—/)[0]);
          return {
            text: q.question,
            reference: { create: { book: refBook, chapter, verse } },
            options: {
              create: q.options.map((opt: string, idx: number) => ({
                text: opt,
                isCorrect: idx === q.correctAnswerIndex,
              })),
            },
          };
        });

        const createdQuiz = await prisma.quiz.create({
          data: {
            name: book.toLowerCase(),
            questions: { create: quizQuestions },
          },
          include: {
            questions: { include: { options: true, reference: true } },
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
      return c.json({ error: "Failed to create quizzes", details: error }, 500);
    }
  },
);

// -------------------- GET USER QUIZZES --------------------
quizzesRoutes.get("/get-user-quizzes", async (c: any) => {
  try {
    const user = c.get("user");
    const quizzes = await prisma.quizScore.findMany({
      where: { userId: user?.id },
    });
    return c.json(quizzes);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch user quizzes" }, 500);
  }
});

// -------------------- GET ADDED QUIZZES --------------------
quizzesRoutes.get("/get-added-quizzes", async (c: any) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      orderBy: { createdAt: "desc" },
      include: { questions: { include: { options: true, reference: true } } },
    });
    return c.json(quizzes);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch added quizzes" }, 500);
  }
});

// -------------------- UPDATE QUIZ --------------------
quizzesRoutes.put(
  "/update-quiz/:quizId",
  authAdminMiddleware(),
  async (c: any) => {
    try {
      const quizId = c.req.param("quizId");
      const body = await c.req.json();
      const { name, questions } = body;

      const existingQuiz = await prisma.quiz.findUnique({
        where: { id: quizId },
      });
      if (!existingQuiz) return c.json({ error: "Quiz not found" }, 404);

      await prisma.option.deleteMany({ where: { question: { quizId } } });
      await prisma.question.deleteMany({ where: { quizId } });

      const updatedQuiz = await prisma.quiz.update({
        where: { id: quizId },
        data: {
          name,
          questions: {
            create: questions.map((q: any) => ({
              text: q.question,
              reference: {
                create: {
                  book: name,
                  chapter: q.reference.chapter,
                  verse: q.reference.verse,
                },
              },
              options: {
                create: q.options.map((opt: string, idx: number) => ({
                  text: opt,
                  isCorrect: idx === q.correctAnswerIndex,
                })),
              },
            })),
          },
        },
        include: { questions: { include: { options: true, reference: true } } },
      });

      return c.json({
        message: "Quiz updated successfully",
        quiz: updatedQuiz,
      });
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to update quiz" }, 500);
    }
  },
);

// -------------------- GET RAW QUIZ --------------------
quizzesRoutes.get("/get-book-quiz/:book", async (c: any) => {
  const book = c.req.param("book");
  const quiz = await prisma.quiz.findFirst({
    where: { name: book.toLowerCase() },
    include: { questions: { include: { options: true, reference: true } } },
  });
  if (!quiz) return c.json({ error: "Quiz not found" }, 404);

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

quizzesRoutes.delete(
  "/delete-quiz/:quizId",
  authAdminMiddleware(),
  async (c: any) => (
    await prisma.quiz.delete({ where: { id: c.req.param("quizId") } }),
    c.json({ message: "Quiz deleted successfully" })
  ),
);
