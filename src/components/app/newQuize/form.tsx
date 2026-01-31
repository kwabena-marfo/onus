/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import quizzes from "@/data/matthewQuiz.json";
import CarouselComp from "./carousel";
import { CarouselItem } from "@/components/ui/carousel";
import Flashcard from "./flashCard";
import Congratulations from "./congratulations";
import { LuClock, LuLoaderCircle } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { LucideRotateCw } from "lucide-react";
import { usePostOnusQuize } from "@/hooks/useQuery";

export default function QuizeFlashcardCarousel({ book }: any) {
  const selectedBook = quizzes.find(
    (q) => q.book.toLowerCase() === book.toLowerCase(),
  );

  const bookQuestions = selectedBook ? selectedBook.questions : [];

  const {
    trigger: createOnusQuize,
    isPending,
    isError,
    reset,
    isSuccess,
  } = usePostOnusQuize();

  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const [quizStates, setQuizStates] = useState(
    bookQuestions.map(() => ({
      selected: "",
      hasFlipped: false,
      wasCorrect: undefined,
    })),
  );

  const setQuizState = (index: number, partial: any) => {
    setQuizStates((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...partial };
      return copy;
    });
  };

  const handleFinish = async () => {
    let newScore = 0;

    const updatedStates: any = quizStates.map((state, index) => {
      const question = bookQuestions[index];
      const correctAnswer = question.options[question.correctAnswerIndex];
      const isCorrect = state.selected === correctAnswer;

      if (state.selected && isCorrect) newScore += 1;

      return {
        ...state,
        wasCorrect: state.selected ? isCorrect : undefined,
        hasFlipped: true,
      };
    });

    setQuizStates(updatedStates);
    setScore(newScore);

    await createOnusQuize({
      quizName: book,
      score: newScore,
      total: bookQuestions.length,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setFinished(true);
        reset();
      }, 0);
    }
  }, [isSuccess]);

  if (!selectedBook) {
    return (
      <div className="mt-6 text-center flex flex-col justify-center items-center capitalize text-gray-700 dark:text-gray-200">
        <LuClock className="h-12 w-12 text-gray-500 dark:text-gray-400" />
        <p className="text-3xl font-bold">STAY TUNED!</p>
        Quizzes for {book} are being added.
      </div>
    );
  }

  // ✅ Show result screen
  if (!isError && finished) {
    return (
      <div className="mt-6 text-center grid grid-cols-1 justify-self-center items-start text-gray-800 dark:text-gray-200">
        <Congratulations />

        <p className="text-lg">
          You got <strong>{score}</strong> out of{" "}
          <strong>{bookQuestions.length}</strong>
        </p>

        <Button
          onClick={() => {
            setQuizStates(
              bookQuestions.map(() => ({
                selected: "",
                hasFlipped: false,
                wasCorrect: undefined,
              })),
            );
            setScore(0);
            setFinished(false);
          }}
          className="mt-4 bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white"
        >
          Go Again <LucideRotateCw className="ml-2" />
        </Button>
      </div>
    );
  }

  // ✅ Loader
  if (isPending) {
    return (
      <LuLoaderCircle className="animate-spin justify-self-center h-20 w-20 text-gray-400 dark:text-gray-500" />
    );
  }

  // ✅ Main carousel
  return (
    <CarouselComp
      tittle={`Quiz on ${book}`}
      subTittle="Answer all questions and click Finish"
      Content={() =>
        bookQuestions.map((quiz, index) => (
          <CarouselItem key={quiz.reference}>
            <Flashcard
              {...quiz}
              quizState={quizStates[index]}
              setQuizState={(partial: any) => setQuizState(index, partial)}
            />
          </CarouselItem>
        ))
      }
      onFinish={handleFinish}
      isError={isError}
    />
  );
}
