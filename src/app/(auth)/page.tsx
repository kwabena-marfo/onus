import localFont from "next/font/local";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const myFont = localFont({
  src: [{ path: "../../fonts/Austrian.otf", weight: "400" }],
});

export default function Home() {
  return (
    <div className="flex items-center flex-col w-full p-3 px-8 z-10 gap-6">
      <div className="flex  divide-x-1 ">
        <div className="text-[#e77306]   pr-2 w-full  flex flex-col justify-center items-center   md:text-lg rounded-bl-2xl ">
          {/* <div className="flex justify-center items-center rounded-full w-12 h-12 bg-gray-900 p-2">
            <p className="font-bold text-2xl">O</p>
          </div> */}
          Observing
        </div>
        <div className="text-[#e77306] px-2  w-full flex  flex-col justify-center items-center   md:text-lg  rounded-bl-2xl">
          {/* <div className="flex justify-center items-center rounded-full w-12 h-12 bg-gray-900 p-2">
            <p className="font-bold text-2xl">N</p>
          </div> */}
          Navigating
        </div>
        <div className="text-[#e77306] px-2 w-full flex flex-col justify-center items-center   md:text-lg  rounded-bl-2xl">
          {/* <div className="flex justify-center items-center rounded-full w-12 h-12 bg-gray-900 p-2">
            <p className="font-bold text-2xl">U</p>
          </div> */}
          Understanding
        </div>{" "}
        <div className="text-[#e77306] px-2    w-full flex flex-col justify-center items-center  md:text-lg  rounded-bl-2xl">
          {/* <div className="flex justify-center items-center rounded-full w-12 h-12 bg-gray-900 p-2">
            <p className="font-bold text-2xl">S</p>
          </div> */}
          Scripture
        </div>
      </div>

      <p
        className={`${myFont.className} capitalize text-center text-4xl font-medium text-blue-800`}
      >
        Thy Word have I hid in my heart, That I might not sin against Thee -
        Psalm 119:11{" "}
      </p>
      <div className="flex flex-col items-center  gap-3  w-full text-white mt-5">
        <div className="flex flex-col justify-center items-center">
          <p className="uppercase bg-gradient-to-r from-[#0F3187] via-[#e77306] to-[#01CFFE] bg-clip-text text-5xl md:text-5xl   font-extrabold text-transparent flex items-center ">
            Memorize{" "}
          </p>
          <p className="text-gray-800 font-bold text-2xl">Verses With Ease</p>
        </div>
        <div className="flex gap-3 justify-center items-center   max-w-sm w-full">
          <Link href="/login" className="w-full">
            <Button
              className="rounded-md w-full bg-[#e77306]  cursor-pointer"
              size="lg"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
