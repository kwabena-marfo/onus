import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Quiz } from "./column";

export function ViewQuizModal({ quiz }: { quiz: Quiz }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
        View
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{quiz.name} Quiz</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            {quiz.questions.map((q, i) => (
              <div key={q.id} className="border rounded-md p-3">
                <p className="font-semibold">
                  {i + 1}. {q.text}
                </p>

                <p className="text-sm text-muted-foreground">
                  {q.reference.book} {q.reference.chapter}:{q.reference.verse}
                </p>

                <ul className="mt-2 space-y-1">
                  {q.options.map((o) => (
                    <li
                      key={o.id}
                      className={`px-2 py-1 rounded ${
                        o.isCorrect ? "bg-green-100 text-green-700" : "bg-muted"
                      }`}
                    >
                      {o.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
