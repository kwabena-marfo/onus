/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import bibleData from "@/data/bible.json";

export default function BibleBook({ control }: any) {
  return (
    <Controller
      control={control}
      name="book"
      rules={{ required: "Book is required" }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="w-full">
          <Select
            onValueChange={(val) => {
              const foundBook = bibleData.find((b: any) => b.value === val);
              onChange(foundBook);
            }}
            value={value?.value}
          >
            <SelectTrigger
              className={`w-full ${error ? "border-red-500" : ""}`}
            >
              <SelectValue placeholder="Select Book..." />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {bibleData.map((book: any) => (
                <SelectItem key={book.value} value={book.value}>
                  {book.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && (
            <p className="text-sm text-red-500 mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
