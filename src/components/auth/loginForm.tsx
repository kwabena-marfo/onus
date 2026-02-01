/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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
  const [errorMsg, setErrorMsg] = useState("");

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

      setLoading(false);

      if (result?.error) {
        setErrorMsg(result?.error.message as any);
        return;
      }

      reset();
      router.push(callbackUrl);
    } catch {
      setErrorMsg("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitLoginForm)}
      className="text-foreground"
    >
      {/* Heading */}
      <div className="flex flex-col items-center mb-4">
        <p className="text-3xl md:text-4xl font-bold">Login</p>
        <p className="text-center text-muted-foreground">
          Continue Your Journey to Spiritual Growth.
        </p>
      </div>

      <div className="grid gap-4">
        {/* Email */}
        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <BsPerson className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
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
          <div className="flex justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="relative">
            <BsLock className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              className="pl-8"
              placeholder="Enter your password"
              type={isHidePass ? "password" : "text"}
              autoComplete="current-password"
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

        {/* Submit */}
        <Button
          disabled={loading}
          className="w-full bg-[#e77306] hover:bg-[#d66a05] text-white"
        >
          {loading && <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>

        {errorMsg && (
          <p className="text-destructive text-sm text-center">{errorMsg}</p>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col mt-4 gap-2">
        <p className="text-center text-muted-foreground">Or</p>
        <GoogleAuthButton />
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
}
