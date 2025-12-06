/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { LuLoaderCircle } from "react-icons/lu";

export default function IsLoadingError({ isLoading, isError, error }: any) {
  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center  h-screen py-10">
        <LuLoaderCircle className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (isError) {
    const errMessage =
      (error as AxiosError<{ error: string }>)?.response?.data?.error ||
      "Something went wrong";

    return (
      <div className="flex flex-1 items-center justify-center  h-screen py-10">
        <p className="text-lg text-red-500">{errMessage}</p>
      </div>
    );
  }

  return null;
}
