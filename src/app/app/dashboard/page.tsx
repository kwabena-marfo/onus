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
            {[
              {
                label: "Memorised Verses",
                link: "/myonusbible",
                value: 66,
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
                value: 66,
                colorB: "border-l-[#8C15E8]",
                colorT: "text-[#8C15E8]",
                icon: BsBookmarkFill,
                isLoading: false,
                isError: false,
              },
              {
                label: "Completed Books",
                value: 66,
                colorB: "border-l-[#9A6A10]",
                colorT: "text-[#9A6A10]",
                icon: BsBookHalf,
                isLoading: false,
                isError: false,
              },
              {
                label: "Quizzes So Far",
                link: "/quize",
                value: 66,
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
          </div>
          <div className="flex flex-col w-full gap-1">
            <div className="grid gap-6 rounded-lg  p-3 bg-gray-50 border h-full">
              <h4 className="text-xl md:text-4xl font-bold text-gray-700  ">
                Your Progress
              </h4>{" "}
              <div className="grid">
                <p>Matthew</p>
                <Progress value={Math.min(800 * 100, 100)} />
              </div>{" "}
              <div className="grid">
                <p>Matthew</p>
                <Progress value={Math.min(800 * 100, 100)} />
              </div>
              {/* {bible.splice(0, 20).map(({ label, verses }: any) => {
                return (
                  <div key={label} className="grid">
                    <p>{label}</p>
                    <Progress
                      value={Math.min(
                        (Math.floor(Math.random() * (verses + 1)) / verses) *
                          100,
                        100
                      )}
                    />
                  </div>
                );
              })} */}
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4 w-full p-3 border rounded-lg">
          {getOnusIsLoading ? (
            <TableSkeleton />
          ) : getOnusIsError ? (
            <p>Sorry an error occured</p>
          ) : (
            <DasboardTable data={onusData} />
          )}
        </div>
      </div>
    </Content>
  );
}
