/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import bibleData from "@/data/bible.json";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";

export default function BibleBook({ control }: any) {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      control={control}
      name="book"
      rules={{ required: "Book is required" }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "w-full justify-between",
                error && "border-red-500"
              )}
            >
              {value?.label || "Select Book..."}
              <ChevronsUpDown className="opacity-50 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-0 max-h-[60vh] overflow-y-auto">
            <Command>
              <CommandInput placeholder="Search Book..." className="h-9" />
              <CommandList className="max-h-[50vh] overflow-y-auto overscroll-contain">
                <CommandEmpty>No book found.</CommandEmpty>
                <CommandGroup>
                  {bibleData.map((book: any) => (
                    <CommandItem
                      key={book.value}
                      value={book.value}
                      onSelect={() => {
                        onChange(book);
                        setOpen(false);
                      }}
                    >
                      {book.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
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
      )}
    />
  );
}
