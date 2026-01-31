/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import Highlighter from "react-highlight-words";
import DOMPurify from "dompurify";

import { BsCheckCircle } from "react-icons/bs";
import { LuLoader } from "react-icons/lu";
import { ChevronDown, ChevronUp, LucideEdit } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import AddVerseModal from "@/components/app/addVerse";

type Tag = {
  tag: string;
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

        const checkboxId = `${book}-${chapter}-${verse}-${verseTo}`;

        return (
          <div className="grid w-full rounded-lg border border-border bg-card p-3 gap-1">
            {/* toggle */}
            <input type="checkbox" id={checkboxId} className="peer hidden" />

            {/* header */}
            <div className="flex justify-between items-center gap-3 cursor-pointer">
              <div className="flex gap-2 items-center">
                {memorised !== "saved" ? (
                  <BsCheckCircle className="text-primary" />
                ) : (
                  <LuLoader className="text-muted-foreground animate-spin" />
                )}

                <p className="md:text-lg font-bold uppercase text-foreground">
                  <Highlighter
                    searchWords={[searchQuery]}
                    autoEscape
                    textToHighlight={book}
                  />{" "}
                  {chapter}:{verse}
                  {verseTo && `-${verseTo}`}
                </p>
              </div>

              <AddVerseModal
                verse={row.original}
                TriggerComp={() => (
                  <LucideEdit className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                )}
              />
            </div>

            {/* verse text */}
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(onusVerse),
              }}
              className="md:text-lg text-foreground overflow-hidden text-ellipsis text-nowrap peer-checked:text-wrap peer-checked:text-clip"
            />

            {/* expanded content */}
            <div className="hidden peer-checked:grid gap-2 mt-1">
              {verseNotes && (
                <div>
                  <Label className="text-sm text-muted-foreground">Notes</Label>
                  <p className="md:text-lg text-foreground">{verseNotes}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-1">
                {tags?.map(({ tag, color }, index) => (
                  <Badge
                    key={index}
                    className="rounded-full"
                    style={{ backgroundColor: color }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* chevrons */}
            <Label
              htmlFor={checkboxId}
              className="flex justify-end cursor-pointer peer-checked:hidden"
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </Label>

            <Label
              htmlFor={checkboxId}
              className="hidden justify-end cursor-pointer peer-checked:flex"
            >
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
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
