/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Content from "@/components/app/content";

import VersesTable from "@/components/app/tables/verses";

import { BsBookmark } from "react-icons/bs";
import ProgressComp from "@/components/app/progress";
import { useGetVerses } from "@/hooks/useQuery";
import IsLoadingError from "@/components/app/isLoadingError";

export default function Saved() {
  const { isPending, isError, error, data } = useGetVerses();

  <IsLoadingError isLoading={isPending} error={error} isError={isError} />;

  return (
    <Content tittle="Saved" Icon={BsBookmark}>
      <div className="grid justify-start items-start  grid-cols-1  md:grid-cols-5 gap-4">
        <div className="md:col-span-3 col-span-5 ">
          <VersesTable
            data={
              data?.verses?.filter(
                ({ memorised }: any) => memorised == "saved"
              ) || []
            }
          />
        </div>
        <div className="md:col-span-2 col-span-5 ">
          <ProgressComp data={data?.grouped || []} />
        </div>
      </div>
    </Content>
  );
}
