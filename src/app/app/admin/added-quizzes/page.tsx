/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import Content from "@/components/app/content";
import AddedQuizzesTable from "@/components/app/tables/added-quizzes";
import { BsLightbulb } from "react-icons/bs";
import { useGetAddedQuizzes } from "@/hooks/useQuery";
import IsLoadingError from "@/components/app/isLoadingError";
import { authClient } from "@/lib/authClient";

export default function AddedQuizzes() {
  const router = useRouter();
  const { isPending: sessionIslaoding, data: sessionData } =
    authClient.useSession();

  const { isPending, isError, error, data } = useGetAddedQuizzes();

  const isAdmin = [
    "marfobrempong@gmail.com",
    "frankappiah499@gmail.com",
  ].includes(sessionData?.user.email as any);

  // 🚫 block page

  if (sessionIslaoding || isPending || isError)
    return (
      <IsLoadingError
        isLoading={sessionIslaoding || isPending}
        error={error}
        isError={isError}
      />
    );

  if (!isAdmin) {
    router.replace("/app/dashboard");
    return null;
  }

  return (
    <Content tittle="Added Quizzes" Icon={BsLightbulb}>
      <div className="grid justify-center items-start grid-cols-1 md:grid-cols-5 gap-4">
        <div className="justify-center col-span-5">
          <AddedQuizzesTable data={data || []} />
        </div>
      </div>
    </Content>
  );
}
