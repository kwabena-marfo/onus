/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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
import { BsX } from "react-icons/bs";

const predefinedTags = [
  { tag: "peace", color: "bg-blue-400" },
  { tag: "faith", color: "bg-purple-400" },
  { tag: "love", color: "bg-red-400" },
  { tag: "grace", color: "bg-pink-200" },
  { tag: "hope", color: "bg-yellow-200" },
  { tag: "joy", color: "bg-orange-200" },
  { tag: "wisdom", color: "bg-green-400" },
  { tag: "strength", color: "bg-gray-400" },
  { tag: "truth", color: "bg-indigo-400" },
  { tag: "salvation", color: "bg-teal-400" },
  { tag: "forgiveness", color: "bg-lime-200" },
  { tag: "obedience", color: "bg-sky-400" },
  { tag: "righteousness", color: "bg-emerald-400" },
  { tag: "kindness", color: "bg-rose-200" },
  { tag: "mercy", color: "bg-cyan-200" },
  { tag: "discipline", color: "bg-amber-200" },
  { tag: "patience", color: "bg-fuchsia-200" },
  { tag: "humility", color: "bg-slate-400" },
  { tag: "reverence", color: "bg-yellow-400" },
  { tag: "fellowship", color: "bg-green-200" },
  { tag: "devotion", color: "bg-purple-200" },
  { tag: "holiness", color: "bg-indigo-200" },
  { tag: "light", color: "bg-zinc-200" },
  { tag: "eternity", color: "bg-cyan-400" },
  { tag: "healing", color: "bg-lime-400" },
  { tag: "purpose", color: "bg-orange-400" },
  { tag: "courage", color: "bg-red-400" },
];

// fallback color generator
const getNextUnusedColor = (usedColors: string[]) => {
  const allColors = predefinedTags.map((t) => t.color);
  const available = allColors.find((c) => !usedColors.includes(c));
  return available || "bg-gray-300";
};

export default function Tags({ tags = [], addTag, removeTag }: any) {
  const [inputValue, setInputValue] = useState("");

  const handleCustomTag = () => {
    const trimmed = inputValue.trim().toLowerCase();
    if (!trimmed || tags.find((t: any) => t.tag === trimmed)) return;

    const usedColors = tags.map((t: any) => t.color);
    const newColor = getNextUnusedColor(usedColors);

    addTag({ tag: trimmed, color: newColor });
    setInputValue("");
  };

  return (
    <div className="flex flex-col gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            Select or Create Tag
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="max-w-xs w-[280px] max-h-[60vh] p-0 overflow-y-auto overscroll-contain touch-auto"
          side="bottom"
          align="start"
        >
          <Command className="h-full">
            <CommandInput
              placeholder="Search or type tag..."
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCustomTag();
                }
              }}
              className="h-9"
            />
            <CommandList className="max-h-[50vh] overflow-y-auto overscroll-contain touch-auto">
              <CommandEmpty>No tag found. Press Enter to add.</CommandEmpty>
              <CommandGroup heading="Available Tags">
                {predefinedTags.map(({ tag, color }) => {
                  const isSelected = tags?.some((t: any) => t.tag === tag);
                  return (
                    <CommandItem
                      key={tag}
                      value={tag}
                      onSelect={() => {
                        if (!isSelected) addTag({ tag, color });
                      }}
                    >
                      <Check
                        className={cn(
                          "ml-auto",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span>{tag}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {tags?.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {tags.map(({ tag, color }: any, index: number) => (
            <div
              key={index}
              className={cn(
                "border rounded-full px-3 py-1 flex items-center space-x-2",
                color || "bg-gray-200"
              )}
            >
              <span className="text-sm font-medium text-gray-800">{tag}</span>
              <BsX
                className="cursor-pointer"
                onClick={() => removeTag(index)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
