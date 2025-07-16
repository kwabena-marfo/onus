/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetOnus, useGetOnusQuize } from "@/hooks/global/useSWRFetch";

import Content from "@/components/app/content";

import { LuLoaderCircle } from "react-icons/lu";
import { BsDatabaseSlash, BsLightbulb, BsTriangleFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import NewQuizeModal from "@/components/app/newQuize";

export default function Quizzes() {
  const { onusData, getOnusIsLoading, getOnusIsError } = useGetOnus();

  const {
    getOnusQuizeIsLoading,
    onusQuizeData,
    getOnusQuizeIsError,
    mutateGetOnusQuize,
  } = useGetOnusQuize();

  if (getOnusIsLoading || getOnusQuizeIsLoading)
    return <LuLoaderCircle className="animate-spin" />;

  if (getOnusIsError || getOnusQuizeIsError) return <BsTriangleFill />;

  const filteredBooks = onusData?.grouped.filter((entry: any) => {
    const book = Object.keys(entry)[0];
    const bookData = entry[book];
    return bookData.verses.length >= 5; // ✅ only books with 5 or more verses
  });

  return (
    <Content tittle="Quizzes" Icon={BsLightbulb}>
      <div className="grid  w-full  md:gap-6 gap-4 mt-6">
        <div className="grid h-full md:grid-cols-5  grid-cols-1 md:divide-x-2  gap-2 ">
          {!filteredBooks?.length ? (
            <div className="flex flex-col md:col-span-3 justify-center items-center   w-full ">
              <BsDatabaseSlash className="w-12 h-12" />
              <p>No Quizzes Found</p>
              <p>Your completed books will appear here for quizzes</p>
            </div>
          ) : (
            <div className="md:col-span-3 grid h-fit justify-center items-center md:grid-cols-4 grid-cols-2  gap-3 md:pr-2 pb-2">
              {filteredBooks.map((entry: any, index: any) => {
                const book = Object.keys(entry)[0]; // e.g. "matthew"

                const quizeScore = onusQuizeData?.find(
                  (item: any) => item.quizName?.toLowerCase() == book
                );

                return (
                  <div
                    key={index}
                    className="flex flex-col  rounded-lg gap-0 p-2 bg-gray-50 border border-l-4 border-l-[#8C15E8] hover:bg-[#8C15E8]/10"
                  >
                    <div className="flex  gap-1  items-center p-0">
                      <p className="md:text-xl text-left text-lg text-gray-700 font-bold capitalize">
                        {book}:
                      </p>
                    </div>
                    <p className="text-left text-md text-gray-600 font-medium -mt-1">
                      {quizeScore
                        ? `Latest Score: ${quizeScore?.score} / ${quizeScore?.total}`
                        : "No Quize yet"}
                    </p>

                    <Separator className="my-1" />
                    <div className="flex  gap-1 mt-2">
                      <NewQuizeModal
                        book={book}
                        mutateGetOnusQuize={mutateGetOnusQuize}
                        TriggerComp={() => (
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-fit cursor-pointer "
                          >
                            Quize Me <BsLightbulb />
                          </Button>
                        )}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Content>
  );
}
