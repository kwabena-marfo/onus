/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import quizzes from "@/data/matthewQuiz.json";
import CarouselComp from "../carousel";
import { CarouselItem } from "@/components/ui/carousel";
import Flashcard from "./flashCard";

export default function QuizeFlashcardCarousel() {
  const matthewQuizzes = quizzes.filter((item) =>
    item.reference.startsWith("Matthew")
  );

  const [score, setScore] = useState(0);

  const [quizStates, setQuizStates] = useState(
    matthewQuizzes.map(() => ({
      selected: "",
      wasCorrect: false,
      hasFlipped: false,
      flipped: false,
    }))
  );

  const setQuizState = (index: number, newPartial: any) => {
    setQuizStates((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...newPartial };
      return copy;
    });

    if (newPartial.wasCorrect !== undefined && newPartial.hasFlipped) {
      setScore((prev) => prev + (newPartial.wasCorrect ? 1 : 0));
    }
  };

  return (
    <CarouselComp
      tittle="Quiz on Matthew"
      subTittle={`Your score: ${score}/${matthewQuizzes?.length}`}
      Content={() =>
        matthewQuizzes.map((quiz, index) => (
          <CarouselItem key={quiz.reference}>
            <Flashcard
              {...quiz}
              quizState={quizStates[index]}
              setQuizState={(partial: any) => setQuizState(index, partial)}
            />
          </CarouselItem>
        ))
      }
    />
  );
}
