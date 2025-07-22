/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import axios from "@/config/axios";

export default function useTriggerRequest() {
  type TriggerProps = {
    route: string;
    reqType: "get" | "post" | "put" | "delete";
    data?: object;
    headers?: object;
  };

  type SetReqStateProps = {
    pending?: boolean;
    data?: object;
    error?: string | object;
  };

  const [reqState, setReqState] = useState<SetReqStateProps | null>();

  // if (securedRoute === "secured") {
  //   const axiosSecured: any = securedAxios(admin?.accessToken);
  //   const adminTrigger = async ({ route, reqType, data }: TriggerProps) => {
  //     try {
  //       setReqState({ pending: true });

  //       const response = await axiosSecured[reqType](route, data && data);

  //       setReqState({ data: response.data });
  //     } catch ({ response }: any) {
  //       setReqState({ error: response?.data || "Error" });
  //     }
  //   };
  //   return {
  //     reqFunction: adminTrigger,
  //     setReqState,
  //     reqState,
  //   };
  // }

  const globalTrigger = async ({
    route,
    reqType,
    data,
    headers,
  }: TriggerProps) => {
    try {
      setReqState({ pending: true });

      let response;

      if (reqType === "get") {
        response = await axios.get(route, {
          params: data,
          headers,
        });
      } else {
        response = await axios[reqType](route, data, {
          headers,
        });
      }

      setReqState({ data: response.data, pending: false });
    } catch (error: any) {
      setReqState({
        error: error?.response?.data || "An error occurred",
        pending: false,
      });
    }
  };

  return {
    reqFunction: globalTrigger,
    setReqState,
    reqState,
  };
}
