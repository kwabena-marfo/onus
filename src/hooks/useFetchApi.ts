// hooks/useApi.ts
import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";
import { authClient } from "@/lib/authClient"; // your Better Auth client

export default function useApi(): AxiosInstance {
  // useMemo ensures the Axios instance is not recreated every render
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
      withCredentials: false,
    });

    // Interceptor to attach Better Auth token to protected routes
    instance.interceptors.request.use(async (config) => {
      const protectedPrefixes = ["/api/app"];

      const isProtected = protectedPrefixes.some((prefix) =>
        config.url?.startsWith(prefix)
      );

      if (isProtected) {
        const { data } = await authClient.getSession();
        const token = data?.session.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    });

    return instance;
  }, []);

  return api;
}
