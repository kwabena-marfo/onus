/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

import Content from "@/components/loggedIn/global/content";
import StatCard from "@/components/loggedIn/global/statCard";

import {
  BsEmojiSmile,
  BsBookHalf,
  BsBookmarkFill,
  BsLightbulbFill,
  BsPlusCircleFill,
} from "react-icons/bs";
import { Progress } from "@/components/ui/progress";
import DasboardTable from "@/components/loggedIn/dashboard/table";
import Image from "next/image";
import AddVerseModal from "@/components/loggedIn/global/addVerse";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState<any>();
  const [queryMembersResults, setQueryMembersResults] = useState();
  const [deepFilterFunction, setDeepFilterFunction] = useState<any>([]);
  console.log(queryMembersResults);
  return (
    <Content tittle="Hello Frank!" Icon={BsEmojiSmile}>
      <div className="grid justify-start items-start md:grid-cols-5 gap-4">
        <div className="flex flex-col justify-start items-start col-span-5 md:col-span-2 gap-8 ">
          {/* StatCard Area */}
          <div className="grid grid-cols-2  gap-4 w-full">
            {[
              {
                label: "Memorised",
                link: "/myonusbible",
                value: 66,
                colorB: "border-t-[#0F3187]",
                colorT: "text-[#0F3187]",
                icon: () => (
                  <Image
                    priority
                    width={30}
                    height={30}
                    src="/imgs/logos/onusKnot.png"
                    alt="logo"
                  />
                ),
                isLoading: false,
                isError: false,
                Add: () => (
                  <AddVerseModal
                    TriggerComp={() => (
                      <BsPlusCircleFill
                        className={`md:w-10 md:h-10 h-8 w-8 text-[#0F3187]`}
                      />
                    )}
                  />
                ),
              },
              {
                label: "Saved",
                link: "/saved",
                value: 66,
                colorB: "border-t-[#8C15E8]",
                colorT: "text-[#8C15E8]",
                icon: BsBookmarkFill,
                isLoading: false,
                isError: false,
                Add: () => (
                  <AddVerseModal
                    TriggerComp={() => (
                      <BsPlusCircleFill
                        className={`md:w-10 md:h-10 h-8 w-8 text-[#8C15E8]`}
                      />
                    )}
                  />
                ),
              },
              {
                label: "Books",
                value: 66,
                colorB: "border-t-[#9A6A10]",
                colorT: "text-[#9A6A10]",
                icon: BsBookHalf,
                isLoading: false,
                isError: false,
              },
              {
                label: "Quizzes",
                link: "/quize",
                value: 66,
                colorB: "border-t-[#760606]",
                colorT: "text-[#760606]",
                icon: BsLightbulbFill,
                isLoading: false,
                isError: false,
              },
            ].map(
              (
                { label, value, colorB, colorT, Add, icon, isLoading, isError },
                index
              ) => (
                <StatCard
                  key={index}
                  label={label}
                  value={value}
                  colorB={colorB}
                  colorT={colorT}
                  Add={Add}
                  Icon={icon}
                  isLoading={isLoading}
                  isError={isError}
                />
              )
            )}
          </div>
          {/* Progress Area */}
          <div className="flex flex-col w-full gap-1">
            <h4 className="text-xl md:text-4xl font-bold text-gray-700  ">
              Your Progress
            </h4>{" "}
            <div className="grid gap-6 rounded-lg  p-3 bg-gray-50 border h-full">
              {[
                { book: "Matthew", progress: 33 },
                { book: "Matthew", progress: 50 },
                { book: "Matthew", progress: 90 },
                { book: "Matthew", progress: 80 },
                { book: "Matthew", progress: 20 },
                { book: "Matthew", progress: 20 },
                { book: "Matthew", progress: 20 },
              ].map(({ book, progress }: any) => (
                <div key={book} className="grid">
                  <p>{book}</p>
                  <Progress value={progress} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg  p-3 border md:col-span-3 col-span-5 ">
          <DasboardTable
            data={{
              setQueryMembersResults,
              setSearchQuery,
              setDeepFilterFunction,
              deepFilterFunction,
              queryMembersResults: new Array(10).fill(""),
              searchQuery,
            }}
          />
        </div>
      </div>
    </Content>
  );
}
