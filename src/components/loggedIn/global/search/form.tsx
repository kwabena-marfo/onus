/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { ComponentProps } from "react";
import { BsX } from "react-icons/bs";

export default function SearchForm({ className }: ComponentProps<"form">) {
  return (
    <>
      <form
        className={cn(
          "grid w-full gap-4 z-50 bg-white p-4 rounded-md",
          className
        )}
      >
        <div className="flex flex-col gap-0 justify-center items-center ">
          <p className="text-3xl md:text-4xl font-bold">
            Search Through Your Verses
          </p>
          <p className="text-center">
            Your Journey to Spritual Growth Begins here
          </p>
        </div>
        <div className="grid md:flex gap-3">
          <div className=" relative w-full">
            <div className="flex items-center">
              <span className="absolute inset-y-0 right-2 flex items-center gap-0">
                <BsX className="cursor-pointer" />
              </span>
              <Input className="h-12 rounded-full" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
