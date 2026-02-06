/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import Content from "@/components/app/content";
import QuizForm from "./components/addQuizeForm";
import { BsLightbulb } from "react-icons/bs";
import IsLoadingError from "@/components/app/isLoadingError";
import { authClient } from "@/lib/authClient";

export default function AddQuize() {
  const router = useRouter();

  const { isPending: sessionIsLoading, data: sessionData } =
    authClient.useSession();

  const isAdmin = [
    "marfobrempong@gmail.com",
    "frankappiah499@gmail.com",
  ].includes(sessionData?.user?.email as any);

  // ⏳ Wait for session
  if (sessionIsLoading) return <IsLoadingError isLoading={sessionIsLoading} />;

  if (!isAdmin) {
    router.replace("/app/dashboard");
    return null;
  }

  return (
    <Content tittle="Add Quize" Icon={BsLightbulb}>
      <div className="flex w-full justify-center mt-6">
        <QuizForm />
      </div>
    </Content>
  );
}
