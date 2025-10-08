import formatVersesFromExternalData from "@/lib/formatVersesFromExternalData";
import getVersesFromExternalApi from "@/lib/getVersesFromExternalApi";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function createOnusChecker(prisma: any) {
  return async (c: any, next: any) => {
    try {
      const session = c.get("session");
      const body = await c.req.json();
      const {
        foundBookIndex,
        chapter,
        verse,
        verseTo,
        onusVerse,
        book,
        isUpdate,
      } = body;

      if (!onusVerse) {
        // Fetch verses from API
        const fetchedVerses = await getVersesFromExternalApi({
          book: foundBookIndex,
          chapter,
          translation: "NKJV",
          verses: Array.from(
            { length: +verseTo || +verse - +verse + 1 },
            (_, i) => +verse + i
          ),
        });

        const formattedVerse = formatVersesFromExternalData(fetchedVerses);

        c.set("onusVerse", formattedVerse);
      }

      if (isUpdate === "yes") return await next();

      // Check for existing verse
      const existingOnus = await prisma.verses.findFirst({
        where: {
          book,
          chapter,
          verse,
          userId: session?.user?.id,
          ...(verseTo !== null && verseTo !== undefined
            ? { verseTo }
            : { verseTo: null }),
        },
      });

      if (existingOnus) {
        return c.json("Sorry, this verse has already been added", 400);
      }

      // Continue to next middleware or handler
      await next();
    } catch (error) {
      console.error(error);
      return c.json("An Error Occurred", 500);
    }
  };
}
