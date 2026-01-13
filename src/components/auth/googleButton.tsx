"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { LucideLoader2 } from "lucide-react";
import { LuLoaderCircle } from "react-icons/lu";
import { authClient } from "@/lib/authClient";

type GoogleAuthButtonProps = {
  className?: string;
};

export default function GoogleAuthButton({ className }: GoogleAuthButtonProps) {
  const [uiError, setUiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setUiError(null);
    setIsLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/app/dashboard",
      });

      // Redirect happens automatically
    } catch (err) {
      console.error("Google Auth Error:", err);
      setUiError("Google authentication failed.");
      setIsLoading(false);
    }
  };

  if (!authClient) {
    return (
      <div className="flex items-center justify-center py-4">
        <LuLoaderCircle className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {uiError && (
        <div className="rounded-xl border border-red-300 bg-red-100 p-3">
          <p className="font-semibold text-red-700">Authentication Failed</p>
          <p className="text-red-600">{uiError}</p>
        </div>
      )}

      <Button
        onClick={handleGoogleAuth}
        type="button"
        variant="outline"
        className={className}
        disabled={isLoading}
      >
        {isLoading && <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />}
        <FaGoogle className="mr-2" />
        Continue with Google
      </Button>
    </div>
  );
}
