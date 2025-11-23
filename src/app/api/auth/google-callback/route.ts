/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { createUserLogic } from "../../lib/create-user";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // Get userId from session
  const { userId } = getAuth(req); // NO await

  console.log("Clerk userId:", userId);

  if (!userId) return new Response("Unauthorized", { status: 401 });

  // Fetch full user from Clerk
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  // Save user in your database
  const result = await createUserLogic({
    name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
    email: user.emailAddresses[0]?.emailAddress,
    clerkId: userId,
  });

  console.log("New User Synced:", result);

  // Redirect to dashboard
  return Response.redirect(new URL("/app/dashboard", req.url));
}
