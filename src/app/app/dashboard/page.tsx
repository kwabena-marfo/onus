/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import { useState } from "react";
import { useSession } from "next-auth/react";
import { useGetOnus } from "@/hooks/global/useSWRFetch";
// import verses from "@/data/verses.json";
// import bible from "@/data/bible.json";

import Content from "@/components/loggedIn/global/content";
import StatCard from "@/components/loggedIn/global/statCard";

import {
  BsEmojiSmile,
  BsBookHalf,
  BsBookmarkFill,
  BsLightbulbFill,
} from "react-icons/bs";
// import { Progress } from "@/components/ui/progress";
import DasboardTable from "@/components/loggedIn/tables/dashboard";
import Image from "next/image";
import { LuLoaderCircle } from "react-icons/lu";
import { TableSkeleton } from "@/components/loggedIn/tables/skeleton";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  // const [searchQuery, setSearchQuery] = useState<any>();

  const { status, data: session } = useSession<any>();

  const { onusData, getOnusIsLoading, getOnusIsError } = useGetOnus();

  if (status === "loading")
    return (
      <div className="h-dvh grid justify-center items-center-center  ">
        <p>Loading</p>
        <LuLoaderCircle className="animate-spin text-black h-10 w-7" />
      </div>
    );

  return (
    <Content
      tittle={`Hello ${session?.user?.name?.split(" ")[0]}!`}
      Icon={BsEmojiSmile}
    >
      <div className="grid grid-cols-1 md:grid-cols-6 md:gap-4 gap-6">
        <div
          id="stat"
          className="col-span-12 md:col-span-2 flex flex-col gap-4 w-full"
        >
          {" "}
          <div className="grid grid-cols-2  gap-4 w-full">
            {getOnusIsLoading ? (
              new Array(4)
                .fill(" ")
                .map((_, index) => (
                  <Skeleton className="h-28 w-full" key={index} />
                ))
            ) : (
              <>
                {[
                  {
                    label: "Memorised Verses",
                    link: "/myonusbible",
                    value: onusData?.verses?.filter(
                      ({ memorised }: any) => memorised === "memorised"
                    )?.length,
                    colorB: "border-l-[#0F3187]",
                    colorT: "text-[#0F3187]",
                    icon: () => (
                      <div className="relative w-6 h-7 md:w-8 md:h-9">
                        <Image
                          priority
                          fill
                          src="/imgs/logos/onusKnot.png"
                          alt="logo"
                        />
                      </div>
                    ),
                    isLoading: false,
                    isError: false,
                  },
                  {
                    label: "Saved Verses",
                    link: "/saved",
                    value: onusData?.verses?.filter(
                      ({ memorised }: any) => memorised === "saved"
                    )?.length,
                    colorB: "border-l-[#8C15E8]",
                    colorT: "text-[#8C15E8]",
                    icon: BsBookmarkFill,
                    isLoading: false,
                    isError: false,
                  },
                  {
                    label: "Completed Books",
                    value: onusData?.grouped?.reduce(
                      (count: any, entry: any) => {
                        const bookName = Object.keys(entry)[0];
                        const bookData = entry[bookName];

                        return bookData.memorised >= 5 ? count + 1 : count;
                      },
                      0
                    ),
                    colorB: "border-l-[#9A6A10]",
                    colorT: "text-[#9A6A10]",
                    icon: BsBookHalf,
                    isLoading: false,
                    isError: false,
                  },
                  {
                    label: "Quizzes So Far",
                    link: "/quize",
                    value: 0,
                    colorB: "border-l-[#760606]",
                    colorT: "text-[#760606]",
                    icon: BsLightbulbFill,
                    isLoading: false,
                    isError: false,
                  },
                ].map(
                  (
                    { label, value, colorB, colorT, icon, isLoading, isError },
                    index
                  ) => (
                    <StatCard
                      key={index}
                      label={label}
                      value={value}
                      colorB={colorB}
                      colorT={colorT}
                      Icon={icon}
                      isLoading={isLoading}
                      isError={isError}
                    />
                  )
                )}
              </>
            )}
          </div>
          {!onusData || !onusData.grouped ? (
            <p>No progress to show</p>
          ) : (
            <div className="flex flex-col w-full gap-1">
              <div className="grid gap-6 rounded-lg p-3 bg-gray-50 border h-full">
                <h4 className="text-xl md:text-4xl font-bold text-gray-700">
                  Your Progress
                </h4>

                {onusData.grouped.map((entry: any) => {
                  const bookName = Object.keys(entry)[0];
                  const { memorised } = entry[bookName];

                  if (!memorised) return null; // Hide if memorised = 0

                  const percentage = Math.min(
                    Math.round((memorised / 5) * 100),
                    100
                  );

                  return (
                    <div key={bookName} className="grid gap-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-600 capitalize">
                          {bookName}
                        </p>
                        <p className="text-sm text-gray-500">{percentage}%</p>
                      </div>
                      <Progress value={percentage} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4 w-full p-3 border rounded-lg">
          {getOnusIsLoading ? (
            <TableSkeleton />
          ) : getOnusIsError ? (
            <p>Sorry an error occured</p>
          ) : (
            <DasboardTable data={onusData?.verses || []} />
          )}
        </div>
      </div>
    </Content>
  );
}
