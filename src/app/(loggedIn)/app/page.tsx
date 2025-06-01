/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";

import Content from "@/components/loggedIn/global/content";
import StatCard from "@/components/loggedIn/global/statCard";

import {
  BsEmojiSmile,
  BsBookHalf,
  BsBookFill,
  BsBookmarkFill,
  BsLightbulbFill,
} from "react-icons/bs";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import DasboardTable from "@/components/loggedIn/dashboard/table";

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
                link: "/app/onusbible",
                value: 66,
                colorB: "border-t-[#519A10]",
                colorT: "text-[#519A10]",
                icon: BsBookFill,
                isLoading: false,
                isError: false,
              },
              {
                label: "Saved",
                link: "/app/onusbible",
                value: 66,
                colorB: "border-t-[#8C15E8]",
                colorT: "text-[#8C15E8]",
                icon: BsBookmarkFill,
                isLoading: false,
                isError: false,
              },
              {
                label: "Books",
                link: "/app/onusbible",
                value: 66,
                colorB: "border-t-[#9A6A10]",
                colorT: "text-[#9A6A10]",
                icon: BsBookHalf,
                isLoading: false,
                isError: false,
              },
              {
                label: "Quizzes",
                link: "/app/onusbible",
                value: 66,
                colorB: "border-t-[#760606]",
                colorT: "text-[#760606]",
                icon: BsLightbulbFill,
                isLoading: false,
                isError: false,
              },
            ].map(
              (
                {
                  label,
                  link,
                  value,
                  colorB,
                  colorT,
                  icon,
                  isLoading,
                  isError,
                },
                index
              ) => (
                <Link href={link} key={index}>
                  <StatCard
                    label={label}
                    value={value}
                    colorB={colorB}
                    colorT={colorT}
                    Icon={icon}
                    isLoading={isLoading}
                    isError={isError}
                  />
                </Link>
              )
            )}
          </div>
          {/* Progress Area */}
          <div className="flex flex-col w-full gap-1">
            <h4 className="text-xl md:text-4xl font-bold text-gray-700  ">
              Your Progress
            </h4>{" "}
            <Card className="grid gap-6 p-4 bg-gray-50 h-full">
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
            </Card>
          </div>
        </div>

        <Card className=" md:col-span-3 col-span-5 ">
          <CardContent className="p-3">
            {/* <h4 className="text-xl md:text-4xl font-bold text-gray-700  ">
              Your Scriptures
            </h4>{" "} */}
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
          </CardContent>
        </Card>
      </div>
    </Content>
  );
}
