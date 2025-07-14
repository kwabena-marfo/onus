/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";

import { useGetOnus } from "@/hooks/global/useSWRFetch";

import Content from "@/components/app/content";
import VerseFlashCardModal from "@/components/app/verseFlashcard";

import { LuLoaderCircle } from "react-icons/lu";
import { BsDatabaseSlash, BsTriangleFill } from "react-icons/bs";
import ProgressComp from "@/components/app/progress";

export default function MyOnusBible() {
  const { onusData, getOnusIsLoading, getOnusIsError } = useGetOnus();

  if (getOnusIsLoading) return <LuLoaderCircle className="animate-spin" />;

  if (getOnusIsError) return <BsTriangleFill />;

  const filteredBooks = onusData?.grouped.filter((entry: any) => {
    const book = Object.keys(entry)[0];
    const bookData = entry[book];
    return bookData.verses.length >= 5; // ✅ only books with 5 or more verses
  });

  return (
    <Content
      tittle="My ONUS Bible"
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
        <div className="grid h-full md:grid-cols-5  grid-cols-1 md:divide-x-2  gap-2 ">
          {!filteredBooks?.length ? (
            <div className="flex flex-col md:col-span-3 justify-center items-center   w-full ">
              <BsDatabaseSlash className="w-12 h-12" />
              <p>No Data Found</p>
              <p>Your completed books will appear here</p>
            </div>
          ) : (
            <div className="md:col-span-3 grid h-fit justify-center items-center md:grid-cols-4 grid-cols-2  gap-3 md:pr-2 pb-2">
              {filteredBooks.map((entry: any, index: any) => {
                const book = Object.keys(entry)[0]; // e.g. "matthew"
                const bookData = entry[book]; // e.g. { memorised: 2, saved: 1, verses: [...] }
                const verses = bookData.verses;

                return (
                  <VerseFlashCardModal
                    key={index}
                    verses={verses}
                    TriggerComp={() => (
                      <div className="flex flex-col  rounded-lg gap-0 p-2 bg-gray-50 border border-l-4 border-l-[#8C15E8] hover:bg-[#8C15E8]/10">
                        <p className="md:text-xl text-left text-lg text-gray-700 font-bold capitalize">
                          {book}:
                        </p>
                        <p className="text-left text-md text-gray-600 ">
                          {verses.length} Verses
                        </p>
                      </div>
                    )}
                  />
                );
              })}
            </div>
          )}
          <ProgressComp data={onusData?.grouped || []} />
        </div>
      </div>
    </Content>
  );
}
