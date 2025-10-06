/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LuLoaderCircle, LuSearch } from "react-icons/lu";

export default function ChapterAndVerse({
  Controller,
  control,
  book,
  foundBook,
  chapter,
  verse,
  onusVerse,
  verseTo,
  foundBookIndex,
  getVerseStates,
  getVerse,
  errors,
}: any) {
  const handeGetVerse = async () => {
    await getVerse({
      route: `/api/app/get-verses`,
      reqType: "post",
      data: {
        translation: "NKJV",
        book: foundBookIndex,
        chapter,
        verses: Array.from(
          { length: +verseTo - +verse + 1 },
          (_, i) => +verse + i
        ),
      },
    });
  };
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex gap-2 w-full justify-between items-center">
        <Controller
          control={control}
          name="chapter"
          rules={{ required: "Required" }}
          render={({
            field: { onChange, value },
            fieldState: { error },
          }: any) => {
            return (
              <div className="flex flex-col gap-1 flex-1 w-full">
                <Label>Chapter</Label>
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
                        {index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
              <div className="flex flex-col gap-1 flex-1 w-full">
                <Label>Verse</Label>
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
                          {index + 1}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            );
          }}
        />

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
              <div className="flex flex-col gap-1 flex-1 w-full">
                <Label>To</Label>

                <Select
                  onValueChange={onChange}
                  value={value || ""}
                  disabled={!chapter || !verse} // disable until verse is selected
                >
                  <SelectTrigger
                    className={`w-full ${error && "border-red-500"}`}
                  >
                    <SelectValue placeholder="Verse" />
                  </SelectTrigger>
                  <SelectContent className="h-52">
                    {Array.from(
                      { length: totalVerses - start + 1 },
                      (_, i) => start + i
                    ).map((v) => (
                      <SelectItem key={v} value={`${v}`}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          }}
        />
        <div className="flex flex-col flex-1">
          <Button
            type="button"
            variant="outline"
            onClick={handeGetVerse}
            disabled={!(foundBookIndex + 1) || !chapter || !verse}
            className="flex-1 mt-5 w-full"
          >
            {" "}
            {getVerseStates?.pending ? (
              <LuLoaderCircle className="animate-spin" />
            ) : (
              <LuSearch />
            )}{" "}
          </Button>
        </div>

        {errors?.onusVerse && (
          <p className="text-red-500 text-sm">{errors?.onusVerse?.message}</p>
        )}
      </div>
      {onusVerse ? (
        <Textarea
          rows={3}
          readOnly
          value={onusVerse?.replace(/<[^>]*>?/gm, "")}
          placeholder="Verse Appears Here"
          className="text-[16px]"
        />
      ) : null}
      {errors?.onusVerse && (
        <p className="text-red-500 text-sm">{errors?.onusVerse?.message}</p>
      )}
    </div>
  );
}
