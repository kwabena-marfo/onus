/* eslint-disable @typescript-eslint/no-explicit-any */
export default function createOnusChecker(prisma: any) {
  return async (c: any, next: any) => {
    try {
      const session = c.get("session");

      const body = await c.req.json();
      const { book, chapter, verse, verseTo, isUpdate } = body;

      if (isUpdate === "yes") return await next();

      const existingOnus = await prisma.verses.findFirst({
        where: {
          book,
          chapter,
          verse,
          verseTo,
          userId: session?.user?.id,
        },
      });

      if (existingOnus) {
        return c.json("Sorry, this verse has already been added", 400);
      }

      await next();
    } catch (error) {
      console.error(error);
      return c.json("An Error Occurred", 500);
    }
  };
}
