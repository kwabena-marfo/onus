/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Content from "@/components/loggedIn/global/content";
import { useGetOnus } from "@/hooks/global/useSWRFetch";

import { BsBookmark, BsTriangleFill } from "react-icons/bs";
import { Progress } from "@/components/ui/progress";
import Table from "@/components/loggedIn/tables/saved";
import { LuLoaderCircle } from "react-icons/lu";

export default function Dashboard() {
  const { onusData, getOnusIsLoading, getOnusIsError } = useGetOnus();

  if (getOnusIsLoading) return <LuLoaderCircle className="animate-spin" />;

  if (getOnusIsError) return <BsTriangleFill />;

  return (
    <Content tittle="Saved Verses" Icon={BsBookmark}>
      <div className="grid justify-start items-start  grid-cols-1  md:grid-cols-5 gap-4">
        <div className="rounded-lg  p-3 border md:col-span-3 col-span-5 ">
          <Table
            data={
              onusData?.verses?.filter(
                ({ memorised }: any) => memorised == "saved"
              ) || []
            }
          />
        </div>
        <div className="flex flex-col justify-start items-start col-span-5 md:col-span-2 gap-8 ">
          {!onusData || !onusData.grouped ? (
            <p>No progress to show</p>
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
