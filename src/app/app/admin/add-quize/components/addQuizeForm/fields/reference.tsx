/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { FieldLabel } from "@/components/ui/field";
import books from "@/data/bible.json";

export default function ReferenceSelect({
  index,
  question,
  activeBook,
  update,
}: any) {
  const selectedBook = books.find((b) => b.value === activeBook);

  const chapters = selectedBook
    ? Array.from(
        { length: selectedBook.versesPerChapter.length },
        (_, i) => i + 1,
      )
    : [];

  const verses =
    selectedBook && question.reference.chapter
      ? Array.from(
          {
            length:
              selectedBook.versesPerChapter[question.reference.chapter - 1],
          },
          (_, i) => i + 1,
        )
      : [];

  return (
    <div className="flex gap-1">
      {/* CHAPTER */}
      <div className="flex-1">
        <FieldLabel>Chapter</FieldLabel>
        <Select
          disabled={!activeBook}
          value={String(question.reference.chapter)}
          onValueChange={(val) =>
            update(index, {
              ...question,
              reference: {
                book: activeBook,
                chapter: Number(val),
                verse: 1,
              },
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {chapters.map((c) => (
              <SelectItem key={c} value={String(c)}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* VERSE */}
      <div className="flex-1">
        <FieldLabel>Verse</FieldLabel>
        <Select
          disabled={!activeBook}
          value={String(question.reference.verse)}
          onValueChange={(val) =>
            update(index, {
              ...question,
              reference: {
                ...question.reference,
                book: activeBook,
                verse: Number(val),
              },
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {verses.map((v) => (
              <SelectItem key={v} value={String(v)}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
