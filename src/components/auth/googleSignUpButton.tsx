"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { LucideLoader2 } from "lucide-react";
import { LuLoaderCircle } from "react-icons/lu";

type GooglesignUpButtonProps = {
  className?: string;
};

export default function GoogleSignUpButton({
  className,
}: GooglesignUpButtonProps) {
  const { signUp, isLoaded } = useSignUp();

  const [uiError, setUiError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setUiError(null);
    setIsLoading(true);

    try {
      if (!signUp) throw new Error("Clerk signUp is not initialized");

      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: `${window.location.origin}/sso-callback`,
        redirectUrlComplete: `${window.location.origin}/app/dashboard`,
      });
    } catch (error) {
      console.error("Google Auth Error:", error);
      setUiError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  if (!isLoaded)
    return (
      <div className="flex flex-1 items-center justify-center py-4">
        <LuLoaderCircle className="animate-spin w-4 h-4" />
      </div>
    );

  return (
    <>
      {uiError && (
        <div className="rounded-xl border border-red-300 bg-red-100 p-3">
          <p className="font-semibold text-red-700">Sign-in Failed</p>
          <p className="text-red-600">{uiError}</p>
        </div>
      )}

      <Button
        onClick={handleGoogleLogin}
        type="button"
        variant="outline"
        className={className}
      >
        {isLoading && <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />}
        <FaGoogle className="mr-2" /> Continue With Google
      </Button>
    </>
  );
}
