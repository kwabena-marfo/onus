/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";

export default function StatCard({
  label,
  value,
  Icon,
  isLoading,
  colorB,
  colorT,
  isError,
  link,
  Add,
  clickFunction,
}: any) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        if (link) return router.push(link);
        if (clickFunction) return clickFunction();
      }}
      className={`rounded-lg  p-2 bg-gray-50 border w-full h-full border-l-3 ${colorB} `}
    >
      <div
        className={`grid items-center space-x-1 text-gray-700 cursor-pointer`}
      >
        <Icon className={`md:w-8 md:h-8 w-6 h-6 ${colorT}`} />
        <p className={`md:text-lg text-sm font-bold line-clamp-1 `}>{label}</p>
      </div>
      <div className="flex justify-between items-center">
        {isLoading ? (
          <Skeleton className="h-4 w-full rounded-lg bg-gray-200" />
        ) : isError ? (
          <p>An Error Occured</p>
        ) : (
          <p
            className={`text-4xl md:text-5xl font-bold line-clamp-1 text-gray-700`}
          >
            {value}
          </p>
        )}

        {Add ? <Add /> : null}
      </div>
    </div>
  );
}
