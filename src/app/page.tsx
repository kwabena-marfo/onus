import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { Button } from "@/components/ui/button";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const myFont = localFont({
  src: [{ path: "../fonts/Austrian.otf", weight: "400" }],
});
export default function Home() {
  return (
    <div className="h-[100dvh] grid md:grid-cols-3 md:bg-[url('/imgs/bgs/worldMap.svg')] bg-cover bg-repeat">
      <div className="col-span-1 flex flex-col relative ">
        <div className="flex justify-between items-center bg-[#0F3187]  p-6 ">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <IoMenuOutline className="w-10 h-10 text-white flex md:hidden" />
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
                src="/imgs/logos/onusLogoWhite.png"
                alt="logo"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <Button size="lg" className="bg-[#FFAB5B] rounded-full">
              Login
            </Button>
            <Link className="text-white" href="/">
              Sign Up
            </Link>
          </div>
        </div>

        <div className="flex flex-col  justify-start items-start bg-gradient-to-br from-[#0F3187] via-[#0F3187] to-[#01CFFE]/50  md:bg-[#0F3187]/90 rounded-br-[500px] md:rounded-br-[400px] h-[100dvh] md:h-[75vh] p-6 gap-2 z-90">
          <p
            className={`${myFont.className} italic capitalize text-center text-5xl font-medium text-white  `}
          >
            We Help You
          </p>
          <div className="flex gap-2 h-24 w-full ">
            <div className="bg-white h-full w-full  p-2 flex flex-col justify-center items-center font-bold text-2xl shadow-2xl rounded-tr-2xl rounded-bl-2xl">
              <BsEyeglasses />
              Observe
            </div>
            <div className="bg-[#FFAB5B] h-full  w-full flex  flex-col justify-center items-center font-bold text-2xl shadow-2xl rounded-tr-2xl rounded-bl-2xl">
              <BsCompass />
              Navigate
            </div>
            <div className="bg-[#01CFFE] h-full w-full flex flex-col justify-center items-center font-bold text-2xl shadow-2xl rounded-tr-2xl rounded-bl-2xl">
              <BsJournalCheck />
              Understand
            </div>
          </div>
          <p className="bg-gradient-to-r from-white via-[#FFAB5B] to-[#01CFFE] bg-clip-text text-8xl uppercase font-extrabold text-transparent flex items-center gap-0">
            Scrip <FaCross className="w-20 h-20 text-white" /> ure
          </p>

          <div className="flex gap-2 justify-end items-end mt-6 top-0  z-100 md:hidden">
            <div className="flex rounded-md p-3 justify-start items-center bg-white gap-2 cursor-pointer">
              <BsApple className="w-8 h-8" />
              <div className="flex flex-col">
                <p className="-my-2">Download On The</p>
                <p className="text-md font-bold">App Store</p>
              </div>
            </div>
            <div className="flex rounded-md p-3 justify-start items-center bg-white gap-2 cursor-pointer">
              <BsGooglePlay className="w-7 h-7 " />
              <div className="flex flex-col justify-start items-start">
                <p className="-my-2">Get It On</p>
                <p className="text-md font-bold">Google Play</p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:h-[500px] h-[50dvh]  w-4/5 flex absolute bottom-0 z-90">
          <Image
            fill
            alt="Service Photo"
            src="/imgs/logos/onusLogoKnot.png"
            blurDataURL="/imgs/logos/onusLogoKnot.png"
            placeholder="blur"
            className="rounded-t-2xl rounded-tr-none object-cover object-top"
          />
        </div>

        <div className="h-[50dvh] w-4/5 flex absolute bottom-0 right-0 z-0 md:hidden">
          <Image
            fill
            alt="Service Photo"
            src="/imgs/bgs/holdingPhoneMockupTT2.png"
            blurDataURL="/imgs/bgs/holdingPhoneMockupTT2.png"
            placeholder="blur"
            className="rounded-t-2xl rounded-tr-none object-cover object-top-left"
          />
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
