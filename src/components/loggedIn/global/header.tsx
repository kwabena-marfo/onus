/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Image from "next/image";

import Menu from "@/components/loggedIn/global/menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  BsBook,
  BsHouse,
  BsPerson,
  BsPlusCircleFill,
  BsSearch,
  BsX,
} from "react-icons/bs";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Header({ admin }: any) {
  const [openSheet, setOpenSheet] = useState(false);

  return (
    <>
      <nav className="md:left-1/6  h-fit fixed  md:top-0  bottom-0 bg-white z-50   md:w-5/6 w-full  md:border-b-2 border-t-2">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <BsHouse className="block md:hidden w-6 h-6" />

            <BsBook className="block md:hidden w-6 h-6" />

            {/*  <BsBookmark className="block md:hidden w-6 h-6" /> */}

            <BsPlusCircleFill className="block md:hidden w-10 h-10" />

            {/* <BsLightbulb className="block md:hidden w-6 h-6" /> */}
            <BsSearch className="block md:hidden w-6 h-6" />

            <Link href="/app" className="md:flex items-center space-x-1 hidden">
              <Image
                priority
                width={36}
                height={36}
                src="/imgs/logos/onusLogoChosen.png"
                alt="logo"
              />
            </Link>

            <div className="hidden md:flex md:w-1/2 relative">
              <div className="flex items-center">
                <span className="absolute inset-y-0 right-2 flex items-center gap-0">
                  <BsX className="cursor-pointer" />
                </span>
              </div>
              <Input
                placeholder="Search here..."
                className=" rounded-full h-12 bg-gray-50 "
              />
            </div>
            <div className="flex justify-end items-center md:gap-3">
              <Button size="lg" className="rounded-full hidden md:flex">
                Add +
              </Button>
              <div className="block md:hidden">
                <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                  <SheetTrigger asChild>
                    <div className="flex items-center space-x-1">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={admin?.dp} alt="admin" />
                        <AvatarFallback>
                          <BsPerson />
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-gray-900  md:text-sm hidden md:flex">
                        Frank
                      </p>
                    </div>
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
    </>
  );
}
