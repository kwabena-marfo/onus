/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";

import Content from "@/components/loggedIn/content";
import StatCard from "@/components/loggedIn/statCard";

import { BsPeople, BsEmojiSmile } from "react-icons/bs";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <Content tittle="Hello Frank!" Icon={BsEmojiSmile}>
      <div className="grid  md:grid-cols-5 gap-4">
        <div className="grid col-span-2 gap-8">
          {/* StatCard Area */}
          <div className="grid grid-cols-2  gap-4">
            {[
              {
                label: "Memorised",
                link: "/app/onusbible",
                value: 66,
                borderColor: "border-t-[#655df0]",
                icon: BsPeople,
                isLoading: false,
                isError: false,
              },
              {
                label: "Memorised",
                link: "/app/onusbible",
                value: 66,
                borderColor: "border-t-[#655df0]",
                icon: BsPeople,
                isLoading: false,
                isError: false,
              },
              {
                label: "Memorised",
                link: "/app/onusbible",
                value: 66,
                borderColor: "border-t-[#655df0]",
                icon: BsPeople,
                isLoading: false,
                isError: false,
              },
              {
                label: "Memorised",
                link: "/app/onusbible",
                value: 66,
                borderColor: "border-t-[#655df0]",
                icon: BsPeople,
                isLoading: false,
                isError: false,
              },
            ].map(
              (
                { label, link, value, borderColor, icon, isLoading, isError },
                index
              ) => (
                <Link href={link} key={index}>
                  <StatCard
                    label={label}
                    value={value}
                    borderColor={borderColor}
                    Icon={icon}
                    isLoading={isLoading}
                    isError={isError}
                  />
                </Link>
              )
            )}
          </div>
          {/* Progress Area */}
          <div className="grid gap-3">
            <h4 className="text-md md:text-3xl font-bold text-gray-700  ">
              Your Progress
            </h4>{" "}
            <Card className="grid gap-6 p-4 bg-gray-100 h-full">
              {[
                { book: "Matthew", progress: 33 },
                { book: "Matthew", progress: 33 },
                { book: "Matthew", progress: 33 },
                { book: "Matthew", progress: 33 },
                { book: "Matthew", progress: 33 },
              ].map(({ book, progress }: any) => (
                <div key={book} className="grid">
                  <p>{book}</p>
                  <Progress value={progress} />
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </Content>
  );
}
