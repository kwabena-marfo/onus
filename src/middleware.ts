import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico).*)",

    // Apply to all API routes *except* the Google callback
    "/api/(.*)",

    "/((?!api/auth/create-user).*)",
  ],
};
