/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import VersesTable from "@/components/app/tables/verses";
import { ComponentProps } from "react";
import { useGetOnus } from "@/hooks/global/useSWRFetch";
import IsLoadingError from "../isLoadingError";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SearchForm({ className }: ComponentProps<"form">) {
  const { onusData, getOnusIsLoading, getOnusIsError, mutateGetOnus } =
    useGetOnus();

  if (getOnusIsLoading || getOnusIsError)
    return (
      <IsLoadingError isLoading={getOnusIsLoading} isError={getOnusIsError} />
    );

  return (
    <div className={cn("grid w-full gap-4 z-50 p-4 rounded-md", className)}>
      <p className="text-center font-semibold">SEARCH HERE</p>

      {onusData ? (
        <ScrollArea className="h-[70vh] w-full rounded-md border">
          <VersesTable data={onusData.verses} mutateGetOnus={mutateGetOnus} />
        </ScrollArea>
      ) : null}
    </div>
  );
}
