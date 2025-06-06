/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";

import Content from "@/components/loggedIn/global/content";
import VerseFlashCardModal from "@/components/loggedIn/global/verseFlashcard";
import bible from "@/data/bible.json";
import bibleVerses from "@/data/verses.json";
import versesGrouped from "@/data/groupedVerses";

export default function MyOnusBible() {
  const verses = versesGrouped(bibleVerses as any, bible);

  return (
    <Content
      tittle="My Onus Bible"
      Icon={() => (
        <Image
          priority
          width={25}
          height={25}
          src="/imgs/logos/onusKnot.png"
          alt="logo"
        />
      )}
    >
      <div className="grid  w-full  md:gap-6 gap-4 mt-6">
        <div className="grid h-fit  gap-2 ">
          <div className="grid h-fit justify-center items-center md:grid-cols-6 grid-cols-2  gap-3 md:pr-2 pb-2">
            {verses.map(({ book, verses }, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg  gap-0 p-2 bg-gray-50 border cursor-pointer border-l-3 border-l-[#8C15E8] hover:bg-[#8C15E8]/10"
              >
                <VerseFlashCardModal
                  verses={verses}
                  TriggerComp={() => (
                    <>
                      <p className="md:text-xl text-left text-lg text-gray-700 font-bold">
                        {book}
                      </p>
                      <p className="text-left">{verses.length}</p>
                    </>
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Content>
  );
}
