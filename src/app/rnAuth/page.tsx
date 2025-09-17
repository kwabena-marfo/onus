"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect } from "react";
import { LuLoaderCircle } from "react-icons/lu";

export default function MobileAuth() {
  useEffect(() => {
    const start = async () => {
      const providers = await getProviders();
      if (providers?.google) {
        signIn("google", {
          callbackUrl: "exp://172.20.10.2:8081/--/auth/callback",
        });
      }
    };
    start();
  }, []);

  return (
    <div className="flex justify-center items-center h-dvh">
      <LuLoaderCircle className="animate-spin h-10 w-10" />
    </div>
  );
}
