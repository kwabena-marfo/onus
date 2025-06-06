/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default function VerseFlashcardCarousel({ verses }: any) {
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
    <Carousel setApi={setApi}>
      <CarouselContent className="p-3">
        {verses.map(({ reference, verse, tags, notes }: any, index: any) => (
          <CarouselItem
            className="flex flex-col rounded-xl gap-3 justify-center items-center bg-gray-100 p-3 "
            key={index}
          >
            <p className="md:text-4xl text-2xl text-gray-700 font-bold">
              {reference}
            </p>
            <p className="text-2xl text-gray-700 text-center">{verse}</p>
            <div className="flex gap-1 justify-center">
              {tags.map(({ name, color }: any, index: any) => (
                <Badge key={index} className={`rounded-full ${color}`}>
                  {name}
                </Badge>
              ))}
            </div>
            <Separator />
            <div className="flex flex-col justify-start items-start w-full">
              <p className="font-bold">My Notes</p>{" "}
              <p className="text-lg 2xl text-gray-700  ">{notes}</p>
            </div>
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
          {current} of {count}
        </p>
      </div>
    </Carousel>
  );
}
