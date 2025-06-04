/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
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
import { LuLogOut } from "react-icons/lu";

import menuData from "@/data/loggedInMenu";

import { Separator } from "@/components/ui/separator";

export default function Menu({ setOpenSheet }: { setOpenSheet?: any }) {
  const pathname = usePathname();
  return (
    <div className="grid gap-12 text-white">
      <div className="grid">
        <h1 className="text-4xl font-bold">Frank Appiah</h1>
        <p className="text-sm p-1">frank@gmail.com</p>
      </div>
      <Separator className="bg-[#01CFFE]/50" />
      <ul className="space-y-3 text-sm  ">
        {menuData.map(({ icon, label, hasBadge, key }: any, index: any) => {
          const isActive = pathname?.startsWith(key);

          return (
            <li onClick={() => setOpenSheet && setOpenSheet(false)} key={index}>
              <Link
                href={key}
                className={`flex items-center text-lg p-1 px-2  rounded-lg ${
                  isActive ? "text-white" : "text-[#01CFFE]/90"
                } hover:text-[#01CFFE]/90`}
              >
                {icon}
                <span className="flex-1 ml-3 whitespace-nowrap">{label}</span>
                {hasBadge && (
                  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full">
                    {hasBadge}
                  </span>
                )}
              </Link>
            </li>
          );
        })}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className=" flex text-[#01CFFE]/90  items-center gap-3 ml-2 cursor-pointer">
              <LuLogOut className="w-4 h-4" />
              <p className="text-sm">Logout</p>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
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
      </ul>
    </div>
  );
}
