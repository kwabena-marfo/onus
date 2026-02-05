/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ViewQuizModal } from "../viewQuizeModal";
import { LucideEdit } from "lucide-react";
import { EditQuizModal } from "../editQuizeModal";

export type Quiz = {
  id: string;
  name: string; // book name
  questions: {
    id: string;
    text: string;
    reference: {
      book: string;
      chapter: number;
      verse: number;
    };
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
    }[];
  }[];
  createdAt: string;
};

export default function useQuizColumns() {
  const router = useRouter();

  const columns: ColumnDef<Quiz>[] = [
    {
      accessorKey: "name",
      cell: ({ row }) => {
        const quiz = row.original;

        return (
          <div className="flex justify-between items-center border rounded-lg p-3">
            <div>
              <p className="font-bold uppercase">{quiz.name}</p>
              <p className="text-sm text-muted-foreground">
                {quiz.questions.length} questions
              </p>
            </div>

            <div className="flex gap-2">
              {/* View */}
              <ViewQuizModal quiz={quiz} />

              <EditQuizModal quiz={quiz} />
            </div>
          </div>
        );
      },
    },
  ];

  return columns;
}
