/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";

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
  clickFunction,
}: any) {
  const router = useRouter();
  return isLoading ? (
    <Skeleton className="w-full h-[60px] rounded-md" />
  ) : (
    <Card
      className={`w-full h-full border-t-4 ${colorB} bg-gray-50 cursor-pointer`}
    >
      <CardContent className="p-3 space-y-1">
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
              <div
                onClick={() => {
                  if (link) return router.push(link);
                  if (clickFunction) return clickFunction();
                }}
                className={`grid items-center space-x-1 text-gray-700`}
              >
                <Icon className={`w-8 h-8 ${colorT}`} />
                <p className={`md:text-2xl text-sm font-medium line-clamp-1`}>
                  {label}
                </p>
              </div>
              <p
                className={`text-4xl md:text-5xl font-bold line-clamp-1 text-gray-700`}
              >
                {value}
              </p>
            </>
          </>
        )}
      </CardContent>
    </Card>
  );
}
