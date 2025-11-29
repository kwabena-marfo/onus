"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useCreateUserApi } from "@/hooks/useQuery";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LuLoaderCircle } from "react-icons/lu";

export default function SaveUser() {
  const { user } = useUser();
  const router = useRouter();

  const { trigger, isError, data } = useCreateUserApi();

  useEffect(() => {
    const syncUser = async () => {
      try {
        if (!user) return;

        // Prepare payload
        const payload = {
          name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
          email: user.emailAddresses[0]?.emailAddress ?? "",
          clerkId: user.id,
        };

        await trigger(payload);
        if (data) router.push("/app/dashboard");
      } catch (err: any) {
        console.error(err);
      }
    };

    syncUser();
  }, [user, router, data]);

  return (
    <div className="flex flex-col justify-center items-center mt-8 z-50">
      {isError ? (
        <>
          <p className="text-red-400 z-50">Sorry An Error Occured</p>{" "}
          <Link href="/login">
            <Button className="w-full bg-[#e77306]">Login Again</Button>
          </Link>
        </>
      ) : (
        <>
          <p className="text-gray-950 z-50">Signing you in...</p>
          <LuLoaderCircle className="animate-spin text-black h-10 w-10 mt-2" />
        </>
      )}
    </div>
  );
}
