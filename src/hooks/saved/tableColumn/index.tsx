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
  BsSortAlphaDown,
  BsSortAlphaUp,
  BsChevronDown,
  BsTrash,
  BsChevronUp,
} from "react-icons/bs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

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
        const { verse, tags, reference } = row.original;
        return (
          <div className="grid w-full border-1 rounded-md p-2 bg-gray-50 group mt-2">
            <input
              type="checkbox"
              id={verse}
              value={verse}
              name="verse"
              className="peer hidden"
            />

            <div className="flex gap-2 items-center">
              <div className="flex gap-2 items-center">
                <p className="md:text-xl font-bold">{reference}</p>
              </div>
            </div>

            <div className="flex  justify-end items-center gap-1 peer-checked:hidden">
              <Label htmlFor={verse} className="rounded-lg p-2 border  ">
                <BsChevronDown />
              </Label>
              <Button variant="outline" size="sm" className="bg-white">
                <BsTrash className="text-red-800" />
              </Button>
            </div>
            <div className="justify-end items-center gap-1 hidden peer-checked:flex">
              <Label
                htmlFor={verse}
                className="rounded-lg p-2 border bg-gray-200 "
              >
                <BsChevronUp />
              </Label>
              <Button variant="outline" size="sm" className="bg-white">
                <BsTrash className="text-red-800" />
              </Button>
            </div>
            <p className="md:text-xl overflow-hidden text-ellipsis peer-checked:text-wrap peer-checked:text-clip text-nowrap text-left">
              {verse}
            </p>
            <div className="flex gap-1 justify-between w-full">
              <div className="flex gap-1">
                {tags.map(({ name, color }, index) => (
                  <Badge key={index} className={`rounded-full ${color}`}>
                    {name}
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
