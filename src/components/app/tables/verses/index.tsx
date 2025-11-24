/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  VisibilityState,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import useQueryOnus from "@/hooks/useFuseQuery";

import useColumns from "./column";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
  BsArrowBarLeft,
  BsArrowBarRight,
  BsDatabaseSlash,
  BsX,
} from "react-icons/bs";
import { Input } from "@/components/ui/input";

export default function DataTable({ data }: any) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    ["select"]: false,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const [queryResults, setQueryResults] = useState<any>();
  const [searchQuery, setSearchQuery] = useState<any>();

  const columns = useColumns({ searchQuery });

  const queryMembers: any = useQueryOnus(data);

  useEffect(() => {
    if (!searchQuery) return;
    const results = queryMembers(searchQuery);
    setQueryResults(results?.map((data: any) => data.item));
  }, [searchQuery, queryMembers]);

  const table = useReactTable({
    data: queryResults || data,
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
    <div className="flex flex-col gap-1">
      <h4 className="text-2xl md:text-4xl font-bold text-gray-700">
        Added Verses
      </h4>
      <div className=" flex flex-col gap-4 w-full p-3 border rounded-lg">
        {!data?.length ? (
          <div className="flex flex-col justify-center items-center h-full">
            <BsDatabaseSlash className="w-12 h-12" />
            <p>No Data Found</p>
            <p>Your Added Verses will appear here</p>
          </div>
        ) : (
          <div className="w-full" id="table">
            <Table className="grid gap-3">
              <TableHeader>
                <div className="relative col-span-6  ">
                  <div className="flex items-center">
                    <span className="absolute inset-y-0 right-2 flex items-center gap-0">
                      {searchQuery ? (
                        <BsX
                          className="cursor-pointer"
                          onClick={() => {
                            setSearchQuery("");
                            setQueryResults(null);
                          }}
                        />
                      ) : null}
                    </span>
                  </div>
                  <Input
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    placeholder="Search through Added Verses..."
                    className="rounded-full  h-12 bg-gray-50 "
                    value={searchQuery || ""}
                  />
                </div>
              </TableHeader>
              <TableBody className="grid gap-3">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      className="border-0 grid gap-1"
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          className="rounded-lg p-0 grid"
                          key={cell.id}
                        >
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
        )}
      </div>
    </div>
  );
}
