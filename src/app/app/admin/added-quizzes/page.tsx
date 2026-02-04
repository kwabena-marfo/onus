/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Content from "@/components/app/content";

import AddedQuizzesTable from "@/components/app/tables/added-quizzes";

import { BsBookmark, BsLightbulb } from "react-icons/bs";
import { useGetAddedQuizzes } from "@/hooks/useQuery";
import IsLoadingError from "@/components/app/isLoadingError";

export default function AddedQuizzes() {
  const { isPending, isError, error, data } = useGetAddedQuizzes();

  if (isPending || isError)
    return (
      <IsLoadingError isLoading={isPending} error={error} isError={isError} />
    );

  return (
    <Content tittle="Added Quizzes" Icon={BsLightbulb}>
      <div className="grid justify-center items-start  grid-cols-1  md:grid-cols-5 gap-4">
        <div className=" justify-center col-span-5 max-lg:">
          <AddedQuizzesTable data={data || []} />
        </div>
      </div>
    </Content>
  );
}
