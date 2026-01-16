/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import loginFormSchema from "@/schemas/loginSchema";
import { authClient } from "@/lib/authClient";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { BsEye, BsEyeSlash, BsLock, BsPerson } from "react-icons/bs";
import { LucideLoader2 } from "lucide-react";
import Link from "next/link";
import GoogleAuthButton from "./googleButton";

export default function LoginForm() {
  type LoginSchema = z.infer<typeof loginFormSchema>;

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/app/dashboard";

  const [isHidePass, setIsHidePass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<any>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: "all",
  });

  const onSubmitLoginForm: SubmitHandler<LoginSchema> = async (data) => {
    try {
      setLoading(true);
      setErrorMsg("");

      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setErrorMsg(result.error.message);
        return;
      }

      reset();
      router.push(callbackUrl);
    } catch {
      setErrorMsg("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitLoginForm)}>
      <div className="flex flex-col gap-1 justify-center items-center mb-4">
        <p className="text-3xl md:text-4xl font-bold">Login</p>
        <p className="text-center">
          Continue Your Journey to Spiritual Growth.
        </p>
      </div>

      <div className="grid gap-4">
        {/* Email */}
        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <div className="relative w-full">
            <span className="pointer-events-none absolute inset-y-0 flex items-center pl-2 text-gray-400">
              <BsPerson />
            </span>
            <Input
              id="email"
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
        <div className="grid gap-1">
          <div className="flex justify-between">
            <Label htmlFor="password">Password</Label>
            <Link className="text-sm" href="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <div className="relative w-full">
            <span className="pointer-events-none absolute inset-y-0 flex items-center pl-2 text-gray-400">
              <BsLock />
            </span>

            <Input
              id="password"
              className="pl-8"
              placeholder="Enter your password"
              type={isHidePass ? "password" : "text"}
              autoComplete="current-password"
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

        {/* Submit */}
        <Button className="w-full bg-[#e77306]" disabled={loading}>
          {loading && <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>

        {errorMsg && (
          <p className="text-red-500 text-sm text-center">{errorMsg}</p>
        )}

        {/* Google */}
        <div className="flex flex-col p-1">
          <p className="text-center">Or</p>
          <GoogleAuthButton />
          <p className="text-center text-sm mt-2">
            Don&apos;t have an account? Sign Up
            <Link className="text-blue-500 pl-1" href="/signup">
              Here
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
