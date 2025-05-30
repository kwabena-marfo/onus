/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  VisibilityState,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { BsArrowBarLeft, BsArrowBarRight, BsX } from "react-icons/bs";
// import { DeepFilterSheet } from "./deepFilter";

export function DataTable({
  data,
  deepFilterFunction,
  columns,
  searchQuery,
  setSearchQuery,
  setQueryMembersResults,
}: // DeepFilterComp,
any) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    ["select"]: false,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    pageCount: -1,
    state: { columnVisibility, sorting },
    initialState: { columnVisibility, sorting },
    // autoResetAll: true,
  });

  return (
    <div className="w-full" id="table">
      <div className="grid grid-cols-6 gap-0 md:gap-x-2 py-2  rounded-md  mb-2 relative justify-between">
        <div className="relative col-span-6  ">
          <div className="flex items-center">
            <span className="absolute inset-y-0 right-0 flex items-center gap-0">
              {searchQuery ? (
                <BsX
                  className="cursor-pointer"
                  onClick={() => {
                    setSearchQuery();
                    setQueryMembersResults();
                  }}
                />
              ) : null}

              {/* <DeepFilterSheet DeepFilterComp={DeepFilterComp} /> */}
            </span>
          </div>
          <Input
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            placeholder="Search here..."
            className="pr-44 rounded-full h-12"
            value={searchQuery || ""}
          />
        </div>
        <div className="flex flex-col gap-1 w-full mt-1 col-span-6">
          {/* {deepFilterFunction?.length || searchQuery ? (
            <p className="text-xs text-center">
              Showing <strong>{data?.length}</strong> results{" "}
              {searchQuery ? `for "${searchQuery}"` : null} from{" "}
            </p>
          ) : (
            <p className="text-xs text-center">
              Showing <strong>{data?.length}</strong> for all members
            </p>
          )} */}
          <div className="flex justify-center flex-wrap gap-1">
            {deepFilterFunction?.map(
              ({ selectValue, value }: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="  p-2 py-1 rounded-full bg-yellow-100 text-gray-700 text-xs font-bold"
                  >
                    {selectValue === "memberDemo" ? "Members:" : null} {value}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      <div className=" ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {table.getFilteredSelectedRowModel().rows.length ? (
          <div className="flex-1  text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        ) : null}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <BsArrowBarLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <BsArrowBarRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
