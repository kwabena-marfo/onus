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
      className={`
        rounded-lg p-3 w-full h-full cursor-pointer
        bg-card text-foreground border border-border
        border-l-4 ${colorB}
        transition-colors
      `}
    >
      <div className="grid items-center space-y-1">
        <Icon className={`md:w-8 md:h-8 w-6 h-6 ${colorT}`} />
        <p className="md:text-lg text-sm font-semibold line-clamp-1">{label}</p>
      </div>

      <div className="flex justify-between items-center mt-2">
        {isLoading ? (
          <Skeleton className="h-6 w-full rounded-lg bg-muted" />
        ) : isError ? (
          <p className="text-destructive text-sm">An error occurred</p>
        ) : (
          <p className="text-4xl md:text-5xl font-bold line-clamp-1">{value}</p>
        )}

        {Add ? <Add /> : null}
      </div>
    </div>
  );
}
