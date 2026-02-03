/* eslint-disable @typescript-eslint/no-explicit-any */

import Content from "@/components/app/content";
import QuizForm from "./components/addQuizeForm";
import { BsLightbulb } from "react-icons/bs";

export default function AddQuize() {
  return (
    <Content tittle="Add Quize" Icon={BsLightbulb}>
      <div className="flex w-full justify-center mt-6">
        <div
          className="md:max-w-lg flex flex-col gap-6 rounded-lg p-4 w-full
          bg-white/90 border border-gray-200 dark:bg-gray-900/80 dark:border-gray-700"
        >
          <QuizForm />
        </div>
      </div>
    </Content>
  );
}
