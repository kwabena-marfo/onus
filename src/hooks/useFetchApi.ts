// hooks/useApi.ts
import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";

export default function useApi(): AxiosInstance {
  // useMemo ensures the Axios instance is not recreated every render
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
      withCredentials: true,
    });

    return instance;
  }, []);

  return api;
}
