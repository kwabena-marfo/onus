/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import Reset from "./reset";
import Export from "./export";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";

import { BiSelectMultiple } from "react-icons/bi";
import {
  BsArchive,
  BsCheckCircle,
  BsChevronDown,
  BsSortAlphaDown,
  BsSortAlphaUp,
} from "react-icons/bs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { LuLoader } from "react-icons/lu";
import Delete from "./delete";
import useTriggerRequest from "@/hooks/global/useTriggerRequest";

type Tag = {
  value: string;
  color: string;
};

type MemoryVerse = {
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

export default function useColumns() {
  const [showSelectToggle, setshowSelectToggle] = useState<any>();
  const [sortingToggle, setSortingToggle] = useState<any>(false);

  const { reqFunction: delMember, reqState: delMemberState } =
    useTriggerRequest();

  const columns: ColumnDef<MemoryVerse>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: "fullname",
      header: ({ table, column }) => (
        <div className="flex justify-between items-center">
          <div className="flex  justify-start  ">
            <Toggle
              size="sm"
              pressed={showSelectToggle}
              onPressedChange={(pressed) => {
                table
                  .getAllColumns()
                  .map(
                    (column) =>
                      column.id == "select" && column.toggleVisibility(pressed)
                  );
                setshowSelectToggle(pressed);
                table.resetRowSelection();
              }}
              aria-label="Toggle"
            >
              <BiSelectMultiple className="w-4 h-4" />
            </Toggle>

            {table.getFilteredSelectedRowModel().rows.length ? (
              <>
                <Button size="sm" variant="ghost">
                  <BsArchive className="w-4 h-4" />
                </Button>

                <Delete
                  table={table}
                  // setQueryBuilder={setQueryBuilder}
                  // mutateGetMembers={mutateGetMembers}
                  delMemberState={delMemberState}
                  delMember={delMember}
                />
              </>
            ) : (
              <>
                <Toggle
                  pressed={sortingToggle}
                  onPressedChange={(pressed) => {
                    column.toggleSorting(column.getIsSorted() === "asc");
                    setSortingToggle(pressed);
                  }}
                  size="sm"
                >
                  {sortingToggle ? (
                    <BsSortAlphaDown className="w-4 h-4" />
                  ) : (
                    <BsSortAlphaUp className="w-4 h-4" />
                  )}
                </Toggle>
                <Export />
              </>
            )}

            <Reset
              data={{
                table,
                setSortingToggle,
                setshowSelectToggle,
              }}
            />
          </div>
        </div>
      ),
      cell: ({ row }) => {
        const { book, chapter, verse, onusVerse, verseNotes, tags, memorised } =
          row.original;

        return (
          <div className="grid w-full border-1 rounded-md p-2 bg-gray-50 group  ">
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
                  {book} {chapter}:{verse}
                </p>
                <BsChevronDown />
              </div>
              <Delete
                // setQueryBuilder={setQueryBuilder}
                // mutateGetMembers={mutateGetMembers}
                delMemberState={delMemberState}
                delMember={delMember}
              />
            </Label>

            <p className="md:text-lg overflow-hidden text-ellipsis peer-checked:text-wrap peer-checked:text-clip text-nowrap text-left">
              {onusVerse}
            </p>

            <div className="hidden gap-1  peer-checked:flex peer-checked:flex-col">
              {verseNotes ? (
                <div>
                  <Label
                    htmlFor={verseNotes}
                    className="flex justify-between gap-2 items-center"
                  >
                    Notes
                  </Label>
                  <p className="md:text-lg overflow-hidden   text-ellipsis  text-nowrap text-left">
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
