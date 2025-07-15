/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { LucideRotateCcwSquare } from "lucide-react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Flashcard({
  question,
  options,
  correctAnswerIndex,
  reference,
  quizState,
  setQuizState,
}: any) {
  const { selected, hasFlipped, wasCorrect, flipped } = quizState;

  const handleFlip = () => {
    if (!hasFlipped) {
      const isCorrect = selected === options[correctAnswerIndex];
      setQuizState({
        wasCorrect: isCorrect,
        hasFlipped: true,
        flipped: true,
      });
    } else {
      setQuizState({ flipped: true });
    }
  };

  return (
    <div className="relative perspective w-full h-72 my-8 max-w-xl mx-auto">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden rounded-xl bg-white border border-gray-300 shadow-lg flex flex-col justify-between p-6">
          <div className="grid gap-3">
            <p className="text-lg font-semibold text-center">{question}</p>
            <RadioGroup
              disabled={hasFlipped}
              value={selected || ""}
              onValueChange={(val: string) => setQuizState({ selected: val })}
            >
              {options.map((option: string, index: number) => (
                <div key={index} className="flex items-start space-x-2">
                  <RadioGroupItem id={`${question}-${index}`} value={option} />
                  <Label htmlFor={`${question}-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Button
            disabled={!selected}
            onClick={handleFlip}
            className="mt-4 self-center rounded-full bg-yellow-500 hover:bg-yellow-600"
          >
            Flip Card <LucideRotateCcwSquare className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl bg-blue-100 border border-gray-300 shadow-lg flex flex-col justify-center items-center p-6">
          <p className="text-lg font-semibold mb-2">Correct Answer:</p>
          <p className={wasCorrect ? "text-green-600" : "text-red-600"}>
            {options[correctAnswerIndex]}
          </p>
          <p className="mt-2 text-gray-600">{reference}</p>
          <Button
            onClick={() => setQuizState({ flipped: false })}
            className="mt-4 self-center rounded-full bg-yellow-500 hover:bg-yellow-600"
          >
            <BsArrowReturnLeft className="mr-2" />
            See Front
          </Button>
        </div>
      </div>
    </div>
  );
}
