/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

import verses from "@/data/verses.json";
import bible from "@/data/bible.json";
import Content from "@/components/loggedIn/global/content";

import { BsBookmark } from "react-icons/bs";
import { Progress } from "@/components/ui/progress";
import Table from "@/components/loggedIn/saved/table";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState<any>();
  const [queryMembersResults, setQueryMembersResults] = useState();
  const [deepFilterFunction, setDeepFilterFunction] = useState<any>([]);
  console.log(queryMembersResults);
  return (
    <Content tittle="Saved Verses" Icon={BsBookmark}>
      <div className="grid justify-start items-start md:grid-cols-5 gap-4">
        <div className="rounded-lg  p-3 border md:col-span-3 col-span-5 ">
          <Table
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
              {bible.splice(0, 20).map(({ label, verses }: any) => {
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
              })}
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
}
