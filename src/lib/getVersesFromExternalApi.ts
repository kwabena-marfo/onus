/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function getVersesFromExternalApi({
  book,
  chapter,
  translation,
  verses,
}: any) {
  try {
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
