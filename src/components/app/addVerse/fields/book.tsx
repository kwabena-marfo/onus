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

export default function BibleBook({ control, bibleData, onusData }: any) {
  // Map book name -> verse count

  // Step 2: Attach biblicalIndex to each book
  const bibleBooksWithIndex = bibleData.map((book: any) => ({
    ...book,
    biblicalIndex: bibleData.indexOf(book.value as any),
  }));

  // Step 3: Filter to NT + Psalms + Proverbs
  const allowedBooks = [
    "matthew",
    "mark",
    "luke",
    "john",
    "acts",
    "romans",
    "1corinthians",
    "2corinthians",
    "galatians",
    "ephesians",
    "philippians",
    "colossians",
    "1thessalonians",
    "2thessalonians",
    "1timothy",
    "2timothy",
    "titus",
    "philemon",
    "hebrews",
    "james",
    "1peter",
    "2peter",
    "1john",
    "2john",
    "3john",
    "jude",
    "revelation",
    "psalms",
    "proverbs",
  ];

  const filteredBooks = bibleBooksWithIndex.filter((book: any) =>
    allowedBooks.includes(book.value)
  );

  const sortedFilteredBooks = filteredBooks.sort((a: any, b: any) => {
    const isAOld = a.value === "psalms" || a.value === "proverbs";
    const isBOld = b.value === "psalms" || b.value === "proverbs";

    if (isAOld && !isBOld) return 1; // Psalms/Proverbs come last
    if (!isAOld && isBOld) return -1; // NT books come before

    return a.biblicalIndex - b.biblicalIndex; // Sort within group
  });

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
              {sortedFilteredBooks.map((book: any, index: number) => {
                const currentBook = book.value;
                const prevBook = bibleData[index - 1]?.value;

                const isSelectable =
                  index === 0 || (verseMap[prevBook] ?? 0) >= 5;

                return (
                  <SelectItem
                    key={currentBook}
                    value={currentBook}
                    // disabled={!isSelectable}
                  >
                    {book.label}
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
