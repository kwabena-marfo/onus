/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  type CarouselApi,
} from "@/components/ui/carousel";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default function CarouselComp({
  Content,
  tittle,
  subTittle,
  quizStates,
  setQuizState,
  quizzes,
  setScore,
}: any) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrentIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const handleNext = () => {
    updateScoreIfNeeded(currentIndex);
    api?.scrollNext();
  };

  const handlePrev = () => {
    updateScoreIfNeeded(currentIndex);
    api?.scrollPrev();
  };

  const updateScoreIfNeeded = (index: number) => {
    const currentState = quizStates[index];

    // Only evaluate if not yet evaluated
    if (currentState.hasFlipped && currentState.wasCorrect === undefined) {
      const isCorrect =
        currentState.selected ===
        quizzes[index].options[quizzes[index].correctAnswerIndex];

      setQuizState(index, {
        hasFlipped: true,
        wasCorrect: isCorrect,
      });

      if (isCorrect) {
        setScore((prev: number) => prev + 1);
      }
    }
  };

  return (
    <div className="grid items-center gap-2 w-full">
      <div className="flex flex-col justify-center items-center">
        <p className="font-extrabold text-3xl text-center">{tittle}</p>
        <p className="font-medium text-center text-2xl">{subTittle}</p>
      </div>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          <Content />
        </CarouselContent>
        <div className="grid">
          <div className="flex gap-1 justify-center">
            <BsArrowLeft
              onClick={handlePrev}
              className="w-12 h-12 cursor-pointer"
            />
            <BsArrowRight
              onClick={handleNext}
              className="w-12 h-12 cursor-pointer"
            />
          </div>
          <p className="text-center">
            Question {currentIndex + 1} of {count}
          </p>
        </div>
      </Carousel>
    </div>
  );
}
