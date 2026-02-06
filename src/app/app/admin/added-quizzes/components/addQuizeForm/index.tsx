/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { quizSchema, QuizForm } from "@/schemas/quizeSchema";
import { useCreateOnusQuiz, useUpdateQuiz } from "@/hooks/useQuery";

import QuizBookSelect from "./fields/quizzBook";
import QuestionCard from "./fields/quizzQuestionCard";

export default function QuizFormComponent({ quiz }: any) {
  const createQuiz = useCreateOnusQuiz();
  const updateQuiz = useUpdateQuiz(quiz?.id);

  const form = useForm<QuizForm>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      quizName: "",
      questions: [
        {
          question: "",
          reference: { book: "", chapter: 1, verse: 1 },
          options: ["", ""],
          correctAnswerIndex: 0,
        },
      ],
    },
  });

  const { control, handleSubmit, watch, reset } = form;

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "questions",
  });

  const activeBook = watch("quizName") || quiz?.quizName;

  useEffect(() => {
    if (quiz) reset(quiz);
  }, [quiz, reset]);

  const onSubmit = async (data: QuizForm) => {
    try {
      if (quiz) {
        await updateQuiz.trigger(data);
        toast.success("Quiz updated successfully");
      } else {
        await createQuiz.trigger(data);
        toast.success("Quiz submitted successfully");
        reset();
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className=" w-full md:max-w-xl">
      <p className="text-center">{quiz ? "Edit Quiz" : "Create New Quiz"}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {!quiz?.id && <QuizBookSelect control={control} />}

        {/* QUESTIONS ONLY SCROLL */}
        <ScrollArea className="max-h-[60vh] pr-2 flex flex-col gap-4">
          {fields.map((question, index) => (
            <QuestionCard
              key={question.id}
              index={index}
              question={question}
              control={control}
              activeBook={activeBook}
              update={update}
              remove={remove}
              totalQuestions={fields.length}
            />
          ))}
        </ScrollArea>

        {/* ACTIONS */}
        <div className="flex gap-2">
          <Button
            type="button"
            className="flex-1"
            onClick={() =>
              append({
                question: "",
                reference: {
                  book: activeBook || "",
                  chapter: 1,
                  verse: 1,
                },
                options: ["", ""],
                correctAnswerIndex: 0,
              })
            }
          >
            Add Question
          </Button>

          <Button
            type="submit"
            className="flex-1 bg-[#e77306] text-white hover:bg-[#d66a05]"
            disabled={createQuiz.isPending || updateQuiz.isPending}
          >
            {createQuiz.isPending || updateQuiz.isPending
              ? "Submitting..."
              : "Submit Quiz"}
          </Button>
        </div>
      </form>
    </div>
  );
}
