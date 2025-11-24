/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import loginFormSchema from "@/schemas/loginSchema";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { BsEye, BsEyeSlash, BsLock, BsPerson } from "react-icons/bs";
import { LucideLoader2 } from "lucide-react";
import { LuLogIn } from "react-icons/lu";
import Link from "next/link";

import { useSignIn, useUser } from "@clerk/nextjs";
import GoogleSignInButton from "./googleButton";

export default function LoginForm({ className }: React.ComponentProps<"form">) {
  type loginSchema = z.infer<typeof loginFormSchema>;

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/app/dashboard";

  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn } = useUser();

  const [isHidePass, setIsHidePass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: "all",
  });

  useEffect(() => {
    if (isSignedIn) router.push(callbackUrl);
  }, [isSignedIn]);

  const onSubmitLoginForm: SubmitHandler<loginSchema> = async (data) => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      setErrorMsg("");

      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        reset();
        router.push(callbackUrl);
      } else {
        setErrorMsg("Login failed. Check credentials.");
      }
    } catch (err: any) {
      setErrorMsg(err?.errors?.[0]?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitLoginForm)}
      className={cn(
        "grid w-full gap-3 z-50 bg-white p-4 rounded-md border mt-5",
        className
      )}
    >
      <div className="flex flex-col gap-1 justify-center items-center">
        <p className="text-3xl md:text-6xl font-bold">Login</p>
        <p className="text-center">
          Continue Your Journey to Spiritual Growth.
        </p>
      </div>

      <div className="grid gap-4">
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
      </div>

      {/* Submit */}
      <div className="mt-2">
        <Button className="w-full bg-[#e77306]" disabled={loading}>
          {loading && <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login <LuLogIn className="h-4 w-4 ml-2" />
        </Button>

        {errorMsg && (
          <p className="text-red-500 text-sm text-center pt-2">{errorMsg}</p>
        )}
      </div>

      {/* Google Login */}
      <div className="flex flex-col p-1">
        <p className="text-center">Or</p>

        <GoogleSignInButton />
        <p className="text-center text-sm mt-2">
          Don&apos;t have an account? Click
          <Link className="text-blue-500 pl-1" href="/signup">
            Here
          </Link>{" "}
          to Sign Up
        </p>
      </div>
    </form>
  );
}
