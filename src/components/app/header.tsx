/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/authClient";

import {
  BsBook,
  BsBookmark,
  BsGearWideConnected,
  BsHouse,
  BsLightbulb,
  BsPerson,
  BsPlus,
  BsPlusCircleFill,
  BsSearch,
} from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import AddVerseModal from "./addVerse";
import SearchModal from "./search";
import Logout from "./logout";
import { ModeToggle } from "./toggleMode";
import Logo from "../home/logo";
import { Separator } from "../ui/separator";

export default function Header() {
  const { data: userSession } = authClient.useSession();

  const user = userSession?.user;

  return (
    <>
      {/* Top nav */}
      <nav className="flex items-center justify-between gap-2 p-1 px-3 md:left-1/6 fixed top-0 bg-background text-foreground z-50 md:w-5/6 w-full border-b border-border">
        <Logo />

        <div className="flex items-center gap-3 p-2">
          <div className="md:flex hidden">
            <AddVerseModal
              TriggerComp={() => (
                <div className="flex items-center gap-2 md:rounded-full md:border md:p-2 cursor-pointer">
                  <BsPlusCircleFill className="md:w-6 md:h-6 w-10 h-10" />
                  <p className="md:flex hidden">Add</p>
                </div>
              )}
            />
          </div>

          {["marfobrempong@gmail.com", "frankappiah499@gmail.com"].includes(
            user?.email as any,
          ) ? (
            <div className="flex">
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer" asChild>
                  <div className="flex justify-left items-center gap-1">
                    <BsGearWideConnected className="h-6 w-6" />
                    <p className="md:flex hidden">Admin</p>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="flex flex-col w-72 p-4">
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/app/admin/add-quize">
                      <div className="flex justify-left items-center gap-2  ">
                        <BsPlus className="w-12 h-12" />
                        Add New Quize
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/app/admin/added-quizzes">
                      <div className="flex justify-left items-center gap-2  ">
                        <BsLightbulb className="w-12 h-12" />
                        View Quizzes
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : null}

          <SearchModal
            TriggerComp={() => (
              <div className="flex items-center justify-center md:p-2 p-1.5 cursor-pointer">
                <BsSearch className="w-6 h-6" />
              </div>
            )}
          />

          <div className="flex ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage
                    src={user?.image || ""}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback>
                    <BsPerson className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="flex flex-col w-72 p-4">
                <div className="flex flex-col items-center gap-0 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={user?.image || ""}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback>
                      <BsPerson className="w-16 h-16 text-black" />
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-xl font-bold">{user?.name}</h1>
                  <p className="text-sm text-center">{user?.email}</p>
                </div>

                <Separator />

                {/* Actions */}
                <DropdownMenuItem asChild>
                  <Link
                    className="flex justify-left items-center gap-2"
                    href="/app/myaccount"
                  >
                    <BsPerson className="w-12 h-12" />
                    My Account
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Logout
                    TriggerComp={() => (
                      <div className="flex justify-left items-center gap-2  text-red-600">
                        <LuLogOut className="w-5 h-5" />
                        Logout
                      </div>
                    )}
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <ModeToggle />
        </div>
      </nav>

      {/* Bottom mobile nav */}
      <nav className="flex items-center md:justify-end justify-between gap-2 p-1 md:left-1/6 fixed md:hidden bottom-0 bg-background text-foreground z-50 md:w-5/6 w-full border-t border-border">
        <div className="flex items-center md:justify-end justify-between gap-2 p-2 w-full">
          <Link href="/app/dashboard">
            <div className="flex flex-col items-center justify-center cursor-pointer">
              <BsHouse className="w-6 h-6" />
              <p className="text-xs">Home</p>
            </div>
          </Link>

          <Link href="/app/myonusbible">
            <div className="flex flex-col items-center justify-center cursor-pointer">
              <BsBook className="w-6 h-6" />
              <p className="text-xs">My Onus</p>
            </div>
          </Link>

          <AddVerseModal
            TriggerComp={() => (
              <div className="flex items-center gap-2 md:rounded-full md:border md:p-2 cursor-pointer">
                <BsPlusCircleFill className="md:w-6 md:h-6 w-10 h-10 text-[#0F3187]" />
                <p className="md:flex hidden">Add</p>
              </div>
            )}
          />

          <Link href="/app/saved">
            <div className="flex flex-col items-center justify-center cursor-pointer">
              <BsBookmark className="w-6 h-6" />
              <p className="text-xs">Saved</p>
            </div>
          </Link>

          <Link href="/app/quizzes">
            <div className="flex flex-col items-center justify-center cursor-pointer">
              <BsLightbulb className="w-6 h-6" />
              <p className="text-xs">Quizzes</p>
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
}
