/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ChapterAndVerse({
  Controller,
  control,
  book,
  foundBook,
  chapter,
  verse,
}: any) {
  return (
    <div className="flex gap-3 w-full justify-center items-center">
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

      <p>to</p>

      <Controller
        control={control}
        name="verseTo"
        rules={{ required: "Required" }}
        render={({
          field: { onChange, value },
          fieldState: { error },
        }: any) => {
          const totalVerses = foundBook?.versesPerChapter[+chapter - 1] || 0;

          // Start from the verse after the selected "verse"
          const start = verse ? +verse + 1 : 1;

          return (
            <Select
              onValueChange={onChange}
              value={value || ""}
              disabled={!chapter || !verse} // disable until verse is selected
            >
              <SelectTrigger className={`w-full ${error && "border-red-500"}`}>
                <SelectValue placeholder="Verse" />
              </SelectTrigger>
              <SelectContent className="h-52">
                {Array.from(
                  { length: totalVerses - start + 1 },
                  (_, i) => start + i
                ).map((v) => (
                  <SelectItem key={v} value={`${v}`}>
                    Verse {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }}
      />
    </div>
  );
}
