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
        {onusData?.verses?.length ? (
          <>
            <VersesTable
              data={onusData?.verses}
              mutateGetOnus={mutateGetOnus}
            />
          </>
        ) : null}
      </div>
    </>
  );
}
