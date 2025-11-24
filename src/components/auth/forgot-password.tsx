/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BsLock, BsEnvelope } from "react-icons/bs";
import { LucideLoader2 } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const { isLoaded, signIn } = useSignIn();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<"request" | "verify">("request");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isLoaded) return null;

  // Step 1 — Request password reset code
  const sendResetEmail = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      setStep("verify");
    } catch (err: any) {
      setErrorMsg(err?.errors?.[0]?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — Verify code + set new password
  const resetPassword = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });

      if (result.status === "complete") {
        window.location.href = "/login"; // redirect on success
      }
    } catch (err: any) {
      setErrorMsg(err?.errors?.[0]?.message || "Invalid code or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-md mt-10">
      {step === "request" && (
        <>
          <h2 className="text-2xl font-bold text-center ">Forgot Password</h2>
          <p className="text-center mb-4">
            Enter your email to receive a reset code.
          </p>

          <Label className="mb-1">Email</Label>
          <div className="relative w-full mb-3">
            <span className="pointer-events-none absolute inset-y-0 flex items-center pl-2 text-gray-400">
              <BsEnvelope />
            </span>
            <Input
              className="pl-8 bg-white"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <Button
            className="w-full bg-[#e77306]"
            onClick={sendResetEmail}
            disabled={loading}
          >
            {loading && <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Reset Code
          </Button>
          <div className="flex flex-row justify-center items-center pt-2">
            <Link href="/login">Go To Login</Link>
          </div>
        </>
      )}

      {step === "verify" && (
        <>
          <h2 className="text-2xl font-bold text-center mb-4">
            Reset Password
          </h2>
          <p className="text-center mb-4">
            Check your email for the verification code.
          </p>

          <Label className="mb-1">Verification Code</Label>
          <Input
            className="mb-3"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <Label className="mb-1">New Password</Label>
          <div className="relative w-full mb-3">
            <span className="pointer-events-none absolute inset-y-0 flex items-center pl-2 text-gray-400">
              <BsLock />
            </span>
            <Input
              type="password"
              className="pl-8"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <Button
            className="w-full bg-[#e77306]"
            onClick={resetPassword}
            disabled={loading}
          >
            {loading && <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reset Password
          </Button>
        </>
      )}
    </div>
  );
}
