/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { useAdminDeleteQuiz } from "@/hooks/useQuery";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { quizSchema, QuizForm } from "@/schemas/quizeSchema";
import { useAdminCreateQuiz, useAdminUpdateQuiz } from "@/hooks/useQuery";

import QuizBookSelect from "./fields/quizzBook";
import QuestionCard from "./fields/quizzQuestionCard";
import { Separator } from "@/components/ui/separator";
import { LuLoaderCircle } from "react-icons/lu";

export default function QuizFormComponent({ quiz }: any) {
  const createQuiz = useAdminCreateQuiz();
  const updateQuiz = useAdminUpdateQuiz(quiz?.id);
  const deleteQuiz = useAdminDeleteQuiz();

  const form = useForm<QuizForm>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      name: "",
      questions: [
        {
          question: "",
          reference: { chapter: 1, verse: 1 },
          options: ["", ""],
          correctAnswerIndex: 0,
        },
      ],
    },
  });

  const { control, handleSubmit, watch, reset, setValue, getValues } = form;

  console.log(form.formState.errors);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "questions",
  });

  const handleDelete = async () => {
    if (!quiz?.id) return;

    try {
      await deleteQuiz.mutateAsync(quiz.id);
      toast.success("Quiz deleted successfully");
    } catch {
      toast.error("Failed to delete quiz");
    }
  };

  const activeBook = watch("name") || quiz?.quizName;

  const onSubmit = async (data: QuizForm) => {
    try {
      if (quiz) {
        await updateQuiz.trigger(data); // call your update mutation
        toast.success("Quiz updated successfully", { position: "top-center" });
      } else {
        await createQuiz.trigger(data); // call your create mutation
        toast.success("Quiz submitted successfully", {
          position: "top-center",
        });
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong", { position: "top-center" });
    }
  };

  useEffect(() => {
    if (quiz) reset(quiz);
  }, [quiz, reset]);

  return (
    <div className=" w-full md:max-w-xl">
      <p className="text-center text-lg font-bold capitalize">
        {quiz ? `Edit ${quiz?.name} Quiz` : "Create New Quiz"}
      </p>

      <Separator className="my-2" />

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
              setValue={setValue}
              getValues={getValues}
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
        {quiz?.id && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="destructive"
                className="mt-3 w-full cursor-pointer"
              >
                Delete Quiz
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this quiz and all its questions.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel disabled={deleteQuiz.isPending}>
                  Cancel
                </AlertDialogCancel>
                <Button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-300 hover:bg-red-400"
                >
                  {deleteQuiz.isPending && (
                    <LuLoaderCircle className="h-4 w-4 animate-spin" />
                  )}
                  {deleteQuiz.isPending ? "Deleting..." : "Yes, delete quiz"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </form>
    </div>
  );
}
