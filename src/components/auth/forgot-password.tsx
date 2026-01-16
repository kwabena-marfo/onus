/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BsLock, BsEnvelope, BsCheck2Circle } from "react-icons/bs";
import { LucideLoader2 } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/authClient";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isPasswordValid = newPassword.length >= 8;

  const token = new URLSearchParams(window.location.search).get("token");

  // Step 1 — Request password reset code
  const sendResetEmail = async () => {
    setLoading(true);
    setErrorMsg("");

    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: `${process.env.NEXT_PUBLIC_HOST}/forgot-password`,
    });

    error?.code
      ? setErrorMsg(error.message || "Signup failed")
      : setIsSuccess(true);
    setLoading(false);
  };

  // Step 2 — Verify code + set new password
  const resetPassword = async () => {
    setLoading(true);
    setErrorMsg("");

    const { error } = await authClient.resetPassword({
      newPassword,
      token: token as any, // required
    });

    error?.code
      ? setErrorMsg(error.message || "Sorry an error occured")
      : setIsSuccess(true);
    setLoading(false);
  };

  return (
    <div className="w-full rounded-md mt-10">
      {!errorMsg && isSuccess ? (
        <div className="justify-self-center items-center z-50  pt-5">
          <div className="flex flex-col justify-center items-center gap-1">
            <BsCheck2Circle className="md:w-16 md:h-16 w-12 h-12 text-green-700" />
            <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-700">
              All Done! <br />
            </h1>
            {!token ? (
              <p>Check Your email for a confirmation link</p>
            ) : (
              <>
                <p>
                  Your password has been reset <br /> Login to access your
                  account
                </p>
                <Link href="/login" className="w-full">
                  <Button className="w-full bg-[#e77306]">Log in</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      ) : !token ? (
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

          {errorMsg && (
            <p className="text-red-500 text-center text-sm -mt-1">{errorMsg}</p>
          )}

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
      ) : token ? (
        <>
          <h2 className="text-2xl font-bold text-center mb-1">
            Reset Password
          </h2>
          <p className="text-center mb-4">
            Set a new password to reset your password
          </p>

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

          <Button
            className="w-full bg-[#e77306]"
            onClick={resetPassword}
            disabled={loading || !isPasswordValid}
          >
            {loading && <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reset Password
          </Button>
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        </>
      ) : null}
    </div>
  );
}
