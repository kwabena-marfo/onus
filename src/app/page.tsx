import localFont from "next/font/local";

import { BsCompass, BsEyeglasses, BsJournalCheck } from "react-icons/bs";
import { FaCross } from "react-icons/fa";

const myFont = localFont({
  src: [{ path: "../fonts/Austrian.otf", weight: "400" }],
});

export default function Home() {
  return (
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
          <FaCross className="w-12 h-12 md:w-20 md:h-20 text-[#FFAB5B] " /> ure
        </p>
      </div>
    </div>
  );
}
