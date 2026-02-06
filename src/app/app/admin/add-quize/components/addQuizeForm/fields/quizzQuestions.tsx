/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import QuestionCard from "./quizzQuestionCard";

export default function ScrollableQuestions({
  form,
  questionsArray,
  quiz,
}: any) {
  return (
    <div className=" flex flex-col gap-2 pr-2">
      {questionsArray.fields.map((question: any, index: number) => (
        <QuestionCard
          key={question.id}
          question={question}
          index={index}
          form={form}
          questionsArray={questionsArray}
          quiz={quiz}
        />
      ))}
    </div>
  );
}
