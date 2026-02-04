/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import bibleData from "@/data/bibleFull.json";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BsCheck2Circle, BsHandThumbsUp } from "react-icons/bs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LuLoader } from "react-icons/lu";

import BibleBook from "./fields/book";
import ChapterAndVerse from "./fields/chapterAndVerse";
import Notes from "./fields/notes";
import Tags from "./fields/tags";
import DeleteVerse from "./deleteVerse";

import formatVersesFromExternalData from "@/lib/formatVersesFromExternalData";
import {
  useDeleteVerse,
  useFetchVersesApi,
  useGetVerses,
  usePostVerse,
} from "@/hooks/useQuery";
import IsLoadingError from "../isLoadingError";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import WhyNKJV from "../whyNKJV";

export default function AddVerseForm({ className, verse }: any) {
  const { data: onusData, isLoading, isError, error } = useGetVerses();

  const {
    trigger: fetchVerses,
    isPending: fetchVersesLoading,
    data: fetchVersesData,
    isError: isFetchVersesError,
    error: fetchVersesError,
  } = useFetchVersesApi();

  const {
    trigger: postVerse,
    reset: resetPostVerse,
    isPending: postVerseLoading,
    error: postVerseError,
    isError: postVerseIsError,
    isSuccess,
  } = usePostVerse();

  const {
    trigger: deletePost,
    isPending: deletePostLoading,
    error: deletePostError,
    isError: isDeletePostError,
  } = useDeleteVerse();

  const router = useRouter();

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    shouldFocusError: true,
    defaultValues: verse ? { ...verse } : { tags: [], color: "blue" },
  });

  const {
    fields: tags,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const book = watch("book");
  const chapter = watch("chapter");
  const verseValue = watch("verse");
  const verseToValue = watch("verseTo");
  const onusVerse = watch("onusVerse");

  const foundBook = bibleData.find((b: any) => b.value === book);
  const foundBookIndex = bibleData.findIndex((b: any) => b.value === book);

  useEffect(() => {
    if (isSuccess) {
      reset({
        book: null,
        chapter: "",
        verse: "",
        verseTo: "",
        onusVerse: "",
        verseNotes: "",
        tags: [],
        memorised: "",
        color: "blue",
      });
    }
  }, [isSuccess, reset]);

  useEffect(() => {
    if (fetchVersesData) {
      setValue("onusVerse", formatVersesFromExternalData(fetchVersesData));
    }
  }, [fetchVersesData, setValue]);

  const onSubmit = async (data: any) => {
    await postVerse({
      ...data,
      foundBookIndex,
      ...(verse && { id: verse.id }),
    });
  };

  if (isLoading || isError) {
    return (
      <IsLoadingError isLoading={isLoading} isError={isError} error={error} />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {isSuccess ? (
        <div className="flex flex-col items-center gap-3 p-6 text-center">
          <BsCheck2Circle className="w-14 h-14 text-green-600" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            All Done, Verse {verse ? "Edited" : "Added"}!
          </h1>
          <p className="text-muted-foreground">
            Keep growing dearly beloved of the Lord — you are already winning.
          </p>

          <Button
            onClick={() => {
              if (verse) router.refresh();
              resetPostVerse();
            }}
            className="bg-[#fa9a40] text-black"
          >
            Sure! <BsHandThumbsUp className="ml-2" />
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn(
            "flex flex-col gap-4 w-full max-w-2xl rounded-lg border bg-card p-4",
            className,
          )}
        >
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold">
              {verse ? "Edit" : "Add"} Verse
            </p>
            {!verse && (
              <p className="text-muted-foreground">
                Your journey to spiritual growth begins here
              </p>
            )}
          </div>

          {!verse ? (
            <div className="flex flex-wrap gap-3">
              <BibleBook
                Controller={Controller}
                bibleData={bibleData}
                control={control}
                onusData={onusData}
              />
              <ChapterAndVerse
                Controller={Controller}
                watch={watch}
                fetchVerses={fetchVerses}
                fetchVersesLoading={fetchVersesLoading}
                isFetchVersesError={isFetchVersesError}
                fetchVersesError={fetchVersesError}
                verseTo={verseToValue}
                onusVerse={onusVerse}
                control={control}
                errors={errors}
                book={book}
                chapter={chapter}
                verse={verseValue}
                foundBook={foundBook}
                foundBookIndex={foundBookIndex}
              />
            </div>
          ) : (
            <p className="text-lg font-bold uppercase">
              {book} {chapter}:{verseValue}
              {verseToValue && `-${verseToValue}`}
            </p>
          )}

          {onusVerse && (
            <>
              <div className="rounded-lg border border-dashed p-2 text-sm text-muted-foreground">
                {onusVerse.replace(/<[^>]*>?/gm, "")}
              </div>
              <WhyNKJV
                TriggerComp={() => (
                  <p className="text-right text-xs text-muted-foreground">
                    Why we use NIV?
                  </p>
                )}
              />
            </>
          )}

          <Notes Controller={Controller} control={control} />

          <Tags tags={tags} addTag={append} removeTag={remove} watch={watch} />

          <Controller
            control={control}
            name="memorised"
            rules={{ required: "Please choose verse status" }}
            render={({ field, fieldState }) => (
              <div className="grid gap-2">
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-3"
                >
                  {["memorised", "saved"].map((val) => (
                    <Label
                      key={val}
                      className="flex items-center gap-3 p-3 border rounded-lg w-full cursor-pointer"
                    >
                      <RadioGroupItem value={val} />
                      {val === "memorised" ? "Memorised" : "Save for now"}
                    </Label>
                  ))}
                </RadioGroup>
                {fieldState.error && (
                  <p className="text-sm text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Button disabled={postVerseLoading} className="bg-[#fa9a40]">
            {postVerseLoading && (
              <LuLoader className="mr-2 h-4 w-4 animate-spin" />
            )}
            {verse ? "Edit Verse" : "Add Verse"}
          </Button>

          {postVerseIsError && (
            <p className="text-center text-red-500">
              {(postVerseError as AxiosError<{ error: string }>)?.response?.data
                ?.error || "Something went wrong"}
            </p>
          )}
        </form>
      )}

      {verse && (
        <DeleteVerse
          ids={verse.id}
          deletePostLoading={deletePostLoading}
          deletePost={deletePost}
          deletePostError={deletePostError}
          isDeletePostError={isDeletePostError}
        />
      )}
    </div>
  );
}
