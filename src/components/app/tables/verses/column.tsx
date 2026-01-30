/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import Highlighter from "react-highlight-words";
import DOMPurify from "dompurify";

import { BsCheckCircle } from "react-icons/bs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { LuLoader } from "react-icons/lu";
import { ChevronDown, ChevronUp, LucideEdit } from "lucide-react";
import AddVerseModal from "@/components/app/addVerse";

type Tag = {
  value: string;
  color: string;
};

type MemoryVerse = {
  id: string;
  book: string;
  chapter: string;
  verse: string;
  verseTo: string;
  version: string;
  onusVerse: string;
  verseNotes: string;
  tags: Tag[];
  memorised: string;
  color: "blue" | "purple";
};

export default function useColumns({ searchQuery }: any) {
  const columns: ColumnDef<MemoryVerse>[] = [
    {
      accessorKey: "book",
      cell: ({ row }) => {
        const {
          book,
          chapter,
          verse,
          verseTo,
          onusVerse,
          verseNotes,
          tags,
          memorised,
        } = row.original;

        return (
          <div className="grid w-full border-1 rounded-md p-2 bg-gray-50 group gap-0.5  ">
            <input
              type="checkbox"
              id={`${book}-${chapter}-${verse}-${verseTo}`}
              value={`${book}-${chapter}-${verse}-${verseTo}`}
              name="verse"
              className="peer hidden"
            />

            <div className="flex justify-between gap-3 items-center cursor-pointer">
              <div className="flex gap-2 items-center">
                {memorised !== "saved" ? (
                  <BsCheckCircle className="text-[#0F3187]" />
                ) : (
                  <LuLoader className="text-[#8C15E8]" />
                )}

                <p className="md:text-lg font-bold uppercase">
                  <Highlighter
                    searchWords={[searchQuery]}
                    autoEscape
                    textToHighlight={book}
                  />{" "}
                  {chapter}:{verse}
                  {verseTo ? `-${verseTo}` : null}
                </p>
              </div>

              <AddVerseModal
                verse={row.original}
                TriggerComp={() => <LucideEdit className="w-4 h-4" />}
              />
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(onusVerse),
              }}
              className="md:text-lg overflow-hidden text-ellipsis peer-checked:text-wrap peer-checked:text-clip text-nowrap text-left"
            />

            <div className="hidden gap-1 peer-checked:grid mt-1">
              {verseNotes ? (
                <div>
                  <Label
                    htmlFor={verseNotes}
                    className="flex justify-between gap-2 items-center"
                  >
                    Notes
                  </Label>
                  <p className="md:text-lg overflow-hidden   text-ellipsis  text-wrap text-left">
                    {verseNotes}
                  </p>
                </div>
              ) : null}
              <div className="flex  gap-1">
                {tags?.map(({ tag, color }: any, index) => (
                  <Badge
                    key={index}
                    className={`rounded-full text-gray-800 ${color}`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <Label
              htmlFor={`${book}-${chapter}-${verse}-${verseTo}`}
              className="transition-transform duration-200 peer-checked:hidden flex justify-end "
            >
              <ChevronDown className="w-6 h-6" />
            </Label>
            <Label
              htmlFor={`${book}-${chapter}-${verse}-${verseTo}`}
              className="transition-transform duration-200 peer-checked:flex hidden justify-end "
            >
              <ChevronUp className="w-6 h-6" />
            </Label>
          </div>
        );
      },
      enableSorting: true,
      enableHiding: false,
    },
  ];

  return columns;
}
