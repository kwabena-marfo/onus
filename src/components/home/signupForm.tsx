/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import signupFormSchema from "@/schemas/signupSchema";

import { cn } from "@/lib/utils";

import useTriggerRequest from "@/hooks/global/useTriggerRequest";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle } from "react-icons/fa";
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

export default function LoginForm({ className }: React.ComponentProps<"form">) {
  type signupSchema = z.infer<typeof signupFormSchema>;

  type signinStateProps = {
    pending?: boolean;
    ok?: boolean;
    status?: any;
    error?: string | undefined;
  };

  const {
    reqFunction: createUser,
    reqState: createUserStates,
    setReqState: resetCreatUserStates,
  } = useTriggerRequest();

  const router = useRouter();
  const [isHidePass, setIsHidePass] = useState(true);
  const [googleSigninState, setGoogleSigninState] =
    useState<signinStateProps | null>();
  const [signinState, setSigninState] = useState<signinStateProps | null>();

  const { status } = useSession();

  const googleLogin = async () => {
    setGoogleSigninState({ pending: true });

    const res: signinStateProps | any = await signIn("google", {
      redirect: false,
    });

    setGoogleSigninState(res);
  };

  console.log(status);

  useEffect(() => {
    if (status === "authenticated") {
      setSigninState(null);
      setGoogleSigninState(null);
      reset();
      resetCreatUserStates(null);
      router.push("/app/dashboard");
    }
  }, [status]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<signupSchema>({
    resolver: zodResolver(signupFormSchema),
    mode: "all",
    shouldFocusError: true,
  });

  const onSubmitSignupForm: SubmitHandler<signupSchema> = async (data) => {
    await createUser({
      route: "/api/create-user",
      reqType: "post",
      data,
    });
  };

  return (
    <>
      {createUserStates?.data || status === "authenticated" ? (
        <div className="flex flex-col justify-center items-center gap-3 p-4">
          <BsCheck2Circle className="md:w-16 md:h-16 w-12 h-12 text-green-700" />
          <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-700">
            All Done! <br /> Welcome to the ONUS family!
          </h1>
          <p className="text-center text-lg">
            Get started on your jounery to spiritual growth
          </p>
          <Button
            onClick={async () => {
              setSigninState({ pending: true });
              const result = await signIn("credentials", {
                redirect: false, // prevent redirect so you can handle manually
                email: watch("email"),
                password: watch("confirmPassword"),
              });
              setSigninState(result as any);
            }}
            className="w-full bg-[#fa9a40] font-medium"
          >
            Sure! Log me in{" "}
            {signinState?.pending && (
              <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmitSignupForm)}
          className={cn(
            "grid w-full gap-3 z-50 bg-white p-4 rounded-md",
            className
          )}
        >
          <div className="flex flex-col gap-1 justify-center items-center">
            <p className="text-3xl md:text-6xl font-bold">Get Started</p>
            <p className="text-center">
              Your Journey to Spritual Growth Starts Here.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="name">Your Name</Label>
              <div className="relative w-full">
                <span className="pointer-events-none absolute inset-y-0 flex items-center pl-2 text-gray-400 ">
                  <BsPerson />
                </span>
                <Input
                  id="name"
                  className="pl-8"
                  placeholder="Enter your name"
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors?.name?.message}</p>
              )}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="name">Your Email</Label>
              <div className="relative w-full">
                <span className="pointer-events-none absolute inset-y-0 flex items-center pl-2 text-gray-400 ">
                  <BsEnvelope />
                </span>
                <Input
                  id="email"
                  className="pl-8"
                  placeholder="Enter your email"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors?.email?.message}</p>
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
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative w-full">
                <span className="pointer-events-none absolute inset-y-0 flex items-center pl-2 text-gray-400 ">
                  <BsLock />
                </span>
                <Input
                  id="confirmPassword"
                  className="pl-8"
                  autoComplete="password"
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                  type={`${isHidePass ? "password" : "text"}`}
                />

                <span
                  onClick={() => setIsHidePass(!isHidePass)}
                  className="absolute right-2.5 bottom-2.5"
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
          </div>

          <div className="mt-2">
            <Button className="w-full bg-[#FFAB5B]">
              {createUserStates?.pending && (
                <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign Up
              <LuLogIn className="h-4 w-4 " />
            </Button>
            {createUserStates &&
              !createUserStates?.pending &&
              createUserStates?.error && (
                <p className="text-red-500 text-sm text-center pt-2">
                  {createUserStates?.error as any}
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
      )}
    </>
  );
}
