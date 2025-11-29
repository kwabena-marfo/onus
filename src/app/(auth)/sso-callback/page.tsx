"use client";

import { useState, useEffect } from "react";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { LuLoaderCircle } from "react-icons/lu";

export default function SSOCallbackPage() {
  const [origin, setOrigin] = useState<string | null>(null);

  useEffect(() => {
    // Safe to access window here
    setOrigin(window.location.origin);
  }, []);

  // Don’t render Clerk callback until origin is ready
  if (!origin) {
    return (
      <div className="flex flex-col justify-center items-center mt-8 z-50">
        <LuLoaderCircle className="animate-spin text-black h-8 w-8 mt-2" />
        <p>Signing In…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center mt-8 z-50">
      <LuLoaderCircle className="animate-spin text-black h-8 w-8 mt-2" />
      <p>Signing In…</p>

      <AuthenticateWithRedirectCallback
        signInForceRedirectUrl={`${origin}/save-user`}
        signUpForceRedirectUrl={`${origin}/save-user`}
      />
    </div>
  );
}
