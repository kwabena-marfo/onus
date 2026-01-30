"use client";

import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";

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
  BsBook,
  BsBookmark,
  BsHouse,
  BsLightbulb,
  BsPerson,
  BsPlusCircleFill,
  BsSearch,
} from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import AddVerseModal from "./addVerse";
import SearchModal from "./search";
import { useState } from "react";
import { LucideLoader2 } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  const { data: userSession } = authClient.useSession();
  const router = useRouter();

  const [logoutLoading, setLogoutLoading] = useState(false);

  const user = userSession?.user;

  return (
    <>
      {/* Top nav */}
      <nav className="flex items-center justify-between gap-2 p-1 px-3 md:left-1/6 fixed top-0 bg-white z-50 md:w-5/6 w-full md:border-b-2">
        <Image
          priority
          width={36}
          height={36}
          src="/imgs/logos/onusLogoChosen.png"
          alt="logo"
        />

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

          <SearchModal
            TriggerComp={() => (
              <div className="flex items-center justify-center md:p-2 p-1.5 cursor-pointer">
                <BsSearch className="w-6 h-6" />
              </div>
            )}
          />

          {/* Mobile Avatar & Popover */}
          <div className="flex md:hidden">
            <Popover>
              <PopoverTrigger>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user?.image || ""}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback>
                    {logoutLoading ? (
                      <LucideLoader2 className="h-6 w-6" />
                    ) : (
                      <BsPerson className="h-6 w-6" />
                    )}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="flex flex-col justify-center items-center">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={user?.image || ""}
                        alt={user?.name || "User"}
                      />
                      <AvatarFallback>
                        <BsPerson className="text-black w-16 h-16" />
                      </AvatarFallback>
                    </Avatar>
                    <h1 className="text-xl font-bold">{user?.name}</h1>
                    <p className="text-sm p-1">{user?.email}</p>
                  </div>

                  <div className="grid gap-2">
                    <Link
                      href="/app/myaccount"
                      className="flex items-center gap-3 ml-2 cursor-pointer"
                    >
                      <BsPerson className="w-5 h-5" />
                      <p>My Account</p>
                    </Link>

                    <Separator orientation="horizontal" />

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <div className="flex text-red-900 items-center gap-3 ml-2 cursor-pointer">
                          <LuLogOut className="w-5 h-5" />
                          <p>Logout</p>
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
                          <Button
                            disabled={logoutLoading}
                            onClick={async () => {
                              setLogoutLoading(true);
                              await authClient.signOut({
                                fetchOptions: {
                                  onSuccess: () => {
                                    router.push("/");
                                  },
                                },
                              });
                              setLogoutLoading(false);
                            }}
                            className="bg-red-900"
                          >
                            <div className="flex items-center space-x-1">
                              {logoutLoading ? (
                                <LucideLoader2 className="h-6 w-6" />
                              ) : (
                                <LuLogOut className="w-8 h-8" />
                              )}
                              <p>Continue</p>
                            </div>
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </nav>

      {/* Bottom mobile nav */}
      <nav className="flex items-center md:justify-end justify-between gap-2 p-1 md:left-1/6 h-fit fixed md:hidden bottom-0 bg-white z-50 md:w-5/6 w-full border-t-1">
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
