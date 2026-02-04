/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LucideRotateCcwSquare } from "lucide-react";
import { BsArrowReturnLeft } from "react-icons/bs";

type Reference = {
  book: string;
  chapter: number;
  verse: number;
};

export default function Flashcard({
  question,
  options,
  correctAnswerIndex,
  reference,
  quizState,
  setQuizState,
}: {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  reference?: Reference | null;
  quizState: {
    selected?: string;
    hasFlipped?: boolean;
  };
  setQuizState: (state: Partial<any>) => void;
}) {
  const { selected, hasFlipped } = quizState;
  const [flipped, setFlipped] = useState(false);

  const handleFlipBack = () => {
    setFlipped(false);
    if (!hasFlipped) {
      setQuizState({ hasFlipped: true });
    }
  };

  const formattedReference = reference
    ? `${reference.book} ${reference.chapter}:${reference.verse}`
    : null;

  return (
    <div className="relative perspective w-full h-80   max-w-xl">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT */}
        <div
          className="absolute w-full h-full backface-hidden rounded-xl border shadow-md flex flex-col justify-between p-6
          bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
        >
          <div className="grid gap-3">
            <p className="text-lg text-left font-semibold">{question}</p>

            <RadioGroup
              disabled={hasFlipped}
              value={selected || ""}
              onValueChange={(value: string) =>
                setQuizState({ selected: value })
              }
            >
              {options.map((option, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <RadioGroupItem
                    id={`${question}-option-${index}`}
                    value={option}
                  />
                  <Label htmlFor={`${question}-option-${index}`}>
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button
            disabled={!selected}
            onClick={() => setFlipped(true)}
            className="mt-4 w-fit self-center rounded-full bg-yellow-500 hover:bg-yellow-600"
          >
            Flip Card
            <LucideRotateCcwSquare className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* BACK */}
        <div
          className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl border shadow-md flex flex-col justify-between p-6
          bg-blue-100 dark:bg-blue-900 border-gray-300 dark:border-gray-700"
        >
          <div className="flex justify-center items-center flex-col">
            <p className="text-lg font-semibold mb-2">Correct Answer</p>

            <p className="text-green-600 dark:text-green-400 font-semibold">
              {options[correctAnswerIndex]}
            </p>

            {formattedReference && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 capitalize">
                {formattedReference}
              </p>
            )}
          </div>

          <Button
            variant="outline"
            onClick={handleFlipBack}
            className="mt-4 w-fit self-center rounded-full bg-yellow-500 hover:bg-yellow-600"
          >
            <BsArrowReturnLeft className="mr-2" />
            See Front
          </Button>
        </div>
      </div>
    </div>
  );
}
