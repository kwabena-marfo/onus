/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

import { LucidePlus } from "lucide-react";
import QuizFormComponent from "../components/addQuizeForm";

export function AddQuizModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        className="cursor-pointer mb-3   bg-[#e77306] hover:bg-[#d66a05] text-white"
        onClick={() => setOpen(true)}
      >
        Add New Quize <LucidePlus className="w-4 h-4" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onInteractOutside={(event: any) => event.preventDefault()}
        >
          <QuizFormComponent />
        </DialogContent>
      </Dialog>
    </>
  );
}
