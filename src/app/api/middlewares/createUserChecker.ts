/* eslint-disable @typescript-eslint/no-explicit-any */

export default function createUserChecker(prisma: any) {
  return async (c: any, next: any) => {
    try {
      const { email } = await c.req.json();

      const existingUser = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (existingUser)
        return c.json("This email is already associated with an account", 400);

      await next();
    } catch (error) {
      console.log({ error });
      return c.json("An Error Occured", 500);
    }
  };
}
