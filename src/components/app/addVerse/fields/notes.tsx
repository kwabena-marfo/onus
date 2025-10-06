/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function VerseAndNotes({ Controller, control }: any) {
  return (
    <>
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
