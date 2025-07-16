/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LucideRotateCcwSquare } from "lucide-react";
import { BsArrowReturnLeft } from "react-icons/bs";

export default function Flashcard({
  question,
  options,
  correctAnswerIndex,
  reference,
  quizState,
  setQuizState,
}: any) {
  const { selected, hasFlipped } = quizState;
  const [flipped, setFlipped] = useState(false);

  // Flip back resets local state but not quiz state
  const handleFlipBack = () => {
    setFlipped(false);
    if (!hasFlipped) {
      setQuizState({ hasFlipped: true });
    }
  };

  return (
    <div className="relative perspective w-full h-80 my-8 max-w-xl mx-auto">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT SIDE */}
        <div className="absolute w-full h-full backface-hidden rounded-xl bg-white border border-gray-300 shadow-md flex flex-col justify-between text-center text-lg font-medium p-6">
          <div className="grid gap-3">
            <p className="text-lg text-center font-semibold">{question}</p>
            <RadioGroup
              disabled={hasFlipped}
              value={selected || ""}
              onValueChange={(value: string) =>
                setQuizState({ selected: value })
              }
            >
              {options.map((option: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 text-left"
                >
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

        {/* BACK SIDE */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl bg-blue-100 border border-gray-300 shadow-md flex flex-col justify-between text-center text-lg font-medium p-6">
          <div>
            <p className="text-lg font-semibold mb-2">Correct Answer:</p>
            <p className="text-green-600">{options[correctAnswerIndex]}</p>
            <p className="text-lg text-gray-600 mt-2">{reference}</p>
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
