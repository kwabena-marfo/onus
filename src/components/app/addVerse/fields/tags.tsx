/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { BsX } from "react-icons/bs";
import { cn } from "@/lib/utils";
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

const defaultTags = [
  { tag: "peace", color: "bg-blue-400" },
  { tag: "faith", color: "bg-purple-400" },
  { tag: "love", color: "bg-red-400" },
  { tag: "joy", color: "bg-orange-200" },
];

const colorPalette = [
  "bg-blue-400",
  "bg-purple-400",
  "bg-red-400",
  "bg-pink-200",
  "bg-yellow-200",
  "bg-orange-200",
  "bg-green-400",
  "bg-gray-400",
  "bg-indigo-400",
  "bg-teal-400",
  "bg-lime-200",
  "bg-sky-400",
  "bg-emerald-400",
  "bg-rose-200",
  "bg-cyan-200",
  "bg-amber-200",
  "bg-fuchsia-200",
  "bg-slate-400",
  "bg-violet-200",
  "bg-green-200",
  "bg-rose-400",
  "bg-purple-200",
  "bg-indigo-200",
  "bg-zinc-200",
  "bg-cyan-400",
  "bg-lime-400",
  "bg-orange-400",
  "bg-red-400",
];

function getUnusedColor(usedColors: string[]) {
  const availableColors = colorPalette.filter(
    (color) => !usedColors.includes(color)
  );

  // Fallback if all colors are used
  if (availableColors.length === 0) {
    return "bg-gray-300";
  }

  return availableColors[Math.floor(Math.random() * availableColors.length)];
}
const getSavedCustomTags = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("customTags");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

export default function Tags({ addTag, removeTag, tags, watch }: any) {
  const [customTags, setCustomTags] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const savedTags = getSavedCustomTags();
    setCustomTags(savedTags);
  }, []);

  const handleAddCustomTags = (value: string) => {
    const inputTags = value
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0);

    const existingTags = [...defaultTags, ...customTags, ...(tags || [])].map(
      (t) => t.tag.toLowerCase()
    );

    const uniqueNewTags = inputTags.filter(
      (tag) => !existingTags.includes(tag)
    );

    const coloredNewTags = uniqueNewTags.map((tag) => ({
      tag,
      tagId: `custom-${tag}`,
      color: getUnusedColor(tags.map((t: any) => t.color)),
    }));

    const updated = [...customTags, ...coloredNewTags];
    setCustomTags(updated);
    localStorage.setItem("customTags", JSON.stringify(updated));

    coloredNewTags.forEach((t) => addTag(t));
    setInputValue("");
  };

  const allTags = [...defaultTags, ...customTags];

  return (
    <div className="flex flex-col gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            Select or Create Tags...
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-xs w-[300px] max-h-[60vh] overflow-y-auto p-0">
          <Command className="h-full">
            <CommandInput
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddCustomTags(inputValue);
                }
              }}
              placeholder="Type and press enter to add"
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No tag found.</CommandEmpty>
              <CommandGroup>
                {allTags.map(({ tag, color }: any, index: any) => {
                  const isSelected = tags?.find(
                    (item: any) => item.tag === tag
                  );
                  return (
                    <CommandItem
                      key={tag}
                      value={tag}
                      onSelect={() => {
                        if (isSelected) return;
                        addTag({ tag, tagId: index, color });
                      }}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={color}>{tag}</span>
                        <Check
                          className={cn(
                            "ml-auto",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {watch("tags")?.length ? (
        <div className="flex flex-wrap gap-2">
          {tags.map(({ tag, color }: any, index: any) => (
            <div
              key={index}
              className={`flex items-center gap-1 px-3 py-1 rounded-full ${color}`}
            >
              <span className="text-sm font-medium text-gray-800">{tag}</span>
              <BsX
                className="cursor-pointer"
                onClick={() => removeTag(index)}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
