/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Flashcard from "./flashCard";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function VerseFlashcardCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="grid items-center gap-2 w-full">
      <div className="flex flex-col justify-center items-center">
        <p className="font-extrabold text-3xl text-center">Quize on Mathew</p>{" "}
        <p>Complete the following quotes</p>
      </div>
      <Carousel setApi={setApi} className=" w-full">
        <CarouselContent>
          {[
            {
              front: () => (
                <div className="grid gap-3">
                  <p className="text-lg">Blessed are the poor in heart....</p>{" "}
                  <RadioGroup defaultValue="">
                    {[
                      "Believe in my word and follow me.",
                      "Follow the cross to be saved.",
                      "Become my disciples.",
                      "Take up their cross and follow me.",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem id={`option-${index}`} value={item} />
                        <Label
                          htmlFor={`option-${index}`}
                          className="text-sm font-medium"
                        >
                          {item}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ),
              back: () => (
                <div>
                  <p className="text-lg font-semibold mb-2">Correct Answer:</p>
                  <p>For they will see God. (Matthew 5:8)</p>
                </div>
              ),
            },
          ].map((card, index) => (
            <CarouselItem key={index}>
              <Flashcard FrontComp={card.front} BackComp={card.back} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="grid">
          <div className="flex gap-1 justify-center">
            <BsArrowLeft
              onClick={() => api?.scrollPrev()}
              className="w-12 h-12 cursor-pointer"
            />
            <BsArrowRight
              onClick={() => api?.scrollNext()}
              className="w-12 h-12 cursor-pointer"
            />
          </div>
          <p className="text-center">
            Question {current} of {count}
          </p>
        </div>
      </Carousel>
    </div>
  );
}
