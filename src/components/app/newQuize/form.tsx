/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CarouselItem } from "@/components/ui/carousel";
import Flashcard from "./flashCard";
import CarouselComp from "../carousel";
import quizzes from "@/data/matthewQuiz.json";

export default function QuizeFlashcardCarousel() {
  const matthewQuizzes = quizzes.filter((item) =>
    item.reference.startsWith("Matthew")
  );

  return (
    <CarouselComp
      tittle="Quize on Mathew"
      subTittle="Complete the following quotes"
      Content={() => (
        <>
          {matthewQuizzes.map((quiz, index) => (
            <CarouselItem key={index}>
              <Flashcard {...quiz} />
            </CarouselItem>
          ))}
        </>
      )}
    />
  );
}
