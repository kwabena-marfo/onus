import { CarouselItem } from "@/components/ui/carousel";
import Flashcard from "./flashCard";
import CarouselComp from "../carousel";
import quizzes from "@/data/matthewQuiz.json";
import { useState } from "react";

export default function QuizeFlashcardCarousel() {
  const matthewQuizzes = quizzes.filter((item) =>
    item.reference.startsWith("Matthew")
  );

  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0); // <- track carousel position

  const handleScoreChange = (value: number) => setScore((prev) => prev + value);

  return (
    <CarouselComp
      tittle="Quiz on Matthew"
      subTittle={`Complete the following quotes. Your score: ${score}`}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
      Content={() => (
        <>
          {matthewQuizzes.map((quiz, index) => (
            <CarouselItem key={index}>
              <Flashcard
                {...quiz}
                resetSignal={currentIndex} // <- force reset when slide changes
                handleScoreChange={handleScoreChange}
              />
            </CarouselItem>
          ))}
        </>
      )}
    />
  );
}
