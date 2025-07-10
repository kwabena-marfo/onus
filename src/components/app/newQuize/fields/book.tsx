/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

// import bibleData from "@/data/bible.json";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// const res = await fetch("@/data/bible.json");
// const booksData = await res.json();
// console.log(booksData);

export default function BibleBook({ Controller, control }: any) {
  const [open, setOpen] = useState(false);

  const bibleData = [
    {
      value: "matthew",
      label: "Matthew",
      versesPerChapter: [
        25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35,
        30, 34, 46, 46, 39, 51, 46, 75, 66, 20,
      ],
    },
    {
      value: "mark",
      label: "Mark",
      versesPerChapter: [
        45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20,
      ],
    },
  ];

  return (
    <div className="flex w-full">
      <Controller
        control={control}
        name="book"
        rules={{ required: "Book is required" }}
        render={({
          field: { value, onChange },
          fieldState: { error },
        }: any) => {
          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={` w-full justify-between ${
                    error && "border-red-500"
                  }`}
                >
                  {value?.label || "Select Book..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="md:w-[200px] w-full p-0">
                <Command>
                  <CommandInput placeholder="Search Book..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No book found.</CommandEmpty>
                    <CommandGroup>
                      {bibleData.map((book) => (
                        <CommandItem
                          key={book.value}
                          value={book.value}
                          onSelect={(currentValue) => {
                            const foundBook = bibleData.find(
                              (book) => book.value === currentValue
                            );
                            onChange(foundBook);
                            setOpen(false);
                          }}
                        >
                          {book.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              value?.value === book.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          );
        }}
      />
    </div>
  );
}
