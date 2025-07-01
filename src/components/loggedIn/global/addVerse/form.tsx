/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, ComponentProps } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

// import bibleData from "@/data/bible.json";

import { cn } from "@/lib/utils";

import useTriggerRequest from "@/hooks/global/useTriggerRequest";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BsCheck2Circle, BsHandThumbsUp, BsX } from "react-icons/bs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { LuLoader } from "react-icons/lu";

// const res = await fetch("@/data/bible.json");
// const booksData = await res.json();
// console.log(booksData);

export default function AddVerseForm({ className }: ComponentProps<"form">) {
  const [open, setOpen] = useState(false);
  const [openVersion, setOpenVersion] = useState(false);
  const [openTags, setOpenTags] = useState(false);

  const [bookValue, setBookValue] = useState<any>();
  const [versionValue, setVersionValue] = useState<any>();

  const {
    reqFunction: createOnus,
    reqState: createOnusStates,
    setReqState: resetCreateOnusStates,
  } = useTriggerRequest();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    shouldFocusError: true,
  });

  const selectedChapter = watch("chapter");

  const {
    fields: tags,
    append: addTag,
    remove: removeTag,
  } = useFieldArray<any>({
    control,
    name: "tags",
    shouldUnregister: true,
  });

  console.log(tags);

  const onSubmit = async (data: any) => {
    // return console.log({
    //   ...data,
    //   book: bookValue?.value,
    //   versionValue: versionValue?.value,
    // });

    await createOnus({
      route: "/api/create-onus",
      reqType: "post",
      data: {
        ...data,
        book: bookValue?.value,
        version: versionValue?.value,
      },
    });
  };

  useEffect(() => {
    if (createOnusStates?.data) {
      reset();
    }
  }, [createOnusStates]);

  const bibleData = [
    {
      value: "matthew",
      label: "Matthew",
      versesPerChapter: [
        25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35,
        30, 34, 46, 46, 39, 51, 46, 75, 66, 20,
      ],
    },
  ];

  const bibleVersions = [
    {
      value: "NIV",
      label: "New International Version",
    },
  ];

  return (
    <>
      {createOnusStates?.data ? (
        <div className="flex flex-col justify-center items-center gap-3 p-4">
          <BsCheck2Circle className="md:w-16 md:h-16 w-12 h-12 text-green-700" />
          <h1 className="text-center text-xl md:text-3xl font-bold text-gray-700">
            All Done, Great Job!
          </h1>
          <p className="text-center text-lg">
            We are excited to have you start your journey to spiritual growth
          </p>
          <Button
            onClick={() => {
              resetCreateOnusStates(null);
              setBookValue(null);
            }}
            className="w-full"
          >
            Sure! <BsHandThumbsUp />
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn(
            "grid w-full gap-4 z-50 bg-white p-4 rounded-md",
            className
          )}
        >
          <div className="flex flex-col gap-0 justify-center items-center ">
            <p className="text-3xl md:text-4xl font-bold">Add Verse</p>
            <p className="text-center">
              Your Journey to Spritual Growth Begins here
            </p>
          </div>
          <div className="grid md:flex gap-3">
            <div className="flex flex-wrap gap-3 w-full justify-center">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="md:w-fit w-full justify-between"
                  >
                    {bookValue
                      ? bibleData.find(
                          (bibleData: any) =>
                            bibleData.value === bookValue.value
                        )?.label
                      : "Select Book..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="md:w-[200px] w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search Book..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {bibleData.map((bible) => (
                          <CommandItem
                            key={bible.value}
                            value={bible.value}
                            onSelect={(currentValue) => {
                              const foundBible = bibleData.find(
                                (bibleData: any) =>
                                  bibleData.value === currentValue
                              );
                              setBookValue(foundBible);
                              setOpen(false);
                            }}
                          >
                            {bible.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                bookValue?.value === bible.value
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

              <div className="flex gap-3 md:w-fit w-full">
                <Controller
                  control={control}
                  name="chapter"
                  rules={{ required: "Required" }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }: any) => {
                    return (
                      <>
                        <Select
                          onValueChange={onChange}
                          value={value || ""}
                          disabled={!bookValue ? true : false}
                        >
                          <SelectTrigger
                            className={`md:w-fit w-full ${
                              error && "border-red-500"
                            }`}
                          >
                            <SelectValue placeholder="Chapter" />
                          </SelectTrigger>
                          <SelectContent>
                            {bookValue?.versesPerChapter.map(
                              (_: any, index: any) => (
                                <SelectItem key={index} value={`${index + 1}`}>
                                  {index + 1}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>

                        {error && (
                          <p className="text-red-500 text-sm">
                            {error.message}
                          </p>
                        )}
                      </>
                    );
                  }}
                />

                <Controller
                  control={control}
                  name="verse"
                  rules={{ required: "Required" }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }: any) => {
                    return (
                      <>
                        <Select
                          onValueChange={onChange}
                          value={value || ""}
                          disabled={!bookValue ? true : false}
                        >
                          <SelectTrigger
                            disabled={!selectedChapter}
                            className={`md:w-fit w-full ${
                              error && "border-red-500"
                            }`}
                          >
                            <SelectValue placeholder="Verse" />
                          </SelectTrigger>
                          <SelectContent>
                            {new Array(
                              bookValue?.versesPerChapter[+selectedChapter - 1]
                            )
                              .fill(" ")
                              .map((_: any, index: any) => (
                                <SelectItem key={index} value={`${index + 1}`}>
                                  {index + 1}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>

                        {error && (
                          <p className="text-red-500 text-sm">
                            {error.message}
                          </p>
                        )}
                      </>
                    );
                  }}
                />
              </div>

              <Popover open={openVersion} onOpenChange={setOpenVersion}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="md:w-fit w-full justify-between"
                  >
                    {versionValue
                      ? bibleVersions.find(
                          (bibleVersions: any) =>
                            bibleVersions.value === versionValue.value
                        )?.label
                      : "Select Version..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="md:w-[200px] w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search Version..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {bibleVersions.map((version: any) => (
                          <CommandItem
                            key={version.value}
                            value={version.value}
                            onSelect={(currentValue) => {
                              const foundVersion = bibleVersions.find(
                                (versionValue: any) =>
                                  versionValue.value === currentValue
                              );
                              setVersionValue(foundVersion);
                              setOpenVersion(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "ml-auto",
                                versionValue?.value === version.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <div className="flex gap-2">
                              <p>{version.value}</p> |
                              <p className="text-xs">{version.label}</p>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid gap-1">
            <Label>Verse</Label>
            <Textarea {...register("onusVerse")} placeholder="Write Verse" />
            {errors?.onusVerse && (
              <p className="text-red-500 text-sm">
                {errors?.onusVerse?.message as any}
              </p>
            )}
          </div>{" "}
          <div className="grid gap-1">
            <Label htmlFor="password">Notes</Label>
            <Textarea placeholder="Write Notes" {...register("verseNotes")} />
            {errors?.verseNotes && (
              <p className="text-red-500 text-sm">
                {errors?.verseNotes?.message as any}
              </p>
            )}
          </div>{" "}
          <div className="flex flex-col gap-2 ">
            <Popover open={openTags} onOpenChange={setOpenTags}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
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
                      {[
                        { tag: "peace", color: "bg-blue-300" },
                        { tag: "faith", color: "bg-purple-300" },
                        { tag: "love", color: "bg-red-300" },
                        { tag: "grace", color: "bg-pink-200" },
                        { tag: "hope", color: "bg-yellow-200" },
                        { tag: "joy", color: "bg-orange-200" },
                        { tag: "wisdom", color: "bg-green-300" },
                        { tag: "strength", color: "bg-gray-300" },
                        { tag: "truth", color: "bg-indigo-300" },
                        { tag: "salvation", color: "bg-teal-300" },
                        { tag: "forgiveness", color: "bg-lime-200" },
                        { tag: "obedience", color: "bg-sky-300" },
                        { tag: "righteousness", color: "bg-emerald-300" },
                        { tag: "kindness", color: "bg-rose-200" },
                        { tag: "mercy", color: "bg-cyan-200" },
                        { tag: "discipline", color: "bg-amber-200" },
                        { tag: "patience", color: "bg-fuchsia-200" },
                        { tag: "humility", color: "bg-slate-300" },
                        { tag: "truthfulness", color: "bg-violet-200" },
                        { tag: "reverence", color: "bg-yellow-300" },
                        { tag: "fellowship", color: "bg-green-200" },
                        { tag: "generosity", color: "bg-rose-300" },
                        { tag: "devotion", color: "bg-purple-200" },
                        { tag: "holiness", color: "bg-indigo-200" },
                        { tag: "light", color: "bg-zinc-200" },
                        { tag: "eternity", color: "bg-cyan-300" },
                        { tag: "healing", color: "bg-lime-300" },
                        { tag: "purpose", color: "bg-orange-300" },
                        { tag: "truth", color: "bg-indigo-400" },
                        { tag: "courage", color: "bg-red-400" },
                      ].map(({ tag, color }: any) => {
                        const isThere = tags?.find(
                          (item: any) => tag === item?.tag
                        );
                        return (
                          <CommandItem
                            key={tag}
                            value={tag}
                            onSelect={(currentValue) => {
                              if (isThere) return;
                              addTag({
                                tagId: currentValue,
                                tag: tag,
                                color: color,
                              });
                              setOpenTags(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "ml-auto",
                                isThere ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {tag}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {tags?.length ? (
              <div className="flex justify-between   space-x-4 items-start rounded-md ">
                <div className="flex flex-1 flex-wrap items-center gap-2 w-20">
                  {tags?.map(({ tag, color }: any, index: any) => (
                    <div
                      key={index}
                      className={`scroll-ml-6 border rounded-full px-3 py-1 flex justify-between items-center w-fit ${color}`}
                    >
                      <span>{tag}</span>
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
          <Controller
            control={control}
            name="memorised"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <RadioGroup
                  onValueChange={onChange}
                  defaultValue={value}
                  className="flex flex-col"
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="memorised" id="r2" />
                    <Label htmlFor="r2">I have Memorised</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="saved" id="r3" />
                    <Label htmlFor="r3">I want to save</Label>
                  </div>
                </RadioGroup>
                {error && (
                  <p className="text-red-500 text-sm">{error.message}</p>
                )}
              </>
            )}
          />
          <div className="flex flex-col">
            <Button className="rounded-md bg-[#fa9a40]">
              {createOnusStates?.pending && (
                <LuLoader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add Verse
            </Button>
            {createOnusStates?.error ? (
              <p className="text-red-500 text-sm text-center">
                Sorry, an error occured.
              </p>
            ) : null}
          </div>
        </form>
      )}
    </>
  );
}
