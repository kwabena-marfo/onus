import axios from "axios";

export default function useFetchApi() {
  const api = axios.create({
    baseURL: process.env.NEXTAUTH_URL,
  });

  // api.interceptors.request.use(async (config) => {
  //   if (authRequired) {
  //     const token = await getToken(); // Clerk JWT
  //     if (token) {
  //       config.headers.Authorization = `Bearer ${token}`;
  //     }
  //   }
  //   return config;
  // });

  return api;
}
