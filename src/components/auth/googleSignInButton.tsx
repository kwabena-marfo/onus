"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { LucideLoader2 } from "lucide-react";

type GoogleSignInButtonProps = {
  className?: string;
};

export default function GoogleSignInButton({
  className,
}: GoogleSignInButtonProps) {
  const { signIn } = useSignIn();

  const [uiError, setUiError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setUiError(null);
    setIsLoading(true);

    try {
      if (!signIn) throw new Error("Clerk signIn is not initialized");

      const createdUser = await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: `${window.location.origin}/sso-callback`,
        redirectUrlComplete: `${window.location.origin}/app/dashboard`,
      });

      console.log(createdUser);
    } catch (error) {
      console.error("Google Auth Error:", error);
      setUiError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

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
