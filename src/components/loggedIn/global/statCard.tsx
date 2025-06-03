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
  return isLoading ? (
    <Skeleton className="w-full h-[60px] rounded-md" />
  ) : (
    <div
      className={`rounded-lg  p-2 bg-gray-50 border w-full h-full border-t-4 ${colorB} `}
    >
      {isError ? (
        <>
          <div className="flex items-center space-x-1">
            <Icon className="w-4 h-4" />
            <p className="text-xs font-medium line-clamp-1">{label}</p>
          </div>
          <p className="text-sm text-red-500 line-clamp-1">
            Error fetching data
          </p>
        </>
      ) : (
        <>
          <>
            <div className={`grid items-center space-x-1 text-gray-700`}>
              <Icon className={`w-8 h-8 ${colorT}`} />
              <p
                className={`md:text-lg text-sm font-bold line-clamp-1 cursor-pointer`}
              >
                {label}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p
                onClick={() => {
                  if (link) return router.push(link);
                  if (clickFunction) return clickFunction();
                }}
                className={`text-4xl md:text-5xl font-bold line-clamp-1 text-gray-700`}
              >
                {value}
              </p>

              {Add ? <Add /> : null}
            </div>
          </>
        </>
      )}
    </div>
  );
}
