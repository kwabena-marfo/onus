// hooks/useApi.ts
import axios, { AxiosInstance } from "axios";
import { useAuth } from "@clerk/nextjs";
import { useMemo } from "react";

export default function useApi(): AxiosInstance {
  // useMemo ensures we don't recreate the instance on every render
  const { getToken } = useAuth();

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
    });

    // Interceptor to attach Clerk token to protected routes
    instance.interceptors.request.use(async (config) => {
      const protectedPrefixes = ["/api/app"];

      const isProtected = protectedPrefixes.some((prefix) =>
        config.url?.startsWith(prefix)
      );

      if (isProtected) {
        const token = await getToken();
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
