/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import loginFormSchema from "@/schemas/loginSchema";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FaGoogle } from "react-icons/fa";
import { BsEye, BsEyeSlash, BsLock, BsPerson } from "react-icons/bs";
import { LucideLoader2 } from "lucide-react";
import { LuLogIn } from "react-icons/lu";

export default function LoginForm({ className }: React.ComponentProps<"form">) {
  type loginSchema = z.infer<typeof loginFormSchema>;

  type signinStateProps = {
    pending?: boolean;
    ok?: boolean;
    status?: any;
    error?: string | undefined;
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [isHidePass, setIsHidePass] = useState(true);
  const [signinState, setSigninState] = useState<signinStateProps | null>();
  const [googleSigninState, setGoogleSigninState] =
    useState<signinStateProps | null>();

  const { status } = useSession();

  const googleLogin = async () => {
    setGoogleSigninState({ pending: true });

    const res: signinStateProps | any = await signIn("google", {
      redirect: false,
    });

    setSigninState(res);
  };

  const onSubmitLoginForm: SubmitHandler<loginSchema> = async (data) => {
    // return console.log(data);

    setSigninState({ pending: true });

    const res: signinStateProps | any = await signIn("credentials", {
      redirect: false,
      password: data.password,
      username: data.username,
    });

    setSigninState(res);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: "all",
    shouldFocusError: true,
  });

  useEffect(() => {
    if (status === "authenticated") {
      const takeMeTo = callbackUrl || "/app/dashboard";
      setSigninState(null);
      reset();
      router.push(takeMeTo);
    }
  }, [status]);

  return (
    <form
      onSubmit={handleSubmit(onSubmitLoginForm)}
      className={cn(
        "grid w-full gap-3 z-50 bg-white p-4 rounded-md",
        className
      )}
    >
      <div className="flex flex-col gap-1 justify-center items-center">
        <p className="text-3xl md:text-6xl font-bold">Login</p>
        <p className="text-center">Continue Your Journey to Spritual Growth.</p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <div className="relative w-full">
            <span className="pointer-events-none absolute inset-y-0 flex items-center pl-2 text-gray-400 ">
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
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative w-full">
            <span className="pointer-events-none absolute inset-y-0 flex items-center pl-2 text-gray-400 ">
              <BsLock />
            </span>
            <Input
              id="password"
              className="pl-8"
              autoComplete="password"
              placeholder="Enter your password"
              {...register("password")}
              type={`${isHidePass ? "password" : "text"}`}
            />

            <span
              onClick={() => setIsHidePass(!isHidePass)}
              className="absolute right-2.5 bottom-2.5"
            >
              {isHidePass ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
      </div>

      <div className="mt-2">
        <Button className="w-full bg-[#FFAB5B]">
          {signinState?.pending && (
            <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Login
          <LuLogIn className="h-4 w-4 " />
        </Button>
        {signinState &&
          !signinState?.pending &&
          signinState?.status !== 200 && (
            <p className="text-red-500 text-sm text-center pt-2">
              Sorry, an error occured.
            </p>
          )}
      </div>

      <div className="flex flex-col p-1">
        <p className="text-center">Or</p>
        <Button
          onClick={() => googleLogin()}
          type="button"
          variant="outline"
          className="rounded-md cursor-pointer"
        >
          {googleSigninState?.pending && (
            <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          <FaGoogle /> Continue With Google
        </Button>
        {googleSigninState &&
          !googleSigninState?.pending &&
          googleSigninState?.status !== 200 && (
            <p className="text-red-500 text-sm text-center pt-2">
              Sorry, an error occured.
            </p>
          )}
      </div>
    </form>
  );
}
