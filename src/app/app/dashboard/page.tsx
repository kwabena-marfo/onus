/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Content from "@/components/app/content";
import StatCard from "@/components/app/statCard";

import {
  BsEmojiSmile,
  BsBookHalf,
  BsBookmarkFill,
  BsLightbulbFill,
} from "react-icons/bs";
import VersesTable from "@/components/app/tables/verses";
import Image from "next/image";
import ProgressComp from "@/components/app/progress";
import { useGetVerses } from "@/hooks/useQuery";
import IsLoadingError from "@/components/app/isLoadingError";
import { authClient } from "@/lib/authClient";

export default function Dashboard() {
  const { data: userSession, isPending: userIsloading } =
    authClient.useSession();

  const { isPending, isError, error, data } = useGetVerses();

  const isLoading = isPending || userIsloading;

  if (isPending || isError)
    return (
      <IsLoadingError isLoading={isLoading} error={error} isError={isError} />
    );

  return (
    <Content
      tittle={`Hello ${userSession?.user.name?.split(" ")[0]}!`}
      Icon={BsEmojiSmile}
    >
      <div className="grid grid-cols-1 md:grid-cols-6 md:gap-4 gap-6">
        <div
          id="stat"
          className="col-span-12 md:col-span-2 flex flex-col gap-4 w-full"
        >
          <div className="grid grid-cols-2  gap-4 w-full">
            {[
              {
                label: "Memorised Verses",
                link: "/app/myonusbible",
                value:
                  data?.verses?.filter(
                    ({ memorised }: any) => memorised === "memorised",
                  )?.length || 0,
                colorB: "border-l-[#0F3187]",
                colorT: "text-[#0F3187]",
                icon: () => (
                  <div className="relative w-6 h-7 md:w-8 md:h-9">
                    <Image
                      priority
                      fill
                      src="/imgs/logos/onusKnot.png"
                      alt="logo"
                    />
                  </div>
                ),
                isLoading,
                isError,
              },
              {
                label: "Saved Verses",
                link: "/app/saved",
                value:
                  data?.verses?.filter(
                    ({ memorised }: any) => memorised === "saved",
                  )?.length || 0,
                colorB: "border-l-[#8C15E8]",
                colorT: "text-[#8C15E8]",
                icon: BsBookmarkFill,
                isLoading,
                isError,
              },
              {
                label: "Completed Books",
                link: "/app/myonusbible",
                value:
                  data?.grouped?.reduce((count: any, entry: any) => {
                    const bookName = Object.keys(entry)[0];
                    const bookData = entry[bookName];

                    return bookData.memorised >= 5 ? count + 1 : count;
                  }, 0) || 0,
                colorB: "border-l-[#9A6A10]",
                colorT: "text-[#9A6A10]",
                icon: BsBookHalf,
                isLoading,
                isError,
              },
              {
                label: "Quizzes So Far",
                link: "/app/quize",
                value: 0,
                colorB: "border-l-[#760606]",
                colorT: "text-[#760606]",
                icon: BsLightbulbFill,
                isLoading,
                isError,
              },
            ].map(({ label, value, colorB, colorT, icon, link }, index) => (
              <StatCard
                link={link}
                key={index}
                label={label}
                value={value}
                colorB={colorB}
                colorT={colorT}
                Icon={icon}
                isLoading={isLoading}
                isError={isError}
              />
            ))}
          </div>
          <ProgressComp data={data?.grouped || []} />
        </div>
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4 w-full rounded-lg">
          <VersesTable data={data?.verses || []} />
        </div>
      </div>
    </Content>
  );
}
