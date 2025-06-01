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
  BsCircleFill,
  BsSortAlphaDown,
  BsSortAlphaUp,
} from "react-icons/bs";
import { Badge } from "@/components/ui/badge";

type Member = {
  id: string;
  memberID: string;
  fullname: string;
  membershipType: string;
  officerRank: string;

  lastSeen: string;
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

  const columns: ColumnDef<Member>[] = [
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
        </div>
      ),
      cell: () => {
        return (
          <div className="grid">
            <div className="flex gap-2 items-center">
              <BsCircleFill className="w-5 h-5 text-green-700" />
              <p className="md:text-2xl font-bold">Mathew 7:7</p>
            </div>
            <div className=" line-clamp-2">
              <p className="text-lg overflow-hidden text-ellipsis">
                Ask, and it will be given to you; seek, and you will find;
                knock, and the door will be opened to you.Ask, and it will be
                given to you; seek, and you will find; knock, and the door will
                be opened to you.Ask, and it will be given to you; seek, and you
                will find; knock, and the door will be opened to you.
              </p>
              <div className="flex gap-1 mt-3 justify-end">
                <Badge className="rounded-full  bg-[#0F3187] ">Faith</Badge>
                <Badge className="rounded-full  bg-[#0F3187] ">Faith</Badge>
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
