/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import {
  BsBell,
  BsBook,
  BsBookmark,
  BsCircleFill,
  BsHouse,
  BsPerson,
  BsPlusCircleFill,
  BsSearch,
  BsX,
} from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddVerseModal from "./addVerse";
import SearchModal from "./search";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LuLogOut } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
export default function Header() {
  const { data: session } = useSession<any>();

  return (
    <>
      <nav className="flex items-center  justify-between gap-2 p-1 px-3 md:left-1/6   fixed  top-0 bg-white z-50   md:w-5/6 w-full  md:border-b-2">
        <div className="flex md:hidden">
          <Popover>
            <PopoverTrigger>
              <Avatar className="h-10 w-10   ">
                <AvatarImage src="" alt="@shadcn" />
                <AvatarFallback>
                  <BsPerson className="h-6 w-6  " />
                </AvatarFallback>
              </Avatar>{" "}
            </PopoverTrigger>
            <PopoverContent className="w-80   ">
              <div className="grid gap-4">
                <div className="flex flex-col justify-center items-center">
                  <div className="flex items-center space-x-1">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="/" alt="admin" />
                      <AvatarFallback>
                        <BsPerson className="text-black w-16 h-16" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h1 className="text-xl font-bold">{session?.user?.name}</h1>
                  <p className="text-sm p-1">{session?.user?.email}</p>
                </div>
                <div className="grid gap-2">
                  <div className=" flex items-center gap-3 ml-2 cursor-pointer">
                    <BsPerson className="w-5 h-5" />
                    <p className="">My Account</p>
                  </div>
                  <Separator orientation="horizontal" />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div className=" flex text-red-900  items-center gap-3 ml-2 cursor-pointer">
                        <LuLogOut className="w-5 h-5" />
                        <p className="">Logout</p>
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
                        <AlertDialogAction className="bg-red-900">
                          <div className="flex items-center space-x-1">
                            <LuLogOut className="w-8 h-8" />
                            <p className="">Continue</p>
                          </div>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Image
          priority
          width={36}
          height={36}
          src="/imgs/logos/onusLogoChosen.png"
          alt="logo"
        />
        <div className="flex items-cente  gap-3 p-2  ">
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
              <div className="hidden md:flex md:flex-row flex-col items-center justify-center   md:rounded-full md:border-2 md:p-2 cursor-pointer">
                <BsSearch className="w-6 h-6" />
                <p className="text-xs">Search</p>
              </div>
            )}
          />

          <Sheet>
            <SheetTrigger>
              {" "}
              <div className=" flex md:flex-row flex-col items-center justify-center   md:rounded-full md:border-2 md:p-2 cursor-pointer relative">
                <BsCircleFill className="text-yellow-500 w-2.5 h-2.5" />{" "}
                <BsBell className="w-6 h-6" />
                <p className="text-xs hidden md:flex">Notifications</p>
              </div>
            </SheetTrigger>
            <SheetContent className="p-2">
              <SheetHeader>
                <SheetTitle>
                  <div className=" flex md:flex-row flex-col items-center justify-center   md:rounded-full md:border-2 md:p-2 cursor-pointer relative">
                    <BsCircleFill className="text-yellow-500 w-2.5 h-2.5" />{" "}
                    <BsBell className="w-6 h-6" />
                    <p className="text-base">Notifications</p>
                  </div>
                </SheetTitle>
                <SheetDescription className="text-center">
                  Your Notifications Will appear here
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-2">
                <div className="grid p-2 border rounded-lg bg-gray-100">
                  <div className="flex justify-between font-medium">
                    Congratulations, You just completed the book of Matthew
                    <BsX />
                  </div>
                  <Separator className="my-2" />
                  <p className="text-xs">May 20, 5:90pm</p>
                </div>

                <div className="grid p-2 border rounded-lg bg-gray-100">
                  <div className="flex justify-between font-medium">
                    Your Reminder for today, you are growing already
                    <BsX />
                  </div>
                  <Separator className="my-2" />
                  <p className="text-xs">May 20, 5:90pm</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <nav className=" flex items-center md:justify-end justify-between gap-2 p-1 md:left-1/6  h-fit fixed md:hidden  bottom-0 bg-white z-50   md:w-5/6 w-full   border-t-1">
        <div className="flex items-center md:justify-end justify-between gap-2 p-2 w-full">
          <Link href="/app/dashboard">
            <div className="md:hidden flex flex-col items-center justify-center   md:rounded-full md:border md:p-2 cursor-pointer">
              <BsHouse className=" w-6 h-6" />

              <p className="text-xs">Home</p>
            </div>
          </Link>
          <Link href="/app/myonusbible">
            <div className="md:hidden flex flex-col items-center justify-center   md:rounded-full md:border md:p-2 cursor-pointer">
              <BsBook className="block md:hidden w-6 h-6" />
              <p className="text-xs">My Onus</p>
            </div>{" "}
          </Link>
          <AddVerseModal
            TriggerComp={() => (
              <div className="flex items-center gap-2 md:rounded-full md:border md:p-2 cursor-pointer">
                <BsPlusCircleFill className="md:w-6 md:h-6 w-10 h-10 text-[#0F3187]" />
                <p className="md:flex hidden">Add</p>
              </div>
            )}
          />
          <Link
            href="/app/saved"
            className="md:hidden flex flex-col items-center justify-center   md:rounded-full md:border md:p-2 cursor-pointer"
          >
            <BsBookmark className="block md:hidden w-6 h-6  " />
            <p className="text-xs">Saved</p>
          </Link>{" "}
          <SearchModal
            TriggerComp={() => (
              <div className=" flex md:flex-row flex-col items-center justify-center   md:rounded-full md:border-2 md:p-2 cursor-pointer">
                <BsSearch className="w-6 h-6" />
                <p className="text-xs">Search</p>
              </div>
            )}
          />
        </div>
      </nav>
    </>
  );
}
