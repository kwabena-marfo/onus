/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import Highlighter from "react-highlight-words";

import { BsCheckCircle, BsChevronDown } from "react-icons/bs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { LuLoader } from "react-icons/lu";
import Delete from "./delete";
import useTriggerRequest from "@/hooks/global/useTriggerRequest";
import { LucideEdit } from "lucide-react";
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
  version: string;
  onusVerse: string;
  verseNotes: string;
  tags: Tag[];
  memorised: string;
  color: "blue" | "purple";
};

export default function useColumns({ mutateGetOnus, searchQuery }: any) {
  const { reqFunction: delOnus, reqState: delOnusState } = useTriggerRequest();

  const columns: ColumnDef<MemoryVerse>[] = [
    {
      accessorKey: "book",
      cell: ({ row }) => {
        const {
          id,
          book,
          chapter,
          verse,
          onusVerse,
          verseNotes,
          tags,
          memorised,
        } = row.original;

        return (
          <div className="grid w-full border-1 rounded-md p-2 bg-gray-50 group   ">
            <input
              type="checkbox"
              id={`${book}-${chapter}-${verse}`}
              value={`${book}-${chapter}-${verse}`}
              name="verse"
              className="peer hidden"
            />

            <Label
              htmlFor={`${book}-${chapter}-${verse}`}
              className="flex justify-between gap-2 items-center"
            >
              <div className="flex gap-2 items-center">
                {memorised !== "saved" ? (
                  <BsCheckCircle className={`${"text-[#0F3187]"}`} />
                ) : (
                  <LuLoader className={`${"text-[#8C15E8]"}`} />
                )}

                <p className="md:text-lg font-bold uppercase">
                  <Highlighter
                    searchWords={[searchQuery]}
                    autoEscape={true}
                    textToHighlight={book}
                  />
                  {chapter}:{verse}
                </p>
                <BsChevronDown />
              </div>
              <div className="flex  justify-center items-center gap-0 ">
                <AddVerseModal
                  verse={row.original}
                  TriggerComp={() => (
                    <Button size="icon" variant="ghost">
                      <LucideEdit />
                    </Button>
                  )}
                />

                <Delete
                  ids={[id]}
                  mutateGetOnus={mutateGetOnus}
                  delOnusState={delOnusState}
                  delOnus={delOnus}
                />
              </div>
            </Label>

            <p className="md:text-lg overflow-hidden text-ellipsis peer-checked:text-wrap peer-checked:text-clip text-nowrap text-left">
              {onusVerse}
            </p>

            <div className="hidden gap-1 peer-checked:grid  mt-2">
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
          </div>
        );
      },
      enableSorting: true,
      enableHiding: false,
    },
  ];

  return columns;
}
