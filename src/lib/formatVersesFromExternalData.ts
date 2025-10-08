/* eslint-disable @typescript-eslint/no-explicit-any */

export default function formatVersesFromExternalData(data: any) {
  const [verseFetched]: any = data;
  const combinedVerses =
    verseFetched?.length === 1
      ? verseFetched[0]?.text.trim()
      : verseFetched
          ?.map(
            (v: { verse: any; text: string }) => `${v.verse}. ${v.text.trim()}`
          )
          .join(" ");

  return combinedVerses;
}
