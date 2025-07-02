/* eslint-disable @typescript-eslint/no-explicit-any */

import { cn } from "@/lib/utils";

import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsX } from "react-icons/bs";

export default function Tags({ addTag, removeTag, tags, watch }: any) {
  const tagsData = [
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
    { tag: "truthfulness", color: "bg-violet-200" },
    { tag: "reverence", color: "bg-yellow-400" },
    { tag: "fellowship", color: "bg-green-200" },
    { tag: "generosity", color: "bg-rose-400" },
    { tag: "devotion", color: "bg-purple-200" },
    { tag: "holiness", color: "bg-indigo-200" },
    { tag: "light", color: "bg-zinc-200" },
    { tag: "eternity", color: "bg-cyan-400" },
    { tag: "healing", color: "bg-lime-400" },
    { tag: "purpose", color: "bg-orange-400" },
    { tag: "truth", color: "bg-indigo-400" },
    { tag: "courage", color: "bg-red-400" },
  ];
  return (
    <div className="flex flex-col gap-2 ">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="md:w-fit w-full justify-between"
          >
            Select Tags...
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="md:w-[200px] w-full p-0">
          <Command>
            <CommandInput placeholder="Search Tags..." className="h-9" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {tagsData.map(({ tag, color }: any, index: any) => {
                  const isThere = tags?.find(
                    (item: any) => item.tagId === index
                  );
                  return (
                    <CommandItem
                      key={tag}
                      value={tag}
                      onSelect={(currentValue) => {
                        if (isThere) return;
                        addTag({
                          tagId: index,
                          tag: currentValue,
                          color: color,
                        });
                      }}
                    >
                      <div className="flex">
                        <Check
                          className={cn(
                            "ml-auto",
                            isThere ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </div>
                      {tag}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {watch("tags")?.length ? (
        <div className="flex justify-between   space-x-4 items-start rounded-md ">
          <div className="flex flex-1 flex-wrap items-center gap-2 w-20">
            {tags?.map(({ tag, color }: any, index: any) => (
              <div
                key={index}
                className={`scroll-ml-6 border rounded-full px-3 py-0.5 flex justify-between items-center w-fit ${color}`}
              >
                <span className="font-medium text-gray-800">{tag}</span>
                <span
                  onClick={() => removeTag(index)}
                  className="cursor-pointer"
                >
                  <BsX />
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
