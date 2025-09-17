/* eslint-disable @typescript-eslint/no-explicit-any */
export default function createOnusChecker(prisma: any) {
  return async (c: any, next: any) => {
    try {
      const body = await c.req.json();
      const { book, chapter, verse, verseTo, version, isUpdate, onusVerse } =
        body;

      // Skip checker if it's an update
      if (isUpdate) return await next();

      const existingOnus = await prisma.verses.findFirst({
        where: {
          book,
          chapter,
          verse,
          verseTo,
          version,
          onusVerse: {
            equals: onusVerse,
            mode: "insensitive", // ignores case
          },
        },
      });

      if (existingOnus)
        return c.json("Sorry this verse has already been added", 400);

      await next();
    } catch (error) {
      console.log(error);
      throw new Error("An Error Occurred");
    }
  };
}
