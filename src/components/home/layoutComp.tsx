"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/authClient";

import { BsApple, BsGooglePlay } from "react-icons/bs";
import { useEffect } from "react";

export default function LayoutComp({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/app/dashboard";

  const { data: sessionData, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;
    if (sessionData) router.push(callbackUrl);
  }, [callbackUrl, router, sessionData]);

  return (
    <div className="h-[100dvh] grid  lg:grid-cols-6 lg:bg-[url('/imgs/bgs/worldMap.svg')] bg-cover bg-repeat">
      <div className="col-span-3 md:col-span-2  flex flex-col relative  h-full">
        <div className="absolute  h-full w-full bg-gradient-to-br from-white/95 via-white/95 to-[#01CFFE]/80    rounded-br-[500px] md:rounded-br-[500px]  " />
        <div className="flex flex-col gap-9  justify-start items-start  h-full  ">
          <div className="flex flex-col justify-center items-center w-full pt-6 md:px-28 px-6">
            <Link href="/" className="relative  h-20  w-20">
              <Image
                fill
                className="object-contain"
                priority
                src="/imgs/logos/onusLogoChosen.png"
                alt="logo"
              />
            </Link>
            {children}
          </div>

          {/* Bottom Seesions for Mockup and Knot */}
          <div className="h-2/5 lg:h-1/2 w-4/5 z-5   lg:w-4/5 flex absolute bottom-0   justify-center items-center">
            <Image
              fill
              alt="Service Photo"
              src="/imgs/logos/onusLogoKnot.png"
              blurDataURL="/imgs/logos/onusLogoKnot.png"
              placeholder="blur"
              className="object-cover object-top"
            />
          </div>

          {/* Mobile Mockup */}
          <div className="h-1/2 w-full flex absolute bottom-0 lg:hidden -z-20">
            <Image
              fill
              alt="Service Photo"
              src="/imgs/bgs/mockupmAINMO.png"
              blurDataURL="/imgs/bgs/mockupmAINMO.png"
              placeholder="blur"
              className="object-cover object-top-left"
            />
          </div>
        </div>
      </div>

      <div className="col-span-3 md:col-span-4 lg:flex   relative hidden">
        <Image
          fill
          alt="Service Photo"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          src="/imgs/bgs/mockupmAIN.png"
          blurDataURL="/imgs/bgs/mockupmAIN.png"
          placeholder="blur"
        />
      </div>

      {/* Footer */}
      <div className="md:flex gap-2 justify-center items-center p-6 w-full absolute bottom-0 hidden">
        <div className="md:flex gap-2 justify-center items-center p-6  top-0 w-full z-50 hidden">
          <div className="flex rounded-md p-3 justify-center items-center bg-white gap-2 cursor-pointer">
            <BsApple className="w-10 h-10" />
            <div className="flex flex-col">
              <p className="-my-2">Download On The</p>
              <p className="text-2xl font-bold">App Store</p>
            </div>
          </div>
          <div className="flex rounded-md p-3 justify-center items-center bg-white gap-2 cursor-pointer">
            <BsGooglePlay className="w-10 h-10 " />
            <div className="flex flex-col">
              <p className="-my-2">Get It On</p>
              <p className="text-2xl font-bold">Google Play</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
