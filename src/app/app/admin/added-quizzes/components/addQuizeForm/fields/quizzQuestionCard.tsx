/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Controller, useWatch } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import ReferenceSelect from "./reference";

export default function QuestionCard({
  index,
  question,
  control,
  activeBook,
  update,
  getValues,
  remove,
  totalQuestions,
}: any) {
  const options = useWatch({
    control,
    name: `questions.${index}.options`,
  });

  return (
    <Card className="p-4 mb-4">
      <h3 className="text-center font-semibold text-lg mb-0">
        Question {index + 1}
      </h3>

      {/* QUESTION */}
      <Controller
        control={control}
        name={`questions.${index}.question`}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            className="flex flex-col gap-0"
          >
            <FieldLabel>Question</FieldLabel>
            <Input {...field} placeholder="Enter question" />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* CHAPTER & VERSE */}
      <ReferenceSelect
        index={index}
        question={question}
        activeBook={activeBook}
        update={update}
      />

      {/* OPTIONS */}
      <div className="mt-3 flex flex-col gap-2">
        {options?.map((_: any, oIndex: number) => (
          <div key={oIndex} className="flex items-center gap-2">
            <Controller
              control={control}
              name={`questions.${index}.options.${oIndex}`}
              render={({ field, fieldState }) => (
                <div className="flex flex-col w-full">
                  <Input {...field} placeholder={`Option ${oIndex + 1}`} />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name={`questions.${index}.correctAnswerIndex`}
              render={({ field }) => (
                <input
                  type="radio"
                  checked={field.value === oIndex}
                  onChange={() => field.onChange(oIndex)}
                />
              )}
            />
          </div>
        ))}
      </div>

      {/* CONTROLS */}
      <div className="flex gap-2 mt-3">
        {options.length < 6 && (
          <Button
            type="button"
            onClick={() => {
              // Get the current full question from live form state
              const currentQuestion = getValues(`questions.${index}`);

              // Update options only, keep everything else intact
              update(index, {
                ...currentQuestion,
                options: [...currentQuestion.options, ""],
              });
            }}
          >
            Add Option
          </Button>
        )}

        {totalQuestions > 1 && (
          <Button
            type="button"
            variant="destructive"
            onClick={() => remove(index)}
          >
            Remove Question
          </Button>
        )}
      </div>
    </Card>
  );
}
