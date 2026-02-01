/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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

import GoogleButton from "@/components/auth/googleButton";
import { authClient } from "@/lib/authClient";

export default function SignupForm() {
  type SignupSchema = z.infer<typeof signupFormSchema>;

  const [isHidePass, setIsHidePass] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupFormSchema),
    mode: "all",
  });

  const onSubmitSignupForm: SubmitHandler<SignupSchema> = async (data) => {
    setIsPending(true);

    const { email, password, name } = data;
    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
    });

    error?.code
      ? setErrorMsg(error.message || "Signup failed")
      : setIsSuccess(true);

    setIsPending(false);
  };

  if (isSuccess) {
    return (
      <div className="pt-5">
        <div className="flex flex-col items-center gap-3 text-center">
          <BsCheck2Circle className="w-14 h-14 text-green-600" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            All Done! <br /> Welcome to ONUS
          </h1>
          <p className="text-muted-foreground">
            Get started on your journey to spiritual growth
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitSignupForm)}
      className="text-foreground"
    >
      {/* Heading */}
      <div className="flex flex-col items-center mb-4">
        <p className="text-3xl md:text-4xl font-bold">Get Started</p>
        <p className="text-center text-muted-foreground">
          Your Journey to Spiritual Growth Starts Here.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid gap-4">
        {/* Name */}
        <div className="grid gap-1">
          <Label>Your Name</Label>
          <div className="relative">
            <BsPerson className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-8"
              placeholder="Enter your name"
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="grid gap-1">
          <Label>Your Email</Label>
          <div className="relative">
            <BsEnvelope className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-8"
              placeholder="Enter your email"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-destructive text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="grid gap-1">
          <Label>Password</Label>
          <div className="relative">
            <BsLock className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-8"
              type={isHidePass ? "password" : "text"}
              placeholder="Enter your password"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setIsHidePass(!isHidePass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {isHidePass ? <BsEyeSlash /> : <BsEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-destructive text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="grid gap-1">
          <Label>Confirm Password</Label>
          <div className="relative">
            <BsLock className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-8"
              type={isHidePass ? "password" : "text"}
              placeholder="Confirm your password"
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-destructive text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          disabled={isPending}
          className="w-full bg-[#e77306] hover:bg-[#d66a05] text-white gap-2"
        >
          {isPending && <LucideLoader2 className="h-4 w-4 animate-spin" />}
          Sign Up
          <LuLogIn />
        </Button>

        {errorMsg && (
          <p className="text-destructive text-sm text-center">{errorMsg}</p>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col mt-4 gap-2">
        <p className="text-center text-muted-foreground">Or</p>
        <GoogleButton />
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
