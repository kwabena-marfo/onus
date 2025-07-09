/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSession } from "next-auth/react";

import Content from "@/components/app/content";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { BsPerson } from "react-icons/bs";
import { Button } from "@/components/ui/button";

export default function MyOnusBible() {
  const { data: session } = useSession<any>();

  return (
    <Content tittle="My Account" Icon={BsPerson}>
      <div className="flex  w-full justify-center items-center md:gap-6 gap-4 mt-6">
        <div className="md:container md:max-w-3xl flex flex-col gap-6 rounded-lg p-3 bg-gray-50/30 border h-full">
          <div className="grid  justify-center items-center p-3">
            <div className="flex justify-center">
              <Avatar className="w-32 h-32">
                <AvatarImage src="/" alt="admin" />
                <AvatarFallback>
                  <BsPerson className="text-black w-24 h-24" />
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col justify-center items-center gap-0">
              <h1 className="text-xl font-bold">{session?.user?.name}</h1>
              <p className="text-lg ">{session?.user?.email}</p>
              <Button>Reset Password</Button>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
}
