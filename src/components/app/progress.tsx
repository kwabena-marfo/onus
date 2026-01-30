/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BsDatabaseSlash } from "react-icons/bs";
import { Progress } from "@/components/ui/progress";

export default function ProgressComp({ data }: any) {
  return (
    <div className="flex flex-col gap-1">
      {!data?.length ? (
        <div className="flex flex-col gap-4 w-full p-3 border rounded-lg">
          <div className="flex flex-col justify-center items-center h-full text-center">
            <BsDatabaseSlash className="w-12 h-12" />
            <p>No Data Found</p>
            <p>
              Your <strong>progress</strong> will appear here
            </p>
          </div>
        </div>
      ) : (
        <>
          {data.map((entry: any) => {
            const bookName = Object.keys(entry)[0];
            const { memorised = 0 } = entry[bookName];

            // ✅ Hide if no progress OR already completed
            if (memorised === 0 || memorised >= 5) return null;

            const percentage = Math.round((memorised / 5) * 100);

            return (
              <div
                key={bookName}
                className="flex flex-col gap-4 w-full p-3 border rounded-lg"
              >
                <div className="grid gap-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-700 capitalize">
                      {bookName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {memorised} / 5 verses
                    </p>
                  </div>

                  <Progress value={percentage} />

                  <p className="text-xs text-gray-400 text-right">
                    {percentage}% complete
                  </p>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
