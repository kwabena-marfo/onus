/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import quizzes from "@/data/matthewQuiz.json";
import CarouselComp from "./carousel";
import { CarouselItem } from "@/components/ui/carousel";
import Flashcard from "./flashCard";
import Congratulations from "./congratulations";
import useTriggerRequest from "@/hooks/global/useTriggerRequest";
import { LuClock, LuLoaderCircle } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { LucideRotateCw } from "lucide-react";

export default function QuizeFlashcardCarousel({
  book,
  mutateGetOnusQuize,
}: any) {
  // ✅ Extract questions for the current book
  const selectedBook = quizzes.find(
    (q) => q.book.toLowerCase() === book.toLowerCase()
  );

  const bookQuestions = selectedBook ? selectedBook.questions : [];

  const {
    reqFunction: createOnusQuize,
    reqState: createOnusQuizeStates,
    setReqState: resetCreateOnusQuizeStates,
  } = useTriggerRequest();

  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const [quizStates, setQuizStates] = useState(
    bookQuestions.map(() => ({
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
      route: "/api/app/create-onus-quize",
      reqType: "post",
      data: {
        quizName: book,
        score: newScore,
        total: bookQuestions.length,
      },
    });
  };

  useEffect(() => {
    if (createOnusQuizeStates?.data) {
      mutateGetOnusQuize();
      setFinished(true);
      resetCreateOnusQuizeStates(null);
    }
  }, [createOnusQuizeStates]);

  if (!selectedBook) {
    return (
      <div className="mt-6 text-center flex flex-col justify-center items-center capitalize">
        <LuClock className="h-12 w-12 " />
        <p className="text-3xl font-bold">STAY TUNED!</p>
        Quizzes for {book} are being added.
      </div>
    );
  }

  // ✅ Show result screen
  if (!createOnusQuizeStates?.error && finished) {
    return (
      <div className="mt-6 text-center grid grid-cols-1 justify-self-center items-start">
        <Congratulations />

        <p className="text-lg">
          You got <strong>{score}</strong> out of{" "}
          <strong>{bookQuestions.length}</strong>
        </p>

        {/* Not Attempted */}
        {/* {quizStates.some((q) => !q.selected) && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-red-500">
              Not Attempted
            </h3>
            <ul className="list-disc list-inside">
              {bookQuestions.map((quiz, index) => {
                if (!quizStates[index].selected) {
                  return <li key={quiz.reference}>{quiz.reference}</li>;
                }
                return null;
              })}
            </ul>
          </div>
        )} */}

        <Button
          onClick={() => {
            setQuizStates(
              bookQuestions.map(() => ({
                selected: "",
                hasFlipped: false,
                wasCorrect: undefined,
              }))
            );
            setScore(0);
            setFinished(false);
          }}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white"
        >
          Go Again <LucideRotateCw className="ml-2" />
        </Button>
      </div>
    );
  }

  // ✅ Loading state
  if (createOnusQuizeStates?.pending) {
    return (
      <LuLoaderCircle className="animate-spin justify-self-center h-20 w-20 text-gray-400" />
    );
  }

  // ✅ Quiz carousel
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
      createOnusQuizeStates={createOnusQuizeStates}
    />
  );
}
