/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";

import axios from "@/config/axios";

export const useGetOnus = () => {
  // const { admin } = useGetAdminStates();
  // const axios = securedAxios(admin?.accessToken);
  const fetcher = (url: any) => axios.get(url).then((res) => res.data);

  const {
    data,
    error: getOnusIsError,
    mutate: mutateGetOnus,
  } = useSWR("/api/app/get-onus", fetcher);

  return {
    getOnusIsLoading: !getOnusIsError && !data,
    onusData: data,
    getOnusIsError,
    mutateGetOnus,
  };
};
