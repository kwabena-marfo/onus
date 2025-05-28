import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  BsApple,
  BsCheck,
  BsCompass,
  BsEyeglasses,
  BsGooglePlay,
  BsJournalCheck,
} from "react-icons/bs";
import { IoMenuOutline } from "react-icons/io5";
import { FaCross } from "react-icons/fa";
import SignupComp from "@/components/signup";

const myFont = localFont({
  src: [{ path: "../fonts/Austrian.otf", weight: "400" }],
});

export default function Home() {
  return (
    <div className="h-[100dvh] grid  grid-cols-3 md:bg-[url('/imgs/bgs/worldMap.svg')] bg-cover bg-repeat">
      <div className="col-span-3 md:col-span-1 flex flex-col relative  h-full">
        <div className="absolute  h-full w-full bg-gradient-to-br from-white via-white/95 to-[#01CFFE]/80    rounded-br-[500px] md:rounded-br-[500px]  " />
        <div className="flex flex-col gap-9  justify-start items-start  h-full  ">
          {/* Header Area */}
          <div className="flex justify-between items-center w-full p-3 px-8 z-100 md:border-b-0 border-b-">
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

              <div className="relative h-15 w-12">
                <Image
                  fill
                  priority
                  src="/imgs/logos/onusLogoChosen.png"
                  alt="logo"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-center items-center">
              <Button className="bg-[#FFAB5B] rounded-full text-lg font-bold">
                Login
              </Button>
              <SignupComp />
            </div>
          </div>

          {/* How we help Session */}

          <div className="flex items-center flex-col w-full p-3 px-8 z-10 gap-6">
            <p
              className={`${myFont.className} italic capitalize text-center text-5xl font-medium text-blue-950  `}
            >
              We Help You
            </p>
            <div className="flex flex-col items-center  gap-3  w-full text-white">
              <div className="flex  divide-x-1 ">
                <div className="text-[#0F3187]   pr-2 w-full  flex flex-col justify-center items-center font-bold text-lg md:text-2xl rounded-bl-2xl ">
                  <div className="flex justify-center items-center rounded-full w-12 h-12 bg-black p-2">
                    <BsEyeglasses className="w-full h-full text-white" />
                  </div>
                  Observe
                </div>
                <div className="text-[#FFAB5B] px-2  w-full flex  flex-col justify-center items-center font-bold text-lg md:text-2xl  rounded-bl-2xl">
                  <div className="flex justify-center items-center rounded-full w-12 h-12 bg-black p-2">
                    <BsCompass />
                  </div>
                  Navigate
                </div>
                <div className="text-[#01CFFE] pl-2    w-full flex flex-col justify-center items-center font-bold text-lg md:text-2xl  rounded-bl-2xl">
                  <div className="flex justify-center items-center rounded-full w-12 h-12 bg-black p-2">
                    <BsJournalCheck />
                  </div>
                  Understand
                </div>
              </div>
              <p className="bg-gradient-to-r from-[#0F3187] via-[#FFAB5B] to-[#01CFFE] bg-clip-text text-6xl md:text-8xl uppercase font-extrabold text-transparent flex items-center gap-0">
                Scrip{" "}
                <FaCross className="w-12 h-12 md:w-20 md:h-20 text-[#FFAB5B] " />{" "}
                ure
              </p>
            </div>

            {/* DownApp Mobile Bottons */}
            <div className="flex gap-2 justify-end items-end  top-0  z-30 md:hidden">
              <div className="flex rounded-md p-3 justify-start items-center bg-white gap-2 cursor-pointer">
                <BsApple className="w-6 h-6" />
                <div className="flex flex-col">
                  <p className="-my-2">Download On The</p>
                  <p className="text-md font-bold">App Store</p>
                </div>
              </div>
              <div className="flex rounded-md p-3 justify-start items-center bg-white gap-2 cursor-pointer">
                <BsGooglePlay className="w-6 h-6 " />
                <div className="flex flex-col justify-start items-start">
                  <p className="-my-2">Get It On</p>
                  <p className="text-md font-bold">Google Play</p>
                </div>
              </div>
            </div>
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
        <div className="md:flex gap-2 justify-end items-end p-6 absolute top-0 w-full z-100 hidden">
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
            <div className="flex w-50 rounded-full justify-center items-center bg-[#01CFFE] p-2 absolute top-3/12 left-4/12 gap-2 z-100">
              <div className="rounded-full bg-white">
                <BsCheck className="h-10 w-10" />
              </div>
              <p className="text-2xl font-bold">Easy to use</p>
            </div>
            <div className="flex rounded-full justify-center items-center bg-[#01CFFE] p-2 absolute bottom-2/12 right-10 gap-2 z-100">
              <div className="rounded-full bg-white">
                <BsCheck className="h-10 w-10" />
              </div>
              <p className="text-2xl font-bold">Tailored To You</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center col-span-3 relative  ">
            <div className="flex rounded-full justify-center items-center bg-[#01CFFE] p-2 pr-3 absolute top-1/12 left-0 gap-2 z-100">
              <div className="rounded-full bg-white">
                <BsCheck className="h-10 w-10" />
              </div>
              <p className="text-2xl font-bold">Exciting Quizzes</p>
            </div>

            <div className="flex rounded-full justify-center items-center bg-[#01CFFE] p-2 absolute bottom-4/12 left-2/12 gap-2 z-100">
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
