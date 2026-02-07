/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Quiz } from "./column";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ViewQuizModal({ quiz }: { quiz: Quiz }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        variant="secondary"
        className="rounded-full"
        onClick={() => setOpen(true)}
      >
        View
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onInteractOutside={(event: any) => event.preventDefault()}
          className=" overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle className="capitalize">{quiz.name} Quiz</DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex flex-col gap-4 max-h-[80vh]">
            {quiz.questions.map((q, i) => (
              <div key={q.id} className="border rounded-md p-3 mb-4">
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
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
