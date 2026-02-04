/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  type CarouselApi,
} from "@/components/ui/carousel";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CarouselComp({
  Content,
  tittle,
  subTittle,
  onFinish,
  isError,
}: any) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    // ✅ Wrap synchronous state updates in requestAnimationFrame to avoid cascading renders
    const init = () => {
      setCount(api.scrollSnapList().length);
      setCurrentIndex(api.selectedScrollSnap());
    };
    requestAnimationFrame(init);

    // Event listener for when user selects a new slide
    const handleSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    // Cleanup listener on unmount or api change
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const handleNext = () => api?.scrollNext();
  const handlePrev = () => api?.scrollPrev();

  return (
    <div className="grid items-center gap-4 w-full text-gray-100 dark:text-gray-200">
      {/* Title Section */}
      <div className="flex flex-col justify-center items-center">
        <p className="font-extrabold text-3xl text-center capitalize text-gray-900 dark:text-gray-100">
          {tittle}
        </p>
        <p className="font-medium text-center text-lg text-gray-700 dark:text-gray-300">
          {subTittle}
        </p>
      </div>

      {/* Carousel */}
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          <Content />
        </CarouselContent>

        {/* Navigation & Info */}
        <div className="grid mt-4">
          <div className="flex gap-2 justify-center">
            <BsArrowLeft
              onClick={handlePrev}
              className="w-10 h-10 cursor-pointer text-gray-700 dark:text-gray-200 hover:text-green-400"
            />
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              Question {currentIndex + 1} of {count}
            </p>
            <BsArrowRight
              onClick={handleNext}
              className="w-10 h-10 cursor-pointer text-gray-700 dark:text-gray-200 hover:text-green-400"
            />
          </div>

          {/* Finish button on last slide */}
          {currentIndex === count - 1 && (
            <div className="flex flex-col mt-4 items-center">
              <Button
                onClick={onFinish}
                className="bg-green-600 hover:bg-green-700 text-white dark:text-gray-100 w-full"
              >
                Finish Quiz
              </Button>
              {isError && (
                <p className="text-red-400 mt-2">
                  Sorry, could not save quiz. Please try again.
                </p>
              )}
            </div>
          )}
        </div>
      </Carousel>
    </div>
  );
}
