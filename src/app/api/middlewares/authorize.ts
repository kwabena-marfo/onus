/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth";
import { jwtVerify } from "jose";
import type { Context, Next } from "hono";
import { authOptions } from "@/lib/authOptions";

export default function authorizeMiddleware() {
  return async (c: Context, next: Next) => {
    try {
      let user: any = null;

      try {
        const session = await getServerSession(authOptions);
        if (session?.user) {
          user = session.user;
        }
      } catch {
        // Not running in Next.js, skip
      }

      // 2. Try Mobile auth (JWT)
      if (!user) {
        const authHeader = c.req.header("Authorization");

        if (authHeader?.startsWith("Bearer ")) {
          const token = authHeader.split(" ")[1];
          try {
            const secret = new TextEncoder().encode(
              process.env.CLIENT_SECRETE as string
            );
            const { payload } = await jwtVerify(token, secret);
            user = payload;
          } catch (err) {
            console.error("JWT verification failed:", err);
          }
        }
      }

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // Attach to context
      c.set("session", { user });
      await next();
    } catch (err) {
      console.log("Auth middleware error:", err);
      return c.json({ error: "Unauthorized" }, 401);
    }
  };
}
