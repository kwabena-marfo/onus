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

    setCount(api.scrollSnapList().length);
    setCurrentIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const handleNext = () => {
    api?.scrollNext();
  };

  const handlePrev = () => {
    api?.scrollPrev();
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

        <div className="grid mt-4">
          <div className="flex gap-2 justify-center">
            <BsArrowLeft
              onClick={handlePrev}
              className="w-10 h-10 cursor-pointer"
            />
            <BsArrowRight
              onClick={handleNext}
              className="w-10 h-10 cursor-pointer"
            />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Question {currentIndex + 1} of {count}
          </p>

          {/* Finish button on last slide */}
          {currentIndex === count - 1 && (
            <div className="flex flex-col ">
              <Button
                onClick={onFinish}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white"
              >
                Finish Quiz
              </Button>
              {isError ? (
                <p className="text-red-400">
                  Sorry, could not save quize. Please try again
                </p>
              ) : null}
            </div>
          )}
        </div>
      </Carousel>
    </div>
  );
}
