/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Content from "@/components/loggedIn/global/content";

import { BsArrowLeft, BsArrowRight, BsBookHalf, BsX } from "react-icons/bs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  return (
    <Content tittle="Saved Verses" Icon={BsBookHalf}>
      <div className="grid justify-start items-start md:grid-cols-6 gap-4">
        <div className="flex flex-col justify-start items-start col-span-6 md:col-span-2 p-3 border rounded-lg gap-3 ">
          <div className="w-full relative">
            <div className="flex items-center">
              <span className="absolute inset-y-0 right-2 flex items-center gap-0">
                <BsX className="cursor-pointer" />
              </span>
            </div>
            <Input
              placeholder="Search here..."
              className=" rounded-full h-12 bg-gray-50 "
            />
          </div>
          <div className="grid grid-cols-2  gap-3 w-full">
            {[
              "Matthew",
              "Mark",
              "Luke",
              "John",
              "Acts",
              "Romans",
              "1 Corinthians",
              "2 Corinthians",
              "Galatians",
              "Ephesians",
              "Philippians",
              "Colossians",
              "1 Thessalonians",
              "2 Thessalonians",
              "1 Timothy",
              "2 Timothy",
              "Titus",
              "Philemon",
              "Hebrews",
              "James",
              "1 Peter",
              "2 Peter",
              "1 John",
              "2 John",
              "3 John",
              "Jude",
              "Revelation",
            ].map((label, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg  gap-0 p-2 bg-gray-50 border cursor-pointer "
              >
                <p className="text-xl text-gray-700 font-bold">{label}</p>
                <p>5 Verses</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col rounded-lg justify-start items-center bg-gray-50 border  relative md:col-span-4 col-span-6 py-4 ">
          <div className="flex flex-col rounded-lg  gap-3 p-6 md:border justify-center bg-gray-50 md:bg-white items-center md:m-24">
            <p className="md:text-4xl text-gray-700 font-bold">Matthew 7:7</p>
            <p className="text-2xl text-gray-700 text-center">
              Ask, and it will be given to you; seek, and you will find; knock,
              and the door will be opened to you.Ask, and it will be given t
              Ask, and it will be given to you; seek, and you will find; knock,
              and the door will be opened to you.Ask, and it will be given t
            </p>
            <div className="flex gap-1 justify-center">
              Tags: <Badge className="rounded-full  bg-[#0F3187] ">Faith</Badge>
              <Badge className="rounded-full  bg-[#0F3187] ">Faith</Badge>
            </div>
            <Separator />
            <div className="flex flex-col justify-start items-start w-full">
              <p>My Notes</p>{" "}
              <p className="text-lg 2xl text-gray-700  ">
                Ask, and it will be given to you; seek, and you will find;
                knock, and the door will be opened to you.Ask, and it will be
                given t Ask, and it will be given to you; seek, and you will
                find; knock, and the door will be opened to you.Ask, and it will
                be given t
              </p>
            </div>
          </div>
          <div className="flex gap-1 justify-center">
            <BsArrowLeft className="w-12 h-12" />
            <BsArrowRight className="w-12 h-12" />
          </div>
          <p>1 of 5</p>
        </div>
      </div>
    </Content>
  );
}
