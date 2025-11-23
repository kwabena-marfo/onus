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
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);

      if (!signIn) throw new Error("Clerk signIn is not initialized");

      // Start Google OAuth with a proper absolute redirect URL
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: window.location.origin + "/sso-callback",
        redirectUrlComplete: window.location.origin + "/sso-callback",
      });
    } catch (error) {
      console.error("Google SignIn Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      type="button"
      variant="outline"
      className={className}
    >
      {isLoading && <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />}
      <FaGoogle className="mr-2" /> Continue With Google
    </Button>
  );
}
