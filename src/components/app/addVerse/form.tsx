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
import { Textarea } from "@/components/ui/textarea";
import {
  useDeleteVerse,
  useFetchVersesApi,
  useGetVerses,
  usePostVerse,
} from "@/hooks/useQuery";
import IsLoadingError from "../isLoadingError";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function AddVerseForm({ className, verse }: any) {
  const {
    data: onusData,
    isLoading: getOnusIsLoading,
    isError: getOnusIsError,
    error: getOnusError,
  } = useGetVerses();

  const {
    trigger: fetchVerses,
    isPending: fetchVersesLoading,
    data: fetchVersesData,
    isError: isFetchVersesError,
    error: fetchVersesError,
  } = useFetchVersesApi();

  const {
    trigger: postVerse,
    reset: resetPostVers,
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
    ...(verse
      ? {
          defaultValues: {
            ...verse,
          },
        }
      : { defaultValues: { tags: [] } }),
  });

  const {
    fields: tags,
    append: addTag,
    remove: removeTag,
  } = useFieldArray<any>({
    control,
    name: "tags",
    shouldUnregister: true,
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
  }, [isSuccess]);

  useEffect(() => {
    if (fetchVersesData) {
      const formattedVerse = formatVersesFromExternalData(fetchVersesData);
      setValue("onusVerse", formattedVerse);
    }
  }, [fetchVersesData]);

  const onSubmit = async (data: any) => {
    await postVerse({
      ...data,
      foundBookIndex,
      ...(verse ? { id: verse?.id } : {}),
    });
  };

  if (getOnusIsLoading || getOnusIsError)
    return (
      <IsLoadingError
        isLoading={getOnusIsLoading}
        error={getOnusError}
        isError={getOnusIsError}
      />
    );

  return (
    <div className="flex flex-col items-center justify-center">
      {isSuccess ? (
        <div className="flex flex-col justify-center items-center gap-3 p-4">
          <BsCheck2Circle className="md:w-16 md:h-16 w-12 h-12 text-green-700" />
          <h1 className="text-center text-xl md:text-3xl font-bold text-gray-700">
            All Done, Verse {verse ? "Edited" : "Added"}!
          </h1>
          <p className="text-center text-lg">
            Keep Growing dearly beloved of the Lord, You are already winning.
          </p>
          <Button
            onClick={() => {
              if (verse) router.refresh();
              resetPostVers();
            }}
            className="w-full bg-[#fa9a40] text-gray-800"
          >
            Sure! <BsHandThumbsUp />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn(
              "flex flex-col justify-self-center w-full gap-3 z-50 bg-white p-4 rounded-md",
              className,
            )}
          >
            <div className="flex flex-col gap-0 justify-center items-center ">
              <p className="text-3xl md:text-4xl font-bold">
                {verse ? "Edit" : "Add"} Verse
              </p>
              {!verse ? (
                <p className="text-center">
                  Your Journey to Spritual Growth Begins here
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1">
              {!verse ? (
                <div className="flex  gap-3 w-full justify-between flex-wrap">
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
                <p className="md:text-lg font-bold uppercase">
                  {book} {chapter}:{verseValue}
                  {verseToValue ? `-${verseToValue}` : null}
                </p>
              )}

              {onusVerse ? (
                <>
                  <div className="gap-1 rounded-lg border border-dashed p-2">
                    {onusVerse?.replace(/<[^>]*>?/gm, "")}
                  </div>
                </>
              ) : null}
            </div>

            <Notes Controller={Controller} control={control} />

            <Tags
              tags={tags}
              addTag={addTag}
              removeTag={removeTag}
              watch={watch}
            />

            <Controller
              control={control}
              name="memorised"
              rules={{ required: "Please choose verse status" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <div className="grid gap-1">
                  <RadioGroup
                    onValueChange={onChange}
                    defaultValue={value}
                    className="flex flex-row w-full"
                  >
                    <div className="flex items-center gap-3 p-2 border rounded-lg w-full">
                      <RadioGroupItem value="memorised" id="r2" />
                      <Label htmlFor="r2">I have Memorised</Label>
                    </div>
                    <div className="flex items-center gap-3 p-2 border rounded-lg w-full">
                      <RadioGroupItem value="saved" id="r3" />
                      <Label htmlFor="r3">I want to save</Label>
                    </div>
                  </RadioGroup>
                  {error && (
                    <p className="text-red-500 text-sm">{error.message}</p>
                  )}
                </div>
              )}
            />
            <div className="flex flex-col gap-3">
              <Button
                disabled={postVerseLoading}
                className="rounded-md bg-[#fa9a40] "
              >
                {postVerseLoading && (
                  <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                )}
                {verse ? "Edit Verse" : "Add Verse"}
              </Button>
              {postVerseIsError ? (
                <p className="text-left text-red-500">
                  {(postVerseError as AxiosError<{ error: string }>)?.response
                    ?.data?.error || "Something went wrong"}
                </p>
              ) : null}
            </div>
          </form>

          {verse ? (
            <DeleteVerse
              ids={verse?.id}
              deletePostLoading={deletePostLoading}
              deletePost={deletePost}
              deletePostError={deletePostError}
              isDeletePostError={isDeletePostError}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
