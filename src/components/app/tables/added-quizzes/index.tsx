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

import useQueryQuiz from "@/hooks/useFuseQuery";
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
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [queryResults, setQueryResults] = useState<any[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const columns = useColumns();
  const searchQuiz = useQueryQuiz(data);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setQueryResults(null);
      return;
    }

    const results = searchQuiz(searchQuery);
    setQueryResults(results.map((r: any) => r.item));
  }, [searchQuery, searchQuiz]);

  const table = useReactTable({
    data: queryResults ?? data,
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
      <div className="flex flex-col gap-4 w-full p-4 border border-border rounded-lg bg-white dark:bg-gray-800">
        {!data?.length ? (
          <div className="flex flex-col justify-center items-center h-60 text-muted-foreground">
            <BsDatabaseSlash className="w-12 h-12 mb-2" />
            <p className="font-medium">No Quizzes Found</p>
            <p className="text-sm">
              Your <strong>added quizzes</strong> will appear here
            </p>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-2">
            {isTittle && (
              <h4 className="text-2xl md:text-4xl font-bold">Added Quizzes</h4>
            )}

            <Table className="grid gap-3">
              <TableHeader>
                <div className="relative">
                  {searchQuery && (
                    <BsX
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                      onClick={() => setSearchQuery("")}
                    />
                  )}

                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search quizzes, questions, or references..."
                    className="rounded-full h-12"
                  />
                </div>
              </TableHeader>

              <TableBody className="grid gap-3">
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="border-0 grid gap-1">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="p-0">
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
                      No matching quizzes found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="flex items-center justify-end space-x-2 py-4">
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
        )}
      </div>
    </div>
  );
}
