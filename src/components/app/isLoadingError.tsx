/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { LuLoaderCircle } from "react-icons/lu";

export default function IsLoadingError({ isLoading, isError, error }: any) {
  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-10">
        <LuLoaderCircle className="animate-spin w-6 h-6" />
      </div>
    );
  }

  if (isError) {
    const errMessage =
      (error as AxiosError<{ error: string }>)?.response?.data?.error ||
      "Something went wrong";

    return (
      <div className="flex flex-col items-center justify-center gap-3 py-10">
        <p className="text-lg text-red-500">{errMessage}</p>
      </div>
    );
  }

  return null;
}
