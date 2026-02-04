/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { quizSchema, QuizForm } from "@/schemas/quizeSchema";
import {
  useGetRawOnusQuizzes,
  usePostOnusQuiz,
  useUpdateQuiz,
} from "@/hooks/useQuery";
import books from "@/data/bible.json";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import IsLoadingError from "@/components/app/isLoadingError";
// Bible books with chapters & verses

export default function QuizFormComponent() {
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quizId") as any;

  const { data: quiz, isLoading, isError } = useGetRawOnusQuizzes(quizId);

  console.log(quiz);

  const form = useForm<QuizForm>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      quizName: "",
      questions: [
        {
          question: "",
          reference: { book: "matthew", chapter: 1, verse: 1 },
          options: ["", ""],
          correctAnswerIndex: 0,
        },
      ],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const postQuiz = usePostOnusQuiz();
  const updateQuize = useUpdateQuiz(quiz);

  const onSubmit = async (data: QuizForm) => {
    return console.log(data);
    const payload = {
      ...data,
      questions: data.questions.map((q) => ({
        ...q,
        reference: {
          ...q.reference,
          book: data.quizName, // 👈 force sync
        },
      })),
    };

    if (quizId) {
      await updateQuize.mutateAsync(payload);
      toast.success("Quiz updated successfully");
    } else {
      await postQuiz.trigger(payload);
      toast.success("Quiz submitted successfully!");
      form.reset();
    }
  };

  console.log(quiz);

  useEffect(() => {
    if (!quizId || !quiz) return;
    form.reset(quiz);
  }, [quiz, form, quizId]);

  if (isLoading || (quiz && isError))
    return <IsLoadingError isLoading={isLoading} isError={quiz && isError} />;

  return (
    <div className="w-full sm:max-w-4xl p-1">
      <CardHeader>
        <CardTitle className="text-center">
          Complete Form to Add a Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <form
          className="flex flex-col gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Quiz Name */}
          <FieldGroup>
            <Controller
              control={form.control}
              name="quizName"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex flex-col gap-1"
                >
                  <FieldLabel>Quiz Book</FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a book" />
                    </SelectTrigger>
                    <SelectContent>
                      {books.map((b) => (
                        <SelectItem key={b.value} value={b.value}>
                          {b.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* Questions */}
          {fields.map((question, qIndex) => {
            return (
              <Card
                key={question.id}
                className="flex flex-col gap-2 p-4 border"
              >
                <h3 className="font-semibold mb-2 text-lg text-center">
                  Question {qIndex + 1}
                </h3>

                {/* Question Text */}
                <FieldGroup>
                  <Controller
                    control={form.control}
                    name={`questions.${qIndex}.question`}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="flex flex-col gap-1"
                      >
                        <FieldLabel>Question Text</FieldLabel>
                        <Input {...field} placeholder="Enter question text" />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                {/* Reference: Book / Chapter / Verse */}
                <div className="flex gap-4 my-2 w-full">
                  {form.watch("quizName") && (
                    <div className="flex gap-4 w-full items-start">
                      {/* Chapter */}
                      <Controller
                        control={form.control}
                        name={`questions.${qIndex}.reference.chapter`}
                        render={({ field }) => {
                          const selectedBook = books.find(
                            (b) => b.value === form.watch("quizName"),
                          );

                          const chapters = selectedBook
                            ? Array.from(
                                {
                                  length: selectedBook.versesPerChapter.length,
                                },
                                (_, i) => i + 1,
                              )
                            : [];

                          return (
                            <div className="flex flex-col flex-1">
                              <span className="text-sm font-medium mb-1">
                                Chapter
                              </span>
                              <Select
                                value={String(field.value)}
                                onValueChange={(val) =>
                                  update(qIndex, {
                                    ...question,
                                    reference: {
                                      ...question.reference,
                                      chapter: Number(val),
                                      verse: 1,
                                    },
                                  })
                                }
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select Chapter" />
                                </SelectTrigger>
                                <SelectContent>
                                  {chapters.map((c) => (
                                    <SelectItem key={c} value={String(c)}>
                                      {c}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          );
                        }}
                      />

                      {/* Verse */}
                      <Controller
                        control={form.control}
                        name={`questions.${qIndex}.reference.verse`}
                        render={({ field }) => {
                          const selectedBook = books.find(
                            (b) => b.value === form.watch("quizName"),
                          );

                          const selectedChapter = form.getValues(
                            `questions.${qIndex}.reference.chapter`,
                          );

                          const verses =
                            selectedBook && selectedChapter
                              ? Array.from(
                                  {
                                    length:
                                      selectedBook.versesPerChapter[
                                        selectedChapter - 1
                                      ],
                                  },
                                  (_, i) => i + 1,
                                )
                              : [];

                          return (
                            <div className="flex flex-col flex-1">
                              <span className="text-sm font-medium mb-1">
                                Verse
                              </span>
                              <Select
                                value={String(field.value)}
                                onValueChange={(val) =>
                                  update(qIndex, {
                                    ...question,
                                    reference: {
                                      ...question.reference,
                                      verse: Number(val),
                                    },
                                  })
                                }
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select Verse" />
                                </SelectTrigger>
                                <SelectContent>
                                  {verses.map((v) => (
                                    <SelectItem key={v} value={String(v)}>
                                      {v}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          );
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Options */}
                {question.options.map((opt, oIndex) => (
                  <div key={oIndex} className="flex items-center gap-1">
                    <Controller
                      control={form.control}
                      name={`questions.${qIndex}.options.${oIndex}`}
                      render={({ field, fieldState }) => (
                        <Field
                          className="flex gap-1"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel>Option {oIndex + 1}</FieldLabel>
                          <Input
                            {...field}
                            placeholder={`Option ${oIndex + 1}`}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      control={form.control}
                      name={`questions.${qIndex}.correctAnswerIndex`}
                      render={({ field }) => (
                        <input
                          type="radio"
                          checked={field.value === oIndex}
                          onChange={() => field.onChange(oIndex)}
                          className="mt-6"
                        />
                      )}
                    />
                  </div>
                ))}

                {/* Add/Remove Options */}
                <div className="flex gap-2 mt-2">
                  {question.options.length < 6 && (
                    <Button
                      type="button"
                      onClick={() => {
                        // Get current question values from the form
                        const currentQuestion = form.getValues(
                          `questions.${qIndex}`,
                        );
                        const newOptions = [...currentQuestion.options, ""];

                        // Update the question with new options
                        update(qIndex, {
                          ...currentQuestion,
                          options: newOptions,
                        });
                      }}
                    >
                      Add Option
                    </Button>
                  )}
                  {question.options.length > 2 && (
                    <Button
                      type="button"
                      onClick={() => {
                        const currentQuestion = form.getValues(
                          `questions.${qIndex}`,
                        );
                        const newOptions = currentQuestion.options.slice(0, -1);

                        update(qIndex, {
                          ...currentQuestion,
                          options: newOptions,
                        });
                      }}
                      variant="destructive"
                    >
                      Remove Option
                    </Button>
                  )}
                </div>

                {/* Remove Question */}
                {fields.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => remove(qIndex)}
                    variant="destructive"
                    className="mt-2"
                  >
                    Remove Question
                  </Button>
                )}
              </Card>
            );
          })}

          {/* Add Question & Submit */}
          <div className="flex w-full gap-2 mt-4">
            <Button
              className="flex-1"
              type="button"
              onClick={() =>
                append({
                  question: "",
                  reference: { book: "matthew", chapter: 1, verse: 1 },
                  options: ["", ""],
                  correctAnswerIndex: 0,
                })
              }
            >
              Add Question
            </Button>
            <Button
              disabled={postQuiz.isPending}
              className="flex-1 l bg-[#e77306] hover:bg-[#d66a05] text-white"
              type="submit"
            >
              {postQuiz.isPending ? "Submitting..." : "Submit Quiz"}
            </Button>
          </div>
          {postQuiz.isError && (
            <div className="mb-3 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
              {(() => {
                const err: any = postQuiz.error;
                return (
                  err?.response?.data?.error ||
                  err?.message ||
                  "Something went wrong while submitting the quiz."
                );
              })()}
            </div>
          )}
        </form>
      </CardContent>
    </div>
  );
}
