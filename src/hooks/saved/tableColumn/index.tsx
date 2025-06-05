/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

// import useTriggerRequest from "@/hooks/global/useTriggerRequest";

import Reset from "./reset";
import Export from "./export";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";

import { BiSelectMultiple } from "react-icons/bi";
import {
  BsArchive,
  BsSortAlphaDown,
  BsSortAlphaUp,
  BsChevronDown,
  BsPlus,
  BsTrash,
} from "react-icons/bs";
import { Badge } from "@/components/ui/badge";
import VerseFlashCardModal from "@/components/loggedIn/global/verseFlashcard";

type Tag = {
  name: string;
  color: string;
};

type MemoryVerse = {
  verse: string;
  notes: string;
  reference: string;
  tags: Tag[];
  memorised: boolean;
  color: "blue" | "purple";
};

export default function useColumns({
  setQueryBuilder,
  setQueryMembersResults,
  // mutateGetMembers,
  searchQuery,
}: any) {
  console.log(searchQuery);
  const [showSelectToggle, setshowSelectToggle] = useState<any>();
  const [sortingToggle, setSortingToggle] = useState<any>(false);

  // const { reqFunction: delMember, reqState: delMemberState } =
  //   useTriggerRequest();

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

              {/* <Delete
                  table={table}
                  setQueryBuilder={setQueryBuilder}
                  mutateGetMembers={mutateGetMembers}
                  delMemberState={delMemberState}
                  delMember={delMember}
                /> */}
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
              setQueryBuilder,
              setQueryMembersResults,
            }}
          />
        </div>
      ),
      cell: ({ row }) => {
        const { verse, tags, memorised, reference, notes } = row.original;
        return (
          <div className="grid w-full border-1 rounded-md p-2 bg-gray-50">
            <div className="flex gap-2 items-center">
              <p className="md:text-xl font-bold">{reference}</p>
            </div>
            <div className="line-clamp-2">
              <p className="md:text-lg overflow-hidden text-ellipsis text-left">
                {verse}
              </p>
            </div>
            <div className="flex gap-1 justify-between w-full">
              <div className="flex gap-2">
                {tags.map(({ name, color }, index) => (
                  <Badge key={index} className={`rounded-full ${color}`}>
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex  justify-end items-center gap-1">
              <VerseFlashCardModal
                verse={verse}
                tags={tags}
                memorised={memorised}
                notes={notes}
                label={reference}
                TriggerComp={() => (
                  <Button variant="link" size="sm" className="border-0">
                    <BsChevronDown />
                  </Button>
                )}
              />
              <div className="flex items-center ">
                <Button variant="outline" size="sm" className="rounded-full">
                  <BsPlus />
                  <p className="hidden md:flex">Add To Memorised</p>
                </Button>
              </div>
              <Button variant="link" size="sm" className="bg-white">
                <BsTrash className="text-red-800" />
              </Button>
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
