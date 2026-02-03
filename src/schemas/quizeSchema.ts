import * as z from "zod";

const referenceSchema = z.object({
  book: z.string().min(1, "Book is required"),
  chapter: z.number().min(1, "Chapter is required"),
  verse: z.number().min(1, "Verse is required"),
});

const questionSchema = z.object({
  question: z.string().min(5, "Question is required"),
  reference: referenceSchema,
  options: z
    .array(z.string().min(1))
    .min(2, "At least 2 options are required")
    .max(6, "Maximum 6 options")
    .refine((opts) => new Set(opts).size === opts.length, {
      message: "Options must be unique",
    }),
  correctAnswerIndex: z.number().min(0, "Select the correct answer"),
});

export const quizSchema = z.object({
  quizName: z.string().min(3, "Quiz name is required"),
  questions: z.array(questionSchema).min(1, "Add at least one question"),
});

export type QuizForm = z.infer<typeof quizSchema>;
