/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import VersesTable from "@/components/app/tables/verses";

import { ComponentProps } from "react";
import { useGetOnus } from "@/hooks/global/useSWRFetch";

export default function SearchForm({ className }: ComponentProps<"form">) {
  const { onusData, mutateGetOnus } = useGetOnus();

  return (
    <>
      <div
        className={cn(
          "grid w-full gap-4 z-50 bg-white p-4 rounded-md",
          className
        )}
      >
        <div className="flex flex-col gap-0 justify-center items-center ">
          <p className="text-2xl md:text-4xl font-bold text-center">
            Search Through Your Verses
          </p>
        </div>
        {onusData?.verses?.length ? (
          <>
            <VersesTable
              searchGlobal={true}
              data={onusData?.verses}
              mutateGetOnus={mutateGetOnus}
            />
          </>
        ) : null}
      </div>
    </>
  );
}
