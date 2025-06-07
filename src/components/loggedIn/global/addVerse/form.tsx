/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BsCheck2Circle } from "react-icons/bs";
import { useState, ComponentProps } from "react";

import bibleData from "@/data/bible.json";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Textarea } from "@/components/ui/textarea";

export default function AddVerseForm({ className }: ComponentProps<"form">) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [signupDone, setSignupDone] = useState(false);
  return (
    <>
      {signupDone ? (
        <div className="flex flex-col justify-center items-center gap-3">
          <BsCheck2Circle className="w-16 h-16 text-green-700" />
          <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-700">
            All Done Frank, <br /> Great Job!
          </h1>
          <p className="text-center text-lg">
            We are excited to have you start your journey to spiritual growth
          </p>
        </div>
      ) : (
        <form
          className={cn(
            "grid w-full gap-4 z-50 bg-white p-4 rounded-md",
            className
          )}
        >
          <div className="flex flex-col gap-0 justify-center items-center ">
            <p className="text-3xl md:text-6xl font-bold">Add Verse</p>
            <p className="text-center">
              Your Journey to Spritual Growth Begins here
            </p>
          </div>
          <div className="grid md:flex gap-3">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="md:w-2/5 justify-between"
                >
                  {value
                    ? bibleData.find(
                        (bibleData: any) => bibleData.value === value
                      )?.label
                    : "Select Book..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="md:w-[200px] w-full p-0">
                <Command>
                  <CommandInput placeholder="Search Book..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {bibleData.map((bible) => (
                        <CommandItem
                          key={bible.value}
                          value={bible.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          {bible.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              value === bible.value
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
            <div className="flex gap-3">
              <Input id="name" />
              <Input id="name" />
            </div>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Verse</Label>
            <Textarea placeholder="Write Verse" />
          </div>{" "}
          <div className="grid gap-1">
            <Label htmlFor="password">Notes</Label>
            <Textarea />
          </div>{" "}
          <RadioGroup defaultValue="comfortable" className="flex">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">I have Memorised</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="compact" id="r3" />
              <Label htmlFor="r3">I want to save</Label>
            </div>
          </RadioGroup>
          <div className="flex flex-col">
            <Button
              type="button"
              onClick={() => setSignupDone(true)}
              className="rounded-md bg-[#fa9a40]"
            >
              Add Verse
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
