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

export default function BibleBook({ control, onusData }: any) {
  // Map book name -> verse count
  const verseMap =
    onusData?.grouped?.reduce((acc: any, entry: any) => {
      const book = Object.keys(entry)[0];
      const bookData = entry[book];
      acc[book] = bookData?.verses?.length || 0;
      return acc;
    }, {}) || {};

  return (
    <Controller
      control={control}
      name="book"
      rules={{ required: "Book is required" }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="w-full">
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger
              className={`w-full ${error ? "border-red-500" : ""}`}
            >
              <SelectValue placeholder="Select Book..." />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {bibleData.map((book: any, index: number) => {
                const currentBook = book.value;
                const prevBook = bibleData[index - 1]?.value;

                const isSelectable =
                  index === 0 || (verseMap[prevBook] ?? 0) >= 5;

                return (
                  <SelectItem
                    key={currentBook}
                    value={currentBook}
                    disabled={!isSelectable}
                  >
                    {book.label}
                    {!isSelectable && " (Complete previous first)"}
                  </SelectItem>
                );
              })}
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
