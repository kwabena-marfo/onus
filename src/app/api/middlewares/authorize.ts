/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/lib/auth";

export default function requireAuth() {
  return async (c: any, next: () => Promise<void>) => {
    try {
      const session = await auth.api.getSession({ headers: c.req.raw.headers });

      if (!session) {
        c.set("user", null);
        c.set("session", null);
        return c.json({ error: "Unauthorized" }, 401);
      }
      c.set("user", session.user);
      c.set("session", session.session);
      await next();
    } catch (err) {
      return c.json({ error: "Unauthorized" }, 401);
    }
  };
}
