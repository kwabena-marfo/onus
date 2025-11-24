/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LucideLoader2 } from "lucide-react";
import { useRouter } from "next/navigation";
export default function VerifyEmail() {
  const { isLoaded, signUp } = useSignUp();

  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isLoaded) return null;

  // Step 1 — resend verification email
  const resend = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err: any) {
      setErrorMsg(
        err?.errors?.[0]?.message || "Failed to resend verification email"
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — Verify email code
  const verify = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") router.push("/app/dashboard");
    } catch (err: any) {
      setErrorMsg(err?.errors?.[0]?.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  console.log(signUp);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md border mt-10 w-full">
      <h2 className="text-2xl font-bold text-center mb-4">Verify Your Email</h2>

      <p className="text-center mb-4">
        Enter the verification code sent to your email.
      </p>

      <Label className="mb-1">Verification Code</Label>
      <Input
        className="mb-3"
        placeholder="Enter email code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

      <Button
        className="w-full bg-[#e77306] mb-3"
        onClick={verify}
        disabled={loading}
      >
        {loading && <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />}
        Verify Email
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={resend}
        disabled={loading}
      >
        Resend Code
      </Button>
    </div>
  );
}
