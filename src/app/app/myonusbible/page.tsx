/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";

import Content from "@/components/app/content";
import VerseFlashCardModal from "@/components/app/verseFlashcard";

import { BsDatabaseSlash } from "react-icons/bs";

import ProgressComp from "@/components/app/progress";
import { useGetVerses } from "@/hooks/useQuery";
import IsLoadingError from "@/components/app/isLoadingError";

export default function MyOnusBible() {
  const {
    data: onusData,
    isLoading: getOnusIsLoading,
    isError: getOnusIsError,
    error: getOnusError,
  } = useGetVerses();

  const filteredBooks = onusData?.grouped.filter((entry: any) => {
    const book = Object.keys(entry)[0];
    const bookData = entry[book];
    return bookData.verses.length >= 5; // ✅ only books with 5 or more verses
  });
  if (getOnusIsLoading || getOnusError)
    return (
      <IsLoadingError
        isLoading={getOnusIsLoading}
        error={getOnusError}
        isError={getOnusIsError}
      />
    );

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
      <div className="grid h-full md:grid-cols-5  grid-cols-1 gap-2 w-full ">
        {!filteredBooks?.length ? (
          <div className="flex flex-col col-span-5 md:col-span-3 justify-center  p-3 border rounded-lg items-center   w-full ">
            <BsDatabaseSlash className="w-12 h-12" />
            <p>No Data Found</p>
            <p>
              Your <strong> completed books </strong> will appear here
            </p>
          </div>
        ) : (
          <div className="md:col-span-3 col-span-5 grid h-fit justify-center items-center md:grid-cols-4 grid-cols-2   gap-3 md:pr-2 pb-2 w-full">
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
        <div className="col-span-5 md:col-span-2 flex flex-col gap-1 w-full  ">
          <ProgressComp data={onusData?.grouped || []} />
        </div>
      </div>
    </Content>
  );
}
