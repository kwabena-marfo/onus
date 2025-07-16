/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import quizzes from "@/data/matthewQuiz.json";
import CarouselComp from "./carousel";
import { CarouselItem } from "@/components/ui/carousel";
import Flashcard from "./flashCard";
import { Button } from "@/components/ui/button";
import Congratulations from "./congratulations";

export default function QuizeFlashcardCarousel() {
  const matthewQuizzes = quizzes
    .filter((q) => q.reference.startsWith("Matthew"))
    .slice(0, 5);

  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [quizStates, setQuizStates] = useState(
    matthewQuizzes.map(() => ({
      selected: "",
      hasFlipped: false,
      wasCorrect: undefined,
    }))
  );

  const setQuizState = (index: number, partial: any) => {
    setQuizStates((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...partial };
      return copy;
    });
  };

  const unansweredIndexes = quizStates
    .map((q, idx) => (q.selected === "" ? idx : null))
    .filter((v) => v !== null) as number[];

  const handleFinish = () => {
    setCompleted(true);
  };

  if (completed) {
    return (
      <div className="mt-6 text-center">
        <Congratulations />

        <p className="text-lg">
          You got <strong>{score}</strong> out of{" "}
          <strong>{matthewQuizzes.length}</strong>
        </p>

        {/* Not Attempted (Optional Safety Check) */}
        {quizStates.some((q) => !q.hasFlipped) && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-red-500">
              Not Attempted
            </h3>
            <ul className="list-disc list-inside">
              {matthewQuizzes.map((quiz, index) => {
                const q = quizStates[index];
                if (!q.hasFlipped) {
                  return <li key={quiz.reference}>{quiz.reference}</li>;
                }
                return null;
              })}
            </ul>
          </div>
        )}

        {/* 🎉 Congrats */}
      </div>
    );
  }

  return (
    <CarouselComp
      tittle="Quiz on Matthew"
      subTittle={`Your score: ${score}/${matthewQuizzes.length}`}
      Content={() => (
        <>
          {matthewQuizzes.map((quiz, index) => (
            <CarouselItem key={quiz.reference}>
              <Flashcard
                {...quiz}
                quizState={quizStates[index]}
                setQuizState={(partial: any) => setQuizState(index, partial)}
              />
            </CarouselItem>
          ))}

          {/* Final Slide - Finish Button */}
          <CarouselItem key="finish">
            <div className="flex flex-col justify-center items-center h-full space-y-6">
              <p className="text-xl font-semibold">Ready to finish the quiz?</p>
              <Button
                onClick={handleFinish}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Finish Quiz
              </Button>
              {unansweredIndexes.length > 0 && (
                <p className="text-sm text-red-600">
                  You have unanswered questions!
                </p>
              )}
            </div>
          </CarouselItem>
        </>
      )}
      quizStates={quizStates}
      setQuizState={setQuizState}
      quizzes={matthewQuizzes}
      score={score}
      setScore={setScore}
    />
  );
}
