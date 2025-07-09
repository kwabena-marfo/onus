/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Content from "@/components/app/content";
import { useGetOnus } from "@/hooks/global/useSWRFetch";

import { Progress } from "@/components/ui/progress";
import VersesTable from "@/components/app/tables/verses";

import { BsBookmark, BsDatabaseSlash, BsTriangleFill } from "react-icons/bs";
import { LuLoaderCircle } from "react-icons/lu";
import { useSession } from "next-auth/react";

export default function Saved() {
  const { status } = useSession<any>();

  const { onusData, getOnusIsLoading, getOnusIsError } = useGetOnus();

  if (status == "loading" || getOnusIsLoading)
    return (
      <div className="h-dvh grid justify-center items-center-center  ">
        <p>Loading</p>
        <LuLoaderCircle className="animate-spin text-black h-10 w-7" />
      </div>
    );

  if (getOnusIsError)
    return (
      <div className="h-dvh grid justify-center items-center-center  ">
        <p>Sorry An error Occured, Could not fetch data</p>
        <BsTriangleFill />
      </div>
    );

  return (
    <Content tittle="Saved Verses" Icon={BsBookmark}>
      <div className="grid justify-start items-start  grid-cols-1  md:grid-cols-5 gap-4">
        <div className="rounded-lg  p-3 border md:col-span-3 col-span-5 ">
          {!onusData?.verses?.filter(
            ({ memorised }: any) => memorised == "saved"
          )?.length ? (
            <div className="flex flex-col justify-center items-center h-full">
              <BsDatabaseSlash className="w-12 h-12" />
              <p>No Data Found</p>
              <p>Your added verses will appear here</p>
            </div>
          ) : (
            <VersesTable
              data={
                onusData?.verses?.filter(
                  ({ memorised }: any) => memorised == "saved"
                ) || []
              }
            />
          )}
        </div>
        <div className="flex flex-col justify-start items-start col-span-5 md:col-span-2 gap-8 ">
          {!onusData || !onusData.grouped?.length ? (
            <div className=" flex flex-col justify-center items-center">
              <BsDatabaseSlash className="w-12 h-12" />
              <p>No Data Found</p>
              <p>Your Progress will appear here</p>
            </div>
          ) : (
            <div className="flex flex-col w-full gap-1">
              <div className="grid gap-6 rounded-lg p-3 bg-gray-50 border h-full">
                <h4 className="text-xl md:text-4xl font-bold text-gray-700">
                  Your Progress
                </h4>

                {onusData.grouped.map((entry: any) => {
                  const bookName = Object.keys(entry)[0];
                  const { memorised } = entry[bookName];

                  if (!memorised) return null; // Hide if memorised = 0

                  const percentage = Math.min(
                    Math.round((memorised / 5) * 100),
                    100
                  );

                  return (
                    <div key={bookName} className="grid gap-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-600 capitalize">
                          {bookName}
                        </p>
                        <p className="text-sm text-gray-500">{percentage}%</p>
                      </div>
                      <Progress value={percentage} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Content>
  );
}
