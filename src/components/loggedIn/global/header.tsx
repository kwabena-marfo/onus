/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Image from "next/image";

import Menu from "@/components/loggedIn/global/menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { BsList, BsPersonFill } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import Link from "next/link";

export default function Header({ admin }: any) {
  const [openSheet, setOpenSheet] = useState(false);

  return (
    <>
      <nav className="md:left-1/6  fixed top-0 z-50 md:w-5/6 w-full bg-white border-b-2">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="block md:hidden">
              <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                <SheetTrigger asChild>
                  <div>
                    <BsList
                      style={{ height: "26px", width: "26px" }}
                      color="gray-900"
                    />
                  </div>
                </SheetTrigger>
                <SheetContent className="pt-5 bg-[#0F3187]" side="left">
                  <Menu setOpenSheet={setOpenSheet} />
                </SheetContent>
              </Sheet>
            </div>
            <Link href="/app" className="flex items-center space-x-1">
              <Image
                priority
                width={36}
                height={36}
                src="/imgs/logos/onusLogoChosen.png"
                alt="logo"
              />
            </Link>
            <div className="flex justify-end items-center md:gap-3">
              <div className="flex items-center space-x-1">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={admin?.dp} alt="admin" />
                  <AvatarFallback>
                    <BsPersonFill />
                  </AvatarFallback>
                </Avatar>
                <p className="text-gray-900  md:text-sm hidden md:flex">
                  Frank
                </p>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="md:flex hidden items-center space-x-1 cursor-pointer">
                    <LuLogOut className="w-4 h-4" />
                    <p className="text-sm">Logout</p>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will log you out of the app
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive">
                      <div className="flex items-center space-x-1">
                        <LuLogOut className="w-4 h-4" />
                        <p className="hidden md:block">Continue</p>
                      </div>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
