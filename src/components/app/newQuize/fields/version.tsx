/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Check, ChevronsUpDown } from "lucide-react";

export default function Version({ Controller, control }: any) {
  const [openVersion, setOpenVersion] = useState(false);

  const bibleVersions = [
    { value: "NIV", label: "New International Version" },
    { value: "KJV", label: "King James Version" },
    { value: "ESV", label: "English Standard Version" },
    { value: "NLT", label: "New Living Translation" },
  ];

  return (
    <Controller
      control={control}
      name="version"
      rules={{ required: "Version is required" }}
      render={({ field: { value, onChange }, fieldState: { error } }: any) => (
        <Popover open={openVersion} onOpenChange={setOpenVersion}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openVersion}
              className={`md:w-fit w-full justify-between ${
                error && "border-red-500"
              }`}
            >
              {value?.label || "Select Version..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="md:w-[200px] w-full p-0">
            <Command>
              <CommandInput placeholder="Search Version..." className="h-9" />
              <CommandList>
                <CommandEmpty>No version found.</CommandEmpty>
                <CommandGroup>
                  {bibleVersions.map((version) => (
                    <CommandItem
                      key={version.value}
                      value={version.value}
                      onSelect={(currentValue) => {
                        const foundVersion = bibleVersions.find(
                          (v) => v.value === currentValue
                        );
                        onChange(foundVersion);
                        setOpenVersion(false);
                      }}
                    >
                      <div className="flex">
                        <Check
                          className={cn(
                            "ml-auto",
                            value?.value === version.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <div className="flex gap-2">
                          <p>{version.value}</p> |
                          <p className="text-xs">{version.label}</p>
                        </div>
                      </div>
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
