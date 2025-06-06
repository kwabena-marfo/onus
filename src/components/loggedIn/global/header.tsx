/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Image from "next/image";

import Menu from "@/components/loggedIn/global/menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  BsBook,
  BsBookmark,
  BsHouse,
  BsLightbulb,
  BsPlusCircleFill,
  BsSearch,
} from "react-icons/bs";

import { IoMenuOutline } from "react-icons/io5";
import AddVerseModal from "./addVerse";
import SearchModal from "./search";
import Link from "next/link";

export default function Header() {
  const [openSheet, setOpenSheet] = useState(false);

  return (
    <>
      <div className="flex items-center  justify-between gap-2 p-2 md:left-1/6   fixed  top-0 bg-white z-50   md:w-5/6 w-full  md:border-b-2">
        <div className="flex md:hidden md:gap-3">
          <Sheet open={openSheet} onOpenChange={setOpenSheet}>
            <SheetTrigger asChild>
              <IoMenuOutline className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent className="p-4 bg-[#0F3187] border-0 " side="left">
              <Menu setOpenSheet={setOpenSheet} />
            </SheetContent>
          </Sheet>
        </div>
        <Image
          priority
          width={36}
          height={36}
          src="/imgs/logos/onusLogoChosen.png"
          alt="logo"
        />
        <div className="flex items-cente  gap-2 p-2  ">
          <div className="md:flex hidden">
            <AddVerseModal
              TriggerComp={() => (
                <div className="flex items-center gap-2 md:rounded-full md:border md:p-2 cursor-pointer">
                  <BsPlusCircleFill className="md:w-6 md:h-6 w-10 h-10 text-" />
                  <p className="md:flex hidden">Add</p>
                </div>
              )}
            />
          </div>
          <SearchModal
            TriggerComp={() => (
              <div className=" flex md:flex-row flex-col items-center justify-center   md:rounded-full md:border-2 md:p-2 cursor-pointer">
                <BsSearch className="w-6 h-6" />
                <p className="text-xs">Search</p>
              </div>
            )}
          />
        </div>
      </div>
      <div className=" flex items-center md:justify-end justify-between gap-2 p-2 md:left-1/6  h-fit fixed md:hidden  bottom-0 bg-white z-50   md:w-5/6 w-full  md:border-b-2 border-t-2">
        <div className="flex items-center md:justify-end justify-between gap-2 p-2 w-full">
          <div className="md:hidden flex flex-col items-center justify-center   md:rounded-full md:border md:p-2 cursor-pointer">
            <BsHouse className=" w-6 h-6" />

            <p className="text-xs">Home</p>
          </div>
          <div className="md:hidden flex flex-col items-center justify-center   md:rounded-full md:border md:p-2 cursor-pointer">
            <BsBook className="block md:hidden w-6 h-6" />
            <p className="text-xs">Onus</p>
          </div>{" "}
          <AddVerseModal
            TriggerComp={() => (
              <div className="flex items-center gap-2 md:rounded-full md:border md:p-2 cursor-pointer">
                <BsPlusCircleFill className="md:w-6 md:h-6 w-10 h-10 text-[#0F3187]" />
                <p className="md:flex hidden">Add</p>
              </div>
            )}
          />
          <Link
            href="/saved"
            className="md:hidden flex flex-col items-center justify-center   md:rounded-full md:border md:p-2 cursor-pointer"
          >
            <BsBookmark className="block md:hidden w-6 h-6  " />
            <p className="text-xs">Saved</p>
          </Link>{" "}
          <div className="md:hidden flex flex-col items-center justify-center   md:rounded-full md:border md:p-2 cursor-pointer">
            <BsLightbulb className="block md:hidden w-6 h-6" />
            <p className="text-xs">Quize</p>
          </div>{" "}
        </div>
      </div>
    </>
  );
}
