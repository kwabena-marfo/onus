/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { LucideRotateCcwSquare } from "lucide-react";
import { useState } from "react";
import { BsEyeSlash } from "react-icons/bs";

export default function Flashcard({ FrontComp, BackComp }: any) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="relative perspective w-full h-64 my-8 cursor-pointer group">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div
          className="absolute w-full h-full backface-hidden rounded-xl flex flex-col justify-center items-center gap-3 p-6
          bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700
          shadow-[0_8px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.5)]
          text-center text-lg font-medium text-gray-900 dark:text-gray-100
          group-hover:-rotate-1
        "
        >
          <FrontComp />
          <Button
            size="icon"
            onClick={() => setFlipped(!flipped)}
            className="rounded-full cursor-pointer bg-yellow-500 hover:bg-yellow-600"
          >
            <LucideRotateCcwSquare className="w-12 h-12" />
          </Button>
        </div>

        {/* Back */}
        <div
          className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl flex flex-col justify-center items-center gap-3 p-6
          bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700
          shadow-[0_8px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.5)]
          text-center text-lg font-medium text-gray-900 dark:text-gray-100
          group-hover:rotate-1
        "
        >
          <BackComp />
          <Button
            size="icon"
            variant="outline"
            onClick={() => setFlipped(!flipped)}
            className="rounded-full cursor-pointer bg-yellow-500 hover:bg-yellow-600"
          >
            <BsEyeSlash />
          </Button>
        </div>
      </div>
    </div>
  );
}
