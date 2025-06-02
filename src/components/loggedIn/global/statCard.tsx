/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { BsPlusCircleFill } from "react-icons/bs";
import Link from "next/link";

export default function StatCard({
  label,
  value,
  Icon,
  isLoading,
  colorB,
  colorT,
  isError,
  link,
  add,
  clickFunction,
}: any) {
  const router = useRouter();
  return isLoading ? (
    <Skeleton className="w-full h-[60px] rounded-md" />
  ) : (
    <Card className={`w-full h-full border-t-4 ${colorB} bg-gray-50 `}>
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
              <div className={`grid items-center space-x-1 text-gray-700`}>
                <Icon className={`w-8 h-8 ${colorT}`} />
                <p
                  className={`md:text-2xl text-sm font-medium line-clamp-1 cursor-pointer`}
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

                {add ? (
                  <Link href="#">
                    <BsPlusCircleFill className="w-10 h-10 text-gray-700" />
                  </Link>
                ) : null}
              </div>
            </>
          </>
        )}
      </CardContent>
    </Card>
  );
}
