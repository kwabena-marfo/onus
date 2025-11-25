/* eslint-disable @typescript-eslint/no-explicit-any */

import formatVersesFromExternalData from "@/lib/formatVersesFromExternalData";
import getVersesFromExternalApi from "@/lib/getVersesFromExternalApi";

export default function createOnusChecker(prisma: any) {
  return async (c: any, next: any) => {
    try {
      const user = c.get("user");
      console.log(user);

      const body = await c.req.json();

      const {
        id,
        foundBookIndex,
        book,
        chapter,
        verse,
        verseTo,
        onusVerse,
        verseNotes,
        tags,
        memorised,
      } = body;

      if (id) {
        await prisma.verses.update({
          where: { userId: user.id, id },
          data: {
            verseNotes,
            tags,
            memorised,
          },
        });
        return c.json({ message: "Verse edited successfully" });
      }

      const existingVerse = await prisma.verses.findFirst({
        where: {
          userId: user.id,
          book,
          chapter,
          verse,
          ...(verseTo ? { verseTo } : { verseTo: null }),
        },
      });

      if (existingVerse) return c.json({ error: "Verse already exists" }, 400);

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

      await next();
    } catch (error) {
      console.error(error);
      return c.json({ error: "An Error Occurred" }, 400);
    }
  };
}
