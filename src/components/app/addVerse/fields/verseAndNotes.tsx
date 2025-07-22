/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LuLoaderCircle } from "react-icons/lu";

export default function VerseAndNotes({
  Controller,
  control,
  chapter,
  foundBookIndex,
  verse,
  getVerse,
  getVerseStates,
}: any) {
  const handeGetVerse = async () => {
    await getVerse({
      route: `/api/app/get-verse/NKJV/${(
        foundBookIndex + 1
      ).toString()}/${chapter}/${verse}`,
      reqType: "get",
    });
  };

  console.log({ foundBookIndex, chapter, verse, getVerseStates });

  return (
    <>
      <div className="grid gap-2">
        <Controller
          name="onusVerse"
          control={control}
          rules={{ required: "Verse is required" }}
          render={({
            field: { onChange, value },
            fieldState: { error },
          }: any) => (
            <div className="grid gap-1">
              <Label>Verse</Label>
              <Textarea
                onChange={onChange}
                value={getVerseStates?.data?.text || value || ""}
                placeholder="Write Verse"
                className="text-[16px]"
              />
              {error && <p className="text-red-500 text-sm">{error.message}</p>}
            </div>
          )}
        />

        <Button
          type="button"
          variant="outline"
          onClick={handeGetVerse}
          disabled={!(foundBookIndex + 1) || !chapter || !verse}
          className="w-full"
        >
          {" "}
          {getVerseStates?.pending ? (
            <LuLoaderCircle className="animate-spin" />
          ) : (
            "Fetch Verse"
          )}{" "}
        </Button>
      </div>

      <Controller
        name="verseNotes"
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
        }: any) => (
          <div className="grid gap-1">
            <Label htmlFor="verseNotes">Notes</Label>
            <Textarea
              onChange={onChange}
              value={value || ""}
              placeholder="Write Notes"
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </div>
        )}
      />
    </>
  );
}
