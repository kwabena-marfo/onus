/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  type CarouselApi,
} from "@/components/ui/carousel";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default function CarouselComp({
  Content,
  tittle,
  subTittle,
  onSlideChange, // 👈 new prop
}: any) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    const newIndex = api.selectedScrollSnap();
    setCurrent(newIndex + 1);
    onSlideChange?.(newIndex); // 👈 notify parent of current index

    api.on("select", () => {
      const index = api.selectedScrollSnap();
      setCurrent(index + 1);
      onSlideChange?.(index); // 👈 notify parent again on every scroll
    });
  }, [api, onSlideChange]);

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
