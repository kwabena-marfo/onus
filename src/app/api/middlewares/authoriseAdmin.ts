/* eslint-disable @typescript-eslint/no-explicit-any */

export default function requireAdminAuth() {
  return async (c: any, next: () => Promise<void>) => {
    try {
      const user = c.get("user");

      if (
        !user ||
        !["marfobrempong@gmail.com", "frankappiah499@gmail.com"].includes(
          user.email,
        )
      ) {
        return c.json({ error: "Forbidden" }, 403);
      }

      await next();
    } catch (err) {
      return c.json({ error: "Unauthorized" }, 401);
    }
  };
}
