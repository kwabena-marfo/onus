/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

import verses from "@/data/verses.json";

import Content from "@/components/loggedIn/global/content";

import { BsBookmark } from "react-icons/bs";
import { Progress } from "@/components/ui/progress";
import SavedTable from "@/components/loggedIn/saved/table";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState<any>();
  const [queryMembersResults, setQueryMembersResults] = useState();
  const [deepFilterFunction, setDeepFilterFunction] = useState<any>([]);
  console.log(queryMembersResults);
  return (
    <Content tittle="Saved Verses" Icon={BsBookmark}>
      <div className="grid justify-start items-start md:grid-cols-5 gap-4">
        <div className="rounded-lg  p-3 border md:col-span-3 col-span-5 ">
          <SavedTable
            data={{
              setQueryMembersResults,
              setSearchQuery,
              setDeepFilterFunction,
              deepFilterFunction,
              queryMembersResults: verses,
              searchQuery,
            }}
          />
        </div>
        <div className="flex flex-col justify-start items-start col-span-5 md:col-span-2 gap-8 ">
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
      </div>
    </Content>
  );
}
