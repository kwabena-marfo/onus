/* eslint-disable @typescript-eslint/no-explicit-any */

import bibleData from "@/data/bible.json";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ChapterAndVerse({ Controller, control, watch }: any) {
  const book = watch("book");
  const chapter = watch("chapter");

  const foundBook = bibleData.find((b: any) => b.value === book);

  return (
    <div className="flex gap-3 w-full">
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
                disabled={!book ? true : false}
              >
                <SelectTrigger
                  className={` w-full ${error && "border-red-500"}`}
                >
                  <SelectValue placeholder="Chapter" />
                </SelectTrigger>
                <SelectContent className="h-52">
                  {foundBook?.versesPerChapter.map((_: any, index: any) => (
                    <SelectItem key={index} value={`${index + 1}`}>
                      Chapter {index + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                disabled={!chapter ? true : false}
              >
                <SelectTrigger
                  className={`w-full ${error && "border-red-500"}`}
                >
                  <SelectValue placeholder="Verse" />
                </SelectTrigger>
                <SelectContent className="h-52">
                  {new Array(foundBook?.versesPerChapter[+chapter - 1])
                    .fill(" ")
                    .map((_: any, index: any) => (
                      <SelectItem key={index} value={`${index + 1}`}>
                        Verse {index + 1}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </>
          );
        }}
      />
    </div>
  );
}
