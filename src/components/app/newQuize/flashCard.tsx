/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { LucideRotateCcwSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Flashcard({
  question,
  options,
  correctAnswerIndex,
  reference,
  handleScoreChange,
  resetSignal, // 👈 new prop to watch
}: any) {
  const [flipped, setFlipped] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false);
  const [selected, setSelected] = useState("");
  const [wasCorrect, setWasCorrect] = useState(false);

  // 🔁 Reset internal state when resetSignal changes
  useEffect(() => {
    setFlipped(false);
    setHasFlipped(false);
    setSelected("");
    setWasCorrect(false);
  }, [resetSignal]);

  const handleSelect = (value: any) => {
    setSelected(value);
  };

  const handleFlip = () => {
    if (!hasFlipped) {
      const isCorrect = selected === options[correctAnswerIndex];
      setWasCorrect(isCorrect);
      if (isCorrect && typeof handleScoreChange === "function") {
        handleScoreChange(1);
      }
    }

    setFlipped(true);
    setHasFlipped(true);
  };

  return (
    <div className="relative perspective w-full h-72 my-8 max-w-xl mx-auto">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden rounded-xl bg-white border border-gray-300 shadow-[0_8px_20px_rgba(0,0,0,0.1)] flex flex-col justify-between text-center text-lg font-medium p-6">
          <div className="grid gap-3">
            <p className="text-lg text-center font-semibold">{question}</p>
            <RadioGroup
              defaultValue=""
              disabled={hasFlipped}
              onValueChange={handleSelect}
            >
              {options.map((item: any, index: any) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem id={`option-${index}`} value={item} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="text-sm font-medium"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button
            disabled={!selected || hasFlipped}
            onClick={handleFlip}
            className="mt-4 w-fit self-center rounded-full bg-yellow-500 hover:bg-yellow-600"
          >
            Flip Card
            <LucideRotateCcwSquare className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl bg-blue-100 border border-gray-300 shadow-[0_8px_20px_rgba(0,0,0,0.1)] flex flex-col justify-between text-center text-lg font-medium p-6">
          <div>
            <p className="text-lg font-semibold mb-2">Correct Answer:</p>
            <p className={wasCorrect ? "text-green-600" : "text-red-600"}>
              {options[correctAnswerIndex]}
            </p>
            <p className="text-sm text-gray-600 mt-2">{reference}</p>
          </div>

          <Button
            variant="outline"
            onClick={() => setFlipped(false)}
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
