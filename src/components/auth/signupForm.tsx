/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import signupFormSchema from "@/schemas/signupSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BsCheck2Circle,
  BsEnvelope,
  BsEye,
  BsEyeSlash,
  BsLock,
  BsPerson,
} from "react-icons/bs";
import { LucideLoader2 } from "lucide-react";
import { LuLogIn } from "react-icons/lu";
import Link from "next/link";

import GoogleSignInButton from "@/components/auth/googleButton";
import { useSignUp } from "@clerk/nextjs";
import { useCreateUserApi } from "@/hooks/useQuery";

export default function SignupForm({}: React.ComponentProps<"form">) {
  type signupSchema = z.infer<typeof signupFormSchema>;
  const router = useRouter();

  const { signUp, isLoaded, setActive } = useSignUp();

  const [isHidePass, setIsHidePass] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [resentCode, setResentCode] = useState(false);

  const [verificationCode, setVerificationCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupSchema>({
    resolver: zodResolver(signupFormSchema),
    mode: "all",
    shouldFocusError: true,
  });

  const { trigger } = useCreateUserApi();
  // Step 1: Sign up user and send verification code
  const onSubmitSignupForm: SubmitHandler<signupSchema> = async (data) => {
    if (!isLoaded) return;
    setIsPending(true);
    setErrorMsg("");

    try {
      // 1. Create Clerk user
      const user = await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.name,
      });

      await trigger({
        email: user?.emailAddress,
        clerkId: user?.id,
        name: user?.firstName,
      });

      // 2. Send email verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerificationStep(true);
    } catch (error: any) {
      setErrorMsg(
        error.errors?.[0]?.longMessage || error.message || "Signup failed"
      );
    } finally {
      setIsPending(false);
    }
  };

  // Step 2: Verify email code
  const handleVerifyCode = async () => {
    if (!isLoaded) return;
    setIsPending(true);
    setErrorMsg("");

    try {
      await signUp.attemptEmailAddressVerification({ code: verificationCode });

      if (signUp.createdSessionId) {
        await setActive({ session: signUp.createdSessionId });
      }

      setIsSuccess(true);
    } catch (error: any) {
      setErrorMsg(
        error.errors?.[0]?.longMessage || error.message || "Verification failed"
      );
    } finally {
      setIsPending(false);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded) return;
    setIsPending(true);
    setErrorMsg("");
    setResentCode(false);

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setResentCode(true);
    } catch (error: any) {
      setErrorMsg(
        error.errors?.[0]?.longMessage ||
          error.message ||
          "Failed to resend code"
      );
    } finally {
      setIsPending(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="justify-self-center items-center z-50 w-full pt-5">
        <div className="flex flex-col justify-center items-center gap-3 ">
          <BsCheck2Circle className="md:w-16 md:h-16 w-12 h-12 text-green-700" />
          <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-700">
            All Done! <br /> Welcome to the ONUS!
          </h1>
          <p className="text-center">
            Get started on your journey to spiritual growth
          </p>
          <Button
            onClick={() => router.push("/app/dashboard")} // redirect to dashboard
            className="w-full bg-[#e77306] font-medium rounded-full"
          >
            Sure, Log me in.
          </Button>
        </div>
      </div>
    );
  }

  // Verification Step Form
  if (verificationStep) {
    return (
      <div className="flex flex-col gap-2 justify-self-center items-center z-50 w-full">
        <p className="text-xl font-bold ">Verify Your Email</p>
        <p className="md:text-xl text-sm">
          Enter the verification code sent to your email
        </p>
        <Input
          placeholder="Enter code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        <div className="flex flex-col gap-2 mt-2 w-full">
          <Button
            onClick={handleVerifyCode}
            className="flex-1 bg-[#e77306] font-medium"
          >
            {isPending ? (
              <LucideLoader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Verify Email"
            )}
          </Button>
          <Button
            onClick={handleResendCode}
            variant="outline"
            className="flex-1 border border-gray-300 font-medium"
          >
            Resend Code
          </Button>
          {resentCode ? (
            <p className="md:text-xl text-sm text-center">
              Code has been resent
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  // Signup Form
  return (
    <form onSubmit={handleSubmit(onSubmitSignupForm)}>
      {/* Heading */}
      <div className="flex flex-col gap-0 justify-center items-center mb-4">
        <p className="text-3xl md:text-6xl font-bold">Get Started</p>
        <p className="text-center">
          Your Journey to Spiritual Growth Starts Here.
        </p>
      </div>

      {/* Form Inputs */}
      <div className="grid gap-4">
        {/* Name */}
        <div className="grid gap-1">
          <Label>Your Name</Label>
          <div className="relative w-full">
            <span className="pointer-events-none absolute inset-y-0 flex items-center pl-2 text-gray-400">
              <BsPerson />
            </span>
            <Input
              className="pl-8"
              placeholder="Enter your name"
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="grid gap-1">
          <Label>Your Email</Label>
          <div className="relative w-full">
            <span className="pointer-events-none absolute inset-y-0 flex items-center pl-2 text-gray-400">
              <BsEnvelope />
            </span>
            <Input
              className="pl-8"
              placeholder="Enter your email"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col space-y-1.5">
          <Label>Password</Label>
          <div className="relative w-full">
            <span className="pointer-events-none absolute inset-y-0 flex items-center pl-2 text-gray-400">
              <BsLock />
            </span>
            <Input
              className="pl-8"
              type={isHidePass ? "password" : "text"}
              placeholder="Enter your password"
              {...register("password")}
            />
            <span
              onClick={() => setIsHidePass(!isHidePass)}
              className="absolute right-2.5 bottom-2.5 cursor-pointer"
            >
              {isHidePass ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col space-y-1.5">
          <Label>Confirm Password</Label>
          <div className="relative w-full">
            <span className="pointer-events-none absolute inset-y-0 flex items-center pl-2 text-gray-400">
              <BsLock />
            </span>
            <Input
              className="pl-8"
              type={isHidePass ? "password" : "text"}
              placeholder="Confirm your password"
              {...register("confirmPassword")}
            />
            <span
              onClick={() => setIsHidePass(!isHidePass)}
              className="absolute right-2.5 bottom-2.5 cursor-pointer"
            >
              {isHidePass ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="mt-2">
          <Button className="w-full bg-[#e77306] flex justify-center items-center gap-2">
            {isPending && <LucideLoader2 className="h-4 w-4 animate-spin" />}
            Sign Up
            <LuLogIn className="h-4 w-4" />
          </Button>
          {errorMsg && !isPending && (
            <p className="text-red-500 text-sm text-center pt-2">{errorMsg}</p>
          )}
        </div>
      </div>

      {/* Sign Up Button */}

      {/* Google Sign In */}
      <div className="flex flex-col p-1">
        <p className="text-center">Or</p>
        <GoogleSignInButton />
        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link className="text-blue-500" href="/login">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
