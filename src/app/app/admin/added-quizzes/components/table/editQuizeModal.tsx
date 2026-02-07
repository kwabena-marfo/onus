/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

import { LucideEdit } from "lucide-react";
import QuizFormComponent from "../addQuizeForm";
import { DialogTrigger } from "@radix-ui/react-dialog";

export function EditQuizModal({ quiz }: any) {
  const [open, setOpen] = useState(false);

  function mapQuizToForm(quiz: any) {
    return {
      id: quiz.id,
      name: quiz.name, // ✅ string → Select works
      questions: quiz.questions.map((q: any) => ({
        id: q.id,
        question: q.text,
        reference: {
          id: q.reference?.id,
          book: q.reference.book, // ✅ string
          chapter: q.reference.chapter,
          verse: q.reference.verse,
        },

        // 🔑 FORM expects strings, not objects
        options: q.options.map((o: any) => o.text),

        correctAnswerIndex: q.options.findIndex((o: any) => o.isCorrect),
      })),
    };
  }

  const formData = mapQuizToForm(quiz);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="secondary" className="rounded-full">
            <LucideEdit className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent
          onInteractOutside={(event: any) => event.preventDefault()}
        >
          <QuizFormComponent quiz={formData} />
        </DialogContent>
      </Dialog>
    </>
  );
}
