/* eslint-disable @typescript-eslint/no-explicit-any */
export default function createOnusChecker(prisma: any) {
  return async (c: any, next: any) => {
    try {
      const session = c.get("session");

      const body = await c.req.json();
      const { book, chapter, verse, verseTo, isUpdate, onusVerse } = body;

      if (isUpdate === "yes") return await next();

      const existingOnus = await prisma.verses.findFirst({
        where: {
          book,
          chapter,
          verse,
          verseTo,
          onusVerse: {
            equals: onusVerse,
            mode: "insensitive",
          },
          userId: session?.user?.id,
        },
      });

      if (existingOnus) {
        return c.json(
          { error: "Sorry, this verse has already been added" },
          400
        );
      }

      await next();
    } catch (error) {
      console.error(error);
      return c.json({ error: "An Error Occurred" }, 500);
    }
  };
}
