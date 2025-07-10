/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CarouselItem } from "@/components/ui/carousel";
import Flashcard from "../flashCard";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CarouselComp from "../carousel";

export default function VerseFlashcardCarousel({ verses }: any) {
  return (
    <CarouselComp
      tittle="My ONUS Bible"
      subTittle="The Book Of Matthew"
      Content={() => (
        <>
          {verses?.map(
            (
              { book, verse, chapter, onusVerse, verseNotes, tags }: any,
              index: any
            ) => (
              <CarouselItem key={index}>
                <Flashcard
                  FrontComp={() => (
                    <div className="grid gap-3">
                      <p className="md:text-4xl text-2xl text-gray-700 font-bold uppercase">
                        {book} {chapter}:{verse}
                      </p>
                    </div>
                  )}
                  BackComp={() => (
                    <div className="flex flex-col justify-center items-center gap-3">
                      <p className="text-2xl text-gray-700 text-center">
                        {onusVerse}
                      </p>
                      <div className="flex gap-1 justify-center">
                        {tags?.map(({ tag, color }: any, index: any) => (
                          <Badge
                            key={index}
                            className={`rounded-full ${color}`}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {verseNotes ? (
                        <>
                          <Separator />
                          <div className="flex flex-col justify-center items-center w-full">
                            <p className="font-bold">My Notes</p>{" "}
                            <p className="text-lg 2xl text-gray-700  ">
                              {verseNotes}
                            </p>
                          </div>
                        </>
                      ) : null}
                    </div>
                  )}
                />
              </CarouselItem>
            )
          )}
        </>
      )}
    />
  );
}
