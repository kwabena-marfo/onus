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
  BsChevronDown,
  BsPlus,
  BsSortAlphaDown,
  BsSortAlphaUp,
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
          <div className="grid  bg-gray-50 border-2 p-2 rounded-lg">
            <VerseFlashCardModal
              verse={verse}
              tags={tags}
              memorised={memorised}
              notes={notes}
              label={reference}
              TriggerComp={() => (
                <>
                  <div className="  flex-col items-center gap-0 justify-start bg-bermuda">
                    <p className="md:text-xl font-bold text-left  line-clamp-2">
                      {reference}
                    </p>
                    {/* <p className="text-left md:text-lg">{verse}</p> */}
                  </div>
                  <div className="flex gap-1 justify-between col-span-6">
                    <div className="flex justify-start items-center gap-1">
                      {tags.map(({ name, color }, index) => (
                        <Badge key={index} className={`rounded-full ${color}`}>
                          {name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex  justify-end items-center gap-2">
                    <Button variant="outline" size="sm" className="border-0">
                      <BsChevronDown />
                    </Button>
                    <div className="flex items-center ">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                      >
                        <BsPlus />
                        <p className="hidden md:flex">Add To Memorised</p>
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="border-0">
                      <BsTrash className="text-red-800" />
                    </Button>
                  </div>
                </>
              )}
            />
          </div>
        );
      },
      enableSorting: true,
      enableHiding: false,
    },
  ];

  return columns;
}
