/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function getVersesFromExternalApi({
  book,
  chapter,
  translation,
  verse,
  verseTo,
}: any) {
  try {
    const start = Number(verse);
    const end = verseTo ? Number(verseTo) : start;

    const verses = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const url = `https://bolls.life/get-verses/`;
    const response = await axios.post(url, [
      {
        translation,
        book: +book + 1,
        chapter: +chapter,
        verses,
      },
    ]);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Sorry an error occured");
  }
}
