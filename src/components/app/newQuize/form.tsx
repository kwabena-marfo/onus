/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CarouselItem } from "@/components/ui/carousel";
import Flashcard from "../flashCard";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import CarouselComp from "../carousel";

export default function VerseFlashcardCarousel() {
  return (
    <CarouselComp
      tittle="Quize on Mathew"
      subTittle="Complete the following quotes"
      Content={() => (
        <>
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
        </>
      )}
    />
  );
}
