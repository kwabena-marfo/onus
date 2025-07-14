/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { LucideRotateCcwSquare } from "lucide-react";
import { useState } from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Flashcard({
  question,
  options,
  correctAnswerIndex,
  reference,
}: any) {
  const [flipped, setFlipped] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSelect = (value: any) => {
    setSelected(value);
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
            <RadioGroup defaultValue="" onValueChange={handleSelect}>
              {options.map((item: any, index: any) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    id={`option-${index}`}
                    value={item}
                    disabled={flipped} // ❌ disables selection if card is flipped
                  />
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

          {/* Flip Button — disabled if no selection */}
          <Button
            disabled={!selected}
            onClick={() => setFlipped(true)}
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
            <p>{options[correctAnswerIndex]}</p>
            <p className="text-sm text-gray-600 mt-2">{reference}</p>
          </div>

          {/* Back → Front Button */}
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
