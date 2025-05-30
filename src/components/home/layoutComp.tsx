"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { BsApple, BsCheck, BsGooglePlay } from "react-icons/bs";
import { IoMenuOutline } from "react-icons/io5";

export default function LayoutComp({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[100dvh] grid  grid-cols-3 md:bg-[url('/imgs/bgs/worldMap.svg')] bg-cover bg-repeat">
      <div className="col-span-3 md:col-span-1 flex flex-col relative  h-full">
        <div className="absolute  h-full w-full bg-gradient-to-br from-white/95 via-white/95 to-[#01CFFE]/80    rounded-br-[500px] md:rounded-br-[500px]  " />
        <div className="flex flex-col gap-9  justify-start items-start  h-full  ">
          {/* Header Area */}
          <div className="flex justify-between items-center w-full p-3 z-100">
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <IoMenuOutline className="w-10 h-10 text-blue-950 flex md:hidden" />
                </SheetTrigger>
                <SheetContent className="z-100 text-gray-900">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <div className="md:hidden flex flex-col gap-2  ">
                      <Link className="text-black" href="/">
                        Contact
                      </Link>
                      <Link className="text-black" href="/">
                        Team
                      </Link>{" "}
                      <Link className="text-black" href="/">
                        Address
                      </Link>
                    </div>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <Link href="/" className="relative h-15 w-12 ">
                <Image
                  fill
                  priority
                  src="/imgs/logos/onusLogoChosen.png"
                  alt="logo"
                />
              </Link>
            </div>

            <div className="flex gap-3 justify-center items-center ">
              <Link href="/login">Login</Link>
              <Link
                href="/signup"
                className="bg-[#FFAB5B] text-white p-1 px-2 font-semibold md:text-lg rounded-full z-10"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Show Home Page, Signup Page Or Login Page*/}
          <div className="flex justify-center items-center w-full">
            {children}
          </div>

          {/* Bottom Seesions for Mockup and Knot */}
          <div className="h-2/5 md:h-1/2 w-4/5 z-5   md:w-4/5 flex absolute bottom-0   justify-center items-center">
            <Image
              fill
              alt="Service Photo"
              src="/imgs/logos/onusLogoKnot.png"
              blurDataURL="/imgs/logos/onusLogoKnot.png"
              placeholder="blur"
              className="object-cover object-top"
            />
          </div>

          {/* Mobile Mockup */}
          <div className="h-1/2 w-full flex absolute bottom-0 md:hidden -z-20">
            <Image
              fill
              alt="Service Photo"
              src="/imgs/bgs/holdingPhoneMockupTT2.png"
              blurDataURL="/imgs/bgs/holdingPhoneMockupTT2.png"
              placeholder="blur"
              className="object-cover object-top-left"
            />
          </div>
        </div>
      </div>
      {/* Second right hallf hidden on mobile */}
      <div className="col-span-2 md:flex flex-col relative bg-transparent bg-contain hidden  bg-no-repeat">
        <div className="md:flex gap-2 justify-end items-end p-6 absolute top-0 w-full z-50 hidden">
          <div className="flex rounded-md p-3 justify-center items-center bg-white gap-2 cursor-pointer">
            <BsApple className="w-10 h-10" />
            <div className="flex flex-col">
              <p className="-my-2">Download On The</p>
              <p className="text-2xl font-bold">App Store</p>
            </div>
          </div>
          <div className="flex rounded-md p-3 justify-center items-center bg-white gap-2 cursor-pointer">
            <BsGooglePlay className="w-10 h-10 " />
            <div className="flex flex-col">
              <p className="-my-2">Get It On</p>
              <p className="text-2xl font-bold">Google Play</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 h-full w-full relative">
          <div className="flex col-span-2 relative">
            <div className="flex w-50 rounded-full justify-center items-center bg-[#01CFFE] p-2 absolute top-3/12 left-4/12 gap-2 z-50">
              <div className="rounded-full bg-white">
                <BsCheck className="h-10 w-10" />
              </div>
              <p className="text-2xl font-bold">Easy to use</p>
            </div>
            <div className="flex rounded-full justify-center items-center bg-[#01CFFE] p-2 absolute bottom-2/12 right-10 gap-2 z-50">
              <div className="rounded-full bg-white">
                <BsCheck className="h-10 w-10" />
              </div>
              <p className="text-2xl font-bold">Tailored To You</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center col-span-3 relative  ">
            <div className="flex rounded-full justify-center items-center bg-[#01CFFE] p-2 pr-3 absolute top-1/12 left-0 gap-2 z-50">
              <div className="rounded-full bg-white">
                <BsCheck className="h-10 w-10" />
              </div>
              <p className="text-2xl font-bold">Exciting Quizzes</p>
            </div>

            <div className="flex rounded-full justify-center items-center bg-[#01CFFE] p-2 absolute bottom-4/12 left-2/12 gap-2 z-50">
              <div className="rounded-full bg-white">
                <BsCheck className="h-10 w-10" />
              </div>
              <p className="text-2xl font-bold">Daily Reminders</p>
            </div>

            <Image
              fill
              alt="Service Photo"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              src="/imgs/bgs/holdingPhoneMockup2.png"
              blurDataURL="/imgs/bgs/holdingPhoneMockup2.png"
              placeholder="blur"
            />
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="md:flex gap-2 justify-center items-center p-6 w-full absolute bottom-0 hidden">
        <Link className="text-black" href="/">
          Contact
        </Link>
        <Link className="text-black" href="/">
          Team
        </Link>{" "}
        <Link className="text-black" href="/">
          Address
        </Link>
      </div>
    </div>
  );
}
