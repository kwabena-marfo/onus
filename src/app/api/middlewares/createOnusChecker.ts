/* eslint-disable @typescript-eslint/no-explicit-any */

import formatVersesFromExternalData from "@/lib/formatVersesFromExternalData";
import getVersesFromExternalApi from "@/lib/getVersesFromExternalApi";

export default function createOnusChecker(prisma: any) {
  return async (c: any, next: any) => {
    try {
      const user = c.get("user");

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
        await prisma.verse.update({
          where: { userId: user.id, id },
          data: {
            verseNotes,
            tags,
            memorised,
          },
        });
        return c.json({ message: "Verse edited successfully" });
      }

      const start = Number(verse);
      const end = verseTo ? Number(verseTo) : start;

      if (end < start) {
        return c.json({ error: "Invalid verse range" }, 400);
      }

      const verseStart = Number(verse);
      const verseEnd = verseTo ? Number(verseTo) : Number(verse);

      const existingVerse = await prisma.verse.findFirst({
        where: {
          userId: user.id,
          book,
          chapter,

          AND: [
            {
              OR: [
                // existing single verse OR range starts before new range ends
                {
                  verse: {
                    lte: verseEnd.toString(),
                  },
                },
              ],
            },
            {
              OR: [
                // existing range OR single verse ends after new range starts
                {
                  verseTo: {
                    gte: verseStart.toString(),
                  },
                },
                {
                  verseTo: null,
                },
              ],
            },
          ],
        },
      });

      if (existingVerse) {
        return c.json(
          { error: "Verse overlaps with an existing saved verse range" },
          400,
        );
      }

      if (!onusVerse) {
        // Fetch verses from API
        const fetchedVerses = await getVersesFromExternalApi({
          book: foundBookIndex,
          chapter,
          translation: "NIV",
          verse,
          verseTo,
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
