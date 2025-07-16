/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import quizzes from "@/data/matthewQuiz.json";
import CarouselComp from "./carousel";
import { CarouselItem } from "@/components/ui/carousel";
import Flashcard from "./flashCard";
import { Button } from "@/components/ui/button";

export default function QuizeFlashcardCarousel() {
  const matthewQuizzes = quizzes.filter((q) =>
    q.reference.startsWith("Matthew")
  );

  const [score, setScore] = useState(0);

  const [quizStates, setQuizStates] = useState(
    matthewQuizzes.map(() => ({
      selected: "",
      hasFlipped: false,
    }))
  );

  const setQuizState = (index: number, partial: any) => {
    setQuizStates((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...partial };
      return copy;
    });
  };

  const completed = quizStates.every((q) => q.hasFlipped);

  return (
    <CarouselComp
      tittle="Quiz on Matthew"
      subTittle={`Your score: ${score}/${matthewQuizzes.length}`}
      Content={() =>
        completed ? (
          <Button>Save</Button>
        ) : (
          matthewQuizzes.map((quiz, index) => (
            <CarouselItem key={quiz.reference}>
              <Flashcard
                {...quiz}
                quizState={quizStates[index]}
                setQuizState={(partial: any) => setQuizState(index, partial)}
              />
            </CarouselItem>
          ))
        )
      }
      quizStates={quizStates}
      setQuizState={setQuizState}
      quizzes={matthewQuizzes}
      score={score}
      setScore={setScore}
    />
  );
}
