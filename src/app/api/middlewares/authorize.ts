/* eslint-disable @typescript-eslint/no-explicit-any */

import { getAuth } from "@clerk/nextjs/server";

export default function authMiddleware(prisma: any) {
  return async (c: any, next: any) => {
    try {
      const { userId: clerkId } = getAuth(c.req.raw);

      // No Clerk session?
      if (!clerkId) return c.json({ error: "Unauthorized" }, 401);

      // Check if user exists in your DB
      const user = await prisma.user.findFirst({
        where: { clerkId },
      });

      if (!user) return c.json({ error: "User not found in database" }, 404);

      // Attach DB user to context
      c.set("user", user);

      await next();
    } catch (error) {
      console.error("Auth Middleware Error:", error);
      return c.json({ error: "Authentication failed" }, 401);
    }
  };
}
