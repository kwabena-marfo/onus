/* eslint-disable @typescript-eslint/no-explicit-any */
export default function createOnusChecker(prisma: any) {
  return async (c: any, next: any) => {
    try {
      const body = await c.req.json();
      const { book, chapter, verse, version, isUpdate } = body;

      // Skip checker if it's an update
      if (isUpdate) {
        await next();
        return;
      }

      const existingOnus = await prisma.verses.findFirst({
        where: {
          AND: [{ book }, { chapter }, { verse }, { version }],
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
