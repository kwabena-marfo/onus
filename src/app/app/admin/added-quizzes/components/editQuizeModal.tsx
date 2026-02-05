/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

import { LucideEdit } from "lucide-react";
import QuizFormComponent from "../../add-quize/components/addQuizeForm";

export function EditQuizModal({ quiz }: any) {
  const [open, setOpen] = useState(false);

  function mapQuizToForm(quiz: any) {
    return {
      id: quiz.id,
      quizName: quiz.name, // already lowercase 👍
      questions: quiz.questions.map((q: any) => ({
        question: q.text,
        reference: {
          book: q.reference.book,
          chapter: q.reference.chapter,
          verse: q.reference.verse,
        },
        options: q.options.map((o: any) => o.text),
        correctAnswerIndex: q.options.findIndex((o: any) => o.isCorrect),
      })),
    };
  }

  const formData = mapQuizToForm(quiz);
  return (
    <>
      <Button
        size="sm"
        variant="secondary"
        className="rounded-full"
        onClick={() => setOpen(true)}
      >
        <LucideEdit className="w-4 h-4" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onInteractOutside={(event: any) => event.preventDefault()}
          className="max-h-[80vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle className="capitalize">
              Edit {formData.quizName} Quiz
            </DialogTitle>
          </DialogHeader>

          <QuizFormComponent quiz={formData} />
        </DialogContent>
      </Dialog>
    </>
  );
}
