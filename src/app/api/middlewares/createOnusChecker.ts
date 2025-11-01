import formatVersesFromExternalData from "@/lib/formatVersesFromExternalData";
import getVersesFromExternalApi from "@/lib/getVersesFromExternalApi";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function createOnusChecker(prisma: any) {
  return async (c: any, next: any) => {
    try {
      const session = c.get("session");

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
          where: { userId: session.user.id, id },
          data: {
            verseNotes,
            tags,
            memorised,
          },
        });
        return c.json({ message: "Verse edited successfully" });
      }

      console.log({ userId: session.user.id, book, chapter, verse, verseTo });

      const existingVerse = await prisma.verses.findFirst({
        where: {
          userId: session.user.id,
          book,
          chapter,
          verse,
          ...(verseTo ? { verseTo } : { verseTo: null }),
        },
      });

      if (existingVerse) {
        return c.json({ error: "Verse already exists" }, 400);
      }

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
