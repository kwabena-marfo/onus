"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { LuLoaderCircle } from "react-icons/lu";

export default function SSOCallbackPage() {
  return (
    <div className="flex flex-col justify-center items-center mt-8 z-50">
      <LuLoaderCircle className="animate-spin text-black h-8 w-8 mt-2" />
      <p>Signing In</p>

      <AuthenticateWithRedirectCallback
        signInForceRedirectUrl={`${window.location.origin}/save-user`}
        signUpForceRedirectUrl={`${window.location.origin}/save-user`}
      />
    </div>
  );
}
