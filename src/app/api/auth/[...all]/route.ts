import { authApp } from "@/lib/auth";
import { handle } from "hono/vercel";

export const GET = handle(authApp);
export const POST = handle(authApp);
