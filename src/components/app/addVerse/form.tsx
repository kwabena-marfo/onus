/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import { useGetOnus } from "@/hooks/global/useSWRFetch";

import { cn } from "@/lib/utils";

import useTriggerRequest from "@/hooks/global/useTriggerRequest";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BsCheck2Circle, BsHandThumbsUp } from "react-icons/bs";
import { LuLoaderCircle } from "react-icons/lu";
import { BsTriangleFill } from "react-icons/bs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { LuLoader } from "react-icons/lu";
import BibleBook from "./fields/book";
import ChapterAndVerse from "./fields/chapterAndVerse";
import VerseAndNotes from "./fields/verseAndNotes";
import Tags from "./fields/tags";
import DeleteVerse from "./deleteVerse";

export default function AddVerseForm({ className, verse }: any) {
  const { onusData, getOnusIsLoading, getOnusIsError, mutateGetOnus } =
    useGetOnus();

  const {
    reqFunction: createOnus,
    reqState: createOnusStates,
    setReqState: resetCreateOnusStates,
  } = useTriggerRequest();

  const { reqFunction: delOnus, reqState: delOnusState } = useTriggerRequest();

  const { handleSubmit, reset, watch, control } = useForm({
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

  useEffect(() => {
    if (createOnusStates?.data) {
      reset({
        book: null,
        chapter: "",
        verse: "",
        onusVerse: "",
        verseNotes: "",
        tags: [],
        memorised: "", // or "saved", or whatever default value you use
        color: "blue", // default color if needed
      });
      mutateGetOnus();
    }
  }, [createOnusStates]);

  if (getOnusIsLoading) return <LuLoaderCircle className="animate-spin" />;

  if (getOnusIsError) return <BsTriangleFill />;

  const onSubmit = async (data: any) => {
    await createOnus({
      route: "/api/app/create-onus",
      reqType: "post",
      data: {
        ...data,
        ...(verse ? { isUpdate: "yes" } : {}),
      },
    });
  };

  return (
    <>
      {createOnusStates?.data ? (
        <div className="flex flex-col justify-center items-center gap-3 p-4">
          <BsCheck2Circle className="md:w-16 md:h-16 w-12 h-12 text-green-700" />
          <h1 className="text-center text-xl md:text-3xl font-bold text-gray-700">
            All Done, Verse Added!
          </h1>
          <p className="text-center text-lg">
            Keep Growing dearly beloved of the Lord, You are already winning.
          </p>
          <Button
            onClick={() => {
              resetCreateOnusStates(null);
            }}
            className="w-full bg-[#fa9a40] text-gray-800"
          >
            Sure! <BsHandThumbsUp />
          </Button>
        </div>
      ) : (
        <>
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

            <div className="flex  gap-3 w-full justify-between">
              <BibleBook
                Controller={Controller}
                control={control}
                onusData={onusData}
              />
              <ChapterAndVerse
                Controller={Controller}
                watch={watch}
                control={control}
              />
            </div>

            <VerseAndNotes Controller={Controller} control={control} />

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
              <Button className="rounded-md bg-[#fa9a40]">
                {createOnusStates?.pending && (
                  <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                )}
                Add Verse
              </Button>
              {createOnusStates?.error ? (
                <p className="text-red-500 text-sm text-center">
                  {createOnusStates?.error as any}
                </p>
              ) : null}
            </div>
          </form>

          {verse ? (
            <DeleteVerse
              ids={[verse?.id]}
              mutateGetOnus={mutateGetOnus}
              delOnusState={delOnusState}
              delOnus={delOnus}
            />
          ) : null}
        </>
      )}
    </>
  );
}
