/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CarouselItem } from "@/components/ui/carousel";
import Flashcard from "../flashCard";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CarouselComp from "../carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import DOMPurify from "dompurify";

export default function VerseFlashcardCarousel({ verses }: any) {
  return (
    <CarouselComp
      tittle="My ONUS"
      subTittle="The Book Of Matthew"
      Content={() => (
        <>
          {verses?.map(
            (
              {
                book,
                verse,
                verseTo,
                chapter,
                onusVerse,
                verseNotes,
                tags,
              }: any,
              index: any,
            ) => (
              <CarouselItem key={index}>
                <Flashcard
                  FrontComp={() => (
                    <div className="grid gap-3">
                      <p className="md:text-4xl text-2xl font-bold uppercase text-gray-900 dark:text-gray-100">
                        {book} {chapter}:{verse}
                        {verseTo ? `-${verseTo}` : ""}
                      </p>
                    </div>
                  )}
                  BackComp={() => (
                    <ScrollArea className="min-h-[200px] py-6 px-4 flex flex-col justify-center items-center gap-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl border border-gray-300 dark:border-gray-700">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(onusVerse),
                        }}
                        className="md:text-2xl text-center"
                      />

                      <div className="flex gap-1 justify-center flex-wrap">
                        {tags?.map(({ tag, color }: any, index: any) => (
                          <Badge
                            key={index}
                            className={`rounded-full ${color} text-white`}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {verseNotes && (
                        <>
                          <Separator className="border-gray-300 dark:border-gray-600" />
                          <div className="flex flex-col justify-center items-center w-full">
                            <p className="font-bold text-gray-900 dark:text-gray-100">
                              My Notes
                            </p>
                            <p className="text-lg text-center text-gray-700 dark:text-gray-200">
                              {verseNotes}
                            </p>
                          </div>
                        </>
                      )}
                    </ScrollArea>
                  )}
                />
              </CarouselItem>
            ),
          )}
        </>
      )}
    />
  );
}
