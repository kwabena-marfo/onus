/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BsDatabaseSlash } from "react-icons/bs";

import { Progress } from "@/components/ui/progress";

export default function ProgressComp({ data }: any) {
  return (
    <div className="flex flex-col gap-1">
      <div className=" flex flex-col gap-4 w-full p-3 border rounded-lg">
        {!data?.length ? (
          <div className="flex flex-col justify-center items-center h-full">
            <BsDatabaseSlash className="w-12 h-12" />
            <p>No Data Found</p>
            <p>
              Your <strong> Progress </strong> will appear here
            </p>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-1">
            <div className="grid gap-6 rounded-lg   h-full">
              {data.map((entry: any) => {
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
    </div>
  );
}
