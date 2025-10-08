/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Content from "@/components/app/content";
import { useGetOnus } from "@/hooks/global/useSWRFetch";

import VersesTable from "@/components/app/tables/verses";

import { BsBookmark, BsDatabaseSlash, BsTriangleFill } from "react-icons/bs";
import { LuLoaderCircle } from "react-icons/lu";
import { useSession } from "next-auth/react";
import ProgressComp from "@/components/app/progress";

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

        <ProgressComp data={onusData?.grouped || []} />
      </div>
    </Content>
  );
}
