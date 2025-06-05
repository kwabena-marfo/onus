/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Image from "next/image";

import Menu from "@/components/loggedIn/global/menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { BsBook, BsHouse, BsPlusCircleFill, BsSearch } from "react-icons/bs";

import { IoMenuOutline } from "react-icons/io5";
import AddVerseModal from "./addVerse";
import Search from "./search";

export default function Header() {
  const [openSheet, setOpenSheet] = useState(false);

  return (
    <nav className="md:left-1/6  h-fit fixed  md:top-0  bottom-0 bg-white z-50   md:w-5/6 w-full  md:border-b-2 border-t-2">
      <div className="flex items-center md:justify-end justify-between gap-2 p-2 w-full">
        <Image
          priority
          width={36}
          height={36}
          src="/imgs/logos/onusLogoChosen.png"
          alt="logo"
          className="md:flex hidden"
        />
        <div className="flex items-center md:justify-end justify-between gap-2 p-2 w-full">
          <BsHouse className="block md:hidden w-6 h-6" />

          <BsBook className="block md:hidden w-6 h-6" />
          <AddVerseModal
            TriggerComp={() => (
              <div className="flex items-center gap-2 md:rounded-full md:border md:p-2 cursor-pointer">
                <BsPlusCircleFill className="md:w-6 md:h-6 w-10 h-10" />
                <p className="md:flex hidden">Add</p>
              </div>
            )}
          />

          <Search
            TriggerComp={() => (
              <div className="flex items-center gap-2 md:rounded-full md:border md:p-2 cursor-pointer">
                <BsSearch className="w-6 h-6" />
                <p className="md:flex hidden">Search</p>
              </div>
            )}
          />

          <div className="flex justify-end items-center md:gap-3">
            <div className="block md:hidden">
              <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                <SheetTrigger asChild>
                  <IoMenuOutline className="w-6 h-6" />
                </SheetTrigger>
                <SheetContent className="p-4 bg-[#0F3187]" side="left">
                  <Menu setOpenSheet={setOpenSheet} />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
