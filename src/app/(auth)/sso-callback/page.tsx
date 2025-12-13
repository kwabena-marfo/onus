"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { LuLoaderCircle } from "react-icons/lu";

export default function SSOCallbackPage() {
  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <LuLoaderCircle className="animate-spin h-8 w-8 mb-2" />
      <p>Signing in…</p>

      <AuthenticateWithRedirectCallback />
    </div>
  );
}
