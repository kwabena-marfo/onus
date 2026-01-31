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
import { Input } from "@/components/ui/input";

import {
  BsArrowBarLeft,
  BsArrowBarRight,
  BsDatabaseSlash,
  BsX,
} from "react-icons/bs";

export default function DataTable({ data, isTittle }: any) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    select: false,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [queryResults, setQueryResults] = useState<any>();
  const [searchQuery, setSearchQuery] = useState("");

  const columns = useColumns({ searchQuery });
  const queryMembers: any = useQueryOnus(data);

  useEffect(() => {
    if (!searchQuery) {
      setQueryResults(null);
      return;
    }
    const results = queryMembers(searchQuery);
    setQueryResults(results?.map((d: any) => d.item));
  }, [searchQuery, queryMembers]);

  const table = useReactTable({
    data: queryResults || data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    state: { columnVisibility, sorting },
  });

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-4 w-full p-4 border border-border rounded-lg bg-card">
        {!data?.length ? (
          <div className="flex flex-col justify-center items-center h-60 text-muted-foreground">
            <BsDatabaseSlash className="w-12 h-12 mb-2" />
            <p className="font-medium">No Data Found</p>
            <p className="text-sm">
              Your <strong>Added Verses</strong> will appear here
            </p>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-2">
            {isTittle && (
              <h4 className="text-2xl md:text-4xl font-bold text-foreground">
                Added Verses
              </h4>
            )}

            <Table className="grid gap-3">
              <TableHeader>
                <div className="relative">
                  <span className="absolute inset-y-0 right-3 flex items-center">
                    {searchQuery && (
                      <BsX
                        className="cursor-pointer text-muted-foreground"
                        onClick={() => setSearchQuery("")}
                      />
                    )}
                  </span>

                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search through Added Verses..."
                    className="rounded-full h-12 bg-muted"
                  />
                </div>
              </TableHeader>

              <TableBody className="grid gap-3">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="border-0 grid gap-1">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="rounded-lg p-0 grid"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="flex items-center justify-end space-x-2 py-4">
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
