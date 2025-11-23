/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@clerk/nextjs/server";

export default function createUserChecker(prisma: any) {
  return async (c: any, next: any) => {
    const { userId } = await auth();
    try {
      if (!userId) return c.json("An Error Occured", 500);

      const existingUser = await prisma.user.findFirst({
        where: {
          clerkId: userId,
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
